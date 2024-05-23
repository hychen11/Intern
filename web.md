Webpage files

HTML

CSS

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
for(const ele of my_array){
    
}

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

### shallow copy and deep copy!

**in shallow copy, object and array will be the same address, so when change this will change on others. In deep copy, object and array will also create a new!**



{} object, [] array in JS

{} dict, []list ,() tuple in python

### Functions

```javascript
const foo=(parameters)=>{
	//body
};
```

```javascript
foo(); //is return value
let bar=foo;
```

#### arrow function

```
let greet=()=>{
	console.log("1");
};
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



MongoDB

```
mongodb+srv://zjuchy1:<password>@catbook.6uzwsnd.mongodb.net/?retryWrites=true&w=majority&appName=Catbook
```

