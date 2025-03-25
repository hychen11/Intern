面试官好，我是xxx，现就读于xx，xxx专业，预计今年12月毕业，我有一段研究经历是关于计算机视觉方向的，整体项目是结合了三维重建和扩散模型，实现的场景编辑，随后我有几段项目经验，最早的是用c++的sql数据库引擎的底层实现和事务管理，随后做了团购订餐系统，整体是基于java的springboot，实现了一些基本的功能，并且添加了缓存实现部分优化，此外我还有两段分布式的项目经理，比如基于raft的kv分布式数据库，可以实现容错和可持久化等功能，此外还有分布式文件系统，是NoSQL的类似于hadoop的一个系统，可以实现一定程度的容错，和数据的处理，比如过滤等操作

然后我对加强学习和大模型也比较感兴趣，打算下一阶段学习rag或者结合大模型相关的开发，我上学期也合作过一个安卓app的llm的接口api的实现，目前我正在学习微服务的相关的知识

# SQL

![img](https://pic4.zhimg.com/v2-8f7cbe65dff04d916fe675c9ea984267_1440w.jpg)

Lock Manager

锁管理器，利用 2PL 实现并发控制。支持 `REPEATABLE_READ`、`READ_COMMITTED` 和 `READ_UNCOMMITTED` 三种隔离级别，支持 `SHARED`、`EXCLUSIVE`、`INTENTION_SHARED`、`INTENTION_EXCLUSIVE` 和 `SHARED_INTENTION_EXCLUSIVE` 五种锁，支持 table 和 row 两种锁粒度，支持锁升级。

[Deadlock Detection](https://zhida.zhihu.com/search?content_id=219844706&content_type=Article&match_order=1&q=Deadlock+Detection&zhida_source=entity)：死锁检测，运行在一个 background 线程，每间隔一定时间检测当前是否出现死锁，并挑选合适的事务将其 abort 以解开死锁

用 wait for 图来表示事务之间的等待关系。wait for 是一个有向图，`t1->t2` 即代表 t1 事务正在等待 t2 事务释放资源。当 wait for 图中存在环时，即代表出现死锁，需要挑选事务终止以打破死锁。

有向图环检测算法包括 DFS 和拓扑排序

在遍历的过程中，发现某个结点有一条边指向已访问过的结点，并且这个已访问过的结点不是上一步访问的结点，则表示存在环。

此时我们挑选 **youngest** 的事务将其终止

这里需要记录环里的transaction，然后选择一个终止

wound-wait就是transaction id大的年轻，old优先级高，然后将这个tx状态设为Abort，然后从请求队列中释放，释放其持有的锁，终止其正在阻塞的请求，并调用 `cv_.notify_all()` 通知正在阻塞的相关事务

然后需要移除这个事务，继续检测，因为图可能有多个环



LRU-K算法

假如 list 中所有 page 都被引用了大于等于 K 次，则比较最近第 K 次被引用的时间，驱逐最早的。假如 list 中存在引用次数少于 K 次的 page，则将这些 page 挑选出来，用普通的 LRU 来比较这些 page 第一次被引用的时间，驱逐最早的。

# 6.5840

# Split Brain

mapreduce

这里rpc调用是

```go
sockname := coordinatorSock()
c, err := rpc.DialHTTP("unix", sockname)
```

