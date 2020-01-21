---
title: A SIMPLE PROBLEM WITH INTEGERS(区间更新)
tags: 线段树
categories: algorithm
abbrlink: 7e86c8c7
date: 2015-11-27 20:10:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/2.jpg
---
** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>


A Simple Problem with Integers
Time Limit: 3000 MS	Memory Limit: 32768 K
Total Submit: 178(48 users)	Total Accepted: 51(36 users)	Rating:	Special Judge: No
Description
You have N integers, A1, A2, ... , AN. You need to deal with two kinds of operations. One type of operation is to add some given number to each number in a given interval. The other is to ask for the sum of numbers in a given interval.
Input
Input contain multiple test cases,for each case:

The first line contains two numbers N and Q. 1 ≤ N,Q ≤ 100000.
The second line contains N numbers, the initial values of A1, A2, ... , AN. -1000000000 ≤ Ai ≤ 1000000000.
Each of the next Q lines represents an operation.
"C a b c" means adding c to each of Aa, Aa+1, ... , Ab. -10000 ≤ c ≤ 10000.
"Q a b" means querying the sum of Aa, Aa+1, ... , Ab.

 
Output
You have N integers, A1, A2, ... , AN. You need to deal with two kinds of operations. One type of operation is to add some given number to each number in a given interval. The other is to ask for the sum of numbers in a given interval.
Sample Input
10 5   
1 2 3 4 5 6 7 8 9 10  
Q 4 4  
Q 1 10  
Q 2 4  
C 3 6 3  
Q 2 4  
Sample Output  
4  
55  
9  
15  
Source  
POJ Monthly--2007.11.25, Yang Yi  
Recommend  
`Wind @Hrbust  


```
#include<cstdio>
#include<cmath>
#include<queue>
#include<iostream>
using namespace std;
const int m=100000;
typedef long long LL;
struct node
{
    LL Inc;
    LL sum;
}a[m<<2];
LL b[m+1];
void build(int L,int R,int rt)
{
    a[rt].Inc=0;
    if(L==R)
    {
    //    scanf("%lld",&b[L]);
        a[rt].sum=b[L];
        return ;
    }
    int lr=rt<<1,rr=rt<<1|1;
    int mid=(L+R)>>1;
    build(L,mid,lr);
    build(mid+1,R,rr);
    a[rt].sum=a[lr].sum+a[rr].sum;
}
void update(int l,int r,int L,int R,int rt,LL x)
{
    if(L==l&&R==r)
    {
        a[rt].Inc+=x;
        return ;
    }
    a[rt].sum+=(r-l+1)*x;
    int m=(L+R)>>1;
    int lr=rt<<1,rr=rt<<1|1;
    if(r<=m)
    {
        update(l,r,L,m,lr,x);
    }
    else if(l>m)
    {
        update(l,r,m+1,R,rr,x);
    }
    else
    {
        update(l,m,L,m,lr,x);
        update(m+1,r,m+1,R,rr,x);
    }
}
LL  query(int l,int r,int L,int R,int rt)
{
    if(l<=L&&r>=R)
    {
        return a[rt].sum+a[rt].Inc*(r-l+1);
    }
    a[rt].sum+=(R-L+1)*a[rt].Inc;
    int m=(L+R)>>1;
    int lr=rt<<1,rr=rt<<1|1;
    if(a[rt].Inc)
    {
        //update(L,m,L,m,lr,a[rt].Inc);
    //    update(m+1,R,m+1,R,rr,a[rt].Inc);
        a[lr].Inc+=a[rt].Inc;
        a[rr].Inc+=a[rt].Inc;
    }
    a[rt].Inc=0;
    if(r<=m)
    {
        return query(l,r,L,m,lr);
    }
    else if(l>m)
    {
        return query(l,r,m+1,R,rr);
    }
    LL left=query(l,m,L,m,lr);
    LL right=query(m+1,r,m+1,R,rr);
    return left+right;
}

int main()
{
    int N,Q;
    while(~scanf("%d%d",&N,&Q))
    {
        int i;
        for(i=1;i<=N;i++)
        {
            scanf("%lld",&b[i]);
        }
        build(1,N,1);
        char c;
        int l,r;
        LL x;
        while(Q--)
        {
            cin>>c;
            if(c=='Q')
            {
                scanf("%d%d",&l,&r);
                printf("%lld\n",query(l,r,1,N,1));
            }
            else if(c=='C')
            {
              //cout<<"dsfdsf"<<endl;
                scanf("%d%d%lld",&l,&r,&x);
                update(l,r,1,N,1,x);
            }
        }
    }
    return 0;
}
```