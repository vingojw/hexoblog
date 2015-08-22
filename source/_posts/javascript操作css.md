layout:
  - post
title: 'javascript操作css'
date: 2014-06-23 23:11:48
tags:
---
#通常我们把样式表添加到头部
```javascript
//通过link添加到页面上
var style = document.createElement('link');
style.href = 'style.css';
style.rel = 'stylesheet';
style.type = 'text/css';
document.getElementsByTagName('HEAD').item(0).appendChild(style);
```

```javascript
var getClass = function(ele) {
    return ele.className.replace(/\s+/,' ').split(' ');
};
var hasClass = function(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
//更快的版本var hasClass =function(ele,cls){
      return -1 < (" "+ele.className+" ").indexOf(" "+cls+" ");
}
var addClass = function(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
var removeClass = function(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}



在更快的版本hasClass中为什么要用 前后加空格主要是为了以下情况

var className = "a ab bc"; 比如类名
undefined
className.indexOf('b') 查找b还是能找到，因为b的确在字符串中。但是这不是我们要的效果。
3
" "+className+" ".indexOf(' '+'b'+' ') 于是通过前后加空格就解决了 " a ab bc " indexOf " b " 这样就符合我们的要求了
" a ab bc-1"
(" "+className+" ").indexOf(' '+'b'+' ')
-1


```
