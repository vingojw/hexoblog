title: 不让vue-router记录滚动条
date: 2016-01-06 16:41:15
tags:
---


```
Vue.transition('next', {
  beforeEnter: function (el) {
    //设置body样式overflow-y:hidden;
  },
  afterEnter: function (el) {
    //再清除上面的样式;
  }
});

```