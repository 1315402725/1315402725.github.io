---
title: KNIGHT
tags: 广搜
categories: algorithm
abbrlink: f4f16136
date: 2015-10-16 23:55:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/10.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Knight   
Time Limit: 1000 MS	Memory Limit: 65536 K   
Total Submit: 106(37 users)	Total Accepted: 54(35 users)	Rating: 	Special Judge: No   
Description   
The knight in the chessboard wonders the least number of moves to go to square t from square s. The knight has a unique L-shaped move: two squares in one direction either horizontally or vertically, and one square in another direction perpendicular to the first.   


Help him to solve this problem!   

Input   
There are multiple test cases. The first line of input is an integer T indicating the number of test cases. Then T test cases follow.   

For each test case:   

Line 1. This line contains the chessboard coordinates of position s indicating the square the knight is currently in.   

Line 2. This line contains the chessboard coordinates of position t indicating the square the knight wants to go to.   

The coordinate consists of a lowercase letter from a to h and a digit from 1 to 8.   

Output   
For each test case:   

Line 1. Output the least number of moves.   

Sample Input   
1   

a1   
   
a3   

Sample Output   
2   

Source   
哈理工2012春季校赛 - 现场赛   
Author   
齐达拉图@HRBUST   


原来，马是走日的、、原谅我的英语水平、、、。。   

```
#include<iostream>
#include<cmath>
#include<stdio.h>
using namespace std;
int a[10][10];
int visit[10][10];
int direct[8][2]={{1,2},{2,1},{-1,2},{2,-1},{1,-2},{-2,1},{-1,-2},{-2,-1}};
int b[200],x;
int c[10]={0,8,7,6,5,4,3,2,1};
char y;
struct node
{
int x;
char y;
} p,q[1000];
int bfs()
{
p.x=x;
int j,i;
p.y=y;
for(i=0;i<10;i++)
{
for(j=0;j<10;j++)
{
visit[i][j]=-1;
}
}
visit[c[x]][b[y]]=0;
int front=0,rear=0;
q[0]=p;
while(rear<=front)
{
p=q[rear++];
int x=p.x;
int y=p.y;
for(i=0;i<8;i++)
{

int x1=x+direct[i][0];
int y1=y+direct[i][1];
if(x1<=8&&x1>0&&y1>=97&&y1<=104&&visit[c[x1]][b[y1]]==-1)
{
if(a[c[x1]][b[y1]]==1)
{ visit[c[x1]][b[y1]]=visit[c[x]][b[y]]+1;
return visit[c[x]][b[y]]+1;
}
else
{
visit[c[x1]][b[y1]]=visit[c[x]][b[y]]+1;
q[++front].x=x1;
q[front].y=y1;
}
}

}
}
return -1;
}
int main()
{
int i,j;
int k=0;
for(i='a';i<='h';i++)
{
b[i]=k++;
}
int T;
while(~scanf("%d",&T))
{
while(T--)	
{	getchar
();	memset
(a,0,sizeof(a));	
char y1;	
int x1;	scanf
("%c%d",&y,&x);	a
[c[x]][b[y]]=2;	getchar
();	scanf
("%c%d",&y1,&x1);	
if(x==x1&&y==y1)	
{	cout
<<0<<endl;	
continue;	
}	a
[c[x1]][b[y1]]=1;	cout
<<bfs()<<endl;	
/*	for(i=1;i<=8;i++)	{	for(j=0;j<8;j++)	{	cout<<visit[i][j]<<"  ";	}	cout<<endl;	}*/







}	
}	
return 0;
}
```