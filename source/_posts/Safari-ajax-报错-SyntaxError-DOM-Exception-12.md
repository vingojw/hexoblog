---
title: 'Safari ajax 报错 SyntaxError: DOM Exception 12'
date: 2016-07-09 22:29:05
tags:
---

在电脑的safari上不能发送ajax， 调试一下发现 报错 SyntaxError: DOM Exception 12

搜了一圈，找到这篇[angular1.3.15 下 safari9.0.1 爆错：SyntaxError: DOM Exception 12](http://www.blogjava.net/laxxx/archive/2015/12/17/428705.html) 

说是后面有个空格导致的。于是找到代码中，发现
方法中ajax会设置一个头部

```javascript
xhr.setRequestHeader( "Authorization", ( "Bearer "+ ( get('token') || '' ) ) );
```
由于在get('token’) 的时候没有的时候就会为空，那么上面的代码就相当于

```javascript
xhr.setRequestHeader("Authorization", ("Bearer "));
```
解决：
get('token’)不为空时再设置头。