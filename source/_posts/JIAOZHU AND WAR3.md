---
title: JIAOZHU AND WAR3
tags: ACM
categories: 数学
abbrlink: 1f6b99e5
date: 2015-11-21 00:04:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/8.jpg
---
** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

JiaoZhu and WAR3   
Time Limit: 5000 MS	Memory Limit: 65536 K   
Total Submit: 126(39 users)	Total Accepted: 78(34 users)	Rating: 	Special Judge: Yes   
Description   
自从电子竞技在中国被认定为第99个正式体育项目，教主就投身其中，WAR3（WarCraft3 魔兽争霸3）是他拿手的一款游戏，当然也有很多职业选手参与其中。 魔兽争霸中每个选手都有自己的一片区域我们这里叫做主城，他们必须保卫自己的主城不受到侵犯。 教主在一场比赛中，企图通过建造防御塔来保卫自己的主城。 为了简化问题，我们规定了教主的主城是一个固定的正方形区域，坐标范围为-0.5 <= x <= 0.5，-0.5 <= y <= 0.5，防御塔的防御范围是一个以自身为圆心以R为半径的圆。这样只要有防御塔覆盖到的位置（包括圆的边缘）都是安全的。 教主建造了若干个防御塔，你的任务是帮助教主计算建造这若干个防御塔后他的主城还有多少面积没有被覆盖到。   

Input   
本题有多组测试数据，对于每组测试数据格式如下： 第1行：一个数字N(0 <= N <= 50)代表防御塔的个数 第2..1 + N行：每行三个数字x0, y0, R分别代表，该防御塔的坐标x0, y0及其覆盖半径R (-1.0 <= x0, y0 <= 1.0, 0 <= R <= 10.0) 处理到文件结束(EOF)   

Output   
对应每组数据输出没有被覆盖到的面积，要求近似到3位小数。 本题允许你的结果有0.006的误差，即 |你的结果-标准结果| <= 0.006 都会被接受。   

Sample Input   
0 1 0 0 0.1 2 -0.5 -0.5 0.5 0.5 0.5 0.5 1 0 0 10   
2   
-0.5 -0.5 1   
0.5 -0.5 1   
Sample Output   
1.000 0.969 0.607 0.000   
0.043   
Hint   

圆的方程为 (x - x0)^2 + (y - y0)^2 <= R^2   

```
#include<cstdio>
#include<cmath>
#include<queue>
#include<iostream>
using namespace std;

int main()
{
    int a[101][101];
    double x0,y0,r0;
    double x,y,r;
    int n;
    while(~scanf("%d",&n))
    {
        int i,j;
        for(i=0;i<=100;i++)
        {
            for(j=0;j<=100;j++)
            {
                a[i][j]=0;
            }
        }
        double ans=10201.0;
        while(n--)
        {
            scanf("%lf%lf%lf",&x0,&y0,&r0);
            x=x0*100+50;
            y=y0*100+50;
            r=r0*100;
            for(i=0;i<=100;i++)
            {
                for(j=0;j<=100;j++)
                {
                    if(a[i][j]==0&&(i-x)*(i-x)+(j-y)*(j-y)<=r*r)
                    {
                        a[i][j]=1;
                        ans--;
                    }
                }
            }
        }
        
        ans=1.0*ans/10201.0;//就算面积算的是点的个数，所以要除以101*101
        printf("%.3f\n",ans);
    }
    return 0;
}
```