# Full GC

full gc 严重导致jvm长时间停顿，STW，导致线程长时间挂起，导致会话超时，心跳超时，消费超时

# CPU 高、内存泄漏、线程阻塞等

1. **先在线分析，后转储文件**：
   - 优先使用 `jstack`、`jcmd Thread.print`、`jmap -histo` 等轻量命令。
   - 最后才用 `jmap -dump` 或 `jcmd GC.heap_dump`（生成堆转储文件可能触发 STW）。
2. **动态问题（如 CPU 高）优先抓线程，静态问题（如 OOM）优先抓内存**。

### jstack

thread dump 线程快照

抓取 Java 进程的线程堆栈信息，用于分析线程状态（如死锁、阻塞、无限循环等），线程状态变化快，优先

```shell
# 1. 找到目标 Java 进程的 PID
jps -l  # 或 ps -ef | grep java

# 2. 生成线程快照（可多次采集，间隔 5~10 秒）
jstack -l <PID> > thread_dump1.txt
jstack -l <PID> > thread_dump2.txt

# 3. 分析高频线程（结合 top -Hp <PID> 查看占用 CPU 高的线程）
printf "%x\n" <TID>  # 将线程 ID 转为 16 进制（与 jstack 输出中的 nid 对照）
```

**适用场景**：

- CPU 占用率高
- 线程卡死（如 `WAITING`、`BLOCKED` 状态线程过多）
- 应用无响应（如死锁）

查找 `BLOCKED`/`WAITING` 状态的线程。

检查同一锁的竞争情况（死锁会直接标注 `Found one Java-level deadlock`）。

结合 `grep -A <行数> "关键字"` 过滤关键线程（如业务线程池名称）。

### jmap

生成堆内存快照（Heap Dump）或统计内存对象分布，dump堆内存会对进程有一定影响，比如大堆，在thread dump之后进行

**适用场景**：

- 内存泄漏（Old Gen 持续增长）
- Full GC 频繁
- OOM 异常

```shell
# 1. 查看堆内存摘要（快速确认各区域使用情况）
jmap -heap <PID>

# 2. 统计对象分布（按类实例数量/大小排序）
jmap -histo:live <PID> > object_histogram.txt

# 3. 生成堆转储文件（需谨慎，生产环境可能触发 STW）
jmap -dump:live,format=b,file=heap.hprof <PID>
```

### jcmd

动态查看 JVM 参数、性能数据，比如**GC日志**，应用日志，系统监控数据等

```shell
# 1. 列出当前 Java 进程
jcmd -l

# 2. 生成线程快照（等价于 jstack）
jcmd <PID> Thread.print > thread_dump.txt

# 3. 生成堆转储（等价于 jmap -dump）
jcmd <PID> GC.heap_dump filename=heap.hprof

# 4. 查看 JVM 启动参数
jcmd <PID> VM.flags

# 5. 触发 Full GC（谨慎使用）
jcmd <PID> GC.run
jcmd <PID> GC.heap_info
```

### swap

如何查看swap vm_stat, top

```shell
PhysMem: 15G used (1826M wired, 6939M compressor), 66M unused.
VM: 185T vsize, 5703M framework vsize, 293456(0) swapins, 456248(0) swapouts.
```

# CPU Problem

* dead lock, dead loop， 或者多个线程等待一个一直未释放的资源，线程池池销毁不了，占用cpu资源
* IO耗时过大，频繁IO，线程无法销毁，cpu无法释放
* 频繁full gc STW导致线程状态切换频繁，消费cpu资源

### CPU Load

系统在单位时间内（1/5/15 分钟）处于 **可运行状态（Runnable）** 或 **不可中断状态（Uninterruptible Sleep，如磁盘 I/O 等待）** 的平均进程数

### CPU Busy

CPU 时间片的实际占用比例（如用户态 `%us`、内核态 `%sy`、等待 I/O `%wa` 等）

### high load and high busy

- **计算密集型任务**：进程持续占用 CPU（如死循环、算法复杂度高）。
- **频繁上下文切换**：线程数过多（`vmstat` 中 `cs` 值高）或者gc频繁

### high load and low busy

- **I/O 瓶颈**：进程因磁盘/网络 I/O 阻塞（`%wa` 高）。
- **锁竞争**：线程因锁冲突进入 `BLOCKED` 状态（`jstack` 可见）。
- **外部依赖延迟**：如数据库响应慢、HTTP 调用超时。

1. 大概率disk IO高导致磁盘IO线程阻塞，load上升
2. IO分为disk IO和network IO，磁盘IO高一般是异常过多导致日志打印
3. network IO查看对DB/缓存/接口的RT是否增长

# Memory Problem

内存泄漏，内存溢出，gc

### leak

一般伴随着gc异常

### Overflow/ OOM

#### heap space

是否大对象出现，-Xmx

#### meta space

分析classloader和重复class，是否内存泄漏

-XX:MetaspaceSize

#### native thread

jstack确定创建了多少线程，是否超量创建

-Xss减少线程栈大小，降低heap space大小

#### direct buffer memory

是否有-XX:+DisableExplicitGC，会导致System.gc()失效

考虑NIO最多的netty

-XX:MaxDirectMemorySize

#### stackoverflow

查看是否内存泄漏，是否无限递归，调用链太长，调整-Xmx

### GC

#### YoungGC频率过高

-Xmn,-XX:SurvivorRatio 是否合理

MAT分析heapdump，是否生成对象合理

#### FullGC单次时间过长

old区域是否过大

如果 **CMS（Concurrent Mark-Sweep）GC** 的 **Full GC 时间过长**，可能的原因包括：

1. **老年代（Old Gen）过大**，导致 **初始标记（Initial Mark）** 和 **重新标记（Remark）** 阶段耗时增加。
2. **堆内存分配不合理**，导致 CMS 无法有效并发回收。
3. **并发模式失败（Concurrent Mode Failure）**，退化为 Serial Old GC（STW 时间更长）。

G1（Garbage-First）是一款面向大堆内存、低延迟的垃圾回收器，但如果 **Full GC（即 G1 的 "Mixed GC" 或 "Full GC"）时间过长**，可能是由以下原因导致：

1. **老年代（Old Regions）过大**，导致 **标记阶段（Marking Phase）耗时增加**。
2. **并发标记失败（Concurrent Marking Failure）**，退化为 **Serial Old GC（单线程 Full GC）**。
3. **大对象（Humongous Objects）分配过多**，导致 **堆内存碎片化**。
4. **晋升失败（Promotion Failure）**，新生代对象无法晋升到老年代。

#### FullGC频率过高

新生代大小，晋升阈值是否过小，导致大量生命周期短的进入老年代

老年代是否过小，内存不足

```shell
jmap -heap <PID>
Heap Configuration:
   MinHeapFreeRatio         = 40
   MaxHeapFreeRatio         = 70
   MaxHeapSize              = 2147483648 (2048.0MB)  # 最大堆内存
   NewSize                  = 357892096 (341.25MB)   # 新生代初始大小
   MaxNewSize               = 715784192 (682.5MB)    # 新生代最大大小
   OldSize                  = 715784192 (682.5MB)    # 老年代大小
   NewRatio                 = 2                      # 新生代:老年代 = 1:2
   SurvivorRatio            = 8                      # Eden:Survivor = 8:1:1
```



# Disk Problem

一般都是日志打印

df -h

du -h${}|sort -rh | head -n 10

du -sh *(du -h --max-depth=1)

