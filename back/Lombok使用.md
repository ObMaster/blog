# 一、Lombok注解

## 1、注解说明

- `val/var`：局部变量声明的类型，val会将局部变量声明为final，而var不会
- `@NonNull`：给方法参数增加这个注解会自动在方法内对该参数进行是否为空的校验，如果为空，则抛出NPE（NullPointerException）
- `@Cleanup`：自动管理资源，用在局部变量之前，在当前变量范围内即将执行完毕退出之前会自动清理资源，自动生成try-finally这样的代码来关闭流
- `@Getter/@Setter`：用在属性上，再也不用自己手写setter和getter方法了，还可以指定访问范围
- `@ToString`：用在类上，可以自动覆写toString方法，当然还可以加其他参数，例如@ToString(exclude=”id”)排除id属性，或者@ToString(callSuper=true, includeFieldNames=true)调用父类的toString方法，包含所有属性
- `@EqualsAndHashCode`：用在类上，自动生成equals方法和hashCode方法
- `@NoArgsConstructor, @RequiredArgsConstructor and @AllArgsConstructor`：用在类上，自动生成无参构造和使用所有参数的构造函数以及把所有@NonNull属性作为参数的构造函数，如果指定staticName = “of”参数，同时还会生成一个返回类对象的静态工厂方法，比使用构造函数方便很多，与`@Data`注解连用时，会时`@RequiredArgsConstrutor`注解失效
- `@Data`：注解在类上，相当于同时使用了`@ToString`、`@EqualsAndHashCode`、`@Getter`、`@Setter`和`@RequiredArgsConstrutor`这些注解，对于`POJO类`十分有用
- `@Accessors`：用在类上，必须与`@Getter/@Setter`连用，用于指定生成的get/set方法的格式，`chain = true`属性声明为链式调用，即生成的set方法不返回void而返回this。`fluent = true`生成的get/set方法不包含get/set前缀
- `@Value`：用在类上，是@Data的不可变形式，相当于为属性添加final声明，只提供getter方法，而不提供setter方法
- `@Builder`：用在类、构造器、方法上，为你提供复杂的builder APIs，让你可以像如下方式一样调用`Person.builder().name("Adam Savage").city("San Francisco").job("Mythbusters").job("Unchained Reaction").build();`更多说明参考[Builder](https://projectlombok.org/features/Builder.html)
- `@SneakyThrows`：自动抛受检异常，而无需显式在方法上使用throws语句
- `@Synchronized`：用在方法上，将方法声明为同步的，并自动加锁，而锁对象是一个私有的属性`$lock`或`$LOCK`，而java中的synchronized关键字锁对象是this，锁在this或者自己的类对象上存在副作用，就是你不能阻止非受控代码去锁this或者类对象，这可能会导致竞争条件或者其它线程错误
- `@Getter(lazy=true)`：可以替代经典的Double Check Lock样板代码
- `@Log`：根据不同的注解生成不同类型的log对象，但是实例名称都是log，有六种可选实现类
  - `@CommonsLog` Creates log = org.apache.commons.logging.LogFactory.getLog(LogExample.class);
  - `@Log` Creates log = java.util.logging.Logger.getLogger(LogExample.class.getName());
  - `@Log4j` Creates log = org.apache.log4j.Logger.getLogger(LogExample.class);
  - `@Log4j2` Creates log = org.apache.logging.log4j.LogManager.getLogger(LogExample.class);
  - `@Slf4j` Creates log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
  - `@XSlf4j` Creates log = org.slf4j.ext.XLoggerFactory.getXLogger(LogExample.class);

## 2、效果

### 1）@NonNull

- 给方法参数增加这个注解会自动在方法内对该参数进行是否为空的校验，如果为空，则抛出NPE

- 作用在成员变量上时，会在生成的set方法和构造器中的形参前加上@NonNull

```java
// 源码
@Data
@AllArgsConstructor
public class LombokTest {
    @NonNull
    private String test;
}

// 生成的class文件中get/set方法，和构造器
public class LombokTest {

    public void setTest(@NonNull final String test) {
        if (test == null) {
            throw new NullPointerException("test is marked non-null but is null");
        } else {
            this.test = test;
        }
    }
        
    public TestLombok(@NonNull final String test) {
        if (test == null) {
            throw new NullPointerException("test is marked non-null but is null");
        } else {
            this.test = test;
        }
    }
   ......
}
```

### 2）@EqualsAndHashCode

- 生成equals()、canequal()、hashcode()三个方法

- 该注解还有一个属性callSuper，**默认值为false，表示生成的equals方法值比较本类属性，不比较父类属性**，即只要其自身类的属性一样则认为时同一个对象；若显示**声明为true，则只有父类和子类的属性都一样时才被视为同一对象，该属性值对于没有父类的类无效**，如下：

```java
/**
 * 只有一个@Data注解,包含了
 *  @EqualsAndHashCode，即@EqualsAndHashCode(callSuper = false)
 *  
 * 等价于
 * @Data
 * @EqualsAndHashCode(callSuper = false)
 */
@Data
class LombokTest2 extends LombokTest {
    private String test2;

    public static void main(String[] args) {
        LombokTest2 test1 = new LombokTest2();
        test1.setTest("1");
        test1.setTest2("test");

        LombokTest2 test2 = new LombokTest2();
        test2.setTest("2");
        test2.setTest2("test");

        // 结果为 true， 两个对象的test5属性一样
        System.out.println(test1.equals(test2));
    }
}

/**
 * 显示声明callSuper的值为true，故须比较父类的属性
 */
@Data
@EqualsAndHashCode(callSuper = true)
class LombokTest2 extends LombokTest {
    private String test2;

    public static void main(String[] args) {
        LombokTest2 test1 = new LombokTest2();
        test1.setTest("1");
        test1.setTest2("test");

        LombokTest2 test2 = new LombokTest2();
        test2.setTest("2");
        test2.setTest2("test");

        // 结果为 false
        System.out.println(test1.equals(test2));
    }
}
```

### 3）@RequiredArgsConstructor

生成一个包含**特定参数**的构造器，而不是无参构造器，**当且只有当没有特定参数时，才会生成无参构造器**。

特定参数指的是**final修饰的变量(不包括常量)和使用@NonNull注解的变量**

```java
// 源码
@Data
public class LombokTest {
    private static final String test1 = "test1";

    private final String test2;

    @NonNull
    private String test3;

    private String test4;
}

// 生成的class文件
public class LombokTest {
    private static final String test1 = "test1";
    private final String test2;
    @NonNull
    private String test3;
    private String test4;

    public LombokTest(String test2, @NonNull String test3) {
        if (test3 == null) {
            throw new NullPointerException("test3 is marked non-null but is null");
        } else {
            this.test2 = test2;
            this.test3 = test3;
        }
    }
    ......
}
```

当删除test2变量的final修饰符和test3变量的@NonNull注解后，得到如下的class文件：

```java
public class LombokTest {
    private static final String test1 = "test1";
    private String test2;
    private String test3;
    private String test4;

    public LombokTest() {
    }
    ......
}
```

### 4）@Builder

用在类上时，**类必须有一个声明使用所有参数的构造器**。无自定义构造器时，会自动生成一个使用所有参数的构造器；若有自定义构造器，则必须也构造一个使用所有参数的构造器，或使用`@AllArgsConstructor`。

```java
@Data
@Builder
public class LombokTest {

    private String test;

    public static void main(String[] args) {
        LombokTest test = LombokTest.builder().test("test").build();
        System.out.println(test);	// 输出结果：LombokTest(test=test)
    }
}
```

显示声明了无参构造器，故必须显示声明使用所有参数的构造器，或使用`@AllArgsConstructor`。

```java
@Data
@Builder
public class LombokTest {

    private String test;

    public LombokTest() {
    }

    public LombokTest(String test) {
        this.test = test;
    }

    public static void main(String[] args) {
        LombokTest test = LombokTest.builder().test("test").build();
        System.out.println(test);
    }
}
```

