各浏览器inline-block 元素默认的间隙，与字号。

两个input，通过改变父元素font-size，用js计算他们之间空白的距离。



在firefox 和 chrome 中 font-size：12+ ，而且是偶数的时候 直接除以2就是空白距离，是奇数的时候则是加1再除2。
比如：
font-size:12px  间距  12/2 = 6px
font-size:13px  间距  (13+1)/2 = 7px

IE 系列，font-size 在大于6px的时候，差不多是4个一档。

貌似跟字体也有关系，测试的默认的应该是宋体。

回家测了chrome 另外几个版本，貌似又跟IE系列差不多的情况。

[测试链接](http://www.jiweiwei.com/util/inline-block_font-size_space/index.html)
















