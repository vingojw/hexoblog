title: CSS3-3D-Transform
date: 2014-08-24 17:42:27
tags:
---

CSS3D 变形，主要的两个样式就是

```CSS
	transform-style: preserve-3d;
	perspective: 800px;
```

元素设置了此样式后，里面的元素就能按照3D的模式去渲染。
为了更好的理解。
可以看这个[DEMO](http://vingojw.github.io/demo/CSS3-Transform.html)


网上有一个教程是关于如何用css来实现视差滚动，不过原地址打不开了,但是[DEMO还可以看](http://www.html5kit.com/article/2474.html)。找到一篇[中文翻译](http://www.html5kit.com/article/2474.html)

当前页面渲染的层级超过3个的时、或者层级使用了透明度。滚动的 时候可能会有卡顿。

配合之前的[平滑滚动](http://vingojw.github.io/2014/08/09/%E5%B9%B3%E6%BB%91%E6%BB%9A%E5%8A%A8SmoothScroll/)

可以发现，当前视口的视差层级两个的时候，效果如丝般顺滑[DEMO地址](http://vingojw.github.io/demo/纯css视差效果.html)

试了几次发现 如果当前页面的可视区域有 Foreground Layer 渲染时，就会感觉滚轮有点卡。



