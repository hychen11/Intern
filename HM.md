### server 之间timestamp的同步

#### NTP（Network Time Protocol）

最常用的方法，通过互联网或内部时间服务器同步各节点系统时间

精度通常在 **几毫秒到几十毫秒**

#### PTP（Precision Time Protocol）

精度更高，常用于金融交易或高精度场景

可达到微秒级别

### Reduced read latency via client-side LRU cache, 0.2s reduction for 4 kB files at 1k random GETs/s。





11.5 TODO

### Configured Nginx as reverse proxy handling 1K+ concurrent requests and Gateway for dynamic load balancing。

use AB test script like `ab -n 10000 -c 500 http://127.0.0.1:8080/user/info`

-n number of requests, -c means the concurrency of requests

![image-20251104224653785](/Users/chenhaoyang/Library/Application Support/typora-user-images/image-20251104224653785.png)

JMeter？GC？



### Optimized query performance by 20%utilizing Redis caching with Bloom filters preventing cache penetration 

### Implemented lazy updates and distributed locks ensuring data consistency across multiple service instances。 

### Used async RabbitMQ in order and inventory services to achieve eventual consistency under high concurrency。 

### Implemented flash sale utilizing Redis+Lua scripts for atomic stock deduction and Sentinel for graceful degradation。 

### Integrated Zipkin for distributed tracing and ELK for log analysis to enhance full-system observability.

Zipkin : TransmittableThreadLocal

ELK Prometheus Kibana Logstash





### Implemented complete Raft consensus protocol in a 3-node cluster, achieving ～5s leader election during network partitions

get this data from test case 3 servers group (port implemented), actually aroud 5s

also have 7 servers group to implement multiple election

```
TestInitialElection2A - 3节点集群，测试初始选举           3.54s
TestReElection2A - 3节点集群，测试网络故障后的重新选举      5.84s 这个就是network partition
TestManyElections2A - 7节点集群，测试多次选举场景          7.04s
```

### 为什么需要随机选举超时？

背景：**leader** 定期发送心跳（`AppendEntries`）给所有 follower。
 如果 follower 在一段时间内没有收到 leader 的心跳，就会认为 leader 挂了，**进入 candidate 状态发起选举**

如果所有 follower 的选举超时都是一样的，比如都设为 300ms，那么：

- 当 leader 挂掉时，**所有 follower 几乎同时触发选举**；
- 它们几乎同时递增 term 并发送 `RequestVote`；
- 每个节点都只投自己一票；
- 所有候选人票数都不够半数；
- 选举失败，重新超时，再选；
- 导致**无限选举冲突（split vote）**

Raft 通过让每个节点的选举超时在一个范围内**随机化**（如 150–300ms），保证：

- 某个 follower 先触发超时，成为 candidate；
- 其余节点尚未超时，就收到该 candidate 的投票请求；
- 它们会投票给该 candidate；
- **第一个触发选举的节点几乎总能赢得选举**

随机选举超时是为了减少候选人冲突、加快收敛到唯一 leader，保证系统稳定。

### 为什么随机心跳超时？

随机心跳超时也是工程优化，防止同时选举问题出现，加速选举收敛

在**不同 leader 节点**之间随机化心跳间隔；

或者在**同一 leader 的不同 follower**之间稍作随机抖动；
 这样做的目的也是**减少网络同步冲突**（避免所有心跳同时触发造成网络突发流量峰值）。

### • Built high-performance log replication system with rapid backtracking improved from 6 to 8 ops/s。

202 start() ops cost time from 34.5 to 25.3 

```
TestBasicAgree2B - 3条日志操作
TestRPCBytes2B - 10条日志操作（每条5KB）
TestConcurrentStarts2B - 5条并发日志操作
TestBackup2B - 50条 日志操作（压力测试）
TestCount2B - 10条日志操作，关注RPC计数
```

### • Designed snapshot mechanism reducing recovery time by 17.5% while maintaining complete transaction history 

`InstallSnapshot` 是 **领导者（leader） → 跟随者（follower）** 的 RPC 调用。

也就是说：

> **不是 client 给 Raft 发 snapshot，**
>  而是 **leader Raft 给落后的 follower Raft 发 snapshot。**

client 并不直接参与 snapshot

Snapshot 快了多少？**从4.0 -> 3.3**

```shell
Running tool: /opt/homebrew/bin/go test -timeout 30s -run ^TestSnapshotInit2D$ 6.5840/raft

=== RUN   TestSnapshotInit2D
Test (2D): snapshot initialization after crash ...
  ... Passed --   3.3  3   80   20008   14
--- PASS: TestSnapshotInit2D (3.28s)
PASS
ok      6.5840/raft     (cached)


Running tool: /opt/homebrew/bin/go test -timeout 30s -run ^TestNoSnapshotInit2D$ 6.5840/raft

=== RUN   TestNoSnapshotInit2D
Test (2D): no snapshot initialization after crash ...
  ... Passed --   4.0  3  114   29790   23
--- PASS: TestNoSnapshotInit2D (3.95s)
PASS
ok      6.5840/raft     4.151s
```

### 什么时候生成snapshot？

在 Raft 的上层状态机（KVServer / Service 层）也就是通过ApplyHandler处理

Raft 协议本身负责 **日志复制、leader 选举、日志提交**，但它不会直接生成应用层快照。

KVServer 是 Raft 的 **用户状态机（State Machine）**，负责：

- 读取 Raft commit 的日志（`applyCh`）
- 执行对应的操作（比如 put/get/delete）
- 决定何时生成 **状态机快照** 并通知 Raft 保存快照（`rf.Snapshot(index, snapshot)`）

- `applyCh` 是 **Raft 提供的 commit 通道**，Raft 会把已经 commit 的日志通过这个 channel 发给状态机。
- 在你的代码里：

```
log := <-kv.applyCh
```

意味着 KVServer 从 channel 中 **取到 Raft 已经 commit 的日志条目**。

- `log.CommandValid` 表示这是一个有效日志。
- `log.CommandIndex` 表示日志在 Raft 日志中的索引。

然后这里persist就是每次改变那几个值就做一次持久化，比如每次增加一个commit log就做一次持久化

```go
	// 每收到一个log就检测是否需要生成快照
			if kv.maxraftstate != -1 && kv.persister.RaftStateSize() >= kv.maxraftstate/100*95 {
				// 当达到95%容量时需要生成快照
				snapShot := kv.GenSnapShot()
				kv.rf.Snapshot(log.CommandIndex, snapShot)
```

生成snapshot 如果raft state size==无法通过test case，因为rpc存在延时，这里达到容量95%就需要做snapshot了

`maxraftstate`和`persister.RaftStateSize()`相等才生成快照的话, 无法通过测例, 因为可能快照`RPC`存在一定延时, 所以我采用的手段是只要达到阈值的95%, 就生成快照

### • Created comprehensive test suite with 200+ test cases verifying system reliability under various failure scenarios.

这里主要通过写script，把每一部分的test case combine起来并且重复测试，这里是重复了50次

### 遇到的challenge，bug如何解决？

如何发现的，在跑后序的test case的时候出现的问题，通过log 日志发现的，以及报错信息



比如在日志复制里，很容易数组越界，out of index，这里需要打log，查看原本的日志长度和修改后的日志长度，然后backtrack查看复制规则是否正确

并且很多次都是下一个stage的测试过不了，可能就因为前一个stage 未测出bug

此外经常发生阻塞，进程无法结束，Raft 进程死锁了

> "It's usually a bad idea to hold a lock while doing anything that might wait: reading a Go channel, sending on a channel" 

比如

```go
mu.lock() 
defer mu.unlock()

result:=make(chan string)
<- result //阻塞等待
```

这里持有锁 等待 会造成死锁等等



还有commit信息丢失的问题

![image-20251104224136276](/Users/chenhaoyang/Library/Application Support/typora-user-images/image-20251104224136276.png)



### raft对外提供的接口：

这里上层的数据库就是一个kv对的map，可以理解成state machine，这里的snapshot就是一个state machine

#### service -> raft

* Make 就是初始化raft

* Start(command)  客户端（通过 Clerk）发来的命令被传给 Raft，让 Raft 将其复制到日志中并达成一致。

  **返回**：命令的索引（index）、当前任期（term）和是否是领导者（isLeader）。

* Snapshot(sm_state) 当状态机太大时，由上层主动触发生成快照，Raft 保存当前快照以节省日志空间

* `CondInstallSnapshot(sm_state)` 收到来自 Leader 的 snapshot RPC，需要决定是否应用，条件性地在 Raft 层安装快照（如果 Raft 发现已有快照的任期和索引更大）

#### Raft -> persistent storage

* `Persist(raft_state)`  持久化 Raft 的核心状态（如 term、votedFor、log）
* SaveStateAndSnapshot(raft_state, sm_state)
* ReadPersist(raft_state)

### candidate什么时候变回follower：

* 老leader复活

* 新leader选举出来

* 选举超时，但是没有过半选票，++term，重制成candidate





整体来说一般用的是3大小的server group