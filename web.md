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
```

let const (only use let plz!!!!)

let is block-scoped

var is function-scoped

let exists because people kept getting bugs when trying to use var

undefined means “declared but not yet assigned a value”

null means “no value”

```javascript
console.log();
const a=5;
const b=10;
console.log(`a*b=${a*b}`);
//writes to the JavaScript console:
```

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

### copy

```javascript
let arr=[1,2,3];
let copyarr=[...arr];

let obj={name:"hyc"};
let copyobj={...obj};
```

如果你直接使用 `copyarr = arr`，那么 `copyarr` 和 `arr` 将指向同一个数组对象。这不是复制，而是两个变量共享同一个数组的引用。这意味着，通过任一变量所做的修改（如添加、删除元素）都会影响到另一个，因为它们指向的是同一个内存地址中的数据。
