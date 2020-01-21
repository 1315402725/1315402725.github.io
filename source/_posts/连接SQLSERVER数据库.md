---
title: 连接SQLSERVER数据库
categories: C
abbrlink: d253d892
date: 2015-10-28 21:41:00
tags:
cover: https://cdn.jsdelivr.net/gh/1315402725/CDN@latest/cover/28.jpg
---

** {{ title }}：** <Excerpt in index | 首页摘要>
<!-- more -->
<The rest of contents | 余下全文>

一层一层的调用   

一层SqlConnction连接数据库   

二层SqlCommand执行SQL语句   

三层SqlDataAdapter填充DataSet或者DataSet   

四层DataSet  这是一个表的集合DataTable是他的一个表，   

五层DataTable   

六层DataRow DataColumn   

SqlCommandBuilder用于生成SQl语句更新数据库   

例：   

SqlConnection conn=new SqlConnection("Data Source=.\\SQLEXPRESS;Initial Catalog = EmployeeDB; Integrated    Security=True");   

SqlCommand cmd=new SqlCommand("select *",conn);   

/*   
  
SqlCommand cmd=new SqlCommand(conn);   

cmd.Connection=conn;   

*/   

/*   

SqlCommand cmd=new SqlCommand();    

cmd.Connection=conn;   

cmd.CommandText="select *";   

*/   

/*   

SqlDataAdapter adapter = new SqlDataAdapter("select *", “Data Source=.\\SQLEXPRESS;Initial Catalog = EmployeeDB; Integrated Security=True”);//可以直接避开SqlCommand直接用SqlDataAdapter   

*/   

/*   

SqlDataAdapter adapter = new SqlDataAdapter("select *", Conn);   

*/   

/*   

SqlDataAdapter adapter = new SqlDataAdapter(cmd);   

*/   

SqlDataAdapter adapter = new SqlDataAdapter();   

adapter.SelectCommand=cmd;   


SqlCommandBuilder builder = new SqlCommandBuilder(adapter);//加上这一句话，在更新数据库之前   
DataSet ds = new DataSet();   
adapter.Fill(ds, "Titles");   

 　　　　　　　　

利用DateSet批量更新数据库时利用函数自动生成SQl语句时应注意：   

1、数据库中必须有主键，这样才便于增删改查；   

2、SqlDataAdapter必须放在SqlCommandBuilder中，以用于批量执行DataSet中的修改；   

3、修改后的DataSet需执行AcceptChanges（）方法后，才能更新DataSet，以便于下一步操作；   

另外：   

myAdapter.InsertCommand = myCommandBuilder    
.GetInsertCommand();//插入   

myAdapter.UpdateCommand = myCommandBuilder    
.GetUpdateCommand();//更新   

myAdapter.DeleteCommand = myCommandBuilder    
.GetDeleteCommand();//删除   
 
这几个函数所产生的Sql语句就相当于给SqlCommand.CommandText所赋值的Sql语句如果自己不写用自动生成的Sql语句，那么   

数据库中必须有主键   