title: vuejs前进后退过场效果
date: 2015-12-21 10:58:36
tags:
---

当点击 下一个页面，是从右往中入场。
当点击 上一个页面，是从中到右离场。
可以给 router-view 设置，进场出场的过渡类名，来达到前进后退。

比如我们定义  prev，为上一页过渡。next，为下一页过渡。  [css过渡](http://cn.vuejs.org/guide/transitions.html#CSS__u8FC7_u6E21)

```
/*下一页*/
.next-transition {
    -webkit-transition: all .4s ease;
            transition: all .4s ease;
}
.next-enter{
    opacity: 0;
    -webkit-transform: translate3d(50%, 0, 0);
            transform: translate3d(50%, 0, 0);
}
.next-leave {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
}
/*上一页*/
.prev-transition {
    -webkit-transition: all .4s ease;
            transition: all .4s ease;
}
.prev-enter {
    opacity: 0;
    -webkit-transform: translate3d(-50%, 0, 0);
            transform: translate3d(-50%, 0, 0);
}
.prev-leave{
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
}
```

过渡定义好了，接下来就是看准时机，改变类名就好了。

如何知道你现在是一页还是下一页。

额。。。 那就本地也来一个数组，里面放访问过的页面，然后在每次在路由的 router.beforeEach 里面，判断一下
要去的页面是之前的一个，那么说明就是后退，如果不是，那么说明就是前进。

```

window.routeList = [];
router.beforeEach(function(transition){
    if(routeList.length > 1 && transition.to.name==routeList[routeList.length-2]){
        router.app.effect='prev';//返回
        routeList.splice(routeList.length-1,1);
    } else {
        router.app.effect='next';//前进
        routeList.push(transition.to.name);
    }
    transition.next();
});


```
