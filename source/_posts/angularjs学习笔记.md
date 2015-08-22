title: angularjs学习笔记.md
date: 2014-08-03 13:21:22  
tags: angularjs
---


找到angular.js 中文网  ，发现由于google 被屏蔽，angularjs压根就加载不鸟。
于是找到[bootstrap开源CDN里的angularjs ](http://http://open.bootcss.com/angular.js/ ) 。

选择 1.2.6版本。
```
<script src="http://cdn.bootcss.com/angular.js/1.2.6/angular.js"></script>
```

先走完这个教程  http://www.angularjs.cn/tag/AngularJS?p=1

再走这个 
http://www.zouyesheng.com/angular.html#toc1

看不懂http://www.youtube.com/watch?v=aXuK2ACHLcU 估计要等基础教程看完了再看这个。

资源http://www.iteye.com/news/28651-AngularJS-Google-resource

首先从angularjs 中文网开始吧，先要搭建学习环境 ，需要在本地
```
git clone git://github.com/angular/angular-phonecat.git
```
可是下载奇慢。索性放到网盘里[下载地址](http://pan.baidu.com/s/1o6qgdEq)


2014年8月3日20:21:46
http://angularjs.cn/A003 
http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013743858312764dca7ad6d0754f76aa562e3789478044000

引导程序说运行 node scripts/web-server.js 不过这个文件貌似木有。
翻墙到官网 https://docs.angularjs.org/tutorial/step_00
需要
npm start
ok，总算把环境搭建起来了。
浏览  `http://localhost:8000/app/`
看到  Nothing here yet!

chrome 翻译插件找了几个都不好用，索性直接用[chorme的翻译](https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb?hl=zh-CN)


chrome 浏览器插件 Batarang 调试 angular 安装好后F12可以看到angular的标签
[git 小乌龟 ](https://code.google.com/p/tortoisegit/wiki/Download)

http-server 将任意目录当web服务器 [github](https://github.com/nodeapps/http-server#usage)

单元测试karama  
安装:npm install -g karma

	jasmine 分组 用例 期望 匹配
		describe(string,function) 分组，一组测试用例
		it(string,function) 单独的测试用例
		expect(expression)表示期望值
		to***(arg) 匹配

安装bower  
npm install bower -g

通过bower 安装jasmine

Protractor 一款集成测试工具抓们为angularjs应用而设计

不要试图去复用Controller，一个控制器一般只负责一小块视图
不要在Controller中操作DOM，这不是控制器的职责
不要在Controller里面做数据格式化，ng有很好用的表单控件
不要在Controller里面做数据过滤操作，ng有$filter服务
一般来说，controller是不会互相调用的，控制器之间的交互会通过事件进行。

可以用angular.element($0).scope()进行调试，查看当前$scope 


Ui-route 深层次嵌套




