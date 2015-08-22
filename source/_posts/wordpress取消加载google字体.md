title: wordpress取消加载google字体
date: 2014-08-02 20:34:58
tags:
---

google 被屏蔽了，由于wordpress 加载了google字体，导致网页打开缓慢，字体显示不出来。
解决方法： 找到主题文件中的functions.php，注释掉 twentytwelve_get_font_url()中的 return $font_url;

比如：
```
.\wp-content\themes\twentytwelve  
```
下的functions.php
```
...
twentytwelve_get_font_url() //方法  大概121行
...
...
// return $font_url;  //注释掉 
```
 
 
