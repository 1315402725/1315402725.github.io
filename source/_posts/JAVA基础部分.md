---
title: JAVA基础部分
tags: java基础
categories: java
abbrlink: 5e7573b4
date: 2015-11-21 23:21:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/8.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>


```
//alt+? 自动提示
//ctrl+? 注释/解除注释
Myeclips 计时编译器
//alt+r s 回车编译代码
//shift+Ctrl+f自动对齐
//编译完成之后直接f11运行代码
变量：用来存储数据的内存空间
变量类型： 指明这块内存空间能够存储什么
boolean  一个字节（8位）0000 0000
char     0000 0000 0000 0000用一个字节所能表示的2的16次方种数字表示2的16次个字符(至今没填满),而C中的char是一个字节只能表示256中符号
byte      1字节  -128 127   
short int 2字节  -32768
int  整形 4字节 -2147483648到2147483648
long      8字节  最大是91开头长度19位
float     单精度  4字节 最多保留到小数点后7位
double 双精度浮点 8字节64位最多保留到小数点后16位
算术运算符 +-*、%
赋值 = ++ -- 
比较运算符 《 》《=》= == ！=
逻辑运算符 && 、、 ！
位运算 & | ^ ~ << >>
 5
1010+1  -5
0000  0
if(a>b&&++b<a)
如果前面不成立则&&后面不运行
特殊
double a=6.0;
double b=4.9;
a-b=1.099999999..;
数组：
类里面定义了方法（其他语言叫函数）
定义类 class 类名
System.gc()马上调用垃圾回收机制
一个文件中只能又一个public类
calss User
{
//final常量（终态）修饰的方法不能被重写
//finally   try{}  catch{}   finally{}用于异常处理，如果catch{return}fianlly{。。。}return后finally会被执行
//finalize用于析构函数
extens 扩展(继承)只能单一继承
继承 多态（父类指针可指向子类反之不行)
函数重载与返回值无关
static 修饰的成员变不是对象的数据
static
{
//静态区域，专门用来初始化静态数据，只能执行一次
}
String池   相同的字符串会是同一个引用，使用同一块内存
例子：
//在String 池中
String a="hello,word";
String b="hello,word"//
&a==&b
//在堆中创建
String a=new String("sss");
String b=new String("sss");
a&!=&b;
String 采用的unicode编码，一个字符占两个字节
String中的方法
IndexOf（）方法用于检索一个字符串是否存在另一个字符串
subString 截取字符串
大小写转换
valueOf String类的静态方法
StringBuilder封装可变字符串
SringBuffer是线程安全的同步处理的
String 方法matches();正则表达式
        Integer i1=100;
        Integer i2=100;
        if(i1==i2)
        {
            System.out.println("OK");
        }
        else
        {
            System.out.println("No");
        }
输出OK
        Integer i1=200;
        Integer i2=200;
        if(i1==i2)
        {
            System.out.println("OK");
        }
        else
        {
            System.out.println("No");
        }
输出NO
Integer池类似于String池在-128~127，内存会被重用
时间类
Date simpleDateFormat定义时间格式
两个数互换
int a,b;
a=a^b;
b=a^b;
a=a^b;
String s="Hello";
String s1="Hello";
char c=s.charAt(4);
//获得第四个字符
s.compareTo(s1)//比较两个字符串的值是否相等
相当与c++的strcmp
s.equals(s1);Java中的方法比较两个字符串的值是否相等
s.starsWith(prefix)//是否是以。。。开头的
s.endsWith(suffix);//是否是以。。。结尾的
s.indexof('l');//查询第一个l的位置
int  pos=0;
int x;
while((x=s.indexOf('l',pos))!=-1)
{
      System.out.println(x);
    pos=x+1;    
}//查询所有的l
s.isEmpty()//是否为空，返回boolean
//C://windows/system32/1.txt
s.split("s");//返回一个字符串数组，按照一个字符串分割
s.substring(int temp);截字符串，包含其实不包含终止
s.substring(1,4);截取字符串
s.toUpperCase（）//将s中的所有字符转成大写
s.toLowerCase()//将s中的所有字符串转成小写
s.trim()//去除两端空格
s.replace("a","b");//用第一个字符串代替s中的第二个字符串
Collection接口:
Set<Integer>
Set<String> set=new HashSet<String>()；//<>中的类型不能是基本类型
set.Add("dsfs");
set.clear();
System.out.println(set);
map.values();//返回所有的值，类型是collection接口类型

//map映射 key value 键值对
map<K,V>//K不能重复，V可以重复,

ArryList<String> a1=new ArryList<String>;
a1.add("1");
a1.add("ds");
a1.indexOf("1");//根据值查找索引
a1.get(1);//根据索引返回值
a1.remove(1);//用索引移除值
a1.remove("ds");//移除所有对象，没有返回FALSE有返回TRUE
a1.subList(2,5);//截取，返回一个List，包含起使，不包含终止
for(i:arr[])
{
//依次赋值将arr[]中的数值赋值给i；
}

二维数组可以写成
int []arr[]=new int[][];
//类的构造方法也可以重载
//如果要重载一个构造方法，类中不许有至少一个无参的构造方法（alt+?自动提示会帮你添加）
接口直接可以多重继承，接口和类之间只能implements不能extends
System.getProperty("user");
```