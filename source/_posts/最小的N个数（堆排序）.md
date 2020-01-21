---
title: 最小的N个数（堆排序）
tags: 排序
categories: algorithm
abbrlink: b5319303
date: 2015-10-11 14:34:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/43.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

最小的n个和   
Time Limit: 1000 MS	Memory Limit: 32768 K   
Total Submit: 136(41 users)	Total Accepted: 38(32 users)	Rating: 	Special Judge: No   
Description   
给定A、B两个数列，各包含n个数，分别从A和B中任意取一个数相加得到和，这样会有n^2种结果(包括重复的)，求n^2个结果中前n个最小的和。   

 

Input   
有多组测试数据。   

对于每组测试数据，第一行为n，第二行为数列A，第三行为数列B。   

1<=n<=100000, 0 <= Ai, Bi <= 10^9。   

Output   
对于每组测试数据，输出一行，包含前n个最小的和，按照升序输出，两数之间用一个空格隔开。   

Sample Input   
5   
1 3 4 2 0   
7 3 5 2 11   
10   
74 50 47 45 38 64 19 2 84 69   
91 46 44 7 67 1 40 60 78 41   
Sample Output   
2 3 3 4 4   
3 9 20 26 39 42 43 45 46 46   
Source     
HCPC2014校赛训练赛 3   

堆排序早就忘光了。。。   

```
#include<iostream>
#include<algorithm>
#include<cmath>
using namespace std;
int a[100005],b[100005],sum[100005];
int main()
{
int n;
int i;
while(~scanf("%d",&n))
{
for(i=0;i<n;i++)
{
    scanf("%d",&a[i]);
}
    sort(a,a+n);
for(i=0;i<n;i++)
{
    scanf("%d",&b[i]);
}
    sort(b,b+n);
int j;
for(i=0;i<n;i++)
{
    sum[i]=a[0]+b[i];
}
int temp; make_heap(sum,sum+n);//建堆
for(i=1;i<n;i++)
{
for(j=0;j<n;j++)
{
    temp=a[i]+b[j];
if(temp>=sum[0])
{
break;
} pop_heap(sum,sum+n);//把堆顶元素取出来，放到了数组末尾.并对前n-1个元素再次进行堆排序。
sum[n-1]=temp;
    push_heap(sum,sum+n);//新添加一个元素在末尾，然后重新调整堆序.该算法必须是在一个已经满足堆序的条件下，添加元素。
}
}
sort(sum,sum+n);
for(i=0;i<n-1;i++)
{
    printf("%d ",sum[i]);
}
    printf("%d\n",sum[n-1]);
}
return 0;
}
```