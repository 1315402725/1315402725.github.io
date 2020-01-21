---
title: Diablo
tags: 广搜
categories: algorithm
abbrlink: 6da52baf
date: 2015-10-13 15:30:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/5.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Diablo   
Time Limit: 1000 MS	Memory Limit: 65536 K   
Total Submit: 43(22 users)	Total Accepted: 24(21 users)	Rating: 	Special Judge: No   
Description   


Diablo是地狱中的三大魔王之一，有着非常强大的破坏力，Diablo期望着可以将一切都投入到地狱之中。为了不让Diablo的计划得逞，一位英雄决   定挺身而出，试图击败Diablo。DIablo喜欢把眼前的区域变成一片火海，Diablo吐出火焰的蔓延是有一定规律的，火焰总是会向能量较低的区域蔓   延。英雄如果不想被Diablo击败的话，就需要在Diablo喷出火焰的一瞬间逃到火焰烧不到的地方，但是他只能在这一瞬逃出3个单位长度的距离。现   在我们给出现场的一个地图，并且给出Diablo和英雄所在的位置，我们要知道英雄是否可以逃脱Diablo的攻击。（火焰蔓延方向只能是上、下、左   、右）   

Input   
本题有多组测试数据，对于每组数据第一行输入6个非负整数，分别表示地图的长、宽（分别对应m、n），Diablo的坐标以及英雄的坐标。接下来n行每行输入m个数，表示地图上每个点的能量值（值在32位有符号整数范围内）。m、n值均不大于100，且我们保证数据合理合法。   
Output   
如果英雄可以逃脱Diablo的攻击，输出Hero will be back并换行，否则输出Diablo win并换行。   
Sample Input   
3 3 0 0 2 2 5 4 1 4 3 2 3 2 1   

 

6 4 0 0 2 3 5 2 6 7 3 0 4 3 8 1 5 5 9 1 8 3 6 5 8 7 6 5 4 2   

Sample Output   
Diablo win   

Hero will be back   

 

Hint   
我们来看看第二组样例数据，Diablo所处的位置是(0, 0)，那么Diablo在地图上左上角的点，其能量值为5。英雄所在的位置是(2, 3)，也就是我们看到地图上第三行第四列的位置，其能量值为3。不过火焰只能从能量高的地方向能量低的地方蔓延，尽管英雄处在的位置能量值较低，但是火焰却无法蔓延到这里，因为有能量相对较高的地势阻隔。假设英雄所在的位置能被火焰蔓延到，他只需在3步内找到一个火焰不可达的合法区域即可躲过攻击。   
Source   
2014 Winter Holiday Contest 5   
Author   
杨和禹   

这个广搜的时候、应该注意，即便是已经遍历过的点，也不应该阻止下次·对这个点的遍历，因为只要被监测点的周围任意一个店的能量值比此点高，那么此点就应该被火焰蔓延   


```
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <algorithm>
#include <iostream>
using namespace std;
int m,n,x_1,y_1,x_2,y_2;
typedef long long LONG;
LONG a[101][101];
int direct[4][2]={0,1,-1,0,0,-1,1,0};
int visit[100][100];
struct node
{
int x,y;
LONG e;
} p[10001],p1,p2;
int bfs()
{
int k=0;
int i,front=0,rear=0;
p[0]=p1;
memset(visit,0,sizeof(visit));
visit[x_1][y_1]=2;
while(rear<=front)
{
p2=p[rear++];
int e1=p2.e;
for(i=0;i<4;i++)
{
int x1=p2.x+direct[i][0];
int y1=p2.y+direct[i][1];
if(x1>=0&&x1<n&&y1>=0&&y1<m&&visit[x1][y1]!=2)
{
if(a[x1][y1]<e1)
{
p1.x=x1;
p1.y=y1;
p1.e=a[x1][y1];
p[++front]=p1;
visit[x1][y1]=2;
if(x1==x_2&&y1==y_2)
{
k=1;
}
}
else
{
visit[x1][y1]=1;
}
}
}
}
return k;

}
int check()
{
int xh,yh,i,j;
for(i=0;i<4;i++)
{
xh=x_2;
yh=y_2;
for(j=0;j<3;j++)
{
xh+=direct[i][0];
yh+=direct[i][1];
if(xh>=0&&xh<n&&yh>=0&&yh<m)
{
//	cout<<visit[xh][yh];
if(visit[xh][yh]!=2)
{
return 1;
}
}
}
//	cout<<endl;
}
return 0;
}
int main()
{
while(~scanf("%d%d%d%d%d%d",&m,&n,&x_1,&y_1,&x_2,&y_2))	
{	
int i,j;	
for(i=0;i<n;i++)	
{	
for(j=0;j<m;j++)	
{	scanf
("%lld",&a[i][j]);	
}	
}	p1

.x=x_1;	p1
.y=y_1;	p1
.e=a[x_1][y_1];
/*	i=bfs();	for(i=0;i<n;i++)	{	for(j=0;j<m;j++)	{	printf("%ld ",visit[i][j]);	}	cout<<endl;	}*/

i=bfs();	
if(i==0)	
{	printf
("Hero will be back\n");	
}	
else	
{	
if(check()==1)	
{	printf
("Hero will be back\n");	
}	
else	
{	printf
("Diablo win\n");	
}	
}	
}	
return 0;
}
```