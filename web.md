#  fr Webpage files

HTML

### CSS

JS

```html
<h1>Heading!</h1>
<div>Paragraph!</div>
<div>Info</div>
```

```css
div {
  color: red;
  font-family: Arial;
  font-size: 24pt;
}
```



```html
<h1>Heading!</h1>
<div>Paragraph!</div>
<div class="info">Info</div>
```

```css
.info {
  color: red;
  font-family: Arial;
  font-size: 24pt;
}
```



```html
<h1>Heading!</h1>
<div>Paragraph!</div>
<div id="unique">Info</div>
```

```css
#unique {
  color: red;
  font-family: Arial;
  font-size: 24pt;
}
```

**ID**

An element can have only one ID

IDs must be unique in any given HTML document

```
<div id="element-id">
#id{
...
}
```

**Class**

An element can have multiple classes

```
<div class="class1 class2 class3">
.class{
...
}
```

![img](https://lh7-us.googleusercontent.com/DQNWVjOQmUIDYV0nrfnZDiqQ3RQrWUfYe-PKGpMlJ4urITBdtMukuJvZv5S37Qnf8-vfkSM6F1TAR_JRxoEkmTspQCFWPq8e_JtpWXORw_NlhGS254soBzKcwP8KMrviJqSroHH1Mic0x7J9stKl3URKHg=s2048)

```
<!DOCTYPE html>
<html>
  <head>
    <title>Title!</title>
    <link rel="stylesheet"  
          href="style.css" />
  </head>
  <body>
    <h1 class="my-class">Heading!</h1>
    <p>Paragraph!</p>
  </body>
</html>
```

### Flex

Flexbox is a flexible box that lets you control the direction, sizing, distribution, and more of items.

```css
.flex{
	display:flex;
	flex-direction:row;#column
	border:1px solid green;
}
.large{
    flex-basis:0;
}
.small{
    flex-basis:100px;
}
.grow{
    flex-grow:1;
}
```

### Advanced CSS Topics

- descendant selector (space)
- child selector (>)
- adjacent sibling selector (+)
- general sibling selector (~)

**语法**：`A B`

**介绍**：选择所有属于A元素的后代元素B，不论B元素在A元素中的层级深度。

**示例**：`.container div` 选择所有属于`.container`类的元素内的所有`div`元素。

**语法**：`A > B`

**介绍**：选择所有属于A元素的**直接子元素B**。(相当于第一个?)

**示例**：`.container > div` 选择所有属于`.container`类的元素内的直接子`div`元素。

**语法**：`A + B`

**介绍**：选择紧接在A元素之后的兄弟元素B，并且A和B有相同的父元素。

**示例**：`h1 + p` 选择紧跟在`h1`元素后的第一个`p`元素。

**语法**：`A ~ B`

**介绍**：选择A元素之后的所有兄弟元素B，并且A和B有相同的父元素。

**示例**：`h1 ~ p` 选择在`h1`元素之后的所有`p`兄弟元素。

```css
display:none;
visibility:hidden;

  /* 当元素内容溢出其容器时，会显示滚动条，不论内容是否实际溢出 */
overflow: scroll;
overflow: auto;
```

# Javascript

run at `Ctrl + Shift + J`

- Boolean (true, false)
- Number (12, 1.618, -46.7, 0, etc.)
- String (“hello”, “world!”, “12”, “”, etc.)
- Null
- Undefined

```javascript
===严格相等,如果类型不同也false! 
"1"===1 false
1=="1" true
we use === to check equality in JavaScript.
!==
```

`==` It performs *type coercion* (i.e. forces the arguments to be of the same type before comparing them)

let const (only use let plz!!!!)

let is block-scoped

var is function-scoped

let exists because people kept getting bugs when trying to use var

**just use let!**

**undefined**: means “declared but not yet assigned a value”

**null**: means “no value”

```javascript
console.log();
const a=5;
const b=10;
console.log('a*b=${a*b}'');
console.log('a*b='',a*b);
//writes to the JavaScript console:

console.trace('Trace log');

console.group('User Details');
console.log('Name: Alice');
console.log('Age: 30');
console.groupEnd();

console.clear();

console.time('loop time');
console.timeEnd('loop time');
```

- `console.error()`: 用于打印错误信息。
- `console.warn()`: 用于打印警告信息。
- `console.info()`: 用于打印信息消息。
- `console.debug()`: 用于打印调试信息（有时与 `console.log()` 等价）

```javascript
alert("Congratulations!");
```

### Arrays

```javascript
let my_array=["asd",12,false,"dd"];
my_array[1];
my_array[2]=11;
my_array.pop();
my_array.push("aa");
my_array.unshift("bb");
//FIFO unshift is add into head, and push is add into tail
for(let i=0;i<my_array.length;i++){
    my_array[i];
}
for(const ele of my_array){}
```

### Objects

```javascript
const myCar={
	make:"Ford",
	year:2005,
}
myCar.make
myCar["make"]
const make=myCar.make;
const year=myCar.year;
//Object destructuring
//这里变量名字一定要一样!!
const {make,year}=mycar;
```

### Object references

=== checks if the *references* are equal.

Two objects created separately are stored separately, so their references are different!

Same goes for arrays – two arrays created separately have different references.

### shallow copy

```javascript
let arr=[1,2,3];
let copyarr=[...arr];

let obj={name:"hyc"};
let copyobj={...obj};
```

如果你直接使用 `copyarr = arr`，那么 `copyarr` 和 `arr` 将指向同一个数组对象。这不是复制，而是两个变量共享同一个数组的引用。这意味着，通过任一变量所做的修改（如添加、删除元素）都会影响到另一个，因为它们指向的是同一个内存地址中的数据。

```js
arr.concat(["a"]);
[...arr,"a"];
```

### shallow copy and deep copy!

**in shallow copy, object and array will be the same address, so when change this will change on others. In deep copy, object and array will also create a new!**

{} object, [] array in JS

{} dict, []list ,() tuple in python

### Functions

```javascript
const foo=(parameters)=>{
	//body
};
//将一个函数赋值给一个常量变量 foo，这被称为函数表达式
function foo(){
  	//body  
};
```

```javascript
foo(); //is return value
let bar=foo;
```

### Closure

```javascript
function createCounter(){
	let count=0;
	return function(){
		count++;
		console.log(count);
	};
}
let counter = createCounter();
counter();
counter();
```

### class

```javascript
class A{
	constructor(a,b){
		this.a=a;
		this.b=b;
	}
	product=()=>{
		return this.a*this.b;
	};
}
const obj=new A(1,2);

```

### Connect

```html
<script src="game.js" defer></script>
```

 `defer` 属性用于延迟脚本的执行，直到整个 HTML 文档完全解析完毕

- **`async`**：
  - 脚本加载与 HTML 解析是并行进行的，脚本加载完成后立即执行。
  - 多个 `async` 脚本的执行顺序不确定，谁先加载完谁先执行。
  - 适合独立于其他脚本或 DOM 树的脚本，比如分析代码或广告脚本。

### 监听器

```js
window.addEventListener(type, listener, options);
window.addEventListener('keydown', function(event) {
    console.log(`Key pressed: ${event.key}`);
}, { once: true }); //一次性
//, { passive: true } //被动监听器
window.removeEventListener('keydown', handleKeydown);
```

- `click`：点击事件
- `keydown`：键盘按下事件
- `keyup`：键盘松开事件
- `resize`：窗口大小改变事件
- `scroll`：滚动事件
- `load`：文档加载完成事件
- `unload`：文档卸载事件
- `focus`：元素获得焦点事件
- `blur`：元素失去焦点事件

### Callback Functions

```js
const func1=(arr,func2)=>{
	const newArr=[];
	for(let i=0;i<arr.length;i++){
        newArr.push(func2(arr[i]));
    }
    return newArr;
};

const func2=(tmp)=>{
    return tmp*2;
}
const arr=[1,2,3];
const newarr=func1(arr,func2);
```

```js
updateAnimation()
// call every 10 milliseconds
setInterval(updateAnimation,10);
```

```js
window.addEventListener('keydown', (event)=>{
    if(event.key==="ArrowUp"&&inputDirection.x!==0){
        inputDirection={x:0,y:-1};
    }else if(event.key==="ArrowDown"&&inputDirection.x!==0){
        inputDirection={x:0,y:1};
    }else if(event.key==="ArrowLeft"&&inputDirection.y!==0){
        inputDirection={x:-1,y:0};
    }else if(event.key==="ArrowRight"&&inputDirection.y!==0){
        inputDirection={x:1,y:0};
    }
}
);
```

```js
router.get("/comment",(req,res)=>{
    Comment.find({parent:req.query.parent}).then((comments)=>{
        res.send(comments);
    });
});
```

### Map

千万注意!map是` stories.map((obj)=>(<SingleStory creator_name={obj.creator.name}/>));`

这里是()=>()! 然后用的component!

```js
const arr1=[1,2,3];
const arr2=arr1.map((num)=>(num*3));

const rectangles = [
  { width: 10, height: 5 },
  { width: 6, height: 6 }
];
const areas=rectangles.map((a)=>(a.width*a.height));
console.log(areas); 
```

### Filter

```js
const arr=["a","b","c"];
const newarr=arr.filter((a)=>a!="a");
console.log(newarr); 
```

### Conditional rendering 

```js
if(isLoggedIn){
	content=<AdminPanel/>;
} else {
	content=<LoginForm/>;
}
return (
	<div>
	{content}
	</div>
);
```

```js
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

```js
<div>
	{isLoggedIn && <AdminPanel/>}
</div>
```

## Responding to eventsReact

### Component Structure

`<MyComponent myprop1="this is a string" myprop2={25} />`

(here, props.myprop1 is "this is a string" and props.myprop2 is 25).

### Comment Props

Information **(inputs)** passed down from a **parent** to a **child** component 

immutable: 单向数据流

**Parent(Post)**

> **props:**
>
> - author name = “Kenneth Choi”
> - comment content = “me when tsao: 😰🫡”
> - date posted = 1 minute ago
> - profile picture = ken-pfp.jpg

**Child(comment)**

![img](https://lh7-us.googleusercontent.com/3xmt4URSiAdw65PAtEGsgwTyYEosCrNG-EkMV4E160Ar75Rw6fZHG_w5Xkm4JLq4WJ8_lgjwurHqq9MlF-mDpNFV6TYd3_MORGjtppit4EBwkKE9qmkuVCzRplBEkA6Lta8I95z7mdN3X96pwyPABIjTqA=s2048)

### State

```js
import { useState } from 'react';
const [variable1, setVariable1] = useState(initialValueOfVariable1)
```

Information maintained by a component 

- State lets us control what is displayed in the application
- State can be **updated** (i.e. is **mutable** unlike props)
- Can be updated by either **human** inputs (e.g. button clicks) or **computer** inputs (e.g. network responses) 

keep comment data in **<Post/>**’s state and not **<Comment/>**’s state

->Allows us to control **which comments** are displayed under the post

![](./assert/react1.png)

**eg: Showing Comment Replies using state**

![](./assert/react2.png)

JSX stricter version of HTML

Return JSX = what the React component should render

*Fragments* (`<>` and `</>`) to wrap multiple adjacent JSX elements 

```js
import React, {useState} from 'react';

const CommentReply=(props)=>{
    //add state
    const [isLiked,setIsLiked]=useState(false);
    
    //return JSX（JavaScript XML）
    return (
        <div className="comment-test">
            <h5>{props.name}</h5>
            <p>{props.content}</p>
        </div>
    )
}

export default CommentReply
//这行代码将 CommentReply 组件作为默认导出导出。这意味着你可以在其他文件中导入这个组件，并使用它来构建你的应用。
```

`const [isLiked,setIsLiked]=useState(false);`

**Initializes** **isLiked** **state to false** 

**Declares** **setIsLiked** **as the function to update** **isLiked**

Example:

setIsLiked(true)will set isLiked to true

### Router

A nice way of organizing your website’s internal structure by having different pathNames route to different React components (remember React components can represent entire pages in your website!) 

- Feed component: [https://examplewebsite.com/](https://website.com/path)
- Profile component: [https://examplewebsite.com/profile](https://website.com/path)
- NotFound component: [https://examplewebsite.com/anyOtherPath](https://website.com/path)

```
<Router>
	<Feed path="/" />
	<Profile path="/profile/" />
	<NotFound default />
<\Router>
```

### Lifecycle/useEffect

Sometimes we want to do stuff just once, at the beginning, and not **every time**. Or sometimes we want to do stuff once at the beginning and every time a specific prop changes. For these use cases we use the 'useEffect' hook.

* `useEffect(someFunction, []):` runs once at the beginning
* `useEffect(someFunction, [props.title]):` runs once at the beginning and every time props.title changes
* `useEffect(someFunction, [props.title, exampleState2]):` runs once at the beginning and every time props.title changes or exampleState2 changes

### .then()

`asynchronousfunction.then(*secondfunction)` means that asynchronous function runs, and **then** after it finishes, *secondfunction* runs. 

Some functions in javascript, like 'get' and 'post', are **asynchronous**.

```js
function get(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Fetched data from " + url);
    }, 2000); // 模拟网络延迟
  });
}

get("/api/cats").then(response => {
  console.log(response); // 这行代码将在 2 秒后执行
});

console.log("hello"); // 这行代码会立即执行
```

### 异步行为解释

1. **异步请求**：在 JavaScript 中，异步请求（如通过 `fetch`、`XMLHttpRequest` 或其他方法发起的 HTTP 请求）是非阻塞的。这意味着当你发起一个请求时，JavaScript 不会等待请求完成，而是继续执行后续代码。
2. **立即执行后续代码**：由于异步请求不会阻塞代码执行，任何在异步请求之后的代码都会立即执行，而不会等待请求的结果返回。
3. **回调函数或 `Promise`**：当异步请求完成时，回调函数或 `Promise` 的 `.then()` 方法会被调用来处理返回的结果。

可以处理高并发任务，如用户交互、网络请求和文件操作，而不会阻塞主线程，确保应用的响应性

### Respond

```js
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

### Sharing data

```js
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

1. **独立状态**：每个 `MyButton` 组件都有自己的 `count` 状态，因为 `useState` 是在 `MyButton` 内部调用的。
2. **独立更新**：点击一个按钮只会更新该按钮的 `count` 状态，而不会影响其他按钮的 `count` 状态。

```js
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

`count` 状态在 `MyApp` 组件中声明，并通过 props 传递给每个 `MyButton` 组件

点击任意一个按钮，都会调用传递的 `handleClick` 函数，更新 `MyApp` 中的 `count` 状态，导致所有按钮的 `count` 状态同步更新。

### trivals

```js
const S=Array(9).fill(null);
const S1=S.slice();
//shallow copy one
```

当你传递 `onSquareClick={handleClick}` 时，你实际上是在传递 `handleClick` 函数作为 prop，而不是调用它。没有被立即执行

```js
<Square onSquareClick={handleClick} />
```

```js
<Square onSquareClick={handleClick(0)} />
```

你是在传递 `handleClick(0)` 的返回值，而不是函数本身

**Solution**

```js
<Square onSquareClick={() => handleClick(0)} />
```

## APIs and Promises

### HTTP Request

* URL+Params
* HTTP Method
* Headers
* Body

#### Target (URL) and Query Params

```
https://www.youtube.com/results?search_query=web+lab
URL:https://www.youtube.com/results
Query Params:search_query: “web lab”
```

#### HTTP(S) Methods

- GET, well, gets data
- POST sends data, often creates change or new data
- PUT replaces data
- DELETE, well, deletes data

### Response

* Status Code
  * 404
  * 400 bad request
  * 500 Internal server error
  * **200** OK
* Headers
* Body (Usually JSON format)

#### Status Code

- 1xx- informational
- 2xx- you succeeded
- 3xx- redirect
- 4xx- you did something wrong
- 5xx- server did something wrong

### API

- API is an interface between clients and data they want
  - Lets us access the data we’re supposed to have access to, but not other people’s data
  - API acts like a middleman

![img](https://lh7-us.googleusercontent.com/DpAJM1grjYAER2tFH8gSbJtw2s-LExQ1PtxRZcQlgmkK2kUsgIppZJXo29a9gLNo7buNlF07f8eLxKf3iQezzi5uK8pG8oDtf5IkfZ41wmnDh4FleBszhWOkQtS67EA_DZw08i6wSmaCwd4G5kSmEXwxNA=s2048)

```js
get("/api/getUserByNumber",{phoneNumber:"6172530418";});
//GET /api/getUserByNumber?phoneNumber=6172530418

post("/api/adduser",{
  name: "Nick Tsao",
  school: "MIT",
  phoneNumber: "6172530148",
});
/*
POST /api/adduser
Params: {
  name: "Nick Tsao",
  school: "MIT",
  phoneNumber: "6172530148",
}
*/
```

```js
const user=get("/api/getUserByNumber",{phoneNumber:"6172530418";});
//[object promise]
```

return type of get is **PROMISE**

### Async

```js
useEffect(() => {
  slow().then((cat) => {
    console.log("a", cat);
  });
  console.log("b");
  console.log("c");
  console.log("d");
}, []);
```

```
b
c
d
a cat
```

同步代码会立即执行，而异步代码会被推入到事件循环中稍后执行

```js
const foo=async()=>{
	console.log(await a+await b);
};
foo();

async function main(){
    const a=slow(9);
    const b=slow(10);
    console.log(await a+ await b);
}
main();
```

尽管 `main()` 立即返回，但它启动的异步操作会在事件循环中完成，并在 `console.log` 输出结果之前不会退出程

```js
useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
}, []);

useEffect(() => {
    const getComment=async()=>{
        const commentObjs=await get("/api/comment", { parent: props._id });
        setComment(commentObjs);
    };
    getComment();
}, []);
```



### Promises

Promises allow for **asynchronous** processing

异步操作执行可能需要一段时间才能完成的任务（如网络请求、文件读取、计时器等），而不会阻塞程序的其他部分继续运行

1. **Pending（待定）**：初始状态，操作尚未完成。
2. **Fulfilled（已完成）**：操作成功完成。
3. **Rejected（已拒绝）**：操作失败。

```js
myPromise
  .then((result) => {
    console.log(result); // "Operation was successful!"
  })
  .catch((error) => {
    console.error(error); // "Operation failed."
  });
```

#### .then()

Once the promise is **fulfilled**, do stuff (call a callback function).

Returns a promise.

#### .catch()

Once the promise is **rejected**, do stuff (call a callback function).

Returns a promise.

```js
get("/api/stories").then((storyObjs)=>
     {setStories(storyObjs)}).catch((err)=>{
    console.log("error",err.message);
});
```

- Calling APIs is slow
  - Lots of waiting for the network or the server
- We can do other stuff while calling an API if we use promises! And it’ll probably be done before we’re done calling the API

```js
const f = (promise) => {
  promise
    .then((val) => console.log("a"))
    .then((val) => console.log("b"))
    .catch((err) => console.log("error!"));
};

const promise = /* Some way of getting a promise that will reject. Maybe there's a network issue. */
f(promise);

```

- 如果在 `Promise` 链的任何部分发生错误（例如，`Promise` 被拒绝），错误会沿着链向下传播，直到遇到第一个 `.catch()` 方法,只运行.catch(),不运行.then()!
- 一旦 `.catch()` 方法捕获到错误，后续的 `.then()` 方法不会再执行。

### multiple promise

#### Promise.all()

```js
const promise1=get('/api/comments',{parent:parentId1});
const promise2=get('/api/comments',{parent:parentId2});
const promise3=get('/api/comments',{parent:parentId3});

const promises=[promise1,promise2,promise3];
Promise.all(promises).then((allResults)=>{
    //
}).catch((err)=>{
    //
});
```

Returns a promise that resolves to array of results of input promises

#### Promise.race()

```js
Promise.race(promises).then((firstResults)=>{
    //
}).catch((err)=>{
    //
});
```

Returns a promise that fulfills or rejects with the first promise that fulfils or rejects

#### Promise.any()

```js
Promise.any(promises).then((anyResults)=>{
    //
}).catch((err)=>{
    //
});
```

Returns a promise that resolves when any of the input promises fulfills

### Hooks : useEffect

```js
let arr = ["apple", "banana"];

const setArr = (newArr) => {
    arr = newArr;
};

const a = () => {
    setArr([...arr, "me"]);
    console.log(arr);
};

a();
```

在这个示例中，console.log(arr) 将输出 ["apple", "banana"]，因为 setArr 的状态更新是异步的，arr 的新值在下一次渲染后才会更新。

want to do something immediately after state is changed?

```js
const myFunction=()=>{}
useEffect(myFunction,[var1,var2]) 
//Calls myFunction every time var1 or var2 changes

useEffect(myFunction,[])
//Calls myFunction only once when the component is rendered for the first time (on mount)

useEffect(myFunction)
//Calls myFunction at every render (first component call + every time any state changes)
```

```js
   const [arr, setArr] = useState(["apple", "banana"]);

    const a = () => {
        setArr([...arr, "me"]);
    };

    useEffect(() => {
        console.log(arr); // 在 arr 变化后打印新的 arr
    }, [arr]);
```

也就是arr改变后,调用useEffect里的函数,就打印出新的,也就是强制sync,先改a再打印a!

#### dismount

```js
useEffect(()=>{
	return ()=>{
        //cleanup function
        //Runs when the component dismounts
	}
},[/*dependencies*/])
```

Returning a function from the function passed to useEffect lets you define something that happens on component dismount

### get() & post()

```js
get("/api/foo",{bar:0}).then((res)=>console.log(res));
```

### APIs, and Routing

```js
import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

const Feed = () => {
  const [story,setStory]=useState([]);
  useEffect(() => {
    get("/api/stories").then((promise) => {
      setStory(promise);
    }); 
  },[]);
  return <div>{JSON.stringify(story)}</div>
};

export default Feed;
```

注意!这里要有{}!

```js
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";

<Router>
	<Feed path="/" />
    <Profile path="profile" />
    <NotFound default />
</Router>
```

#### Link

```js
import { Link } from "@reach/router";
```

Current URL: localhost:5050/profile

Relative : `<Link to="newpage">Click me</Link>`

`localhost:5050/profile/newpage`

Absolute: `<Link to="/newpage">Click me</Link>`

`localhost:5050/newpage`

### ForEach

Just like map, but mutates the array

```javascript
array.forEach((element)=>{output});
myNumbers = [3, 1, 4, 1, 5, 9];
myNumbers.forEach((number) => {
	myNumbers.pop(number); 
});
//pop() remove the last element in the array!
//[3,1,4]
```





# Node.js

```shell
nvm ls
nvm install <version>
nvm alias default <version>
nvm use <version>
nvm uninstall <version>
```

```shell
npm audit
npm audit fix

npm install
npm start
npm run hotloader
```

`npm start` 启动的开发服务器类似于服务器端，它提供文件和资源的服务，并处理编译和重新加载。

`npm run hotloader` 启动的热加载器类似于一个辅助工具，它增强了开发服务器的功能，使代码变化能即时反映到浏览器上

#### /client 

- Contains all of our React code, components, pages, utilities, etc. (Front end)

#### /server

- Contain all of our backend code

```js
// server.js
//create a express server
const app=express();
app.get("/api/stories",(req,res)=>{
  res.send({message:"aa"});
});
//req is the incoming request
//res is your server’s response
```

#### req

- `req.query`：**GET**包含 URL 中的查询参数，如 `/api/stories?name=John` 中的 `{ name: 'John' }`。
- `req.params`：包含 URL 中的路径参数，如 `/api/stories/:id` 中的 `:id`。
- `req.body`：包含 **POST** 请求中的请求体数据（需要中间件如 `body-parser`）。
- `req.headers`：包含请求头信息。
- `req.method`：请求的方法（如 GET、POST 等）。
- `req.url`：请求的 URL。

#### res

- `res.send()`：发送响应体，可以是字符串、对象、数组等。
- `res.json()`：发送 JSON 格式的响应体。
- `res.status()`：设置响应的 HTTP 状态码。
- `res.set()`：设置响应头。
- `res.end()`：结束响应过程。

#### Middleware中间件

![img](https://lh7-us.googleusercontent.com/Mm_2qCdn31Mz16XnuKEXdMFOlZrmvyHPa7bGnYjD0yiqcyjanm_G-0ga0EXI88kQAt0tTOaTh9M26rMsgz34TlAorrzLP08K3a0GdxJK9U66xIS2rZeRdoFBUDyGWPQGTwBTiR7lqByfR76UyGk8Dg8gtQ=s2048)

```js
//import
const express=require("express");
const path=require("path");

const app=express();
app.use(express.json());

//log record (need use next() to exit! or req will be hung up or suspended)
app.use((req,res,next)=>{
    console.log('Time:',Date.now())
    next()
});

//Error Handling
app.use((error,req,res,next)=>{
    //handle error
    const status = err.status ||500;
	if(status===500){
        console.log("error!!");
        console.log(err);   
    }
    res.status(status);
    res.send({
        status:status,
        message:err.message,
    });
});

//定义一个 API 路由：
//当请求路径为 /api/test 时，执行相应的回调函数
app.get("/api/test",(req,res)=>{
    //send一个JSON格式的响应
    res.send({message:"1st APT"});
});
//构建一个绝对路径，指向 React 应用的构建目录 client/dist
//将 reactPath 目录下的所有文件作为静态文件提供服务。当客户端请求一个路径对应的文件存在于该目录时，服务器会直接返回该文件，而不经过其他路由处理器。
const reactPath=path.resolve(__dirname,"..","client","dist");
app.use(express.static(reactPath));
//API 路由
app.get("*",(req,res)=>{
    //reactPath 目录下的 index.html 文件
    res.sendFile(path.join(reactPath,"index.html"));
});
```

### Moving our endpoints from our **server** to our **router**

Steps:

1. Create a separate file (we have already done this by making api.js)
2. Define a router for /api (use express.Router()) in api.js
3. Define middleware to route any api paths prefixed with /api to api.js
4. **Move our** **/api/test** **endpoint from** **server.js** **to** **api.js**

**server.js**

```js
const express = require('express');
const app = express();

// 导入不同模块的路由
const apiRouter = require('./api');
const usersRouter = require('./users');

app.use(express.json());
// 使用不同的路由模块
app.use('/api', apiRouter);
app.use('/users', usersRouter);
```

**apiRouter.js**

```js
const express=require("express");
const router=express.Router();

// 定义多个 API 路由
router.get('/test', (req, res) => {
  res.send('API 测试端点');
});

router.get('/users', (req, res) => {
  res.send('获取用户列表');
});

router.post('/users', (req, res) => {
  res.send('创建新用户');
});

//export router
moudle.exports=router;
```

# ??

这里的get {}

相当于url:`/api/comment?parent=<props._id>`

然后.then里返回的是得到的res回复值!

```js
useEffect(()=>{
	get("/api/comment",{parent:props._id}).then((comments)=>{
		serComments(comments);
});
},[]);
```

```js
//client.js
const query={
	content:"1"
};
get("/api/web",query).then((comment)=>{
//...
});

//server.js
router.get("/api/web",(req,res)=>{
    console.log(req.query.content);
});
```

```js
//client.js
const body={
	content:"1"
};
get("/api/web",body).then((comment)=>{
//...
});

//server.js
//parse request body
app.use(express.json());
router.post("/api/web",(req,res)=>{
    console.log(req.body.content);
});
```

### API读取数据发送

```js
const myName = "Anonymous";

const data = {
  stories: [
    {
      _id: 0,
      creator_name: "Tony Cui",
      content: "Send it or blend it?",
    },
    {
      _id: 1, 
      creator_name: "Andrew Liu",
      content: "web.labing with Tony <3",
    }
  ],
  comments: [
    {
      _id: 0,
      creator_name: "Stanley Zhao",
      parent: 0,
      content: "Both!",
    },
  ],
};

router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API! In its own file!" });
});

router.get("/stories", (req, res) => {
  // send back all of the stories!
  res.send(data.stories);
});

router.get("/comment", (req, res) => {
  const filteredComments = data.comments.filter((comment) => comment.parent == req.query.parent);
  res.send(filteredComments);
});

// TODO-2 (step2) Add post story endpoint
router.post("/story", (req, res) => {
    const newStory={
        _id:data.stories.length,
        creator_name:myName,
        content:req.body.content,
    };
    data.stories.push(newStory);
    res.send(newStory);
});

// TODO-3 (step2) Add post comment endpoint

router.post("/comment", (req, res) => {
    const newComment={
        _id:data.comments.length,
        creator_name:myName,
        parent: req.body.parent,
        content:req.body.content,
    };
    data.comments.push(newComment);
    res.send(newComment);
});

// TODO-1 (step2) Add catch-all endpoint for /api
router.all("*", (req, res) => {
    console.log(`API not found ${req.method} ${req.url}`);
    res.status(404).send({message:"API Route not found"});
  });

module.exports = router;
```

# DataBase

Read and Write to file(not a good way!!)

```js
const fs = require('fs');

function readDataFromFile(){
	if(!fs.existsSync("data.txt")) return;
	fs.readFile("data.txt",(err,fileData)=>{
		data=JSON.parse(fileData);
	});
}

function writeDataToFile(){
	fs.writeFile("data.txt",JSON.stringify(data),(err)=>{
		if(err) console.log(err);
	});
}
```

- **Write Speed:** Saves *every story/comment* whenever someone posts
- **Memory Usage:** Still keeps all stories/comments in RAM
- **Query Speed:** To find story with a particular _id, we linear search through all stories
- **Single Point of Failure:** What if your laptop hard drive breaks?
- **Concurrency Issues:** What if two users post at the exact same time? 

**Relational Database (SQL)**

Stores data in a spreadsheet-like format (tables)

**Document Database (NoSQL)**

Stores “documents”, which are basically JSON objects

![](./assert/get.png)

![](./assert/post.png)

# MongoDB

![](./assert/mongodb1.png)

- **MongoDB Instance:** a group of databases 
- **Database** (ex. Catbook database)**:** a group of collections, generally corresponds to one web application 
- **Collection** (ex. Stories collection)**:** a group of very similar pieces of data. Ideally want all data in a given collection to have the same structure aka have the same keys and types 
- **Document** (ex. Data for a single story)**:** a single JSON or Javascript object. A single piece of data in the the application, analogous to a row in SQL 
- **Field** (ex. content property for a single story)**:** an attribute we want to record the value of, a key of the javascript object. 

### Mongoose

- Connects to cluster
  - We’ll cover code in the workshop
- Creates documents 
- Interacts with databases
  - Create, Read, Update, Delete and more! 

### Schema

- Schemas define the **structure** of your documents

- Define the **keys** and **types** of the values corresponding to the keys

- Organization is key!
- Each collection *should* have a schema

#### type

String

Number

Date

Buffer

Boolean

Mixed

ObjectId

Array

### Creating a Mongoose Model

```js
const mongoose = require("mongoose")
const mongoConnectionURL ="";
const databaseName = "test";
const options = { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName}

// connect to mongodb
mongoose
  .connect(mongoConnectionURL, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

const UserSchema=new mongoose.Schema({
	name:String,
	age:Number,
	pets:[String],
});

const User=mongoose.model("User",UserSchema)

const Tim=new User({name:"Tim",age:21,pets:["andy"]});
Tim.save().then((student)=>console.log('Added ${student.name}'));
```

### Find Documents

```js
User.find({}).then((users)=>console.log(`Fond ${users.length}`));
User.find({age:21}).then((users)=>console.log(`Fond ${users.length}`));
```

### Delete Documents

```js
User.deleteOne({"name":"Time"})
	.then((err)=>{
        if(err) return console.log("error");
        console.log("delete 1 user");
	});
User.deleteMany({"name":"Time"})
	.then((err)=>{
        if(err) return console.log("error");
        console.log("delete 1all user");
	});
```

#### story.js

```js
const mongoose = require("mongoose");

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  creator_name: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);
```

#### api.js

```js
const Story = require("./models/story.js")

router.get("/stories", (req, res) => {
    Story.find({}).then((story)=>res.send(story));
  // TODO (step1) get all the stories from the database and send response back to client 
});

router.post("/story", (req, res) => {
  const tmp=new Story({creator_name:myName,content:req.body.content,});
  tmp.save().then((story)=>res.send(story));
  // TODO (step1) create a new Story document and put it into the collection using the model
});
```

`.save()` **Saves newcontent to MongoDB**

# Typescript

**Data type**

```
number: 4
boolean: true
string: "aa"
object: {property:4;}
undefined: undefined
null: null
```

```js
let five: number=5;
let msg:string[]=["1","2","3"];
let msg: Array<string> =["1","2","3"];
const exam: Array<string|number> =[1,2,"3"];
```

```js
type A={
	property:string;
};
const myA:A={property:""};

type B=A&{pwd:string};
```

```js
const getComments= async (id:string):Promise<Comment[]>=>{};
```

# Auth

https://console.cloud.google.com/apis/dashboard?project=test-hychen11

https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin

#### Cookie

Cookies are small files of information that a **web server generates** and **sends to a web browser**. Web browsers store the cookies they receive for a predetermined period of time, or for the length of a user's session on a website.

保持登录状态

用户偏好设置

跟踪用户行为

#### sessions

This is my session ID:X2dfMjc0RUlBIiwi

User Info: ....

sessions store on server

用户会话有一个唯一的Session ID。用户的所有会话数据都保存在服务器上，而Session ID通过Cookie传递给客户端

#### tokens

JWT: JSON Web Token

- Google gives us a **token**
- This is *proof* that we logged in
- Can’t lie to the server!

#### Login

![](./assert/auth1.png)

#### Logout

![](./assert/auth2.png)

#### Refresh

![](./assert/auth1.png)

in server, it has auth.js!

in module, it has user.js!

in api.js

```js
const User=require("./module/user");
const auth = require("./auth");

// set up a session, which will persist login data across requests
app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// this checks if the user is logged in, and populates "req.user"
app.use(auth.populateCurrentUser);

//then we can just use auth's function
router.post("/login", auth.login);
router.post("/logout", auth.logout);
```

in NavBar.js

```js
 const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);
    setLoggedIn(true);

    const userToken=res.tokenObj.id_token;
    post("/api/login",{token:userToken}).then((user)=>{
      console.log(user);
    });
    // TODO: Send res.tokenObj.id_token to the backend
  };
  
const handleLogout = () => {
    console.log("Logged out successfully!");
    setLoggedIn(false);

    post("/api/logout");
    // TODO: Tell the backend we logged out
  };
```

User logs in → req.session.user populated with information about the user

User logs out → req.session.user is null

So we can tell if someone is logged in, and if so, who it is, using **req.session.user**, aka **req.user**!

###### whoami

- Once you refresh, userId is reset!
- The backend remembers you logged in (by using session), but the frontend forgot

```js
router.get("/whoami", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    // user is not logged in
    res.send({});
  }
});

useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setLoggedIn(true);
      }
    });
  }, []);
```

# Real Time Chatbook with Socket.io

Broadcast using sockets

Broadcast a message from **server** to **everyone** connected

`socketManager.getIo().emit("event_name", data)`

Listen for messages on **client**

`socket.on("event_name", someFunction)`

```js
//backend
//save to database
message.save();
// Add Sockets to See Messages Instantly!
socketManager.getIo().emit("message", message);

//frontend
socket.on("message",addMessage);
socket.off("message", addMessages);
//the name of strings should must match!!

//send to someone
socketManager.getSocketFromUserID(userID).emit("eventName", data);
```

first initialize socket connection

`socketManager.addUser(whiskers, socket1)`

Server can check with **req.user**! 

We can now use **socketManager.getSocketFromUserID** to get a user’s socket!

```js
socketManager.getSocketFromUserID(“whiskers_id”).emit(“meow”, “FOOD”)
socketManager.getAllConnectedUsers();
//You can get all the connected users
```

### Step 1: Create the initsocket endpoint

Register the client to its socket using socketManager

```js
//frontend  post to initsocket!
post("/api/initsocket",{socketid:socket.id})

//backend receive!
//const addUser = (user, socket) => {}; socket is
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  // TODO (step 1.1): addUser when init socket
  if(req.user){
      socketManager.addUser(req.user,socketManager.getSocketFromSocketID(req.query.socketid));
  }
  res.send({});
});
```

#### Backend

![](./assert/back1.png)

#### Backend API

```js
get("/api/chat",{recipient_id:"25"});

router.get("/chat",(req,res)=>{});
router.post("/message",(req,res)=>{});
```

# Serverless

**Prons**

Scaling

* Auto provisioning of resources

Lower costs

* Pay for what you use

Focus on development

* Infrastructure management handled by provider

**Cons**

Cold starts 

- Latency with functions that are called for the first time in a while 

Lack of a global state 

- Serverless functions run independently of each other, so they  lack a “global state” 
- For example, sockets won’t work out of the box

# Next.js!!!

**Routing**

- Next.js has built in support for routing, filesystem based routing 
- To achieve this in React, you’d need something like **React Router** 

**Rendering** 

- React is a “single page application (SPA”), **statically** rendered by the  client 
- Next.js is a “multi-page application (MPA)”, which can be  **dynamically** rendered by the server and/or statically rendered by  the client.

Next.js has CSR and introduces another form of rendering not found  natively in React → **server side rendering (SSR).**  -> **The full HTML document is generated on the server**

Right now, we’re building Catbook with React and an Express server. This  is a **client-side rendering approach (CSR).** -> **(Everything is combined and loaded by  the client → loading is done)**

* Sensitive data is protected by the server layer
*  Next.js pre-renders our HTML document on the server 
  * Ensures uniform correctness between clients

**”React Server Components” (RSC).** 

split our code into **client** components and **server** components

RSC lets the client render our client components first, while we wait for  the server to render our server components.

```js
npx create-next-app@latest
npm run dev
```



# Web3

**decentralization**

* No single person is in charge
* Anyone can join or be a part of the system
* Every user has a copy of all the data in the system

**Consensus**

* All participants need to agree on the state of the system
* Consensus protocol: used to make sure everyone agrees
* Vote! (6.8540)

If anyone can vote => Sybil attack

一个攻击者可以创建多个假身份，每个假身份都可以单独进行投票

**Solution (Bitcoin)**

* Computational power is expensive

* Idea: make it necessary to have lots of computing power to make updates
  to the public “bulletin board” (the blockchain!)
  * Proof of work

* Assumption: the majority of people are “good”
  * At least, their malicious intents are probably not aligned

还没搞懂???

# ML applications

RAG

* Prepare
  - Chunk your data into smaller pieces

* **R**etrieval

  - Embedding Models

  - Rank by Vector Similarity

* **A**ugment
  - Prompt Engineering

* **G**eneration
  - Use an expensive Transformer model to decode

![](./assert/ai2.png)

#### LLM

attention! important!

Cosine Similarity calculate the angle of two vector! (1 is similar and -1 is converse!)

Cosine Distance=1−Cosine Similarity

Cosine Similarity=A⋅B/(∥A∥×∥B∥) 

```python
import numpy as np

# 定义向量
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

# 计算点积
dot_product = np.dot(A, B)

# 计算向量的模
norm_A = np.linalg.norm(A)
norm_B = np.linalg.norm(B)

# 计算余弦相似度
cosine_similarity = dot_product / (norm_A * norm_B)

# 计算余弦距离
cosine_distance = 1 - cosine_similarity

print("Cosine Similarity:", cosine_similarity)
print("Cosine Distance:", cosine_distance)
```

#### Tokenizers, Chunking

#### Embedding Models, Vector Similarity

#### Prompt Engineering

Ask GPT

![](./assert/ai1.png)

#### GPT Go brrr



# fetch?

```js
fetch(url)
  .then(response => response.json()) // 解析响应数据为 JSON
  .then(data => console.log(data))   // 处理解析后的数据
  .catch(error => console.error('Error:', error)); // 处理错误
```

nvm