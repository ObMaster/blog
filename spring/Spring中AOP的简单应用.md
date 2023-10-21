[[toc]]
# 一、AOP 概念<Badge type="tip" text="^1.9.0" />

在 `SpringBoot` 中使用 `AOP`，直接引入 `spring-boot-starter-aop` 的包即可：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

再说一下几个关键概念，涉及到 `AOP` 注解的使用：

- **横切关注点** ：跨越程序多个模块的方法或功能。即与业务逻辑无关，但我们也要关注的部分，就是横切关注点。如日志、安全、缓存等。
- **切面（ Aspect ）** ：将横切关注点模块化得到的特殊对象，即切面应是一个类，表现为 AOP *在哪干*和*干什么*的集合。
- **连接点（ JoinPoint ）** ：应用执行过程中能够插入切面的一个点，这个点可以是方法执行、方法调用、处理异常等，表现为 AOP *在哪干*。
- **切入点（ PointCut ）** ：切面通知执行的地点，即要插入增强处理的连接点，表现为 AOP *在哪干的集合*。
- **通知（ Advice）** ：切面要完成的**增强处理**，通知描述了切面何时执行以及如何执行增强处理，即通知应是切面中的方法，表现为 AOP *干什么*。

在 Spring 中，通知分为五类：

1. `@Before` 前置通知：在方法执行前（紧邻切入点，后面会说）执行；
2. `@Around` 环绕通知：方法执行前后都有通知，通知在方法前还是后取决于其中的 `ProceedingJoinPoint.proceed()` 的位置；
3. `@AfterReturnning` 返回通知：方法成功执行之后通知；
4. `@AfterThrowing` 异常通知：方法抛出异常之后通知；
5. `@After` 最终通知：也叫后置通知，在方法执行后执行（**无论方法执行成功还是抛出异常，都会执行**）。

这五类通知的执行顺序比较固定，`@Around` 环绕通知特殊一点，可以自定义执行时间，执行顺序如下：

- 不存在**`@Around` 环绕通知**时，调用顺序为：**`@Before` 前置通知**、目标方法、**`@AfterReturnning`返回通知（目标方法正常执行）**/**`@AfterThrowing` 异常通知（目标方法抛出异常）**、**`@After` 最终通知**

- 存在**`@Around` 环绕通知**时，调用顺序为：**环绕通知的前置部分（ `ProceedingJoinPoint.proceed()` 之前的代码）**、目标方法（上面**不存在环绕通知时的调用顺序**）、**环绕通知的后置部分（`ProceedingJoinPoint.proceed()` 之后的代码）**/**环绕通知的异常部分（catch块中的代码）**

# 二、应用

以切面实现操作日志的记录为例，进行演示

## 1、自定义注解

该注解用来标识**切点**，也可以不用注解，直接使用包路径表达式

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Log {

    OperateType operate();

    String description();
}
```

```java
public enum OperateType {

    /**
     *
     */
    ADD("新增"),

    /**
     *
     */
    EDITE("修改"),

    /**
     *
     */
    DELETE("删除")
    ;

    final String value;

    OperateType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
```

## 2、定义日志切面

`spring boot`中自动配置已经启用了`@EnableAspectJAutoProxy`注解，无需我们手动添加（详见`AopAutoConfiguration`）；如果是`spring`项目，则需手动添加。

```java
@Aspect
@Component
public class LogAspect {

    @Before("@annotation(log)")
    public void Before(Log log) {
        OperateType operate = log.operate();
        String description = log.description();
        System.out.println("Before" + operate.value + description);
    }

    @AfterReturning("@annotation(log)")
    public void AfterReturning(Log log) {
        OperateType operate = log.operate();
        String description = log.description();
        // 简单的日志打印，实际上这里应该将信息入库报错
        System.out.println("AfterReturning" + operate.value + description);
    }

    @After("@annotation(log)")
    public void After(Log log) {
        OperateType operate = log.operate();
        String description = log.description();
        System.out.println("After" + operate.value + description);
    }

    @AfterThrowing("@annotation(log)")
    public void AfterThrowing(Log log) {
        OperateType operate = log.operate();
        String description = log.description();
        System.out.println("AfterThrowing" + operate.value + description);
    }

    @Around("@annotation(log)")
    public Object Around(ProceedingJoinPoint pjp, Log log) throws Throwable {
        System.out.println("AroundBefore");
        try {
            Object proceed = pjp.proceed();
            System.out.println("AroundReturn");
            return proceed;
        } catch (Throwable e) {
            System.out.println("AroundThrowing");
            throw e;
        } finally {
            System.out.println("AroundFinally");
        }
    }
}
```

## 3、测试

方法上添加`@Log`注解即可

```java
@Log(operate = OperateType.ADD, description = "测试")
@GetMapping("/log")
public String log() {
    try {
        System.out.println("===========================log");
    } finally {
        System.out.println("=========finally");
    }
    return "log";
}

@Log(operate = OperateType.DELETE, description = "测试")
@GetMapping("/exc")
public String exception() {
    try {
        System.out.println("===========================log");
        int i = 10 / 0;
        return "log";
    } catch (Exception ex) {
        System.out.println("===========ex");
        throw new RuntimeException("ce");
    }
    finally {
        System.out.println("=========finally");
    }
}
```