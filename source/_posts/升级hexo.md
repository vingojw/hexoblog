title: 升级hexo
date: 2015-08-19 21:44:27
tags: hexo
---


```
npm install -g hexo-cli
mkdir hexo3
cd hexo3
hexo init
cnpm install hexo --save
cnpm install hexo-deployer-git --save
```

然后配置文件 _config.yml 跟之前的不同。

```
# Deployment
deploy:
  type: git   //这里要改成 git
  repo: git@github.com:vingojw/vingojw.github.com.git
  branch:      //这里不想写就留空 
  message:     //这里也是一样，默认提交格式 “Site updated: 2015-08-19 21:16:13”

```

接着就是把以前的 source 和 theme文件夹覆盖就好了。

运行
```
hexo g
hexo s
```




