# BootCamp

```lua
     +-----------------+
     |      JDK        |
     |  +-----------+  |
     |  |    JRE    |  |  开发工具如编译器（javac）、调试器（jdb）、打包工具（jar）等
     |  | +-------+ |  |
     |  | |  JVM  | |  |  Java 核心类库
     |  | +-------+ |  |
     |  +-----------+  |
     +-----------------+
```

### Syntactical

```java
import java.util.Scanner;
//use Scanner and System.out
nextInt()
//read next input
```

Memory management is automatic with the help of the garbage collector. Developers use `new` for object instantiation, but memory deallocation is handled automatically.

`Arrays.asList(couponEntity)`用于将数组或单个对象转成 `List` 类型的集合

### Datatypes

boolean

Int

byte

char

double

float

int

long

short

null

```java
String myString;
int[] myArray;
myString.length();
myString.charAt(index);
```

#### Final

`final` 含义是这是最终的、不可更改的结果，被 `final` 修饰的变量只能被赋值一次，赋值后不再改变。

#### String

String is Object! is not datatype!!

`==` compare the **same object!** rather than value!

`str1.equals(str2)`

```java
public class StringComparison {
    public static void main(String[] args) {
        String str1 = "hello";
        String str2 = "HELLO";
        String str3 = "world";
        String str4 = new String("hello");

        // 使用 == 运算符
        System.out.println("Using == :");
        System.out.println(str1 == str2); // false
        System.out.println(str1 == str4); // false

        // 使用 equals() 方法
        System.out.println("Using equals() :");
        System.out.println(str1.equals(str2)); // false
        System.out.println(str1.equals(str4)); // true

        // 使用 equalsIgnoreCase() 方法
        System.out.println("Using equalsIgnoreCase() :");
        System.out.println(str1.equalsIgnoreCase(str2)); // true

        // 使用 compareTo() 方法
        System.out.println("Using compareTo() :");
        System.out.println(str1.compareTo(str2)); // 32 (根据Unicode值的差值)
        System.out.println(str1.compareTo(str3)); // -15 (根据Unicode值的差值)

        // 使用 compareToIgnoreCase() 方法
        System.out.println("Using compareToIgnoreCase() :");
        System.out.println(str1.compareToIgnoreCase(str2)); // 0
        System.out.println(str1.compareToIgnoreCase(str3)); // -15
    }
}

```

#### Scanner

```java
import java.util.Scanner;

Scanner scan=new Scanner(System.in);
int a=scan.nextInt();
String c=scan.nextLine();
```

### BufferReader

```java
BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}
reader.close();
```

### Lambda

```java
// 1. 不需要参数，返回值为 5
() -> 5

// 2. 接收一个参数（数字类型），返回其 2 倍的值
x -> 2 * x

// 3. 接受 2 个参数（数字）并返回他们的差值
(x, y) -> x – y

// 4. 接收 2 个 int 类型整数并返回他们的和
(int x, int y) -> x + y

// 5. 接受一个 String 对象并在控制台打印，不返回任何值（看起来像是返回 void）
(String s) -> System.out.print(s)
```

### Data Structures & Collection

`import java.math.BigInteger;`

```java
import java.util.*;
import java.util.ArrayList;
import java.util.List;
import java.util.LinkedList;

static void add() {
    array.add(1);  // 时间复杂度为 O(1) 
    linked.add(1);  // 时间复杂度为 O(1) 
}

static void get() {
    array.get(10);  // 时间复杂度为 O(1) 
    linked.get(10);  // 时间复杂度为 O(11) 
}

static void addIdx() {
    array.add(0, 2);  // 最坏情况下时间复杂度为 O(n)
    linked.add(0, 2);  // 最坏情况下时间复杂度为 O(n)
}

static void size() {
    array.size();  // 时间复杂度为 O(1)
    linked.size();  // 时间复杂度为 O(1)
}


public class test {
    public static void main(String[] args) throws Exception {
        // ArrayList is just like vector in c++
        ArrayList<String> arryList = new ArrayList<>();
        arryList.add("a");
        arryList.add("b");
        fruits.get(0);
		arryList.set(1,"c");
        fruits.remove(0);
        for(String c:arrayList){
            //...
        }
      
        // LinkedList
        LinkedList<String> linkedList = new LinkedList<>();
        linkedList.add("London");
        linkedList.add("Paris");
	
        //TreeMap
        Map<Integer, Integer> cnt = new TreeMap<>();
        Map<Integer, Integer> cnt = new HashMap<>();
        count=cnt.getOrDefault(card, 0);
        cnt.put(count);

        for (Map.Entry<Integer, Integer> entry : cnt.entrySet()) {
            entry.getKey();
            entry.getValue();
        }
        for (int key : cnt.keySet()) {
            cnt.get(key);
        }
        for (int value : cnt.values())
        
        // HashMap
        HashMap<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Alice", 25);
        hashMap.put("Bob", 30);

        // HashSet
        HashSet<String> hashSet = new HashSet<>();
        hashSet.add("Red");
        hashSet.add("Green");

        // Stack
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);

        // Queue
        Queue<Integer> queue = new LinkedList<>();
        queue.add(5);
        queue.add(15);
    
    		Set<Integer> s1=new HashSet<>();
        Set<Integer> s2 = new LinkedHashSet<>();//保持插入顺序的 Set。
      	TreeSet<Integer> s1=new TreeSet<>();
      	TreeSet<Integer> s4 = new TreeSet<>((x, y) -> {return y - x;});  // 降序 
    }

  	static Set<Integer> s1 = new HashSet<>();
    static Set<Integer> s2 = new LinkedHashSet<>();

    static void add() {
        s1.add(1);
    }

    static void contains() {  // 判断 set 中是否有元素值为 2，有则返回 true，否则返回 false 
        s1.contains(2);
    }

    static void test1() {  // s1 与 s2 的并集 
        Set<Integer> res = new HashSet<>();
        res.addAll(s1);
        res.addAll(s2);
    }

    static void test2() {  // s1 与 s2 的交集 
        Set<Integer> res = new HashSet<>();
        res.addAll(s1);
        res.retainAll(s2);
    }

    static void test3() {  // 差集：s1 - s2 
        Set<Integer> res = new HashSet<>();
        res.addAll(s1);
        res.removeAll(s2);
    }
}
```

### Oops Concepts

#### Automatic Memory Management

Java uses automatic memory management through garbage collection. The responsibility of allocating and deallocating memory is handled by the Java Virtual Machine (JVM).

#### Inheritance and Method Overriding

all classes implicitly inherit from the `Object` class, which serves as the root of the class hierarchy. Java supports single inheritance, meaning a class can only inherit from one superclass

#### Interface

一个类不能继承多个类，但一个类可以实现多个接口，这被视为一种多重继承的形式。

```java
public interface MyInterface {
    void method1();
    void method2();
}

public class MyClass implements MyInterface {
    @Override
    public void method1() {
        System.out.println("Method1 implementation");
    }
    
    @Override
    public void method2() {
        System.out.println("Method2 implementation");
    }
}

public class Test {
    public static void main(String[] args) {
        MyInterface myObject = new MyClass();
        myObject.method1(); // 输出 "Method1 implementation"
        myObject.method2(); // 输出 "Method2 implementation"
    }
}
///---------------------------------------------------------------------///
public interface InterfaceA {
    void methodA();
}

public interface InterfaceB {
    void methodB();
}

public class MyClass implements InterfaceA, InterfaceB {
    @Override
    public void methodA() {
        System.out.println("MethodA implementation");
    }
    
    @Override
    public void methodB() {
        System.out.println("MethodB implementation");
    }
}
```

#### Exception Handling

#### Polymorphism and Dynamic Binding

所有的方法（除了 `static` 方法和 `final` 方法）默认都是虚拟方法（virtual methods），即它们在运行时是通过动态绑定来调用的

```java
class Animal {
    void makeSound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.makeSound(); // 输出 "Dog barks"
    }
}
```

**Animal a = new Dog();**: 这行代码创建了一个 `Dog` 对象，但用 `Animal` 类型的引用 `a` 来引用它。

**a.makeSound();**: 由于 `a` 实际上引用的是一个 `Dog` 对象，调用 `makeSound()` 方法时，Java 会在运行时决定调用 `Dog` 类的 `makeSound()` 方法，而不是 `Animal` 类的 `makeSound()` 方法。因此，输出是 "Dog barks"。

**Animal a = new Animal();**: 这会创建一个 `Animal` 对象，`a.makeSound()` 调用的是 `Animal` 类的 `makeSound()` 方法，输出是 "Animal sound"。

**Dog a = new Animal();**: 这种写法在 Java 中是不允许的，因为 `Animal` 是 `Dog` 的父类，不能把父类对象赋值给子类引用。这会导致编译错误。

### Multithreading

```java
public class MultiThreadExample {
    public static void main(String[] args) {
        // 创建并启动第一个线程(use interface Runnable)
        Thread thread1 = new Thread(new MyRunnable(), "Thread 1");
        thread1.start();

        // 创建并启动第二个线程(use extends Threads)
        Thread thread2 = new MyThread("Thread 2");
        thread2.start();
    }

    // 实现 Runnable 接口的类
    static class MyRunnable implements Runnable {
        public void run() {
            System.out.println(Thread.currentThread().getName() + " is running");
        }
    }

    // 继承 Thread 类的子类
    static class MyThread extends Thread {
        public MyThread(String name) {
            super(name);
        }

        public void run() {
            System.out.println(Thread.currentThread().getName() + " is running");
        }
    }
}
```

#### States

including `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING`, and `TERMINATED`

Threads can be assigned priorities ranging from 1 to 10. The default priority is 5

#### interrupt & join

当线程调用 `interrupt` 方法时，如果线程处于阻塞状态（如 `sleep`、`wait`、`join` 等），会抛出 `InterruptedException` 异常，如果线程没有处于阻塞状态，会设置线程的中断标志

```java
public class InterruptExample {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                // 模拟线程执行任务
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                // 捕获到中断异常
                System.out.println("Thread interrupted");
            }
        });

        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
        //thread.join();
    }
}
```

#### Thread Communication

```java
public class ThreadCommunicationExample {
    public static void main(String[] args) {
        Object lock = new Object();
        
        Thread thread1 = new Thread(() -> {
            synchronized (lock) {
                try {
                    System.out.println("Thread 1 waiting");
                    lock.wait();
                    System.out.println("Thread 1 resumed");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread thread2 = new Thread(() -> {
            synchronized (lock) {
                try {
                    System.out.println("Thread 2 starting");
                    Thread.sleep(2000);
                    System.out.println("Thread 2 notifying");
                    lock.notify();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        thread1.start();
        thread2.start();
    }
}
```

# JDBC

![image.png](https://cdn.nlark.com/yuque/0/2021/png/250654/1617635428930-b9a6a9c8-f15d-41d3-abc0-ee634a2a39bd.png?x-oss-process=image%2Fformat%2Cwebp)

1. **连接到数据库**：JDBC 提供了一种标准的方法来连接各种数据库。
2. **执行 SQL 语句**：可以使用 JDBC 执行 SQL 查询、插入、更新和删除操作。
3. **处理结果集**：从数据库中获取查询结果，并在 Java 程序中处理这些数据。
4. **事务管理**：支持数据库事务，允许开发人员控制事务的提交和回滚。

### Connection

`DriverManager`

```java
        Connection connection = DriverManager.getConnection(
          "jdbc:mysql://127.0.0.1:3306/data?user=root&password=123456");
```

`DataSource`

```java
        DataSource dataSource = new UnpooledDataSource(
                "com.mysql.cj.jdbc.Driver",
                "jdbc:mysql://127.0.0.1:3306/data?user=root&password=123456&AllowPublicKeyRetrieval=true",
                "root","qwer1234");
```

### Statement

- Statement 不支持输入参数，有sql注入的风险
- PreparedStatement：增加了设置SQL参数的方法
- CallableStatement：增加了调用存储过程以及检索存储过程调用结果的方法

```java
Connection connection = DriverManager.getConnection("");
String sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
PreparedStatement preparedStatement = connection.prepareStatement(sql);
preparedStatement.setString(1,"username");
preparedStatement.setString(2,"password");
ResultSet resultSet = preparedStatement.executeQuery();

// the function below is like to have risk of sql injection
String sql2 = "SELECT * FROM admin WHERE username = 'username' AND password = 'password'";
Statement statement2 = connection.createStatement();
ResultSet resultSet2 = statement.executeQuery(sql);
```

### Eg Code

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCDemo {
    public static void main(String[] args) {
        // 数据库连接信息
        String jdbcUrl = "jdbc:mysql://localhost:3306/mydatabase";
        String username = "root";
        String password = "password";

        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            // 加载 MySQL 驱动程序
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 获取数据库连接
            connection = DriverManager.getConnection(jdbcUrl, username, password);

            // 创建 Statement 对象
            statement = connection.createStatement();

            // 执行查询
            String sql = "SELECT * FROM users";
            resultSet = statement.executeQuery(sql);

            // 处理结果集
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                System.out.println("ID: " + id + ", Name: " + name + ", Email: " + email);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            try {
                if (resultSet != null) resultSet.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```



# SSM

**Spring**：核心框架，提供依赖注入（Inversion of Control, IoC）和面向切面编程（Aspect-Oriented Programming, AOP）等功能，用于管理整个应用的对象生命周期和事务管理。

**SpringMVC**：Spring 框架中的 MVC 模块，用于构建 Web 应用程序，处理 HTTP 请求并返回响应，遵循 Model-View-Controller 设计模式。

**MyBatis**：一个持久层框架，用于简化与数据库的交互。相比于 Hibernate 等 ORM 框架，MyBatis 提供了更细粒度的 SQL 操作控制，开发者可以编写自己的 SQL 语句。

## Sping

![](./assert/Java_Spring_1.png)

### IOC/DI



### MyBatis

### AOP

### Transaction



## SpringMVC

## Maven

# SpringBoot

# MaBatisPlus

先封装SQL，接着调用JDBC操作数据库，最后把数据库返回的表结果封装成Java类。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/250654/1617635030060-035d7ee6-b901-4e3f-9797-5397c7453508.png?x-oss-process=image%2Fformat%2Cwebp)

# JUC

重点的部分在于：**Synchornized锁升级机制**，**ReentrantLock**，**AQS**，**CAS**，**线程池**

### 并发并行

Concurrency: 统一时间处理多个任务，不断切换任务执行

Parallelism：多个任务统一时间执行（在不同核心上运行），物理上的同时运行



#### Override Run()

( bad extension! since one class can only extend one class! so it only extends Thread and cannot extend other thread!

```java
package org.example;

public class Mythread extends Thread {
    @Override
    public void run(){
        for(int i=0;i<100;i++){
            System.out.println(getName()+"hello");
        }
    }
}
```

#### Override Runnable()

不能直接获得thread类中的方法

这里implements Runnable通过多个线程共享一个 `Runnable` 实例是其典型用法之一

```java
package org.example;

public class MyRun implements Runnable {
    @Override
    public void run() {
        for(int i=0;i<100;i++) {
            Thread t = Thread.currentThread(); 
            System.out.println(t.getName() + "myrun");
        }
    }
}
```

```java
MyRun mr=new MyRun();
Thread t1=new Thread(mr);
Thread t2=new Thread(mr);

t1.setName("1");
t1.setName("2");

t1.start();
t2.start();
```

#### Override Callable() -> can get Result!

```java
import java.util.concurrent.Callable;

public class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception{
        int sum=0;
        for(int i=1;i<100;i++){
            sum+=i;
        }
        return sum;
    }
}
```

# JVM

重点在于：**类加载过程**，**内存分区**，**垃圾回收算法**，**垃圾回收器**

# Java八股

### 单继承限制

**单继承限制**：Java 中一个类只能继承一个类，如果继承了 `Thread`，就无法继承其他类

### Runnable and Callable

`Runnable` 是一个简单的任务接口，适合不需要返回结果或抛出异常的任务。

```java
public interface Runnable{
	void run();
}
```

没有返回值。

不能抛出受检异常（Checked Exception）。

`Callable` 是一个任务接口，适合需要返回结果或抛出异常的任务。

```java
public interface Callable<V> {
    V call() throws Exception;
}
```

execute 提交一个`Runnable`任务

submit 提交一个task返回`Future`， `future.get()` 方法，可以阻塞当前线程并等待任务执行完成，返回结果

# Mysql

Master-Slave Replication

**主库（Master）**：负责处理所有的 **写入（INSERT, UPDATE, DELETE）** 操作，并将数据的变更同步到从库。

**从库（Slave）**：**只读数据库**，从主库接收更新数据，并提供 **查询（SELECT）** 业务，减轻主库压力。

**读写分离**：主库负责写，从库负责读，提升数据库性能。

**数据备份**：主库数据同步到多个从库，防止数据丢失。

**高可用**：主库崩溃时，可以将某个从库提升为主库（故障转移）

# Redis 2025.01.12 

### 穿透

getById/1

根据Id查询文章，如果hit返回res，redis没有查询disk，然后返回结果，返回前也把请求缓存到redis

穿透：redis里没有，disk也没有

* 缓存空数据{key:1,value:null} 消耗内存，可能会数据不一致,(类似于双删延迟)

- 布隆过滤器（hash算法，bitmap）,首先经过bloom filter,拦截不存在的数据, bloom filter存在是不保证的,不存在是一定的

>bitmap
>
>key->multiple hash function->hash1, hash2, hash3, then turn these position into 1, use  & to judge
>
>Redisson, Guava: implementation 
>
>```java
>bloomfilter.tryInit(size,0.05);//误判率
>```

### 击穿

热点key设置过期时间,然后并发的request会把DB打崩

![](./Java/redis1.png)

* 互斥锁 (强一致性)
* 逻辑过期  key过期了只有在查询的时候返回old value,然后异步更新

### 雪崩

统一时间大量key同时失效或者redis宕机

给不同key的TTL设置随机值

redis集群(Sentinel,集群模式)

降级限流策略 nginx或者spring cloud gateway

添加多级缓存 Guava或Caffeine

>  没有什么问题是加一层解决不了的

### 双写一致

双写一致:修改了数据库同时也更新缓存数据,让redis和db数据一致

延迟双删->delete redis->change disk-> delay->delete redis

有脏数据的风险

要**强一致性**就加分布式锁,性能就低了

要性能好点就+RWLock

```java
RReadWriteLock readWriteLock = redissonClient.getReadWriteLock("ITEM_READ_WRITE_LOCK");
RLock writeLock = readWriteLock.writeLock();
RLock readLock = readWriteLock.readLock();
try{
	writeLock.lock(); // 加锁
}
```

![](./Java/redis2.png)

**最终一致性**

允许短暂不一致,保证最终一致性

异步通知,MQ或者Canal中间件 的方式

### 持久化

#### RDB 

Redis Database Backup file (redis数据快照)

```
redis-cli
save
bgsave #子进程来执行RDB
```

redis.conf

```
save 900 1 #900s里1key修改就bgsave
```

![](./Java/redis3.png)

只拷贝**Page table**所以快

如果RDB的时候有写怎么办,就直接copy-on-write,就是复制出来再修改

连次RDB之间可能会丢失备份(如果宕机了) ,二进制文件,体积小,恢复快,可能丢数据

### AOF

Append only file

redis处理每一个write都记录在AOF

```
appendonly yes
appendfsync everysec #性能适中,最多丟1s数据
```

cpu资源占用低,主要是磁盘的IO资源,但是AOF重写会占用大量的CPU和内存

宕机恢复速度慢

### 数据过期，淘汰策略

Lazy Deletion 只有在**访问键**时，Redis 才会检查它是否过期

Scheduled Deletion  每 **100ms** 扫描一批设置了**过期时间**的 key，随机选择一些进行检查和删除

Eviction Policy 当 Redis **内存达到上限**时，Redis 需要**主动清理**数据

> **`volatile-lru`**（默认）：从**设置了过期时间的 key** 中，**淘汰最久未使用的 key**。
>
> **`volatile-ttl`**：从设置了过期时间的 key 中，优先淘汰**即将过期**的 key。
>
> **`allkeys-lru`**：对**所有 key**，淘汰最久未使用的 key（即使没有过期时间）。
>
> **`noeviction`**：内存满了后，直接返回错误，不删除任何 key。

**Lazy Expiration** 高并发热点 key，防止缓存击穿,Redis 不会删除数据

### 分布式锁

setnx

redisson

场景:集群定时任务,抢单,幂等性

```java
Integer num=(Integer) redisTemplate.opsForValue().get("num");
if(num==null || num<0){
    throw new RuntimeException
}
num=num-1;
redisTemplate.opsForValue().set("num",num);
```

超卖问题

加锁 synchronized() **线程同步**，防止多个线程同时访问 **同一个对象** 造成数据不一致的问题。这个单体是没问题的,但是集群就不行了

```java
synchronized(this){

}
```

**`this` 代表当前对象**

- 用于 **实例方法、构造方法** 里，指向 **当前对象**。
- `this.name = name;` 避免变量冲突

#### setnx

```
SET lock value NX EX 10 #放在一起保证原子性,这里NX互斥,EX超时
DEL key #释放锁 
```

加锁有EX时长,如果业务执行太长超过lock EX time

#### Redisson

1 **WatchDog**,有一个thread进行监控,如果业务太久就增加setnx时长

**Redisson 会自动续期**，不需要手动增加 `SETNX` 过期时间

**默认 30 秒持有锁，每 10 秒自动续期**，只要任务没有完成，锁就不会被释放,每ReleaseTime/3做一次续期

手动释放锁,通知Watch Dog

![](./Java/redis4.png)

2 **重试机制,尝试等待,高并发增加分布式锁的使用性能**

```java
RLock lock = redissonClint.getLock("a");
boolen isLock=lock.tryLock(10,TimeUnit.SECONDS); //while time =10 s
if(isLock){
    try{
        
    }finally{
        lock.unlock();
    }
}
//boolen isLock=lock.tryLock(10,30,TimeUnit.SECONDS); //30 is EX time, 30设置了就没有watch dog的监听了,不设置过期时间就是默认有watch Dog做续期
```

3 **加锁 设置过期时间等redisson命令都是lua脚本完成,保证执行的原子性**

> 在 Redis 中，分布式锁的核心操作是：
>
> 1. **加锁**（SETNX）
> 2. **设置过期时间**（EXPIRE）
> 3. **解锁**（DEL）
>
> 如果我们**直接用普通命令实现加锁**：
>
> ```
> bashCopyEditSETNX myLock "thread-1"  # 尝试加锁
> EXPIRE myLock 10          # 设置超时时间
> ```
>
>  **问题：这两个命令是分开的，存在并发安全问题！**
>
> - 如果 **在 `SETNX` 和 `EXPIRE` 之间** 发生 **线程崩溃** 或 **服务器宕机**，锁 **可能永远不会过期**（**死锁问题**）。
> - **多个客户端可能同时加锁**，导致多个实例误认为自己持有锁。
>
> **✅ 解决方案：使用 Lua 脚本，一次性完成加锁 + 过期时间，保证原子性！**

### 锁的重入（Reentrant Locking）

同一个线程在持有锁的情况下，可以再次获取该锁，而不会发生死锁

redisson实现的锁是可以重入的

hash结构记录,key=thread id,value=reentrant times

主从一致性
Redis Master, Redis Slave,主从同步,为了防止Master加锁后down了,然后Slave变成Master后再加锁的情况:

RedLock:不止在一个redis实例上加锁,而是在多个redis实例上创建锁(n/2+1)  但是很少用,性能差 

为了保持数据强一致性,使用zookeeper实现的分布式锁 

### 集群方案

主从复制

哨兵模式 (可以解决高可用,高并发读问题)

监控Master Slave的正常工作,Master故障就Slave升Master,通知redis cli端

heartbeat监控,主观下线,过半数Quorum就客观下线

分片集群 (可以解决海量数据存储,高并发写问题)

**多个master**,每个master存不同数据,有自己的slave,master之间互相监控ping

client可以访问任意master,都会被转发到正确节点

通过hash来分流

### 为什么Redis单线程怎么快

内存,单线程不用上下文切换可竞争条件,多线程要线程安全

I/O多路复用,非阻塞IO 

Redis瓶颈是网络延迟, I/O多路服用高效网络请求

* User Space & Kernel Space
* Blocking IO, Nonblocking IO, IO Multiplexing

![](./Java/redis5.png)

select

poll

好了就发signal,然后kernel论询查哪个fd好了

epoll

`epoll` **告诉用户进程具体哪个 socket（fd）变成可读/可写**

性能影响IO diskIO,socketIO多线程
