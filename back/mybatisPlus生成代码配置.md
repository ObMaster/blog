### 1、完整配置信息

```java
public class CodeGenerator {

   /**
    * 数据库连接信息
    */
   private static final String URL = "jdbc:mysql://127.0.0.1:3306/mall-study?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai";

   public static final String USERNAME = "root";

   public static final String PASSWORD = "123456";

   /**
    * 生成类的作者
    */
   public static final String AUTHOR = "OMaster";

   /**
    * 项目绝对路径
    */
   public static final String BASIC_PATH = "D:\\CHSI\\chenzm\\Git\\mall-study\\mall-study-data";

   /**
    * 生成类的包名
    */
   public static final String BASIC_PACKAGE = "cn.snowwalker.mallstudy";

   /**
    * 包名下的模块名称
    */
   public static final String MODULE_NAME = "system";


   public static void main(String[] args) {
      FastAutoGenerator.create(URL, USERNAME, PASSWORD)
            .globalConfig(builder -> {
               builder.author(AUTHOR) // 设置作者
                     .fileOverride() // 覆盖已生成文件
                     .outputDir(BASIC_PATH + "\\src\\main\\java"); // 指定java输出目录
            })
            .packageConfig(builder -> {
               builder.parent(BASIC_PACKAGE) // 设置父包名
                     .moduleName(MODULE_NAME) // 设置父包模块名
                     .entity("entity")         // 设置实体包名，默认：entity
                     .pathInfo(Collections.singletonMap(OutputFile.xml, BASIC_PATH + "\\src\\main\\resources\\mapper")); // 设置mapperXml生成路径
            })
            .strategyConfig((scanner, builder) ->
                  builder.addInclude(getTables(scanner.apply("请输入表名，多个英文逗号分隔？所有输入 all")))
                        .entityBuilder()
                        .superClass(BasicBean.class)    // 设置父类
                        .disableSerialVersionUID()      // 禁用生成 serialVersionUID
                        .enableChainModel()             // 开启lombok链式调用
                        .enableLombok()                 // 启用lombok注解
                        .enableTableFieldAnnotation()   // 生成字段注解
                        .controllerBuilder()
                        .enableRestStyle()              // 生成@RestController 控制器
                        .enableHyphenStyle()            // 开启驼峰转连字符
                        .serviceBuilder().formatServiceFileName("%sService")
            )
            .templateConfig(builder -> builder.entity("/templates/my-entity.java"))       // 使用自定义模板，将get/set注解换位@Data
            .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
            .execute();
   }

   // 处理 all 情况
   protected static List<String> getTables(String tables) {
      return "all".equals(tables) ? Collections.emptyList() : Arrays.asList(tables.split(","));
   }
}
```

### 2、自定义实体模板

在`resources`下新建`templates`目录，存放自定义模板信息，如下，重写默认的实体模板，将`@Getter`和`@Setter`替换为`@Data`：

 `resources/template/my-entity.java.ftl`

```java
package ${package.Entity};

<#list table.importPackages as pkg>
import ${pkg};
</#list>
<#if swagger>
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
</#if>
<#if entityLombokModel>
import lombok.Data;
    <#if chainModel>
import lombok.experimental.Accessors;
    </#if>
</#if>

/**
 * <p>
 * ${table.comment!}
 * </p>
 *
 * @author ${author}
 * @since ${date}
 */
<#if entityLombokModel>
@Data
    <#if chainModel>
@Accessors(chain = true)
    </#if>
</#if>
<#if table.convert>
@TableName("${schemaName}${table.name}")
</#if>
<#if swagger>
@ApiModel(value = "${entity}对象", description = "${table.comment!}")
</#if>
<#if superEntityClass??>
public class ${entity} extends ${superEntityClass}<#if activeRecord><${entity}></#if> {
<#elseif activeRecord>
public class ${entity} extends Model<${entity}> {
<#elseif entitySerialVersionUID>
public class ${entity} implements Serializable {
<#else>
public class ${entity} {
</#if>
<#if entitySerialVersionUID>

    private static final long serialVersionUID = 1L;
</#if>
<#-- ----------  BEGIN 字段循环遍历  ---------->
<#list table.fields as field>
    <#if field.keyFlag>
        <#assign keyPropertyName="${field.propertyName}"/>
    </#if>

    <#if field.comment!?length gt 0>
        <#if swagger>
    @ApiModelProperty("${field.comment}")
        <#else>
    /**
     * ${field.comment}
     */
        </#if>
    </#if>
    <#if field.keyFlag>
        <#-- 主键 -->
        <#if field.keyIdentityFlag>
    @TableId(value = "${field.annotationColumnName}", type = IdType.AUTO)
        <#elseif idType??>
    @TableId(value = "${field.annotationColumnName}", type = IdType.${idType})
        <#elseif field.convert>
    @TableId("${field.annotationColumnName}")
        </#if>
        <#-- 普通字段 -->
    <#elseif field.fill??>
    <#-- -----   存在字段填充设置   ----->
        <#if field.convert>
    @TableField(value = "${field.annotationColumnName}", fill = FieldFill.${field.fill})
        <#else>
    @TableField(fill = FieldFill.${field.fill})
        </#if>
    <#elseif field.convert>
    @TableField("${field.annotationColumnName}")
    </#if>
    <#-- 乐观锁注解 -->
    <#if field.versionField>
    @Version
    </#if>
    <#-- 逻辑删除注解 -->
    <#if field.logicDeleteField>
    @TableLogic
    </#if>
    private ${field.propertyType} ${field.propertyName};
</#list>
<#------------  END 字段循环遍历  ---------->

<#if !entityLombokModel>
    <#list table.fields as field>
        <#if field.propertyType == "boolean">
            <#assign getprefix="is"/>
        <#else>
            <#assign getprefix="get"/>
        </#if>
    public ${field.propertyType} ${getprefix}${field.capitalName}() {
        return ${field.propertyName};
    }

    <#if chainModel>
    public ${entity} set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
    <#else>
    public void set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
    </#if>
        this.${field.propertyName} = ${field.propertyName};
        <#if chainModel>
        return this;
        </#if>
    }
    </#list>
</#if>

<#if entityColumnConstant>
    <#list table.fields as field>
    public static final String ${field.name?upper_case} = "${field.name}";

    </#list>
</#if>
<#if activeRecord>
    @Override
    public Serializable pkVal() {
    <#if keyPropertyName??>
        return this.${keyPropertyName};
    <#else>
        return null;
    </#if>
    }

</#if>
<#if !entityLombokModel>
    @Override
    public String toString() {
        return "${entity}{" +
    <#list table.fields as field>
        <#if field_index==0>
            "${field.propertyName}=" + ${field.propertyName} +
        <#else>
            ", ${field.propertyName}=" + ${field.propertyName} +
        </#if>
    </#list>
        "}";
    }
</#if>
}
```

