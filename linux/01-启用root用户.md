我们装完Linux系统（如Ubuntu、deepin）后，只有一个普通用户，很多操作命令都要加`sudo`去提升权限，让人很不爽，那么怎么直接使用root用户呢？其实很简单。

普通用户下，输入`sudo passwd root`命令，给root账号设置密码，之后就可以通过`su root`命令切换到root账号，执行命令时就不用加`sudo`。

**PS：执行`sudo passwd root`命令时，第一次输入的密码是你当前登录的密码，之后输入的密码才是你的root密码。**



