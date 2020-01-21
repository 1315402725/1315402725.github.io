---
title: 'LEYNI, LOLI AND CIRCLE'
tags: ACM
categories: algorithm
abbrlink: e0374175
date: 2015-10-22 21:46:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/13.jpg
---
** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Leyni, LOLI and Circle   
Time Limit: 1000 MS	Memory Limit: 65536 K   
Total Submit: 156(56 users)	Total Accepted: 68(50 users)	Rating: 	Special Judge: No   
Description   
Professor Leyni likes to play with LOLIs. This time, Leyni meets several LOLIs on the playground and begins to play game with them. At the beginning, he makes N LOLIs around the playground and numbers them in clockwise order and the LOLIs are so obedient that they run clockwise under the guide of Leyni on the boundary of the playground which is a circle. At first, the distance of each pair of adjacent LOLIs are the same around the boundary of the circle. When one LOLI catches up with its previous one, the game is over. Knowing the speed of each LOLI, Leyni asks you to help him to change the order of the LOLIs to make him be able to play with them longer.   

Input   
There are multiple test cases. The first line of input is an integer T indicating the number of test cases. Then T test cases follow. For each test case: Line 1. Two numbers N (N <= 5000) and R(1 <= R <= 100000), representing the number of LOLIs and the radius of the circle. Line 2. This line contains N integers and the i-th number is the speed of the i-th LOLI in clockwise direction. All these N numbers are in the range [1, 1000].   

Output   
For each test case: Line 1. If the Leyni can play with them forever, output "LeyniV5!", otherwise output the longest time the game can last, which should be accurately rounded to three decimals.   

Sample Input   
2 3 1 1 1 1 2 1 1 2   

Sample Output   
LeyniV5! 3.142   

Author   
哈理工2011春季校赛   
其实就是排个序，让a[0]追a[1],a[1]追a[2]以此类推   

无奈我智商太低看的别人的代码   

```
#include<iostream>
#include<cmath>
#include<stdio.h>
#include<algorithm>
using namespace std;
double PI=atan(1.0)*4;
double a[5000];
int main()
{
    int T;
    double r;
    int n;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            scanf("%d%lf",&n,&r);
            int i;
            double h=PI*2*r/n;
            for(i=0;i<n;i++)
            {
                scanf("%lf",&a[i]);
            }
            sort(a,a+n);
            if(a[0]==a[n-1])
            {
                printf("LeyniV5!\n");
            }
            else
            {
                double max=-100000;
                for(i=n-1;i>=1;i--)
                {
                    if(a[i]-a[i-1]>max)
                    {
                        max=a[i]-a[i-1];
                    }
                }
            //  cout<<h<<endl;
            //  cout<<max<<endl;
                printf("%.3lf\n",h/max);
            }
        }
    }
    return 0;
}
```