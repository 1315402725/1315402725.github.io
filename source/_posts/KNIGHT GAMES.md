---
title: KNIGHT GAMES
tags: ACM
categories: algorithm
abbrlink: 825daa8a
date: 2015-12-01 14:49:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/9.jpg
---
** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Knight Games   
Time Limit: 1000 MS	Memory Limit: 65536 K   
Total Submit: 39(21 users)	Total Accepted: 30(21 users)	Rating: 	Special Judge: No   
Description   
The knight in the chessboard has a unique L-shaped move: two squares in one direction either horizontally or vertically, and one square in another direction perpendicular to the first.   


The knight captures any pieces that it lands on at the end of its L-shaped move.   

 

Leyni and XianGe are playing a game on the n * n chessboard.   

The rules are:   

1. They take turns to put a new Knight on the board.   

2. There is no pair of the Knights could capture each other.   

3. The one who can’t put a new Knight loses.   

4. Leyni puts first.   

Leyni wonders whether he can win the game no matter how XianGe plays.   

 

Input   
There are multiple test cases. The first line of input is an integer T indicating the number of test cases. Then T test cases follow.   

For each test case:    

Line 1. This line contains an integer n (1 ≤ n ≤ 109) indicating the size of the chessboard.   

Output   
For each test case:   

Line 1. Output "YES" if Leyni can win no matter how XianGe plays, otherwise output "NO".   

Sample Input   
2   

1   
      
2   

Sample Output   
YES   

NO   

Source   
哈理工2012春季校赛 - 现场赛（热身）   




```
#include<cstdio>
#include<cmath>
#include<queue>
#include<iostream>
#include<algorithm>
using namespace std;
int main()
{
    int T;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            long n;
            scanf("%ld",&n);
            if(n%2==0)
            {
                printf("NO\n");
            }
            else
            {
                printf("YES\n");
            }
        }
    }
    return 0;
}
```