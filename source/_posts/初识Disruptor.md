---
title: 初识Disruptor
tags:
  - Disruptor
categories:
  - java
abbrlink: 4eaabfbd
date: 2018-09-18 22:19:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/articelImag/startDisruptor/1.jpg
---
# 初识Disruptor
本文主要对Disruptor做一个简单的了解，首先我们讲述一下Disruptor的背景和用途。然后再讲述一下Disruptor的提点，接着我们一起来了解一下Disruptor框架里面一些
关键的api，最后我们意淫一个可能的需求，以此做一个应用Disruptor的demo，完成Disruptor的入门。

- [Disruptor的背景](#Disruptor的背景)
- [Disruptor的特点及应用的场景])(#Disruptor的特点及应用的场景)
- [Disruptor的关键api](#Disruptor的关键类)
- [一个简单的Disruptor的Demo](#一个简单的Disruptor的Demo)
<!-- more -->

## Disruptor的背景
 **Disruptor是什么？**
引用自 [Martin Fowler大神的一篇文章：LMAX架构](https://martinfowler.com/articles/lmax.html)   
LMAX是一种新型零售金融交易平台，它能够以很低的延迟(latency)产生大量交易(吞吐量). 这个系统是建立在JVM平台上，核心是一个业务逻辑处理器，它能够在一个线程里每秒处理6百万订单. 业务逻辑处理器完全是运行在内存中(in-memory)，使用事件源驱动方式(event sourcing). 业务逻辑处理器的核心是Disruptors，这是一个并发组件，能够在无锁的情况下实现网络的Queue并发操作。他们的研究表明，现在的所谓高性能研究方向似乎和现代CPU设计是相左的。
它之所以引起人们的关注,是因为它是一个非常高性能系统，这个系统是建立在JVM平台上，核心是一个业务逻辑处理器，官方号称它能够在一个线程里每秒处理6百万订单.
一个仅仅部署在4台服务器上的服务，每秒向Database写入数据超过100万行数据，每分钟产生超过1G的数据。而每台服务器（8核12G）上CPU占用不到100%，load不超过5。

## Disruptor的特点及应用的场景

 **Disruptor为什么性能高**
 1 基于缓存友好的数组而不是链表，且数组大小为2的n次方，可以使用code&(length-1)的方式代替code%length求余
 2 通过内存屏障（java中的volatile）和原子性的CAS操作替换锁，不涉及到操作系统的内核切换。
 3 通过将一些频繁更新的变量填充至64位已解决伪共享问题。提高了缓存命中率。
 4 通过更新之前加入的变量，而不是删除它们，降低了垃圾回收的频率。
 
 **应用场景**
 你在网上使用信用卡支付订单时，服务器需要调用银行的信用卡验证接口进行验证，验证完毕之后需要更新数据库的订单信息，同时需要发送kafka消息，执行完前两部操作之后，最后需要发送jms消息。接口验证需要需要一点时间，此时服务器这边的线程会阻塞一小段时间。 我们将这个操作分成两部分，1 获取订单信息，将它做为输入事件 2信用卡验证，更新数据库和kafka消息，sms消息作为事件处理
## Disruptor的关键类
**环形队列ringbuffer**
基于数组的缓存实现，它内部持有对Executor、WaitStrategy、生产者和消费者访问控制器的引用,通过一个名为cursor的Sequence对象指示队列的头，协调多个生产者向RingBuffer中添加消息，并用于在消费者端判断RingBuffer是否为空
**Sequence**
 一个 Sequence 用于跟踪标识某个特定的事件处理者( RingBuffer/Consumer )的处理进度
 通过填充Sequence避免了伪共享问题。
**WaitStrategy**
 功能包括：当没有可消费的事件时，根据特定的实现进行等待，有可消费事件时返回可事件序号；有新事件发布时通知等待的 SequenceBarrier。
**Sequencer**
 生产者用于访问缓存的控制器，它持有消费者序号的引用；新事件发布后通过WaitStrategy 通知正在等待的SequenceBarrier。
**SequenceBarrier**
消费者关卡。消费者用于访问缓存的控制器，每个访问控制器还持有前置访问控制器的引用，用于维持正确的事件处理顺序；通过WaitStrategy获取可消费事件序号。
**EventProcessor**
事件处理器，是可执行单元，运行在指定的Executor里；它会不断地通过SequenceBarrier获取可消费事件，当有可消费事件时调用用户提供的 EventHandler实现处理事件。
**EventTranslator**
事件转换器，由于Disruptor只会覆盖缓存，需要通过此接口的实现来更新缓存里的事件来覆盖旧事件。
**RingBuffer**
基于数组的缓存实现，它内部持有对Executor、WaitStrategy、生产者和消费者访问控制器的引用。
**Disruptor**
提供了对 RingBuffer 的封装，并提供了一些DSL风格的方法，方便使用。

 ## 一个简单的Disruptor的Demo
 我们将第二部分的场景作为我们的需求，实现一个大致的demo。
 关键代码如下。
信用卡验证消费者
```
//模拟信用卡验证
 public class OrderDataInCardVerificationHander implements EventHandler<InOrderDataEvent> {
    @Override
    public void onEvent(InOrderDataEvent event,long sequence, boolean endOfBatch) throws Exception {
        Thread.sleep(1000L);
        long threadId = Thread.currentThread().getId();
        String order = event.getOrderCode();
        System.out.println(String.format("Thread Id %s 信用卡验证成功 ....",threadId,order));
    }
}
```
事件对象
```
@Data
public class InOrderDataEvent {
    private String orderCode;

}
```
生产线程
```
public class OrderDataEventPublisher implements Runnable  {
    Disruptor<InOrderDataEvent> disruptor;
    private CountDownLatch latch;
    private static int LOOP=10;//10个订单


    public OrderDataEventPublisher(CountDownLatch latch, Disruptor<InOrderDataEvent> disruptor) {
        this.disruptor=disruptor;
        this.latch=latch;
    }

    @Override
    public void run() {
        OrderDataEventTranslator tradeTransloator=new OrderDataEventTranslator();
        for(int i=0;i<LOOP;i++){
            try {
                Thread.currentThread().sleep(1000L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }finally{
                //publishEvent法必须包含在 finally 中以确保必须得到调用；如果某个请求的 sequence 未被提交，将会堵塞后续的发布操作或者其它的 producer。
                disruptor.publishEvent(tradeTransloator);
            }
        }
        latch.countDown();
        System.out.println("生产者写完" +LOOP + "个消息");
    }

}

```
定义event更新方式
```
public class OrderDataEventTranslator implements EventTranslator<InOrderDataEvent> {
    //Disruptor对于已消费的事件是不删除的，有新事件时只是用新事件的属性去替换旧事件的属性。
    //将新事件的属性转移以覆盖旧事件的好处，这样做虽然占用了内存，但是降低了垃圾回收出现的频率
    @Override
    public void translateTo(InOrderDataEvent event, long sequence) {
        this.generateTradeTransaction(event);
    }
    private InOrderDataEvent generateTradeTransaction(InOrderDataEvent event){
        int num =  (int)(Math.random()*8000);
        num = num + 1000;
        event.setOrderCode("订单" + num);
        System.out.println("Thread Id " + Thread.currentThread().getId() + " 获取了一个订单");
        return event;
    }
}

```
启动disruptor
```
public class testDemo {
    public static void main(String[] args) throws InterruptedException {
        long beginTime=System.currentTimeMillis();

        int bufferSize=1024;
        //Disruptor交给线程池来处理，四个线程
        ExecutorService executor= Executors.newFixedThreadPool(4);
        //构造缓冲区与事件生成
        Disruptor<InOrderDataEvent> disruptor=new Disruptor<InOrderDataEvent>(new EventFactory<InOrderDataEvent>() {
            @Override
            public InOrderDataEvent newInstance() {
                return new InOrderDataEvent();
            }
        }, bufferSize, executor, ProducerType.SINGLE, new YieldingWaitStrategy());

        OrderDataInCardVerificationHander orderDataInCardVerificationHander=new OrderDataInCardVerificationHander();

        //信用卡验证
        EventHandlerGroup<InOrderDataEvent> handlerGroup=disruptor
                .handleEventsWith(orderDataInCardVerificationHander);
        //kafka消息，数据库更新
        handlerGroup.then(new OrderDataInDbHandler());
        OrderDataSmsHandler orderDataSmsHandler=new OrderDataSmsHandler();
        //发送sms
        handlerGroup.then(orderDataSmsHandler);
        //启动
        disruptor.start();
        CountDownLatch latch=new CountDownLatch(1);
        //开始生产
        executor.submit(new OrderDataEventPublisher(latch, disruptor));
        //等待生产者结束
        latch.await();
        //Disruptor会阻塞至所有事件处理完毕
        disruptor.shutdown();
        executor.shutdown();

        System.out.println("消耗时间:"+(System.currentTimeMillis()-beginTime));
    }
}
```
[demo的github地址:https://github.com/1315402725/DisruptorDemo.git](https://github.com/1315402725/DisruptorDemo.git)
[disruptor源码的github地址:https://github.com/LMAX-Exchange/disruptor.git](https://github.com/LMAX-Exchange/disruptor.git)
[原理及描述请看:http://ifeve.com/disruptor/](http://ifeve.com/disruptor/)


