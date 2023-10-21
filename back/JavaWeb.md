## 一、关于JSP页面中的pageEncoding和contentType两种属性的区别

参考文章：https://blog.csdn.net/dragon4s/article/details/6604624

**1、pageEncoding是jsp文件本身的编码**

contentType的charset是指服务器发送给客户端时的内容编码

JSP要经过两次的“编码”，第一阶段会用pageEncoding，第二阶段会用utf-8至utf-8，第三阶段就是由Tomcat出来的网页， 用的是contentType。

第一阶段是jsp编译成.java，它会根据pageEncoding的设定读取jsp，结果是由指定的编码方案翻译成统一的UTF-8 JAVA源码（即.java），如果pageEncoding设定错了，或没有设定，出来的就是中文乱码。

第二阶段是由JAVAC的JAVA源码至java byteCode的编译，不论JSP编写时候用的是什么编码方案，经过这个阶段的结果全部是UTF-8的encoding的java源码。 JAVAC用UTF-8的encoding读取java源码，编译成UTF-8 encoding的二进制码（即.class），这是JVM对常数字串在二进制码（java encoding）内表达的规范。

第三阶段是Tomcat（或其的application container）载入和执行阶段二的来的JAVA二进制码，输出的结果，也就是在客户端见到的，这时隐藏在阶段一和阶段二的参数contentType就发挥了功效

**2、contentType的设定**

pageEncoding 和contentType的预设都是 ISO8859-1. 而随便设定了其中一个, 另一个就跟着一样了(TOMCAT4.1.27是如此). 但这不是绝对的, 这要看各自JSPC的处理方式. 而pageEncoding不等于contentType, 更有利亚洲区的文字 CJKV系JSP网页的开发和展示, (例pageEncoding=GB2312 不等于 contentType=utf-8)。

## 二、response和request的setCharacterEncoding区别

https://blog.csdn.net/honghailiang888/article/details/50786963

**1、request.setCharacterEncoding()**

是设置从request中取得的值或从数据库中取出的值。指定后可以通过getParameter()则直接获得正确的字符串，如果不指定，则默认使用iso8859-1编码。值得注意的是在执行setCharacterEncoding()之前，不能执行任何getParameter()。而且，**该指定只对POST方法有效，对GET方法无效**。分析原因，应该是在执行第一个getParameter()的时候，java将会按照编码分析所有的提交内容，而后续的getParameter()不再进行分析，所以setCharacterEncoding()无效。而对于GET方法提交表单是，提交的内容在URL中，一开始就已经按照编码分析提交内容，setCharacterEncoding()自然就无效。

**2、response.setCharacterEncoding() 和 response.setContentType()**

response.setContentType()：设置客户端浏览器展示的数据以及数据编码

response.setCharacterEncoding()：设置HTTP 响应的编码，如果之前使用response.setContentType设置了编码格式，则使用response.setCharacterEncoding指定的编码格式覆盖之前的设置；**如果未通过setContentType()指定数据类型，则设置的编码无效。**