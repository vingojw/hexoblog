title: html项目初始化shell
date: 2014-12-07 20:12:16
tags:
---

想通过一个命令，直接生成好自定义的目录结构。
比如：下面的shell 

```
#!/bin/sh
mkdir ./asset ./asset/images ./asset/style ./asset/js
echo >./asset/index.html '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>Document</title>\n<link rel="stylesheet" href="css/normalize.css">\n</head>\n<body>\n\n</body>\n</html>'
curl http://necolas.github.io/normalize.css/3.0.2/normalize.css > ./asset/style/normalize.css

```

就是在当前目录下，新建以下目录结构
<pre>
asset
├── images
├── index.html
├── js
└── style
    └── normalize.css

3 directories, 2 files
</pre>
    


shell只做了3件事，

	1、新建文件夹，
	2、创建index.html文件，并写入一些html标签
	3、下载normalize.css 放到 style目录中

将shell保存为，start.sh，然后在控制台中给权限  chmod 777 start.sh，接着再控制台中运行它  start.sh
就会在当前目录下生成以上的文件结构。

但是我不想每次都复制这个start.sh到项目文件中，再运行。想直接一个命令就ok，怎么办呢？

那就是把它丢到`/usr/bin` 目录下（会提示输入密码），以后只要在控制台运行start.sh。（`.sh`后缀不能省略）就行了。

可是我连后缀也想省略掉，咋办？那就是用gzexe命令把它变成可执行文件，

```
gzexe start.sh  
```
再扔到`/usr/bin`目录下。[具体操作可查看这里](https://app.yinxiang.com/l/AB4HLJHiWbtFi7WO5lRvYwW0XID0Bao6AyM)


