# Chapter 1 Reliable, Scalable, and Maintainable Applications

#### Summary

This chapter focuses on three critical aspects of system design: reliability, scalability and maintainability. 

Reliability refers to a system’s ability to function correctly even in the presence of failures, which can arise from hardware issues like disk or network failures, software bugs, or human errors such as misconfigurations or accidental changes. To ensure reliability, systems can implement access control mechanisms to prevent unauthorized changes, utilize sandbox environments for safe load testing, and adopt continuous integration and deployment pipelines with automated testing to identify and mitigate potential faults. Monitoring performance metrics and error rates also helps detect issues proactively, and gradual rollouts of new features can limit the impact of unforeseen bugs by initially exposing them to a small subset of users. 

Scalability,  first introduce what is load, which describes factors such as requests per second or the ratio of database reads to writes, and discusses trade-offs in system designs. For example, Twitter optimizes for fast reads in its timeline caching system at the cost of slower writes when distributing new tweets to followers. Then it introduces how to measure performance by bringing up some important concepts includes throughput, response time, and latency, as well as the use of percentiles. And tail latencies, which occur when a small percentage of backend calls are slow, are particularly problematic in systems requiring multiple backend dependencies, as these delays compound and impact overall user experience. This chapter sets the stage for understanding how to design robust and scalable systems while balancing these critical factors.  

To handle growing workloads, it can be achieved by scaling up, through upgrading hardware, or scaling out, by adding more servers.

For maintainability, it primarily focuses on three design principles: Operability, Simplicity, and Evolvability, which correspond to the system’s ease of operation, understandability, and ability to be maintained and upgraded, respectively.

#### Experience

I have written a distributed file system, can be stream processing, here is divided into four stages to complete, the first stage is to complete the distributed grep operation, the second stage is the introduction of gossip mechanism to detect the survival of the node, the third is to realize the file storage and append operations, and fault-tolerant operations, the last stage is to realize the streaming and fault-tolerant mechanism. Here I deeply feel that the system design should be KISS principle, that is, Keep It Simple Si......., reliability, that is, from a simple robust system to start, and gradually upward to expand, at the same time, here to maintainability is also very important, because each new stage will be The old problems that existed before are found and need to be maintained.

# Chapter2 Data Models and Query Languages

#### Summary

This chapter mainly focuses on the the two different parts of data model, which is Relational Model and Document Model. It introduces the key conception SQL, which based on relational model: data is organized into relations (called *tables* in SQL), where each relation is an unordered collection of tuples (*rows* in SQL), and these are important conceptions in database system. Apart from SQL, it also have NoSQL, in many NoSQL databases, unlike the rigid tabular schema of relational databases, the NoSQL represents data as self-contained “documents,” which are typically encoded in formats like JSON, XML, or HTML.

This chapter also introduces Object-Relational Mapping (ORM) frameworks like ActiveRecord and Hibernate, which simplify the translation between object-oriented application code and relational database models by reducing repetitive code. Its main function is to allow developers to use an object-oriented approach to operate databases in applications without directly writing cumbersome SQL queries or managing complex data conversion logic. However, ORMs cannot fully resolve the inherent differences between the two models, known as the object-relational impedance mismatch. And in Java, ORM layer is like Mybatis or JDBC.

And this chapter also introduces the Query Languages for Data, which has two types of query data: *declarative* query language, and *imperative* code. The imperative code tells the computer how to perform a task step-by-step. It focuses on providing detailed instructions for execution, specifying the order of operations explicitly. But the declarative query code focuses on what to achieve rather than how to achieve it. The programmer specifies the desired result, and the system determines the best way to compute it.

For certain condition, we can use graph-like data models, it's efficient for handling relationship-heavy data: Graph models naturally represent nodes and edges, making complex relationship queries simpler and faster than SQL. For SQL may require nested recursive queries.

#### Experience

Database in software development is crucial, here the two data models, SQL and NoSQL I have used, such as Mysql and MongoDB, here you need to choose different databases for different situations. In the development of takeaway delivery back-end software, I used Mysql and Redis for storage. And I also utilized the Mybatis as ORM layer, this is a layer translate between OOP language and database language. This ORM layer can be a good way to reduce the complexity of the code, the development of more efficient, more abstract data access, lightweight, support for object-oriented encapsulation, but it also has problems, such as reducing the efficiency of the program execution, automation means that the mapping and association management, at the expense of performance.

# CHAPTER 3 Storage and Retrieval

#### Summary

This chapter introduces key data structures for efficient data storage and retrieval, beginning with the Log-Structured Merge Tree (LSM Tree). In this part, it has the Hash Table and Append Only Log, data is written sequentially at the tail of a file on disk, while an in-memory hash table keeps track of key offsets for quick access. This design provides significant advantages over random writes, as all disk writes are sequential, enabling better performance. It also supports concurrency because writes always append to the end of the file, while reads traverse backward from the most recent value. Crash recovery is straightforward since data written to disk persists even if memory is lost during a crash; recovery involves loading the data back into memory or leveraging periodic snapshots stored on disk. In Bitcask, it speeds up recovery by storing a snapshot of each segment’s hash map on disk, which can be loaded into memory more quickly. However, this approach has limitations, particularly for range queries like a < key < c, which require a full traversal of the log, resulting in inefficiency with a time complexity of O(n). Additionally, while crash recovery is feasible, it can be time-consuming to reload data from the disk after a crash.

LSM Trees and B-Trees have distinct trade-offs in terms of performance and efficiency. LSM Trees are optimized for write-heavy workloads by maintaining keys in memory using data structures like Red-Black Trees or Skip Lists, allowing for O(logn) complexity for insertions and searches. When the memory fills up, the in-memory structure (MemTable) is flushed to disk as a new SSTable, and subsequent writes are directed to a new MemTable. Reads in LSM Trees first check the MemTable, then search sequentially through disk segments, starting from the most recent to the older ones. Compaction is performed to merge multiple SSTables into fewer sorted segments, improving read performance by reducing the number of segments to search. Compaction uses a merge sort algorithm and consumes disk bandwidth, which can affect both write and read performance during the process. In contrast, B-Trees require at least two writes for each operation: first to a Write-Ahead Log (WAL) for crash recovery and then to the B-Tree itself, with potential additional writes to modify internal nodes during rebalancing. While B-Trees are efficient for point queries due to their hierarchical structure, they are less space-efficient than LSM Trees because B-Trees allocate fixed-size pages (e.g., 4KB), which may remain underutilized if not fully filled. LSM Trees save space as they write data sequentially without fixed-page overhead, but they may require searching multiple segments during reads, especially when compaction has not been performed. Overall, LSM Trees are better suited for write-heavy workloads due to their sequential write patterns, while B-Trees excel in read-intensive scenarios with a focus on point queries and workloads with less write contention.

Primary Index (Cluster Index) In disk, the data also store in this way.

Secondary Index(Non-Cluster Index), that stores the indexed column’s values (e.g., Name) in sorted order, along with pointers to the actual data rows. It does not affect the physical storage order of the table and allows for efficient lookups and range queries on the indexed column.

#### Experience

I have developed database systems where concepts like memory and disk are involved, as well as the use of cache. To manage cache efficiently, we usually use a hash structure combined with the LRU (Least Recently Used) policy for cache elimination. In memory, we can choose to use a different data structure, such as a B+ tree, and store the pages of the B+ tree to disk. When the data needs to be queried or modified, the corresponding entire page is loaded from disk into memory for the operation. Another very important concept here is the index. I have optimized the process of index construction, for example, when querying the name column, the secondary index is first queried to find the corresponding pointer, which points to the page where the target data is located. The database then fetches the complete rows of data through a table lookup. This indexing mechanism effectively improves query efficiency while balancing storage and performance requirements.

# CHAPTER 4 Encoding and Evolution

#### Summary

This chapter first introduces compatibility. Backward compatibility means newer code can read data that was written by older code. Forward compatibility means older code can read data that was written by newer code. Then an important conception encoding and decoding, which can translation between byte sequence and in-memory representation.

Then, the chapter explores various data formats such as JSON, XML, and CSV. JSON, widely used in networking, is schema-less, making it convenient to add content, but it still has problem. Binary encoding, such as Protocol Buffers (protobuf), is more space-efficient. In protobuf, fields can be required (not recommended), optional, or repeated (used for arrays)

At second part, chapter discusses the dataflow model, it has several kinds of model, like the dataflow through databases, dataflow through service call, dataflow through asynchronous message passing.

#### Experience

Serialization and deserialization are very important in network communications, and I have used these techniques in disk persistent storage for databases. By defining the format of the serialization protocol, data can be deserialized according to that format after it is transmitted or stored, and the data content can be recovered. In front-end and back-end development, I often use JSON to encapsulate data information. At the same time, in order to improve the transmission efficiency and reduce the size of the data, I will use Protocol Buffers (protobuf) to encode and decode the data (encoding and decoding), so as to realize the efficient communication between the client and the server. For example, in the development of distributed file system, due to the need for a large number of UDP and TCP message interactions, we use protobuf to encode the Request and Response for efficient transmission over the network. This approach not only improves performance, but also ensures structured and reliable data transmission.

# CHAPTER 5 Replication

#### Summary

To avoid single-point failure, we need replication, and actually, there are many other reasons, like keep data geographically close to your users to reduce the latency, scale out the number of machines to increase read throughput. 

And this chapter also mentioned synchronous and asynchronous replication, the synchronous is, if a leader receive a write request, it will wait for all replicas write finished, then reply OK to user, but asynchronous will send reply just after leader write finished, and don't wait for all replicas write finish. However, with asynchronous replication, the system eventually achieves consistency.

Additionally, the CAP theorem is introduced, where “C” stands for consistency, “A” for availability, and “P” for partition tolerance, highlighting the trade-offs that distributed systems must navigate.

But there exists problems with replication lag, the first problem is reading your own writes, to handle read-your-writes consistency, users can Read Who Write Who strategy, or use synchronous strategy, or just read from leader. The second problem is moving backward in time, we can use Monotonic Reads to handle this, which ensures that if a user reads a value at a certain point in time, they will not see an older value in subsequent reads, guaranteeing that reads are always consistent and move forward in time. The third problem is replication lag anomalies concerns violation of causality, so there is one solution names Consistent Prefix Reads, which makes sure that any writes that are causally related to each other are written to the same partition.

Then this chapter also discusses the Multi-Leader Replication and Leaderless Replication and corresponding replicate strategy and read write problem.

#### Experience

I have written a distributed file system, can be stream processing, in this system, I have used consistent hash to partition and allocate the replicas. I held a ring to store all live nodes, when a node failed, I removed the failed node from ring, and push the replica file into a new successor node, the same way then a new node join in, I will allocate the replica file. Fot the replica consistency, it's more complicated, since u need to append file the same sequence as client sent append request to distributed file system, and also need merge operation to fix file conflict problem.

# CHAPTER 6 Partitioning

#### Summary

This chapter introduces the partition, which refers to splitting the data into smaller, independent subsets that are distributed across multiple nodes, enabling scalability and fault tolerance. It's main idea is for scalability and reduce latency. 

The first part is partitioning by key-value data, for example, if your keys are alphabetic, one partition might store keys from “A” to “M,” and another might store “N” to “Z.”. This strategy is good for range query, but may have the problem of hot key, which some nodes is idle, but certain node is very busy on hot key. The second part is partitioning by hash of key, this use hash to load request on nodes, in order to reduce the hot spot condition.

Second part is the interaction between the partition and secondary indexes. There are two ways, one is Partitioning secondary indexes by document, each partition having its own secondary index (local index). When using secondary indexes to query, it needs to send request on every partitions to get all results. It is called scatter/ gather, and can make read queries quite expensive. The other is Partitioning secondary indexes by term, which constructs a global index that covers data in all partitions. It can make reads more efficient, but writes slower and more complicated, since it may affect multiple partitions of the index.

Third part is Rebalancing Partitions. There are 3 requirements for rebalancing, first is the load of Read and Write should to be more balanced, eg,  8. Second is the availibility of Read and Write, through adding middleware, like ZooKeeper or Route to guide the clients to the correct server. Last one is reduce the network and disk load. Besides, there are 3 ways of assigning partitions to nodes, hash mod N, consistent hashing and dynamic partitioning. In dynamic partitioning, one example is to use virtual node.

Request routing is an essential part of distributed systems, determining how client requests are directed to the correct server or partition. There are two main strategies for this: direct routing and middleware-based routing. Direct routing lets clients handle the cluster topology themselves, either through hardcoded logic or by receiving updates via heartbeats or communication protocols. Middleware-based routing, on the other hand, uses an intermediary layer, such as Zookeeper or etcd, to handle request routing. This simplifies client logic and dynamically adapts to changes in the cluster.

#### Experience

In my past takeaway backend project, it is based on SpringBoot framework and used the Nginx technology. Nginx has load balance, which can guide the requests to different servers, and it also has reverse proxy, which can guide app request and web request into servers. This is kinds of partition, which can help distribute the request and balance the load. This partition is quite important since it can reduce the response time and improve user experience.

# CHAPTER 7 Transactions

#### Summary

This is a core concept. For example, in a flash sale system, a distributed lock is often necessary. Imagine a scenario where a coupon is shared across multiple servers, but the coupon can only be used once. In such cases, you need to package Read and Write operations into a single atomic transaction to ensure consistency and prevent race conditions. This not only guarantees correctness but also simplifies application logic. 

For the concept of transactions, the focus is primarily at the database level, governed by the ACID principle. ACID ensures reliable processing of database transactions. Atomicity means that multiple operations are treated as a single unit: either all operations succeed, or they all roll back in case of failure. Consistency ensures that the database remains in a valid state both before and after a transaction. Isolation guarantees that each transaction is executed independently, without interference from other concurrent transactions. Lastly, Durability ensures that once a transaction is committed, the changes are permanently stored, even in the event of a system crash or failure.

Transactions provide an abstraction layer for applications, simplifying problem-solving. There are three levels of isolation, and the choice between weaker and stronger isolation levels represents a trade-off between performance and correctness.

Weak isolation includes Read Committed and Repeatable Read. In Read Committed, only committed data can be read, ensuring that no uncommitted or “dirty” data is accessed. Reading uncommitted data, known as “dirty reads,” can lead to errors if the data is later rolled back. To prevent such issues, row-level locks are typically used. So Read Committed ensures no dirty write and no dirty read. However, Read Committed can still lead to Repeatable Read problems, where a transaction observes different states of data at different times. This issue can be addressed using snapshots, where transactions always read old data until they are completed, at which point the new data becomes visible. This approach reflects a form of Multi-Version Concurrency Control (MVCC), which allows multiple versions of data to exist, enabling consistent reads without interfering with ongoing writes. So in summary, the Repeatable Read can solve Non-repleatable read and  prevent Lost update problem.

Strong isolation sacrifices database performance to ensure strict sequential execution of transactions. First approach is literally executing transactions in a serial order. The second approach is Two-Phase Locking (2PL). The third approach is Optimistic Concurrency Control. This strong isolation can handle write skew problem.

#### Experience

Transaction isolation plays a very important role in databases. I have implemented transaction lock management, in which I have designed different read and write lock management strategies for different isolation levels, including lock escalation and other functions. I used Two-Phase Locking (2PL) to ensure transaction isolation. In addition, I also designed a deadlock detection mechanism, e.g., when a deadlock is detected, I abort some transactions to break the ring wait, so as to restore the normal operation of the system. In this process, I have come to realize that the design of transactions is a trade-off between database read/write performance and correctness. This trade-off is essential for efficient and consistent database system design.

# CHAPTER 8 The Trouble with Distributed Systems

#### Summary

There is a concept called a “shared-nothing system.” For example, consider three independent computers in a data center. We can use consensus algorithms like Paxos or Raft to ensure these three computers reach a synchronized state. Another related concept is “quorum,” which refers to the minimum number of nodes in a distributed system that must agree on a decision to proceed. In the context of a shared-nothing system, quorum plays a crucial role in achieving consensus.

The shared-nothing architecture consists of multiple machines that communicate exclusively through a network connection. Since the network is the sole means of communication, it introduces the possibility of network-related issues. For example, if a response is not received, it becomes impossible to determine whether the server is down or the response packet was lost during transmission.

When a node is detected to be failed through heartbeat or gossip, two ways can handle this condition. First, we can apply load balance to drain the traffic away from the failed node. second, if the failed node was a leader, a follower can be promoted to leader to maintain the functionality of the system. 

Another interesting point mentioned in this chapter is the concept of “The Truth Is Defined by the Majority”. Many distributed algorithms rely on a quorum, meaning that a vote needs to achieve the agreement of the majority of all nodes. The remaining nodes will be notified or synchronized through mechanisms like heartbeats. Without applying a quorum, the Split-Brain problem may arise.

The challenges of distributed systems become significantly harder if there is a risk that nodes may “lie” or act maliciously. This is where the Byzantine problem comes into play.

#### Experience

In software system design, distributed systems are often used to carry more request loads, but this also brings many complications. In order to solve these problems, distributed consensus algorithms such as Paxos or Raft can be used to realize system control. In my implementation of Raft, the quorum algorithm is used for leader election, which means that a majority of the nodes need to vote in favor of electing a new leader. the purpose of this design is to avoid the Split-Brain situation, where the cluster is inconsistent due to the creation of multiple leaders. In addition, in the implementation, the leader information is broadcasted to the nodes in the cluster through multicast, and the log is appended to the cluster using append log to ensure consistency. This ensures the correctness of the system even if some nodes have different leaders.

# CHAPTER 9 Consistency and Consensus

#### Summary

To prevent service downtime, multiple servers are typically deployed across different regions, and replicas are distributed across these regions to ensure that even if one server fails, others can continue to function normally. To enhance user experience, a concept called linearizability is often required. Linearizability provides a recency guarantee, meaning that once a write operation is completed, all clients reading from the database must be able to see the most recent value that was written. This ensures that users always interact with the latest state of the data, maintaining consistency and reliability in distributed systems. 

To make sure final consistency despite the latency, we need eventual consistency strategy. So it turns to the CAP theory. In real life, the partition always exists because of the network or the failure of node, so there is trade off in consistency and availibility. So there are 2 systems, CP and AP. The CP system is widely used in bank system, it sacrifices the availbility to ensure the consistency. For Amazon, it uses AP system to response to user quickly.

And this chapter includes consensus algorithm, which includes two-phase commit (2PC). 2PC ensures atomic transaction commit across multiple nodes, meaning that all participating nodes either commit or abort a transaction collectively. It is a coordination protocol commonly used in distributed databases.

#### Experience

I used to build a linearizability kv server,  and must return the latest value. And this server also satisfy the Idempotency. The client will sent request with unique ID, and server will record answers with this ID, so if server received an old request, it will return the latest recorded value. If request ID is larger than recorded, it will search on database to return the latest one, then record this value. Actually this kv-server has the same idea with this chapter, that makes sure of consistency and linearizability.
