title: sass
date: 2015-04-12 00:53:59
tags:
---

MAC 自带rugy，so直接

sudo gem install sass  需要系统权限，否则安装的时候各种文件没权限。

sublime 安装 插件 sass 和 sass build，
安装好之后，使用就是 commad+b

创建 compass项目  

compass create sass-test


然后是 sass的语法， 可以参考[SASS 用法](http://www.ruanyifeng.com/blog/2012/06/sass.html)


##	chrome下调试：

参考：[SASS调试](http://www.w3cplus.com/preprocessor/sass-debug-with-developer-tool.html)

输入以下，来用于监听修改

```
$ sass --watch --scss --sourcemap style.scss:style.css
```