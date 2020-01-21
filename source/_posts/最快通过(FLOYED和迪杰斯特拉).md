---
title: 最快通过(FLOYED和迪杰斯特拉)
tags: 图论
categories: algorithm
abbrlink: c8d015fa
date: 2015-12-09 11:48:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/42.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

最快通过   
Time Limit: 6000 MS	Memory Limit: 32768 K   
Total Submit: 24(11 users)	Total Accepted: 12(10 users)	Rating:	Special Judge: No   
Description   
sp省有n个城市，它们之间有道路相连，标号从1~n，一天小a想要从a城到b城去，  可能有多条路径， 但每条路径所花费的时间不一样，   

假设通过第i条路径所需的时间为X(i) ,从a城到b城经过m条道路，则总花费的时间为f = X(i1) * X(i2) * X(i3) ... *X(im)。现在请你找出   一条路径，使得这条路径上得出的f最大。输出最大的f。   

Input
有多组数据输入。   

每组第一行一个整数n代表城市的个数 n <= 1000。   

接着是n*n的矩阵代表通过两个城市之间的时间X(i) ( 0< = X(i) <= 1),X(i) 为实数，若X(i)为0 则代表不能通过。   

接着是一个整数m代表m次询问 , m<=200。   

接下来m行 每行有两个数字a,b。表示需要从a城到b城。   

Output   
对于每个询问求a~b的最大f，若不能通过则输出”No way!!”;   

Sample Input    
3  

1 0.5 0.5   

0.5 1 0.4   

0.5 0.4 1   

3   

1 2   

2 3   

1 3   

Sample Output   
0.500   

0.400   

0.500   

 floyed： 代码   
```
#include<iostream>
#include<stdio.h>
#include<string.h>
#include<algorithm>
#include<math.h>
#include<queue>
#include<set>
using namespace std;
double a[1001][1001];
int main()
{
    int n;
    while(~scanf("%d",&n))
    {
        int i,j;
        for(i=1;i<=n;i++)
        {
            for(j=1;j<=n;j++)
            {
                scanf("%lf",&a[i][j]);
            }
        }
        int k;
        for(k=1;k<=n;k++)
        {
            for(i=1;i<=n;i++)
            {
                for(j=1;j<=n;j++)
                {
                    if(a[i][j]<a[i][k]*a[k][j])
                    {
                        a[i][j]=a[i][k]*a[k][j];
                    }
                }
            }
        }
        int m,x,y;
        scanf("%d",&m);
        while(m--)
        {
            scanf("%d%d",&x,&y);
            if(a[x][y]!=0)
            {
                printf("%.3lf\n",a[x][y]);
            }
            else
            {
                printf("No way!!\n");
            }
        }
    }
    return 0;
}
```
迪杰斯特拉 代码：
```
#include<iostream>
#include<stdio.h>
#include<string.h>
#include<algorithm>
#include<math.h>
#include<queue>
#include<set>
using namespace std;
double a[1001][1001];
double low[1001];
int n;
int check[1001];
void Djstl(int x,int n)
{
    int i,j;
    memset(check,0,sizeof(check));
    check[x]=1;
    for(i=1;i<=n;i++)
    {
        low[i]=a[x][i];
    }
    int index;
    for(i=1;i<n;i++)
    {
        double max=-1;
        for(j=1;j<=n;j++)
        {
            if(!check[j]&&low[j]>max)
            {
                max=low[j];
                index=j;
            }
        }
        check[index]=1;
        for(j=1;j<=n;j++)
        {
            if(max*a[index][j]>low[j]&&!check[j])//这里有个陷阱，就是   //a [x][y]不一定等于a[y][x]，倘若把a[index][j]换成a[j][index]提交不会通过
            {
                low[j]=max*a[index][j];
            }
        }
    }
}
int main()
{
    while(~scanf("%d",&n))
    {
        int i,j;
        for(i=1;i<=n;i++)
        {
            for(j=1;j<=n;j++)
            {
                scanf("%lf",&a[i][j]);
            }
        }
        int m;
        scanf("%d",&m);
        int x,y;
        while(m--)
        {
            scanf("%d%d",&x,&y);
            Djstl(x,n);
            if(low[y]==0)
            {
                printf("No way!!\n");
            }
            else
            {
                printf("%.3lf\n",low[y]);
            }
        }
    }
    return 0;
}
```
