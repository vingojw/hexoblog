title: messages、worker和socket
date: 2014-07-04 12:32:29
tags:
---

[原文链接](http://http://blog.csdn.net/suncaishen/article/details/6361583)

`Web Messaging` 、`Web Worker`和`Web Socket`是完全不同的API，但是他们都是通信API。

只有`Messaging API`是HTML5的正式规范之一。


`Messaging`允许从一个域向另一个域发送消息。


`Worker`允许我们圈出一块特别的代码，它将会运行而根本不会影响到浏览器，就好像我们已经创建除了一个新的线程，而浏览器本身是高效的单线程应用程序。


`Socket`可以创建页面到服务器的一个稳定的连接流的方法（对于主流服务器，是一个TCP连接）并且允许服务器和客户端的双向实时通信。

 

`Worker`和`Socket`是基于`Messaging API`的。

 

WebSocket事件：
我们将使用三个WebSocket事件：
onopen: 当接口打开时
onmessage: 当收到信息时
onclose: 当接口关闭时

 

检验是否支持WebSocket

 
```javascript
if("WebSocket" in window){ 
	alert('yes');
}

else{
	alert('no');
}

var socket = new WebSocket("ws://localhost:8000/socket/server/startDaemon.php");


socket.onmessage = function(msg){  
    alert(msg); //Awesome!  
}
```