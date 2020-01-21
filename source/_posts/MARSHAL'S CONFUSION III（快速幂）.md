---
title: MARSHAL'S CONFUSION III（快速幂）
tags: ACM
categories: algorithm
abbrlink: 463225d1
date: 2015-11-24 21:40:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/15.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Marshal's Confusion III   
Time Limit: 3000 MS	Memory Limit: 65536 K   
Total Submit: 236(62 users)	Total Accepted: 74(51 users)	Rating: 	Special Judge: No   
Description   
Marshallike to solve acm problems.But they are very busy, one day they meet a problem. Given three intergers a,b,c,    the task is to compute a^(b^c))%317000011. so the turn to you for help.    
Input   
The first line contains an integer T which stands for the number of test cases. Each case consists of three integer    a, b, c seperated by a space in a single line. 1 <= a,b,c <= 100000   
Output   
For each case, print a^(b^c)%317000011 in a single line.   
Sample Input   
2 1 1 1 2 2 2   
Sample Output   
1 16   

Author   

```
#include<cstdio>
#include<cmath>
#include<queue>
#include<iostream>
using namespace std;
const long m=317000011;
long ksm(long x,long y,int m)//x^y
{
    long sum=x;
    long res=1;
    while(y>0)
    {
        if(y%2==1)
        {
            res=(res*sum)%m;
        }
        sum=(sum*sum)%m;
        y/=2;
        //cout<<y<<endl;
    }
    return res;
}
int main()
{
    int T;
    long a,b,c;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            scanf("%ld%ld%ld",&a,&b,&c);
            long ss=ksm(a,ksm(b,c,m),m);
            ss%=m;
            printf("%ld\n",ss);
        }
    }
//    cout<<ksm(2,1)<<endl;
}
```