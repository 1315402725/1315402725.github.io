---
title: LCIS
tags: 线段树
categories: algorithm
abbrlink: 5183ff02
date: 2015-11-02 23:23:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/11.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

LCIS   
Time Limit: 3000 MS	Memory Limit: 32768 K   
Total Submit: 70(28 users)	Total Accepted: 33(26 users)	Rating: 	Special Judge: No   
Description   
Given n integers.   
You have two operations:   
U A B: replace the Ath number by B. (index counting from 0)   
Q A B: output the length of the longest consecutive increasing subsequence (LCIS) in [a, b].   
Input   
T in the first line, indicating the case number.   
Each case starts with two integers n , m(0<n,m<=105).   
The next line has n integers(0<=val<=105).   
The next m lines each has an operation:   
U A B(0<=A,n , 0<=B=105)   
OR   
Q A B(0<=A<=B< n).   
Output   
For each Q, output the answer.   
Sample Input   
1 10 10 7 7 3 3 5 9 9 8 1 8  Q 6 6 U 3 4 Q 0 1 Q 0 5 Q 4 7 Q 3 5 Q 0 2 Q 4 6 U 6 10 Q 0 9   
Sample Output   
1 1 4 2 3 1 2 5   
Recommend   
`Wind @Hrbust   
Author   
shǎ崽   
```
#include<cstdio>
#include<cmath>
#include<queue>
const int SIZE=100005;
int LC[SIZE<<2];
int RC[SIZE<<2];
int CS[SIZE<<2];
int a[SIZE];
int N,M;
template <class typeone>
typeone max(typeone x,typeone y)
{
    return x>y? x:y;
}
template <class typeone >
typeone min(typeone x,typeone y)
{
    return x<y? x:y;
}
void pushup(int l,int r,int lr)
{
    LC[lr]=LC[lr<<1];
    RC[lr]=RC[lr<<1|1];
    CS[lr]=0;
    int m=(l+r)>>1;
    if(a[m]<a[m+1])
    {
        CS[lr]=RC[lr<<1]+LC[lr<<1|1];
        if(LC[lr]==m-l+1)
        {
            LC[lr]+=LC[lr<<1|1];
        }
        if(RC[lr]==r-m)
        {
            RC[lr]+=RC[lr<<1];
        }
    }
    CS[lr]=max(CS[lr],max(CS[lr<<1],CS[lr<<1|1]));
    return;
}

void build(int l,int r,int rt)
{
    LC[rt]=RC[rt]=CS[rt]=0;
    if(l==r)
    {
        LC[rt]=RC[rt]=CS[rt]=1;
        scanf("%d",&a[l]);
        return ;
    }
    int m=(l+r)>>1;
    build(l,m,rt<<1);
    build(m+1,r,rt<<1|1);
    pushup(l,r,rt);
    return ;
}
void update(int pos,int l,int r,int rt,int val)
{
    if(l==pos&&r==pos)
    {
        a[pos]=val;
        return;
    }
    int m=(l+r)>>1;
    if(pos<=m)
    {
        update(pos,l,m,rt<<1,val);
    }
    else
    {
        update(pos,m+1,r,rt<<1|1,val);
    }
    pushup(l,r,rt);
    return ;
}
int query(int L,int R,int l,int r,int rt)
{
    if(L<=l&&R>=r)
    {
        return CS[rt];
    }
    int m=(l+r)>>1;
    if(R<=m)
    {
        return query(L,R,l,m,rt<<1);
    }
    else if(L>m)
    {
        return  query(L,R,m+1,r,rt<<1|1);
    }
    else
    {
        int t1=0,t2=0,t3=0;
        t1=query(L,R,l,m,rt<<1);
        t2=query(L,R,m+1,r,rt<<1|1);
        if(a[m]<a[m+1])
        {
            t3=min(LC[rt<<1|1],R-m)+min(RC[rt<<1],m-L+1);
        }
        return max(t3,max(t1,t2));
    }
}
int main()
{
    int T;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            char k[2];
            scanf("%d %d",&N,&M);
            build(1,N,1);
            int x,y;
        //    getchar();
            while(M--)
            {
                scanf("%s %d %d",&k,&x,&y);
                if(strcmp(k,"Q")==0)
                {
                    printf("%d\n",query(x+1,y+1,1,N,1));    
                }
                else
                {
                    update(x+1,1,N,1,y);
                }
            }
        }
    }
    return 0;
}
```
 