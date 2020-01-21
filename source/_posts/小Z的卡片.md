---
title: 小Z的卡片
tags: 排序
categories: algorithm
abbrlink: d1557dc8
date: 2015-11-10 12:02:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/37.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

小z的卡片    
Time Limit: 1000 MS	Memory Limit: 32768 K   
Total Submit: 56(18 users)	Total Accepted: 15(12 users)	Rating: 	Special Judge: No   
Description   
小w和小z想到了一个新游戏，在这个游戏中他们各有N个卡片。小w想去使用她的卡片去覆盖小z的卡片。   

卡片A能覆盖卡片B的条件是卡片A的高不小于卡片B的高同时卡片A的宽不小于卡片B的宽。   

现在请计算出小w的牌最多能覆盖小z的牌的数量。注意牌只能被使用一次，并且牌不能被旋转。   

  
Input   
第一行是一个整数t代表测试数据组数。   

对于每组测试数据第一行是一个整数n(n<=100000)代表卡片数量。   

接下来n行每行两个整数h(h<=1000000000)和w(w<=1000000000)代表小w的卡片的高和宽。    

在接下来n行每行两个整数h(h<=1000000000)和w(w<=1000000000)代表小z的卡片的高和宽。    

 
Output   
对于每组测试数据，输出小w的牌最多能覆盖小z的牌的数量。   
Sample Input   
2   

2   

1 2   

3 4   

2 3   

4 5   

3   

2 3   

5 7   
 
6 8   

4 1   

2 5   

3 4    

 
Sample Output   
1   
 
2   

 一开始相出的办法超时了，方法是，对小z的牌排序，然后对于小w的每个牌，找到宽度最接近的，然后覆盖它

代码：

```
#include<iostream>
#include<stdio.h>
#include<string.h>
#include<algorithm>
#include<math.h>
#include<queue>
using namespace std;
struct node 
{
    int height,width;
    int key;
} a[100001],b[100001];
bool cmp(node x,node y)
{
    return x.height<y.height;
}
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
            for(i=0;i<n;i++)
            {
                scanf("%d%d",&a[i].height,&a[i].width);
            }
            for(i=0;i<n;i++)
            {
                scanf("%d%d",&b[i].height,&b[i].width);
                b[i].key=0;
            }
            sort(b,b+n,cmp);
            int sum=0,j;
            int width_Max=1000000000;
            int width_Mark;
            for(i=0;i<n;i++)
            {
                width_Max=1000000000;
                for(j=0;j<n;j++)
                {
                    if(b[j].key==1)
                    {
                        continue;
                    }
                    if(b[j].height>a[i].height)
                    {
                        break;
                    }
                    else if(b[j].height<=a[i].height&&b[j].width<=a[i].width)
                    {
                        if(a[i].width-b[j].width<width_Max)
                        {
                            width_Max=a[i].width-b[j].width;
                            width_Mark=j;
                        }
                    }
                }
                if(width_Max!=1000000000)
                {
                    b[width_Mark].key=1;
                    sum++;
                }
            }
            printf("%d\n",sum);
        }
    }
    return 0;
}
```

时间复杂度是n*n,这样会超时，   

所以   

把所有卡片放在一起排序，然后把排在前面的小z的卡片装在容器里，遇见小w的卡片，就在容器里找一个最大宽度的可覆盖的卡片   

```
#include<iostream>
#include<stdio.h>
#include<string.h>
#include<algorithm>
#include<math.h>
#include<queue>
#include<set>
using namespace std;
struct node
{
    int height,width;
    int key;
}p[200001];
bool cmp(node x,node y)
{
    if(x.height!=y.height)
    {
        return x.height<y.height;
    }
    return x.key>y.key;
}
multiset <int> s;
multiset <int> :: iterator it;
int main()
{
    int T;
    while(~scanf("%d",&T))
    {
        while(T--)
        {
            int n;
            scanf("%d",&n);
            int i;;
            for(i=0;i<2*n;i++)
            {
                scanf("%d%d",&p[i].height,&p[i].width);
                if(i>=n)
                {
                    p[i].key=1;
                }
                else
                {
                    p[i].key=0;
                }
            }
            s.clear();
            sort(p,p+2*n,cmp);
            int sum=0;
            for(i=0;i<2*n;i++)
            {
                if(p[i].key==1)
                {
                    s.insert(p[i].width);
                }
                else if(!s.empty())
                {
                    if(*s.begin()<=p[i].width)
                    {
                        it=s.upper_bound(p[i].width);
                        it--;
                        s.erase(it);
                        sum++;
                    }
                }
            }
            printf("%d\n",sum);
        }
    }
    return 0;
}
```