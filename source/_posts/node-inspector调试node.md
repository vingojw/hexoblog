---
title: node-inspector调试node
date: 2016-05-09 11:28:00
tags: node
---


先安装 
npm install -g node-inspector

先开个控制台再运行下面的
node-inspector     

再开个控制台接着在运行

node-debug app.js 

会自动打开浏览器，并断点在第一行，这样通过熟悉的方式来调试node。


每次调试要手动开两次命令行并输入命令，可以简单一点。

两种方法：

### 第一种：

在package.json 里面的配置 
```javascript
  "scripts": {
    "debug": "set NODE_ENV=debug&& node-debug app.js"
  }
```
先开一个命令行执行`node-inspector`

再运行 npm run debug


### 第二种：

`start bash.exe` 可以打开一个新的bash窗口

如果想带上命令那么

```bash
start bash -c "node-inspector &"
```

想执行多个命令就用 `&` 连接

下面的代码就能够同时执行两个，不用每次开窗口了

```bash
start bash -c "node-inspector &" & start bash -c "node-debug app.js"
```

在把这句整成简写`tiaoshi`


windows 下 在用户名录下新建了一个 .bashrc 文件 并写入简写

alias tiaoshi='start bash -c "node-inspector &" & start bash -c "node-debug app.js"';
关闭命令行，再打开，发现提示错误

WARNING: Found ~/.bashrc but no ~/.bash_profile, ~/.bash_login or ~/.profile.

于是再新建没有的几个文件

```bash
touch .bash_profile
touch .bash_login
touch .profile
```

关闭命令行再打开， 此时在你的项目目录下手动输入 tiaoshi，就ok了。 默认启动的是app.js。