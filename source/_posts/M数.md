---
title: M数
tags: DP
categories: algorithm
abbrlink: 22023e3d
date: 2015-10-10 13:16:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/17.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

M数   
Time Limit: 1000 MS	Memory Limit: 32768 K   
Total Submit: 59(29 users)	Total Accepted: 31(27 users)	Rating: 	Special Judge: No   
Description   
Mac最近YY了一种比较特别的整数，这种数有N位并且从左向右每一位的数字是非递减的，此外这个整数可以包含前导0。例如当N=3时，012、011、111等都是符合的，而321、322等则是不符合的。请你计算出长度为N位的整数中有多少个整数符合这种整数的性质。   
Input   
多组测试数据。第一行是一个整数T（0<T<=100），表示测试数据的组数。   

接下来的T行，每行一个整数N表示整数的位数。( 1 <= N <= 100000 )   

 

Output   
对于每组数据输出一个整数表示符合条件的整数的个数，由于答案可能比较大，请把结果对   

1000000007取余后输出。   

 
Sample Input   
2   

1   

2   

 
Sample Output   
10   

55   

 这题弄得我挺烦的   

n==1时：10   

n==2时： 左边第一位可以是0，右边就是n==1时的所有情况   

左边第一位是1 右边也是n==1时的所有情况   

左边第一位是2 右边就是n==1时所有情况出去n==1时左边第一位是1的所有情况以此类推   

为55   

n==3时：   

其实就是987654321　　此时最左边为1   

             87654321      。。。。。。2   

  　　　　 7654321 　　。。。。。。3   

　　　　     654321　　。。。。。。4   

　　　　　　 54321　　。。。。。。5   

　　　　　　   4321　　。。。。。。6   

　　　　　　　  321  　。。。。。。7   

      　　　　　　 21　　。。。。。。8   

　　　　　　　　　1　　。。。。。。。9   

另外还要加上n-1的情况，因为第一位可以是0   

。。。   


我的代码：   
```
#include<iostream>
#include<algorithm>
#include<cmath>
using namespace std;
long m=1000000007;
long a[10]={0,9,8,7,6,5,4,3,2,1};
void update()
{
int i;
for(i=8;i>=1;i--)
{
a[i]=(a[i]+a[i+1])%m;
}
}
long b[100001];
int main()
{
b[1]=10;
int i,j,k;
for(i=2;i<100001;i++)
{
b[i]=0;
for(j=1;j<10;j++)
{
b[i]=(b[i]+a[j])%m;
}
update();
b[i]=(b[i]+b[i-1])%m;
}
int T;
while(~scanf("%d",&T))
{
while(T--)
{
int n;
scanf("%d",&n);
printf("%ld\n",b[n]);
}
}
return 0;
}

```


做完折后一看别人代码，原来是dp   


```
#include <cstdio>
#define Max 100101
#define Mod 1000000007

long long C[Max][10];

int main() {
for(int i = 0; i < 10; i++)
C[i][i] = 1;
for(int i = 1; i < Max; i++) {
C[i][0] = 1;
for(int j = 1; j < 10; j++)
C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % Mod;
}
int N, T;
scanf("%d\n", &T);
while(T--) {
scanf("%d", &N);
printf("%lld\n", C[N + 9][9] % Mod);
}

return 0;
```