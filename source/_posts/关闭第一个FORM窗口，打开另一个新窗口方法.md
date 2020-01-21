---
title: 关闭第一个FORM窗口，打开另一个新窗口方法
date: '2015-10-28 11:43'
categories: C
abbrlink: be3b1b1c
tags:
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/25.jpg
---
** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>



1隐藏法，原理就是把旧窗口隐藏掉，再打开新窗口。   

//新建一个NewForm窗口（NewForm是自己定义的Form） NewForm fm=new NewForm()   

this.Hide();//隐藏现在这个窗口 fm.Show();//新窗口显现   

这种方法旧的窗口依旧会占内存，因此如果用来做登陆窗口不太好，但是如果旧窗口是以后还需要恢复的主窗口，这个方法便很不错，因为以后可以关掉新窗口，再用 旧窗口.Show() 就可以恢复旧窗口了。 所以这个方法适合在主窗口和子窗口间传递信息。   

2、再来便是为登录窗口设计的方法了。 在Program.cs里这样定义：   

static void Main() { Application.EnableVisualStyles(); Application.SetCompatibleTextRenderingDefault(false);   
 
//新建Login窗口（Login是自己定义的Form） Login Log = new Login();   

//使用模式对话框方法显示Log Log.ShowDialog();   

//DialogResult就是用来判断是否返回父窗体的 if (Log.DialogResult == DialogResult.OK) { //在线程中打开主窗体    Application.Run(new Main()); } } 在登陆窗口中验证结束后要赋值Log.DialogResult = DialogResult.OK 。 登录窗口完成任务后会被直接关掉，主窗口就打开了   