---
title: python斗罗大陆词云
tags: python
categories: python
abbrlink: 18febfae
date: 2018-08-16 23:39:00
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/19.jpg
---

1 “词云”就是对网络文本中出现频率较高的“关键词”予以视觉上的突出，形成“关键词云层”或“关键词渲染”，从而过滤掉大量的文本信息，使浏览网页者只要一眼扫过文本就可以领略文本的主旨  
 2 之前看到网上有大神绘制了扶摇小说的python词云图，我自己也仿照弄了一个  
 以下是操作过程  
 使用到的python工具   
1 codecs用于读取文本数据  
2 jieba   
 jieba（结巴）是一个强大的分词库，完美支持中文分词   

结巴分词分为三种模式：精确模式（默认）、全模式和搜索引擎模式  
3  numpy NumPy是Python语言的一个扩充程序库。支持高级大量的维度数组与矩阵运算，此外也针对数组运算提供大量的数学函数库。Numpy内部解除了Python的PIL(全局解释器锁),运算效率极好,是大量机器学习框架的基础库!  
4pandas 是基于NumPy 的一种工具，该工具是为了解决数据分析任务而创建的。Pandas 纳入了大量库和一些标准的数据模型，提供了高效地操作大型数据集所需的工具。  
Pandas基于两种数据类型：series与dataframe。  
一个series是一个一维的数据类型，其中每一个元素都有一个标签。   
一个dataframe是一个二维的表结构。Pandas的dataframe可以存储许多种不同的数据类型，并且每一个坐标轴都有自己的标签。你可以把它想象成一个series的字典项。  
5 Matplotlib 是一个 Python 的 2D绘图库，它以各种硬拷贝格式和跨平台的交互式环境生成出版质量级别的图形  
6   [WordCloud]:  github:https://github.com/amueller/word_cloud  "Github"
[官方地址]: https://amueller.github.io/word_cloud/ 
<!-- more --> 
```
# -*- coding: UTF-8 -*-
#读取文本数据
import codecs
#中文分词
import jieba
#科学计算
import numpy as np
#数据分析包
import pandas as pd
#数据可视化包
import matplotlib.pyplot as plt
#词云包，绘制词云
from wordcloud import WordCloud
#imread用来读取图片数据
from imageio import imread
#系统包 用来输出编码格式 与绘制词云无关，可忽略
import sys

#读取文本数据，放在content中

file = codecs.open("F:\\pythonProject\\douluo.txt",'r','utf-8');

content=file.read()

file.close()

#对读取的文本数据进行中文分词，如果有分词词库，可以载入到jieba中，提高分词的准确度
#jieba.load_userdict('D:/扶摇词库.txt');
segments=[]
segs=jieba.cut(content)
#去除一个字的词
for seg in segs:
    if len(seg)>1:
        segments.append(seg);
#将分词结果保存在pandas的DataFrame中
segments_df = pd.DataFrame({'segment':segments})
#移除停用词，停用词是指在信息检索中，为节省存储空间和提高搜索效率，在处理自然语言数据(或文本)之前或之后会自动过来不掉的某些字或词
#移除日常停用词 通用词可以从网上搜索下载，也可以花时间和经理制作
#参数说明：
#index_col=False:用作索引的列编号或者列名， 如果文件不规则，行尾有分隔符，则可以设定index_col=False
#quoting=3:控制csv的英豪常亮
#sep="\t":指定分隔符，如果不指定参数，则会尝试使用逗号分隔。
#停用词读取为一个DataFrame数据，给数据指定一个名称 stopword
stopwords_rc=pd.read_csv("F:\\pythonProject\\chineseStopWords.txt",encoding='utf-8',names=['stopword'],index_col=False,quoting=3,sep="\t")
segments_df = segments_df[~segments_df.segment.isin(stopwords_rc.stopword)]
#使用pandas对词频进行统计
#使用groupby函数(行操作) 进行分组，使用agg（列操作） 计算每组数量 ，得到一个Series数据
segments_stat = segments_df.groupby(by=['segment'])['segment'].agg({"计数":np.size})
#根据计数列降序排序，如果segments_stat是DataFrame数据 ，使用sort函数
segments_stat = segments_stat.reset_index().sort_values("计数",ascending=False)

#一下是打印系统编码，与绘制码云无关
# sys_type =sys.getfilesystemencoding()
# print(sys.stdout.encoding)
#print(sys_type)
#读取图片  绘画词云：设置背景颜色 字体路径 图片 必须设置字体 否则图片上显示的全是举行
fy_img=imread("F:\\pythonProject\\timg.png")
fuyao_wordcloud = WordCloud(background_color="white",
                            font_path='F:\\pythonProject\\PingFang Regular.ttf',mask=fy_img)
#facecolor设置坐标系的背景色 w是白色 edagecolor设置坐标轴边的颜色
plt.figure(num=None,facecolor='w',edgecolor='blue')
#取前1000个词，遍历取出数据，不算索引
segments_stat = segments_stat.head(1000).itertuples(index=False)
#将map数据显性转化为字典 根据词频绘制词云 fit_words参数为字典
word_frequence = {x[0]:x[1] for x in segments_stat}
fuyao_wordcloud = fuyao_wordcloud.fit_words(word_frequence)
#不显示坐标轴
plt.axis('off')
plt.imshow(fuyao_wordcloud)
plt.show()


```

结果:
![之前](https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/articelImag/pythondouluodalu/timg.png)
![之后](https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/articelImag/pythondouluodalu/result.png)