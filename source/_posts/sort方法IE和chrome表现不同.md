layout:
  - post
title: sort方法IE和chrome表现不同.md
date: 2014-06-26 22:35:22
tags: javascript
---

```javascript
var arr = [1,2,3,4,5];
arr.sort(function(a,b){
	console.log(a,b)
});

/*
//chrome 下面
1 2
2 3
3 4
4 5
//IE下面则是相反的
2 1
3 2
4 3
5 4
*/
```