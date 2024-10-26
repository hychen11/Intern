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

## SpringBoot

## MaBatisPlus

先封装SQL，接着调用JDBC操作数据库，最后把数据库返回的表结果封装成Java类。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/250654/1617635030060-035d7ee6-b901-4e3f-9797-5397c7453508.png?x-oss-process=image%2Fformat%2Cwebp)

# JUC

Concurrency: 统一时间处理多个任务

Parallelism：多个任务统一时间执行（在不同核心上运行）

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

