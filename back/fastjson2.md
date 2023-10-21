

`JSONWriter.Feature`枚举对象——序列化字符串时的特性

> 默认操作：
>
> 1. 忽略null
> 2. 对于基本数据类型设置默认值
> 3. 对于Date类型数据，使用GMT+8时区格式化数据（yyyy-MM-dd HH:mm:ss）

| 枚举对象                     | 说明                                                     |
| ---------------------------- | -------------------------------------------------------- |
| BeanToArray                  | 获取所有value值，拼接为一个数组形式的字符串返回          |
| PrettyFormat                 | 格式化输出（4个空格）                                    |
| WriteNulls/WriteMapNullValue | 输出时不忽略null字段，默认忽略                           |
| NullAsDefaultValue           | value为null时给对应的key设置默认值                       |
| WriteClassName               | 新增key=@type，value为全限定类名的项                     |
| NotWriteDefaultValue         | 序列化时对于**基本数据类型**不指定默认值，默认指定默认值 |
| WriteNullListAsEmpty         | 输出时将Collection集合赋默认值[]                         |
| WriteNullStringAsEmpty       | 输出时将String类型赋默认值""                             |
| WriteNullNumberAsZero        | 输出时将Number类型赋默认值0                              |
| WriteNullBooleanAsFalse      | 输出时将Boolean类型赋默认值false                         |



```java
/**
     * fastjson2 相关操作：
     *
     *  1、将json串解析为JSONObject或JSONArray对象
     *      方法：JSON.parse(text)
     *      入参：text json串
     *      出参：Object
     *  2、将json串解析为JSONObject对象
     *      方法：JSON.parseObject(text)
     *           JSONObject.parseObject(text)
     *      入参：text     json串
     *      出参：JSONObject
     *  3、将json串解析为JSONArray对象
     *      方法：JSON.parseArray(text)
     *           JSONArray.parseArray(text)
     *      入参：text     json串
     *      出参：JSONArray
     *  4、将json串解析为java对象
     *      方法：JSON.parseObject(text, clazz)
     *           JSONObject.parseObject(text, clazz)
     *      入参：text     json串
     *           clazz    java对象类型
     *      出参：java对象
     *  5、将JSONObject序列化为java对象
     *      方法：.to(clazz)
     *      入参：clazz     java对象类型
     *      出参：java对象
     *
     *  6、将java对象序列化为json串
     *      方法：JSON.toJSONString(data)
     *           JSONObject.toJSONString(data)
     *      入参：data     java对象
     *      出参：json串
     *
     *  7、将JSONObject对象序列化为json串
     *      方法：.toString()
     *           .toJSONString()
     *      入参：无
     *      出参：json串
     *
     */
```

