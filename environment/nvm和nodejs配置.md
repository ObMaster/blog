

## 一、nvm配置

### 1、`nvm`介绍

> Node.js 默认一台电脑只能装一个版本，有时为了开发项目经常会使用不同版本的Node.js 版本，通常情况版本切换就比较麻烦了。
> 为了解决这个问题，**nvm** （node version manager）应运而生。有了 **nvm**，便可以在一台电脑上安装多个 Node.js 版本，并且可以一条指令随时下载或切换版本，而不需要频繁地下载/卸载不同版本的 node.js 来满足当前项目的要求

### 2、`nvm`安装

github下载地址：[Releases · coreybutler/nvm-windows (github.com)](https://github.com/coreybutler/nvm-windows/releases)

安装过程中会设置两个地址，第一个是`nvm`的安装地址，第二个是通过`nvm`安装`nodejs`的地址，同时会把这个地址加到`path`路径中

安装完成之后，输入指令`nvm -v`查看，出现版本号说明安装成功

### 3、`nvm`常用命令

**1. nvm list - 显示版本列表**

```text
nvm list ：显示已安装的版本（同 nvm list installed
nvm list installed：显示已安装的版本
nvm list available：显示所有可以下载的版本
```

**2. nvm install - 安装指定版本nodejs**

```text
nvm install 14.5.0：安装 14.5.0 版本的 node.js
nvm install latest：安装最新版本
```

**3. nvm use - 使用指定版本node**

```text
nvm use 14.5.0： 切换到 14.5.0 版本的 node.js
```

**4. nvm uninstall - 卸载指定版本 node**

```text
nvm uninstall 14.5.0：卸载到 14.5.0 版本的 node.js
```

[ ps：在运行nvm install 的时候，有可能会出现无权限安装的问题，请 以管理员身份运行 cmd ]

**5. 其他命令**

**nvm arch ：**
显示node是运行在32位还是64位系统上的

**nvm on ：**
开启nodejs版本管理

**nvm off ：**
关闭nodejs版本管理

**nvm proxy [url] ：**
设置下载代理，不加可选参数url，显示当前代理；将 url 设置为 none 则移除代理。

**nvm node_mirror [url] ：**
设置node镜像。默认是[http://nodejs.org/dist/](https://link.zhihu.com/?target=http%3A//nodejs.org/dist/)，如果不写url，则使用默认url；设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。

**nvm npm_mirror [url] ：**
设置npm镜像，[http://github.com/npm/cli/arc](https://link.zhihu.com/?target=http%3A//github.com/npm/cli/arc)… 如果不写url，则使用默认url；设置后可至安装目录 settings.txt文件查看，也可直接在该文件操作

**nvm root [path] ：**
设置存储不同版本node的目录，如果未设置，默认使用当前目录

**nvm version ：**

显示 nvm 版本，version 可简化为 v

## 二、nodejs配置

### 1、通过`nvm`安装`nodejs`

1. 通过`nvm -list available`查看可按照的版本
2. 通过`nvm install [版本号]`安装`nodejs`
3. 通过`nvm use [版本号]`切换`nodejs`
4. 通过`node -v`查看`nodejs`版本

### 2、配置`nodejs`

#### 设置模块路径和缓存路径

```
# 查看默认路径
npm list -g

# 设置全局模块安装路径
npm config set prefix "D:\Environment\Nodejs\node_global"

# 设置全局缓存存放路径
npm config set cache "D:\Environment\Nodejs\node_cache"

# 将node_global添加到系统环境变量
D:\Environment\Nodejs\node_global
```

#### 设置源

```
# 查看源
npm config get registry

# 切换淘宝源
npm config set registry http://registry.npm.taobao.org 
```

#### 全局安装

```
# 安装 pnpm
npm install pnpm -g

# 设置pnpm安装路径
pnpm store-dir /path

# 卸载 pnpm
npm rm -g pnpm
```

### 3、常用命令

```
# 查看所有配置
npm config list

# 查看所有默认配置
npm config list -l

# 查看npm配置
npm config list
```











