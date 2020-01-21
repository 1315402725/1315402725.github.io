---
title: COUNTLESS CANDIES
tags: ACM
categories: algorithm
abbrlink: a921047e
date: 2015-11-20 17:49:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/4.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Countless Candies   
Time Limit: 1000 MS	Memory Limit: 10240 K   
Total Submit: 112(42 users)	Total Accepted: 43(37 users)	Rating:	Special Judge: No   
Description   
     小w喜欢吃糖果，一次偶然的机会，小w再次邂逅了阿拉神灯。      阿拉神灯知道小w的心意之后问：你想要多少糖哈,亲~      小w笑答：不要太多啦，吃不完就够了~      阿拉神灯：￥^ @ % & * R & ^...      善良的小w想把这些糖果分一些给自己的好朋友。小w有N 个好朋友，编号从1到N。小w要分N次，每次操作如下：[L, R]表示给编号在L到R 的朋友每人一块糖。最后，小w想知道每个朋友分得了多少糖果，由于人缘太好，朋友太多而没法统计，请帮助小w计算一下最后的结果吧。   
Input   
第 1 行：一个整数N 表示朋友的数量 （1 ≤N≤100000） 第 2到N+1行：每行两个整数L,R，表示编号在[L, R]内的朋友，每人分得一块糖。 多组测试数据，处理到文件结束。   
Output   
N 个整数表示每个朋友得到的糖果的数量，每组测试数据占一行。   
Sample Input   
4   
1 2   
2 3   
1 3   
1 4   
Sample Output   
3 4 3 1   

为了使其时间复杂度最低，我们弄一个数组，在a[l]++,在a[r+1]--这样在输出的时候应该有的有不应该有的没有   

```
#include<cstdio>
#include<cmath>
#include<queue>
#include<iostream>
using namespace std;
int a[100001];
int main()
{
    int N;
    while(~scanf("%d",&N))
    {
        int i,l,r;
        int h=N;
        memset(a+1,0,(N+1)*sizeof(int));
        while(h--)
        {
            scanf("%d%d",&l,&r);
            a[l]++;
            a[r+1]--;
        }
        l=0;
        for(i=1;i<N;i++)
        {
            l+=a[i];
            printf("%d ",l);
        }
        l+=a[N];
        printf("%d\n",l);
    }
    return 0;
}
```