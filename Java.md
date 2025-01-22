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

# Mysql 2025.1.19

Master-Slave Replication

**主库（Master）**：负责处理所有的 **写入（INSERT, UPDATE, DELETE）** 操作，并将数据的变更同步到从库。

**从库（Slave）**：**只读数据库**，从主库接收更新数据，并提供 **查询（SELECT）** 业务，减轻主库压力。

**读写分离**：主库负责写，从库负责读，提升数据库性能。

**数据备份**：主库数据同步到多个从库，防止数据丢失。

**高可用**：主库崩溃时，可以将某个从库提升为主库（故障转移）

### 定位慢查询

**多表查询** 这个有

聚合查询

表数据过大查询

深度分页查询

表象:页面加载慢,接口压测响应时间过长超过1s

Arthas

Prometheus, Skywalking 接口响应时间+追踪

Mysql自带慢日志查询(我也没用过) `/etc/mysql/my.cnf`

```shell
slow_query_log=1
long_query_time=2
#/var/lib/mysql/localhost-slow.log
```

首先回答场景:比如当时接口测试压测结果很慢5s,用MySQL慢日志查询,检测出sql里超过2s的日志(在调试阶段),dev时不用慢日志查询

### 如何优化

**多表查询**  : 优化sql语句

聚合查询  : 优化sql语句,临时表

表数据过大查询: 添加index

深度分页查询

分析sql的执行计划

**EXPLAIN** DESC获取mysql查询信息

key,key_len检查是否索引命中,也就是是否利用到了index

```shell
#Extra建议
Using where; Using Index #不需要回表,索引列都能找到
Using index condition #查找使用了索引,需要table lookup
#type sql连接类新
system #查询的内置表
const #primary key查询
eq_ref #primary 或者唯一索引查询,只能返回一条数据
ref #其他索引查询,比如查name,可能返回多个
range #范围查询
index #索引树扫
all #全盘扫
```

### 回表查询Table Lookup

查询数据时，先通过 **索引** 查找 **主键 ID**，然后再通过 **主键索引（Clustered Index）** 获取完整的数据行。这通常发生在 **非聚簇索引（Secondary Index）** 查询

### Index

B+树利于扫库+区间查询

叶子节点天然形成双向链表，顺序扫描更高效

 **磁盘 I/O 访问次数少**,因为按照page存取16KB

Mysql底层的innoDB采用的B+树,路径短,disk读取代价低

### Cluster Index

Primary key

没Primary key就用地一个Unique的Index

没有Unique的index, innoDB就会生成一个rowid作为隐藏的cluster index

### 覆盖索引

- 查询使用了索引，并需要返回的列，在该索引中已经全部能够找到（不需要回表查询）

 ```sql
 #当id、name创建了索引，id为主键
 select * from user where id = 1; 
 #是覆盖索引，聚集索引中包含id
 select id, name from user where name = 'jack'; 
 #是覆盖索引，二级索引中包含id，且name是索引
 select id, name, gender from user where name = 'jack'; 
 #是覆盖索引，二级索引中包含id，且name是索引,但是没有gender,需要回表查询
 ```

如果返回列中没有创建索引,可能会触发table lookup,尽量避免select *

用id查询直接cluster index查询,性能好

### MySQL超大分页处理

- 当数据量特别大，limit分页查询，需要进行排序，效率低
- 解决：覆盖索引+子查询

```sql
select * from tb limit 900000,10;
#查询900010个返回900000-900010的数据, sort代价高

select * from tb t,
(select id from tb order by id limit 900000,10) a
where t.id=a.id
```

先找id,然后再从id查询过滤

**先用索引查找 `id`（子查询）**

```sql
SELECT id FROM tb ORDER BY id LIMIT 900000,10;
```

- 由于 `id` 是 **索引字段**，MySQL 只需要 **遍历索引 B+ 树**，可以 **快速跳过前 900000 条数据**。
- **索引查找是 O(log N)，比 O(N) 全表扫描快很多**。

**再用 `JOIN` 进行回表查询（避免大范围回表）**

```sql
WHERE t.id = a.id;
```

- 由于 `id` 是索引，**只查询 10 行数据，不会进行大规模回表**。
- **相比直接 `LIMIT 900000, 10`，可以避免大量数据扫描**

### 创建索引

- 表数据量大，查询频繁，可以给表创建索引（单表超过10万条）
- 字段常被用于条件、排序、分组，创建索引
- 使用联合索引（复合索引），避免回表
- 控制索引数量

```sql
show index from tb;
#有多个column name的key name相同就是Composite Index
```

### Composite Index

**普通索引** 只针对 **单个字段**（如 `INDEX idx_name(name)`）。

**联合索引** 可以在 **多个字段** 上建立索引（如 `INDEX idx_name_age(name, age)`），查询时可以**同时利用**索引，提高查询效率。

联合索引的 **查询生效规则** 受 **最左前缀匹配原则（Leftmost Prefix Matching Rule）**

```sql
CREATE INDEX idx_name_age_city ON users (name, age, city);
(name)
(name, age)
(name, age, city)
SELECT * FROM users WHERE name = 'Tom';  -- ✅ 使用索引
SELECT * FROM users WHERE name = 'Tom' AND age = 25;  -- ✅ 使用索引
SELECT * FROM users WHERE name = 'Tom' AND age = 25 AND city = 'New York';  -- ✅ 使用索引
SELECT * FROM users WHERE age = 25;  -- ❌ 不能使用 (name, age, city) 索引
SELECT * FROM users WHERE age = 25 AND city = 'New York';  -- ❌ 因为跳过了 name，索引无法生效
SELECT * FROM users WHERE name = 'Tom' city = 'New York';  -- ❌ 只查name,city的索引失效
```

如果查询 age 和 city，需要额外创建索引 `INDEX idx_age_city(age, city);`

### 多个索引如何存储

**多个索引** 时，MySQL 为每个索引 **创建一棵独立的 B+ 树**

**主键索引（聚簇索引）**：完整数据行存储在叶子节点

**每个二级索引（非聚簇索引）**：叶子节点存储 **索引列值 + 主键 ID**

MySQL 的 **索引和数据主要存储在磁盘（Disk）**，但 **查询时会加载部分索引和数据到内存（Memory）**，以提高性能。

索引在 **内存和磁盘之间的存储机制** 受 **InnoDB 缓冲池（Buffer Pool）**

内存缓存（**Memory - Buffer Pool**）

**MySQL 在查询时，不会每次都去磁盘，而是会把部分索引页和数据页加载到内存**，存储在 **InnoDB Buffer Pool**。

**B+ 树的内部节点（非叶子节点）会尽可能加载到内存**，这样查询时可以**快速查找到叶子节点**。

### 索引什么时候失效

其实并没有遇到过 :(

使用explain在sql前判断是否索引失效

- 联合索引，违反最左前缀原则

- 范围查询右边的列，不能使用索引

  - ```sql
    select * from tb where name='a' and status>'1' and address = 'b';
    #这里的status是范围查询,右边的address Miss
    ```

- 不要在索引列上进行运算操作

- 字符串不加单引号（数字类型与String类型的 ‘0’）

- 以百分号%开头like模糊查询，索引失效

可以用Explain来查看sql是否有index miss的情况

### SQL优化

表设计优化->阿里开发手册

- 避免使用select *
- 避免索引失效写法
- 用union all代替union，union会多一次过滤，效率低 (union去掉重复)
- 避免在where字句中对字段进行表达式操作（可能索引失效
- join优化,能inner join就不要left join和right join,如必须就要小表为驱动, inner join会把小表放外面,大表放里

### 事务特性（ACID）

原子性（Atomicity）：事务是不可分割的最小操作单元，要么全部完成，要么全部失败

一致性（Consistency）：事务完成时，必须使所有数据都保持一致

隔离性（Isolation）：允许并发事务同时对其数据进行读写和修改的能力， 隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。

持久性（Durability）：事务处理结束后，对数据的修改就是永久的

### Isolation level

读未提交（Read uncommitted）

读提交（read committed） Oracle默认的隔离级别,解决脏读：读到事务没提交的数据

可重复读（repeatable read） MySQL默认的隔离级别,解决不可重复读：事务读取同一条数据，读取数据不同

串行化（Serializable）表级锁，读写都加锁，效率低下,安全性高,不能并发。解决幻读：查询时没有数据，插入时发现已经存在，好像出现幻觉

### WAL write ahead log

flush dirty page 的时候,发生错误宕机,redo log数据恢复,保证持久性

undo log记录修改前数据 (logistic log),就是 insert时,undo log就delete,记录一个相反的日志,undo log可以roll back,保证transaction的原子性和一致性

### MySQL主从同步

Binlog日志,DDL和DML都记录,不包含查询操作

Master 写binlog ->被Slave的IOthread读到,更新Relay log,再SQL thread去执行



binlog是MySql的日志，redolog和undolog是InnoDB的日志

### 分库分表 Sharding & Partitioning

没用过,但是有了解过20G,100W以上

#### Vertical Partitioning 

按不同业务拆库

把一个大表按照字段进行拆分：

- `user_basic_info`（id, name, age）
- `user_contact_info`（id, email, phone）

表中部分字段访问频率高，部分字段访问频率低

避免宽表导致的性能问题（单行数据过大）

#### Sharding 水平 

分表

```
user_0 (id: 1-99999)
user_1 (id: 100000-199999)
user_2 (id: 200000-299999)
```

将数据分布到不同的数据库中：

```
db1.user_0, db1.user_1
db2.user_2, db2.user_3
```

分布式事务一致性,跨节点关联查询,跨节点分页,排序,主键啥的,加一层中间件Middleware,比如sharding,没有什么是加一层middleware不能解决的哈哈哈哈

### MVCC

事务隔离性->lock锁 or MVCC

隐藏字段，undo log日志，readView读视图

- 隐藏字段是指：在mysql中给每个表都设置了隐藏字段，有一个是trx_id(事务id)，记录每一次操作的事务id，是自增的；另一个字段是roll_pointer(回滚指针)，指向上一个版本的事务版本记录地址
- undo log主要的作用是记录回滚日志，存储老版本数据，在内部会形成一个版本链，在多个事务并行操作某一行记录，记录不同事务修改数据的版本，通过roll_pointer指针形成一个链表 (事务提交后可被立即删除)
- readView解决的是一个事务查询选择版本的问题，在内部定义了一些匹配规则和当前的一些事务id判断该访问那个版本的数据，不同的隔离级别**快照读** Snapshot Read是不一样的，最终的访问的结果不一样。如果是rc隔离级别，每一次执行快照读时生成ReadView，如果是rr隔离级别仅在事务中第一次执行快照读时生成ReadView，后续复用. Current Read当前读就是加锁的到最新版本

ReadView访问规则

![](./Java/mysql1.png)

# frame 2025.1.20

### Spring的bean是Singleton

bean是否为单例，主要看其作用域。Spring的bean默认情况下是单例的。

prototype:一个bean的定义里可以有多个实例

单例bean是线程安全的吗? 不是thread safe的!

> 无状态（Stateless）Bean 是指不存储实例变量（成员变量）或持久化数据的 Bean, Bean则是线程安全的
>
> 有状态的，那么Bean则不是线程安全的,有状态就是有可变的状态,比如Service类和DAO类
>
> 一个bean就是一个对象,在个对象类里不应该有成员变量(无状态)

UserController 类默认是由 Spring 容器管理的单例 Bean（由于 @Controller 注解）因此，多个请求可能会同时访问 getById 方法。

### AOP (我用过操作日志,比如对一个数据库操作添加时间,注册时间)

**增强（Advice）** 指的是在 **不修改原始代码的情况下，为方法增加额外的功能**

**AOP 的底层使用了动态代理(jdk default,cglib)，而动态代理本质上依赖于反射**

**在特定位置切入自己的逻辑**，从而**简化代码、增强功能、减少重复**

- 面向切面编程，将与业务无关，可重用的模块抽取出来，做统一处理
- 使用场景：记录操作日志、缓存处理、spring中内置事务处理

在**所有方法执行前后**自动记录日志

在**某些方法调用时**进行权限验证

在**异常抛出时**进行统一处理

`/aop/SysAspect`

```java
@Component
@Aspect //切面类

//切点找的这个注解,如果有在个注解com.hychen.annotation.Log,就进入下面的around
@Pointcut("@annotation(com.hychen.annotation.Log)")
private void pointCut(){
    
}

public Object around(ProceedingJoinPoint joinPoint){
    //获取被增强的类和方法的信息
    Signature signature = joinPoint.getSignature();
    MethodSignature methodSignature.getMethod();
    //获取被增强的类的function
    Method method=methodSignature.getMethod();
}
```

我在controller里的`public User getById`加了一个 `@Log("11")`

### transaction实现本质是AOP

方法前开启trx,执行后关闭提交or回滚trx

声明式

```java
@Around("pointcut()")
public Object around(Proceeding.JoinPoint joinPoint) throws Throwable{
    try{
        //init a transaction
    	System.out.println("方法执行前...");
        Object proceed=joinPoint.proceed(); //继续执行被AOP切面拦截的方法
        System.out.println("方法执行后...");
        //commit transaction
        return proceed;
    }catch(Exception e){
        e.printStackTrace();
        // roll back
        return null;
    }
}
```

`@Around`**就是把被切的方法“包裹”起来**，在它**执行前后都能插入代码**，相当于“拦截器”或“包装器（Wrapper）”

```java
public class UserService {
    @Log  // 被 AOP 切入的注解
    public String getUser(String name) {
        System.out.println("执行 getUser 方法");
        return "Hello, " + name;
    }
}
```

```
方法执行前...
执行 getUser 方法
方法执行后...
```

### 事务失效场景

#### try catch

**事务（Transaction）中不能 `try-catch` 直接吞掉异常，必须抛出**

在 Spring 事务管理（`@Transactional`）中，有一个**重要的原则**：

- **如果方法内部 `try-catch` 处理了异常，并且不往外抛出，事务不会回滚！**
- **事务管理默认只有** **`RuntimeException`（非受检异常）和 `Error`** **才会触发回滚**，而**`checked Exception`（受检异常）默认不会回滚**。

**Spring 事务在方法调用前**，开启事务（默认是 `Connection.setAutoCommit(false)`）。

**方法执行过程中**，如果抛出了 `RuntimeException` 或 `Error`，Spring 事务管理会**捕获异常，并触发回滚**（`Connection.rollback()`）。

**如果方法正常执行完毕**，Spring 事务会**提交事务**（`Connection.commit()`）。

**如果方法内部 `try-catch` 捕获了异常**，Spring 事务管理**认为方法执行成功，不会回滚事务**。

1. **`try` 块中如果没有异常**，整个 `try` 代码执行完后，`catch` 不会执行，直接进入 `finally`。
2. **`try` 块中如果发生异常**，**立即跳到 `catch`**，`try` 里面异常之后的代码不会执行。
3. **`finally` 块一定会执行**，无论 `try` 还是 `catch` 发生了什么（除非 `System.exit(0)` 终止 JVM）。

#### throw exception

roll back只捕获抛出的`RuntimeException` 异常

**检查异常（`Checked Exception`，如 `IOException`, `SQLException`）不会触发回滚**，除非手动指定 `rollbackFor`

```java
@Transactional(rollbackFor=Exception.class)
//只要是异常都回滚
```

#### non public

本质上都是通过反射，什么情况下会让反射失效就会让这个事务失效

Spring为方法创建代理、添加事务通知，前提是public的 

解决：改为public方法

### Bean 生命周期

![](./Java/frame1.png)

### `@Component & @ComponentScan` 

**标记一个类为 Spring 组件（Bean）**

**交给 Spring 容器管理**

**可以在其他地方（如 `@Autowired`）直接使用**

**支持自动扫描（`@ComponentScan`）**

`@SpringBootApplication` 内部包含 `@ComponentScan`，会自动扫描 **同级及以下所有包** 里的 `@Component` 类。

或者可以手动指定扫描路径`@ComponentScan("com.example.service")`, 这样 Spring 只会扫描 `com.example.service` 目录下的 `@Component`

`@Component` 创建的 Bean 可以被 `@Autowired` 注入

这里@Bean就是手动注册,Spring不会自动扫描,而是调用 `userService()` 方法创建 Bean

```java
@Configuration
public class AppConfig {
    @Bean
    public UserService userService() {
        return new UserService();
    }
}
```

而@Component自动扫描

### `@Configuration`

**用于定义 Spring Bean**（结合 `@Bean`）

**代替 XML 配置文件**（Spring 以前用 `applicationContext.xml`）

**Spring Boot 允许自动扫描和加载配置**

### @Controller

处理 Web 请求（MVC）

❌ 需要手动 `@ResponseBody`

```java
@Controller
public class UserController {
    @GetMapping("/hello")
    @ResponseBody  // 需要手动加，否则返回的是视图
    public String hello() {
        return "Hello, Spring!";
    }
}
```

@Controller public class UserController {    @GetMapping("/hello")    @ResponseBody  // 需要手动加，否则返回的是视图    public String hello() {        return "Hello, Spring!";    } }

### @RestController

`@Controller + @ResponseBody`

✅ 默认返回 JSON

`@Component`**通用组件**标记为 Spring 组件，默认被扫描（如果需要 `@Bean`）

`@Service`  **Service 层**  业务逻辑类，语义清晰

`@Repository`**DAO 层**数据访问层，异常转换

`@Controller`**Web 层**处理 HTTP 请求 

**Web 层用 `@RestController`**（如果是 JSON API）

### Reflection

`method.invoke()`是反射的核心

```java
UserService userService = new UserService();
userService.getUser();  // 直接调用方法
```

但如果方法名在运行时才确定（比如**AOP、动态代理、框架**等场景），我们可以用 **反射**：

```java
Method method = UserService.class.getMethod("getUser");
method.invoke(userService); // 运行时调用 getUser() 方法
```

**`Method.invoke()` 允许我们动态调用方法，而不需要在编译时写死方法名！**

![](./Java/frame2.png)

### 循环引用 Circular Dependency

A init成半成品,需要B对象,去IOC里找对象,没有B就initB,B要A,但是没有A就循环了

![](./Java/frame3.png)

![](./Java/frame4.png)

### 代理对象->三级缓存 解决set方法的注入依赖 (三级还不了解)

set是初始化好了后依赖注入(这之后都能解决)

构造函数的循环依赖,这里缓存没法解决 (延迟加载 @Lazy), 什么时候需要对象再进行bean对象的创建

```java
public A(B b){}
public B(A a){}

public A(@Lazy B b){}
public B(@Lazy A a){}
```

### MVC流程

springmvc的核心：dispatcherServlet

![](./Java/frame5.png)

![](./Java/frame6.png)

![](./Java/frame7.png)

用@RestController 可以不用加 @ResponseBody

### SpringBoot自动配置原理

`@Component` 只是一个**普通组件（Bean）**，被 `@ComponentScan` 发现并注册到 Spring 容器中。

`@Configuration` 是一个**特殊的 `@Component`，用于定义 Bean**，并且可以确保 `@Bean` 方法的**单例性**。

为什么 `@Configuration` 可以保证 `@Bean` 方法返回的是单例？

Spring 通过 **CGLIB 代理**增强 `@Configuration`，保证 `@Bean` 方法只会执行一次，并返回同一个 Bean 实例。

`@SpringBootApplication`中有一个`@EnableAutoConfiguration`注解,里面通过`@Import`注解导入相关配置选择器, 里面有`@ConditionalOnClass` 查看是否有对应的class文件,有就加载,把config的所有Bean加入Spring容器里

![](./Java/frame8.png)

### Annotation

#### Spring

![](./Java/frame9.png)

![](./Java/frame10.png)

**`@Controller`**：标注在类上，表示这个类是一个控制器，Spring MVC 会解析它。

**`@ResponseBody`**：标注在方法上，表示**方法返回的对象会被自动转换为 JSON 或 XML，而不是返回视图页面**。

**`@RestController`**：是 `@Controller` 和 `@ResponseBody` 的组合，作用于整个类，使所有方法默认都返回 JSON（无需额外加 `@ResponseBody`）。

`@Controller` 的核心作用

**用于处理 HTTP 请求**（如 GET/POST 请求）

**返回 HTML 视图（如 `thymeleaf`、`JSP`、`freemarker`）**

**通常用于 MVC 模式的 Web 应用**

**配合 `ModelAndView` 或 `Model` 传递数据到视图层**

`@Controller` 默认解析的是**视图名**，所以如果返回字符串 `"hello"`，Spring 会认为要跳转到 `hello.html` 页面，而不是返回 JSON。

![](./Java/frame11.png)

### MyBatis

这块还不是很懂,等二刷

![](./Java/frame12.png)

创建完Session后执行SQL查询

使用 Mapper 接口

```java
public interface UserMapper{
    User selectUserById(int id);
    List<User> selectAllUsers();
}

UserMapper mapper = session.getMapper(UserMapper.class);
User user=mapper.selectUserById(1);
```

解析 SQL 语句

XML 映射文件

```xml
<mapper namespace="com.example.mapper.UserMapper">
    <select id="selectUserById" parameterType="int" resultType="com.example.model.User">
        SELECT * FROM users WHERE id = #{id}
    </select>
</mapper>
```

使用注解

```java
public interface UserMapper {
    @Select("SELECT * FROM users WHERE id = #{id}")
    User selectUserById(int id);
}
```

`#{}` 表示 **预编译参数**（防止 SQL 注入）。

MyBatis 在执行前会把 `#{}` 替换为 `?` 并绑定参数。

```
User user = mapper.selectUserById(1);

SELECT * FROM users WHERE id = ? 
```

### Interceptor

请求处理的不同阶段（如控制器处理请求前、请求后、视图渲染后等）执行一些逻辑

**请求预处理**

- 在请求到达控制器之前，可以对请求进行检查或修改。
- 例如：
  - 用户权限验证（判断用户是否已登录，是否有权限访问特定资源）。
  - 检查请求参数的合法性。
  - 设置特定的上下文信息（如用户信息、追踪 ID）。
  - 日志记录，例如记录请求的 URL、请求时间等。

**请求后处理**

- 在控制器处理完请求后，返回视图之前，执行特定逻辑。
- 例如：
  - 修改响应内容或附加信息。
  - 记录操作日志或处理统计数据。
  - 清理线程上下文中的信息，防止内存泄漏。

**视图渲染后处理**

- 在视图渲染完成后，通常用来进行资源清理等操作。
- 例如：
  - 清除缓存或关闭打开的资源。
  - 记录整个请求的耗时。

拦截器可以通过实现 `HandlerInterceptor` 接口来定义。它提供了以下三个方法：

```java
public interface HandlerInterceptor {
    // 在请求进入 Controller 之前执行，返回 false 则请求中断
    boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler);

    // 在 Controller 执行完成后，尚未返回视图时执行
    void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView);

    // 在请求完成（视图渲染完成）后执行
    void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex);
}
```

**注册拦截器** 为了使拦截器生效，需要将其注册到拦截链中。通过实现 `WebMvcConfigurer` 接口的 `addInterceptors` 方法可以注册拦截器，同时可以配置哪些路径需要拦截，哪些路径排除。

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyInterceptor())
                .addPathPatterns("/**")        // 拦截所有路径
                .excludePathPatterns("/login", "/error"); // 排除登录和错误页面
    }
}
```

定义一个简单的拦截器：

```java
public class MyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 判断用户是否已登录
        if (request.getSession().getAttribute("user") == null) {
            response.sendRedirect("/login");
            return false; // 中断请求
        }
        return true; // 放行请求
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
        // 可以在这里修改 ModelAndView，例如添加额外的全局信息
        System.out.println("postHandle: 请求处理完成");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        System.out.println("afterCompletion: 请求完成，清理资源");
    }
}
```

拦截器
```java
implements HandlerInterceptor  //继承拦截器
boolean preHandle(){}		//重写方法，返回true放行；返回false拦截

implements WebMvcConfigurer		//配置，注册拦截器
void addInterceptors         //重写方法，可添加排除拦截的路径
```

Spring MVC 的拦截器（Interceptor）通常是先创建一个拦截器类（实现 `HandlerInterceptor` 接口），然后再通过 `WebMvcConfigurer` 进行注册，使其生效

### SpringCloud

- 注册中心/配置中心 Nacos
- 服务网关 Gateway
- 负载均衡 Ribbon
- 服务调用 Feign
- 服务保护 Sentinel

zookeeper 是cp（一致性、分区容错）、redis是ap（可用性和分区容错）ca（不能同时实现）所以有一个最终一致性和强一致性的问题  