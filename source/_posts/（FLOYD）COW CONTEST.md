---
title: （FLOYD）COW CONTEST
tags: 图论
categories: algorithm
abbrlink: 1bd3e80f
date: 2015-11-01 23:01:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/1.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>


Cow Contest   
Time Limit: 1000 MS	Memory Limit: 65536 K   
Total Submit: 224(75 users)	Total Accepted: 93(69 users)	Rating: 	Special Judge: No   
Description   
N (1 ≤ N ≤ 100) cows, conveniently numbered 1..N, are participating in a programming contest. As we all know, some cows code better than others. Each cow has a certain constant skill rating that is unique among the competitors.   

The contest is conducted in several head-to-head rounds, each between two cows. If cow A has a greater skill level    than cow B (1 ≤ A ≤ N; 1 ≤ B ≤ N; A ≠ B), then cow A will always beat cow B.   

Farmer John is trying to rank the cows by skill level. Given a list the results of M (1 ≤ M ≤ 4,500) two-cow    rounds, determine the number of cows whose ranks can be precisely determined from the results. It is guaranteed    that the results of the rounds will not be contradictory.   

Input   
For each test case:    

* Line 1: Two space-separated integers: N and M * Lines 2..M+1: Each line contains two space-separated integers    that describe the competitors and results (the first integer, A, is the winner) of a single round of competition: A and B   

Process to the end of file.    

Output   
For each test case:   

* Line 1: A single integer representing the number of cows whose ranks can be determined   

Sample Input   
5 5 4 3 4 2 3 2 1 2 2 5   
Sample Output   
2   
Hint   
编号为2的奶牛输给了编号为1、3、4的奶牛，也就是说她的水平比这3头奶 牛都差。而编号为5的奶牛又输在了她的手下，也就是说，她的水平比编号   为5的 奶牛强一些。于是，编号为2的奶牛的排名必然为第4，编号为5的奶牛的水平必 然最差。其他3头奶牛的排名仍无法确定。

   一开始写出了这样的代码：   
```
#include<iostream>
#include<cmath>
#include<stdio.h>
#include<algorithm>
using namespace std;
int a[101][101];
int n,m;
void check1(int p,int q)
{
    int i;
    for(i=1;i<=n;i++)
    {
        if(a[q][i]==1)
        {
            a[p][i]=1;
            check1(p,i);
        }
    }
}
void check2(int p,int q)
{
    int i;
    for(i=1;i<=n;i++)
    {
        if(a[q][i]==-1)
        {
            a[p][i]=-1;
            check2(p,i);
        }
    }
}
int main()
{
    while(~scanf("%d%d",&n,&m))
    {
        int i,j;
        int x,y;
        memset(a,0,sizeof(a));
        while(m--)
        {
            scanf("%d%d",&x,&y);
            a[x][y]=1;
            a[y][x]=-1;
        }
        for(i=1;i<=n;i++)
        {
            for(j=1;j<=n;j++)
            {
                if(a[i][j]==1)
                {
                    check1(i,j);
                }
                else if(a[i][j]==-1)
                {
                    check2(i,j);
                }
            }
        }
        int max,min,sum=0;
        for(i=1;i<=n;i++)
        {
            max=0;
            min=0;
            for(j=1;j<=n;j++)
            {
                if(a[i][j]==1)
                {
                    max++;
                }
                else if(a[i][j]==-1)
                {
                    min++;
                }
            }
            if(max+min==n-1)
            {
                sum++;
            }
        }
        cout<<sum<<endl;
    }
    return 0;
}
```

runtimeerro，可能是递归太深了   

用Floyd算法：
   
```
#include<iostream>
#include<cmath>
#include<stdio.h>
#include<algorithm>
using namespace std;
int a[101][101];
int n,m;
int main()
{
    while(~scanf("%d%d",&n,&m))
    {
        int i,j;
        int x,y;
        memset(a,0,sizeof(a));
        while(m--)
        {
            scanf("%d%d",&x,&y);
            a[x][y]=1;
            a[y][x]=-1;
        }
        int k;
        for(k=1;k<=n;k++)
        {
            for(i=1;i<=n;i++)
            {
                for(j=1;j<=n;j++)
                {
                    if(a[i][k]==1&&a[k][j]==1)
                    {
                        a[i][j]=1;
                    }
                    if(a[i][k]==-1&&a[k][j]==-1)
                    {
                        a[i][j]=-1;
                    }
                }
            }
        }
        bool key;
        int sum=0;
        for(i=1;i<=n;i++)
        {
            key=true;
            for(j=1;j<=n;j++)
            {
                if(a[i][j]!=1&&a[i][j]!=-1&&i!=j)
                {
                    key=false;
                    break;
                }
            }
            if(key)
            {
                sum++;
            }
        }
        printf("%d\n",sum);
    }
    return 0;
}

```