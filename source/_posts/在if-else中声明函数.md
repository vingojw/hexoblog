title: 在if-else中声明函数
date: 2015-08-22 21:11:09
tags:
---

有如下一段代码

```
var test = $('#test');
fn();
function fn(){
	test.css('width','100px');
}
```

但是test有时候页面上会没有，所以就在外面直接加了个判断。
于是

```
var test = $('#test');
if(test.length){
	fn();
	function fn(){
		test.css('width','100px');
	}
}
```
在火狐中报错，fn没有被定义。

为什么呢？

[FireFox中JS引擎对函数声明式的解析与其他浏览器的差异](http://blog.csdn.net/dxx1988/article/details/6918385)

[找找MDN规范](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions#Function_constructor_vs._function_declaration_vs._function_expression)

[JS中在if else 中定义 function 的问题](http://segmentfault.com/q/1010000000731247/a-1020000000732024)

[汤姆大叔-入理解JavaScript系列（2）：揭秘命名函数表达式](http://www.cnblogs.com/TomXu/archive/2011/12/29/2290308.html)