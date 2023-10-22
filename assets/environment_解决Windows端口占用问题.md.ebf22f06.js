import{_ as t,o as s,c as n,Q as i}from"./chunks/framework.6bbba70b.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"environment/解决Windows端口占用问题.md","filePath":"environment/解决Windows端口占用问题.md","lastUpdated":null}'),a={name:"environment/解决Windows端口占用问题.md"},e=i('<h3 id="一、-查看端口" tabindex="-1">一、 查看端口 <a class="header-anchor" href="#一、-查看端口" aria-label="Permalink to &quot;一、 查看端口&quot;">​</a></h3><ol><li><p>打开命令行窗口<br> 不知道的同学 windows 10 直接搜索cmd即可</p></li><li><p>输入 netstat -ano，列出所有端口信息<br><img src="https://img-blog.csdnimg.cn/20210103200743503.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N6bV9vYg==,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p></li><li><p>查看指定端口信息<br> netstat -aon|findstr 端口号，如查看3306端口信息：netstat -aon|findstr 3306<br><img src="https://img-blog.csdnimg.cn/20210103195130919.png" alt="在这里插入图片描述"><br> 上图中最后一个数就是进程编号——PID，通过它就可以找到具体进程</p></li><li><p>查看那个应用/进程在使用该PID<br> tasklist|findstr 53052<br><img src="https://img-blog.csdnimg.cn/20210103195409454.png" alt="在这里插入图片描述"><br> 可以看到，是mysqld.exe这个进程在使用3306这个端口</p></li></ol><h3 id="二、结束进程-释放端口" tabindex="-1">二、结束进程，释放端口 <a class="header-anchor" href="#二、结束进程-释放端口" aria-label="Permalink to &quot;二、结束进程，释放端口&quot;">​</a></h3><ol><li><p>进入任务管理器，可以通过名称、PID排序，找到相应的程序，关闭<br><img src="https://img-blog.csdnimg.cn/20210103195614664.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N6bV9vYg==,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述"></p></li><li><p>命令直接关闭</p><p>通过PID关闭</p><p><strong>taskkill /pid 2472 -t -f</strong></p><p>2472为PID<br><img src="https://img-blog.csdnimg.cn/20210103200011223.png" alt="在这里插入图片描述"><br> 通过应用程序关闭</p><p><strong>taskkill /f /t /im mysqld.exe</strong></p><p><img src="https://img-blog.csdnimg.cn/20210103200303473.png" alt="在这里插入图片描述"></p></li></ol>',4),o=[e];function r(l,p,c,_,m,d){return s(),n("div",null,o)}const h=t(a,[["render",r]]);export{b as __pageData,h as default};
