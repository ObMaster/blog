1、更新软件包

`sudo apt update`

2、安装ssh

`sudo apt install openssh-sftp-server`

3、启动ssh服务

`sudo service ssh start`

4、设置ssh服务开机自启动

`sudo systemctl enable ssh`

5、设置root用户远程连接

上面设置完成后，普通用户可以通过xshell、putty等工具远程连接系统，但是root用户连接不上，需做如下操作：打开`sudo vim /etc/ssh/sshd_config `文件，找到`PermitRootLogin`，将其对应的值改为`yes`，如果该属性被注释，则需去掉注释，或在下面新增一行配置`PermitRootLogin yes`，保存退出后】重启服务`service ssh restart`。

6、ssh相关命令

```shell
# ssh服务启动、停止、重启命令一：
sudo service ssh start
sudo service ssh stop
sudo service ssh restart

# ssh服务启动、停止、重启命令二：
sudo /etc/init.d/ssh start
sudo /etc/init.d/ssh stop
sudo /etc/init.d/ssh restart

# 设置ssh服务开机自启动命令
sudo systemctl enable ssh
# 关闭ssh开机自动启动命令
sudo systemctl disable ssh
```

如果觉得每个命令前都得加sudo提升权限，可以执行`su root`命令，输入root账号密码切换到root账号，然后执行上面的命令，这样就不用每条命令前都加`sudo`了，这样确实让人很不爽。不知道root命令的同学参考这篇文章[01-Linux配置root用户](https://www.cnblogs.com/txzob/p/16096393.html)
