---
title: NEXT PERMUTATION(全排列生成算法)
tags: ACM
categories: algorithm
abbrlink: bd3fa96e
date: 2015-12-01 00:25:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/18.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

Next Permutation   
Time Limit: 1000 MS	Memory Limit: 65536 K   
Total Submit: 96(47 users)	Total Accepted: 58(44 users)	Rating: 	Special Judge: No   
Description   
A permutation is each one of the (n!) possible arrangements the elements in a set can take (where n is the number of elements in the set). Different permutations can be ordered according on how they compare lexicographically to each other; the first such-sorted possible permutation (the one that would compare lexicographically smaller to all other permutations) is the one which has all its elements sorted in ascending order, and the largest has all its elements sorted in descending order.   

You need to determine the next k-th higher permutation of a given permutation of the set {1, 2, 3 … n}.   

Input   
There are multiple test cases. The first line of input is an integer T indicating the number of test cases. Then T test cases follow.   

For each test case:   

Line 1. This line contains two space-separated integers n and k (1 ≤ n, k ≤ 1000)   

Line 2. This line contains n space-separated integers indicating a permutation of {1, 2, 3 … n}   

Output   
For each test case:   

Line 1. Output the next k-th higher permutation of the set {1, 2, 3 … n}.Separate the numbers by a single space.

Sample Input   
3   

3 1   

2 3 1   

3 1   

3 2 1   

10 2   

1 2 3 4 5 6 7 8 9 10   

Sample Output   
3 1 2   

1 2 3   

1 2 3 4 5 6 7 9 8 10   

Hint   
In the first sample, all the permutations of {1, 2, 3} in lexicographical order are as below:   

{1, 2, 3}   
  
{1, 3, 2}   

{2, 1, 3}   

{2, 3, 1}   
 
{3, 1, 2}   

{3, 2, 1}   

So the next first permutation of {2, 3, 1} is {3, 1, 2}.   

Source   
哈理工2012春季校赛 - 网络预选赛   
Author   
齐达拉图@HRBUST   


这是一个求一个排序的下一个排列的函数，可以遍历全排列,要包含头文件<algorithm>
下面是代码，与之完全相反的函数还有prev_permutation   


```
#include<cstdio>
#include<cmath>
#include<queue>
#include<iostream>
#include<algorithm>
using namespace std;
int main()
{
    int a[1001];
    int T;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            int n,k;
            scanf("%d%d",&n,&k);
            int i;
            for(i=0;i<n;i++)
            {
                scanf("%d",&a[i]);    
            }
            while(k--)
            {
                next_permutation(a,a+n);
            }
            for(i=0;i<n;i++)
            {
                printf("%d%c",a[i],i==n-1? '\n':' ');
            }
        }
    }
    return 0;
}
```

一下转自：作者：王雨濛；新浪微博：@吉祥村码农；来源：《程序控》博客 -- http://www.cnblogs.com/devymex/  

概念   
全排列的生成算法有很多种，有递归遍例，也有循环移位法等等。C++/STL中定义的next_permutation和prev_permutation函数则是非常灵活且高效的一种方法，它被广泛的应用于为指定序列生成不同的排列。本文将详细的介绍prev_permutation函数的内部算法。   

按照STL文档的描述，next_permutation函数将按字母表顺序生成给定序列的下一个较大的序列，直到整个序列为减序为止。prev_permutation函数与之相反，是生成给定序列的上一个较小的序列。二者原理相同，仅遍例顺序相反，这里仅以next_permutation为例介绍算法。   

下文内容都基于一个假设，即序列中不存在相同元素。对序列大小的比较做出定义：两个长度相同的序列，从两者的第一个元素开始向后比较，直到出现一个不同元素（也可能就是第它们的第一个元素），该元素较大的序列为大，反之序列为小；若一直到最后一个元素都相同，那么两个序列相等。

设当前序列为pn，下一个较大的序列为pn+1，那么不存在pm，使得pn < pm < pn+1。   

 

问题   
给定任意非空序列，生成下一个较大或较小的序列。    

复杂度   
最好的情况为pn的最右边的2个元素构成一个最小的增序子集，交换次数为1，复杂度为O(1)，最差的情况为1个元素最小，而右面的所有元素构成减序子集，这样需要先将第1个元素换到最右，然后反转右面的所有元素。交换次数为1+(n-1)/2，复杂度为O(n)。因为各种排列等可能出现，所以平均复杂度即为O(n)。   

 

扩展   
1. 能否直接算出集合{1, 2, ..., m}的第n个排列？   

设某个集合{a1, a2, ..., am}（a1<a2<...<am）构成的某种序列pn，基于以上分析易证得：若as<at，那么将as作为第1个元素的所有序列一定都小于at作为第1个元素的任意序列。同理可证得：第1个元素确定后，剩下的元素中若as'<at'，那么将as'作为第2个元素的所有序列一定都小于作为第2个元素的任意序列。例如4个数的集合{2, 3, 4, 6}构成的序列中，以3作为第1个元素的序列一定小于以4或6作为第1个元素的序列；3作为第1个元素的前题下，2作为第2个元素的序列一定小于以4或6作为第2个元素的序列。   

推广可知，在确定前i（i<n）个元素后，在剩下的m-i=s个元素的集合{aq1, aq2, ..., aq3}（aq1<aq2<...<aqm）中，以aqj作为第i+1个元素的序列一定小于以aqj+1作为第i+1个元素的序列。由此可知：在确定前i个元素后，一共可生成s!种连续大小的序列。   

根据以上分析，对于给定的n（必有n<=m!）可以从第1位开始向右逐位地确定每一位元素。在第1位不变的前题下，后面m-1位一共可以生成(m-1)!中连续大小的序列。若n>(m-1)!，则第1位不会是a1，n中可以容纳x个(m-1)!即代表第1位是ax。在确定第1位后，将第1位从原集合中删除，得到新的集合{aq1, aq2, ..., aq3}（aq1<aq2<...<aqm），然后令n1=n-x(m-1)!，求这m-1个数中生成的第n1个序列的第1位。   
   
举例说明：如7个数的集合为{1, 2, 3, 4, 5, 6, 7}，要求出第n=1654个排列。   

(1654 / 6!)取整得2，确定第1位为3，剩下的6个数{1, 2, 4, 5, 6, 7}，求第1654 % 6!=214个序列；   

(214 / 5!)取整得1，确定第2位为2，剩下5个数{1, 4, 5, 6, 7}，求第214 % 5!=94个序列；   

(94 / 4!)取整得3，确定第3位为6，剩下4个数{1, 4, 5, 7}，求第94 % 4!=22个序列；   

(22 / 3!)取整得3，确定第4位为7，剩下3个数{1, 4, 5}，求第22 % 3!=4个序列；   

(4 / 2!)得2，确定第5为5，剩下2个数{1, 4}；由于4 % 2!=0，故第6位和第7位为增序<1 4>；    

因此所有排列为：3267514。   

 

2. 给定一种排列，如何算出这是第几个排列呢？   

和前一个问题的推导过程相反。例如3267514：   

后6位的全排列为6!，3为{1, 2, 3 ,4 , 5, 6, 7}中第2个元素（从0开始计数），故2*720=1440；   

后5位的全排列为5!，2为{1, 2, 4, 5, 6, 7}中第1个元素，故1*5!=120；   

后4位的全排列为4!，6为{1, 4, 5, 6, 7}中第3个元素，故3*4!=72；   

后3位的全排列为3!，7为{1, 4, 5, 7}中第3个元素，故3*3!=18；   

后2位的全排列为2!，5为{1, 4, 5}中第2个元素，故2*2!=4；   

最后2位为增序，因此计数0，求和得：1440+120+72+18+4=1654   


```
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;
//主函数，算法详见相关说明
int main(void) {
    //循环处理输入的每一个字符串
    for (string str; cin >> str;) {
        if (str.empty()) {
            continue;
        }
        //如果字符串只有1个字符，则直接输出结束
        if (str.length() <= 1) {
            cout << "No more Permutation" << endl;
        }
        //iPivot为右边最大减序子集左边相邻的一个元素
        string::iterator iPivot = str.end(), iNewHead;
        //查找右边最大的减序子集
        for (--iPivot; iPivot != str.begin(); --iPivot) {
            if (*(iPivot - 1) <= *iPivot ) {
                break;
            }
        }
        //如果整个序列都为减序，则重排结束。
        if (iPivot == str.begin()) {
            cout << "No more Permutation" << endl;
        }
        //iPivot指向子集左边相邻的一个元素
        iPivot--;
        //iNewHead为仅比iPivot大的元素，在右侧减序子集中寻找
        for (iNewHead = iPivot + 1; iNewHead != str.end(); ++iNewHead) {
            if (*iNewHead < *iPivot) {
                break;
            }
        }
        //交换iPivot和iNewHead的值，但不改变它们的指向
        iter_swap(iPivot, --iNewHead);
        //反转右侧减序子集，使之成为最小的增序子集
        reverse(iPivot + 1, str.end());
        //本轮重排完成，输出结果
        cout << str << endl;
    }
    return 0;
}
```