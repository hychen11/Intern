# C++函数指针

它存储了函数的地址，可以用来间接调用函数，可以用来实现回调函数

```c++
int (*funcPtr)(int, int);  // 声明一个指向函数的指针，该函数接受两个int参数并返回int
```

```c++
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }

funcPtr = add;      // 指向add函数
funcPtr = &subtract; // 也可以使用取地址运算符，两种形式等价


int result1 = funcPtr(3, 4);  // 调用subtract(3, 4)
int result2 = (*funcPtr)(3, 4); // 另一种调用方式


void (*task)()=functionCall;//正确初始化
task();
```



# ThreadPool

```c++
using TaskFuncion = std::function<void()>;

class TaskQueue{
private:
  std::mutex mtx;
	std::condition_variable condition;
  std::list<TaskFunction> tasks;
  bool flag;
  std::thread worker;
public:
  TaskQueue():flag(true){
    worker=std::thread([this](){
      while(true){
        TaskFuction task;
        {
          std::unique_lock<std:mutex> lock(mtx);
          cond.wait(lock,[this](){return !flag||!tasks.empty();});
          if (!flag && tasks.empty()) break;
          task = tasks.front();
          tasks.pop_front();
        }
      }
      task();
    });
  }
  bool Enqueue(TaskFunction func) {
      std::unique_lock<std::mutex> lock(mtx);
      if (!flag) return false;
      tasks.push_back(func);
      cond.notify_one();
      return true;
  }
  void Stop() {
      {
          std::unique_lock<std::mutex> lock(mtx);
          flag = false;
      }
      cond.notify_all();
      if (worker.joinable()) worker.join();
  }

};	
```

lambda 表达式

```
[capture](params) { body }
```

#### `[this]` 是 **capture list（捕获列表）**：

- 表示**把当前对象的 `this` 指针捕获进 lambda 内部**。
- 这样 lambda 就可以访问当前类的成员变量和函数。

####  `()` 是参数列表（这里没有参数）：

- 意味着这个 lambda 不接受任何参数。

#### `{ ... }` 是函数体：

- 就是你线程要执行的具体逻辑代码。

# Stream

# **Domain-Driven Design** 架构

| 维度       | 传统 MVC                               | DDD                                                  |
| ---------- | -------------------------------------- | ---------------------------------------------------- |
| 模型定位   | `Model` 仅是数据结构（POJO）           | 领域模型有行为、有规则                               |
| 分层方式   | 技术驱动（Controller - Service - DAO） | 业务驱动（Interface - Application - Domain - Infra） |
| 模块划分   | 功能/控制器划分                        | 领域/聚合划分                                        |
| 表达能力   | 弱（容易堆积 if else）                 | 强（使用聚合/值对象表达业务）                        |
| 复杂性管理 | 难以扩展，Service 类爆炸               | 聚合分治，服务聚合逻辑更清晰                         |
| 微服务适配 | 难拆（功能之间耦合）                   | 易拆（按限界上下文组织）                             |
