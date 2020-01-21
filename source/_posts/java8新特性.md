---
title: java8新特性
date: 2018-08-01 22:19:00
tags: java基础
categories: java
abbrlink: f41870e2
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/24.jpg
---


例1、用lambda表达式实现Runnable
    1.8之前
	```
    new Thread(new Runnable(){
        @Override
        public void run(){
        System.out.println("Before java8 ,too much code for too little to do");
        }
    }).start();
	
    //java 8方式
    new Thread(() -> System.out.println("In java8 ,Lambda expression rocks !!")).start();
    ```

例2 使用java 8 lambda表达式进行事件处理
<!-- more -->
```
    // java 8之前
    jButton show =new JButton("Show");
    show.addActionListener(new ActionListener()){
        @Override
        public void actionPerformed(ActionEvent e){
            System.out.println("Event handing without lambda expression is boring");
        } 
    });
    //
    show.addActionListener((e) -> {
                System.out.println("Lihgt,camera, Action !! Lambda expressions Rocks");
        });
```
例3 使用lambda表达式对列表进行迭代
```
    //java8之前
    List feature=arrays.asList("Lambdas","default Method","Stream API","Date adn Time Api");
    for(String feature : features){
        System.out.println(feature);
    }
    //java 8之后
    List featuers=arrays.asList("Lambdas","default Method","stream Api","date and time");
    features.foreach(n->System.out.println(n));
    // 使用 java 8 的方式引用更方便，方法引用由::双冒号操作提示
    //看起来像c++的作用域解析运算符
    features.foreach(System.out::println);
```
例4 使用lambda表达式和函数式接口Predicate
    java8添加了一个包  叫作 java.util.function 用来支持函数式编程
```
 public static void main(args[]){
    List languages = Arrays.asList("Java", "Scala", "C++", "Haskell", "Lisp");
    System.out.println("Languages which starts with J :");
    filter(languages, (str)->str.startsWith("J"));
    System.out.println("Languages which ends with a ");
    filter(languages, (str)->str.endsWith("a"));
    System.out.println("Print all languages :");
    filter(languages, (str)->true);
    System.out.println("Print no language : ");
    filter(languages, (str)->false);
    System.out.println("Print language whose length greater than 4:");
    filter(languages, (str)->str.length() > 4);
}
public static void filter(List names, Predicate condition) {
    for(String name: names)  {
        if(condition.test(name)) {
            System.out.println(name + " ");
        }
    }
    //更好的办法
    public static void filter(List names,Predicate condition){
        name.stream().filter((name)->(condition.test(name))).forEach((name)->{
           System.out.println(name + " ");
        });
    }
}
```
例5 如何在lambda表达式中加入Predicate
```
// 甚至可以用and()、or()和xor()逻辑函数来合并Predicate，
// 例如要找到所有以J开始，长度为四个字母的名字，你可以合并两个Predicate并传入
Predicate<String> startsWithJ = (n) -> n.startsWith("J");
Predicate<String> fourLetterLong = (n) -> n.length() == 4;
names.stream()
    .filter(startsWithJ.and(fourLetterLong))
    .forEach((n) -> System.out.print("nName, which starts with 'J' and four letter long is : " + n));
```
例6 java8中使用lambda表达式的map和Reduce示例
```
//不使用lambda表达式为每个订单加上12的税 
List costBeforeTax=Arrays.asList(100,200,300,400,500);
for(Integer cost : costBeforeTax){
    double price=cost+.12*cost;
    System.out.println(price);
}
//使用lmabda表达式
List costBeforeTax=Arrays.asList(100,200,300,400,500);
costBeforeTax.stream().map((cost)->cost+.12*cost).forEach(System.out:println);
```
例6.2 java8 中使用lambda表达式的Map和Reduce示例
```
//为每个订单加上12%的税
List costBeforeTax = Arrays.asList(100,200,300,400,500);
double total = 0;
for(Integer cost : costBeforeTax) {
    double price = cost +.12*cost;
    total =total +price;
}
System.out.println("Total : " + total);
//新方法：
List costBeforeTax = Arrays.asList(100,200,300,400,500);
double bill = costBeforeTax.stream().map((cost)->cost + .12*cost).reduce((sum,cost) -> sum+cost).get();
System.out.println("Total : "+bill);
```
例7 通过过滤创建一个String 列表
```
//创建一个字符串列表，每个字符串长度大于2
List<String> filtered =strList.stream().filter(x->x.length()>2).collect(Collectors.toList());
System.out.println("Original List : %s,filtered list : %s %n ",strList,filtered);
```
例8 对列表的每个元素应用函数
```
//将字符串转换成大写并用逗号链接起来
List<String> G7 =Arrays.asList("lmbada","default method","date and time","stream");
String G7countries =G7.stream().map(x->x.toUpperCase()).collect（Collectors.join(",")）;
```
例9 复制不同的值 ，创建一个子列表
```
//使用流的distinct()方法对集合进行去重
List<Integer> numbers =Arrays.asList(9,10,3,4,7,3,4);
List<Integer> distinct = numbers.stream().map(i -> i*i).distinct().collect(Collectors.toList());
例10 计算集合元素的最大值最小值 总和 及平均值
//获取数字的个数、最小值、最大值、总和以及平均值
List<Integer> primes = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29);
IntSummaryStatistics stats = primes.stream().mapToInt((x) -> x).summaryStatistics();
System.out.println("Highest prime number in List : " + stats.getMax());
System.out.println("Lowest prime number in List : " + stats.getMin());
System.out.println("Sum of all prime numbers : " + stats.getSum());
System.out.println("Average of all prime numbers : " + stats.getAverage());
```
Lambda表达式 vs 匿名类
关键的不同点就是关键字 this。匿名类的 this 关键字指向匿名类，而lambda表达式的 this 关键字指向包围lambda表达式的类。另一个不同点是二者的编译方式。</br>
Java编译器将lambda表达式编译成类的私有方法。使用了Java 7的 invokedynamic 字节码指令来动态绑定这个方法。
，实用函数式编程这本书[Java 8 Lambdas, pragmatic functional programming](https://www.amazon.com/Java-Lambdas-Pragmatic-Functional-Programming/dp/B00OVMRHPO/ref=sr_1_3?ie=UTF8&qid=1438567374&sr=8-3&keywords=Java+8+Lambdas%2C+pragmatic+functional+programming)，作者是Richard Warburton，或者也可以看看Manning的Java 8实战[Java 8 in Action](https://www.amazon.com/Java-Action-Lambdas-functional-style-programming/dp/1617291994/ref=sr_1_1?ie=UTF8&qid=1438567348&sr=8-1&keywords=Java+8+in+Action)
需要注意的地方
1）lambda表达式仅能放入如下代码：预定义使用了 @Functional 注释的函数式接口，自带一个抽象函数的方法，或者SAM（Single Abstract Method 单个抽象方法）类型。</br>
这些称为lambda表达式的目标类型，可以用作返回类型，或lambda目标代码的参数。例如，若一个方法接收Runnable、Comparable或者 Callable 接口，都有单个抽象方法，</br>
可以传入lambda表达式。类似的，如果一个方法接受声明于 java.util.function 包内的接口，例如 Predicate、Function、Consumer 或 Supplier，那么可以向其传lambda表达式。
2）lambda表达式内可以使用方法引用，仅当该方法不修改lambda表达式提供的参数。本例中的lambda表达式可以换为方法引用，因为这仅是一个参数相同的简单方法调用。</br>
```
list.forEach(n -> System.out.println(n));
list.forEach(System.out::println);  // 使用方法引用
```
然而，若对参数有任何修改，则不能使用方法引用，而需键入完整地lambda表达式，如下所示：
```
list.forEach((String s) -> System.out.println("*" + s + "*"));
```
事实上，可以省略这里的lambda参数的类型声明，编译器可以从列表的类属性推测出来
3）lambda内部可以使用静态、非静态和局部变量，这称为lambda内的变量捕获。
4）Lambda表达式在Java中又称为闭包或匿名函数
5）Lambda方法在编译器内部被翻译成私有方法，并派发 invokedynamic 字节码指令来进行调用。可以使用JDK中的 javap 工具来反编译class文件。</br>
使用 javap -p 或 javap -c -v 命令来看一看lambda表达式生成的字节码。大致应该长这样：
```
private static java.lang.Object lambda$0(java.lang.String);
```
6）lambda表达式有个限制，那就是只能引用 final 或 final 局部变量，这就是说不能在lambda内部修改定义在域外的变量。
```
List<Integer> primes = Arrays.asList(new Integer[]{2, 3,5,7});
int factor = 2;
primes.forEach(element -> { factor++; });
Compile time error : "local variables referenced from a lambda expression must be final
```
另外，只是访问它而不作修改是可以的，因此，它看起来更像不可变闭包，类似于Python。
原文链接： [javarevisited](http://javarevisited.blogspot.sg/2014/02/10-example-of-lambda-expressions-in-java8.html) 翻译： ImportNew.com - lemeilleur
译文链接： [http://www.importnew.com/16436.html](http://www.importnew.com/16436.html)
[ 转载请保留原文出处、译者和译文链接。]
