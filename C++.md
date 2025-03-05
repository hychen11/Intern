# C++

## DataSize

int is 4 bytes.

short is 2 bytes.

long is 4 bytes.

long long is 8 bytes.

float is 4 bytes.

double 8 bytes.

32-bit systems, a pointer is 4 bytes (32 bits) in size

64-bit systems, a pointer is 8 bytes (64 bits) in size

int → long, long→ int (loss)

**`std::int32_t`** for a 32-bit signed integer and **`std::int64_t`** for a 64-bit signed integer.

extern int = 1;

The **`-c`** option is a compiler flag that tells the compiler to **compile the source file into an object file**, without linking it with other object files to create an executable.

**separate compilation 分别编译，目录格式，分开定义，提升开发效率，但是会定义时名字重复了（比如namespace）**

## Const总结

* `const` 修饰普通变量
* `const` 修饰指针
  * `const int *p==int const *p`也就是`(*p)`是常量，说明 `p` 指向的内容（`int` 类型的值）是**常量**，不能修改，`p` 本身**不是常量**，可以指向不同的地址，但是不能改\*p值
  * `int *const p` 也就是p是常量，p 本身是常量，不能指向别的地址
  * `const int *const p = &a;`  也就是p是常量，p本身也是

const int : **initialize**!!! and cannot change value

non-const→cons

```python
int i = 0;
const int &r = i; //can change i, but r is only readable, cannot modify i through r
```

const!→non-const

```python
const int i = 0;
int &r = i; //error, since i can be modified through r
```

reference don't need same type

```
const int * const pa=&a;
```

low-level →const int (base)

top-level →object

Top-level **`const`** means that the object itself is constant and its value cannot be modified. This means that you cannot assign a new value to a top-level const object or modify its contents through any means.

Low-level **`const`** means that the pointed-to or referred-to object is constant and cannot be modified through the pointer or reference that has low-level const. This means that you cannot modify the value of the pointed-to or referred-to object through the pointer or reference that has low-level const, but you can modify it through a non-const pointer or reference that points to the same object.

### Namespace

avoid naming conflict. `namespace a1{ void function1(){} }`

`::x` means we assume x is global variables.

head file do not use `using`

### String

str.size() return size_t = size_type (unsign int type) `unsighed int`

**str.empty()** equals to str.size()==0

### Lvalues & Rvalues

Rvalues use object’s **value** (contents)

Lvalues use object’s **location and memory**

```python
int x = 42;        // x is an Lvalue because it has a memory address
int y = x + 1;     // x + 1 is an Rvalue because it does not have a memory address
int& ref = x;      // ref is an Lvalue reference to x
int&& rvalref = x; // Error: an Rvalue reference cannot bind to an Lvalue
```

precedence & association

can not in one expression both changing value and reference it.

```
cout<<i<<" "<<++i<<endl;
```

order of evaluation, precedence and associatity

`f()+g()*k()-b()`  we cannot know the order!

```python
int a=g();
int b=k();
int c=f();
int d=b();
```

### Exception

```cpp
throw std::invalid_argument("require 1");

try{
		func();
} 
catch(const std::invalid_argument &e){
		std::cout << "A catch error occurred: " << e.what() << std::endl;
}
```

```
static int a=1;
```

variables stays in Main() and not in function

pass by value

pass by refpointer

```
const double * const p=&a
```

low level (basic type) front one is control value

**high level (object)** second one is control address

### Reload

```python
top level const can be dropped (value, only aim to object)
const int a 
int * const a (point to address)

low level
const int* a（指针指向可以变，但是对象不能变）
```

1. **`const int a`**: This declares a constant integer **`a`** that cannot be modified. This is a low-level const because the constness is at the level of the variable itself.
2. **`const int\* a`**: This declares a pointer **`a`** to an integer that is constant. This means that the pointer itself can be modified, but the value that it points to cannot. This is a **low-level** const because it provides direct access to memory addresses.
3. **`const int \* const a`**: This declares a constant pointer **`a`** to a constant integer. This means that both the pointer itself and the value it points to cannot be modified. This is a high-level const because the constness is at the level of both the pointer and the pointed-to value.

When a variable is declared with low-level **`const`**, it is still considered to have the same type as the non-const version. For example, **`const int a`** and **`int a`** are of the same type. However, when a variable is declared with high-level **`const`**, it is considered to have a different type than the non-const version. For example, **`const int\* a`** and **`int\* a`** are of different types.

**`const int\* a`** declares a non-constant pointer to a constant integer value

指向对象必须是const int！！！而且可以换对象，但是不能改变value

### Assert

```
#define NDEBUG
```

not debug

assert(a==b)

### function pointer

```python
int (*func_ptr)(int,int);
func_ptr=&func;
func_ptr(int,int);
```

```c++
class A{
public:
    explicit A(int value):a_(value){}
		//有const 不可修改
		//const A * const data;
    void func() const{
        std::cout<<a_<<std::endl;
    }
private:
    int a_;
};
int main() {
    A a(10);
    A a1=A(10);
    //error since it's implicit 
    A a2=18;
}
```

this is pointer, return (*this)

only object has **this**！！！

### Access Control

private:

public:

protected:

all can access in class but different scope outside of the class

### friend

can access **variables** in the class (private, protected) public all can access.

but at best not use, since it can break the **encapsulation**

### refer

&: return exactly the object

no &: return copy of the object

Need define not declear **except**

```cpp
class Node{
private:
		Node *next;//recursive structure pointer, size of pointer(8)
		Node *prev;
};
```

### scope

first in class variables, then read out class variables.

class is a scope

### Initialization

```cpp
public:
	int a_;
	const int b_;

A(int a,int b):a_(a),b_(b){}//initialization OK

A(int a,int b):b_(b){
		this->a_=a;//assign
}
```

### Delegate Constructor委托构造

```cpp
class NonDefault{
public:
    std::string str_;
    NonDefault(std::string str):str_(str){}
		//SalesData()=default, NonDefault()=delete;
		//so at best provide a default constructor if other constructors are being defined
		NonDefault()=default;
};

//reduce code代码复用
class SalesData{
public:
		int a_;
		int b_;
		NonDefault non_default_=NonDefault('123');
		
	
		SalesData(int a,int b):a_(a),b_(b){}
		SalesData(int a):SalesData(a,100){}
		SalesData()=default;//default the same as SalesData(){} 
		//build-in type (int -> 0)
};

void func1(SalesData a){
		cout<<"func"<<endl;
}
void func2(SalesData& a){
		cout<<"func"<<endl;
}
explicit void func3(SalesData& a){
		cout<<"func"<<endl;
}
int main(){
		func1(10); //copy OK (and it's implicit optimized by compiler) 
		//equal to SalesData(10); then func(SalesData(10))
		func2(10); //need object WRONG
		func3(10); //explicit WRONG
		func3(SalesData(10)); //explicit OK
}
```

### static number

can only define and **initializa** static member outside the class body

```cpp
class A{
public:
		int a_;
		static int static_num;
		A()=default;
		A(int a):a_(a){}
};

int A::static_num=20;
// similar to static int num=20; a.static_num are the same
//if main() exists, its value always exists
```

check c++ reference is OK

1. library like c++ log library
2. file (local or net file)

```cpp
#include<iostream>
#include<vector>
#include<fstream>
using namespace std;
int main(int argc, char **argv) {
    ofstream os("hychen.txt",ios::app);
    os<<"Hello\\n";
    os<<"Hello world\\n";

    os.flush();
    os.close();

    ifstream is("hychen.txt");
    string str;
    getline(is, str);
    cout<<str<<endl;
}
```

**`>>`** operator is used to read the next white space-separated word from **`ss`** and store it in the **`word`** variable.

```cpp
#include<iostream>
#include<vector>
#include<fstream>
#include<sstream>

using namespace std;
int main(int argc, char **argv) {
    string raw_string="hello world how is your day";
    stringstream ss(raw_string);
    int count=0;
    string word;
    while(ss>>word){
        count++;
    }
    cout<<count<<endl;

}
```

### sequential container

### vector 99% & array 1% (trade off between performance & flexibility)

**It seems vector can be initialized by `std::vector<int> s(n,n)` ???**

```cpp
std::vector<int> s {1, 2, 3, 4, 5};
std::reverse(s.begin(), s.end());
#include <vector>

class A {
public:
    A() : a_(100, 0) {}//initialization
		A() {a_ = std::vector<int>(100, 0);}//assign
	
    std::vector<int> a_;
};
```

### iterator

```cpp
//iterator
vector<int>::iterator it=vec.begin()
//citerator cannot change
vector<int>::const_iterator it=vec.begin()
auto it=rbegin();it!=rend();it++;
```

for(auto i:nums) //ok

for(const int & i :nums) //ok

it=vector.insert(it,100);// it need update

```cpp
push_back() method copies the given element into the container.
emplace_back() method constructs the new element in-place at the end of the container using the provided arguments.
```

### forward list

链表

vector正常分配1 2 4 8，5 elements → capacity=8

```cpp
vector.capacity() //5->10

vec.push_back(100)
1 2 3 4 5 0 0 0 1 2 3 4 5 100 100 0 0 0
	|						  | |
```

### string

**`size_t`** is an unsigned integer type defined in the C++ standard library, which is typically used to represent the size or length of an object in memory or the number of elements in a container, such as a **`std::vector`** or a **`std::string`**. It is defined to be large enough to hold the size of any object that can be allocated on the system.

```cpp
size_t pos= str.find("a");
str.substr(pos,num);//!
//if not find, return 18446744073709551615, which is the value of string::npos
string::npos=18446744073709551615

to_string(num)//int to string
stoi(str)//string to int

atoi(
```

### container adaptor

### algorithm

custom comparison function

```cpp
vector<int> vec;
std::sort(vec.begin(),vec.end());//
std::sort(vec.begin(),vec.end(),std::greater<int>());//from big to small
std::sort(vec.begin(),vec.end(),std::less<int>());//from small to big

auto res=std::find(vec.begin(),vec.end(),item);
if(res==vec.end()) return false;
```

### Lambda

```cpp
//if not read by params, in what way?
//[capture list](parameter list)->return type{function body}
[&](params){return expression;}
auto myfunc=[=](){return sz;};
//= -> capture by value
//& -> capture by reference
```

### Iterator

```cpp
cbegin= const begin	
for(auto it=vec.cbegin();it!=vec.cend();it++)
for(auto it=vec.crbegin();it!=vec.crend();it++)
```

### Dynamic Memory

|heap|←new int()

------

|stack|← int a;

**shared pointer, unique pointer**

```cpp
int main()
{
    std::shared_ptr<int> ptr= std::make_shared<int>(42);//it's like emplace_back()
    std::shared_ptr<int> ptr1(ptr);//copy construction

    std::cout<<ptr.use_count()<<std::endl;
    std::cout<<ptr1.use_count()<<std::endl;
    {
        std::shared_ptr<int> ptr2(ptr);//copy construction
        std::cout<<ptr.use_count()<<std::endl;
        std::cout<<ptr2.use_count()<<std::endl;
    }
    std::cout<<ptr.use_count()<<std::endl;

    // std::unique_ptr<int> u_ptr= std::make_unique<int>(100);
}
```

Virtual Grad Student Advising Appointment

Class: implicit and explicit

An explicit constructor is used only for explicit conversions, while an implicit constructor can be used for both implicit and explicit conversions.

```python
class Celsius {
 public:
  Celsius(double temperature) : temperature_(temperature) {}
  double GetTemperature() const { return temperature_; }

 private:
  double temperature_;
};

void PrintTemperature(const Celsius& celsius) {
  std::cout << "The temperature is " << celsius.GetTemperature() << " degrees Celsius\\n";
}

int main() {
  // Implicit conversion
  Celsius celsius1 = 25.0;
  PrintTemperature(celsius1);

  // Explicit conversion
  Celsius celsius2 = Celsius(32.0);
  PrintTemperature(celsius2);
}
```

### Move

**Rvalue References**

**Move Object**

**Containers and Move Semantics**

```cpp
#include <iostream>
#include <string>
#include <utility> // For std::move

int main() {
    std::string original = "Hello, world!";
    
    // Move the ownership of the string to newString
    std::string newString = std::move(original);

    // Since ownership is moved, original should not be used anymore
    std::cout << "Original: " << original << std::endl; // Undefined behavior

    std::cout << "New String: " << newString << std::endl;

    return 0;
}
```

# OOP

四大特性:多态/封装/继承/抽象。

### Variable

- global variable 全局变量，可以在不同的cpp文件之间共享，可以使用关键字 extern 来使用别的cpp文件中的全局变量

- static global variable静态全局变量 ，不能在cpp文件之间共享

- local variable 存储在栈区上

- static local variable 静态局部变量，存储在全局变量区，在

  初次使用的时候初始化

  - **static local variables are stored in neither the stack nor the heap. Instead, they have a separate storage location known as the "static storage area" or "data segment" of a program's memory. This storage area is distinct from the stack and the heap.**

- allocated variable 动态分配的变量，存储在内存的堆结构中

**Stack memory only contains local primitive variables and reference variables to objects in heap space**.最后分配的局部变量会最先销毁，对于堆内存来说，对象的生命周期通常更长，因为它们可以被多个方法引用，直到没有引用指向它们时才会被垃圾回收器回收

### New and Delete

- new用于动态分配内存给变量，如 new int ， new double[1000]，new出新的对象的时候会执行对象的构造函数 new Class_Name[x] 会执行x次Class_Name的构造函数
  - malloc不执行类的构造函数
- delete用于删除动态分配的内存，如delete p; delete[] p，delete会执行所删除对象的构造函数，不能delete没有定义过的变量，同一个变量不能delete两次

```cpp
int *p1 = new int;
int *p2 = new p1;*
p2 = 1;
delete p1;
cout<<*p2<<endl; // error!!!
```

两个指针p1,p2指向同一个数据，如果p1被delete了，p2也不能访问原本p1指向的变量的值，因为delete删除的是内存里的数据，指向同一个数据的两个指针实际上只是两个不同的变量名而已，delete删除的不是变量名而是数据

### Memory Leak

```cpp
int *p = new int;
*p = 123;
p = new int;
```

### Reference

a new type in C++， 相当于给变量取了一个别名，使用方法为 type &refname = name; 引用的对 不能是表达式

引用和指针的区别

- 不能定义空引用，引用必须连接到一块合法的内存
- 一旦引用被初始化为一个对象不可更改
- 引用在创建的时候必须要初始化

### Const

const类型的成员变量初始化只能用**初始化列表**（必须在对象的构造函数中进行初始化）

可以指向任何 **`const string`** 对象

```cpp
const char * p="abc";//cannot change value, but can change address?
char * const p="abc";//can change value but cannot change address
```

不能将const类型的变量赋值给对应的指针，因为可能会带来const变量的改变，这是const类型的变量不允许的 可以把非const类型的值赋给对应的const型变量，函数中可以将参数设置为const类型表明这些参数在函数中不能被修改原本的值，也可以将返回值类型设置为const表示返回值不能被修改

- char * s="Hello World!"; 实质上是 const char * 类型，不要去修改s中的内容，这是一种未定义的行为 (undefined behavior)，应该写成 char s[]="Hello World!";

```cpp
#include <iostream>
using namespace std;

int main()
{
    const char *s1 = "Hello World";
    const char *s2 = "Hello World";

    cout << (void *)s1 << endl;
    cout << (void *)s2 << endl;
    return 0;
		//(void *) cout the address of the pointer
    // 输出的结果是s1和s2的地址，他们的结果是一样的
}
```

### Lvalue & Rvalue

- 可以取地址的，有名字的，非临时的就是左值；
- 不能取地址的，没有名字的，临时的就是右值；

```
int &var = 10;
```

上述代码是无法编译通过的，因为10无法进行取地址操作，无法对一个立即数取地址，因为立即数并没有在内存中存储，而是存储在寄存器中，可以通过下述方法解决：

```
const int &var = 10;
```

使用常引用来引用常量数字10，因为此刻内存上产生了临时变量保存了10，这个临时变量是可以进行取地址操作的，因此var引用的其实是这个临时变量，相当于下面的操作：

```
const int temp = 10;  const int &var = temp;
```

根据上述分析，得出如下结论：

- 左值引用要求右边的值必须能够取地址，如果无法取地址，可以用常引用；但使用常引用后，我们只能通过引用来读取数据，无法去修改数据，因为其被const修饰成常量引用了。

### Class

- **`protected`** 自己/派生类和友元函数访问
- `private` 自己和友元函数可见
- class 默认private， struct 默认 public

```cpp
class MyClass {
public:
    MyClass(int value) : constValue(value) {
    }
    void printValue() const {
        std::cout << "Constant Value: " << constValue << std::endl;
    }

private:
    const int constValue;
};
```

构造函数的执行分为两个阶段：初始化阶段和函数执行阶段，会先执行初始化列表里的赋值，在进入函数主体进行对应的操作

- **overloading**

default value：缺省值，可以在函数参数表中直接声明一些参数的值，但是必须要从右往左，当传入的参数缺省时函数默认将已经声明的值作为参数的值

- **constant object**

在成员函数参数表后面加 const可以成为 const型成员函数， const类型的成员函数不能修改成员变量的值

- const声明写在函数的开头表示函数的**返回值类型是const**
- const声明写在函数签名的末尾表示这个成员函数不能修改类中定义的成员变量 ，被称为**常成员函数**
- 但是如果是成员变量中有指针，并不能保证指针指向的内容不被修改
- const类型的函数和非const类型的函数也可以构成重载关系

```cpp
#include <iostream>
using namespace std;
class A
{
public:
    void foo()
    {
        cout << "A::foo();" << endl;
    }
    void foo() const
    {
        cout << "A::foo() const;" << endl;
    }
};

int main()
{
    A a;
    a.foo(); // 访问的是非const类型的foo
    const A aa;
    aa.foo(); // 访问的是const类型的foo
    return 0;
}
```

构成重载关系的时候，const类型的对象只能调用const类型的成员函数，不能调用non-const，而非const类型的对象优先调用non-const的成员函数，如果没有non-const再调用const类型的

- **copy constructor**

把一个对象直接赋值给另一个对象，一般的形式为 class_name(const class_name &copy_class_var )，通过拷贝构造函数可以实现对象之间的互相赋值 如果定义变量时直接给变量用同类型的变量赋值，调用的就是拷贝构造函数，如果是定义之后再赋值，就是调用了重载之后的等号

```cpp
#include <iostream>
using namespace std;
class A {
public:    
    A() {}
    A(const A& a) {cout<<"construct"<<endl;}
    A& operator=(const A& a) {cout<<"operator"<<endl;}
};

int main() {
    A a;
    A b = a; //调用拷贝构造函数
    A c;
    c = a; //调用重载之后的等号
}
```

### **Deep Copy & Shallow Copy**

Shallow Copy stores the references of objects to the original memory address.

缺省的拷贝构造函数和赋值运算符进行的都是浅拷贝!!

```cpp
string s1="zyc"; string s2(s1);//shallow copy
```

Deep copy stores copies of the object’s value.

**拷贝构造函数和赋值运算符**的区别

- 拷贝构造函数是在对象被创建的时候调用的
- 赋值运算符只能使用于已经存在的对象，也就是进行赋值之前，这个对象已经被某个构造函数构造出来了

```cpp
#include <cstring>
#include <iostream>
using namespace std;

struct Person {
    char *name;
    Person(const char *s) {
        name = new char[strlen(s) + 1];
        strcpy(name, s);
    }
    
    ~Person() {
        delete[] name;
    }
};

// 不需要拷贝构造函数的一种方式
Person bar(const char *s) {
    cout << "in bar()" << endl;
    return Person(s);
}

int main() {
    Person p1("Trump");
    Person p2 = p1;//赋值,shallow copy
    cout << (void *)p1.name << endl;
    cout << (void *)p2.name << endl; // 会发现输出的地址是一样的，说明指针在默认情况下也进行了copy，若要避免则应该自己编写拷贝构造函数
}
```

### Class Static Member

类中定义的static类型的变量是静态成员变量 ，其值会在这个类的所有成员之间共享

- non-const类型的静态成员变量需要在类的外面进行定义

  在类的内部声明静态成员变量时，这只是一个声明，告诉编译器该成员变量属于该类。然而，编译器并不知道这个变量的内存应该在何处分配，因此需要在类的外部提供定义，以告诉编译器应该在何处分配内存。这个定义通常发生在全局作用域或命名空间中。

**静态成员变量在所有类的实例之间共享，而不是每个类的实例都有自己的独立副本。无论创建了多少个类的实例，静态成员变量只有一个副本存在于内存中。这意味着不同对象之间可以共享和修改静态成员变量的值。**

const类型的静态成员变量作为类内共享的一个常量，也需要在类的外部进行定义，此时要写出关键字const，并且这个静态成员变量是不能被改变的

```cpp
#include <iostream>
using namespace std;

class A {
public:
    static int count;
    A() {
        A::count++;
    }
};

int A::count = 0;// 在类的外部赋值的时候不需要说明static，但是需要注明A::，否则就是一个新的变量

int main() {
    A* array = new A[100];//调用100次constructor
    cout << A::count << endl;
}
```

### static function

**不能访问非静态成员：** 静态成员函数不能直接访问非静态成员变量或非静态成员函数，因为它们没有访问实例特定数据的权限。它们只能访问静态成员变量和静态成员函数。

### Inline function

class中function都是默认inline的，函数小的时候调用inline，减小函数调用时的开销

### Inheritance

派生类继承了基类的所有变量和成员函数

派生类中不能直接访问基类的private的变量和成员函数，但是可以通过基类的成员函数来访问这些成员函数和变量

```cpp
#include <iostream>
using namespace std;

class A {
public:
    int i;
    A(int ii = 0): i(ii) {
        cout << "A(): " << i << endl;
    }
};

class B : public A {
public:
    int i;
    A a;
    B(int ii = 0): i(ii) {
        cout << "B(): " << i << endl;
    }
};

int main() {
    B b(100);

    return 0;
}
```

派生类在被构造的时候会先调用基类的构造函数 ，再调用派生类的构造函数，析构的时候先调用派生类的析构函数，再调用基类的析构函数

基类构造函数 -> 成员变量构造函数 -> 派生类构造函数(Base class is always constructed first)

如果派生类的构造函数中没有显式调用基类的构造函数，则会选择调用基类的无参构造函数

```cpp
class A {
public:
    int i;
    A(int ii = 0): i(ii) {
        cout << "A(): " << i << endl;
    }
};

class B : public A {
public:
    int i;
};

int main() {
    B b;
    return 0;
}
//output A(): 0
```

### Object Slicing（**converting a derived class object to a base class object）**

对象切片会截取掉派生类特有的部分，只保留基类的部分，最好不要强制转换，会造成派生类的信息丢失！！虽然Object slicing也会造成丢失

隐性转换：

```cpp
int main() {
    Derived derivedObj(10, 20);
    // 将派生类对象转化为基类对象（对象切片）
    Base baseObj = derivedObj;
    // 使用基类对象调用基类函数
    baseObj.baseFunction();
    // 访问派生类对象的成员是不允许的
    // baseObj.derivedFunction(); // 这会导致编译错误
    return 0;
}
```

强制转换:

```cpp
int main() {
		Derived derivedObj(10, 20);
		//type casting
    Base* baseObj = dynamic_cast<Base*>(&derivedObj);
    (*baseObj）.baseFunction();
		baseObj->baseFunction();
    return 0;
}
```

### Friend

- 在类中声明一个全局函数或者其他类的成员函数为 friend
- 可以使这些函数拥有访问类内**private和protected**类型的变量和函数的权限
- 友元类，整个类和所有的成员都是友元
- 友元函数本身不是那个类的成员函数，函数签名里不需要 className:: 来表示是这个类的成员函数，直接作为普通函数即可

```cpp
#include <iostream>
using namespace std;
class A {
private:
    int val;

public:
    A(int value) : val(value) {
        cout << "A()" << endl;
    }

    friend void showValue(A a);
};

void showValue(A a) {
    cout << a.val << endl;
}
int main() {
    A a(100);
    showValue(a);
}
```

### Virtual Function***

1. **Virtual Function Declaration**:

   To declare a virtual function in a base class, use the **`virtual`** keyword before the function declaration. Subclasses can then override this function by providing their own implementation.

   1. 定义在基类（父类）中：虚拟函数通常在一个类的基类（也叫父类）中声明和定义。
   2. 被派生类（子类）重写：派生类（子类）可以重写（覆盖）基类中的虚拟函数，以提供特定于子类的实现。这意味着派生类可以根据需要自定义虚拟函数的行为。
   3. 运行时多态性：虚拟函数的一个关键特性是在运行时决定哪个版本的函数应该被调用，而不是在编译时确定。这使得程序能够根据实际对象的类型来调用适当的函数，从而实现多态性。
   4. 使用关键字：具体的编程语言会使用不同的关键字来声明虚拟函数，例如：
      - 在C++中，使用**`virtual`**关键字来声明虚拟函数，而在派生类中使用**`override`**关键字来明确重写基类中的虚拟函数。
      - 在C#中，使用**`virtual`**和**`override`**关键字来实现虚拟函数和重写。

   以下是一个简单的C++示例，说明了虚拟函数的用法：

   ```cpp
   cppCopy code
   #include <iostream>class Shape {
   public:
       virtual void draw() {
           std::cout << "Drawing a shape" << std::endl;
       }
   };
   
   class Circle : public Shape {
   public:
       void draw() override {
           std::cout << "Drawing a circle" << std::endl;
       }
   };
   
   int main() {
       Shape* shape1 = new Shape();
       Shape* shape2 = new Circle();
   
       shape1->draw();  // 输出 "Drawing a shape"
       shape2->draw();  // 输出 "Drawing a circle"
   
       delete shape1;
       delete shape2;
   
       return 0;
   }
   ```

   ```cpp
   class Base {
   public:
       virtual void show() {
           cout << "Base class" << endl;
       }
   };
   ```

2. **Override in Derived Class**:

   In a derived class, you can override a virtual function with the **`override`** keyword to indicate that you intend to provide a new implementation for the base class function.

   ```cpp
   class Derived : public Base {
   public:
       void show() override {
           cout << "Derived class" << endl;
       }
   };
   ```

3. **Polymorphic Behavior**:

   Now, you can create objects of the derived class and use pointers or references to the base class to achieve polymorphic behavior.

   ```cpp
   int main() {
       Base* basePtr;
       Base baseObj;
       Derived derivedObj;
   
       basePtr = &baseObj;
       basePtr->show(); // Calls Base::show() because basePtr points to a Base object
   
       basePtr = &derivedObj;//basePtr is a pointer to the base class, but it points to a Derived class object.
       basePtr->show(); // Calls Derived::show() because basePtr points to a Derived object
   
       return 0;
   }
   ```

   In this example, even though **`basePtr`** is a pointer to the base class, it correctly calls the overridden **`show`** method of the derived class when it points to a **`Derived`** object.

多态 Polymorphism 对于继承体系中的某一系列同名函数，不同的类型会调用不用的函数

静态链接: 基类的指针(引用)指向派生类，并且调用了基类中也存在的同名函数，最终调用的都是基类的同名函数

1. 定义在基类（父类）中：虚拟函数通常在一个类的基类（也叫父类）中声明和定义。
2. 被派生类（子类）重写：派生类（子类）可以重写（覆盖）基类中的虚拟函数，以提供特定于子类的实现。这意味着派生类可以根据需要自定义虚拟函数的行为。
3. 运行时多态性：虚拟函数的一个关键特性是在运行时决定哪个版本的函数应该被调用，而不是在编译时确定。这使得程序能够根据实际对象的类型来调用适当的函数，从而实现多态性。
4. 使用关键字：具体的编程语言会使用不同的关键字来声明虚拟函数，例如：
   - 在C++中，使用**`virtual`**关键字来声明虚拟函数，而在派生类中使用**`override`**关键字来明确重写基类中的虚拟函数。

```cpp
#include <iostream>class Shape {
public:
    virtual void draw() {
        std::cout << "Drawing a shape" << std::endl;
    }
};

class Circle : public Shape {
public:
    void draw() override {
        std::cout << "Drawing a circle" << std::endl;
    }
};

int main() {
    Shape* shape1 = new Shape();
    Shape* shape2 = new Circle();

    shape1->draw();  // 输出 "Drawing a shape"
    shape2->draw();  // 输出 "Drawing a circle"

    delete shape1;
    delete shape2;

    return 0;
}
```

virtual的虚函数关键字是向下负责 的，派生类声明virtual对基类无任何影响

```cpp
#include <iostream>
using namespace std;
class B {
public:
    void f() {
        cout << "bf" << endl;
    }

    virtual void vf() {
        cout << "bvf" << endl;
    }

    void ff() {
        vf();
        f();
    }

    virtual void vff() {
        vf();
        f();
    }
};

class D : public B {
public:
    void f() {
        cout << "df" << endl;
    }

    void ff() {
        f();
        vf();
    }

    void vf() {
        cout << "dvf" << endl;
    }
};

int main() {
    D d;
    B* pb = &d;
    pb->f();
    pb->ff();
    pb->vf();
    pb->vff();
}
// bf
// dvf
// bf
// dvf
// dvf
// bf
```

首先调用f，而f不是虚函数，所以根据指针类型调用了B中的f，输出bf 再调用ff，因为ff也不是虚函数，所以调用B中的ff，B中的ff调用了vf和f，而vf是虚函数，B类型指针指向的是D，所以调用D中的vf，输出dvf，调用f则和上面一样输出bf 再调用vf，由于vf是虚函数，所以要调用D中的vf，输出dvf 再调用vff，虽然是虚函数但是D中没有定义同名函数，所以调用B中的vff，vff中调用vf和f，同2一样输出的是dvf和bf

### Templates

1. **函数模板（Function Templates）：** 函数模板允许你编写通用的函数，其中的某些类型可以作为参数进行泛型化，以便在不同类型上工作。函数模板使用 **`template`** 关键字定义，并使用类型参数进行泛型化。

   ```cpp
   template <typename T>
   T add(T a, T b) {
       return a + b;
   }
   ```

   在上述示例中，**`add`** 函数是一个模板函数，它可以在不同类型上工作，例如 **`int`**、**`double`**、**`float`** 等。

2. **类模板（Class Templates）：** 类模板允许你编写通用的类，其中的某些类型可以作为模板参数进行泛型化。类模板使用 **`template`** 关键字定义，并使用类型参数进行泛型化。

   ```cpp
   template <typename T>
   class Stack {
   public:
       void push(T value);
       T pop();
   };
   ```

   在上述示例中，**`Stack`** 类是一个模板类，它可以用于创建不同类型的堆栈对象，例如 **`Stack<int>`**、**`Stack<double>`** 等。

使用模板的一般步骤包括：

1. 定义模板：使用 **`template`** 关键字定义函数模板或类模板，并声明一个或多个类型参数。
2. 编写通用代码：在函数模板或类模板中编写通用代码，可以使用类型参数来表示泛型类型。
3. 实例化模板：在实际使用时，根据需要提供具体的数据类型或类型参数，从而创建模板的实例。
4. 使用模板实例：使用创建的模板实例来执行操作，就好像它们是普通的函数或类一样。

以下是使用函数模板和类模板的示例：

```cpp
#include <iostream>// 函数模板
template <typename T>
T add(T a, T b) {
    return a + b;
}

// 类模板
template <typename T>
class Stack {
public:
    void push(T value) {
        // 实现入栈操作
    }

    T pop() {
        // 实现出栈操作
    }
};

int main() {
    // 使用函数模板
    int sum = add(3, 5);
    std::cout << "Sum: " << sum << std::endl;

    // 使用类模板
    Stack<int> intStack;
    intStack.push(42);
    int value = intStack.pop();
    std::cout << "Popped value: " << value << std::endl;

    return 0;
}
```

在这个示例中，我们定义了一个函数模板 **`add`** 和一个类模板 **`Stack`**，然后在 **`main`** 函数中实例化并使用它们。这使得代码可以在不同数据类型上通用。

### Type Casting***

向上转换是安全的 向下转换是不安全的

1. **static_cast：** 这是最常用的类型转换操作符，用于执行基本的类型转换。它可以用于执行向上转型，将派生类对象指针或引用转换为基类对象指针或引用，并进行其他常见的类型转换。

   把空指针转换成目标类型的空指针，把任何类型转换成void类型

2. **dynamic_cast：** 用于在继承关系中执行安全的向下转型。它通常与多态一起使用，用于在运行时检查派生类对象是否能够转换为基类对象。

   ```cpp
   Base* basePtr = dynamic_cast<Base*>(derivedPtr);
   if (basePtr) {
       // 转换成功，可以安全地操作basePtr
   } else {
       // 转换失败，derivedPtr不是Base类型或其派生类
   }
   ```

3. **const_cast：** 用于在指针或引用上添加或删除const限定符。这通常用于使非const对象变为const，或者使const对象变为非const。**只能用在指针和引用上**

   ```cpp
   const int x = 5;
   int& y = const_cast<int&>(x); // 从const int转换为int
   ```

4. **reinterpret_cast：** 这是最不安全的类型转换操作符，通常用于执行低级别的类型转换，例如将指针转换为整数或反之。它的使用需要格外小心，因为它可以导致未定义行为。

   ```cpp
   int* ptr = reinterpret_cast<int*>(0x12345678); // 将整数转换为指针
   ```

### Smart Pointer

智能指针使用了一种RAII(资源获取即初始化)技术对普通的指针进行了封装，使得智能指针实质上是一个对象，但是行为表现得像一个指针

自动管理内存的生命周期，避免内存泄漏和悬挂指针（Dangling Pointers）等问题。

1. **std::shared_ptr：** 共享指针是一种可以多次共享所有权的智能指针。多个**`shared_ptr`**可以指向相同的动态分配内存，当最后一个**`shared_ptr`**离开作用域或被销毁时，内存会被自动释放。

   - 引用计数，拷贝都指向相同的内存，每使用他一次，内部的引用计数加1，每析构一次，内部的引用计数减1，减为0时，自动删除所指向的堆内存
   - 引用计数是线程安全的，但是对象的读取需要加锁
   - use_count 计数
   - get 获取原始指针
   - 不能用一个原始指针初始化多个 shared_ptr 否则会造成内存多次释放

   ```cpp
   #include <iostream>
   #include <memory>
   int main()
   {
       std::shared_ptr<int> sharedPtra = std::make_shared<int>(42);
       std::shared_ptr<int> sharedPtrb(sharedPtra);
       std::cout << "Value: " << *sharedPtra << std::endl;
       std::cout<<sharedPtra.get()<<" "<<sharedPtrb.get() << std::endl;//same address
       std::cout << "Reference count: " << sharedPtrb.use_count() << std::endl;//2
       return 0;
   }
   ```

2. **std::unique_ptr：** 独占指针是一种独占所有权的智能指针，只能由一个**`unique_ptr`**拥有，当**`unique_ptr`**离开作用域或被销毁时，它所拥有的内存会被释放。

   - 不允许指针之间的拷贝
   - move移动指针的所有权
   - release释放

   ```cpp
   std::unique_ptr<A> pa(new A());//ok, since the ownership is pa
   A a;
   std::unique_ptr<A> pa(a);//error, initialize it with an existing object a.
   std::unique_ptr<A> pc=std::make_unique<A>(); //ok
   std::unique_ptr<A> pb=std::move(pa);//move ownership
   ```

3. **std::weak_ptr：** 弱引用指针是一种用于打破循环引用的智能指针。它不会增加内存的引用计数，可以用于解决**`shared_ptr`**可能导致的循环引用问题。可以查看资源使用情况

   可以通过一个shared_ptr或者weak_ptr来进行构造，获取观测权

   ```cpp
   std::shared_ptr<int> sharedPtr = std::make_shared<int>(42);
   std::weak_ptr<int> weakPtr = sharedPtr;
   ```

   **使用 `std::weak_ptr`：** 使用  时，通常需要使用 **`lock()`** 成员函数来创建一个 **`std::shared_ptr`**，以便访问  所引用的对象。这是因为  不能直接访问对象。

   ```cpp
   if (auto shared = weakPtr.lock()) {
       // 使用 shared 指向的对象
       std::cout << *shared << std::endl;
   } else {
       // 对象已经销毁
       std::cout << "对象已销毁" << std::endl;
   }
   ```

   **检查 `std::weak_ptr` 的有效性：** 使用 **`expired()`** 成员函数可以检查 **`std::weak_ptr`** 是否引用了一个仍然有效的对象。

   ```cpp
   if (!weakPtr.expired()) {
       // weakPtr 引用的对象仍然有效
   } else {
       // weakPtr 引用的对象已经销毁
   }
   ```

**shared_ptr 循环引用→内存泄漏**

```cpp
#include <memory>
#include <iostream>

class Node {
public:
    std::shared_ptr<Node> next;

    Node() {
        std::cout << "Node constructor" << std::endl;
    }

    ~Node() {
        std::cout << "Node destructor" << std::endl;
    }
};

int main() {
    std::shared_ptr<Node> node1 = std::make_shared<Node>();
    std::shared_ptr<Node> node2 = std::make_shared<Node>();

    // 形成循环引用
    node1->next = node2;
    node2->next = node1;

    return 0;
}
```

### Exception**

- **`try`**：**`try`** 块用于包含可能引发异常的代码块。
- **`throw`**：**`throw`** 关键字用于在 **`try`** 块中引发异常。
- **`catch`**：**`catch`** 块用于捕获和处理异常。
- `**noexcept`** 不抛出异常，如有异常则调用std::terminate终止

异常处理的执行过程

- 程序按照正常的顺序执行，到达try语句，开始执行try内的保护段
- 如果在保护段执行期间没有发生异常，那么跳过所有的catch
- 如果保护段的执行期间有调用的任何函数中有异常，则可以通过throw创建一个异常对象并抛出，程序转到对应的catch处理段
- 首先要按顺序寻找匹配的catch处理器，如果没有找到，则 terminate( ) 会被自动调用，该函数会调用abort终止程序
  - 如果在函数中进行异常处理并且触发了terminate，那么终止的是当前函数
  - 异常类型需要严格的匹配
- 如果找到了匹配的catch处理程序，并且通过值进行捕获，则其形参通过拷贝异常对象进行初 始化，在形参被初始化之后，展开栈的过程开始，开始对对应的try块中，从开始到异常丢弃 地点之间创建的所有局部对象的析构

```cpp
#include <exception>
#include <iostream>
#include <stdexcept>

int main() {
    try {
        int divisor = 0;
        if (divisor == 0) {
            throw std::runtime_error("除零错误");//抛出异常对象
        }
        // 其他可能引发异常的代码
    } catch (const std::exception& e) {//捕获异常对象
        std::cerr << "捕获异常: " << e.what() << std::endl;//std::cerr!!!
    } catch (...) {
        std::cerr << "捕获未知异常" << std::endl;
    }

    return 0;
}
```

1. **`try`** 块包含了可能引发异常的代码，这里我们故意引发了一个除零错误。
2. **`throw`** 关键字用于在 **`try`** 块中引发异常。我们使用 **`std::runtime_error`** 类来创建一个异常对象，然后将其抛出。
3. **`catch`** 块用于捕获异常并处理它。我们使用 **`const std::exception&`** 来捕获异常，然后输出异常信息。
4. **`catch (...)`** 块用于捕获未知异常，以便在无法处理特定类型的异常时执行一些通用处理。

throw会导致一个函数没有执行完毕，但是在函数throw之前会执行所有局部变量的析构函数

# Lib

### Dynamic Library

Makefile

```makefile
CC=gcc
CFLAGS=-O3 -fPIC
DEPS=my_malloc.h

all: lib

lib: my_malloc.o
	$(CC) $(CFLAGS) -shared -o libmymalloc.so my_malloc.o
	#in this part generate libmymalloc.so!

%.o: %.c my_malloc.h
	$(CC) $(CFLAGS) -c -o $@ $< 

.PHONY: clean
clean:
	rm -f *~ *.o *.so

clobber:
	rm -f *~ *.o
```

```scss
lib (目标)
 |
 |--> libmymalloc.so (文件)
       |
       |--> my_malloc.o (依赖文件)
              |
              |--> my_malloc.c (依赖文件)
              |
              |--> my_malloc.h (依赖文件)
```

`Makefile` 确保 `libmymalloc.so` 总是根据最新的 `my_malloc.o` 生成，而 `my_malloc.o` 总是根据最新的 `my_malloc.c` 和 `my_malloc.h` 生成

```shell
g++ -shared -fPIC -o libmylib.so mylib.cpp
#-shared 创建一个共享库
#-fPIC：生成与位置无关的代码（Position Independent Code）
#name: if foo.h then generate libfoo.so
```

- **定义：** 动态库是在运行时被加载到内存中的库。在编译和链接阶段，程序只包含对库函数的引用，实际的函数体在运行时由操作系统动态加载。这样，多个程序可以共享相同的库实例。
- **文件扩展名：** 在大多数系统中，动态库的文件扩展名通常是 `.so`（在Unix/Linux）或 `.dll`（在Windows）。
- 优点：
  - 节省内存和磁盘空间，因为库的实例只需加载一次并共享给所有使用它的程序。
  - 更新库时，不需要重新链接和发布使用该库的程序。
- 缺点：
  - 部署相对复杂，需要确保目标系统上存在正确版本的库。
  - 运行时依赖外部库，可能导致版本问题。

# #pragma once

用于防止头文件被多次包含

```c++
#ifndef HEADER_FILE_NAME_H
#define HEADER_FILE_NAME_H

// 头文件内容

#endif // HEADER_FILE_NAME_H
```

```
#pragma once
```





### 1、new/delete和malloc/free的区别  

- ​    malloc/free是C/C++的库函数，需要stdlib.h；new/delete是C++的关键字；    
- ​    都可用于申请动态内存和释放内存，new/delete在对象创建的时候自动执行构造函数，对象消亡前自动执行析构函数，底层实现其实也是malloc/free    
- ​    new无需指定内存块的大小，编译器会根据类型信息自行计算；malloc需要显式地支持所需内存的大小    
- ​    new返回**指定类型**的指针，无需进行类型转换；malloc默认返回类型为**void\***，必须强行转换为实际类型的指针    
- ​    new内存分配失败时会抛出bad_alloc异常；malloc失败时返回NULL    

###   2、malloc的底层实现  

  Linux下：  

- ​    开辟空间小于128K时，通过**brk()函数**    
  - ​      将数据段.data的最高地址指针**_edata**向高地址移动，即**增加堆**的有效区域来申请内存空间      
  - ​      brk分配的内存需要等到高地址内存释放以后才能释放，这也是内存碎片产生的原因      
- ​    开辟空间大于128K时，通过**mmap()函数**    
  - ​      利用mmap系统调用，在堆和栈之间**文件映射区域**申请一块虚拟内存      
  - ​      128K限制可由M_MMAP_THRESHOLD选项进行修改      
  - ​      mmap分配的内存可以单独释放      
- ​    以上只涉及虚拟内存的分配，直到进程第一次访问其地址时，才会通过缺页中断机制分配到物理页中    

###   3、指针和引用的异同点；如何相互转换  

- ​    本质：引用是别名，而指针是地址    
- ​    指针在运行时可以改变所指向的值，而引用一旦与某个对象绑定之后就不再改变(指向的地址不能改变，但指向的内容可以改变)    
- ​    指针变量在符号表上对应的地址值为**指针变量的地址值**，而引用在符号表上对应的地址值为**引用对象的地址值**；因此指针可以改变指向的对象，而引用的对象不能修改    
- ​    由于硬件通过地址访问内存位置，因此引用可以理解为一个常量指针，只能绑定到初始化它的对象上    

###   4、struct、union的异同  

- ​    struct中每个变量依次存储；union中，每个变量都是从偏移地址零开始存储，同一时刻只有一个成员存储于该地址    
- ​    struct内存大小遵循**结构对齐**原则    
  - ​      数据成员对齐规则：每个数据成员存储的起始位置要从该成员大小的整数倍开始      
  - ​      数据成员包含结构体：结构体成员要从其内部最大元素对象的整数倍地址开始存储      
  - ​      结构体总大小：其内部最大基本成员的整数倍，不足则要补齐      
- ​    union内存大小为其最大成员的整数倍    

###   5、extern C的作用  

  C++支持**函数重载**，即不同名字空间namespace的两个函数原型声明可以完全相同，或者两个函数同名但参数列表不同；g++编译器会对此进行**name mangling**，生成全局唯一的符号名称，使链接器可以准确识别  

  C语言不支持函数重载，即不允许同名符号，所以不需要这些工作，因此在C++代码中加入extern C，是为了**链接规范**  

###   6、memcpy()函数需要注意哪些问题  

  函数原型声明void *memcpy(void *dest, void *src, unsigned int count);  

  memcpy函数用于把资源内存（src所指向的内存区域）中连续的count个字节数据拷贝到目标内存（dest所指向的内存区域）  

- ​    数据长度count的单位是字节，1byte = 8bit    
- ​    数据类型为char，则数据长度就等于元素的个数；其他数据类型则要注意数据长度的值    
- ​    n * sizeof(type_name)的写法    

###   7、strcat、strncat、strcmp、strcpy函数  

  strcpy拷贝函数，不会判断拷贝大小，也没有任何安全检查，不会检查目的地址内存是否够用；  

  strncpy拷贝函数，会计算复制字符串的大小，但没有检查目标的边界；  

  strcmp比较函数，把src所指向的字符串与dest所指向的字符串进行比较，若dest与src的前n个字符相同，则返回0；若dest大于src，则返回大于0的值；若dest小于src，则返回小于0的值  

  strcat功能是将两个char类型连接；strncat功能是在字符串的结尾追加n个字符  

###   8、机器大小端问题  

  大端指数据的**高字节**保存在内存的**低地址**中，数据的**低字节**保存在内存的**高地址**中；小端与此相反。  

  小端：强制转换数据不需要调整字节内容，1、2、4字节的存储方式一样  

  大端：符号位的判定固定为第一个字节，很容易判断正负  

  union判断大小端的方法  

  union从低地址开始存，同一时间内只有一个成员占用内存；修改其中一个成员的值必然会影响另一个成员的值  

###   9、static的用法（定义和用途）  

  static修饰局部变量：使其变为**静态存储方式**（静态数据区），函数执行完成之后不会被释放，而是继续保存在内存中；  

  static修饰全局变量：使其只在本文件内部有效，其他文件不可链接或引用该变量；  

  static修饰函数：静态函数，即函数只在本文件内部有效，对其他文件不可见；避免同名干扰，同时保护  

###   10、const的用法（定义和用途）  

  const起到**强制保护**的修饰作用，可以预防意外改动，提高程序的健壮性  

- ​    const修饰常量：定义时就初始化，以后不能更改；    
- ​    const修饰形参：func(const int a); 该形参在函数里不能改变；    
- ​    const修饰类成员函数：const类成员函数不能改变成员变量的数值    

###   11、const常量和#define的区别（编译阶段、安全性、内存占用等）  

- ​     const定义的常量有类型名字，存放在内存的静态区域中，在编译时确定其值；     
- ​     \#define定义的常量是没有类型的一个**立即数**，编译器会在预处理阶段将程序中所有使用到该常量的地方进行**拷贝替换**；     
- ​     由于#define的拷贝有很多份，故宏定义的内存占用要高得多     





###   12、volatile的用法  

  被定义为volatile的变量可能会被意想不到地改变，编译器不会对volatile变量有关的运算进行**编译优化**：每次使用该变量必须从内存地址中读取，而不是保存在寄存器中的备份  

  用到volatile的几种情况  

- ​    并行设备的硬件寄存器（如状态寄存器）    
- ​    中断服务子程序会访问到的非自动变量    
- ​    多线程应用中被几个任务共享的变量    

###   13、常量指针、指针常量、常量引用（没有引用常量）  

   常量指针即常量的指针，指针所指向的是个常量，可以被赋值为变量的地址，但是不能通过这个指针来修改   

   指针常量本质是一个常量，指针所指向的值不可以改变，但指向的地址所对应的内容可以变化   

   （具体参考问题17）
    

​    14、变量的作用域（全局变量和局部变量）   

- ​    全局变量：在所有函数体外部定义的，程序所在部分都可以使用，不受作用域的影响（生命期一直到程序的结束）    
- ​    局部变量：局限于作用域内，默认为auto关键字修饰，即进入作用域时自动生成，离开作用域时自动消失；    
- ​    局部变量可以和全局变量重名，在局部变量作用域范围内，全局变量失效，采用的是局部变量的值    

​    15、sizeof和strlen   

- ​    sizeof是一个操作符或关键字，不是一个函数，而strlen是一个函数    
- ​    sizeof返回一个对象或类型所占的内存字节数，不会对其中的数据或指针做运算    
- ​    strlen返回一个字符串的长度，不包括'/0'    

###   16、sizeof(struct)和内存对齐  

  内存对齐作用：1、移植原因：某些硬件平台只能在某些特定地址处取特定类型的数据；2、性能原因：数据结构(尤其是栈)应尽可能在自然边界上对齐，未对齐内存需要做两次内存访问，对齐内存仅需要一次  

  struct内存对齐原则：  

- ​    结构体成员中，第一个成员偏移量是0，排列在后面的成员的当前偏移量必须是当前成员类型的整数倍    
- ​    结构体本身占用内存大小，应是结构体内最大数据成员的最小整数倍    
- ​    **#pragma pack(n)**预编译指令，所有成员对齐以n字节为准，不再考虑当前类型和最大结构体内类型    

  union内存对齐原则：  

- ​    union字节数必须是占用字节数最多的成员的字节数的倍数，而且需要能够容纳其他成员    

###   17、char * const，const char *  

  const char *ptr指向字符常量的指针，ptr是一个char*类型的常量，所指向的内容不能修改；  

  char * const ptr指向字符的指针常数，即const指针，不能修改ptr指针，但可以修改该指针指向的内容  

###   18、inline函数  

  被频繁调用的函数会导致栈空间或栈内存的大量消耗，因此引入inline修饰函数，即**内联函数**；内联函数将在程序的每个调用点上“内联式地”展开。内联以代码膨胀为代价，省去了函数调用的开销，从而提高函数的执行效率  

###   19、内存四区，变量存储区域（堆/栈）  

- ​    代码区：.text    
- ​    全局初始化数据区/静态数据区：.data，明确被初始化的全局变量、静态变量和常量数据，整个生命周期内都可能需要访问    
- ​    未初始化数据区：.bss，全局未初始化变量    
- ​    栈区stack：由编译器自动分配释放，存放函数的参数值、局部参数的值等。每当一个函数被调用，该函数返回地址和调用信息，如某些寄存器内容，会被存储到栈区，这个被调用的函数再为它的自动变量和临时变量在栈区上分配空间，即C实现函数递归调用的方法    
- ​    堆区heap：用于动态内存分配    

###   20、数组名和指针区别  

- ​         

  ​    数组名对应的是指向数组首元素地址的指针，但该指针所指的地址不能被改写；    

- ​         

  ​    指针是变量指针，所指向的地址可以更改；    

- ​         

  ​    对数组名取地址，得到的是数组首元素的地址；对指针取地址，得到的是指针变量所在地址    

- ​         

  ​    对数组名使用sizeof，得到的是数组元素个数与元素类型字节数的乘积；而对指针使用sizeof得到的是指针类型的字节数    

  
 

###   21、strcpy和memcpy的区别  

- ​    复制的内容不同：strcpy只能复制字符串，而memcpy可以复制任意内容，例如字符数组、整型、结构体、类等    
- ​    复制的方法不同：strcpy不需要指定长度，它遇到被复制字符的串结束符"\0"才结束，所以容易溢出。memcpy则是根据其第3个参数决定复制的长度    
- ​    用途不同：通常在复制字符串时用strcpy，而需要复制其他类型数据时则一般用memcpy    

  
 

###   22、递归和循环如何选择  

- ​    递归算法优点是代码简洁清晰，容易验证正确性；缺点是需要多次数的函数调用，如果调用层数比较深，需要额外增加堆栈处理，会对执行效率有一定影响    
- ​    循环算法速度快，结构简单；缺点是不能解决所有问题，有些问题不太适用    
- ​    总结：在求解规模不确定或求解规模明显过大情况下，递归的函数调用开销会很大，因此效率会很低    

  
 

###   23、野指针  

- ​    野指针是指指向内存未知区域或访问受限区域的指针，结果未知    
- ​    产生原因    
  - ​      指针定义时未被初始化，默认值随机      
  - ​      指向的内存区域被释放时，指针没有置空      
  - ​      指针操作超越变量作用域，如函数返回指向栈内存的指针或引用      

  
 

###   24、全局变量和静态变量区别  

- ​    存储方式上并无区别，都是静态存储方式    
- ​    非静态全局变量作用域为整个源程序；当一个源程序由多个源文件组成时，非静态的全局变量在各个源文件中都是有效的，而静态全局变量则限制了其作用域，只在定义该变量的源文件内有效

