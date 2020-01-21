---
title: MARSHAL'S CONFUSION II
tags: ACM
categories: 数学
abbrlink: a34e5bf7
date: 2015-11-24 23:53:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/14.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Marshal's confusion II   
Time Limit: 1000 MS	Memory Limit: 65536 K   
Total Submit: 239(80 users)	Total Accepted: 73(66 users)	Rating: 	Special Judge: No   
Description   
one day, Marshal want to show the answer :Calculate S(n). S(n)=1^3+2^3 +3^3 +......+n^3 .    
Input   
Each line will contain one integer N(1 < n < 1000000000). Process to end of file.   
Output   
For each case, output the last four dights of S(N) in one line.   
Sample Input   
1 2   
Sample Output   
0001 0009    

```
#include<cmath>
#include<queue>
#include<iostream>
using namespace std;
const int m=10000;
typedef long LL;
int main()
{
    LL n;
    while(~scanf("%ld",&n))//1^3+2^3+...+n^3=[n(n+1)/2]^2
    {
        LL a;
        a=n*(n+1)/2%m;
        LL sum=a*a%m;
        printf("%04d\n",sum);
    }
    return 0;
}
```