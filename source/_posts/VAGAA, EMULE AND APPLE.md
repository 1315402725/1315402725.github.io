---
title: 'VAGAA, EMULE AND APPLE'
tags: ACM
categories: algorithm
abbrlink: 79a83d23
date: 2015-10-10 18:46:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/20.jpg
---
** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Vagaa, eMule and Apple   
Time Limit: 1000 MS	Memory Limit: 65536 K   
Total Submit: 105(57 users)	Total Accepted: 54(50 users)	Rating: 	Special Judge: No   
Description   
Vagaa is a strange dog and eMule is a strange mule. They are friends.   

They love apples and math.   

One day, they buy a big apple which weighs w kilos. They wonder whether they can divide it into exactly two parts in a way that each part weighs even number of kilos.   
  
Input   
There are multiple test cases. The first line of input is an integer T indicating the number of test cases. Then T test cases follow.   

For each test case:   

Line 1. This line contains an integer w (1 ≤ w ≤ 100).   

Output   
For each test case:   

Line 1. Output "YES" if they can, otherwise output "NO".   

Sample Input   
1   
 
10   

Sample Output   
YES   

Hint   
In the sample, they can divide the apple into two parts of 2 and 8 kilos.   

Source   
哈理工2012春季校赛 - 现场赛（热身）   
Author   
齐达拉图@HRBUST 
 为毛这种题三颗星  
```
#include<iostream>
#include<algorithm>
#include<cmath>
using namespace std;
int main()
{
int T;
while(~scanf("%d",&T))
{
while(T--)
{
int n;
scanf("%d",&n);
int i;
int key=0;
for(i=2;i<=n/2;i+=2)
{
if((n-i)%2==0)
{
key=1;
break;
}
}
if(key==1)
{
cout<<"YES"<<endl;
}
else
{
cout<<"NO"<<endl;
}
}
}
return 0;
}
```