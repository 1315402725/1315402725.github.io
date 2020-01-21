---
title: IKKI的卡片（大数）
tags: ACM
categories: algorithm
abbrlink: 8cb5153e
date: 2015-10-27 23:55:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/7.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>


ikki的卡片   
Time Limit: 1000 MS	Memory Limit: 32768 K   
Total Submit: 135(45 users)	Total Accepted: 48(41 users)	Rating: 	Special Judge: No   
Description   
ikki有一沓标有大写英文字母的卡片，但是奇怪的是里面只有标从’A’-‘T’的卡片，ikki用这20种卡片设计了一个   

小游戏：用’A’-‘T’分别表示数字 0 – 19，ikki把这些卡片表示的字母看成是20进制数，并用卡片拼成了两个数   

字，现在ikki想让你用卡片表示出这两个数字相加之后的结果（卡片数量不限）。例如：拼成两个20进制数   

分别是AAAADH,BCE 可以这样得到结果：   

a = 0 * 20^5+0* 20^4+ 0* 20^3+ 0 *20^2 + 3*20 + 7 = 67 b = 1*20^2 + 2*20 + 4 = 444 a + b = 511 = BFL   
 
Input   
多组测试数据。    

每组测试数据输入两个只包含大写字母’A’-‘T’的字符串，表示两个20进制数，字符串长度均小于200。   

Output
对于每组测试数据输出一个用卡片表示的两个20进制数的和，每组输出占一行。   
Sample Input   
AAA C   
AAADH BCE   
Sample Output   
C   
BFL   
 
Author   
周洲@hrbust   


今天这个题教我做人了，本来今天想早点睡觉，毕竟忙了一天了，可是这个题一直卡着，卡了我一晚上，而且是一个我一直不知道的小细节卡着我，。。。   

一开始写出了这样的代码，马上提交果断错。。   


```
#include<iostream>
#include<cmath>
#include<stdio.h>
#include<algorithm>
using namespace std;
char a[21]={'A','B','C','D','E','F','G','H','I'
,'J','K','L','M','N','O','P','Q','R','S','T'};//65
int max(int x,int y)
{
    return x>y? x:y;
}
int min(int x,int y)
{
    return x<y? x:y;
}
int main()
{
    char p[202],q[202];
    while(~scanf("%s%s",p,q))
    {
        int p1[202],q1[202];
        int i,j;
        int m=strlen(p),n=strlen(q);
        int k=0;
        for(i=m-1;i>=0;i--)
        {
            p1[k++]=p[i]-'A';
        //  cout<<p1[k-1]<<endl;
        }
        k=0;
        for(i=n-1;i>=0;i--)
        {
            q1[k++]=q[i]-'A';
        //  cout<<q1[k-1]<<endl;
        }
        int sum[202],y=0;
        p1[m]=0;
        q1[n]=0;
        for(i=0,j=0;i<m，j<n;i++,j++)//错误点
        {
            sum[i]=(p1[i]+q1[j]+y)%20;
            y=(p1[i]+q1[j]+y)/20;
            //cout<<sum[i]<<endl;
            //cout<<y<<endl;
        }
        if(m>=n)
        {
            for(;i<=m;i++)
            {
                sum[i]=(p1[i]+y)%20;
                y=(p1[i]+y)/20;
            //  cout<<sum[i]<<endl;
            //  cout<<y<<endl;
            }
        }
        else
        {
            for(;j<=n;j++)
            {
            //  cout<<y<<endl;
                sum[j]=(q1[j]+y)%20;
                y=(q1[j]+y)/20;
                //cout<<sum[j]<<endl;
                //cout<<j<<endl;
            }
        }
 
        i=max(i,j);
    //  cout<<i<<j<<endl;
        i--;
        while(a[sum[i]]=='A'&&i>0)
        {
            i--;
        }
        for(;i>=0;i--)
        {
            printf("%c",a[sum[i]]);
            //printf("%d ",sum[i]);
        }
        printf("\n");
    }
    return 0;
}
```


 紧接着就卡在这里了，一直不知道哪里错了，无奈之下，对着模板改了改，写出了以下代码   


```
#include<iostream>
#include<cmath>
#include<stdio.h>
#include<algorithm>
using namespace std;
char a[21]={'A','B','C','D','E','F','G','H','I'
,'J','K','L','M','N','O','P','Q','R','S','T'};//65
int max(int x,int y)
{
    return x>y? x:y;
}
int min(int x,int y)
{
    return x<y? x:y;
}
char p[202],q[202];
int jj,len1, len2;
void Add(int *str1, int *str2, int *str3)
{// str3 = str1 + str2;
    int i, j,i1, i2, tmp, carry;
    int ch;
    i1 = len1-1; i2 = len2-1;
    j=carry = 0;
//    cout<<len1<<len2<<endl;
//    cout<<i1<<i2<<endl;
    for( ; i1 >= 0 && i2 >= 0; ++j, --i1, --i2 )
    {
        tmp = str1[i1]+str2[i2]+carry;
    //    cout<<str1[i1]<<str2[i2]<<endl;
    //    cout<<tmp<<endl;
        carry = tmp/20;
        str3[j] = tmp%20;
    //    cout<<str3[j-1]<<endl;
    //    cout<<j<<endl;
    }
    while( i1 >= 0 )
    {
        tmp = str1[i1--]+carry;
        carry = tmp/20;
        str3[j++] = tmp%20;
    //    cout<<str3[j-1]<<endl;
    //    cout<<j<<endl;
    }
    while( i2 >=0 )
    {
        tmp = str2[i2--]+carry;
        carry = tmp/20;
        str3[j++] = tmp%20;
    //    cout<<str3[j-1]<<endl;
    }
    if( carry )
    {
        //cout<<carry<<endl;
        str3[j++] = carry;
    //    cout<<str3[j-1]<<endl;
    }
    jj=j;
    //cout<<jj<<endl;
    for( i=0, --j; i < j; ++i, --j )
    {
        ch = str3[i]; 
        str3[i] = str3[j];
        str3[j] = ch;
    }
}
int main()
{

    while(~scanf("%s%s",p,q))
    {
        int str1[202],str2[202];
        int i;
        len1=strlen(p),len2=strlen(q);
        for(i=0;i<len1;i++)
        {
            str1[i]=p[i]-'A';
        //    cout<<str1[i]<<endl;
        }
        for(i=0;i<len2;i++)
        {
            str2[i]=q[i]-'A';
            //cout<<str2[i]<<endl;
        }
        int sum[202];
        Add(str1,str2,sum);
        for(i=0;i<jj;i++)
        {
            if(sum[i]!=0||i==jj-1)
            {
                break;
            }
        }
        for(;i<jj;i++)
        {
            printf("%c",a[sum[i]]);
        }
        printf("\n");
    }
    return 0;
}
```

 
写完后ac了   
 
可是第一次写的代码哪里错了，死活找不到错误，无奈之下窝一个一个数据测试，果然，不知道过了多长时间，问题来了   

输入 AAAAS ASASASA结果不对，然后开始找错，原来我一直以为for(;a>0,b>0;)与for(;a>0&&b>0;)是等价的其实不是，前者与for(;b>0;)等价   

这个事用了我一晚上解决。。。。。。。。   

正确代码   

```
#include<iostream>
#include<cmath>
#include<stdio.h>
#include<algorithm>
using namespace std;
char a[21]={'A','B','C','D','E','F','G','H','I'
,'J','K','L','M','N','O','P','Q','R','S','T'};//65
int max(int x,int y)
{
    return x>y? x:y;
}
int min(int x,int y)
{
    return x<y? x:y;
}
int main()
{
    char p[202],q[202];
    while(~scanf("%s%s",p,q))
    {
        int p1[202],q1[202];
        int i,j;
        int m=strlen(p),n=strlen(q);
        int k=0;
        for(i=m-1;i>=0;i--)
        {
            p1[k++]=p[i]-'A';
        //    cout<<p1[k-1]<<endl;
        }
        k=0;
        for(i=n-1;i>=0;i--)
        {
            q1[k++]=q[i]-'A';
        //    cout<<q1[k-1]<<endl;
        }
        int sum[202],y=0;
        p1[m]=0;
        q1[n]=0;
        for(i=0,j=0;i<m&&j<n;i++,j++)
        {
            sum[i]=(p1[i]+q1[j]+y)%20;
            y=(p1[i]+q1[j]+y)/20;
            //cout<<sum[i]<<endl;
            //cout<<y<<endl;
        }
        if(m>=n)
        {
            for(;i<=m;i++)
            {
                sum[i]=(p1[i]+y)%20;
                y=(p1[i]+y)/20;
            //    cout<<sum[i]<<endl;
            //    cout<<y<<endl;
            }
        }
        else
        {
            for(;j<=n;j++)
            {
            //    cout<<y<<endl;
                sum[j]=(q1[j]+y)%20;
                y=(q1[j]+y)/20;
                //cout<<sum[j]<<endl;
                //cout<<j<<endl;
            }
        }

        i=max(i,j);
    //    cout<<i<<j<<endl;
        i--;
        while(a[sum[i]]=='A'&&i>0)
        {
            i--;
        }
        for(;i>=0;i--)
        {
            printf("%c",a[sum[i]]);
            //printf("%d ",sum[i]);
        }
        printf("\n");
    }
    return 0;
}
```
