import{_ as t,o as r,c as a,Q as o}from"./chunks/framework.6bbba70b.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"linux/Linux定时任务.md","filePath":"linux/Linux定时任务.md","lastUpdated":null}'),e={name:"linux/Linux定时任务.md"},n=o('<h3 id="一、crontab命令" tabindex="-1">一、crontab命令 <a class="header-anchor" href="#一、crontab命令" aria-label="Permalink to &quot;一、crontab命令&quot;">​</a></h3><blockquote><p>基本命令</p></blockquote><ul><li>crontab -l 查看crontab的工作任务</li><li>crontab -e 编辑crontab的工作任务</li><li>crontab -r 移除所有的crontab的工作任务，若只想移除部分任务，通过 -e 进行编辑</li></ul><blockquote><p>创建定时任务</p></blockquote><p><strong>crontab -e 命令进入vim编辑器，编辑crontab工作任务，每一行表示一个工作任务，每行6个字段：</strong></p><table><thead><tr><th>分钟</th><th>小时</th><th>日期</th><th>月份</th><th>周</th><th>指令</th></tr></thead><tbody><tr><td>0~59</td><td>0~23</td><td>1~31</td><td>1~-12</td><td>0~7</td><td>order</td></tr></tbody></table><p>其中，<strong>周字段的1~6表示周一到周六，0/7表示周日</strong>；表示时间的特殊字符如下：</p><table><thead><tr><th><strong>特殊字符</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>***** (星号)</td><td>* 表示所有时刻，如30 12 * * * ls，表示每天的12:30都执行ls命令</td></tr><tr><td><strong>,</strong> (逗号)</td><td>, 表示分隔时刻，如30 10,12 * * * ls，表示每天的10:30，12:30都会执行ls命令</td></tr><tr><td><strong>-</strong> (减号)</td><td>- 表示时间范围，如30 10-12 * * * ls，表示每天的10:30，11:30，12:30都会执行ls命令</td></tr><tr><td><strong>/</strong> (斜线)</td><td>/n表示每隔n个时间单位后执行命令，如 /30 * * * * ls，表示每隔30分钟执行ls命令</td></tr></tbody></table><p>==注意：order指定字段的命令必须使用<strong>绝对路径</strong>，若不清楚，使用whereis命令查找觉得路径。==</p><h3 id="二、修改-etc-crontab文件" tabindex="-1">二、修改/etc/crontab文件 <a class="header-anchor" href="#二、修改-etc-crontab文件" aria-label="Permalink to &quot;二、修改/etc/crontab文件&quot;">​</a></h3><p><strong>/etc/crontab文件初始内容</strong></p><p><img src="https://raw.githubusercontent.com/ObMaster/Images/master/blog/image-20210625164420938.png" alt="image-20210625164420938"></p><p>可以看的，crontab工作任务较crontab -e 添加的多了一个user-name字段，因为crontab -e里的用户就是使用者自己，故不需要指定，而/etc/crontab是系统文件，需指明用户。</p><h3 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-label="Permalink to &quot;三、总结&quot;">​</a></h3><ul><li>对于用户化的行为，使用 crontab -e 命令</li><li>对于系统行为，如系统的维护管理等，建议使用 /etc/crontab 文件</li></ul>',15),c=[n];function d(s,l,i,b,h,_){return r(),a("div",null,c)}const g=t(e,[["render",d]]);export{u as __pageData,g as default};
