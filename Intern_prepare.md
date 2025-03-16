# 常见的进程间通信方法如下：

- **管道（Pipe）**：匿名管道、命名管道。
- **消息队列**：通过队列传递消息，支持异步通信。
- **共享内存**：高效的内存共享，但需要同步机制。
- **信号量（Semaphore）**：用于进程同步。
- **套接字（Socket）**：支持跨计算机通信，适用于网络应用。
- **信号（Signal）**：用于进程间事件通知。
- **内存映射文件**：通过映射文件进行共享数据。
- **RPC（Remote Procedure Call）**：远程进程调用，适用于分布式系统。
- **事件**：用于同步和协调进程。

# LSM树

LSM 树的主要思想是将数据的写入操作视为追加操作，并且采用一种**分层结构**，通过多个数据结构来优化写入、删除和读取性能。具体来说，LSM 树通常由两个部分组成：

1. **内存表（MemTable）**：一个有序的数据结构，通常是**跳表**（Skip List）或者**红黑树**（Red-Black Tree）。它保存在内存中，当数据写入时，先将数据写入 MemTable。当 MemTable 达到一定大小时，数据会被刷新到磁盘，成为一个新的文件（SSTable 文件）。MemTable 的大小通常会设定为一个合理的上限，一旦超过这个上限，就会将其持久化到磁盘。
2. **磁盘上的 SSTable 文件**：当 MemTable 数据被刷写到磁盘时，它变成一个不可变的有序文件，称为 SSTable 文件。SSTable 文件存储了键值对，并且每个文件都是有序的，可以通过查找索引来高效查询。随着时间的推移，多个 SSTable 文件会被创建，并且通过 **合并（Compaction）** 过程来优化磁盘上的存储。

# 为什么重写 `equals()` 时必须重写 `hashCode()` 方法

如果你重写了 `equals()`，但没有重写 `hashCode()`，就可能会破坏 `HashMap`、`HashSet` 等基于哈希的集合类的工作机制。因为这些集合类依赖于 `hashCode()` 来判断对象的位置。若 `hashCode()` 不一致，可能会导致在这些集合中找不到正确的对象，甚至引发错误的行为

如果两个对象 **相等**（通过 `equals()` 方法判断），那么它们的 **哈希值必须相等**（即 `hashCode()` 方法返回的值必须相同）。

如果两个对象 **哈希值相等**，不代表它们一定相等，但如果它们相等，则哈希值必须相同。

# 静态方法为什么不能调用非静态成员

静态方法属于 **类本身**，它在没有实例化对象的情况下就可以被调用。而非静态成员变量或方法属于 **实例**，它们需要通过具体的对象来访问，因此在静态方法中不能直接访问非静态的成员。静态方法没有 `this` 引用，它无法引用实例的成员。

无对象->static func->non static variable矛盾了，因为这里non static variable需要有对象

## 假设有 1000 个任务进来，核心线程数是 10，救急线程数是 2，阻塞队列的长度是 10，请说明从多少到多少的任务是怎么分配

0-9执行，10-19阻塞队列，20，21救急执行，后面根据拒绝策略拒绝执行

# 网络结构

TCP/IP 四层模型

应用层： 

HTTP，FTP，DNS

SSL/TLS，数据编码加密压缩

管理会话、建立连接，如 RPC

传输层：

端到端通信 TCP,UDP

**网络层**：

负责寻址、路由选择（IP、ICMP）

链路层：

负责 MAC 地址识别、错误检测（Ethernet、Wi-Fi）

负责实际信号传输，如光纤、电缆、无线信号

# 粘包和丢包

#### Packet Stickiness

多个数据包被合并成一个整体发送，接收方在读取时无法正确拆分，导致数据边界错乱。

原因：

* **TCP 是流式协议**，没有消息边界，数据按字节流传输，可能多个小包被合并

* **Nagle 算法**：默认开启时，会合并小数据包以提高传输效率。
* **发送端数据过快**：多次 `send()` 可能导致数据在 TCP 缓冲区合并
* **接收端 `recv()` 读取不完整**：一次读取多个数据包，但未正确解析边界

避免：

* 固定长度协议
* 特殊分割符
* 关掉Nagle，避免小包合并
* 自定义协议（TLV 结构）Type,Length,Value

#### Packet Loss

**数据包在传输过程中未能到达目的地**，导致数据缺失, UDP或 **网络不稳定** 时

#### **丢包的原因**

- **网络拥塞**：路由器缓存满了，丢弃部分数据包。
- **物理链路问题**：Wi-Fi 干扰、信号弱、网络抖动等导致丢包。
- **服务器性能瓶颈**：高并发时，服务器处理不过来导致丢包。
- **UDP 传输特性**：UDP 无重传机制，丢包不会自动补发。

采用 **应用层重传机制**（比如 QUIC 协议）。

使用 **FEC 前向纠错** 技术来补偿丢失的数据包。

# 网络延迟

#### 发送端延迟（Processing Delay）

应用层到传输层

操作系统对数据的处理（如打包 TCP/UDP 数据）。

加密、压缩等操作。

计算机从内存读取数据、传输到网卡的时间。

影响因素：

- 设备 CPU 处理能力。
- 网络协议栈的优化程度。
- 应用程序的处理逻辑。

#### 排队延迟（Queuing Delay）

发生在数据包等待进入传输通道的过程中。

如果网络设备（如路由器、交换机）拥塞，数据包需要排队等待转发。

影响因素：

- 设备的负载情况。
- 网络带宽是否充足。
- 是否发生拥塞控制（如 TCP 拥塞窗口调整）。

#### 传输延迟（Transmission Delay）

**从网卡发送到物理线路**所需的时间

t=数据包大小/带宽

影响因素：

- 链路带宽（如 1Gbps、100Mbps）。
- 数据包大小（包越大，发送时间越长）。
- 采用的编码技术（如 FEC 前向纠错）。

#### 传播延迟（Propagation Delay）

$\text{传播延迟} = \frac{\text{传输距离}}{\text{信号传播速度}}$

比如我连接到港服，物理传播延迟大

#### 处理延迟（Processing Delay）

发生在路由器或交换机上，对数据包进行**解析、查找路由表、转发**的时间

影响因素：

- 设备性能（高端路由器转发快）。
- 路由表的大小（BGP 全网表较大，查找较慢）。
- NAT、QoS、ACL 等额外处理（启用安全策略可能增加延迟）。

**传播延迟和排队延迟**通常是主要影响因素！！！！

# TCP 拥塞控制

TCP Byte Stream没有明确的边界
UDP message数据包作为独立的单元进行传输，有明确边界

控制数据发送速率来避免网络出现过载，保证网络的可靠性和稳定性，避免因为过多的数据导致丢包或连接断开。

- **慢启动**（Slow Start）：初始时发送的数据量非常少，随着网络状况好转逐步增加。
- **拥塞避免**（Congestion Avoidance）：通过增加数据发送量，避免网络发生拥塞。
- **快速重传与快速恢复**（Fast Retransmit & Fast Recovery）：当丢包被检测到时，快速重传数据并恢复连接。

### chmod/ chown

# Inode

 inode 存储了文件的元数据（如文件权限、所有者、文件大小、数据块的位置等），而文件名只是一个指向 inode 的引用

一个 inode 可以有多个文件名指向（即多个hardlink），这些文件名共享相同的 inode

每次创建硬链接时，都会为该文件创建一个新的文件名，但这不会创建新的数据副本，只是增加了对该 inode 的引用计数

# SoftLink & HardLink

**硬链接（Hard Link）**：

- 硬链接是文件系统中的一种机制，通过**不同的文件名指向相同的物理磁盘位置**（即相同的 inode）。

  硬链接是对同一个文件的多个引用

  ```shell
  $ ln file.txt hardlink.txt
  #hardlink.txt 和原文件file.txt连接起来
  rm file.txt
  #hardlink.txt还有效,删除文件磁盘上的 inode 不会立即被删除，当所有指向inode的link都删除后才会被删除！
  ```

  **硬链接和原文件是等效的**，没有原文件和硬链接的区别

- 如果删除原文件，硬链接依然有效，因为它指向的是相同的 inode，数据不会丢失。

- 硬链接不能跨越文件系统，也不能为目录创建硬链接（除非是超级用户）。

**软连接（Symbolic Link 或 Soft Link）**：

- 软连接是一个文件，它包含了另一个文件路径的引用。软连接实际上是一个指向文件的指针。

  存储的是 **目标文件的路径**。软链接实际上就是一个指向原文件的指针

  ```shell
  $ ln -s file.txt softlink.txt
  ```

- 如果原文件删除，软链接会变成一个“悬挂”的链接，即失效。

- 软连接可以跨越文件系统，也可以为目录创建。

快捷方式类似于SoftLink

# Linux查看文件

```shell
cat filename
less filename
head -n 20 filename  # 显示文件的前 20 行
tail -n 20 filename
```

# Linux三大日志

**`/var/log/syslog`**、**`/var/log/auth.log`** 和 **`/var/log/dmesg`**

**`/var/log/syslog`**：

- 记录系统的常规事件和信息，如服务启动、系统事件、程序运行等。
- 是系统中最通用的日志文件之一。

**`/var/log/auth.log`**：

- 记录与用户身份验证相关的事件，如登录、登出、`sudo` 使用情况等。
- 用于安全监控，防止非法登录和权限提升。

**`/var/log/dmesg`**：

- 记录内核环形缓冲区中的消息，如硬件检测、驱动程序加载等。
- 主要用于诊断硬件问题和启动时的内核信息。

# Linux中的swap怎么管理的

**swap（交换分区）** 主要用于在物理内存（RAM）不足时提供额外的虚拟内存。它通过将不常用的数据从 **RAM** 交换到 **磁盘**（swap 分区或 swap 文件），从而释放内存空间，保证系统不会因为内存不足而崩溃。

当物理内存不足时，**Linux 内核** 会将不常用的页面（Page）写入 **swap**，腾出 RAM 空间供活跃的进程使用。

当某些进程需要这些被交换出去的页面时，内核会再将它们从 **swap** 读回内存。

这个过程称为 **“分页换出（swap out）”** 和 **“分页换入（swap in）”**。

# LRU-K

- 介绍一下LRU, 介绍一下其他的置换算法, lru-k 比 lru 好在哪, 说一下这个LRU－k怎么实现的,k怎么选择？依据？ 
- LRU策略的改进版，通过设置回头看的参数K，在淘汰时选择过去K次访问中间隔最大的元素
- 在LRU-K中，系统跟踪每个数据项被访问的最后K次时间。只有当数据项的第K次访问发生时，才将其移到LRU列表的前端。这意味着数据项需要被访问K次才能被视为“热点数据”。
- 相比于普通的LRU，能够更好地应对Sequential Flooding的情况，比如说全表Scan时，很多冷数据都会被充入Cache，这会导致LRU下很多热数据被误淘汰，而在LRU-2下，这些冷数据大概率不会被访问，所以会优先淘汰掉其本身，从而提高热数据的命中率。

# 并发的核心

控制的是多线程or进程对于同一块**内存**空间的控制

# HTTP和UDP区别

传统的 HTTP 使用 **无状态连接**（Stateless）。每一次 HTTP 请求都会**重新建立一个连接**，并在响应完成后立即关闭这个连接

# UDP

不需要`connect()` 直接`sendto()`

**实时通信**（如视频、语音）

**不可靠**：数据可能丢失、乱序，**没有重传机制**

**无状态**：每个 `sendto()` 是独立的，不需要维持连接状态。

# UDP对比TCP的好处

速度快，延迟低

头部8字节，资源占用低

支持广播、多播！TCP只能端对端，但是项目里我只用到了UDP

无状态，支持大量客户端，实时应用、广播、短请求、IoT

# TCP的Process

当 TCP 连接建立后，服务器端会通过以下步骤准备接收客户端的连接

**`socket()`**：**客户端和服务器**都需要先创建一个套接字fd。套接字是用来进行网络通信的基础。

```c++
int sockfd = socket(AF_INET, SOCK_STREAM, 0);  // 创建套接字
```

**`bind()`**：**服务器**将自己的套接字与一个具体的 IP 地址和端口绑定（例如 `8080`）。客户端通常不需要绑定，只需要连接到指定的服务器地址。

```c++
struct sockaddr_in server_addr;
server_addr.sin_family = AF_INET;
server_addr.sin_addr.s_addr = INADDR_ANY; // 绑定所有网络接口
server_addr.sin_port = htons(8080); // 绑定端口 8080

bind(sockfd, (struct sockaddr*)&server_addr, sizeof(server_addr));  // 绑定地址和端口
```

**`listen()`**：服务器告知操作系统它已经准备好接受连接请求，进入监听状态。

**服务器** 执行 `listen()` 之后，会在内核中维护一个 **等待连接队列**，客户端发起连接请求时，会被放入这个队列中，直到服务器接受连接

```c++
listen(sockfd, 5);  // 监听最大队列大小为 5
```

**`accept()`**：当客户端请求连接时，服务器接受连接，并返回一个新的套接字`new_sockfd`，用于后续的通信。

`accept()` 只能由 **服务器** 执行。当服务器调用 `accept()` 时，它会阻塞直到有客户端连接。

```c++
int new_sockfd = accept(sockfd, (struct sockaddr*)&client_addr, &client_len);
```

**`accept()`** 被一个线程调用，用来接收客户端的连接请求

一旦 `accept()` 返回 `new_sockfd`（新的套接字），可以将它交给线程池中的一个线程来处理，避免主线程直接处理所有的客户端连接。(Thread Pool)

这里第一步就是`Pthread_detach(pthread_self())`，**分离线程**，即让线程在执行完后 **自动释放资源**，而不需要调用 `pthread_join()` 来回收它的资源。避免阻塞父线程等待子线程的结束，也就是父线程不用等着调用join了

```c++
// 伪代码：线程池中处理连接
while (true) {
    int new_sockfd = accept(sockfd, (struct sockaddr*)&client_addr, &client_len);
    
    // 将 new_sockfd 交给线程池中的一个线程来处理
    thread_pool.submit(handle_client, new_sockfd);
}
```

客户端和服务器就可以通过 **`send()`** 和 **`recv()`**（或者 `write()` 和 `read()`）来交换数据

# IO 多路复用

**BIO**（Blocking I/O）：即 **阻塞 I/O**

**NIO**（Non-blocking I/O）：即 **非阻塞 I/O**，在 NIO 中，操作（如 `accept()`、`recv()`、`send()`）不会阻塞。通常通过 **IO 多路复用**（如 `select()`、`poll()` 或 `epoll()`）来实现，主线程监听分发，子线程执行

**IO 多路复用**（例如 `select()`、`poll()` 和 `epoll()`）是为了在 **单线程** 中同时处理多个客户端连接的一种技术

NIO如果没有数据可读就返回，但是在读数据的时候子线程还是阻塞的



epoll里ET和LT，默认LT

LT只要**缓冲区中有数据可读**，每次 `epoll_wait()` 调用时都会通知用户程序，即使应用程序没有立即处理数据，下次调用 `epoll_wait()` 时仍然会继续返回事件

有数据未读完，下次调用也会提示，HTTP 服务器

100读了50，下一次调用`epoll_wait()`仍然会继续返回事件

这里`epoll_wait()`返回的是int, `EPOLLIN` 读，`EPOLLOUT`写

**>0**：返回的是就绪事件的数量，表示 `events` 数组中有多少个 `epoll_event` 结构体填充了数据。

**=0**：超时，没有任何事件发生。

**-1**：错误，通常 `errno` 会设置相应错误代码

```java
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);

struct epoll_event {
    uint32_t events;  // 事件类型，例如 EPOLLIN、EPOLLOUT
    epoll_data_t data;  // 关联的数据，通常是 fd
};
```

ET当**状态发生变化时才会触发事件**，也就是说，**只在数据到达（或状态改变）时触发一次**，**必须**立即读完数据，否则下次不会再触发事件

必须使用**非阻塞 I/O**，否则可能导致程序阻塞

`ulimit -n ` 表示一个线程最多能打开的文件描述符（fd）数量，简洁明了影响连接

# RAII 也就是不用手动管理内存

RAII 强调资源的管理应该由对象的生命周期自动控制，**自动控制**！

智能指针（Smart Pointers）算

scoped_lock算c++17的特性，自动管理互斥锁！！避免死锁和忘记释放锁

`unique_lock`、`shared_lock` 等也符合 RAII 原则

new和delete不算！

malloc和free也不算，因为是手动管理的！

# Mutex

普通

 ```c++
 mutex mtx;
 mtx.lock();
 mtx.unlock();
 ```

`lock_guard`

`lock_guard<mutex> lock(mtx)`是RAII，自动加锁解锁

```c++
mutex mtx;
lock_gurad<mutex> lock(mtx);
```

`unique_lock`

允许手动解锁

```c++
mutex mtx;
unique_lock<mutex> lock(mtx);
lock.unlock();
```

`scoped_lock`

解决多个mutex死锁问题

```c++
mutex mtx1,mtx2;
//thread1
lock_gurad<mutex> lock(mtx1);
this_thread::sleep_for(chrono::seconds(2));
lock_gurad<mutex> lock(mtx2);

//thread2
lock_gurad<mutex> lock(mtx2);
this_thread::sleep_for(chrono::seconds(2));
lock_gurad<mutex> lock(mtx1);
```

```c++
scoped_lock<mutex> lock(mtx1,mtx2);
```

# 读写锁的实现

为了保证原子性，要用mutex保护cnt！

```c++
//WLOCK()
P(&mutex)
cnt++;
if(cnt==1){
	P(&W);
}
V(&mutex)

//WUNLOCK()
P(&mutex)
cnt--;
if(cnt==0){
	V(&W);
}
V(&mutex)
```

# ThreadPool实现

Manager分配Worker，首先创建出一堆Threads

首先task来了先放在任务队列buffer里，然后Worker空了按照 FIFO的顺序去做task

```c++
while(1){
	P(&item);
	V(&item);
}
```

![](./Java/threadpool.png)

```c++
//初始化一个buffer
sbuf_init(&buf,SBUFSIZE);
//create NTHREADS threads
for(int i=0;i<NTHREADS;i++){
  Pthread_create(&tud,NULL,thread,NULL);
}
while(1){
  clientlen=sizeof(struct sockaddr_storage);
  connfd=Accept(listenfd,(SA*)&clientaddr,&clientlen);
  subf_insert(&buf,connfd);
}
```

```c++
Pthread_detach(pthread_self());
//就是主进程不需要等待子进程
```



# Mutex原理

mutex是pv操作实现的，pv操作底层原理是把task放至wait list

P相当于获取锁，V相当于解锁

**P（proberen，尝试）操作**：用于**获取资源**（减少信号量的值）。

- 如果资源可用（信号量 > 0），则减少信号量并继续执行。
- 如果资源不可用（信号量 ≤ 0），则将**当前任务（进程/线程）加入等待队列**，阻塞等待资源可用。

**V（verhogen，增加）操作**：用于**释放资源**（增加信号量的值）。

- 增加信号量，并**唤醒等待队列中的任务**（如果有）

PV 操作通常通过**原子操作**（如 `test-and-set`、`compare-and-swap (CAS)`）和 **等待队列（wait list）** 来实现

**信号量（Semaphore）或互斥量（Mutex）数据结构**

- 包含一个**计数值（counter）**，表示当前资源的可用状态。
- 包含一个**等待队列（wait list）**，存放等待获取锁的任务（线程/进程）。

**P 操作（加锁 / wait）**

- 使用 原子操作尝试减少 counter：
  - 若 `counter > 0`，成功获取资源，继续执行。
  - 若 `counter == 0`，将当前任务加入等待队列，并**阻塞**。

**V 操作（解锁 / signal）**

- 增加 counter，如果有任务在等待队列中：
  - **唤醒一个等待的任务**，让其继续执行。

### **上传大文件的协议**

#### **分片上传（Chunked Upload）**：

- 将大文件分割成多个小块（如每块5MB）。
- 使用HTTP协议逐个上传分片。
- 服务器接收分片后合并成完整文件。

#### **改进点：**

- 使用**断点续传**：记录已上传的分片，避免重复上传。
- 使用**WebSocket**或**TCP**协议：适合实时性要求高的场景。
- 使用**FTP**或**SFTP**：适合超大文件传输。

# Websocket

WebSocket 最大连接数 `ulimit -n` 256 每个 WebSocket 连接都会占用一个文件描述符，操作系统会为**每个进程或线程**设置最大可用的文件描述符数量

**一个端口可以建立多个 WebSocket 连接**。WebSocket 协议本质上是基于 TCP 连接的

# JWT

Postman 调试jwt有Authorization可以添加

如何拿到Jwt token 呢，跑post employee login拿到token，然后直接粗暴System.nanoTime()拿到时间差，然后redis benchmark

```shell
redis-benchmark -h localhost -p 6379 -c 100 -n 1000000
#-c并发连接数 100， -n 1,000,000次请求, -n <total_requests>, -c <clients>, -d <data_size>
redis-benchmark -t SET,GET
#只测试 SET 和 GET 命令的性能
```

Bloomfilter redisson的

第一个问题依赖exclusion

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.17.7</version>
    <exclusions>
        <exclusion>
            <artifactId>spring-boot-starter-actuator</artifactId>
            <groupId>org.springframework.boot</groupId>
        </exclusion>
    </exclusions>
</dependency>
```

然后初始化的时候要先把数据加入bloomfilter，这里没有数据就直接返回，问题是如何处理数据修改的问题？感觉如果数据变更得手动改bloomfilter 

* 如果数据量较小且更新频率不高，**重建布隆过滤器** 是一个简单且有效的方法。
* 如果频繁更新数据，使用 **计数布隆过滤器** 或通过 **维护已删除集合** 来标记删除元素是更合适的解决方案。
* 在某些情况下，如果能容忍延迟，使用 **延迟更新** 可以减少对布隆过滤器的频繁操作。

`@PostConstruct`就是在bean建立完后再运行

```java
package com.sky.config;

import com.sky.service.DishService;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RBloomFilter;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.util.List;
@Slf4j
@Configuration
public class BloomFilterConfig {

    private static final String BLOOM_FILTER_KEY = "dish_bloom_filter";

    @Autowired
    private DishService dishService;

    @Autowired
    private RedissonClient redissonClient;

    @Bean
    public RedissonClient redissonClient() {
        Config config = new Config();
        config.useSingleServer().setAddress("redis://127.0.0.1:6379");  // 你的 Redis 地址
        return org.redisson.Redisson.create(config);
    }

    @Bean
    public RBloomFilter<Long> dishBloomFilter() {
        RBloomFilter<Long> bloomFilter = redissonClient.getBloomFilter(BLOOM_FILTER_KEY);
        bloomFilter.tryInit(100000, 0.01);  // 预计存储10万数据，误判率1%
        return bloomFilter;
    }

    /**
     * 初始化布隆过滤器，加载所有有效的 categoryId
     */
    @PostConstruct
    private void initializeBloomFilter() {
        log.info("initializeBloomFilter");
        RBloomFilter<Long> bloomFilter = dishBloomFilter();
        List<Long> categoryIds = dishService.getAllValidCategoryIds();
        for (Long categoryId : categoryIds) {
            bloomFilter.add(categoryId);
        }
    }
}
```



JD

- 扎实的编程能力； 2、熟练掌握C/C++/Java/Go等其中一门开发语言； TCP/UDP网络协议及相关编程、进程间通讯编程； 专业软件知识，包括算法、操作系统、软件工程、设计模式、数据结构、数据库系统、网络安全等。 有一定了解的： 1、Python、Shell、Perl等脚本语言； 2、MySQL及SQL语言、编程； 3、NoSQL, Key-value存储原理。
- 分布式系统设计与开发、负载均衡技术，系统容灾设计，高可用系统等知识； 2、对云原生相关技术有所了解。

# TCP

### **(A) TCP 连接建立（3 次握手）**

| 状态             | 说明                                               | 触发方          |
| ---------------- | -------------------------------------------------- | --------------- |
| **CLOSED**       | 初始状态，连接未建立                               | -               |
| **SYN_SENT**     | 客户端发送 `SYN`，等待服务器响应                   | **客户端**      |
| **SYN_RECEIVED** | 服务器收到 `SYN`，发送 `SYN + ACK`，等待客户端确认 | **服务器**      |
| **ESTABLISHED**  | 连接建立，开始数据传输                             | 客户端 & 服务器 |

### **(B) TCP 连接断开（4 次挥手）**

| 状态           | 说明                                   | 触发方                                |
| -------------- | -------------------------------------- | ------------------------------------- |
| **FIN_WAIT_1** | 发送 `FIN`，等待 `ACK`                 | 关闭连接的 **主动方**（通常是客户端） |
| **CLOSE_WAIT** | 收到 `FIN`，发送 `ACK`，等待应用层关闭 | 被动方（通常是服务器）                |
| **FIN_WAIT_2** | 收到 `ACK`，等待对方 `FIN`             | **主动方**                            |
| **LAST_ACK**   | 发送 `FIN` 后等待 `ACK`                | **被动方**                            |
| **TIME_WAIT**  | 收到 `FIN` 并回复 `ACK`，等待 2×MSL    | **主动方**                            |
| **CLOSED**     | 连接完全关闭                           | 双方                                  |

找TCP连接个数

`netstat -an | grep ESTABLISHED | wc -l`

# Static 贯穿程序始终！！

静态局部变量：第一次使用时初始化

```c++
void foo() {
    static int count = 0;  // 只会初始化一次
    count++;
    std::cout << "Count: " << count << std::endl;
}

int main() {
    foo();  // 输出 Count: 1
    foo();  // 输出 Count: 2
    foo();  // 输出 Count: 3
}
```

静态成员变量：第一次访问时初始化，且需要在类外定义。

```c++
class MyClass {
public:
    static int count;  // 静态成员变量
};

int MyClass::count = 0;  // 类外初始化

int main() {
    std::cout << MyClass::count << std::endl;  // 输出 0
    MyClass::count = 10;
    std::cout << MyClass::count << std::endl;  // 输出 10
}
```

静态全局变量/函数：程序启动时初始化。

```c++
static int globalCount = 10;  // 静态全局变量

static void myFunction() {  // 静态全局函数
    std::cout << "Inside myFunction" << std::endl;
}

int main() {
    std::cout << globalCount << std::endl;  // 输出 10
    myFunction();  // 输出 "Inside myFunction"
}
```



所有 `static` 变量和函数在全局/静态存储区分配，生命周期贯穿程序运行。

局部 `static` 变量

仅在定义它的函数或代码块内可见。

全局 `static` 变量

只在定义它的文件内可见

```c++
#include <iostream>
class MyClass {
public:
    static int counter; // 静态成员变量声明
    MyClass() { counter++; }
};
int MyClass::counter = 0; // 静态成员变量定义和初始化

int main() {
    MyClass obj1, obj2;
    std::cout << "Counter: " << MyClass::counter << std::endl; // 输出 Counter: 2
    return 0;
}
```

```c++
#include <iostream>
class MyClass {
public:
    static void print() {
        std::cout << "Static function called!" << std::endl;
    }
};

int main() {
    MyClass::print(); // 静态成员函数调用
    return 0;
}
```

# Virtual

# lvalue rvalue

左值表示**“具有确定地址，可以被引用和修改的对象”**，即**存在于内存中，可以通过名字或指针访问**。

- 左值具有持久的存储地址。
- 左值可以出现在赋值表达式的左侧（因此得名“左值”）。
- 通常是一个**命名变量**或可以被取地址的表达式。

右值表示**“没有明确存储地址的临时值或不可修改的值”**，即它**只能用于赋值表达式的右侧**或传递给函数调用。

- 右值是临时的，通常没有持久的存储地址。
- 右值不能取地址。
- 右值通常包括**字面值常量**、临时对象、表达式的计算结果。

# lvalue &, rvalue &&

右值引用用于绑定右值（即临时对象或字面量）。

引入于 C++11，用于优化性能，尤其是资源的转移操作（如移动语义）。

右值引用可以延长右值的生命周期。

右值引用无法绑定左值

```
#include <iostream>
int main() {
    int&& rref = 42;  // 右值引用绑定到字面量
    std::cout << rref << std::endl; // 输出: 42

    rref = 50;        // 修改右值引用的值
    std::cout << rref << std::endl; // 输出: 50
    return 0;
}
```

# std::move

和forward一样，都是执行cast的函数，主要把实参转为右值

```go
std::unique_ptr<int> p1 = std::make_unique<int>(10);
std::unique_ptr<int> p2 = std::move(p1);
```

# std::forward

`std::forward` 用于完美转发（Perfect Forwarding），即在模板中将一个参数的原始值类别（左值/右值）保持不变地传递给其他函数。



# LP

#### Customer Obsession

客户角度出发解决问题

#### Ownership

不是我的工作也愿意dive in

#### Are Right, A Lot

incomplete information做决策

#### Bias for Action

了解风险快速行动，solution是reversible的 take action, move fast

#### Think Big

create something new, start from small, divide and conquer

#### Invent and Simplify

做long term的gain driven， 创新+collaborate简化

#### Learn and Be Curious

持续学习

#### Dive Deep

复杂系统debug，控制变量，make assumption

#### Insist on the Highest Standards

大问题拆小achieve challenging goal

#### Earn Trust

#### Deliver Results

#### Strive to be Earth’s Best Employer

#### Success and Scale Bring Broad Responsibility

#### Have Backbone; Disagree and Commit

#### Frugality

#### Hire and Develop the Best

# RegEx

**正则表达式 ^(.).\*\\1$**

​	1.	^: 匹配字符串的开头。

​	2.	(.): 捕获一个字符，并将其存入一个捕获组（捕获组编号为 1）。

​	3.	.*: 匹配任意数量的任意字符（可以为空）。

​	4.	\\1: 匹配第一个捕获组（即第一个字符）。

	5.	$: 匹配字符串的结尾。



# Shuffle

#### Fisher-Yates

```c++
for(int i=0;i<n;i++){
	int j=rand()%(nums.size()-i)+i;
	swap(nums[j],nums[i]);
}
```



```c++
class Solution {
public:
    vector<int> nums;
    vector<int> original;
    Solution(vector<int>& nums){
        this->nums=nums;
        this->original.resize(nums.size());
        copy(nums.begin(),nums.end(),original.begin());
    }
    
    vector<int> reset() {
        copy(original.begin(),original.end(),nums.begin());
        return nums;
    }
    
    vector<int> shuffle() {
        for(int i=0;i<nums.size();i++){
            int j=i+rand()%(nums.size()-i);
            swap(nums[j],nums[i]);
        }
        return nums;
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(nums);
 * vector<int> param_1 = obj->reset();
 * vector<int> param_2 = obj->shuffle();
 */
```

# Isstringstream

```c++
std::string text = "Split this string by spaces";
std::istringstream stream(text);
std::string word;
while (stream >> word) {
    
}

```

# Regex

```c++
'.' //任意
'*' //前0-n个
'\d' digital
'\w' a-zA-Z0-9_
'\s' space
  
std::regex_search(test, pattern)
std::regex_match(test, pattern)
std::regex pattern("hackerrank");
std::string test = "I love hackerrank!";
std::string result = std::regex_replace(test, pattern, "coding");
```

# Random

https://leetcode.cn/problems/implement-rand10-using-rand7/description/

Rand10()->Rand7()

``` c++
int num=rand10();
while(1){
  	if(num>7){
      num=rand10();
    }else{
      return num;
    }
}
```

Rand7()->Rand10()

```c++
//(randX()-1)*X+randX()
//(randX()-1)*X range from 0,X,....X*(X-1)
//(randX()-1)*X+randX() range from 1-X^2
class Solution {
public:
    int rand10() {
        int n=(rand7()-1)*7+rand7();
        while(1){
            if(n<=40){
                return n%10+1;
            }
            n=(rand7()-1)*7+rand7();
        }
    }
};
```

# Research

nerf+diffusion

# ProxyLab

**RIO**：直接将数据读入程序自定义的缓冲区，**无用户态缓冲区**，系统调用次数多。

**标准 I/O**：数据先写入标准库提供的缓冲区，然后再传入程序缓冲区，**减少系统调用次数**，适合小数据操作。

rio_readlineb cannot read binary file, because binary file in Maxos or Linux have 0xa for `\n` and it marks EOF for rio_readlineb

http ends with `\r\n`

**HTTP** 是 **text-based（基于文本）** 的协议，而不是 **binary-based（基于二进制）**

ps aux 是一个命令，用于显示当前系统中所有正在运行的**进程信息**

URL static直接转发，Dynamic URL要处理，代理服务器可以对 URL 进行**重写（rewrite）**、**重定向（redirect）** 或添加参数。适用于需要**灵活处理 URL** 的场景，比如负载均衡、API 网关、URL 映射和规则匹配

```
client -> proxy
GET http://www.cmu.edu/hub/index.html HTTP/1.1

proxy -> server
GET /hub/index.html HTTP/1.1
Host: http://www.cmu.edu
Connection: close
Proxy-Connection: close
```

<img src="/Users/chenhaoyang/Library/Application Support/typora-user-images/image-20241217013700648.png" alt="image-20241217013700648" style="zoom:50%;" />

### Concurrent

create thread pool

```c++
void* targetFunc(void* argvp){
    pthread_detach(pthread_self()); //no need to wait for master thread

    while(1){
        ClientInfo info = sm.removeFd();
        handleRequest(info);
        close(info.fd);
    }
}
//create a thread pool like in java
pthread_t tid;
for(int i = 0; i < NUM_THREAD; i++){
    pthread_create(&tid, NULL, targetFunc, NULL); //args
}
```

### Cache

LRU hashmap+linkedlist

LFU freqmap+hashmap(int,linkedlist)

# Database

latch 和lock

**Latch**:

​	•	用于短期的、轻量级的同步操作，通常用于内存数据结构保护。

​	•	没有事务语义和复杂的死锁检测逻辑。

**Lock**:

​	•	用于长期的、复杂的同步操作，特别是在事务管理中。

​	•	支持事务隔离级别、多种锁模式和死锁检测。

```c++
void accessNode(Node* node) {
    latch.acquire(); // 加锁
    // 访问节点
    latch.release(); // 解锁
}
```

latch crabbing。顾名思义，就像螃蟹一样，移动一只脚，放下，移动另一只脚，再放下。基本思想是： 1. 先锁住 parent page， 2. 再锁住 child page， 3. 假设 child page 是*安全*的，则释放 parent page 的锁。*安全*指当前 page 在当前操作下一定不会发生 split/steal/merge。同时，*安全*对不同操作的定义是不同的，Search 时，任何节点都安全；Insert 时，判断 max size；Delete 时，判断 min size。

### Search

Search 时，从 root page 开始，先给 parent 上读锁，再给 child page 上读锁，然后释放 parent page 的锁。如此向下递归。

RLatch

### Insert

Insert 时，从 root page 开始，先给 parent 上**写锁**，再给 child page 上**写锁**。假如 child page 安全，则释放所有祖先的锁；否则不释放锁，继续向下递归。在 child page 不安全时，需要持续持有祖先的写锁。并在出现安全的 child page 后，释放所有祖先写锁。并且用transaction来记录哪些page持有锁，并且为后面的dead lock detection起作用

WLatch

### Delete

和 Insert 基本一样。仅是判断是否安全的方法不同（检测 min size）。需要另外注意的是，当需要 steal/merge sibling 时，也需要对 sibling 加锁。**并在完成 steal/merge 后马上释放**。这里是为了避免其他线程正在对 sibling 进行 Search/Insert 操作，从而发生 data race。这里的加锁就不需要在 transaction 里记录了，只是临时使用。

和insert类似，先WLatch向下遍历，如果需要修改就升级为写锁，如果父节点需要合并，就对父节点和他兄弟节点进行加锁

### Optimization

在 Insert/Delete 操作中，我们可以先乐观地认为不会发生 split/steal/merge，对沿途的节点上读锁，并及时释放，对 leaf page 上写锁。当发现操作对 leaf page 确实不会造成 split/steal/merge 时，可以直接完成操作。当发现操作会使 leaf page split/steal/merge 时，则放弃所有持有的锁，从 root page 开始重新悲观地进行这次操作，即沿途上写锁。

# Backend

JWT

1. **用户认证**:

​	•	客户端登录后，服务器签发一个 JWT，**客户端每次请求时将 JWT 附在请求头中**。

​	•	服务器通过验证 JWT 来识别用户。

2. **信息交换**:

​	•	JWT 可以在多个服务之间传递经过验证的数据，避免频繁查询数据库。

#### Inspector

jwtTokenAdminiInterceptor 拦截器，也就是要校验jwt token

#### Structure

```
src/main/java
  └── com.example.project
      ├── controller     // 控制器层
      │    └── EmployeeController.java
      ├── service        // 服务层
      │    ├── EmployeeService.java       // 接口
      │    └── EmployeeServiceImpl.java   // 接口实现类
      ├── repository     // 数据访问层
      │    └── EmployeeRepository.java
      ├── model          // 实体类（Domain/Entity）
      │    └── Employee.java
      ├── dto            // 数据传输对象（可选）
      │    └── EmployeeDTO.java
      └── Application.java // 启动类
```

Controller 控制层，控制Service服务层，这里Service里有接口和Impl实现累，还有封装的DTO

#### DAO

DAO（Data Access Object）层是应用程序中的一个逻辑层，负责与数据库进行交互。它封装了对数据源的访问逻辑，并提供了操作数据库的接口（如增删改查）。DAO 层是典型的 **分层架构** 中的一部分，专注于数据持久化操作。

#### IOC

将对象之间的相互依赖关系交给 IoC 容器来管理，并由 IoC 容器完成对象的注入。这样可以很大程度上简化应用的开发，把应用从复杂的依赖关系中解放出来。 IoC 容器就像是一个工厂一样，当我们需要创建一个对象的时候，只需要配置好配置文件/注解即可，完全不用考虑对象是如何被创建出来的。

一个 Service 类可能依赖了很多其他的类，假如我们需要实例化这个 Service，你可能要每次都要搞清这个 Service 所有底层类的构造函数，这可能会把人逼疯。如果利用 IoC 的话，你只需要配置好，然后在需要的地方引用就行了，这大大增加了项目的可维护性且降低了开发难度

@Autowire

#### BaseContext

通过 BaseContext.getCurrentId()上下文获得当前用户ID

#### Bean

Bean 代指的就是那些被 IoC 容器所管理的对象

`@Component`：通用的注解，可标注任意类为 `Spring` 组件。如果一个 Bean 不知道属于哪个层，可以使用`@Component` 注解标注。

`@Repository` : 对应**持久层即 Dao** 层，主要用**于数据库相**关操作。

`@Service` : 对应服务层，主要涉及一些复杂的逻辑，需要用到 **Dao** 层。

`@Controller` : 对应 Spring MVC 控制层，主要用于接受用户请求并调用 `Service` 层返回数据给前端页面

#### 分页查询

`PageHelper.startPage()`  page number, page size

```
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

这个是动态SQL

# Raft

MapReduce no heartbeat, 当worker callfortask, check the local task list, 检测是否所有任务完成或者超时，出现超时就重新分配任务，这里worker完成任务就是不断call for task

kv server put和get都说幂等操作，append就是查看requestID如果小于server本地id就返回最新值，如果大于就操作更新

raft：

![raft-figure2](https://tonixwd.github.io/images/raft-figure2.png)

#### election

- 正常运行
  `Leader`不断发送心跳函数给`Follower`, `Follower`回复, 这个心跳是通过`AppendEntries RPC`实现的, 只不过其中`entries[]`是空的。
- 选举
  1. 当指定的心跳间隔到期时， `Follower`转化为`Candidate`并开始进行投票选举, 会为自己投票并自增`term`
  2. 每一个收到投票请求的`Server`(即包括了`Follower`, `Candidate`或旧的`Leader`), 判断其`RPC`的参数是否符合`Figure2`中的要求, 符合则投票
  3. 除非遇到了轮次更靠后的投票申请, 否则投过票的`Server`不会再进行投票
  4. 超过一半的`Server`的投票将选举出新的`Leader`, 新的`Leader`通过心跳`AppendEntries RPC`宣告自己的存在, 收到心跳的`Server`更新自己的状态
  5. 若超时时间内无新的`Leader`产生, 再进行下一轮投票, 为了避免这种情况, 应当给不同`Server`的投票超时设定随机值

#### log

- **`leader`视角**

1. `client`想集群的一个节点发送的命令, 如果不是`leader`, `follower`会通过心跳得知`leader`并返回给`client`
2. `leader`收到了命令, 将其构造为一个日志项, 添加当前节点的`currentTerm`为日志项的`Term`, 并将其追加到自己的`log`中
3. `leader`发送`AppendEntries RPC`将`log`复制到所有的节点, `AppendEntries RPC`需要增加`PrevLogIndex`、`PrevLogTerm`以供`follower`校验, 其中`PrevLogIndex`、`PrevLogTerm`由`nextIndex`确定
4. 如果`RPC`返回了成功, 则更新`matchIndex`和`nextIndex`, 同时寻找一个满足过半的`matchIndex[i] >= N`的索引位置`N`, 将其更新为自己的`commitIndex`, 并提交直到`commitIndex`部分的日志项
5. 如果`RPC`返回了失败, 且伴随的的`Term`更大, 表示自己已经不是`leader`了, 将自身的角色转换为`Follower`, 并更新`currentTerm`和`votedFor`, 重启计时器
6. 如果`RPC`返回了失败, 且伴随的的`Term`和自己的`currentTerm`相同, 将`nextIndex`自减再重试

- **`follower`视角**

1. `follower`收到`AppendEntries RPC`后,`currentTerm`不匹配直接告知更新的`Term`, 并返回`false`
2. `follower`收到`AppendEntries RPC`后, 通过`PrevLogIndex`、`PrevLogTerm`可以判断出”`leader`认为自己`log`的结尾位置”是否存在并且`Term`匹配, 如果不匹配, 返回`false`并不执行操作;
3. 如果上述位置的信息匹配, 则需要判断插入位置是否有旧的日志项, 如果有, 则向后将`log`中冲突的内容清除
4. 将`RPC`中的日志项追加到`log`中
5. 根据`RPC`的传入参数更新`commitIndex`, 并提交直到`commitIndex`部分的日志项

#### 持久化

而`Raft`的日志恢复的目的是, 将`Leader`的日志强行复制到其他节点

**`Leader`维护的变量**

- `nextIndex[]`: `Leader`认为下一个追加的日志在每个节点的索引
- `matchIndex[]`: `Leader`认为每个节点中已经复制的日志项的最高索引

快速恢复

在之前**日志恢复**的介绍中, 如果有`Follower`的日志不匹配, 每次`RPC`中, `Leader`会将其`nextIndex`自减1来重试, 但其在某些情况下会导致效率很低(说的就是`Lab2`的测例)

**`Follower`返回更多信息给`Leader`，使其可以以`Term`为单位来回退**

持久化就是定期存到disk里，这里持久化的内容只包括: `votedFor`, `currentTerm`, `log`，可以通过这些恢复出全部的内容包括worker state等

#### snapshot

![image-20241218093928770](/Users/chenhaoyang/Library/Application Support/typora-user-images/image-20241218093928770.png)

# File system



# C++ 11/14/20 version difference

### C++11 

auto/Lambda/smart pointer (unique_ptr,shared_ptr)

##### smart ptr

```
std::unique_ptr<int> uptr = std::make_unique<int>(10);//make_unique c++14?
```

##### **移动语义和** rvalue **引用**

```
std::vector<int> v = {1, 2, 3};
std::vector<int> v2 = std::move(v); // v 的资源被移动到 v2
```

##### Lambda

```
auto add = [](int a, int b) { return a + b; };
```

##### constexptr

允许编译期计算常量表达式。

```
constexpr int square(int x) { return x * x; }
constexpr int result = square(5); // 在编译时计算
```

##### std::thread **和多线程库**

```
std::thread t([]() { std::cout << "Hello from thread\n"; });
t.join();
```

### **C++17**

##### **结构化绑定（Structured Bindings）**

```
std::pair<int, int> p = {1, 2};
auto [x, y] = p; // x = 1, y = 2
```

##### if **和** switch **带初始化**

```
if (auto it = m.find(key); it != m.end()) {
    std::cout << it->second;
}
```

##### std::optional

```
std::optional<int> x = 10;
if (x) std::cout << *x;
x.value_or(-1);
```

##### variant

```
std::variant<int, double> v = 3.14;
```

##### reduce

并行算法库中的函数，支持并行数据处理。

```c++
#include <numeric>
#include <execution>
std::vector<int> v = {1, 2, 3, 4};
int sum = std::reduce(std::execution::par, v.begin(), v.end(), 0);

auto sum = std::reduce(data.begin(), data.end(), 0);
auto product = std::reduce(data.begin(), data.end(), 1,std::multiplies<>{});
```

### C++20

##### std::ranges  std::views

范围操作

```c++
#include <iostream>
#include <vector>
#include <ranges>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6};
		std::ranges::sort(v, [](int a, int b) { return a < b; });
    // 使用 views::filter 过滤偶数，views::transform 将偶数加倍
    auto result = v | std::views::filter([](int n) { return n % 2 == 0; })
                    | std::views::transform([](int n) { return n * 2; });

    for (int x : result) {
        std::cout << x << " "; // 输出 4 8 12
    }
    std::cout << std::endl;

    return 0;
}
```

##### string_view

std::string_view 不会拷贝字符串数据，而是直接引用原字符串。比传递 std::string 更高效，适用于只读操作。

string_view 只是字符串的一个视图，如果原字符串销毁了，string_view 将变为悬空指针。





brute_force

recursion

Memoized search

delete删除对象，构析函数 （new）

free malloc

当一个指针通过 free（或者 delete）释放了所指向的内存后，**指针本身并不会被置为** NULL。这意味着它仍然保存着原来的地址，但该地址所指向的内存已经被释放，成为不可访问的状态。

此时，这个指针就变成了**野指针**（Dangling Pointer），**如果继续使用这个指针（如读取或写入数据），将导致未定义行为**

# free delete

malloc free (heap)

new delete (heap)

when u delete a pointer, then pointer still point to the same address, but the the content of this address is released! null pointer

become a wild pointer

so we need to 

```c++
delete ptr;
ptr=nullptr;//To avoid dangling pointer issues, assign NULL after freeing
```

# 设计模式

## Singleton Pattern

确保一个类只有一个实例，并提供对该实例的全局访问点

避免多个实例引发的问题，确保全局状态或共享资源（例如日志系统、数据库连接等）的唯一性

**私有构造函数**：防止外部类直接实例化该类。

**静态方法**：提供获取唯一实例的方法。

**私有静态变量**：存储该类的唯一实例。

懒加载（Lazy Initialization），即当第一次调用时才创建对象

```java
public class Singleton {
    // Private static instance variable
    private static Singleton instance;

    // Private constructor to prevent instantiation
    private Singleton() {
        // Initialization code
    }

    // Public static method to provide access to the instance
    public static Singleton getInstance() {
        if (instance == null) {
            // Create the instance if it doesn't exist
            instance = new Singleton();
        }
        return instance;
    }

    // Example method
    public void showMessage() {
        System.out.println("Message from the Singleton instance!");
    }
}

// Usage in the main class
public class Main {
    public static void main(String[] args) {
        // Get the Singleton instance
        Singleton singleton = Singleton.getInstance();

        // Call the method on the instance
        singleton.showMessage();
    }
}
```

```c++
class A{
public: 
    static A *getInstance(){
        static A instance;// static global variable is lazy initialization! only create one instance!
        return &instance;
    }
private:
    A(){}
    ~A(){}
    
}
```

on heap need manual release

双检查->

![](./assert/single.png)



## 策略模式

## 责任模式

## 组合模式

## 观察者模式

## 模板方法

# Overload

# virtual overriding

**有 `virtual` 关键字**：方法调用是基于对象的动态类型（即**实际对象的类型**），在运行时决定调用哪个方法。这种机制称为动态绑定（runtime binding）或后期绑定（late binding）

**没有 `virtual` 关键字**：方法调用是基于对象的静态类型（即**指针或引用的声明类型**），在编译时决定调用哪个方法。这种机制称为静态绑定（static binding）或早期绑定（early binding）。

````c++
#include <iostream>

class Animal_v {
public:
    virtual void makeSound() {
        std::cout << "Animal sound" << std::endl;
    }
};

class Animal_nv {
public:
    void makeSound() {
        std::cout << "Animal sound" << std::endl;
    }
};

class Dog : public Animal_v, public Animal_nv {
public:
    void makeSound() override {
        std::cout << "Dog barks" << std::endl;
    }
};

int main() {
    Animal_v* a = new Dog();
    Animal_nv* b = new Dog();
    a->makeSound(); // 输出 "Dog barks"
    b->makeSound(); // 输出 "Animal sound"

    delete a; // 只需删除一次，指向相同对象
    delete b; // 只需删除一次，指向相同对象
    return 0;
}
````

# Free

free 一个指针,这个指针还是指向原地! 不是NULL!

最好设置为nullptr!

```c++
std::free(ptr);

// 这里 ptr 仍然指向之前分配的地址，但该地址的内存已经被释放
// ptr 现在是一个野指针

// 为了避免使用野指针，应该将其设为 nullptr
ptr = nullptr;
```

如果尝试对同一个指针调用`free`函数两次，将会导致未定义行为（undefined behavior）。未定义行为可能导致程序崩溃、数据损坏或其他意外的问题。

为了防止这种情况的发生，一个常见的做法是在调用`free`之后立即将指针设置为`nullptr`。这样可以确保再次调用`free`时不会出问题，因为对`nullptr`调用`free`是安全的，不会产生任何副作用。

# size_t

`size_t` 被设计为足够大，以便能够容纳系统中最大可能的对象大小。因此，它的大小通常会与系统的地址空间大小相关。在许多现代系统上，`size_t` 的大小通常与 `unsigned long` 或 `unsigned long long` 相似，但并不总是相同的。

# Malloc (linkedlist)

进程间通信方式

* shared memory
* message passing
  * kernel (user->kernel)

```txt
stack 2^32-1
heap
data
code
null 0
```

heap往上增长,stack往下增长,stack碰到heap就是stack overflow? stack frame里的guard呢?

sbrk(0) 返回的是heap top的位置,是堆顶的位置!

```c++
void * malloc(size_t size); //first fit, best fit
void free(void *ptr);	//meta-data

void *p=sbrk(size);
if(p==(void*)-1){
	return false;
}
```

### meta-data

````c++
typedef struct _Node{
	struct _Node *prev;
	struct _Node *next;
	size_t size;
}Node;
#define META_SIZE sizeof(Node)
````

然后是size大小的空间

free的话里面有个freelist, 这里的链表结构存储的是free的空间!

# Shell

- `$@`：表示规则中的目标文件名。
- `$<`：表示规则中的第一个依赖文件名。
- `$^`：表示规则中的所有依赖文件名，以空格分隔。
- `$?`：表示规则中新于目标文件的所有依赖文件名，以空格分隔。
- `$*`：表示规则中的模式匹配部分。

```shell
grep -v '^$' 1.txt
```

这里的`^$`是一个正则表达式，表示匹配空行。`^`表示行的开始，`$`表示行的结束，两者之间没有任何字符，所以匹配空行。`-v`选项表示输出不匹配该模式的行，即过滤掉匹配模式的行。

# SQL

```c++
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';: 显示 InnoDB 缓冲池大小，这是 InnoDB 存储引擎使用的内存池。

SHOW VARIABLES LIKE 'query_cache_size';: 显示查询缓存的大小，如果启用了查询缓存的话。

SHOW STATUS LIKE 'Qcache%';: 显示与查询缓存相关的状态信息，包括查询缓存命中率等。

SHOW STATUS LIKE 'Threads_connected';: 显示当前连接到服务器的线程数。

SHOW STATUS LIKE 'Threads_running';: 显示当前正在运行的线程数。

SHOW STATUS LIKE 'Threads_cached';: 显示当前缓存的线程数。
```

# String Hash & Rabin-Karp

```c++
typedef unsigned long long ULL;
ULL PRIME=131;
```

```c++
class Solution {
public:
    unsigned long long PRIME = 31;
    int find(string s,int mid){
        uint64_t p=1;
        uint64_t d=0;
        for(int i=0;i<mid;i++){
            d=d*PRIME+s[i]-'a';
            p*=PRIME;
        }
        unordered_set<uint64_t> ss;
        ss.insert(d);
        for(int i=mid;i<s.length();i++){
            d=d*PRIME+s[i]-'a'-p*(s[i-mid]-'a');
            if(ss.count(d)!=0){
                return i;
            }
            ss.insert(d);
        }
        return -1;
    }
    string longestDupSubstring(string s) {
        int l=0,r=s.length()-1;
        int pos=-1;
        int len=0;
        while(l<r){
            int mid=(l+r+1)/2;
            int res=find(s,mid);
            if(res==0){
                r=mid-1;
            }else {
                pos=l;
                l=mid;
                len=mid;
            }
        }
        if(pos==-1) return "";
        return s.substr(pos+1,len);
    }
};
```

# C++

### 强制类型转换

### `static_cast<type>(expression)`

- **用途**：用于非多态类型的转换。可以用来转换基础数据类型（如int转float，或指针类型之间的转换，只要不涉及底层const的转换）。
- **例子**：`int a = 10; float b = static_cast<float>(a);`

### 2. `dynamic_cast<type>(expression)`

- **用途**：主要用于处理多态性，安全地将基类指针或引用转换为派生类指针或引用，而且在转换不成功时能够检测到。
- **例子**：`Base* b = new Derived(); Derived* d = dynamic_cast<Derived*>(b);`
- **注意**：`dynamic_cast`要求基类有虚函数，因为它使用运行时类型信息（RTTI）来检查转换的安全性。

### 3. `const_cast<type>(expression)`

- **用途**：用于修改类型的const或volatile属性。最常用于去除指针或引用的const属性。
- **例子**：`const int a = 10; int* b = const_cast<int*>(&a);`

### 4. `reinterpret_cast<type>(expression)`

- **用途**：提供低级别的重新解释转换，几乎可以进行任何指针、整型之间的转换。但使用时需非常小心，因为它可能导致平台依赖的代码。
- **例子**：`int* a = new int(65); char* b = reinterpret_cast<char*>(a);`

hash底层std::vector\<std::list\<int>> table; 

map->RBT

智能指针: .get()

```c++
#include<bits/stdc++.h>
std::copy(src.begin(),src.end(),target.begin());//target cap must larger than src!! else error!
std::copy(src.begin(), src.end(), std::back_inserter(dest));//recommand!

std::vector<int> src = {1, 2, 3, 4, 5};
std::vector<int> dest(10); // 假设dest已经被一些方式填充了
//if dest has reserve cap, and fill from back
std::copy_backward(src.begin(), src.end(), dest.end());//fill the last 5 elements!

std::move(src.begin(), src.end(), dest.begin());//Attention!! use this must reserve place!! or segment fault!
std::move(src.begin(), src.end(), std::back_inserter(dest));
std::move_backward(src.begin(), src.end(), dest.end());//move content to dest

std::advance(it,j);// move iterator it forward j step, j can be positive or negative!
```

# Trie Tree

```c++
struct Node{
    Node *child[26]{};
    int min_l=INT_MAX,i;
};

class Solution {
public:
    vector<int> stringIndices(vector<string>& wordsContainer, vector<string>& wordsQuery) {
        Node *root=new Node();
        for(int idx=0;idx<wordsContainer.size();idx++){
            auto &s=wordsContainer[idx];
            int l=s.length();
            auto cur=root;
            if(cur->min_l>l){
                cur->min_l=l;
                cur->i=idx;
            }
            for(int i=s.length()-1;i>=0;i--){
                int b=s[i]-'a';
                if(cur->child[b]==nullptr){
                    cur->child[b]=new Node();
                }
                cur=cur->child[b];
                if(l<cur->min_l){
                    cur->min_l=l;
                    cur->i=idx;
                }
            }
        }
        vector<int> ans;
        for(auto &s:wordsQuery){
            auto cur=root;
            for(int i=s.length()-1;i>=0&&cur->child[s[i]-'a'];i--){
                cur=cur->child[s[i]-'a'];
            }
            ans.push_back(cur->i);
        }
        return ans;
    }
};
```

```c++
class Trie {
private:
    vector<Trie*> children;
    bool isEnd;

    Trie* searchPrefix(string prefix) {
        Trie* node = this;
        for (char ch : prefix) {
            ch -= 'a';
            if (node->children[ch] == nullptr) {
                return nullptr;
            }
            node = node->children[ch];
        }
        return node;
    }

public:
    Trie() : children(26), isEnd(false) {}

    void insert(string word) {
        Trie* node = this;
        for (char ch : word) {
            ch -= 'a';
            if (node->children[ch] == nullptr) {
                node->children[ch] = new Trie();
            }
            node = node->children[ch];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        Trie* node = this->searchPrefix(word);
        return node != nullptr && node->isEnd;
    }

    bool startsWith(string prefix) {
        return this->searchPrefix(prefix) != nullptr;
    }
};
```

# BRT OlogN

* Search O(logN), worst O(logN)
* Insert O(1), worst O(logN)
* Delete O(1), worst O(logN)

#### Python

```python
from sortedcontainers import SortedList
sl=SortedList()
sl.remove(cnt)
sl.add(cnt)
sl[-1] #max element
```

Python 默认minheap

存负数来实现maxheap！

```python
h=[]
heappush(h,-(num,x))
heappop(h)

#h[0][0],h[0][1] is top of the heap!
```

```go
class MyClass:
    __slots__ = ['name', 'description']
    
    def __init__(self, name, description):
        self.name = name
        self.description = description

obj = MyClass('example', 'This is an example.')
```

`__slots__`的使用是一个相对高级的特性，主要用于优化程序。当你在一个类中定义`__slots__`变量时，它会告诉Python不要使用普通的字典来保存该类的实例属性，而是为实例分配一个固定大小的数组来保存这些属性。

减少内存使用，加快访问速度

#### Java

```java
Map<Integer, Long> cnt = new HashMap<>();
TreeMap<Long, Integer> m = new TreeMap<>();
m.containsKey(num);
m.merge(num, -1, Integer::sum) == 0
m.remove(num);
m.lastKey();
```

#### Go

```go
t:=redblacktree.New[int,int]()
t.GetNode(cnt[x])
t.Remove(node.Key)
t.Put(cnt[x], 1)
int64(t.Right().Key)
```

#### C++

RBT -> set

```c++
multiset<long long> f;
auto it=f.find(num);
if(it!=f.end()){
    f.erase(it);
}
f.insert(num);
*f.rbegin();

std::for_each(f.begin(),f.end(),[](const int &element){
    std::cout<<element<<" ";
})
```

## 懒删除堆??

就是不改变，如果heap顶部和真实值不一样，就不断删除！

# LRU

# LFU

freq_table存的是freq, Node list

freq_table存的是key, Node list iterator

```c++
struct Node{
    int key_,val_,freq_;
    Node(int key,int value,int freq):key_(key),val_(value),freq_(freq){}
};
class LFUCache {
    unordered_map<int,list<Node>::iterator> key_table;
    unordered_map<int,list<Node>> freq_table;
    int minfreq{},capacity{};
public:
    LFUCache(int capacity):minfreq(0),capacity(capacity) {
        key_table.clear();
        freq_table.clear();
    }
    
    int get(int key) {
        if(capacity==0) return -1;
        if(key_table.find(key)==key_table.end()) return -1;
        int val=(*key_table[key]).val_;
        int freq=(*key_table[key]).freq_;
        freq_table[freq].erase(key_table[key]);
        if(freq_table[freq].size()==0){
            freq_table.erase(freq);
            if(minfreq==freq) minfreq+=1;
        }
        freq_table[freq+1].push_front(Node(key,val,freq+1));
        key_table[key]=freq_table[freq+1].begin();
        return val;
    }
    
    void put(int key, int value) {
        if(capacity==0) return;
        if(key_table.find(key)==key_table.end()){
            if(key_table.size()==capacity){
                auto it=freq_table[minfreq].back();
                key_table.erase(it.key_);
                freq_table[minfreq].pop_back();
                if(freq_table[minfreq].size()==0){
                    freq_table.erase(minfreq);
                }
            }
            freq_table[1].push_front(Node(key,value,1));
            key_table[key]=freq_table[1].begin();
            minfreq=1;
        }
        else{
            auto node=key_table[key];
            int freq=(*node).freq_;
            freq_table[freq].erase(node);
            if(freq_table[freq].size()==0){
                freq_table.erase(freq);
                if(minfreq==freq)
                    minfreq+=1;
            }
            freq_table[freq+1].push_front(Node(key,value,freq+1));
            key_table[key]=freq_table[freq+1].begin();
        }
    }
};
```

# Dijkstra

```c++
class Graph {
public:
    vector<vector<int>> g;
    Graph(int n, vector<vector<int>>& edges) :g(n, vector<int>(n, INT_MAX / 2)){
        for(auto &edge:edges){
            g[edge[0]][edge[1]]=edge[2];
        }
    }
    
    void addEdge(vector<int> edge) {
        g[edge[0]][edge[1]]=edge[2];
    }
    
    int shortestPath(int node1, int node2) {
        int n = g.size();
        vector<int> dis(n,INT_MAX/2),vis(n);
        dis[node1]=0;
        while(1){
            int x=-1;
            for(int i=0;i<n;i++){
                if(!vis[i]&&(x<0||dis[i]<dis[x])){
                    x=i;
                }
            }
            if(x<0||dis[x]==INT_MAX/2){
                return -1;
            }
            if(x==node2){
                return dis[x];
            }
            vis[x]=true;
            for(int y=0;y<n;y++){
                dis[y]=min(dis[y],dis[x]+g[x][y]);
            }
        }
    }
};

/**
 * Your Graph object will be instantiated and called as such:
 * Graph* obj = new Graph(n, edges);
 * obj->addEdge(edge);
 * int param_2 = obj->shortestPath(node1,node2);
 */
```

```c++
class Graph {
    vector<vector<pair<int, int>>> g; // 邻接表
public:
    Graph(int n, vector<vector<int>> &edges) : g(n) {
        for (auto &e : edges) {
            g[e[0]].emplace_back(e[1], e[2]);
        }
    }

    void addEdge(vector<int> e) {
        g[e[0]].emplace_back(e[1], e[2]);
    }

    int shortestPath(int start, int end) {
        // dis[i] 表示从起点 start 出发，到节点 i 的最短路长度
        vector<int> dis(g.size(), INT_MAX);
        dis[start] = 0;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        pq.emplace(0, start);
        while (!pq.empty()) {
            auto [d, x] = pq.top();
            pq.pop();
            if (x == end) { // 计算出从起点到终点的最短路长度
                return d;
            }
            if (d > dis[x]) { // x 之前出堆过，无需更新邻居的最短路
                continue;
            }
            for (auto &[y, w] : g[x]) {
                if (d + w < dis[y]) {
                    dis[y] = d + w; // 更新最短路长度
                    pq.push({dis[y], y});
                }
            }
        }
        return -1; // 无法到达终点
    }
};
```

# Shuffle

```c++
class Solution {
public:
    Solution(vector<int>& nums) {
        this->nums = nums;
        this->original.resize(nums.size());
        copy(nums.begin(), nums.end(), original.begin());
    }
    
    vector<int> reset() {
        copy(original.begin(), original.end(), nums.begin());
        return nums;
    }
    
    vector<int> shuffle() {
        vector<int> shuffled = vector<int>(nums.size());
        list<int> lst(nums.begin(), nums.end());
      
        for (int i = 0; i < nums.size(); ++i) {
            int j = rand()%(lst.size());
            auto it = lst.begin();
            advance(it, j);
            shuffled[i] = *it;
            lst.erase(it);
        }
        copy(shuffled.begin(), shuffled.end(), nums.begin());
        return nums;
    }
private:
    vector<int> nums;
    vector<int> original;
};
```

```c++
class Solution {
private:
    vector<int> ans;
public:
    Solution(vector<int>& nums):ans(nums){}
    
    vector<int> reset() {
        return ans;
    }
    
    int randInt(int min,int max){
        return rand()%(max-min+1)+min;
    }
    vector<int> shuffle() {
        auto shuffle=ans;
        for(int i=0;i<shuffle.size();i++){
            int j=randInt(i,shuffle.size()-1);
            swap(shuffle[i],shuffle[j]);
        }
        return shuffle;
    }
};
```

# Redis

1. 完全基于内存，绝大部分请求是纯粹的内存操作，非常快速；
2. 数据结构简单，对数据操作也简单；
3. 采用单线程，避免了不必要的上下文切换和竞争条件，也不存在多进程或者多线程导致的切换而消耗 CPU，不用去考虑各种锁的问题，不存在加锁释放锁操作，没有因为可能出现死锁而导致的性能消耗；
4. 使用多路 I/O 复用模型，非阻塞 IO。

### skiplist

an element in layer i appears in layer i+1 with some fixed probability p

Average ：OlogN， Worst ON

#### why skiplist?

并发环境下，红黑树在插入和删除的时候可能需要做一些rebalance的操作，这样的操作可能会涉及到整个树的其他部分，而skiplist的操作显然更加局部性一些，锁需要盯住的节点更少，因此在这样的情况下性能好一些。

区间查找数据时，跳表可以做到 O(logn) 的时间复杂度定位区间的起点，然后在原始链表中顺序往后遍历就可以了，非常高效

首先它是list！建立索引可以更快查找！

#### Insert

假如一直往原始列表中添加数据，但是不更新索引，就可能出现两个索引节点之间数据非常多的情况，极端情况，跳表退化为单链表，从而使得查找效率从 O(logn) 退化为 O(n)

我们需要在插入数据的时候，索引节点也需要相应的增加、或者重建索引，来避免查找效率的退化

### 多路 I/O 复用模型epoll & select & poll

https://kiprey.github.io/2021/05/epoll/

**I/O多路复用允许程序监视多个文件描述符（FD）**，等待一个或多个FD成为“准备就绪”状态，从而执行非阻塞I/O操作。这些技术常用于实现高性能的网络服务器

server→client (fd[i]) 文件描述符，套接字，注意从3开始，因为0、1、2：标准输入、标准输出、标准错误输出，是操作系统内核占用

#### select : bitmap

- `select`是最早的I/O多路复用技术。它允许程序监视一组FD（轮询过程是由操作系统内核完成的，而不是用户代码主动轮询），以查看是否有数据可读、可写或是否有异常条件等待处理。
  - `select`的FD集合大小受限于`FD_SETSIZE`，通常为1024，这限制了它能够监视的FD数量。
  - 每次调用`select`时，都需要把FD集合从用户空间复制到内核空间，这在FD数量大时效率低。
  - `select`每次返回时，都需要遍历整个FD集合来确定哪些FD准备就绪，这造成了O(n)的复杂度。

```c++
select(max+1,&read_fds,&write_fds,&except_fds,NULL); //last null is time limit
//max+1 limit the max length in loop, and in 32bit system maximize is 1024, 64bit is 2048
FD_ZERO(&read_fds);//initialize, set bitmap into 0
FD_SET(fd[i],&read_fds);//set 1
```

select调用是将bitmap copy to kernel, since kernel is faster than user mode (user mode need to ask kernel mode evertime)

#### poll

`poll`为每个FD维护一个`pollfd`结构体，`poll`使用一个数组的`pollfd`结构体来跟踪每个FD，也有说是链表的

- **特点**：`poll`与`select`功能相似，但提供了一种不依赖于最大FD数量限制的机制。
  - 使用了一种不同的方式来传递待监视的FD列表，允许监视更多的FD。
  - 但与`select`相似，`poll`在处理大量FD时仍然需要遍历整个列表，复杂度同样是O(n)。

#### epoll

epoll所支持的fd上限是最大可以打开的数目，具体数字可以`cat /proc/sys/fs/file-max`查看9223372036854775807

- `epoll`使用一种事件通知机制，只返回那些真正发生了事件的FD，这降低了大量FD场景下的处理时间。
- `epoll`可以在O(1)时间复杂度内完成操作，显著提高了性能。

`epoll`内部使用红黑树来管理所有的FD，以及一个链表来存储准备就绪的事件。红黑树是一种自平衡的二叉查找树，用于高效地管理大量FD的插入、删除和查找操作。

- **红黑树**：用于存储所有被监视的FD，确保即使FD数量很大时，操作效率也很高。
- **就绪列表**：当FD状态改变，且对应事件被监视时，该FD会被添加到一个就绪列表中，`epoll_wait`调用时会返回这些准备就绪的事件

- `epoll_create()`新建一个 epoll 实例，执行时会返回一个指向 **epoll 实例**的文件描述符。
  - 红黑树
  - 就绪事件链表

- `epoll_ctl()`动态设置某个 epoll 实例的**工作列表**上的条目。
  - 增add
  - 删del
  - 改mod
  
- `epoll_wait()`等待IO事件。如果当前没有事件（即就绪队列为空）则阻塞等待。

#### 两种触发模式

LT

传统 select/poll 的水平触发（Level Triggered, LT），缺省工作模式，同时还支持**阻塞**和**非阻塞**的socket。当某个文件描述符准备就绪后，内核会**持续通知**用户，直到重新变为未就绪状态。

ET

边缘触发（Edge Triggered），高速工作模式，只支持**非阻塞**的socket。当某个文件描述符从未就绪**变成**就绪时，内核会通过epoll通知用户。**注意，只通知一次**。通知动作只会在文件描述符从未就绪变成就绪这个时刻触发。如果一个已经就绪的文件描述符迟迟不被处理，即一直位于就绪状态，那么该文件描述符就一直**不会**触发通知。

**水平触发**和**边缘触发**

思考一下这个例子：

1. 文件描述符 rfd 作为管道的读取端，被注册进 epoll 实例中。
2. 管道的另一端写入2kb数据至管道。
3. 调用 `epoll_wait` 等待IO事件，返回 rfd。
4. 管道本地端通过 rfd 读取了1kb的数据。
5. 继续调用`epoll_wait`。结果是?

如果文件描述符 rfd 被注册进 epoll 实例时使用**边缘触发模式（EPOLLET）**，那么第5步的函数调用**将会被挂起**，**即便有数据没有读完**。因为边缘触发模式仅在受监视的文件描述符上发生更改才会传送事件。

使用边缘触发模式时，最好使用**非阻塞的文件描述符**，这样可以避免阻塞其他等待读写的任务。

**水平触发模式**在第5步的函数调用中不会被挂起，而是返回 rfd，因为缓冲区中仍然存在没有读完的数据。

# Trap

pc：program counter

* syscall
* exception
* interruption

trap应该对于被打断的指令是透明的，也就是说被打断的指令不应该知道这个地方产生了trap，产生trap之后现场应该得以恢复并继续执行被打断的指令。

- `stvec`：trap handler的地址，由kernel写入

- `sepc`：保存trap发生时的现场program counter，因为接下来`pc`要被取代为`stvec`。`sret`是从trap回到现场的指令，将`sepc`写回到`pc`

- `scause`：一个trap产生的原因代码，由CPU写入

- `sscratch`：放在trap handler的最开始处

- `sstatus`：控制设备中断是否被开启，如果`sstatus`中的SIE位被清除，则RISC-V将推迟设备中断。SPP位指示这个trap是在user space中产生的还是在kernel space产生的，并将控制`sret`回到什么模式

  以上寄存器只在supervisor模式下发生的trap被使用

syscall的argument可以用`argint`、`argaddr`、`argfd`等函数从内存中取出

当发生异常、中断或系统调用时，当前执行环境需要被保存，以便之后可以恢复执行。这时，操作系统或硬件会创建一个trapframe来保存这些信息。

# Page Fault

在XV6中，一旦用户空间进程触发了page fault，会导致进程被杀掉。这是非常保守的处理方式。

- trampoline page，它使得内核可以将一个物理内存page映射到多个用户地址空间中。
- guard page，它同时在内核空间和用户空间用来保护Stack。

当一个用户应用程序触发了page fault，page fault会使用与Robert教授上节课介绍的相同的trap机制，将程序运行切换到内核，同时也会将出错的地址存放在STVAL寄存器中

当访问vitual address时，违反里面flag的规则，如试图访问PTE_V为0的虚拟地址或user访问PTE_U为0/kernel访问PTE_U为1以及其他违反PTE_W/PTE_R等flag，会产生page faults，exception会存在scause里，因此会有对应的handler function来处理情况

# Walk

walk函数模拟了MMU，返回的是va对应的最低级page table的PTE

MMU全称为内存管理单元（Memory Management Unit），它是计算机硬件的一部分，负责管理虚拟内存和物理内存之间的映射。当程序尝试访问虚拟地址（VA）时，MMU将这个虚拟地址转换为实际的物理地址（PA），以便CPU可以访问实际的物理内存位置。

# COW copy on write

在`fork`时，一般都是将父进程的所有user memory复制到子进程中，但是`fork`之后一般会直接进行`exec`，这就会导致复制过来的user memory又被放弃掉。因此改进的思路是：子进程和父进程共享一个物理内存，但是mapping时将PTE_W置零，只有当子进程或者父进程的其中一个进程需要向这个地址写入时产生page fault，此时才会进行copy

这里分配新页是kalloc()，释放页是kfree()，并且要多一个flag来标记PTE_COW，这里在kalloc完了后**memmove**完了后要kfree掉旧的地址

```
kvmmap (kernel/vm.c:132) calls mappages (kernel/vm.c:143), which installs mappings into a
page table for a range of virtual addresses to a corresponding range of physical addresses. It does
this separately for each virtual address in the range, at page intervals. For each virtual address to
be mapped, mappages calls walk to find the address of the PTE for that address
```

```
copyout and copyin copy data to and from user virtual addresses provided as
system call arguments; they are in vm.c because they need to explicitly translate those addresses
in order to find the corresponding physical memory.
```

这里还要对页表进行引用的记录，kalloc， cnt+1,cnt归0的时候就push到free list里

用spinlock来保护这个count structure！

# Lazy Allocation

旧的`sbrk()`申请分配内存，但是申请的这些内存进程很可能不会全部用到，因此改进方案为：当进程调用`sbrk()`时，将修改`p->sz`，但是并不实际分配内存，并且将PTE_V置0。当在试图访问这些新的地址时发生page fault再进行物理内存的分配

# Lock contention

当进程需要切换时，首先通过system call或中断陷入内核态，进入该进程的内核线程，然后将**内核线程**的上下文（注意不是用户进程的上下文，用户进程的上下文已经保存在了trapframe里面）切换到当前CPU的scheduler线程，再将上下文切换到需要运行的进程的内核线程，最后返回用户空间。

**实现一个per CPU freelist，以减小各个进程同时调用`kalloc`、`kfree`造成的对`kmem.lock`锁的竞争**

也就是原本是所有cpu都从一个free list里分配回收页，会涉及kmem.lock的锁竞争，这里就是每个cpu都维护一个free list，如果用完了，就从别的cpu里偷一个

buffer cache采用了一个全局的锁`bcache.lock`来负责对buffer cache进行读写保护，当xv6执行读写文件强度较大的任务时会产生较大的锁竞争压力，因此需要一个哈希表，将buf entry以`buf.blockno`为键哈希映射到这个哈希表的不同的BUCKET中，给每个BUCKET一个锁，`NBUCKET`最好选择素数，这里选择13

不能像上一个一样给每个CPU一个`bcache`，因为文件系统在多个CPU之间是真正实现共享的，否则将会造成一个CPU只能访问某些文件的问题。

这里cpu有自己的cpuid，映射到hash里，然后因为持有这个锁，如果没有找到buf，则要获取别的hash lock，当心死锁！所以只能在另一个半区里找！

如果refcnt==0，找LRU策略找到可以用的，移到buf里

# Test and Set

确保了在任何时刻，只有一个线程能够成功修改目标变量，从而实现了对共享资源的安全访问。

```c++
bool test_and_set(int *lock) {
    bool old = *lock;
    *lock = 1;
    return old;
}
```

- **简单**："Test and Set" 操作由于其简洁性，在很多硬件中都有直接支持。
- **有效**：对于某些应用场景，尤其是那些锁只会被短时间持有的情况，"Test and Set" 可以非常有效。

- **自旋等待**：如果一个线程无法获取锁，它可能会进入一个紧密循环（自旋），不断地尝试获取锁。这会消耗CPU资源，特别是当锁被长时间持有时。
- **饥饿**：在高负载情况下，某些线程可能会长时间获取不到锁，导致饥饿问题。

# 内存屏障（Memory Barrier）

```c++
; processor 0
mov [_x], 1
mfence
mov r1, [_y]

; processor 1
mov [_y], 1
mfence
mov r2, [_x]
```

可以使用 `mfence` 指令实现内存屏障。`mfence` 前后的指令会严格以 `mfence` 为界线，`mfence` 之前的读写指令会在界线之前完成并全局生效，之后的指令不会重排到界线之前执行

每一个线程必须等待其他所有线程都到达barrier之后才能继续进行下面的操作,需要用到`pthread_cond_wait(&cond, &mutex)`和`pthread_cond_broadcast(&cond)`来进行线程的sleep和唤醒其他所有`&cond`中睡眠的线程. 需要对`barrier.c`中的`barrier()`进行实现.

# Volatile

在多线程编程中，`volatile`关键字是一种变量修饰符，用于告诉编译器该变量的值可能会被多个线程同时访问和修改，因此在每次使用时都需要直接从**内存**中读取它的值，而不是使用**缓存**中的值

# Buffer cache layer

1. 将对磁盘块的访问权限进行同步，保证内存中只保存一个该磁盘块的拷贝，且一次只有一个内核线程访问这个拷贝，但同时可以有多个对这个block的引用
2. 将被频繁访问的块缓存到内存中

# Soft Link

- disk层：对virtio硬盘上的文件块进行读写操作
- buffer cache层：对磁盘文件块进行缓存，并确保只有1个内核进程能在一段时间内修改文件块上存储的数据。
- logging层：让更高的层级能够将对文件块的所有update打包到一个*transaction*中，从而能保证所有文件块能够在将要崩溃时原子地进行update
- inode层：为每个文件提供一个独一无二的*inode number*
- directory层：将每个文件夹作为一个特殊的inode，这个inode的内容是文件夹entry
- pathname层：将文件夹组织为层级，并通过递归查找来解析路径
- file descriptor层：将管道、设备等UNIX资源用文件系统进行抽象

软链接文件指向的文件可能也是一个软链接文件，`open`需要递归地找到最终的非软链接文件，但是可能出现软链接文件互相链接的情况，会产生死循环，因此规定递归查找软链接的深度不能超过10.

首先要判断是否存在`path`所代表的inode，如果不存在就用`create`添加一个`T_SYMLINK`类型的inode。在inode的最后添加需要软链接到的`target`的路径名称

# Cache Ring

DMA(Direct Memory Access)是可以不通过CPU直接访问内存的机制，在进行DMA传输时DMA Engine控制PCI总线，将内存中的数据和FIFO data buffer (64KB)中的数据互传

**发送数据的流程：**

CPU将IP数据包打包放入内存中，通知DMA Engine进行DMA传输，数据放入FIFO data buffer中。MAC将IP数据包拆分为最小64KB，最大1518KB的数据帧，每一帧包含了目标MAC地址、自己的MAC地址和数据包中的协议类型以及CRC校验码。目标MAC地址通过ARP协议获取。PHY接受MAC传送的数据，将并行数据转化为串行数据后进行编码，在转变为模拟信号将数据进行传输。

![](./assert/cache_ring.png)

RAM中的tx/rx buffer是一个环形结构，有head和tail2个指针，其中head的位置由网卡控制，在进行发送时，每发送完成一个packet网卡就会自动将head向前移动一个mbuf，而需要将某个packet发送时，软件将tail向前移动一个mbuf；在进行接收时，每接收到一个packet网卡自动将head向前移动一个mbuf，软件读取tail所指向的mbuf，并向前移动。移动到最后一个mbuf后从头开始，形成一个wrap-up的结构。

```c++
int
e1000_transmit(struct mbuf *m)
{
  //
  // the mbuf contains an ethernet frame; program it into
  // the TX descriptor ring so that the e1000 sends it. Stash
  // a pointer so that it can be freed after sending.
  //
  acquire(&e1000_lock); 
  uint32 indx=regs[E1000_TDT];
  if((tx_ring[indx].status&E1000_TXD_STAT_DD)==0){
    release(&e1000_lock);
    return -1;
  }else if(tx_mbufs[indx]!=0){
    mbuffree(tx_mbufs[indx]);
    tx_mbufs[indx] = 0;
  }
  tx_mbufs[indx]=m;
  tx_ring[indx].addr=(uint64)m->head;
  tx_ring[indx].length=m->len;
  //3.3.3.1 e1000_dev.h #93,94
  tx_ring[indx].cmd=E1000_TXD_CMD_EOP | E1000_TXD_CMD_RS;

  regs[E1000_TDT]=(indx+1)%TX_RING_SIZE;//update tail
  if(&tx_ring[indx] == 0 || tx_mbufs[indx] == 0){
    release(&e1000_lock);
    return -1;
  }
  release(&e1000_lock);
  return 0;
}
```

以transmit为例，这里先判断传送了没（descript done？）如果没有则报错，不然看是否还有残存的数据，如果有则清除

当环满时被去除（释放）的mbuf是位于`E1000_TDT`（Transmit Descriptor Tail）索引处的描述符之前关联的mbuf（如果有的话）。这是因为`E1000_TDT`指向的是环中下一个要使用的位置，所以环满的情况下，处理的是这个位置上一个循环周期内可能遗留的mbuf。简而言之，去除的是即将被新数据覆盖位置的mbuf，而不是环中头部的mbuf。

# mmap & mumap (using Lazy Allocation)

在`mmap`用于访问设备内存（例如，通过PCIe连接的硬件设备）时，DMA可以发挥作用

因为常规的文件系统操作是用户态发起`read`syscall，然后在buffer cache中查找是否有相应的数据，如果没有就从磁盘中拷贝数据到buffer cache中，因为buffer cache处在内核态，因此需要将buffer cache`copyout`到用户进程的虚拟内存中，这就需要2次拷贝操作，而在mmap中只需要直接将文件数据拷贝到对应的用户空间虚拟内存即可。

需要使用 **fsync** 或者其他文件系统相关的操作来确保数据同步到磁盘。

how to use

```c++
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

int main() {
    int fd;
    struct stat sb;
    char *mapped;
    const char *message = "Hello, mmap!";

    // 以读写模式打开文件
    fd = open("example.txt", O_RDWR);
    if (fd == -1) {
        perror("open");
        return 1;
    }

    // 获取文件的属性
    if (fstat(fd, &sb) == -1) {
        perror("fstat");
        return 1;
    }

    // 执行映射
    mapped = mmap(NULL, sb.st_size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (mapped == MAP_FAILED) {
        perror("mmap");
        return 1;
    }

    // 修改映射区域的内容
    // 注意：这里假设文件足够大，可以容纳message
    strncpy(mapped, message, strlen(message));

    // 可选：使用msync同步映射区域的修改到文件
    // msync(mapped, sb.st_size, MS_SYNC);

    // 执行解映射
    if (munmap(mapped, sb.st_size) == -1) {
        perror("munmap");
        return 1;
    }

    close(fd);

    return 0;
}

```

需要在trap handler里加入page fault

why lazy allocation

> The reason to be lazy is to ensure that `mmap` of a large file is fast, and that `mmap` of a file larger than physical memory is possible.

这里lazy就是分配一个空页

然后判断当前fault的地址是在哪一个VMA的合法范围中，找到这个VMA后分配一页物理页，并用`mappages`将这一页物理页映射到fault的用户内存中，然后用`readi`打开需要映射的文件，将对应的文件内容用`readi`放入这一页内存中去。

VMA (virtual memory area) !!!!相当与一个VMA记录一个mmap操作，这里

VMA会记录一些有关连续虚拟内存地址段的信息。在一个地址空间中，可能包含了多个section，每一个section都由一个连续的地址段构成，对于每个section，都有一个VMA对象。连续地址段中的所有Page都有相同的权限，并且都对应同一个对象VMA（例如一个进程的代码是一个section，数据是另一个section，它们对应不同的VMA，VMA还可以表示属于进程的映射关系，例如下面提到的Memory Mapped File）

The VMA should contain a pointer to a `struct file` for the file being mapped; `mmap` should increase the file's reference count so that the structure doesn't disappear when the file is closed

这里vma包含了对fd，用了要+refcnt！munmap里文件无ref就write back to disk！

find the VMA for the address range and unmap the specified pages (hint: use `uvmunmap`). If `munmap` removes all pages of a previous `mmap`, it should decrement the reference count of the corresponding `struct file`. If an unmapped page has been modified and the file is mapped `MAP_SHARED`, write the page back to the file. Look at `filewrite` for inspiration.

# Malloc

sbrk(size) 用linked list实现

free!

也有用mmap的！

# Message Queue(MQ) &Kafka

https://juejin.cn/post/6844903495670169607#heading-5

Kafka 的消息队列一般分为两种模式：点对点模式和发布订阅模式

Kafka 中会有一个或者多个消费者，如果一个生产者生产的消息由一个消费者进行消费的话，那么这种模式就是点对点模式

如果一个生产者或者多个生产者产生的消息能够被多个消费者同时消费的情况，这样的消息队列成为发布订阅模式的消息队列

Kafka 有四个核心API，它们分别是

- Producer API，它允许应用程序向一个或多个 topics 上发送消息记录
- Consumer API，允许应用程序订阅一个或多个 topics 并处理为其生成的记录流
- Streams API，它允许应用程序作为流处理器，从一个或多个主题中消费输入流并为其生成输出流，有效的将输入流转换为输出流。
- Connector API，它允许构建和运行将 Kafka 主题连接到现有应用程序或数据系统的可用生产者和消费者。例如，关系数据库的连接器可能会捕获对表的所有更改

# Zero-Copy

在没有零拷贝的情况下，数据通常需要经过以下步骤从一个地方传输到另一个地方：

1. **从磁盘读取数据到内核空间**的缓冲区。
2. **从内核空间复制数据到用户空间**的缓冲区。
3. **从用户空间复制数据回到内核空间**的网络缓冲区。
4. **从内核空间发送数据**到网络。

零拷贝技术通过以下几种方式减少或消除这些复制操作：

- **直接内存访问（DMA）传输**：允许硬件设备（如网络接口卡）直接读写内存，绕过CPU。
- **内存映射（Memory Mapped I/O）**：应用程序通过将文件映射到其地址空间的一部分，直接在内存中访问文件数据，避免读取文件内容到用户空间的缓冲区。
- **发送文件（sendfile）系统调用**：允许在内核中直接将数据从文件系统传输到网络，无需将数据复制到用户空间。
- **使用分散/聚集I/O（Scatter/Gather I/O）**：允许应用程序在单个系统调用中读写到多个缓冲区，减少上下文切换和缓冲区的复制。

- **减少CPU负载**：通过减少数据复制操作，CPU可以用于处理其他任务，从而提高整体系统性能。
- **降低延迟**：数据传输操作更高效，减少了处理时间。
- **减少内存带宽的消耗**：避免了多次数据复制对内存带宽的需求。

# MVCC

也就是每个数据不覆盖老数据，用timestamp和transaction version来，有一个version chain，head是newest的，不用锁contention，隔离性是每个事务是看得到其开始时间前的数据版本snapshot！

DBMS maintains multiple physical versions of a single logical object in the database. When a transaction writes to an object, the DBMS creates a new version of that object. When a transaction reads an object, it reads the newest version that existed when the transaction started

The fundamental concept/benefit of MVCC is that writers do not block writers and readers do not block readers. This means that one transaction can modify an object while other transactions read old versions.

1. **版本控制**：每当数据被修改时，MVCC不会直接覆盖旧数据，而是创建一个新版本的数据。这意味着数据库中的数据可以有多个版本，每个版本都有其对应的时间戳或事务ID。
2. **事务隔离**：MVCC允许每个事务看到一个一致的、不变的数据库快照，这是通过让每个事务**仅访问对应于其开始时间之前的数据版本实现的**。这样，事务就不会看到其他并发事务所做的修改，从而确保了事务的隔离性。
3. **并发控制**：通过允许读操作访问旧版本的数据，而写操作创建新版本的数据，MVCC可以大大**减少读写操作之间的锁争用，从而提高并发性能。**

Repeat Read是undo log读到老的数据

# Wound-Wait

**Wound**（伤害）: 如果请求资源的进程具有较早的时间戳（即较高的优先级），那么持有资源的进程将被“伤害”，这意味着持有资源的进程需要释放资源并回滚其操作。然后，资源将被分配给请求资源的进程。

**Wait**（等待）: 如果请求资源的进程具有较晚的时间戳（即较低的优先级），那么它将被迫等待，直到资源变为可用。

新的有更高的txn id

# Extendible Hash Table

普通的hash里的bucket没有chain的上限

Extendible Hash Table 由一个 directory 和多个 bucket 组成

bucket有桶深，然后正常hash，如果桶满了，则split把hash尺寸扩大一倍，也就是depth增加1，这里的global depth也就是取hash值的后几位！这里如果未满的桶就会有多个dir同时指向这个bucket，后续split的时候就不用再增加global depth，这里也就是local depth

在代码中的体现就是，当需要插入 K 时，发现 bucket 已满，首先判断当前 bucket 的 local depth 是否等于 global depth：

若相等，即仅有一个指针指向 bucket，需要对 dir 扩容。
若不相等，即有多个指针指向 bucket，则无需扩容，将原来指向此 bucket 的指针重新分配。

# LRU-K

list存k个time stamp

Hash+linkedlist

# Buffer Pool Manager

FlushPage ：只是把page 内容写回到磁盘上，注意如果Dirty的话需要写回disk！

buffer pool里存的是frame，一个page id对应一个frame id，然后还有一个free list来维护空闲的frame id

Extendible Hash Table实现的page id映射到frame id

Pincount表示是否有进程在使用这个page，没有则可以delete

# BPlusTree

存的是索引

leaf min_size=max_size/2 , leaf 有next_page_id，因为底层它们是连接起来的

internal min_size=(max_size+1)/2

head+ flexible array

Search

lower_bound+distance

Insert

Delete

iterator

这里都是只加R Lock

Concurrency

先锁住 parent page， 2. 再锁住 child page， 3. 假设 child page 是*安全*的，则释放 parent page 的锁。*安全*指当前 page 在当前操作下一定不会发生 split/steal/merge。同时，*安全*对不同操作的定义是不同的，Search 时，任何节点都安全；Insert 时，判断 max size；Delete 时，判断 min size。

因此可以提前释放掉其祖先的锁来提高并发性能。

Search 只加读锁

Insert 写锁，判断是否split

在 child page 不安全时，需要持续持有祖先的写锁。并在出现安全的 child page 后，释放所有祖先写锁。

然后向上递归插入的时候还是会持有锁，所以直接从page set里拿page指针，不用再加锁

然后这里的祖先会存在transaction的pageset里，然后delete的页page id也会存在delete page set里

Delete写锁，判断size是否改变，也需要对 sibling 加锁。并在完成 steal/merge 后马上释放

### RAII

RAII 强调资源的管理应该由对象的生命周期自动控制，**自动控制**！

智能指针（Smart Pointers）算

scoped_lock算c++17的特性，自动管理互斥锁！！避免死锁和忘记释放锁

`unique_lock`、`shared_lock` 等也符合 RAII 原则

new和delete不算！

malloc和free也不算，因为是手动管理的！

```cpp
std::scoped_lock<std::mutex> lock(mutex_);
```

这里其实就是一个经典的 RAII。在初始化 lock 时，调用 `mutex_.Lock()`，在析构 lock 时，调用 `mutex_.Unlock()`。这样就通过简单的一行代码成功保证了在 lock 的作用域中对 mutex 全程上锁。离开 lock 的作用域后，由于 lock 析构，锁自动释放。

会出现死锁，leaf index 左到右，delete 锁sibling，就死锁了，这里iterator得不到锁就自动放弃

**乐观锁**

**split/steal/merge，对沿途的节点上读锁，并及时释放，对 leaf page 上写锁。当发现操作对 leaf page 确实不会造成 split/steal/merge 时，可以直接完成操作。当发现操作会使 leaf page split/steal/merge 时，则放弃所有持有的锁，从 root page 开始重新悲观地进行这次操作，即沿途上写锁。**



1. **`std::unique_lock<std::mutex> lock(lock_request_queue->latch_);`**
   - 这条语句在构造`unique_lock`对象时自动对互斥锁`lock_request_queue->latch_`上锁。这意味着不需要显式调用`.lock()`，互斥锁将在`unique_lock`对象作用域结束时自动解锁（这得益于RAII - 资源获取即初始化机制）。
   - 这种用法在确保互斥锁在作用域内总是被正确锁定和解锁的情况下非常有用，即使在作用域内抛出异常时也是如此。
2. **`std::unique_lock<std::mutex> lock(lock_request_queue->latch_, std::adopt_lock);`**
   - 当互斥锁在创建`unique_lock`对象之前已经手动锁定时，使用这种语句。`std::adopt_lock`标志表示`unique_lock`应该接管对互斥锁的现有锁定的所有权，而不是尝试再次上锁。
   - 这意味着你必须在这行代码之前手动调用过`lock_request_queue->latch_`的`.lock()`。然后`unique_lock`负责在其作用域结束时解锁互斥锁。这种用法适用于需要在创建`unique_lock`对象之前锁定互斥锁的更复杂的锁定逻辑，可能是由于条件锁定或为了与需要手动锁定的代码接口。
   - 重要的是，使用`std::adopt_lock`时必须确保互斥锁确实已经被锁定，因为未这样做将导致未定义行为。

总结来说，主要区别在于锁定的管理：

- 不使用`std::adopt_lock`时，`std::unique_lock`会在构造时尝试锁定互斥锁。
- 使用`std::adopt_lock`时，`std::unique_lock`假定互斥锁已经被锁定，并接管解锁的责任，而不再尝试锁定。

# 火山模型

Iterator Model，或 Pipeline Model，或火山模型。每个算子都有 `Init()` 和 `Next()` 两个方法。`Init()` 对算子进行初始化工作。`Next()` 则是向下层算子请求下一条数据。当 `Next()` 返回 false 时，则代表下层算子已经没有剩余数据，迭代结束。可以看到，火山模型一次调用请求一条数据，占用内存较小，但函数调用开销大，特别是虚函数调用造成 cache miss 等问题。



executor里的plan是查询计划



seqscan就是用Table Itertor，

Insert

Delete要更新index，这里一个table有多个index

```
 table_index_ = exec_ctx_->GetCatalog()->GetTableIndexes(table_info_->name_);
 这里对每一个table_index_
 it->index_->InsertEntry(key, *rid, exec_ctx_->GetTransaction());
```

这里就是Insert和Delete都从Next里读出我们要操作的tuple，然后从里面读出key和index

![](/home/hychen11/Desktop/Intern/assert/project-structure.jpg)

![](./assert/seqscan.jpg)

# TopN

Sort 也是 pipeline breaker。在 `Init()` 中读取所有下层算子的 tuple，并按 ORDER BY 的字段升序或降序排序。Sort 算子说起来比较简单，实现也比较简单，主要需要自定义 `std::sort()`

limit和 SeqScan 基本一模一样，只不过在内部维护一个 count，记录已经 emit 了多少 tuple。当下层算子空了或 count 达到规定上限后，不再返回新的 tuple。

TopN就是priority_queue，Init读出所有的下层算子tuple，加入queue然后再取前n个

# Optimizer

在 Optimizer 生成的查询计划中，Join 会被优化成具体的 HashJoin 或 NestedIndexJoin 等等

# Aggregation

Aggregation 是 pipeline breaker。也就是说，Aggregation 算子会打破 iteration model 的规则。原因是，在 Aggregation 的 `Init()` 函数中，我们就要将所有结果全部计算出来。

```c++
void AggregationExecutor::Init() {
  child_->Init();
  Tuple tuple;
  RID rid;
  while (child_->Next(&tuple, &rid)) {
    auto agg_key = MakeAggregateKey(&tuple);
    auto agg_val = MakeAggregateValue(&tuple);
    aht_.InsertCombine(agg_key, agg_val);
  }
  aht_iterator_ = aht_.Begin();
}
```

key和val全部存在aht里 aggregation hash table

count *计算总行数，不管是不是null

count(column) 计算非null的行

```sql
SELECT min(t.z), max(t.z), sum(t.z) FROM t GROUP BY t.x, t.y;
```

group by（AggregateKey）为 `{t.x, t.y}`，aggregate（AggregateValue）为 `{t.z, t.z, t.z}`。aggregate 规则为 `{min, max, sum}`。

如果是aht是null的话，要填入空值

**收集数据**：在`Init()`函数中，Aggregation算子通过遍历整个输入表或数据源，将需要聚合的数据根据`GROUP BY`字段收集起来

然后这里有InsertCombine就是得到min，max，sum等规则，也就是真正存入的是满足条件的 

# NestedLoopJoin 

1. **外层循环**：选择一个表作为外表（通常是左表），遍历这个表中的每一行。
2. **内层循环**：对于外层循环中的每一行，遍历另一个表（内表，通常是右表）的每一行。
3. **匹配条件**：对于外表的当前行和内表的每一行，检查它们是否满足连接条件（如`ON`子句中指定的条件）。如果满足，就将这两行的组合作为结果集的一部分。
4. **重复**：重复步骤2和3，直到外表的所有行都被处理过。

有inner join和left join，区别就是是否null的也输出

https://www.jianshu.com/p/e7e6ce1200a4

# 聚簇索引（Clustered Index）

- **物理存储**：在聚簇索引中，表中的数据行物理上按索引键的顺序存储。这意味着聚簇索引决定了数据在磁盘上的物理排列。因为这种安排，每个表只能有一个聚簇索引，因为数据只能按照一种顺序物理存储。
- **检索效率**：聚簇索引对于经常按顺序查询的数据非常有效，例如，当你需要基于范围的查询时（如查找所有在特定日期之间的订单），由于数据行在物理上是连续的，所以可以更快地访问这些数据。
- **例子**：假设你有一个员工表，以员工ID作为聚簇索引。这意味着所有员工记录都将按员工ID的顺序存储在磁盘上。

# 非聚簇索引（Non-Clustered Index）

遍历 B+ 树叶子节点。由于我们实现的是非聚簇索引，在叶子节点只能获取到 RID，需要拿着 RID 去 table 查询对应的 tuple。

- **物理存储**：非聚簇索引和数据的物理存储无关。非聚簇索引包含索引键和指向数据行的指针（或引用），因此，即使索引是有序的，数据本身可以以任意顺序存储。这允许一个表拥有多个非聚簇索引。
- **检索效率**：非聚簇索引适用于快速定位单个行或少数几行，但如果需要大范围的扫描，可能不如聚簇索引高效。访问非聚簇索引中的数据可能需要两次查找：首先在索引中查找指针，然后使用这个指针去找到实际的数据行。
- **例子**：继续使用员工表的例子，假设你经常根据员工的部门ID来查询员工。你可以创建一个非聚簇索引在部门ID上，这样查询特定部门的员工时就可以更快。

# Concurrency

不同隔离级别下的锁管理

包括锁升级

利用 2PL 实现并发控制

table lock和row lock

- `request_queue_`：实际存放锁请求的队列。
- `cv_` & `latch_`：条件变量和锁，配合使用可以实现经典的等待资源的模型。
- `upgrading_`：正在此资源上尝试锁升级的事务 id。

```c++
/**
   * [LOCK_NOTE]
   *
   * GENERAL BEHAVIOUR:
   *    Both LockTable() and LockRow() are blocking methods; they should wait till the lock is granted and then return.
   *    If the transaction was aborted in the meantime, do not grant the lock and return false.
   *
   *
   * MULTIPLE TRANSACTIONS:
   *    LockManager should maintain a queue for each resource; locks should be granted to transactions in a FIFO manner.
   *    If there are multiple compatible lock requests, all should be granted at the same time
   *    as long as FIFO is honoured.
   *
   * SUPPORTED LOCK MODES:
   *    Table locking should support all lock modes.
   *    Row locking should not support Intention locks. Attempting this should set the TransactionState as
   *    ABORTED and throw a TransactionAbortException (ATTEMPTED_INTENTION_LOCK_ON_ROW)
   *
   *
   * ISOLATION LEVEL:
   *    Depending on the ISOLATION LEVEL, a transaction should attempt to take locks:
   *    - Only if required, AND
   *    - Only if allowed
   *
   *    For instance S/IS/SIX locks are not required under READ_UNCOMMITTED, and any such attempt should set the
   *    TransactionState as ABORTED and throw a TransactionAbortException (LOCK_SHARED_ON_READ_UNCOMMITTED).
   *
   *    Similarly, X/IX locks on rows are not allowed if the the Transaction State is SHRINKING, and any such attempt
   *    should set the TransactionState as ABORTED and throw a TransactionAbortException (LOCK_ON_SHRINKING).
   *
   *    REPEATABLE_READ:
   *        The transaction is required to take all locks.
   *        All locks are allowed in the GROWING state
   *        No locks are allowed in the SHRINKING state
   *
   *    READ_COMMITTED:
   *        The transaction is required to take all locks.
   *        All locks are allowed in the GROWING state
   *        Only IS, S locks are allowed in the SHRINKING state
   *
   *    READ_UNCOMMITTED:
   *        The transaction is required to take only IX, X locks.
   *        X, IX locks are allowed in the GROWING state.
   *        S, IS, SIX locks are never allowed
   *
   *
   * MULTILEVEL LOCKING:
   *    While locking rows, Lock() should ensure that the transaction has an appropriate lock on the table which the row
   *    belongs to. For instance, if an exclusive lock is attempted on a row, the transaction must hold either
   *    X, IX, or SIX on the table. If such a lock does not exist on the table, Lock() should set the TransactionState
   *    as ABORTED and throw a TransactionAbortException (TABLE_LOCK_NOT_PRESENT)
   *
   *
   * LOCK UPGRADE:
   *    Calling Lock() on a resource that is already locked should have the following behaviour:
   *    - If requested lock mode is the same as that of the lock presently held,
   *      Lock() should return true since it already has the lock.
   *    - If requested lock mode is different, Lock() should upgrade the lock held by the transaction.
   *
   *    A lock request being upgraded should be prioritised over other waiting lock requests on the same resource.
   *
   *    While upgrading, only the following transitions should be allowed:
   *        IS -> [S, X, IX, SIX]
   *        S -> [X, SIX]
   *        IX -> [X, SIX]
   *        SIX -> [X]
   *    Any other upgrade is considered incompatible, and such an attempt should set the TransactionState as ABORTED
   *    and throw a TransactionAbortException (INCOMPATIBLE_UPGRADE)
   *
   *    Furthermore, only one transaction should be allowed to upgrade its lock on a given resource.
   *    Multiple concurrent lock upgrades on the same resource should set the TransactionState as
   *    ABORTED and throw a TransactionAbortException (UPGRADE_CONFLICT).
   *
   *
   * BOOK KEEPING:
   *    If a lock is granted to a transaction, lock manager should update its
   *    lock sets appropriately (check transaction.h)
   */

  /**
   * [UNLOCK_NOTE]
   *
   * GENERAL BEHAVIOUR:
   *    Both UnlockTable() and UnlockRow() should release the lock on the resource and return.
   *    Both should ensure that the transaction currently holds a lock on the resource it is attempting to unlock.
   *    If not, LockManager should set the TransactionState as ABORTED and throw
   *    a TransactionAbortException (ATTEMPTED_UNLOCK_BUT_NO_LOCK_HELD)
   *
   *    Additionally, unlocking a table should only be allowed if the transaction does not hold locks on any
   *    row on that table. If the transaction holds locks on rows of the table, Unlock should set the Transaction State
   *    as ABORTED and throw a TransactionAbortException (TABLE_UNLOCKED_BEFORE_UNLOCKING_ROWS).
   *
   *    Finally, unlocking a resource should also grant any new lock requests for the resource (if possible).
   *
   * TRANSACTION STATE UPDATE
   *    Unlock should update the transaction state appropriately (depending upon the ISOLATION LEVEL)
   *    Only unlocking S or X locks changes transaction state.
   *
   *    REPEATABLE_READ:
   *        Unlocking S/X locks should set the transaction state to SHRINKING
   *
   *    READ_COMMITTED:
   *        Unlocking X locks should set the transaction state to SHRINKING.
   *        Unlocking S locks does not affect transaction state.
   *
   *   READ_UNCOMMITTED:
   *        Unlocking X locks should set the transaction state to SHRINKING.
   *        S locks are not permitted under READ_UNCOMMITTED.
   *            The behaviour upon unlocking an S lock under this isolation level is undefined.
   *
   *
   * BOOK KEEPING:
   *    After a resource is unlocked, lock manager should update the transaction's lock sets
   *    appropriately (check transaction.h)
   */

```

![](./assert/Isolation_lock.jpg)

Repeat表示多次读取的数据是一样的，

read commit表示确保一个事务不读另一个事务未提交的数据

read uncommit一个事务可以读另一个事务未提交的数据

upgrade的事务优先级最高

request list里前排都是granted有锁的，后面按照优先级事务进行排队

如果存在这样的请求，则代表当前事务在此前已经得到了在此资源上的一把锁，接下来可能需要锁升级。需要注意的是，这个请求的 `granted_` 一定为 true。因为假如事务此前的请求还没有被通过，事务会被阻塞在 LockManager 中，不可能再去尝试获取另一把锁。

也就是说锁升级里肯定是granted的事务，然后再请求锁升级

这里获取锁是条件变量+mutex

```c++
while(!Granted_Lock()){
	cv_.wait();
}
cv.notify_all();
```

锁检测就是dfs，经过的txn就加入cycle_set，如果里面有则表示有cycle了

# 凉经

## `delete` 和 `free` 的区别

`delete` 和 `free` 都是用于释放之前分配的内存，但它们在用法和底层机制上有明显的区别：

- **`free`** 是 C 语言的标准库函数，用于释放通过 `malloc`、`calloc` 或 `realloc` 分配的内存。`free` 仅仅释放内存，不会调用任何构造函数或析构函数，因为 C 语言不支持构造函数或析构函数的概念。
- **`delete`** 是 C++ 的操作符，用于释放通过 `new` 操作符分配的内存。与 `free` 不同，`delete` 在释放对象占用的内存之前，会调用对象的析构函数（如果有的话），以确保正确地进行资源清理，比如关闭文件、释放分配的资源等。

## Fork() & pid

fork()返回子进程的pid！pid是唯一的！

- If `fork()` returns `-1`, it indicates an error occurred while trying to fork the process.
- If `fork()` returns `0`, the code is being executed in the child process.
- If `fork()` returns a positive value, the code is being executed in the parent process, and this value is the PID of the newly created child process.

## C 和 C++ 强制转换的底层原理

在底层，这些转换指示编译器如何重新解释内存中的数据。例如，将一个 `int` 类型的指针转换为 `char *` 类型的指针，转换操作本身不会改变指针所指向的内存内容，但允许通过 `char *` 类型的指针以不同的方式访问这块内存（如按字节访问而不是按整数访问）。

## GDB

```shell
gcc -E lab3.c > pre_processor.txt
gcc -S lab3.c #get lab3.s
gcc -c lab3.s  #get lab3.o
xxd lab3.o | less #read binary file
gcc -o lab3 lab3_helper.o lab3.o

```

* View the actual machine code and place the contents in a .txt file to look at them later, using **$ objdump -s lab3.o > objdumplab3.txt**

* You can also look at the machine code next to the assembly code by typing: **$ objdump -sdr lab3.o**

静态库是一种在程序编译链接时被整合到程序中的库，最终形成一个包含了所有需要代码的独立可执行文件。

使用 `ar` 命令来创建静态库。例如，你有 `file1.o` 和 `file2.o` 两个目标文件，可以创建一个名为 `libmystatic.a` 的静态库：

 `-L.` 指定了库文件的搜索目录（当前目录），`-lmystatic` 指定链接库 `libmystatic.a`。

```shell
ar rcs libmystatic.a file1.o file2.o
gcc -o myprogram myprogram.o -L. -lmystatic
#-L/path/to/library
```

动态库在程序运行时被加载，不是在编译链接时永久性地整合到可执行文件中。

使用 `gcc` 的 `-shared` 选项来创建动态库。 

确保编译时或运行时动态库的路径被正确指定：

```shell
gcc -shared -o libmydynamic.so file1.o file2.o
gcc -o myprogram myprogram.o -L. -lmydynamic
export LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH
./myprogram
```

动态库 xxx.so

-lxxx就是去找libxxx.so文件！ 有libname.so的文件就用指令 -lname!

静态库 xxx.a

## 从代码输出到终端输出

stdin  0

stdout 1

stderr 2

标准输入输出报错三个标准文件描述符fd，stdout默认链接到console，可以通过管道

这里

# 面经

### Stack Heap metho(static) register

stack每个线程私有

heap所有线程共享

static

```c++
#include <iostream>
void increment() {
    static int count = 0; // 初始化只会发生一次
    count++;
    std::cout << "Count: " << count << std::endl;
}

int main() {
    increment(); // 输出 Count: 1
    increment(); // 输出 Count: 2
    increment(); // 输出 Count: 3
    return 0;
}
```

每次调用 `increment()`，`count` 的值会保持不变，但它的初始化（`count = 0`）只会发生在第一次调用时。

`static` 成员属于类本身，而不属于某个具体的对象。

类的 `static` 成员变量在**全局范围**内初始化一次，通常需要在类外显式初始化。初始化：程序启动时初始化

### extern

全局变量 `int a=1; extern int a;`

### URL到页面展示发生了什么

第一步检查浏览器缓存

>  **缓存机制**：
>
> - **强缓存 strong cache**（如 `Expires` 或 `Cache-Control`）：不需要向服务器发送请求。直接从本地缓存中读取资源
> - **协商缓存Conditional Cache**（如 `ETag` 或 `Last-Modified`）：向服务器验证缓存是否有效，如果有效，服务器返回 304 状态码。告知浏览器继续使用本地缓存

首先是DNS解析，从url解析到ip，如果url指定端口号，也会解析port

> HTTPS还要建立TLS连接
>
> DNS解析时会按本地浏览器缓存->本地 Host ⽂件->路由器缓存-> DNS 服务器-> 根 DNS 服务器的顺序查询域名对应 IP ，直到找到为⽌

然后通过三次握手建立tcp连接，然后发送请求到server端

> 连接建⽴后，浏览器端会构建请求⾏、请求头等信息，并把和该域名 相关的 Cookie 等数据附加到请求头中，向服务器构建请求信息。

然后server端接受请求生产响应数据，收到响应200OK，404没有页面，500server错误

> 若响应头状态码为 301、302 ，会重定向到新地址

解析，渲染HTML文件，创建DOM树，解析CSS

### TCP

里第二次到第三次握手中间服务器可能会收到SYN洪泛攻击

两次握⼿可以释放⼀端到另⼀端的 TCP 连接，完全释放 连接⼀共需要四次握⼿

### TCP & UDP

传输形式: TCP 是⾯向字节流的，UDP 是⾯向报⽂的。

TCP 只⽀持点对点通信UDP ⽀持⼀对⼀、⼀对多、多对⼀、多对多。

TCP常⽤于要求通信数据可靠场景（如⽹⻚浏览、⽂件传输、邮件传输、远程登录、数据库操作 等）。 UDP常⽤于要求通信速度⾼场景（如域名转换、视频直播、实时游戏等）。

### GET & POST

GET请求的参数⼀般写在URL中，且只接受ASCII字符

POST请求参数⼀般放在请求体中，对于数据类型也没有限制

GET传送的数据量较⼩，不能⼤于2KB。 POST传送的数据量较⼤，⼀般被默认为不受限制。 HTTP 协议没有 Body 和 URL 的⻓度限制，对 URL 限制的⼤多是浏览器和服务器的原因

GET 请求只能进⾏ URL 编码，POST ⽀持多种编码⽅式

GET 请求会被浏览器主动cache，⽽ POST 不会，除⾮⼿动设置

POST发送2个tcp，一个header，第二个body

### HTTP 1.1长连接 1.0短连接

HTTP 的 Keep-Alive实现了使⽤同⼀个 TCP 连接来发送和接收多个 HTTP 请求/应答，避免了连接建⽴和释放的开销，就就是 HTTP ⻓连接

TCP 的 Keepalive，是由 TCP 层（内核态） 实现的，称为 TCP 保活机制； 通俗地说，就是TCP有⼀个定时任务做倒计时，超时后会触发任务，内容是发送⼀个探测报⽂给对 端，⽤来判断对端是否存活。

### 多个TCP连接怎么实现

多个tcp连接是靠某些服务器对 Connection: keep-alive 的 Header 进⾏了⽀持。简⽽⾔ 之，完成这个 HTTP 请求之后，不要断开 HTTP 请求使⽤的 TCP 连接。这样的好处是连接可以被重 新使⽤，之后发送 HTTP 请求的时候不需要重新建⽴ TCP 连接，以及如果维持连接，那么 SSL 的 开销也可以避免。

TCP利⽤滑动窗⼝实现流量控制。

拥塞控制： 当⽹络拥塞时，减少数据的发送

通过 ARQ 协议实现。基本原理是每发完⼀个分组就停⽌发送，等待对⽅确认。如果 没收到确认，会重发数据包，直到确认后再发下⼀个分组。

超时重传

### Cookie和Session是什么？有什么区别

服务器在接收到来⾃客户端浏览器的请求之后，就能够通过分析存放于请求头的Cookie得到客户 端特有的信息，从⽽动态⽣成与该客户端相对应的内容

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是 Sessio n 。Session 主要⽤于维护⽤户登录状态、存储⽤户的临时数据和上下⽂信息等

传输⽅式：Cookie 在每次 HTTP 请求中都会被⾃动发送到服务器，⽽ Session ID 通常通 过 Cookie 或 URL 参数传递。

### 进程间有哪些通信⽅式

管道：是⼀种半双⼯的通信⽅式，数据只能单向流动⽽且只能在具有⽗⼦进程关系的进程间使
⽤。

2. 命名管道： 也是半双⼯的通信⽅式，但是它允许⽆亲缘关系进程间的通信。
3. 信号量：是⼀个计数器，可以⽤来控制多个进程对共享资源的访问，常作为⼀种锁机制，防⽌某
    进程正在访问共享资源时，其他进程也访问该资源。因此主要作为进程间以及同⼀进程内不同线
    程之间的同步⼿段。
4. 消息队列：消息队列是消息的链表，存放在内核中并由消息队列标识符标识。消息队列克服了信
    号传递信息少、管道只能承载⽆格式字节流以及缓冲区⼤⼩受限等缺点。
5. 信号：⽤于通知接收进程某个事件已经发⽣，从⽽迫使进程执⾏信号处理程序。
6. 共享内存：就是映射⼀段能被其他进程所访问的内存，这段共享内存由⼀个进程创建，但多个进
    程都可以访问。共享内存是最快的进程通信⽅式，它是针对其他进程间通信⽅式运⾏效率低⽽专
    ⻔设计的。它往往与其他通信机制，⽐如信号量配合使⽤，来实现进程间的同步和通信。
7. Socket 套接字：是⽀持TCP/IP 的⽹络通信的基本操作单元，主要⽤于在客户端和服务器之间
    通过⽹络进⾏通信

### 管道

`int pipe(int fd[2]);`  

fd[0] read fd[1] write, read的时候要close1, write的时候要close0

> 如果读端和写端都保持打开状态，就可能导致以下情况：
>
> 1. 读进程认为写端还会继续写入，因此一直阻塞等待。
> 2. 写进程认为读端会读取数据，因此也一直阻塞等待。
>
> 这种互相等待会导致死锁

### 消息队列

存放在内存中的消息链表，FIFO，异步

分布式消息队列系统（如 Kafka、RocketMQ）

put和offer里，put是将元素插入到队列尾部。如果队列已满，则会阻塞当前线程，直到队列有空间可用

offer是队列满了就返回false

### 共享内存（还不是很懂具体的）

共享内存是一种高效的**进程间通信（IPC，Inter-Process Communication）**机制

需要分配一个唯一的标识符

**同步机制**（如信号量、互斥锁）来防止数据冲突。

多进程可访问

### PV

P占有

V释放

```
P(Semaphore S):
    S = S - 1
    if S < 0:
        block current thread/process
        add current thread/process to the waiting queue
V(Semaphore S):
    S = S + 1
    if S <= 0:
        remove a thread/process from the waiting queue
        wake up that thread/process

```

```c++
Semaphore S = 1 // 初始信号量为 1，表示资源可用

Thread 1:
    P(S) // 尝试占用资源
    // 临界区代码（访问共享资源）
    V(S) // 释放资源

Thread 2:
    P(S) // 尝试占用资源
    // 临界区代码（访问共享资源）
    V(S) // 释放资源
```

资源有n份就初始化为`S=n`

P(s) s<0就是阻塞

### Condition Variable

go里的wait，signal和broadcast

CV一般和Mutex一起使用

### Mutex

```
lock(mutex);        // 获取互斥锁
// 临界区代码
unlock(mutex);      // 释放互斥锁
```

### Critical Section

**临界区** 是指多个线程/进程中需要访问的共享资源的代码段，如果不加保护可能导致数据竞争（Race Condition）或数据不一致的问题



### HTTP1.1和HTTP2的区别是什么？

HTTP2引入了多路复用、服务器推送、头部压缩等特性，以提高性能和效率。

### Close Wait状态是什么意思，Fin Wait和Close Wait之间的区别是什么？

- **CLOSE WAIT**：表示本端接收到对方的FIN报文，等待本端关闭连接。
- **FIN WAIT**：表示等待对方确认自己的FIN报文。

### HTTP加密算法的基本原理，对称加密和非对称加密？

- **对称加密**：加密和解密使用相同的密钥。速度快，适合大量数据加密。
- **非对称加密**：使用一对公钥和私钥，一个用于加密，另一个用于解密。适合小量数据加密和身份验证。

### TCP连接写数据过快

在TCP连接建立好后，如果数据发送（写入）速度过快，超过了接收方处理或网络传输的能力，可能会导致几种情况：

1. **发送方缓冲区满**：每个TCP连接在发送方都有一个发送缓冲区，用于暂存待发送的数据。如果应用程序写入数据的速度持续超过网络传输和接收方处理的速度，发送缓冲区可能会被填满。当发送缓冲区满时，TCP协议将暂停应用程序的写操作，直到缓冲区中的数据被发送出去并确认接收，腾出空间来。
2. **接收方缓冲区溢出**：类似地，接收方也有一个接收缓冲区。如果发送方的数据传输速度过快，接收方应用程序来不及处理缓冲区中的数据，可能会导致接收缓冲区溢出。TCP协议通过流量控制机制（如接收窗口）来避免这种情况，确保发送方的发送速度能与接收方的处理速度相匹配。
3. **网络拥塞**：如果网络路径上的某个环节成为瓶颈，数据发送过快也可能导致网络拥塞。TCP协议通过拥塞控制机制（如慢启动、拥塞避免、快重传、快恢复）来调整数据的发送速率，以适应网络当前的拥塞状况。

### Slice扩容后在原Slice上修改数据新Slice会发生变化吗？

当Slice扩容导致重新分配了底层数组时，在原Slice上的修改不会影响到新的Slice，因为它们指向了不同的底层数组。但如果没有重新分配底层数组，即扩容操作没有超过原Slice的容量，则它们仍然共享同一个底层数组，此时一个Slice上的修改会影响到另一个。

### C++ std里执行类似操作会怎么样（vector取引用然后扩容）？

在C++中，`std::vector`在进行扩容时，如果新的大小超过了当前容量，将分配一个新的内存区域并移动（或复制）元素到新的内存区域。如果你持有指向vector元素的指针或引用，扩容操作可能会使这些指针或引用变为悬空，因为它们指向的内存已经不再被vector所使用。

### Go关闭Channel时有哪些需要注意的事情，怎么判断channel是否已经关闭呢？

关闭Channel时需要注意：

- 只有发送方应该关闭channel，接收方不应该关闭它，否则会导致panic。
- 向已关闭的channel发送数据会导致panic。
- 从已关闭的channel接收数据是安全的，会立即返回，而不会阻塞，并返回元素类型的零值。

判断channel是否已经关闭：

- 从channel接收数据时，可以通过第二个返回值来判断channel是否被关闭。如果返回的布尔值为`false`，则表示channel已经关闭并且没有更多的数据。

```go
v, ok := <-ch
if !ok {
    // channel ch is closed
}
```

### Go的interface和Java的interface有什么区别，继承有什么区别？

- **Go的interface**：是隐式实现的，任何类型只要实现了interface定义的所有方法，就实现了该interface，无需显式声明。Go不支持传统的面向对象编程中的继承，而是通过组合和接口来实现类似的功能。

### GC的常见算法

引用计数法（Reference Counting）

可达性分析法（Reachability Analysis）

- **标记-清除（Mark-Sweep）**：垃圾收集器遍历所有对象，标记所有可达的对象，然后清除未标记的对象。          

​          

### Map 并发读写

Go的`map`在没有适当同步控制的情况下并不是并发安全的。

如果你尝试在多个goroutine中并发读写同一个`map`（即至少有一个goroutine在写入），那么程序可能会遇到运行时错误，导致`panic`。这是因为同时有多个goroutine修改`map`可能会导致`map`内部状态的不一致性。

**使用互斥锁（Mutex）**：使用`sync.Mutex`或`sync.RWMutex`来保护`map`，确保每次只有一个goroutine可以对其进行修改。`sync.RWMutex`是读写互斥锁，对于读多写少的情况是一个不错的选择，因为它允许多个goroutine同时读取`map`，只在写入时才需要互斥访问

### 什么是panic

`panic`是Go语言中的一个内建函数，当调用时会立即停止当前函数的执行，开始逐层向上（函数调用栈）传播，直到达到当前goroutine的顶部，然后程序崩溃并输出panic消息。

### 索引的了解

- **索引**是数据库管理系统中一个能够提高数据检索速度的数据结构。它存储了数据库表中一列或多列的值和这些值所在行的物理地址。
- 索引可以显著加快数据的检索速度，尤其是在执行SELECT查询操作时。
- 但索引也不是没有代价的，它会占用额外的磁盘空间，并且在插入、删除、更新数据时会增加额外的维护成本，因为数据库需要同时更新索引。

### 适合加索引的字段

- **高查询频率字段**：经常作为查询条件（WHERE子句中）的字段。
- **作为连接键的字段**：在多表JOIN操作中用作连接条件的字段。
- **有高度选择性的字段**：字段的唯一值很多，选择一个值能够大幅缩小结果集的范围。
- **排序和分组字段**：在ORDER BY、GROUP BY、DISTINCT等操作中使用的字段。

### 不适合加索引的字段

- **更新非常频繁的字段**：频繁更新的字段会导致索引频繁重建，影响性能。
- **数据重复值多的字段**：如果一个字段中的值大多数都是相同的，那么索引这个字段的效果会很差，因为它不能有效地减少搜索范围。
- **数据类型大的字段**：例如，大型的文本字段（TEXT、BLOB）不适合直接建立索引，如果需要，可以考虑对其进行散列或创建前缀索引。
- **表记录数较少的表**：对于只有少数几条记录的表，全表扫描的速度可能与索引扫描相当，甚至更快。

### TCP 2MSL

TCP（Transmission Control Protocol）连接在关闭时需要等待2倍的最大报文段生存时间（Maximum Segment Lifetime，MSL）是为了确保网络中所有可能的剩余数据报文段都已经消失，以确保之前的连接不会对新的连接产生干扰。tcp

TCP 连接是通过 IP 地址和端口号来标识的。IP 地址用于确定主机的位置，而端口号则用于确定主机上的应用程序。因此，一个 TCP 连接由源 IP 地址、源端口号、目标 IP 地址和目标端口号唯一确定。

Socket 是在 TCP/IP 协议族中用于实现网络通信的一种编程接口或抽象概念。它允许应用程序通过网络发送和接收数据，而无需了解底层网络细节。在网络编程中，Socket 提供了一种机制，使得应用程序能够通过网络与其他应用程序进行通信。

Socket 可以看作是应用程序与网络之间的“插座”，它是一种抽象概念，用于描述两个不同主机之间的通信连接。通过 Socket，应用程序能够创建连接、发送数据、接收数据以及关闭连接等操作。

理解 Socket 的一个重要概念是它由 IP 地址和端口号组合而成，因此可以唯一标识一个网络连接。在网络编程中，开发人员可以利用 Socket 编程接口来创建、绑定、监听和接受连接，以及发送和接收数据。

1. 如果直接输出 `map[string]*student`，会打印出该 map 中所有键值对的地址，即指向 `student` 结构体的指针。
2. 当遍历该 map 并打印结果时，由于 map 的迭代顺序是不确定的（无序性），每次遍历的顺序可能不同，但会打印出该 map 中所有键值对的地址。
3. 关于深浅拷贝：
   - **浅拷贝**：只复制对象的引用，而不是对象本身的内容。修改其中一个对象的属性可能会影响另一个对象。适用于对象较小且不包含引用类型的情况。
   - **深拷贝**：复制对象本身的内容，包括引用类型的数据，新对象与原对象完全独立，修改一个对象不会影响另一个对象。适用于对象较大或包含引用类型的情况。
4. 关于深拷贝：
   - **切片**：切片可以进行浅拷贝，但不会进行深拷贝。可以通过复制切片的方式实现浅拷贝。
   - **Map**：Map 也是进行浅拷贝，复制 map 会创建一个新的 map，但仍然引用相同的键值对。需要深拷贝时，需要逐个复制键值对。
   - **结构体**：结构体的深浅拷贝取决于结构体内部字段的类型，如果字段是基本类型则进行浅拷贝，如果字段包含引用类型，则需要手动实现深拷贝。
5. 避免深拷贝结构体的方法包括：
   - 使用指针类型：在复制结构体时，只是复制指针，而不是整个结构体。这样可以节省内存并避免不必要的复制。
   - 使用 `sync.Mutex` 等同步机制来保护结构体的字段，以确保多个 goroutine 访问时不会出现数据竞争。

### 浏览器渲染过程

浏览器渲染页面的过程涉及将你的HTML, CSS, 和JavaScript代码转换成用户可以交互的网页。这一过程可以分为以下几个基本步骤：

1. **解析 HTML 文件**：当你的浏览器获得一个 HTML 文件，它首先会解析该文件的结构，将标签转化为有意义的内容块，这些内容块称为“节点”。这些节点包括HTML的各种元素，如段落、标题和图像等。
2. **构建 DOM 树**：解析 HTML 后，浏览器会构建一棵“文档对象模型”（DOM）树。DOM 树是一个由节点组成的树状结构，每个节点代表页面上的一个对象。
3. **解析 CSS**：浏览器接着解析内联、嵌入和外链的CSS。CSS决定了HTML内容的展现方式，例如颜色、布局和字体样式等。
4. **生成渲染树**：**此步骤中，DOM树和CSS规则合并，创建出渲染树**。渲染树只包含需要显示的节点和它们的样式信息。不可见的元素如`<head>`或`display: none`的元素不会被包含在渲染树中。
5. **布局（Reflow）**：浏览器计算每个可见元素的确切位置和大小。这一步骤有时也被称为“回流”。
6. **绘制（Painting）**：最后一步是“绘制”，浏览器会根据渲染树来绘制内容到屏幕上。这包括颜色的填充、文本的添加和图像的展示等。

在一个简单的 HTML 页面中，`<html>`, `<head>`, `<title>`, `<body>`, `<p>` 等都是 DOM 树中的节点。这些节点按照 HTML 文档的层级结构排列，形成了一棵树，我们称之为 DOM 树

# Count 1

```
n-=n&(-n);
```

