---
title: 'LEYNI, LOLI AND TOASTS'
tags: 线段树
categories: algorithm
abbrlink: 59e1f0ff
date: 2015-11-27 23:57:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/12.jpg
---
** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Leyni, LOLI and Toasts   
Time Limit: 1000 MS	Memory Limit: 65536 K    
Total Submit: 47(37 users)	Total Accepted: 37(37 users)	Rating: 	Special Judge: No   
Description   
Leyni likes to play with LOLIs, but this winter is so cold in Harbin!   

A group of n LOLIs decided to buy b bottles of soft drink to make themselves warmer. Each bottle has d milliliters    of the drink. Also they bought l limes and cut each of them into k slices. After that they found p grams of salt.   

To make a toast, each LOLI needs x milliliters of the drink, a slice of lime and y grams of salt. Having the    average materials, the LOLIs want to make toasts as many as they can. How many toasts can each LOLI makes?   

Input   
There are multiple test cases. The first line of input is an integer T indicating the number of test cases. Then T    test cases follow.   

For each test case:   

Line 1. This line contains eight positive integers, n, b, d, l, k, p, x, y (1 ≤ n, b, d, l, k, p, x, y ≤ 1000). The numbers are separated by exactly one space.   

Output   
For each test case:   

Line 1. Output the number of toasts each LOLI can make.   

Sample Input   
1   

3 4 5 10 8 100 3 1   

Sample Output   
2   

Hint   
In the sample, overall the LOLIs have 4 * 5 = 20 milliliters of the drink, it is enough to make 20 / 3 = 6 toasts. The limes are enough for 10 * 8 = 80 toasts and the salt is enough for 100 / 1 = 100 toasts. However, there are 3 LOLIs in the group, so the answer is 6 / 3 = 2.   

Source   
哈理工2012春季校赛 - 现场赛   
Author   
齐达拉图@HRBUST   

```
#include<cstdio>
#include<cmath>
#include<queue>
#include<iostream>
using namespace std;
int min(int x,int y)
{
    return x<y? x:y;
}
int main()
{
    int  n, b, d, l, k, p, x, y;
    int T;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            scanf("%d%d%d%d%d%d%d%d",&n,&b,&d,&l,&k,&p,&x,&y);
        /*    if(n>b)
            {
                printf("0\n");
            }*/
            //else
        //    {
                int num1=b*d/(n*x);
                int num2=l*k/n;
                int num3=p/(y*n);
                printf("%d\n",min(num1,min(num2,num3)));
        //    }
        }
    }
    return 0;
}
```