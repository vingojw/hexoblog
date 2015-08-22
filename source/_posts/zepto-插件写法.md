title: 'zepto 插件写法'
date: 2014-07-10 22:03:53
tags:
---

一个更换背景颜色的小插件
>html
```html
<div id="box">content</div>
```
>javascript
```javascript
 //改变元素背景颜色
 ;(function($){
	$.fn.vgoPlugin = function(option){
	  var opts = $.extend({}, $.fn.vgoPlugin.defaults  , option);
		this.css('backgroundColor',opts.color);
	};
	$.fn.vgoPlugin.defaults = {
		 color:'#f60'
	};
})(Zepto);

 //$("#box").vgoPlugin();
 //$("#box").vgoPlugin({color:'#369'});
```

```javascript
 ;(function($){
    $.extend($.fn, {
    vgoPlugin1: function(option){
		var defaults = {
			color:'red'
		};
		var opts = $.extend({},defaults , option);//注意这里顺序option在前面
		this.css('background',opts.color);
		return this;
		}
    })
})(Zepto);
 //$("#box").vgoPlugin1();
 //$("#box").vgoPlugin1({color:'#369'});
```


两种写法都可以
