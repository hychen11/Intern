# springboot

### Controller

`@RestController` 或 `@Controller`

通常与具体的 URL 路径绑定（通过 `@RequestMapping`、`@GetMapping` 等）

### Service

处理业务逻辑

有Impl部分，`@Service`

### Entity

`Entity` 是与数据库表直接映射的类，代表了系统中的数据模型。

每个实体类通常对应数据库中的一张表，类的字段对应表的列。

使用注解如 `@Entity`、`@Table`、`@Id`、`@Column` 等标识和配置。

只负责存储数据，没有业务逻辑

### DAO

Data access object 仓库接口



https://www.yuque.com/zhangshuaiyin/guli-mall

https://www.yuque.com/mo_ming/gl7b70/azodep

### balance load！

#### Round Robin

- **How it works**: The Round Robin method distributes client requests across the servers in a sequential manner. Each server gets an equal number of requests by taking turns in a circular order.
- **Advantages**: Simple to implement, good for systems where all servers have similar capacities.
- **Disadvantages**: It does not account for differences in server performance or load, which can lead to inefficiencies if some servers are slower or have more resources than others.

#### Least Connections

- **How it works**: restfultoolkitThe Least Connections strategy sends incoming requests to the server with the fewest active connections. This helps balance the load dynamically based on the actual server load at any given time.
- **Advantages**: Better for environments where connections are long-lived or servers have varying processing capacities.
- **Disadvantages**: Requires tracking active connections, which adds a bit of overhead compared to Round Robin.

#### IP Hash (Source-based Hashing)

- **How it works**: In the IP Hash strategy, the client’s IP address is used to generate a hash, which determines which server will handle the request. This ensures that requests from the same client are consistently routed to the same server.
- **Advantages**: Useful for scenarios where session persistence is important, such as with stateful applications.
- **Disadvantages**: Can lead to unbalanced loads if the client distribution is uneven, and it doesn’t adapt well to servers with varying capabilities.

### Service registration/discovery

when server1 with service B go online->tell nacos-> register

discovery: go nacos, then discover sevice is in server1, server2

### Nacos (Naming Configuration Service)

**service discovery, configuration management, and dynamic DNS** for microservices architectures

supporting both APIs and gRPC for service interaction.

### gRPC

 high-performance, open-source framework developed by Google for **remote procedure calls (RPCs)**

gRPC uses **Protocol Buffers (Protobuf)**, a binary serialization format, for defining service methods and data types, making it more efficient than traditional text-based formats like JSON or XML.

### Configuration Center

get configuration from center (ato configuration)

### Circuit Breaking & Service Downgrading

Breaking: Like a circuit breaker in an electrical system, it temporarily blocks requests to a failing service to prevent overloading. When the service recovers, the circuit breaker "closes" and resumes traffic.

Downgrading: When a service is overloaded or fails, the system reduces its level of service by providing fallback responses, default results, or limiting features to maintain availability.

简单说失败达到阈值，融断，直接不调用这个服务

降级：高峰期，系统资源紧张，非核心服务降级，比如throw exception， return null，mock数据，fallback处理逻辑

### API gateway

all request -> gateway -> final service request!

# IDEA

plug install

```
restfultoolkit
jrebel
lomlock
Mybatis
```

# Redis & Mysql in docker

spring Cloud 微服务

分布式：不同业务不同地方

集群：几台服务器实现同一业务

rpc ->Spring Cloud 中使用HTTP+JSON完成远程调用（不同服务存在不同主机里，服务之间互相调用）

### docker install mysql

```shell
(base) ➜  ~ ls /mydata/mysql/conf/

my.cnf
(base) ➜  ~ sudo vim /mydata/mysql/conf/my.cnf
# --skip-character-set-client-handshake
```

```shell
(base) ➜  ~ sudo docker rm docker_mysql
docker_mysql
(base) ➜  ~ sudo docker run -p 3307:3306 --name docker_mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:latest
34821293fd3264ae5a029f4fa9b258b3f890367b7998a69f401f5be7cf852bdd
```

hosts 3307 will map to docker 3306, so we can visit host 3307 to visit 3306.

`mysql -u root -p -h 127.0.0.1 -P 3307`

`show tables;`

它给的sql创建文件有问题，要手动加上，不然datagrip会报错（不能用ssh连接docker里的mysql）

```sqlite
CREATE DATABASE /*!32312 IF NOT EXISTS*/`gulimall_ums` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `gulimall_ums`;
```

`MYSQL_ROOT_PASSWORD` set password as `root`

两个必要组键

* Spring Web
* OpenFeign

然后聚合，把不同微服务合在一起

```xml
    <modules>
        <module>gulimall-coupon</module>
        <module>gulimall-member</module>
        <module>gulimall-order</module>
        <module>gulimall-product</module>
        <module>gulimall-ware</module>
    </modules>
```

# renren opensource(Backend and Frontend)

https://gitee.com/renrenio

use jdk 17 and change lomlock version to `<lombok.version>1.18.30</lombok.version>`

```shell
sudo update-alternatives --config java
vim ~/.zshrc
#change $JAVA_HOME
source ~/.zshrc
```

frontend use nvm manage node version!

```shell
(base) ➜  ~ node --version
v14.21.3
```

# generator

```yml
erver:
  port: 30080

# mysql
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    #MySQL配置
    driverClassName: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3307/gulimall_pms?useUnicode=true&characterEncoding=UTF-8&serverTimezone=America/Chicago
    username: root
    password: "root"
```

`geenrator.properties`

```
#\u4EE3\u7801\u751F\u6210\u5668\uFF0C\u914D\u7F6E\u4FE1\u606F

mainPath=com.hychen11
#\u5305\u540D
package=com.hychen11.gulimall
moduleName=product
#\u4F5C\u8005
author=hychen
#Email
email=zjuchy1@gmail.com
#\u8868\u524D\u7F00(\u7C7B\u540D\u4E0D\u4F1A\u5305\u542B\u8868\u524D\u7F00)
tablePrefix=pms_
```

# gulimall-common

```java
/**
 * 1、整合MyBatis-Plus
 *      1）、导入依赖
 *      <dependency>
 *             <groupId>com.baomidou</groupId>
 *             <artifactId>mybatis-plus-boot-starter</artifactId>
 *             <version>3.3.1</version>
 *      </dependency>
 *      2）、配置
 *          1、配置数据源；
 *              1）、导入数据库的驱动。https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-versions.html
 *              2）、在application.yml配置数据源相关信息
 *          2、配置MyBatis-Plus；
 *              1）、使用@MapperScan
 *              2）、告诉MyBatis-Plus，sql映射文件位置
 *
 * 2、逻辑删除
 *  1）、配置全局的逻辑删除规则（省略）
 *  2）、配置逻辑删除的组件Bean（省略）
 *  3）、给Bean加上逻辑删除注解@TableLogic
 *
 * 3、JSR303
 *   1）、给Bean添加校验注解:javax.validation.constraints，并定义自己的message提示
 *   2)、开启校验功能@Valid
 *      效果：校验错误以后会有默认的响应；
 *   3）、给校验的bean后紧跟一个BindingResult，就可以获取到校验的结果
 *   4）、分组校验（多场景的复杂校验）
 *         1)、	@NotBlank(message = "品牌名必须提交",groups = {AddGroup.class,UpdateGroup.class})
 *          给校验注解标注什么情况需要进行校验
 *         2）、@Validated({AddGroup.class})
 *         3)、默认没有指定分组的校验注解@NotBlank，在分组校验情况@Validated({AddGroup.class})下不生效，只会在@Validated生效；
 *
 *   5）、自定义校验
 *      1）、编写一个自定义的校验注解
 *      2）、编写一个自定义的校验器 ConstraintValidator
 *      3）、关联自定义的校验器和自定义的校验注解
 *
 * 4、统一的异常处理
 * @ControllerAdvice
 *  1）、编写异常处理类，使用@ControllerAdvice。
 *  2）、使用@ExceptionHandler标注方法可以处理的异常。
 */
```

step1 导入依赖

加入utils 的`Constant`，`PageUtils`，`Query`，`R`和xss `SQLFilter`

相当于补全报错

然后pom.xml加入dependency

```xml
		<!--mybatis plus-->
		<dependency>
			<groupId>com.baomidou</groupId>
			<artifactId>mybatis-plus-boot-starter</artifactId>
			<version>3.2.0</version>
		</dependency>

		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<version>1.18.8</version>
		</dependency>
```

step2.1 配置数据源

导入数据库驱动

```xml
<!--		import mysql-->
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>8.0.30</version>
		</dependency>
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>servlet-api</artifactId>
			<version>2.3</version>
			<scope>provided</scope>
		</dependency>
```

在application.yml里配置数据源

```yml
spring:
  datasource:
    driverClassName: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3307/gulimall_pms?useUnicode=true&characterEncoding=UTF-8&serverTimezone=America/Chicago
    username: root
    password: "root"
```

step2.2 配置Mybatis-plus

使用@MapperScan

在启动项加上

```java
import org.mybatis.spring.annotation.MapperScan;
@SpringBootApplication
@MapperScan("com.hychen11.gulimall.product.dao")
```

MapperPath

告诉MyBatis-Plus，sql映射文件位置

```yml
mybatis-plus:
  mapper-locations: classpath:/mapper/**/*.xml
  global-config:
    db-config:
      id-type: auto
```

mysql的索引是b+树结构，如果用uuid b+树结构会不停变化很消耗资源，一般都是自增

然后运行报错`java.lang.IllegalStateException: Failed to load ApplicationContext`

mvn idea:module 命令执行完毕后生成iml文件，再次点击maven build工程顺利编译通过

### 设定端口

```yml
server:
	port:7000
```

coupon: 7000

member: 8000

order: 9000

product: 10000

ware: 11000

# SpringCloud

register center

config center

gateway

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12568777/1615002771822-1f445dfe-5b23-4ab2-b37c-f60946058944.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_59%2Ctext_RXDmtYHoi48%3D%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fformat%2Cwebp%2Fresize%2Cw_750%2Climit_0)

SpringCloud Alibaba Nacos: Register center, Config center

SpringCloud Ribbon (load balance) 

SpringCloud Feign: RPC

SpringCloud Alibaba Sentinel (Fault Tolerance, Rate Limiting or Throttling, Graceful Degradation or Fallback, Circuit Breaker) 服务容错限流降级融断

SpringCloud gateway API gateway webflux

SpringCloud Sleuth

SpringCloud Alibaba -seata (Fescar)

### SpringCloud Alibaba version

springboot version 2.6.6, jdk17.

gulimall-common `pom.xml`

```xml
<dependencies>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-dependencies</artifactId>
        <version>2021.0.1.0</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
</dependencies>
```

**2021.x branch**: Corresponds to Spring Cloud 2021 & Spring Boot 2.6.x. JDK 1.8 or later versions are supported.

### Nacos register

download nacos https://github.com/alibaba/nacos/releases

https://github.com/alibaba/spring-cloud-alibaba/blob/2023.x/spring-cloud-alibaba-examples/nacos-example/readme.md

**服务注册发现**也放gulimall-common pom.xml里

Before launching the Nacos Discovery sample for demonstration, take a look at how Spring Cloud applications access Nacos Discovery.

**Note that this section is only for your convenience to understand the access method. The access work has been completed in this sample code, and you do not need to modify it.**

1. First, modify the `pom.xml` file and introduce spring-cloud-alibaba-nacos-discovery-starter;

   ```
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
   </dependency>
   ```

   

2. Configuring a Nacos Server address in an `/src/main/resources/application.properties` applied configuration file;

   ```
   spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
   ```

   

3. Use `@ EnableDiscoveryClient` annotation to enable service registration and discovery;

   ```
   @SpringBootApplication
   @EnableDiscoveryClient
   public class ProviderApplication {
   
       public static void main(String[] args) {
           SpringApplication.run(ProviderApplication.class, args);
       }
   
       @RestController
       class EchoController {
           @GetMapping(value = "/echo/{string}")
           public String echo(@PathVariable String string) {
                   return string;
           }
       }
   }
   ```

```
cd nacos/bin
bash startup.sh -m standalone
```

`-m standalone` means Singleton Pattern

check `localhost:8848/nacos`

self-start

```shell
sudo nano /etc/systemd/system/nacos.service


[Unit]
Description=Nacos Server
After=network.target

[Service]
Environment="JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64/bin/java"
Type=forking
ExecStart=/opt/nacos/bin/startup.sh -m standalone
ExecStop=/opt/nacos/bin/shutdown.sh
Restart=on-failure
LimitNOFILE=65535
PrivateTmp=true
[Install]
WantedBy=multi-user.target


sudo systemctl daemon-reload 
systemctl start nacos
systemctl status nacos
systemctl stop nacos
systemctl enable nacos
systemctl is-enabled nacos
```

然后别忘了配置application.yml

```yml
spring.application.name: gulimall-XXX
```

简单说就是加依赖，加注解，加application.yml

`@EnableDiscoveryClient`

> 用于在 Spring Cloud 项目中启用服务注册和发现功能。它的主要作用是使应用程序能够注册到服务注册中心（比如 Eureka、Consul 或 Zookeeper），从而实现微服务的自动发现和负载均衡等功能。
>
> “注册到 Eureka”指的是当一个微服务启动时，它会自动将自己的信息（如服务名称、IP 地址、端口号等）发送到 Eureka 服务器（也就是注册中心）。这样，Eureka 注册中心就会记录下该服务的实例信息，以便其他服务可以通过 Eureka 发现并调用它。

### Feign

Feign is Declarative HTTP Client

Feign 允许开发者定义接口，并通过注解方式指定接口方法要请求的 HTTP 路径、参数等。Feign 会根据接口和注解自动生成对应的 HTTP 请求逻辑，并通过注册中心（比如 Eureka）查找服务地址，简化了服务调用。

**声明式接口**：你只需定义一个 Java 接口，并用注解来描述 HTTP 请求的细节，比如 `@GetMapping`、`@PostMapping` 等。

**自动代理**：Feign 会在运行时创建接口的代理，实现远程调用。通过代理对象，Feign 会自动生成 HTTP 请求，发送到目标服务，并将返回结果映射为 Java 对象。

**负载均衡**：结合 Eureka 和 Ribbon（已内置在 Spring Cloud Feign 中），Feign 支持客户端负载均衡，可以自动选择一个可用的实例来发送请求。

有一个 `UserService`，另一个服务 `OrderService` 想调用它的 `/user/info` 接口。可以这样定义 Feign 客户端接口：

```java
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "UserService")  // 表示调用的服务名
public interface UserClient {

    @GetMapping("/user/info")  // 定义请求路径
    UserInfo getUserInfo(@RequestParam("id") Long userId);
}
```

在 `OrderService` 中注入 `UserClient` 接口后，就可以像调用本地方法一样调用 `getUserInfo` 方法，而 Feign 会自动发出 HTTP 请求到 `UserService` 的 `/user/info`

#### openfeign

```java
/*
    1）引入openfeign
    2）interface, tell springcloud this interface needs rpc
    3) open rpc (@EnableFeignClients)
*/
```

1）

在创建module里就勾了springweb+openfeign

```xml
       <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
```

2）创建一个feign的package，创建CouponFeignService的Interface

```java
package com.hychen11.gulimall.member.feign;

import com.hychen11.gulimall.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name="gulimall-coupon",url = "http://localhost:7000")
public interface CouponFeignService {
    @GetMapping("/coupon/coupon/member/list")
    public R memberCoupons();
}
```

注意，这里的R class相当与把数据Map成JSON格式，然后返回给客户端

如果调用接口的`memberCoupons()`,去注册中心找`gulimall-coupon`，然后调用请求`/coupon/coupon/member/list`

3）Main Application Class add @EnableFeignClients

```java
@EnableFeignClients(basePackages = "com.hychen11.gulimall.member.feign")
```

启动时会自动扫描这个路径下的所有标了`@FeignClient` annotation的 Interface

### Nacos config

step1 配置中心做配置管理

add into gulimall-common pom.xml

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
    <version>3.0.2</version>
</dependency>
```

step2

创建`bootstrap.properties`

```properties
spring.application.name=gulimall-coupon
spring.cloud.nacos.config.server-addr=127.0.0.1:8848
```

step3

`application.properties`适用于静态值的读取

```
coupons.user.name="b"
```

 ```java
 @Value("${coupons.user.name}")
 private String name;
 ```

step4

动态更新 在nacos里的Edit Configuration里properties添加

这里在controller.java里加上动态刷新的annotation

```java
@RefreshScope
```

step5

这里不能刷新，在application.yml里加上，nacos上也要在`gulimall-coupon.properties`这里加上配置

```yml
  cloud:
    nacos:
      serverAddr: 127.0.0.1:8848
      config:
        preference: remote
      discovery:
        server-addr: localhost:8848

  config:
    import:
      - nacos:gulimall-coupon.properties?refreshEnabled=true&group=DEFAULT_GROUP
```

### Namespace

default is in public

We can also have (every microserver create their own namespace (ioslation))

in application.yml add  `namespace: 6b8fe1af-0411-4ca5-a000-eef67eafc137` and ` group: coupon`

```yml
  cloud:
    nacos:
      serverAddr: 127.0.0.1:8848
      namespace: 6b8fe1af-0411-4ca5-a000-eef67eafc137
      group: coupon
      config:
        preference: remote
      discovery:
        server-addr: localhost:8848
```

# Gateway

Client -> **API-service(gateway)**->{user-service,good-service,...}

Zuui RPS(20000), SpringCloud gateway RPS(30000)

### Features

Spring Cloud Gateway features:

- Built on Spring Framework and Spring Boot
- Able to match routes on any request attribute.
- Predicates and filters are specific to routes.
- Circuit Breaker integration.
- Spring Cloud DiscoveryClient integration
- Easy to write **Predicates and Filters**
- **Request Rate Limiting**
- Path Rewriting

URL(Uniform Resource Locator) and URI(Uniform Resource Identifier)

uri身份证号 url地址定位+身份证

### Glossary

- **Route**: The basic building block of the gateway. It is defined by an ID, a destination URI, a collection of predicates, and a collection of filters. A route is matched if the aggregate predicate is true.

- **Predicate**: This is a [Java 8 Function Predicate](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html). The input type is a [Spring Framework `ServerWebExchange`](https://docs.spring.io/spring/docs/5.0.x/javadoc-api/org/springframework/web/server/ServerWebExchange.html). This lets you match on anything from the HTTP request, such as headers or parameters.

  > whether Routing and Forwarding needs condition judge (Predicate)

- **Filter**: These are instances of [`GatewayFilter`](https://github.com/spring-cloud/spring-cloud-gateway/blob/main/spring-cloud-gateway-server/src/main/java/org/springframework/cloud/gateway/filter/GatewayFilter.java) that have been constructed with a specific factory. Here, you can modify requests and responses before or after sending the downstream request.

  > filter 

**断言是用来匹配的,匹配成功就发送请求,fileter是拦截请求的**

我们可以定义一个过滤器来拦截所有来源IP不在白名单中的请求，或者对所有请求进行日志记录，并根据请求中携带的自定义标记进行不同的服务映射

Whitelist是一组被授权或允许访问的资源或服务的 IP 地址或用户列表

![](https://docs.spring.io/spring-cloud-gateway/reference/_images/spring_cloud_gateway_diagram.png)

Clients make requests to Spring Cloud Gateway. If the Gateway Handler Mapping determines that a request matches a route, it is sent to the Gateway Web Handler. This handler runs the request through a filter chain that is specific to the request. The reason the filters are divided by the dotted line is that filters can run logic both before and after the proxy request is sent. All “pre” filter logic is executed. Then the proxy request is made. After the proxy request is made, the “post” filter logic is run.

URIs defined in routes without a port get default port values of **80 and 443 for the HTTP and HTTPS** URIs, respectively.

https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/request-predicates-factories.html

step1）开启服务注册发现`@EnableDiscoveryClient`

`bootstrap.properties`

```properties
spring.application.name = gulimall-gateway
spring.cloud.nacos.config.server-addr = 127.0.0.1:8848
spring.cloud.nacos.discovery.namespace = d970e33c-b3fa-451c-afb2-e715e8279e67
```

`application.properties`

```yml
spring.application.name=gulimall-gateway
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
server.port= 12000
```

Netty started on port 12000

Query注意这里要 `http://localhost:12000/?url=google` 这里？才是query！才能被perdicate

```yml
spring:
  cloud:
    gateway:
      routes:
        - id: test_route
          uri: https://www.google.com
          predicates:
            - Query=url,google
        - id: baidu_route
          uri: https://www.baidu.com
          predicates:
            - Query=url,baidu
```



# Dubbo

**服务暴露**：服务提供者（Provider）将服务接口暴露出去，并注册到注册中心，注册中心会记录该服务的信息（如 IP、端口）。

**服务引用**：服务消费者（Consumer）从注册中心获取服务地址，并通过 Dubbo 生成的代理类发起 RPC 请求调用服务提供者的方法。

**调用链路**：Dubbo 会根据注册中心的信息、负载均衡策略，将调用请求转发到合适的服务实例，实现了客户端和服务端的解耦。

```java
// 服务接口定义
public interface HelloService {
    String sayHello(String name);
}

// 服务实现
public class HelloServiceImpl implements HelloService {
    public String sayHello(String name) {
        return "Hello " + name;
    }
}
```

```
<!-- 服务提供者的配置 -->
<dubbo:application name="provider-app" />
<dubbo:registry address="zookeeper://localhost:2181" />
<dubbo:protocol name="dubbo" port="20880" />
<dubbo:service interface="com.example.HelloService" ref="helloService" />

<bean id="helloService" class="com.example.HelloServiceImpl" />
```

```
<!-- 服务消费者的配置 -->
<dubbo:application name="consumer-app" />
<dubbo:registry address="zookeeper://localhost:2181" />
<dubbo:reference id="helloService" interface="com.example.HelloService" />

// 使用服务
HelloService helloService = (HelloService) context.getBean("helloService");
String result = helloService.sayHello("Dubbo");
```

# 三级API 1.10



# 品牌管理 1.11

# API属性分类+平台属性 1.12

# 新增商品 1.13

# 仓库管理 1.14

# ES 1.15

# 商品上架 1.16

# 性能压测 1.17

# 缓存 1.18

# 检索服务 1.19

# 异步 1.20

# 商品详情 1.21

