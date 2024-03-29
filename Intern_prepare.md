# C++

```c++
#include<bits/stdc++.h>
std::copy(src.begin(),src.end(),target.begin());//terget cap must larger than src!! else error!
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

I/O多路复用允许程序监视多个文件描述符（FD），等待一个或多个FD成为“准备就绪”状态，从而执行非阻塞I/O操作。这些技术常用于实现高性能的网络服务器

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

这里分配新页是kalloc()，释放页是kfree()，并且要多一个flag来标记PTE_COW，这里在kalloc完了后memmove完了后要kfree掉旧的地址

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

# Volatile

在多线程编程中，`volatile`关键字是一种变量修饰符，用于告诉编译器该变量的值可能会被多个线程同时访问和修改，因此在每次使用时都需要直接从**内存**中读取它的值，而不是使用**缓存**中的值



# Soft Link



# Cache Ring



# mmap & mumap

在`mmap`用于访问设备内存（例如，通过PCIe连接的硬件设备）时，DMA可以发挥作用

# Wound-Wait

**Wound**（伤害）: 如果请求资源的进程具有较早的时间戳（即较高的优先级），那么持有资源的进程将被“伤害”，这意味着持有资源的进程需要释放资源并回滚其操作。然后，资源将被分配给请求资源的进程。

**Wait**（等待）: 如果请求资源的进程具有较晚的时间戳（即较低的优先级），那么它将被迫等待，直到资源变为可用。





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
