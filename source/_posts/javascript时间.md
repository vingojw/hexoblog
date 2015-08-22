title: javascript时间
date: 2014-12-25 22:24:57
tags:
---
[这里可以看到](http://dygraphs.com/date-formats.html)不同的方式初始化时间，各个浏览器兼容的情况。

`var date = new Date(dateString);`

最保险dateString的是以下几种

```
2009/07/12	 
2009/7/12	 
2009/07/12 12:34	 
2009/07/12 12:34:56

07/02/2012
7/2/2012
7/2/2012 12:34
```

还有一种就是
new Date('Thu Dec 25 2014 22:28:41 GMT+0800 (CST)')

你可能会问，卧槽？谁没事打这么长一串啊。

比如一个ajax你想要获取服务器那边的时间


```javascript
$.ajax({
    type: ...
    url : window.location.href,
    complete: function( xhr,data ){
      var dateStr = xhr.getResponseHeader('Date')
      //这里的dateStr就是 ‘Thu Dec 25 2014 22:28:41 GMT+0800 (CST)’。
      console.log(new Date(dateStr));
      ...
      ...

```

试了几个浏览器 IE6+ 、 火狐、chrome、 Safari都可以。

```javascript
$.ajax({
    type: 'HEAD', // 获取头信息，type=HEAD即可
    url : window.location.href,
    complete: function( xhr,data ){
        // 获取相关Http Response header
        var wpoInfo = {
            // 服务器端时间
            "date" : xhr.getResponseHeader('Date'),
            // 如果开启了gzip，会返回这个东西
            "contentEncoding" : xhr.getResponseHeader('Content-Encoding'),
            // keep-alive ？ close？
            "connection" : xhr.getResponseHeader('Connection'),
            // 响应长度
            "contentLength" : xhr.getResponseHeader('Content-Length'),
            // 服务器类型，apache？lighttpd？
            "server" : xhr.getResponseHeader('Server'),
            "vary" : xhr.getResponseHeader('Vary'),
            "transferEncoding" : xhr.getResponseHeader('Transfer-Encoding'),
            // text/html ? text/xml?
            "contentType" : xhr.getResponseHeader('Content-Type'),
            "cacheControl" : xhr.getResponseHeader('Cache-Control'),
            // 生命周期？
            "exprires" : xhr.getResponseHeader('Exprires'),
            "lastModified" : xhr.getResponseHeader('Last-Modified')
        };
        // 在这里，做想做的事。。。
    }
});
```

