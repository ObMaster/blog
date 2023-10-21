### 一、 查看端口
1. 打开命令行窗口
	不知道的同学 windows 10 直接搜索cmd即可
2. 输入 netstat -ano，列出所有端口信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210103200743503.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N6bV9vYg==,size_16,color_FFFFFF,t_70)

3. 查看指定端口信息
	netstat -aon|findstr 端口号，如查看3306端口信息：netstat -aon|findstr 3306
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210103195130919.png)
	上图中最后一个数就是进程编号——PID，通过它就可以找到具体进程
4. 查看那个应用/进程在使用该PID
tasklist|findstr 53052
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210103195409454.png)
可以看到，是mysqld.exe这个进程在使用3306这个端口
### 二、结束进程，释放端口
1. 进入任务管理器，可以通过名称、PID排序，找到相应的程序，关闭
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210103195614664.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N6bV9vYg==,size_16,color_FFFFFF,t_70)


2. 命令直接关闭

	通过PID关闭

	**taskkill /pid 2472 -t -f**		
	
	2472为PID
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210103200011223.png)
	通过应用程序关闭

	**taskkill /f /t /im mysqld.exe**

	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210103200303473.png)