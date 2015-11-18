title: webpack
date: 2015-08-19 22:42:08
tags: webpack
---


[Webpack 使用介绍, 以及与gulp的搭配(顺带css-sprite)](https://github.com/kairyou/demo/blob/master/webpack.md?menu=2&cty=2)

[一小时包教会 —— webpack 入门指南](http://www.cnblogs.com/vajoy/p/4650467.html?utm_source=tuicool)

[阮一峰 webpack-demos](https://github.com/ruanyf/webpack-demos  )

[webpack学习笔记](http://blog.csdn.net/zhbhun/article/details/47208885)

[入门指迷](http://segmentfault.com/a/1190000002551952)

[webpack 怎么用](http://segmentfault.com/a/1190000002552008)

[关于配置的注释](http://segmentfault.com/a/1190000002889630)

[关于代码热替换](https://robots.thoughtbot.com/setting-up-webpack-for-react-and-hot-module-replacement)

[Webpack-dev-server结合后端服务器的热替换配置](http://www.jianshu.com/p/8adf4c2bfa51)

[Webpack 性能优化 （一）（使用别名做重定向）](http://www.ituring.com.cn/article/200534) [备份网址](http://code.oneapm.com/javascript/2015/07/07/webpack_performance_1/)

视频教程(需要翻墙)

1. [https://www.youtube.com/watch?v=TaWKUpahFZM](https://www.youtube.com/watch?v=TaWKUpahFZM)

2. [https://www.youtube.com/watch?v=RKqRj3VgR_c ](https://www.youtube.com/watch?v=RKqRj3VgR_c )


<h2>关于第一个视频的笔记</h2>

## 开始

建立一个 learn-webpack的文件夹

cnpm install -g webpack


npm init 一路回车
```
{
  "name": "learn-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "start": "webpack ./index.js bundle.js"  //这里表示   你可以在 控制台直接运行  npm start  就是运行此处的内容
  },
  "author": "",
  "license": "ISC"
}
```

新建一个index.html
```
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <title>learn-webpack</title>
</head>
<body>
<script type="text/javascript" src="bundle.js" charset="utf-8"></script>
</body>
</html>

```

新建indiex.js
```
console.log('hello');
```

控制台执行
```
npm start
```
就会把 index.js 编译成 bundle.js。 打开 index.html 就会看到控制台输出。

## 模块

再新建一个文件bear.js
```
module.exports = 'growl!'
```

修改index.js
```
console.log(require('./bear.js'));

```
控制台再执行
```
npm start
```

## 修改后自动更新
每次修改文件后都要 npm start 一下，这样好麻烦。
安装 webpack-dev-server
```
cnpm install webpack-dev-server --save-dev
```
然后修改 package.json 中 script 的内容
```
webpack ./index.js bundle.js
```
修改为
```
webpack-dev-server ./index.js
```
接着
```
npm start
```
访问：http://localhost:8080/webpack-dev-server/
这样每次修改了 index.js ，浏览器就会自动刷新。

## 样式
需要安装两个模块
```
cnpm install css-loader --save-dev
```
```
cnpm install style-loader --save-dev
```

然后新建bear.css文件
```
div{
     color:red;
}
```
index.js 后面加一句
```
console.log(  require('./bear.js'));

require('style!css!./bear.css');//在html中 以内联style的方式载入bear.css
```

css 中 还可以 @import其他的css
如在bear.css 中
```
@import 'base.css'; /*这里的分号不要忘记了*/
div{
     color:red;
}

```
这样就包括了 base.css

## swebpack.config.js
新建 webpack.config.js
```
module.exports = {
     entry:'./index.js',
     output:{
          path: __dirname,
          filename: 'bundle.js'
     },
     module:{
          loaders:[
          { test: /\.css$/,loader:'style!css!'}
          ]
     }
}
```
这样设置后
就可以将 index.js  中的
```
require('style!css!./bear.css');
```
改为
```
require('./bear.css');
```

接着再次
```
npm start
```

