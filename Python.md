# OJ

#### 2306

```python
from itertools import combinations

a=defaultdict(int)
groups=defaultdict(set)
for s in ideas:
  	groups[s[0]].add(s[1:])
ans=0
for a,b in combinations(groups.values(),2):
  	m=len(a&b)
    ans+=(len(a)-m)*(len(b)-m)
return ans*2
```

```
2
a b
b c
2.0 3.0
5
a c
b a
a e
a a
x x
```

```python
import sys
from collections import defaultdict, deque

# 读取输入
input = sys.stdin.read
data = input().splitlines()

# 读取 equations 和 values
n = int(data[0])  # 第一行是 equations 的数量
equations = []
values = []

for i in range(n):
    equations.append(data[i + 1].split())
    
values = list(map(float, data[n + 1].split()))

# 读取 queries
m = int(data[n + 2])  # equations 部分之后是 queries 的数量
queries = []
for i in range(m):
    queries.append(data[n + 3 + i].split())

print(equations)
print(values)
print(queries)

```

```python
import sys
input = sys.stdin.read
print = sys.stdout.write

data = input().splitlines()

split(";",n) #分割n次
```

#### 399

```python
class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        graph={}
        for (s,e),v in zip(equations,values):
            if s not in graph:
                graph[s]={}
            graph[s][e]=v
            if e not in graph:
                graph[e]={}
            graph[e][s]=1/v
            graph[e][e]=1.0
            graph[s][s]=1.0

        queue=[]
        n=len(queries)
        ans=[-1.0]*n
        for i,(qx,qy) in enumerate(queries):
            if qx not in graph or qy not in graph:
                continue
            queue=[[qx,1.0]]
            visited=set([qx])
            while queue:
                node,mul=queue.pop(0)
                for neighbor,weight in graph[node].items():
                    if neighbor==qy:
                        ans[i]=mul*weight
                        break
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append([neighbor,mul*weight])
        return ans
```

```python
text = "   hello world   "
result = text.strip() #remove space before and after string!
print(result)  # 'hello world'
```



# Prefix

```python
from itertools import accumulate

pos = [1, 2, 3, 4]
pre_sum = list(accumulate(pos, initial=0))
print(pre_sum)
```

# DataStructure

`defaultdict` 在访问一个不存在的键时，不会引发 `KeyError` 异常，而是会使用一个默认的工厂函数生成该键对应的默认值。这个工厂函数在创建 `defaultdict` 时指定。

`SortedList`  with B+ tree-like structure

```python
from functools import reduce 
reduce(xor,num)
reduce(func,num)
reduce(lambda x, y: x + y,num)


from functools import lru_cache,cache
@cache
dfs.cache_clear()

from sortedcontainers import SortedList
sl=SortedList(list1)
sl.add(num1)
sl.update(list2)
sl.remove(num2)
sl.pop(i)#pop index=i 
sl[:a] #get slice of index range[0,1,2,..a]
sl.index(num) #return index of num!

from collections import deque
d=deque([1,2,3])
d.append(4)
d.appendleft(0)
d.pop()
d.popleft()

from collections import defaultdict
cnt=defaultdict(int)
#wont cause keyerror in visit a key which is not exists!
cnt2=dict()

from collections import Counter
c=Counter(grid)
c.values()
c.keys()
c.items()
for item in c.items():
    key = item[0]  # 获取键
    value = item[1]  # 获取值
    print(f'Key: {key}, Value: {value}')

import heapq
h=[]
# default is min heap!
heapq.heappush(h,num);
heapq.heappop(h);
#if want max heap, we can use heapq.heappush(h,-num)!
#top element is h[0]!
```

# Bisect

```python
import bisect
#a is the sorted list, x is the target element
bisect.bisect_right(a,x)
bisect.bisect_left(a,x)

#a is a sorted array, x in insert value, lo(included), hi not included
bisect.bisect_left(a,x,lo,hi)
bisect.bisect_left(a,x,lo=0,hi=len(a))

a = [1, 2, 4, 4, 4, 5, 6, 8]
print(bisect.bisect_right(a, 4, 0, 4))#output 4
```

# string

```
s='abcdef'
s[::-1]#倒叙输出
s[start:end:step]
```

# **list**

```python
my_list=[]
mylist.append()
my_list.insert(2,8)#索引2处插入8,后面元素顺次右移
my_list.remove(3) #delete first value=3的element, to avoid error,need to check elements' existence!
sub_list=my_list[1:3]# 1-2
pop_ele=list1.pop(3)#delete index=3
len(list1)
exist=2 in list1
list1.sort()
new_list=sorted(my_list)
```

# **tuples**

```python
tuple1=(1,2,3,4,5)
#cannot change element in tuple!
len(tuple1)
exist=2 in tuple1
a,b,c,d,e = tuple1

tuple1+(999,)
```

# **Dictionary**

```python
dict={}
dict['asd']=1
dict={'a':1,'b':2}
new_dict=sorted(dict.items(),key=lambda x:x[1])
new_dict=sorted(dict.items(),key=lambda x:x[1],reverse=True)
del dict['a']
remove_value=dict.pop('a')
my_dict = {'apple': 5, 'banana': 3, 'cherry': 7}

for item in my_dict.items():
    key = item[0]  # 获取键
    value = item[1]  # 获取值
    print(f'Key: {key}, Value: {value}')
```

# **lambda& filter& map**

```python
lambda x,y,z:return x+y+z
list(filter(lambda x:x%2==0,my_list)
list(filter(lambda x:type(x)==int,my_list))

list1=[1,2,3]
def foo(x):
    return x**2
new_map=map(foo,list1)
print(list(new_map))

list(map(lambda x:x**2,my_list))

def func(x):
    return x**2
square_lambda=lambda x: func(x)
#equal to
square_lambda=lambda x:x**2
```

# **Set**

set cannot use index!

set1|set2

set1&set2

set1-set2

set1^set2

```python
my_set={1,2,3,4}
my_set.add(5)
set1.union(set2)
set1.intersection(set2)
set1.difference(set2)
set1.remove(3)#value not exist will cause error
set.discard(3)#value not exist will not cause error
```

# **Queue**

```python
from queue import Queue
my_queue=Queue()
my_queue.put(1)
item=my_queue.get()#顶端移除
my_queue[0]
my_queue.empty()
```

# **Stack 用list实现**

```python
stack=[]
stack.append(2)#尾部加入
stack.pop()#头部删除
stack[-1]
```

# **Counter**

```python
#initialization
counter=defaultdict(int)
from collections import Counter

# Create a Counter object from an iterable
my_list = [1, 2, 3, 1, 2, 1, 3, 4, 5, 4]
counter = Counter(my_list)

my_string = "programming is fun"
char_count = Counter(my_string)
```

# **三目运算**

```python
result = value_if_true if condition else value_if_false
x = 10
y = 20
max_value = x if x > y else y
print(max_value) 
```

# **Trival&zip,map,tuple,inf**

```python
#math.isqrt(43//2) it means get the integer of of the sqrt!
math.isqrt(43//2)

zip(a,b)
#combime two object 1 to 1 pair
sorted(zip(a,b),key=lambda z:-z[1]) #sort by value, will not change zip(a,b)! use the value it return!
zip(a,b).sort()#will change zip(a,b)

sorted(zip(a,b),key=lambda z:z[1],reverse=True)
#key=lambda z:z[1] get the sort value
#reverse means to sort from large to small

a=(1,2)
b=(3,4)
tuple(zip(a,b))#((1, 3), (2, 4))

#map(function, iterable, ...)
map(sum,zip(a,b))
tuple(map(sum,zip(a,b))) #(4, 6)

max=inf
min=-inf
```

# join

```python
myTuple = ("John", "Peter", "Vicky")
x = "#".join(myTuple)
print(x)
#connect myTuple with '#'

"".join(array)
```

# **Chain Comparison**

```
x=10
print(5<=x<=2)
print(5<=x and x<=2)
#they are equal
```

# **Higher Order Functions**

```
def foo():
    return 1
x=foo()# is a value
y=foo # is a function
```

# **Late Binding**

```
print(list(map(lambda x: x(2), [lambda x: i + x for i in range(3)])))
#[4, 4, 4]
#when use map, the i is already end in value 2, so return 2,2,2!

# The lambda functions within the list comprehension capture the variable i, but they don't evaluate i immediately. Instead, they capture a reference to i, and when you later call x[0](2), x[1](2), and x[2](2), they all use the current value of i, which is 2 after the loop has finished.
x = [lambda x: i + x for i in range(3)]
x[0](2)#2 is the value input into function
```

# **Method Resolution Order(MRO)**

很简单，就是通过mro得到一个继承顺序，然后super()就是按照这个顺序调用，解决！ super() does not always directly call the "parent class" method. Instead, it determines which method to call based on the MRO. When you use super() in a class method, it looks for the next class in the MRO and calls the corresponding method from that class. This mechanism is especially useful in scenarios involving multiple inheritance, as it ensures all parent class methods are called in a certain order.

```
class A:
    def method(self):
        print("A's method")

class B(A):
    def method(self):
        print("B's method")

class C(A):
    def method(self):
        print("C's method")

class D(B, C):
    pass

d = D()
d.method()
```

tuple不可改元素(),list可以改[] tuple with 1 element: tuple=(3,) is ok but tuple=(3) is wrong!

```
str(123)#'123'
int('123')#123
list('123')#['1', '2', '3']
str([1,2,3])#'[1, 2, 3]'

is_prime = lambda n: n > 1 and all(n % i != 0 for i in range(2, int(n**0.5) + 1))
prime_list = [x for x in range(2, n) if is_prime(x)]
```

# **IO operation**

```python
# Reading the entire file
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)

# Reading line by line
with open('example.txt', 'r') as file:
    for line in file:
        print(line.strip())

# Writing to a file
with open('output.txt', 'w') as file:
    file.write('Hello, world!\\n')
    file.write('This is a new line.')

# Appending to a file
with open('output.txt', 'a') as file:
    file.write('\\nThis is appended content.')

data.split()
```

# **public/private**

we can still visit private by +'_CLASSNAME'   **underscore**

```
class MyClass:
    def __init__(self):
        self.public_variable = 42
        self._protected_variable = 10
        self.__private_variable = "secret"

    def public_method(self):
        return "This is a public method"

    def _protected_method(self):
        return "This is a protected method"

    def __private_method(self):
        return "This is a private method"

# Accessing members
obj = MyClass()

# Accessing public members
print(obj.public_variable)
print(obj.public_method())

# Accessing protected members (not enforced)
print(obj._protected_variable)
print(obj._protected_method())

# Accessing private members (not enforced)
print(obj._MyClass__private_variable)  # Name mangling is used for private members
print(obj._MyClass__private_method())  # Name mangling is used for private methods
```

### Decorator

```python
def a_new_decorator(a_func):
 
    def wrapTheFunction():
        print("I am doing some boring work before executing a_func()")
 
        a_func()
 
        print("I am doing some boring work after executing a_func()")
 
    return wrapTheFunction
 
def a_function_requiring_decoration():
    print("I am the function which needs some decoration to remove my foul smell")
 
a_function_requiring_decoration()
#outputs: "I am the function which needs some decoration to remove my foul smell"
 
a_function_requiring_decoration = a_new_decorator(a_function_requiring_decoration)
#now a_function_requiring_decoration is wrapped by wrapTheFunction()
 
a_function_requiring_decoration()
#outputs:I am doing some boring work before executing a_func()
#        I am the function which needs some decoration to remove my foul smell
#        I am doing some boring work after executing a_func()

@a_new_decorator
def a_function_requiring_decoration():
    """Hey you! Decorate me!"""
    print("I am the function which needs some decoration to "
          "remove my foul smell")

a_function_requiring_decoration()
#outputs: I am doing some boring work before executing a_func()
#         I am the function which needs some decoration to remove my foul smell
#         I am doing some boring work after executing a_func()
 
#the @a_new_decorator is just a short way of saying:
a_function_requiring_decoration = a_new_decorator(a_function_requiring_decoration)
    return wrapTheFunction
 
@a_new_decorator
def a_function_requiring_decoration():
    """Hey yo! Decorate me!"""
    print("I am the function which needs some decoration to "
          "remove my foul smell")
 
print(a_function_requiring_decoration.__name__)
# Output: a_function_requiring_decoration
```

# Yield

一边循环一边生成generator

把一个列表生成式的`[]`改成`()`，就创建了一个generator

## Generators

Generators are iterators, a kind of iterable **you can only iterate over once**. Generators do not store all the values in memory, **they generate the values on the fly**:

```python
>>> mygenerator = (x*x for x in range(3))
>>> for i in mygenerator:
...    print(i)
0
1
4
```

It is just the same except you used `()` instead of `[]`. BUT, you **cannot** perform `for i in mygenerator` a second time since generators can only be used once: they calculate 0, then forget about it and calculate 1, and end after calculating 4, one by one.

## Yield

`yield` is a keyword that is used like `return`, except the function will return a generator.

```python
>>> def create_generator():
...    mylist = range(3)
...    for i in mylist:
...        yield i*i
...
>>> mygenerator = create_generator() # create a generator
>>> print(mygenerator) # mygenerator is an object!
<generator object create_generator at 0xb7555c34>
>>> for i in mygenerator:
...     print(i)
0
1
4
```

Here it's a useless example, but it's handy when you know your function will return a huge set of values that you will only need to read once.

```python
def test():
		#...
		yield i

a=test();
a.__next__();
a.send("hello")
```

### namespace

1. **内置命名空间（Built-in Namespace）：** 包含Python解释器内置的函数和变量的命名空间。这些函数和变量可以在任何地方直接访问，无需导入任何模块。
2. **全局命名空间（Global Namespace）：** 包含当前模块中定义的所有函数、变量和类的命名空间。这是模块级别的命名空间，对于一个模块而言，全局命名空间是指模块级别的命名空间。
3. **局部命名空间（Local Namespace）：** 包含在函数内部定义的局部变量的命名空间。每次调用函数时，都会创建一个新的局部命名空间，函数中的变量只在该函数的执行期间存在。

### cls

self是类（Class）实例化对象，cls就是类（或子类）本身，取决于调用的是那个类。 @staticmethod 属于静态方法装饰器，@classmethod属于类方法装饰器

```python
class A(object):
    a = 'a'
    @staticmethod
    def foo1(name):
        print 'hello', name
    def foo2(self, name):
        print 'hello', name
    @classmethod
    def foo3(cls, name):
        print 'hello', name
```

首先定义一个类A，类A中有三个函数，foo1为[静态函数](https://www.zhihu.com/search?q=静态函数&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A335991541})，用@staticmethod装饰器装饰，这种方法与类有某种关系但不需要使用到实例或者类来参与。如下两种方法都可以正常输出，也就是说既可以作为类的方法使用，也可以作为类的实例的方法使用。

```python
a = A()
a.foo1('mamq') # 输出: hello mamq
A.foo1('mamq')# 输出: hello mamq
```

foo2为正常的[函数](https://www.zhihu.com/search?q=函数&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A335991541})，是类的实例的函数，只能通过a调用。

```python
a.foo2('mamq') # 输出: hello mamq
A.foo2('mamq') # 报错: unbound method foo2() must be called with A instance as first argument (got str instance instead)
```

foo3为[类函数](https://www.zhihu.com/search?q=类函数&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A335991541})，cls作为第一个参数用来表示类本身. 在类方法中用到，类方法是只与类本身有关而与实例无关的方法。如下两种方法都可以正常输出。

```python
a.foo3('mamq') # 输出: hello mamq
A.foo3('mamq') # 输出: hello mamq
```

但是通过例子发现staticmethod与classmethod的使用方法和输出结果相同，再看看这两种方法的区别。

> 既然@staticmethod和@classmethod都可以直接类名.方法名()来调用，那他们有什么区别呢 从它们的使用上来看, @staticmethod不需要表示自身对象的self和自身类的cls参数，就跟使用函数一样。 @classmethod也不需要self参数，但第一个参数需要是表示自身类的cls参数。 如果在@staticmethod中要调用到这个类的一些属性方法，只能直接类名.属性名或类名.方法名。 而@classmethod因为持有cls参数，可以来调用类的属性，类的方法，实例化对象等，避免硬编码。

也就是说在classmethod中可以调用类中定义的其他方法、类的属性，但staticmethod只能通过A.a调用类的属性，但无法通过在该函数[内部调用](https://www.zhihu.com/search?q=内部调用&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A335991541})A.foo2()。修改上面的代码加以说明：

```python
class A(object):
    a = 'a'
    @staticmethod
    def foo1(name):
        print 'hello', name
        print A.a # 正常
        print A.foo2('mamq') # 报错: unbound method foo2() must be called with A instance as first argument (got str instance instead)
    def foo2(self, name):
        print 'hello', name
    @classmethod
    def foo3(cls, name):
        print 'hello', name
        print A.a
        print cls().foo2(name)
```

### Shuffle

```python
from random import shuffle
shuffle(x)
```

在Python中，"pickling" 和 "unpickling" 是用于序列化和反序列化对象的概念。这是通过模块 **`pickle`** 提供的功能。

### **Pickling:**

**Pickling** 是将 Python 对象转换为二进制数据的过程。这允许你将对象保存到文件或通过网络传输，以及在不同的 Python 程序之间共享对象。通过 pickling，你可以将一个对象的状态保存为二进制格式，并在需要时重新创建相同的对象。

```python
pythonCopy code
import pickle

# 创建一个字典对象
my_dict = {'name': 'John', 'age': 30, 'city': 'New York'}

# Pickle对象并将其保存到文件
with open('data.pkl', 'wb') as file:
    pickle.dump(my_dict, file)
```

### **Unpickling:**

**Unpickling** 是从二进制数据中还原对象的过程。这允许你从文件或网络接收的二进制数据中重新创建对象。

```python
pythonCopy code
import pickle

# 从文件中加载pickled对象
with open('data.pkl', 'rb') as file:
    loaded_dict = pickle.load(file)

print(loaded_dict)
```

通过 pickling 和 unpickling，你可以方便地保存和加载复杂的数据结构，包括自定义对象、列表、字典等。需要注意的是，在使用 **`pickle`** 时，只能在 Python 中的环境中进行 pickling 和 unpickling。如果你需要在不同的编程语言之间共享数据，可能需要考虑使用其他序列化格式，如 JSON 或 MessagePack。

```python
pickle.load()
pickle.dump()
```

### 正则表达式 re

### args & kwargs

在Python中，**`\*args`** 和 **`\**kwargs`** 是用于处理可变数量参数的特殊语法。

1. **`args`（位置参数）：**

   - **`args`** 允许函数接受任意数量的位置参数。它表示一个元组（tuple），其中包含传递给函数的所有位置参数。
   - 这对于定义函数时不确定有多少位置参数会被传递进来的情况很有用。

   ```python
   pythonCopy code
   def example_function(*args):
       for arg in args:
           print(arg)
   
   example_function(1, 2, 3, 'four')
   ```

2. **`\*kwargs`（关键字参数）：**

   - **`\*kwargs`** 允许函数接受任意数量的关键字参数。它表示一个字典（dictionary），其中包含传递给函数的所有关键字参数。
   - 这对于定义函数时不确定有多少关键字参数会被传递进来的情况很有用。

   ```python
   pythonCopy code
   def example_function(**kwargs):
       for key, value in kwargs.items():
           print(f"{key}: {value}")
   
   example_function(name='John', age=30, city='New York')
   ```

3. **使用 `args` 和 `\*kwargs` 一起：**

   - 你也可以在同一个函数中使用 **`args`** 和 **`\*kwargs`**，以接受任意数量的位置参数和关键字参数。

   ```python
   pythonCopy code
   def example_function(arg1, *args, kwarg1='default', **kwargs):
       print(f"arg1: {arg1}")
       print(f"args: {args}")
       print(f"kwarg1: {kwarg1}")
       print(f"kwargs: {kwargs}")
   
   example_function('first', 2, 3, kwarg1='custom', name='John', age=30)
   ```

使用 **`\*args`** 和 **`\**kwargs`** 的主要优势在于灵活性。它们允许你编写通用的函数，能够处理不同数量和类型的参数，使得函数更具可扩展性和适应性。这在编写库或框架时特别有用，因为它们可以适应用户的不同需求。

### With

**`with`** 是 Python 中的一个关键字，通常用于管理上下文（Context Management）。**`with`** 语句提供了一种在进入和退出代码块时执行特定操作的方式，常用于处理资源的分配和释放，例如文件操作、网络连接、数据库连接等。

Code Style Variable lower case, ’_’ C++ Copy Caption std::string table_name;

class TableInfo { ... private: std::string table_name_;  // OK - underscore at end. static Pool<TableInfo>* pool_;  // OK. };

Function Upper case

基本语法如下：

```python
pythonCopy code
with context_expression [as variable]:
    with_suite
```

- **`context_expression`** 是一个返回上下文管理器对象的表达式，这个对象通常有 **`__enter__()`** 和 **`__exit__()`** 方法。
- **`as variable`** 部分是可选的，用于将上下文管理器返回的对象赋给一个变量，以便在 **`with`** 代码块中使用。

**`with`** 的主要好处是它确保在代码块结束时执行清理工作，即使发生异常也能得到处理。这使得代码更加健壮、可读和可维护。

### Copy

```python
import copy
#Shallow Copy
b=a.copy()
#Deep Copy
b=copy.deepcopy(a)
```

### Global Interpreter Lock（GIL）

- 一个线程获取GIL执行相关操作，然后将GIL传递到下一个线程。
- 虽然看起来程序被多线程并行执行，但它们实际上只是轮流使用相同的CPU核心。

### Mutex

```python
import threading
import multiprocessing

shared_variable = 0
mutex = threading.Lock()

def increment_shared_variable():
    global shared_variable
    for _ in range(1000000):
        # 获取互斥锁
        mutex.acquire()
        shared_variable += 1
        # 释放互斥锁
        mutex.release()

# 创建两个线程并启动
thread1 = threading.Thread(target=increment_shared_variable)
thread2 = threading.Thread(target=increment_shared_variable)

thread1.start()
thread2.start()

# 主线程等待所有子线程完成
thread1.join()
thread2.join()

print("Shared variable:", shared_variable)
```

# Binary search

```python
import bisect
#a is the sorted list, x is the target element
bisect.bisect_right(a,x)
bisect.bisect_left(a,x)
```

# SortedList!!

```python
from sortedcontainers import SortedList

# 创建一个SortedList
sl = SortedList([4, 1, 5])

# 添加元素
sl.add(3)
sl.add(2)

# 列表保持排序
print(f"排序后的列表: {sl}")

# 访问元素（像普通列表一样）
print(f"索引1处的元素: {sl[1]}")  # 输出将是2

# 移除元素
sl.remove(3)  # 移除元素3
print(f"移除3后的列表: {sl}")

# 移除元素（如果不存在则不报错）
sl.discard(10)  # 由于10不在列表中，所以不做任何操作

# 移除并返回元素
last_element = sl.pop(-1)  # 移除并返回最后一个元素
print(f"弹出的元素: {last_element}")
print(f"弹出后的列表: {sl}")

# 使用bisect查找插入位置以保持顺序
index = sl.bisect_left(3)  # 查找插入3的位置
print(f"插入3（保持顺序）的索引: {index}")
```

# PDB

```python
python3 -m pdb filename.py
import pdb
pdb.set_trace()
```

# Numpy

```python
import numpy as np
a=np.array([1,2,3])
print(a.shape)
print(a[1,1])
a=np.zeros((2,3))
b=np.ones((2,3))
c=np.full((2,2),7)
d=np.eye(2)
"""
[[1. 0.]
 [0. 1.]]
"""
e = np.random.random((2,2))
b = a[:2, 1:3]  # 0,1 row and 1,2 col

# The returned array will have shape (3,) and 
print(a[[0, 1, 2], [0, 1, 0]])
# The above example of integer array indexing is equivalent to this:
print(np.array([a[0, 0], a[1, 1], a[2, 0]]))

#0,0 1,2 2,0 3,1 elements
b = np.array([0, 2, 0, 1])
a[np.arange(4), b]
```

### Boolean array indexing

```python
import numpy as np

a = np.array([[1,2], [3, 4], [5, 6]])

bool_idx = (a > 2)  # Find the elements of a that are bigger than 2;
                    # this returns a numpy array of Booleans of the same
                    # shape as a, where each slot of bool_idx tells
                    # whether that element of a is > 2.

print(bool_idx)
"""
[[False False]
 [ True  True]
 [ True  True]]
"""
# We use boolean array indexing to construct a rank 1 array
# consisting of the elements of a corresponding to the True values
# of bool_idx
print(a[bool_idx])
# We can do all of the above in a single concise statement:
print(a[a > 2])
```

### Dtype

```
a=np.array([1,2],dtype=np.int64)
print(a.dtype)
```

### Shape

```python
a.shape
a.shape[0]
#assume a's shape is 3,10,10, it will turn a to dimension 2 with 3,100!
a.reshape(a,(a.shape[0],-1))
```

### Array math

```python
np.sqrt(x)
np.exp(x)

a.dot(b)
np.dot(a,b)
a@b 
```

```python
np.sum(x)
np.sum(x,axis=0)  #column
np.sum(x,axis=1)  #row, most of time I use axis=1
#transpose
x.T
```

### Broadcasting

````python
x = np.array([[1,2,3], [4,5,6], [7,8,9], [10, 11, 12]])
v = np.array([1, 0, 1])
x+v

v = np.array([1,2,3])  # v has shape (3,)
w = np.array([4,5])    # w has shape (2,)
# To compute an outer product, we first reshape v to be a column
# vector of shape (3, 1); we can then broadcast it against w to yield
# an output of shape (3, 2), which is the outer product of v and w:

print(np.reshape(v, (3, 1)) * w)

x = np.array([[1,2,3], [4,5,6]])
print(x+v)
print((x.T + w).T)
print(x + np.reshape(w, (2, 1)))
````

# Matplotlib

```python
import matplotlib.pyplot as plt
%matplotlib inline

x = np.arange(0, 3 * np.pi, 0.1)
y = np.sin(x)

# Plot the points using matplotlib
plt.plot(x, y)
```

