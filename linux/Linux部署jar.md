### 1、运行jar包的基本命令

**java -jar XXX.jar**

使用该命令后，若直接关闭窗口会导致程序退出

### 2、后台运行jar包

**java -jar XXX.jar &**

&表示在后台运行

使用该命令后，直接关闭窗口并不会退出程序，但是注销用户时会导致程序退出

### 3、不挂断运行jar包

**nohup java -jar XXX.jar &**

nohup表示不挂断运行，但没有后台运行功能，因此需要与&配合使用，此时相关输出信息被重定向到当前目录的nohup.out文件

### 4、使用输出信息的重定向文件

**nohup java -jar XXX.jar > XXX.file &**

指定将输出信息重定向到XXX.file文件中，而不是默认的nohup.out文件

### 5、&和nohup的区别

1） &表示在后台运行

2） nohup表示不挂断运行，但没有后台功能，即当关闭控制台时，任务也会结束

nohup 的功能和& 之间的功能并不相同。其中，nohup 可以使得命令永远运行下去和用户终端没有关系。当我们断开ssh 连接的时候不会影响他的运行。而& 表示后台运行。当ssh 断开连接的时候（用户退出或挂起的时候），命令也自动退出。

3） 两者在标准输入输出上的区别

- java -jar XXX.jar &

​		将任务放到后台，即使关闭控制台和当前session，任务依然继续运行，但标准输出信息会丢失

- nohup java -jar XXX.jar

​		关闭标准输入，控制台不能输入任何命令，重定向标准输出到指定文件

- nohup java -jar XXX.jar &

​		将任务放到后台，控制台仍能输入命令（此为&功能），

​		标准输出内容被重定向到指定文件中（此为nohup功能）

 