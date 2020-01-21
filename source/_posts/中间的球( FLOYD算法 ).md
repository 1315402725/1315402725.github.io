---
title: 中间的球( FLOYD算法 )
tags: 图论
categories: algorithm
abbrlink: e20c7bf7
date: 2015-12-04 19:54:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/39.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

中间的球   
Time Limit: 1000 MS	Memory Limit: 32767 K   
Total Submit: 97(37 users)	Total Accepted: 48(35 users)	Rating: 	Special Judge: No   
Description
有N个外形一样但重量不同的球，N是一个奇数，每个球被标号为1、2、...、N，你的任务是 找到重量在中间的那个球，   

我们可以通过一些比较得知某些球比其他的球要中或者轻，从而找 到一些不可能是重量处在中间的球，比如： 给定N=5个球和M=4次比较，   

2比1重 4比3重 5比1重 4比2重 因为2 4 5都比1重，而1 2 3又都比4轻，从而能够判断1和4是不可能为重量处在中间的那个球。   

现在请写一个程序，来找出有多少个球可以判断出不可能是中间重量的球。   

Input   
输入数据首先包括一个整数t，表示测试数据组数，然后是t组测试数据，每组包括一个整数N，M，然后 为M行每行两个整数a,b表示a比b重。N<=100   
Output   
输出能够确定不可能在中间的球的数量   
Sample Input   
1 5 4 2 1 4 3 5 1 4 2   
Sample Output   
2   

一开始相处了个土办法，那就是先更新一下，水过了；   

```
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;
int a[101][101];
void gengxin(int x,int y,int n)
{
    int i;
    for(i=1;i<=n;i++)
    {
        if(a[i][x]==1&&a[i][y]==0)
        {
            a[i][y]=1;
            gengxin(i,y,n);
        }
    }
}
int chazhao1(int x,int n)
{
    int i,sum1=0;
    for(i=1;i<=n;i++)
    {
        if(a[i][x]==1)
        {
            sum1++;
        }
    }
    return sum1;
}
int chazhao2(int x,int n)
{
    int i,sum=0;
    for(i=1;i<=n;i++)
    {
       if(a[x][i]==1)
        {
            sum++;
        }
    }
    return sum;
}
int main()
{
    int t,N,M,a1,b;
    while(~scanf("%d",&t))
    {
        while(t--)
        {
            scanf("%d%d",&N,&M);
            int i,j;
            for(i=0;i<=N;i++)
            {
                for(j=0;j<=N;j++)
                {
                    a[i][j]=0;

                }
            }
            for(i=0;i<M;i++)
            {
                scanf("%d%d",&a1,&b);
                a[a1][b]=1;
            }
            for(i=1;i<=N;i++)
            {
                for(j=1;j<=N;j++)
                {
                    if(a[i][j]==1)
                    {
                        gengxin(i,j,N);
                    }
                }
            }
            int x=N/2+1;
            int num=0;
            for(i=1;i<=N;i++)
            {
                if(chazhao1(i,N)>=x)
                {
                    num++;
                }
                else if(chazhao2(i,N)>=x)
                {
                    num++;
                }
            }
            printf("%d\n",num);
        }
    }
    return 0;
}
```
其实这个题的标准解法是floyd算法，关于floyd，参考大神博客http://blog.csdn.net/zhongkeli/article/details/8832946   

```
#include<iostream>
#include<stdio.h>
#include<string.h>
#include<algorithm>
#include<math.h>
#include<queue>
#include<set>
using namespace std;
int a[101][101];
int findMax(int x,int n)
{
    int i,sum=0;
    for(i=1;i<=n;i++)
    {
        if(a[i][x]==1)
        {
            sum++;
        }
    }
    return sum;
}
int findMin(int x,int n)
{
    int i,sum=0;
    for(i=1;i<=n;i++)
    {
        if(a[x][i]==1)
        {
            sum++;
        }
    }
    return sum;
}
int main()
{
    int T;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            memset(a,0,sizeof(a));
            int n,m;
            scanf("%d%d",&n,&m);
            int i;
            int x,y;
            for(i=0;i<m;i++)
            {
                scanf("%d%d",&x,&y);
                a[x][y]=1;
            }
            int j,k;
            for(k=1;k<=n;k++)
            {
                for(i=1;i<=n;i++)
                {
                    for(j=1;j<=n;j++)
                    {
                        if(a[i][k]==1&&a[k][j]==1)//最重要的就是这点
                        {
                            a[i][j]=1;
                        }
                    }
                }
            }
            int sum=0;
            for(i=1;i<=n;i++)
            {
                if(findMax(i,n)>n/2||findMin(i,n)>n/2)
                {
                    sum++;
                }
            }
            printf("%d\n",sum);
        }
    }
    return 0;
}
```