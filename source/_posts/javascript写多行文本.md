title: javascript写多行文本
date: 2014-06-30 00:14:14
tags:
---
```
var s = '\
aaaa\
<a href="#" class="sssss" onclick="alert(\'abc\')">×</a>\
aaaa\
';
```
每行后面要加\  如果内容有 " ‘ " 那么就需要转义

打两个单引号中间加一个 \ 然后回车  后面每段后面都要加上 \

var s = '\
每段都要加上\
';
