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

