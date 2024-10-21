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

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12568777/1615002771822-1f445dfe-5b23-4ab2-b37c-f60946058944.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_59%2Ctext_RXDmtYHoi48%3D%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fformat%2Cwebp%2Fresize%2Cw_750%2Climit_0)

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
```

