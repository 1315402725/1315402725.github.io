---
title: POLYGON
tags: 图论
categories: algorithm
abbrlink: f8e1df08
date: 2015-10-29 21:05:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/19.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>


polygon       
Time Limit: 1000 MS	Memory Limit: 32768 K   
Total Submit: 38(28 users)	Total Accepted: 29(27 users)	Rating: 	Special Judge: No   
Description
We have a special polygon that all points have the same distance to original point.As you know   

we can get N segments after linking the original point and the points on the polygon,   

then we can also get N angles between each pair of the neighbor segments.   

Now give you the data about the angle, please calculate the area of the polygon.   

Input   
There are multiple test cases.   

The first line contains two integer N and D indicating the number of the points and their distance to original    point. (3 <= N <= 10, 1 <= D <= 10)   

The next lines contains N integers indicating the angles. The sum of the N numbers is always 360.   

 

Output   
For each test case   

output one float numbe indicating the area of the polygon. The printed value should have 3 digits after the decimal point.   

 

Sample Input   
4 1   

90 90 90 90   

6 1   

60 60 60 60 60 60   

Sample Output   
2.000   

2.598   

Hint   
原点在多边形内部，各顶点与原点相连得到相邻两线段夹角小于180度   
Author   
陈禹@HRBUST   

 题目大意： 给你一个多边形，多边形中间有一个点，多边形上的点距离这个原点都相等，已知这个距离和相邻两个点与这个原点组成的夹角   

求面积   

```
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <algorithm>
#include <iostream>
using namespace std;
int N;
double d;
double PI=atan(1)*8;
int main()
{
    //cout<<PI<<endl;
    while(~scanf("%d%lf",&N,&d))
    {
        double ans;
        double sum=0;
        int i;
        for(i=0;i<N;i++)
        {
            scanf("%lf",&ans);
            ans=ans/360*PI;
            sum+=d*d*sin(ans)/2;
        //    cout<<sin(ans)<<endl;
        }
        printf("%.3lf\n",sum);
    }
    return 0;
}
```