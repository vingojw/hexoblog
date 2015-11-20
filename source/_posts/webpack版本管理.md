title: webpack版本管理
date: 2015-11-20 14:38:20
tags: webpack
---

需要 HtmlWebpackPlugin 插件



index.html 使用前
```

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
     <link rel="stylesheet" href="./build/style.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="./build/vendor.js"></script>
    <script src="./build/build.js"></script>
  </body>
</html>


```

使用后

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  <link href="/util/vue/build/style.4daf5db48dee3ff24cd7.css" rel="stylesheet"></head>
  <body>
    <div id="app"></div>
  <script src="/util/vue/build/vendor.4daf5db48dee3ff24cd7.js"></script><script src="/util/vue/build/build.4daf5db48dee3ff24cd7.js"></script></body>
</html>


```

在webpack.config.js 文件中加入

```
  //HtmlWebpackPlugin文档 https://www.npmjs.com/package/html-webpack-plugin
 plugins:new HtmlWebpackPlugin({
    filename:'../d.html',//会生成d.html在根目录下,并注入脚本
    template:'index.tpl',//模板
    inject:true //https://github.com/ampedandwired/html-webpack-plugin/issues/52
  }));

```

生成的时候会以index.tpl为模板生成d.html，这个d.html就是最后我们所需要的

index.tpl 文件很简单

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>

```