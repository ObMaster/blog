import{_ as e,o as a,c as n,Q as s}from"./chunks/framework.6bbba70b.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"environment/gradel配置.md","filePath":"environment/gradel配置.md","lastUpdated":null}'),t={name:"environment/gradel配置.md"},l=s(`<h3 id="配置环境变量" tabindex="-1">配置环境变量 <a class="header-anchor" href="#配置环境变量" aria-label="Permalink to &quot;配置环境变量&quot;">​</a></h3><p>修改settings.gradle、build.gradle文件</p><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">mavenLocal()</span></span>
<span class="line"><span style="color:#E1E4E8;">maven { url &#39;https://maven.aliyun.com/repository/public&#39; }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">mavenLocal()</span></span>
<span class="line"><span style="color:#24292E;">maven { url &#39;https://maven.aliyun.com/repository/public&#39; }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>使用<code>mavenLocal()</code>时需配置maven环境变量，变量名为M2_HOME，值为指定maven仓库地址的settings.xml文件所在conf目录的路径</p><blockquote><p>使用 mavenLocal() 配置 maven 的本地仓库后，如果仓库在 setting.xml中设置后则gradle默认会使用本地仓库。关于 gradle 查询setting.xml文件的顺序依次如下：USER_HOME/.m2/settings.xml &gt;&gt; M2_HOME/conf/settings.xml。</p></blockquote>`,5),o=[l];function r(c,p,i,d,m,_){return a(),n("div",null,o)}const v=e(t,[["render",r]]);export{g as __pageData,v as default};
