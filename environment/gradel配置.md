### 配置环境变量

修改settings.gradle、build.gradle文件

```xml
mavenLocal()
maven { url 'https://maven.aliyun.com/repository/public' }
```



使用`mavenLocal()`时需配置maven环境变量，变量名为M2_HOME，值为指定maven仓库地址的settings.xml文件所在conf目录的路径

> 使用 mavenLocal() 配置 maven 的本地仓库后，如果仓库在 setting.xml中设置后则gradle默认会使用本地仓库。关于 gradle 查询setting.xml文件的顺序依次如下：USER_HOME/.m2/settings.xml >> M2_HOME/conf/settings.xml。