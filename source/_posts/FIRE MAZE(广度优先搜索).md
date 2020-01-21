---
title: FIRE MAZE(广度优先搜索)
tags: 广搜
categories: algorithm
abbrlink: 4175332c
date: 2015-11-10 12:02:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/6.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Fire Maze   
Time Limit: 1000 MS	Memory Limit: 32768 K   
Total Submit: 53(19 users)	Total Accepted: 26(17 users)	Rating: 	Special Judge: No   
Description   
After escaping from Figo's chase, Severus falls into a N * M maze designed by Figo.   
At first, Severus is located on the grid S. Every second he can only move to the four grids that adjacent to the grid he is   

 located on. The moment he move to any side of the maze, he will get rid of Figo.   

After T seconds, Figo will reach the maze. Because Figo is the designer of the maze, when Figo arrive, he can reach any    

grid if he want. If Severus can't leave the maze at that moment, there is no doubt that he will be caught by Figo.   

Figo is very cunning. In the maze he set not only walls, but also fire! After every second, the fire will spread to the four    

grid that adjacent to it. When a grid is on fire, certainly, Severus can not be on the grid. Can Severus escape from the   

 maze?   

Input   
The first line will be a integer CS, indicating the number of test cases. In every case, there will be three    integer N, M, T. After that there will be N * M characters, decribe the maze.   
The "." is a empty grid, "#" is wall, "F" is the fire, "S" is the initial grid that Severus stands on.   

10 <= n , m  <= 100      10 <= T <=10000    

Output   
There is only one line, if Severus can get out, output the mininum time he need to escape from the maze. If he    can't,   

 output "Poor Severus must be caught by strong Figo!!!"   

Sample Input   
2 4 4 4 #### #SF# #..# #..# 3 3 4 ### #S.   
#.F   

 

Sample Output   

3 Poor Severus must be caught by strong Figo!!!   

```
#include<iostream>
#include<stdio.h>
#include<string.h>
#include<algorithm>
#include<math.h>
#include<queue>
#include<set>
using namespace std;
int direct[4][2]={1,0,0,1,-1,0,0,-1};
struct node
{
    int fireStep;
    char p;
    int x,y;
} a[101][101],c[10001],z[101],g;
int b[101][101];
int m,n,t;
void FireBfs(node nn)
{
    int i,j;
    for(i=0;i<n;i++)
    {
        for(j=0;j<m;j++)
        {
            b[i][j]=0;
        }
    }
    b[nn.x][nn.y]=1;
    int front=0,tail=0;
    a[nn.x][nn.y].fireStep=0;
    c[front]=nn;
    while(tail<=front)
    {
        node n1=c[tail++];
        for(i=0;i<4;i++)
        {
            int x=n1.x+direct[i][0];
            int y=n1.y+direct[i][1];
            if(x<n&&y<m&&x>=0&&y>=0&&b[x][y]==0)
            {
                b[x][y]=1;
                if(a[x][y].fireStep>a[n1.x][n1.y].fireStep+1||a[x][y].fireStep==-1)
                {
                    a[x][y].fireStep=a[n1.x][n1.y].fireStep+1;
                }
                c[++front]=a[x][y];
            }
        }
    }
}
int Bfs(node nn)
{
    int i,j;
    for(i=0;i<n;i++)
    {
        for(j=0;j<m;j++)
        {
            b[i][j]=-1;
        }
    }
    b[nn.x][nn.y]=0;
    int front=0,tail=0;
    c[front]=nn;
    while(tail<=front)
    {
        node n1=c[tail++];
        for(i=0;i<4;i++)
        {
            int x=n1.x+direct[i][0];
            int y=n1.y+direct[i][1];
            if(a[x][y].p=='.'&&a[x][y].fireStep>b[n1.x][n1.y]+1&&b[x][y]==-1&&x>=0&&x<n&&y>=0&&y<m)
            {
                b[x][y]=b[n1.x][n1.y]+1;
                c[++front]=a[x][y];
            }
            if(x==-1||x==n||y==-1||y==m)
            {
                return b[n1.x][n1.y]+1;
            }
        }
    }
    return -1;
}            
int main()
{
    int T;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            scanf("%d%d%d",&n,&m,&t);
            int i,j;
            int k=0;
            getchar();
            for(i=0;i<n;i++)
            {
                for(j=0;j<m;j++)
                {
                    scanf("%c",&a[i][j].p);
                    a[i][j].fireStep=-1;
                    a[i][j].x=i;
                    a[i][j].y=j;
                    if(a[i][j].p=='F')
                    {
                        z[k++]=a[i][j];
                    }
                    else if(a[i][j].p=='S')
                    {
                        g=a[i][j];
                    }
                }
                getchar();
            }
            for(i=0;i<k;i++)
            {
                FireBfs(z[i]);
            }
            k=Bfs(g);
        /*    for(i=0;i<n;i++)
            {
                for(j=0;j<m;j++)
                {
                    cout<<a[i][j].fireStep;
                }
                cout<<endl;
            }*/
            if(k==-1)
            {
                printf("Poor Severus must be caught by strong Figo!!!\n");
            }
            else
            {
                printf("%d\n",k);
            }
        }
    }
    return 0;
}
```