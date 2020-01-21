---
title: MERGE INTERVALS
tags: ACM
categories: algorithm
abbrlink: 5439e1af
date: 2015-12-02 23:03:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/16.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Merge Intervals   
Time Limit: 1000 MS	Memory Limit: 65535 K    
Total Submit: 58(24 users)	Total Accepted: 27(23 users)	Rating: 	Special Judge: No   
Description   
Given a collection of intervals, merge all overlapping intervals.   

For example,   

Given: [1,3],[2,6],[8,10],[15,18];   

after meger: [1,6],[8,10],[15,18].   
 
Input   
There are multiple test cases.   

For each test case:   

Line 1: This line contains an integer n indicating the number of intervals.   

Line 2..n+1: Each line contains a pair of integers  a and b, indicating the interval [a, b].   

1<=n<=100,000   

1<=a< = b<=1,000,000,000   

Output   
Output one line, contains the intervals separated by space after the merge. Output the intervals in     lexicographically smaller way.   
  
In other words, if we output [ai,bi] before [aj,bj], there must be ai < aj or ai=aj and bi <= bj.   

For more details, referring to the sample.   

Sample Input   
4   
1 3   
2 6   
8 10   
15 18   
5   
37 65   
29 43   
30 42   
31 87   
32 86   
Sample Output   
[1,6] [8,10] [15,18]   
[29,87]   

```
#include<iostream>
#include<stdio.h>
#include<string.h>
#include<algorithm>
#include<math.h>
using namespace std;
struct node
{
    int left;
    int right;
} a[100001],b[100001];
bool cmp(node x,node y)
{
    if(x.left!=y.left)
    {
        return x.left<y.left;
    }
    return x.right<y.right;
}
int main()
{
    int n;
    while(~scanf("%d",&n))
    {
        int i;
        for(i=0;i<n;i++)
        {
            scanf("%d%d",&a[i].left,&a[i].right);
        }
        sort(a,a+n,cmp);
        int k=0;
        node p=a[0];
        for(i=1;i<n;i++)
        {
            if(a[i].left<=p.right&&a[i].right>p.right)
            {
                p.right=a[i].right;
            }
            if(a[i].left>p.right)
            {
                 b[k++]=p;
                 p=a[i];
            }
        }
        b[k++]=p;
        for(i=0;i<k;i++)
        {
            printf("%c%d%c%d%c%c",'[',b[i].left,',',b[i].right,']',i==k-1? '\n':' ');
        }
    }
    return 0;
}
```