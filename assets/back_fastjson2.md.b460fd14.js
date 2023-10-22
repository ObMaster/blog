import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.6bbba70b.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"back/fastjson2.md","filePath":"back/fastjson2.md","lastUpdated":null}'),p={name:"back/fastjson2.md"},e=l(`<p><code>JSONWriter.Feature</code>枚举对象——序列化字符串时的特性</p><blockquote><p>默认操作：</p><ol><li>忽略null</li><li>对于基本数据类型设置默认值</li><li>对于Date类型数据，使用GMT+8时区格式化数据（yyyy-MM-dd HH:mm:ss）</li></ol></blockquote><table><thead><tr><th>枚举对象</th><th>说明</th></tr></thead><tbody><tr><td>BeanToArray</td><td>获取所有value值，拼接为一个数组形式的字符串返回</td></tr><tr><td>PrettyFormat</td><td>格式化输出（4个空格）</td></tr><tr><td>WriteNulls/WriteMapNullValue</td><td>输出时不忽略null字段，默认忽略</td></tr><tr><td>NullAsDefaultValue</td><td>value为null时给对应的key设置默认值</td></tr><tr><td>WriteClassName</td><td>新增key=@type，value为全限定类名的项</td></tr><tr><td>NotWriteDefaultValue</td><td>序列化时对于<strong>基本数据类型</strong>不指定默认值，默认指定默认值</td></tr><tr><td>WriteNullListAsEmpty</td><td>输出时将Collection集合赋默认值[]</td></tr><tr><td>WriteNullStringAsEmpty</td><td>输出时将String类型赋默认值&quot;&quot;</td></tr><tr><td>WriteNullNumberAsZero</td><td>输出时将Number类型赋默认值0</td></tr><tr><td>WriteNullBooleanAsFalse</td><td>输出时将Boolean类型赋默认值false</td></tr></tbody></table><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * fastjson2 相关操作：</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     *  1、将json串解析为JSONObject或JSONArray对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.parse(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：text json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：Object</span></span>
<span class="line"><span style="color:#6A737D;">     *  2、将json串解析为JSONObject对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.parseObject(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *           JSONObject.parseObject(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：text     json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：JSONObject</span></span>
<span class="line"><span style="color:#6A737D;">     *  3、将json串解析为JSONArray对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.parseArray(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *           JSONArray.parseArray(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：text     json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：JSONArray</span></span>
<span class="line"><span style="color:#6A737D;">     *  4、将json串解析为java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.parseObject(text, clazz)</span></span>
<span class="line"><span style="color:#6A737D;">     *           JSONObject.parseObject(text, clazz)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：text     json串</span></span>
<span class="line"><span style="color:#6A737D;">     *           clazz    java对象类型</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *  5、将JSONObject序列化为java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：.to(clazz)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：clazz     java对象类型</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     *  6、将java对象序列化为json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.toJSONString(data)</span></span>
<span class="line"><span style="color:#6A737D;">     *           JSONObject.toJSONString(data)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：data     java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：json串</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     *  7、将JSONObject对象序列化为json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：.toString()</span></span>
<span class="line"><span style="color:#6A737D;">     *           .toJSONString()</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：无</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：json串</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * fastjson2 相关操作：</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     *  1、将json串解析为JSONObject或JSONArray对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.parse(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：text json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：Object</span></span>
<span class="line"><span style="color:#6A737D;">     *  2、将json串解析为JSONObject对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.parseObject(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *           JSONObject.parseObject(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：text     json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：JSONObject</span></span>
<span class="line"><span style="color:#6A737D;">     *  3、将json串解析为JSONArray对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.parseArray(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *           JSONArray.parseArray(text)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：text     json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：JSONArray</span></span>
<span class="line"><span style="color:#6A737D;">     *  4、将json串解析为java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.parseObject(text, clazz)</span></span>
<span class="line"><span style="color:#6A737D;">     *           JSONObject.parseObject(text, clazz)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：text     json串</span></span>
<span class="line"><span style="color:#6A737D;">     *           clazz    java对象类型</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *  5、将JSONObject序列化为java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：.to(clazz)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：clazz     java对象类型</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     *  6、将java对象序列化为json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：JSON.toJSONString(data)</span></span>
<span class="line"><span style="color:#6A737D;">     *           JSONObject.toJSONString(data)</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：data     java对象</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：json串</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     *  7、将JSONObject对象序列化为json串</span></span>
<span class="line"><span style="color:#6A737D;">     *      方法：.toString()</span></span>
<span class="line"><span style="color:#6A737D;">     *           .toJSONString()</span></span>
<span class="line"><span style="color:#6A737D;">     *      入参：无</span></span>
<span class="line"><span style="color:#6A737D;">     *      出参：json串</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div>`,4),t=[e];function r(c,o,i,b,y,A){return n(),a("div",null,t)}const u=s(p,[["render",r]]);export{d as __pageData,u as default};
