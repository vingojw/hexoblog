title: 格式化与空白
date: 2014-06-29 00:55:27
tags: git
---
不知为什么git上报这个警告
warning: CRLF will be replaced by LF in GeneSmartStay/res/values-zh-rTW/strings.xml.The file will have its original line endings in your working directory.[这是因为文件中换行符的差别导致的。这个提示的意思是说：会把windows格式（CRLF）转换成Unix格式（LF），这些是转换文件格式的警告，不影响使用。]
[找到stackoverflow上的回答](http://stackoverflow.com/questions/5834014/lf-will-be-replaced-by-crlf-in-git-what-is-that-and-is-it-important)

原来是因为git为了各个平台的代码，所处理格式化与空白的方式：
假如你正在Windows上写程序，又或者你正在和其他人合作，他们在Windows上编程，而你却在其他系统上，在这些情况下，你可能会遇到行尾结束符问题。这是因为Windows使用回车和换行两个字符来结束一行，而Mac和Linux只使用换行一个字符。虽然这是小问题，但它会极大地扰乱跨平台协作。

Git可以在你提交时自动地把行结束符CRLF转换成LF，而在签出代码时把LF转换成CRLF。用core.autocrlf来打开此项功能，如果是在Windows系统上，把它设置成true，这样当签出代码时，LF会被转换成CRLF：

```
$ git config --global core.autocrlf true 
```

Linux或Mac系统使用LF作为行结束符，因此你不想 Git 在签出文件时进行自动的转换；当一个以CRLF为行结束符的文件不小心被引入时你肯定想进行修正，把core.autocrlf设置成input来告诉 Git 在提交时把CRLF转换成LF，签出时不转换：

```
$ git config --global core.autocrlf input
```

这样会在Windows系统上的签出文件中保留CRLF，会在Mac和Linux系统上，包括仓库中保留LF。

如果你是Windows程序员，且正在开发仅运行在Windows上的项目，可以设置false取消此功能，把回车符记录在库中：

```
$ git config --global core.autocrlf false 
```