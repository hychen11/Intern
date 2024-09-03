# Start

```shell
./mvnw spring-boot:run
curl http://localhost:8080/hello
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

- `@Configuration`: Tags the class as a source of bean definitions for the application context.
- `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
- `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.

### application.properties

```
server.port=8081
```

priority list

* `application.properties`
* `application.yml`
* `application.yaml`

### YAML

```properties
server.port=8080
```

`@Value`注解用于从外部配置文件（如`application.properties`或`application.yml`）中注入属性值到类的字段中。这样可以使应用程序更灵活，允许通过修改配置文件来更改应用程序的行为，而不需要修改代码。

```java
@Value("${name}")
private String name1;

@Value("${person.name}")
private String name2;

@Value("${person.age}")
private int age;

@Value("${address[0]}")
private String place1;

@Value("${msg1}")
private String msg1;

@Value("${msg2}")
private String msg2;
```

```yml
name: hychen

person:
  name: ${name}
  age: 24
  
address:
  - beijing
  - shanghai

msg1: 'hello \n world1' //keep \n
msg2: "hello \n world2" 
```

` @Autowired`

```java
@Autowired
private Environment env;

System.out.println(env.getProperty("address[0]"));
```

`@ConfigurationProperties`

```java
@Component
@ConfigurationProperties(prefix = "person")

public class Person {
    private String name;
    private int age;
}

@Autowired
private Person person;
```

### Profile

```properties
    │   ├── application-dev.properties
    │   ├── application.properties
    │   ├── application-pro.properties
    │   ├── application-test.properties
    
spring.profiles.active=pro
```

### Config file Priority

``` 
file:./config/
file:./
classpath:/config/:
classpath:/
```



# Structure

```lua
Frontend (Client/Web Browser)
------------------------------
Backend  (API: GET POST PUT PATCH DELETE)
		 (service layer)
		 (Data Access layer)
		 (DataBase)
```

# API

endpoint 表示API的具体网址

# Junit

# Redis

# Mybatis



# JavaWeb

```java
//请求处理类
@RestController
public class HelloController{
	@RequestMapping("/hello")
	public String hello(){
		return "Hello World";
	}
}
```

apache tomcat (对http协议进行处理？)

# Other

### Mysql

3306 port

```shell
sudo systemctl status mysql
sudo systemctl start mysql
sudo systemctl enable mysql
sudo systemctl restart mysql
sudo systemctl stop mysql
```

### Redis

6379 port

```shell
sudo apt install redis-server
sudo systemctl status redis
sudo systemctl enable redis
redis-cli
auth 0602
ping # Get response PONG
```

```shell
sudo vim /etc/redis/redis.conf
requirepass 0602
sudo systemctl restart redis
```

```shell
redis-cli -h localhost -p 6379 -a 0602
keys *
```

### Nginx

```shell
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl status nginx
#self start
sudo systemctl enable nginx
sudo systemctl disable nginx
```

### Springboot

```shell
#install dependency
mvn clean install
mvn spring-boot:run
```

### @RequestBody

Spring MVC中，`@RequestBody`注解用于将HTTP请求的正文（body）映射到方法参数上。它通常用于处理POST、PUT等方法的请求正文，并将JSON或XML等格式的数据反序列化为Java对象

# front

in `nginx.conf`

```
location / {
    root /home/hychen11/Desktop/sky-take-out-front/nginx-1.20.2/html/sky;
    index index.html;
}
```



```shell
sudo cp /conf/nginx.conf /etc/nginx/sites-available/my_nginx.conf
sudo ln -s /etc/nginx/sites-available/my_nginx.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo chown -R www-data:www-data /home/hychen11/Desktop/sky-take-out-front/nginx-1.20.2/html
sudo chmod -R 755 /home/hychen11/Desktop/sky-take-out-front/nginx-1.20.2/html
sudo chmod +x /home/hychen11
sudo chmod +x /home/hychen11/Desktop
sudo chmod +x /home/hychen11/Desktop/sky-take-out-front
sudo chmod +x /home/hychen11/Desktop/sky-take-out-front/nginx-1.20.2
sudo chmod +x /home/hychen11/Desktop/sky-take-out-front/nginx-1.20.2/html
#Nginx需要有权限访问路径中的每一个目录。确保所有上级目录都有执行权限（x），允许Nginx进入这些目录。
```



# Sky

## Day1

#### jwt

登录成功后，生成jwt令牌，在application.yaml里创建然后注入程序生成token

**JWT令牌主要用于身份验证和授权**git pull origin main --no-rebase

```yaml
sky:
  jwt:
    # 设置jwt签名加密时使用的秘钥
    admin-secret-key: itcast
    # 设置jwt过期时间
    admin-ttl: 7200000
    # 设置前端传递过来的令牌名称
    admin-token-name: token
    # 小程序的jwt配置
    user-secret-key: itcast
    user-ttl: 7200000
    user-token-name: authentication
```

#### "builder"

算是工厂建造模式？

VO（Value Object）的主要作用就是将相关的数据封装在一起，然后传输给前端或其他服务。这种方式有助于保持数据结构的一致性，并提高代码的可维护性和可读性。

```java
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
    private String name;
    private int age;
    private String email;
}

// 使用Builder创建对象
User user = User.builder()
                .name("John Doe")
                .age(30)
                .email("john.doe@example.com")
                .build();

```

#### nginx反向代理

* cache 快速响应
* 负载均衡
* 安全

**nginx.conf**

```conf
  	#负载均衡(基于反向代理的)
  	upstream webservers{
	  server 127.0.0.1:8080 weight=90 ;
	  server 127.0.0.1:8088 weight=10 ;
	}
    server {
        listen       80;
        server_name  localhost;

        # 反向代理,处理管理端发送的请求
        location /api/ {
            proxy_pass   http://webservers/admin/;
        }
```

```lua
chrome : http://localhost/api/employee/login
|nginx proxy_pass
nginx: http://localhost:8080/admin/employee/login
```

负载均衡

* 默认：轮询
* weight：权重高优先
* ip_hash
* least_conn最少连接优先
* url_hash
* fair相应时间短优先

### MD5加密

```java
password = DigestUtils.md5DigestAsHex(password.getBytes());
```

### Swagger

knife4j

生成接口要扫描一些包

```java
Docket docket = new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.sky.controller"))
            .paths(PathSelectors.any())
            .build();

 protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.info("准备静态资源映射");
        registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
```

也就是如果没有addResourceHandlers，访问doc.html会误认为导入到路由也就是controller里，然后找不到就报错，有addResourceHandlers就会转发到这个静态路由上

然后Docket里的basePackage就是指定了com.sky.controller下面的所有接口

@Api  Controller

@ApiModel  Entity,DTO,VO

@ApiModelProperty  属性

@ApiOperation 作用

## Day2

* DTO 封装数据，传给service，再调用Mapper插入数据库

这里用到的是对象属性拷贝，传入的DTO和对象参数一致！

```java
public void save(EmployeeDTO employeeDTO){
        Employee employee= new Employee();
        //对象属性拷贝
//        BeanUtils.copyProperties(source,target);
        //前提属性名字一致！ name 2 name
        BeanUtils.copyProperties(employeeDTO,employee);
        employee.setStatus(StatusConstant.ENABLE);
        employee.setPassword(DigestUtils.md5DigestAsHex(PasswordConstant.DEFAULT_PASSWORD.getBytes()));
        employee.setCreateTime(LocalDateTime.now());
        employee.setUpdateTime(LocalDateTime.now());
        //TODO
        employee.setCreateUser(10L);
        employee.setUpdateUser(10L);
        employeeMapper.insert(employee);
    }
```

然后Mapper操作的就是Mybatis的数据插入，这里_可以用驼峰来替代

```java
    @Insert("insert into employee (name,username, password, phone, sex, id_number, create_time, update_time, create_user, update_user,status)"
            + "values"
            + "(  #{name},#{username}, #{password}, #{phone}, #{sex}, #{idNumber}, #{createTime}, #{updateTime}, #{createUser}, #{updateUser}, #{status})")
    void insert(Employee employee);
```

#### jwtTokenAdminiIntercptor

拦截器，也就是要校验jwt token

在swagger调试的时候要加入全局参数token

```yaml
sky:
  jwt:
    # 设置jwt签名加密时使用的秘钥
    admin-secret-key: itcast
    # 设置jwt过期时间
    admin-ttl: 7200000
    # 设置前端传递过来的令牌名称
    admin-token-name: token
```

然后调试发送

#### 捕获异常

首先在后端报错信息里查出报错信息

然后`GlobalExceptionHandler.java` 里重构一个exceptionHandler 

```java
@ExceptionHandler
public Result exceptionHandler(SQLIntegrityConstraintViolationException ex){
//        Duplicate entry 'zhangsan' for key 'employee.idx_username'
    String message=ex.getMessage();
    if(message.contains("Duplicate entry")){
        String[] split=message.split(" ");
        String username=split[2];
        String msg=username+ MessageConstant.AlREADY_EXISTS;
        return Result.error(msg);
    }else{
        return Result.error(MessageConstant.UNKNOWN_ERROR);
    }
}
```

#### 动态获得当前登录用户信息

![image-20240707170030814](/home/hychen11/.config/Typora/typora-user-images/image-20240707170030814.png)

#### ThreadLocal

每个线程有单独的存储空间

```java
Thread.currentThread().getId();
```

每一次请求，从JWT拦截器到Controller到Service都是一个单独的线程

```java
package com.sky.context;

public class BaseContext {

    public static ThreadLocal<Long> threadLocal = new ThreadLocal<>();

    public static void setCurrentId(Long id) {
        threadLocal.set(id);
    }

    public static Long getCurrentId() {
        return threadLocal.get();
    }

    public static void removeCurrentId() {
        threadLocal.remove();
    }

}
```

使用

```
BaseContext.setCurrentId();
```

### 分页查询

**pagehelper**

```java
    public PageResult pageQuery(EmployeePageQueryDTO employeePageQueryDTO){
        PageHelper.startPage(employeePageQueryDTO.getPage(),employeePageQueryDTO.getPageSize());
        return null;
    }
```

这里就是会存这page，pagesize到ThreadLocal里，然后在Mapper.xml配置文件里加上limit关键字，page啥的加上

`PageHelper.startPage()` 是 MyBatis 的一个分页插件方法，用于简化分页操作。它主要用于在查询之前设置分页参数，如页码和每页显示的记录数。

### 时间

用WebMVC解决，就是重写父类的`extendMessageConverters`

因为他那里的请求传入了时间参数，并设置了格式，所以默认响应回来的数据也按照那个格式

```java
   @Override
    protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        //消息转换器
        MappingJackson2HttpMessageConverter converter=new MappingJackson2HttpMessageConverter();
        //创建对象转换器 java obj 2 json
        converter.setObjectMapper(new JacksonObjectMapper());
        converters.add(0,converter);//默认排在最后，index=0就是最先执行
    }
```

### 权限（通过构建器）

Employ类里有@Builder

```java
//        Employee employee=new Employee();
//        employee.setStatus(status);
//        employee.setId(id);
        Employee employee = Employee.builder()
                .status(status)
                .id(id)
                .build();
        employeeMapper.update(employee);
```

### xml

```xml
   <update id="update" parameterType="Employee">
        update employee
        <set>
            <if test="name != null">
                name = #{name},
            </if>
            <if test="username != null">
                username = #{username},
            </if>
            <if test="password != null">
                password = #{password},
            </if>
            <if test="phone != null">
                phone = #{phone},
            </if>
            <if test="sex != null">
                sex = #{sex},
            </if>
            <if test="idNumber != null">
                id_Number = #{idNumber},
            </if>

            <if test="updateTime != null">
                update_Time = #{updateTime},
            </if>
            <if test="updateUser != null">
                update_User = #{updateUser},
            </if>
            <if test="status != null">
                status = #{status},
            </if>
        </set>
        where id = #{id}
    </update>
```

这里的`<if test="name != null">`都是查看实体employee里的name

### 页面回显

 @GetMapping("/{id}")时，这里的id参数要通过@PathVariable("id") Long id声明（如果参数名字一致则直接@PathVariable就行

```java
    @PostMapping("/{id}")
    @ApiOperation("员工修改")
    //查询就不用Result范化
    public Result<Employee> getById(@PathVariable("id") Long id) {
        log.info("员工启用禁用:{},{}",status,id);
        employeeService.startOrstop(status,id);
        return Result.success();
    }
```

## Day3（AOP）

###  Aspect-Oriented Programming

编程范式，用于分离横切关注点（cross-cutting concerns）以提高代码的模块化和可维护性

即那些横跨多个模块或功能但与业务逻辑无关的功能，如日志记录、事务管理、安全检查等。

* 自定义一个注解AutoFill
* 自定义切面类AutoFillAspect，统一拦截加入了AutoFill注解的方法
* Mapper上加入AutoFill注解

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoFill {
 	   
}
```

#### `@Target`指定`@AutoFill`的适用范围

**`ElementType.TYPE`**：类、接口（包括注解类型）或枚举声明。

**`ElementType.FIELD`**：字段声明（包括枚举常量）。

**`ElementType.METHOD`**：方法声明。

**`ElementType.PARAMETER`**：参数声明。

**`ElementType.CONSTRUCTOR`**：构造方法声明。

**`ElementType.LOCAL_VARIABLE`**：局部变量声明。

**`ElementType.ANNOTATION_TYPE`**：注解类型声明。

**`ElementType.PACKAGE`**：包声明。

#### `@Retention`注解用于指定自定义注解的生命周期

**`RetentionPolicy.SOURCE`**：注解仅在源代码中保留，编译时会被丢弃。

**`RetentionPolicy.CLASS`**：注解在编译时保留在类文件中，但在运行时不可见。

**`RetentionPolicy.RUNTIME`**：注解在运行时保留，可以通过反射访问。

#### `@interface`用于定义一个自定义注解（Annotation）

- **切面（Aspect）**：横切关注点模块化的特殊对象，比如日志记录、事务管理。
- **连接点（Join Point）**：程序执行过程中的某个点，比如方法调用、异常抛出。
- **切入点（Pointcut）**：匹配连接点的断言，定义了横切关注点插入的位置。
- **通知（Advice）**：在切入点上执行的代码，分为前置通知、后置通知、环绕通知等。

```java
package com.sky.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class AutoFillAspect {
    @Pointcut("execution(* com.sky.mapper.*.*(..)) && @annotation(com.sky.annotation.AutoFill)")
    public  void autofillPointCut(){}

    //通知，前置通知，在上面执行前先执行autoFill
    @Before("autofillPointCut()")
    public void autoFill(JoinPoint joinPoint){
        log.info("公共字段填充");
    }
}
```

**`@Pointcut`**：定义一个切入点表达式，指定在哪些连接点（Join Points）上执行切面的逻辑。

**`@Before`**：前置通知，指定在切入点方法执行之前执行的逻辑

```java
@AutoFill(value=OperationType.INSERT)
```

### 外建Foreign Key

**外键定义**：一个表中的一个字段或多个字段，它引用另一个表中的主键或唯一键

```sql
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date DATE,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

`customers` 表中的 `customer_id` 是主键

`orders` 表中的 `customer_id` 是外键，它引用 `customers` 表中的 `customer_id`

```sql
INSERT INTO customers (customer_id, customer_name) VALUES (1, 'Alice');
INSERT INTO customers (customer_id, customer_name) VALUES (2, 'Bob');

-- 有效的插入，因为 customer_id 1 存在于 customers 表
INSERT INTO orders (order_id, order_date, customer_id) VALUES (101, '2023-07-08', 1);

-- 无效的插入，customer_id 3 不存在于 customers 表
INSERT INTO orders (order_id, order_date, customer_id) VALUES (102, '2023-07-08', 3);  -- 这将导致错误
```

### 文件上传oss

@ConfigurationProperties(prefix = "sky.alioss")
读取配置文件

```java
@Component
@ConfigurationProperties(prefix = "sky.alioss")
@Data
public class AliOssProperties {

    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;

}
```

### 新建菜品（多表查询）

xml文件里返回主键

```xml
useGeneratedKeys="true" keyProperty="id">
```

```java
Long dishid=dish.getId();
```

```java
//@RequestBody 传Json格式
//如果是查询的话就不用加！   ？key=value
```

这里要注意的一个bug就是@RequestBody

如果是非Json格式的查询，就不要添加！比如？key=value这种就不是json！

### 删除菜品

`@RequestParam` 是 Spring MVC 中的一个注解，用于将 HTTP 请求参数绑定到控制器方法的参数上。它通常用于处理 HTTP GET 请求中的查询参数。

```
http://example.com/api?ids=1,2,3,4
```

要将查询参数 `ids` 解析为 `List<Long>`，可以使用以下方法：

1. 在控制器方法上使用 `@RequestParam` 注解绑定查询参数。
2. 使用 `String` 类型接收参数，并将其转换为 `List<Long>`。

### 多表操作@Transactional

维持多表操作一致性

### 修改菜品

`@PathVariable`

```java
@GetMapping("/{id}")
public Result<@Configuration
@Slf4j
public class RedisConfiguration {
    @Bean
    public RedisTemplate redisTemplate(RedisConnectionFactory redisConnectionFactory){
        log.info("开始创建redis模板对象");
        RedisTemplate redisTemplate= new RedisTemplate();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        return redisTemplate;
    }
}
DishVO> getById(@PathVariable Long id) {}
```

## Day4

记录一个bug

`@RequestParam` 的参数名称与 URL 查询字符串中的参数名称不一定要一致，可以通过 `value` 属性指定查询参数的名称。所以，如果你的查询字符串参数名称是 `id`，但是方法参数名称是 `dishId`，可以使用以下方式：

```java
//POST /status?status=0&id=11
public Result startOrStop(@PathVariable Integer status, @RequestParam(value = "id") Long dishId) {}
//或者和url的id对应
public Result startOrStop(@PathVariable Integer status，Long id) {}
```

## Day5

创建并配置一个`RedisTemplate`实例，并将其注册到Spring容器中

```java
@Configuration
@Slf4j
public class RedisConfiguration {
    @Bean
    public RedisTemplate redisTemplate(RedisConnectionFactory redisConnectionFactory){
        log.info("开始创建redis模板对象");
        RedisTemplate redisTemplate= new RedisTemplate();
        // 设置连接工厂
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        // 设置key的序列化器
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        // 设置value的序列化器
        redisTemplate.setValueSerializer(new StringRedisSerializer());

        // 使配置生效
//        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}
```

调用Redis

```java
@SpringBootTest
public class SpringDataRedisTest {
    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void testRedisTemplate(){
        System.out.println(redisTemplate);
        ValueOperations valueOperations=redisTemplate.opsForValue();
        HashOperations hashOperations= redisTemplate.opsForHash();
        ListOperations listOperations=redisTemplate.opsForList();
        SetOperations setOperations= redisTemplate.opsForSet();
        ZSetOperations zSetOperations= redisTemplate.opsForZSet();
    }
}
```

user和admin都有同样的类名，改RestController来区分

```java
@RestController("adminShopController")
@RestController("userShopController")
```

## Day6

### HttpClient

```java
   @Test
    public void testGET() throws Exception{
        //创建httpclient对象
        CloseableHttpClient httpClient= HttpClients.createDefault();
        //创建请求对象
        HttpGet httpGet=new HttpGet("http://localhost:8080/user/shop/status");
        //发送请求，得到响应
        CloseableHttpResponse response = httpClient.execute(httpGet);
        //解析响应
        int status=response.getStatusLine().getStatusCode();
        System.out.println("状态码"+status);  //状态码200
		
        HttpEntity entity=response.getEntity();
        String body= EntityUtils.toString(entity);
        System.out.println("返回数据"+body);  //返回数据{"code":1,"msg":null,"data":0}
        //关闭
        response.close();
        httpClient.close();
    }

```

### 微信小程序开发

用户登录

![img](https://res.wx.qq.com/wxdoc/dist/assets/img/api-login.2fcc9f35.jpg)

code：0f3bKw0w3AWu933cck3w33v38t4bKw0e

code2Session

```
GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
```

Jwt拦截器在WebMvcConfiguration里添加

```
        registry.addInterceptor(jwtTokenUserInterceptor)
                .addPathPatterns("/user/**")
                .excludePathPatterns("/user/user/login")
                .excludePathPatterns("/user/shop/status");
```

swagger分栏Docket里添加

```
                .groupName("管理端接口")
```

使用wx.login来获得openId，然后根据openId注册用户返回用户对象

```java
public class UserServiceImpl implements UserService {
    @Autowired
    private WeChatProperties weChatProperties;
    @Autowired
    private UserMapper userMapper;

    public static final String WX_LOGIN="https://api.weixin.qq.com/sns/jscode2session?";
    public User wxlogin(UserLoginDTO userLoginDTO){
        String openId=getOpenId(userLoginDTO);
        //判断是否新用户
        if(openId==null){
            throw new LoginFailedException(MessageConstant.LOGIN_FAILED);
        }
        //新用户自动注册
        User user=userMapper.getByOpenId(openId);
        if(user==null){
            user=User.builder()
                    .openid(openId)
                    .createTime(LocalDateTime.now())
                    .build();
            userMapper.insert(user);
        }
        //返回用户对象
        return user;
    }
    private String getOpenId(UserLoginDTO userLoginDTO) {
        Map<String, String> map=new HashMap<>();
        map.put("appid",weChatProperties.getAppid());
        map.put("secret",weChatProperties.getSecret());
        map.put("js_code", userLoginDTO.getCode());
        map.put("grant_type","authorization_code");
        String json=HttpClientUtil.doGet(WX_LOGIN,map);
        //openid
        JSONObject jsonObject=JSON.parseObject(json);
        String openId=jsonObject.getString("openid");
        return openId;
    }
}
```

## Day7

![image-20240720134012561](/home/hychen11/.config/Typora/typora-user-images/image-20240720134012561.png)

### redis缓存数据

redis有就读取缓存，没有就查询数据库，载入缓存

```java
    public Result<List<DishVO>> list(Long categoryId) {
        //generate key, in java String+Long will auto turn Long into String
        String key="dish_"+categoryId;
        //先查redis！
        List<DishVO> list=(List<DishVO>)redisTemplate.opsForValue().get(key);
        if(list!=null&&list.size()>0){
            return Result.success(list);
        }
        Dish dish = new Dish();
        dish.setCategoryId(categoryId);
        dish.setStatus(StatusConstant.ENABLE);//查询起售中的菜品

        list = dishService.listWithFlavor(dish);
        redisTemplate.opsForValue().set(key,list);
        return Result.success(list);
    }

```

删除修改新增等都是删除redis！方便起见全删

```java
private void cleanCache(String pattern){
    Set keys=redisTemplate.keys(pattern);
    redisTemplate.delete(keys);
}

cleanCache("dish_*");//注意这里要有*!
```

### Spring Cache

基于注解

* EHCache
* Caffeine
* Redis

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

`@EnableCaching` 加在启动类上

`@Cacheable` `method上`取值+放入

`@CachePut` 放入

`@CacheEvict`  删除

```java
//@CachePut(cacheName="userCache",key="#user.id")
@CachePut(cacheName="userCache",key="#result.id")
//@CachePut(cacheName="userCache",key="#p0.id")  //p0，a0，root.args[0]第一个参数，p1，a1第二个参数

public User save(@RequestBody User user){
    userMapper.insert(user);
    return user;
}
//这里的存入格式是userCache::key，所以key要spring EL，这里就和下面函数的参数user保持一致！
//这里result就表示返回值
```

cache是树型结构，userCache::1就是userCache -> Empty -> 1

`a:b:c:d`就是 a->b->c->d 类似于文件结构

批量删除，这里是函数先执行完（先删除数据库，然后再动态代理删除Cache）

```java
@CacheEvict(cacheName="userCache",allEntries=true)
//deleteAll
```

### 购物车

这里有个bug！

这里setUserId和setId不一样！！！当userId为null先检查jwt拦截器，然后再检查object设置对没对

```java
shoppingCart.setUserId(userId);
```

还有一个bug就是Redis Deserialize错误，还没解决

## Day8

### wechat pay

![image-20240721180653059](/home/hychen11/.config/Typora/typora-user-images/image-20240721180653059.png)

### 用户下单

一样的套路

## Day9

xml里的

`lt` 和 `gt` 是 `less than`（小于）和 `greater than`（大于）的缩写

`&gt;=#{}` , `&lt;=#{}`

```xml
   <if test="beginTime!=null">
        and order_time &gt;= #{beginTime}
    </if>
    <if test="endTime!=null">
        and order_time &lt;= #{endTime}
    </if>
```

```java
//订单状态 1待付款 2待接单 3已接单 4派送中 5已完成 6已取消 7退款
```

### Static

`static`关键字用于表示类的成员（字段或方法）属于类本身，而不是属于类的实例

静态成员（static fields and methods）

1. **所属范围**：
   - 静态成员属于类本身，可以通过类名直接访问。
   - 非静态成员属于类的实例，必须通过实例来访问。
2. **内存分配**：
   - 静态成员在类加载时分配内存，只存在一个副本，所有实例共享这一副本。
   - 非静态成员在每个实例创建时分配内存，每个实例都有自己的副本。
3. **调用方式**：
   - 静态方法和字段可以通过类名直接调用。
   - 非静态方法和字段必须通过实例来调用。
4. **访问权限**：
   - 静态方法不能直接访问非静态字段或调用非静态方法，因为它们没有实例上下文。
   - 非静态方法可以访问静态字段和调用静态方法。
5. **用途**：
   - 静态字段通常用于定义类级别的常量或共享数据。
   - 静态方法通常用于定义不依赖于实例的功能，例如工具方法。

**静态成员属于类本身，在类加载时初始化，所有实例共享。**

**非静态成员属于类的实例，在实例创建时初始化，每个实例都有自己的副本。**

**静态方法和字段可以通过类名直接访问，而非静态方法和字段必须通过实例访问。**

```java
        BeanUtils.copyProperties(orderDetail,shoppingCart,"id");
        //这里属性拷贝的时候忽略id！
        
		//新的写法!!!!
        // 将订单详情对象转换为购物车对象
        List<ShoppingCart> shoppingCartList = orderDetailList.stream().map(x -> {
            ShoppingCart shoppingCart = new ShoppingCart();

            // 将原订单详情里面的菜品信息重新复制到购物车对象中
            BeanUtils.copyProperties(x, shoppingCart, "id");
            shoppingCart.setUserId(userId);
            shoppingCart.setCreateTime(LocalDateTime.now());

            return shoppingCart;
        }).collect(Collectors.toList());   
```

`.map(x -> {...})`

 Stream API 中的一个中间操作，用于将流中的每个元素转换为另一种形式。它接收一个函数作为参数，这个函数定义了如何转换每个元素。

在这段代码中，`x -> {...}` 是一个 Lambda 表达式，它表示将流中的每个元素（这里假设每个元素是一个包含订单详细信息的对象 `x`）转换为一个字符串。

## Day10

### Spring Task

定时任务定时处理

#### cron表达式 交给gpt处理！

**?**：表示不指定值（仅用于日和星期字段）

*****：表示任意值

**,**：表示多个值。例如，在小时字段中写`1,2,3`表示在1点、2点和3点执行

**-**：表示一个范围

启动类上加上`@EnableScheduling`，然后自定义定时任务类

`@Scheduled(cron="0 * * * * ?")`

### WebSocket 长连接

http1.1长连接， 1.0短连接

QQ聊天UDP，文件传输TCP

`ws://localhost:8080/ws`

websocket协议

```java
//ws://localhost/ws/x5ypseq3xil
//先转发到nginx，反向代理转发到tomcat服务器
```

`nginx.conf`

````shell
 # WebSocket
    location /ws/ {
    proxy_pass   http://webservers/ws/;
                proxy_http_version 1.1;
                proxy_read_timeout 3600s;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "$connection_upgrade";
}
upstream webservers{
      server 127.0.0.1:8080 weight=90 ;
      #server 127.0.0.1:8088 weight=10 ;
}
````

```java
    Map map=new HashMap();
    map.put("type",2);//1来单提醒，2客户催单
    map.put("orderId",id);
    map.put("content","订单号:"+ordersDB.getNumber());
    String json=JSON.toJSONString(map);
    webSocketServer.sendToAllClient(json);
```

使用方法就是转成JSON

## Day11

### Apache ECharts

这里List转成String

```java
import org.apache.commons.lang3.StringUtils;
StringUtils.join(datalist,",");
```

如何获得连续日期？

```java
while(!begin.equals(end)) {
    begin=begin.plusDays(1);
    datalist.add(begin);
}
```

### Stream流

```java
List<Integer> list1;
list1.stream().reduce(Integer::sum).get();
//转成stream,然后reduce合并，方法是sum求和，再取值

goodsSalesDTOList.stream().map(GoodsSalesDTO::getName).collect(Collectors.toList());
```

## Day12

### Apache POI

操作Excel文档，比如导出交易明细

输出流？

```
HttpServerletResponse
```

# VUE

```shell
npm i -g @vue/cli
#i install, -g global
#--verbose 增加详情
```

```shell
#package.json 
#  "scripts": {
#    "serve": "vue-cli-service serve",
#    "build": "vue-cli-service build",
#    "lint": "vue-cli-service lint"
#  },
npm run serve
```

```js
//vue.config 修改端口号
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 7070
  }
})
```





# 反射

反射（Reflection）是一种让程序能够在运行时获取有关自身的信息并操作其中的类、方法、属性等的机制。

### Step1获取Class对象

* Class c1=类名.class
* public static class forName(String package)
* public Class getClass(); Class c3=对象.getClass();

```java
Class c1=Student.class;
System.out.println(c1.getName());
System.out.println(c1.getSimpleName());

Class.forName("com.sky");//有异常就在函数外throws Exception

Student s=new Student();
Class c3=s.getClass();
```

### Step2获取Class构造器

```java
Class c=Cat.class();
Constructor[] constructors=c.getConstructors();//Constructor array存放每一个数组变量，public constructor
Constructor[] constructors=c.getDeclaredConstructors();//Constructor array存放每一个数组变量，所有的包括private的
for(Constructor constructor:constructors){
    constructor.getName();
    constructor.getParameterCount();
}
```

```java
//无参数构造
Constructor[] constructors=c.getDeclaredConstructors();
constructors.setAccessible(true);//禁止检查，因为构造不能Private，有这个就可以绕过Private
Cat cat=(Cat)constructors。newInstance();

//有参数构造
//private Cat(String name,int age)
Constructor[] constructors=c.getDeclaredConstructors(String.class,int.class);
Cat cat=(Cat)constructors。newInstance("aa",2);

```

### Step3获取Class成员变量

```java
//step1
Class c=Cat.class
//step2
Field[] fields=c.getDeclaredFields();
//field.getType();
//field.getName();
Field fName=c.getDeclaredFields("name");
Field fAge=c.getDeclaredFields("age");
//赋值
Cat cat=new Cat();
fName.setAccessible(true);
fName.set("aa");
//取值
String name=(String)fName.get(cat);
```

### Step4获取Class成员方法

```java
//step1
Class c=Cat.class
//step2
Method[] methods=c.getDeclaredMethods();
//methods.getName();
//methods.getParameterCount();
//methods.getReturnType();

//如果有两个run，要带上args定位
Method run=c.getDeclaredMethods("run",String.class);

//执行
//相当于执行run()
Cat cat=new Cat();
run.setAccessible(true);
Object rs=run.invoke(cat);//调用无参数的run
//有参数
String rs=(String)run.invoke(run,"aa");
```

### Step5作用

```java
public static void saveObject(Object obj) throws Exception{
	PrintStream ps=new PrintStream(new FileOutputStream("path/to/txtfile",true));
    
    Class c=obj.getClass();
    Field[] fields=c.getDeclaredFields();
    for(Field field:fields){
        //拿变量名
        String name=field.getName();
        field.setAccessible(true);
        //拿变量值
        String value=field.get(obj)+"";
    }
    ps.close();
}
```

# 注解Annotation

@Test
@Override

根据注解信息决定如何执行程序

### 自己定义注解

```java
public @interfave MyTest1{
	public String aaa();
	boolean bbb() default true;
}
```

特殊属性名 **value**

只有一个属性value可以不写

```java
public @interfave MyTest2{
	public String value();
}
//@MyTest2("hh") 省略value=
```

```java
@MyTest1(aaa="hh",bbb=true)
public class AnnotationTest1{
	@MyTest1(aaa="hhh")
	public void test(){
	
	}
}
```

### 元注解

修饰注解的注解

``` java
//表示只能在哪些地方使用
@Target(ElementType.TYPE)
@Target({ElementType.TYPE,ElementType.METHOD})
```

TYPE 类

FIELD 成员变量

METHOD 成员方法

PARAMETER 参数

...

```java
//保留周期
@Retention(RetentionPolicy.RUNTIME)
```

SOURCE 源码

CLASS字节码阶段

RUNTIME 运行阶段（常用）

### 注解的解析

```java
public class Annotation3{
	@Test
	public void parseClass(){
		//得到class对象
		Class c=Demo.class;
        Method m=c.getDeclaredMethods("test1");
        // Method[] m=c.getDeclaredMethods();
        
		//解析类上的注解,Method的话就m.isAnnotationPresent()
		if(c.isAnnotationPresent(MyTest.class)){
			MyTest myTest=(MyTest)c.getDeclaredAnnotations(MyTest.class);
            //myTest.value()
            //Arrays.toString(myTest.bb())
		}
	}
}
```

执行Method就

```java
Cat a=new Cat();
m.invoke(a);
```

# 过滤器->拦截器->切面编程->Controller

过滤器 servlet容器层面的

拦截器、切面编程 web框架层面

日志处理：c端所有请求在Controller前，给每个请求唯一标识 traceId

## 过滤器Filter

拦截请求，完成请求，再次拦截响应，发送响应

doFilter拦截请求 

## 拦截器Interceptor

## AOP

```java
@Component
@Aspect
@Slf4j 
public class TimeAspect{
    //Around说明作用在哪些方法上
    @Around("execution(* com.sky.*.*(..))")
	public Object recordTime(ProceedingJoinPoint jointPoint){
		//调用原始方法运行
		Object rs=jointPoint.process();
        joinPoint.getSignature();//得到方法签名
        return rs;
	}
}
```

JointPoint连接点

Advice通知

PointCut切入点

Aspect切面

 ![image-20240714202110645](/home/hychen11/.config/Typora/typora-user-images/image-20240714202110645.png)

```java
@Pointcut("execution(* com.sky.*.*(..))")
public void pt(){}

@Around("pt()")

```

# 文件上传+OSS

## 本地存储

前端页面三要素

* type="file"
* method="post"
* enctype="multipart/form-data"

enctype不能默认值，不然仅提交文件名，而不是内容！

表单上的name="image" 和后端的image保持一致！

```java
@RestController
public class CommonController {
    @PostMapping("/upload")
    @ApiOperation("文件上传")
    public Result upload(MultipartFile image){
        String originalFilename=image.getOriginalFilename();
        
        int index=originalFilename.lastIndexof(".");
        String suffixname=originalFilename.substring(index);
        UUID uuid = UUID.randomUUID();
        
       	image.transferTo(new File("/Pathname"+uuid.toString()+suffixname));//pathname
        return Result.success();
    }
}
```

为了不覆盖UUID (Universally Unique Identifier)

#### 文件大小限制

`application.properties`

改multipart的大小就行

## OSS（Object Storage Service）

SDK下载那块有个文档

pom.xml添加

```xml
    <dependency>
        <groupId>com.aliyun.oss</groupId>
        <artifactId>aliyun-sdk-oss</artifactId>
        <version>${aliyun.sdk.oss}</version>
    </dependency>
```

剩下的看文档改！

```java
@RestController
public class UploadController{
	@Autowired
	private AliOSSUtils aliOSSUtile;

    @PostMapping("/upload")
    public Result upload(MultipartFile image) throw IOException{
        String url=aliOSSUtils.upload(image);
        return Result.success(url);
    }
}

```



# IOC (Inversion of Control)

优先级properties，yml，yaml

yml主流

bean创建好就放在IOC容器中，默认的Bean是单例的，多次获取到的都是同一个地址

```java
	//step1 获取IOC容器
	@Autowired
    private ApplicationContext applicationContext;

	@Test
	public void testGetBean(){
        //类首字母小写，根据Bean名称获取
        //applicationContext.getBean("className1");得到的是Object类型！
	    ClassName1 bean1=(ClassName1) applicationContext.getBean("className1");
        
        //根据Bean类型获取
        ClassName1 bean2=applicationContext.getBean(ClassName1.class);
        
        //名称和类
        ClassName1 bean3=applicationContext.getBean("className1",ClassName1.class);
    }
```

![image-20240715114521035](/home/hychen11/.config/Typora/typora-user-images/image-20240715114521035.png)

``` java
@Lazy  //延迟初始化，延迟到第一次使用
//@Scope("prototype")
public class ClassName1{
};
```

#### 第三方Bean

不是自定义没法加下面注解，要用到@Bean

```java
@Component   //自定义用这个
@Controller //Controller层
@Service	//Service层
@Repository //DAO层
```

`@Autowired`注解用于自动注入依赖对象。Spring会自动注入匹配的Bean。

```java
@Autowired
private ClassName1 className1;
```

# DI(Dependency injection)

Dependency injection (DI) is a specialized form of IoC

# Redis

基于内存的kv数据库，Redis还可以持久化

Mysql磁盘存储（二维表）

### datatype

key是string， value的类型

* string
* hash
* list
* set
* sorted set/zset

![image-20240717233950631](/home/hychen11/.config/Typora/typora-user-images/image-20240717233950631.png)

### command

#### string

```shell
SET key value
GET key
SETEX key seconds value 
SETNX key value
```

#### hash

```shell
HSET key field value
HGET key field
HDEL key field
HKEYS key
HVALS key
```

#### list

LPUSH : left push左侧插入

```shell
LPUSH key value1 [value2]
LRANGE key start stop  # 0 -1 like python, -1 means the last one element in list
RPOP key
LLEN key
```

#### set

```shell
SADD key member1 [member2]
SMEMBERS key
SCARD key
SINTER key1 [key2]
SUNION key1 [key2]
SREM key member1 [member2]
```

#### zset

这里每个元素有分数，按照这个分数进行排序，分数是double类型

```shell
ZADD key score1 member1 [score2 member2]
ZRANGE key start stop [WITHSCORES] #WITHSCORES 就是是否要返回分数
ZINCRBY key increment member  #对member加上increment
ZREM key member
```

#### 通用

```shell
KEYS pattern
EXISTS key
TYPE key
DEL key
```

