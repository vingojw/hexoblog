title: OS X EI Capitan 9700USB网卡没办法识别
date: 2015-12-06 16:08:01
tags: KY-RD9700
---

尝试接有线，然后买了个转接头

![](http://ww4.sinaimg.cn/bmiddle/6685f05dgw1eypzyejhjwj21kw2mt7wi.jpg)

安装驱动，发现怎么也没用。如果你也遇到相同的问题，那么试着完成下面的步骤就能解决。

1、先拔下所有usb

2、重启，一旦出现黑屏，按住 command+R,直到看到黑色的屏幕，苹果标志和一个白色的进度条。松手，然后等待电脑开机进入恢复模式

3、在最上面选择，工具->终端

4、终端中运行 csrutil disable    这是关键的一步

5、从最上面选择“”，然后选择“重新启动”

6、安装驱动，然后会提示你重启  驱动地址（百度网盘）
解压下载文件，找到x86_64文件目录，双击“USBCDCNET.pkg"进行安装。

7、 打开你的终端，并执行sudo NVRAM启动参数= “ KEXT - DEV- MODE = 1 ”
然后重启

8、打开你的终端，并运行sudo的kextload /System/Library/Extensions/USBCDCEthernet.kext
然后重启

9、此时插入usb适配器，连上网线，打开系统偏好设置就会看到一个
USB 2.0 10/100M Ethernet Adaptor

搞定。

参考：

[http://inkandfeet.com/how-to-use-a-generic-usb-20-10100m-ethernet-adaptor-rd9700-on-mac-os-1011-el-capitan](http://inkandfeet.com/how-to-use-a-generic-usb-20-10100m-ethernet-adaptor-rd9700-on-mac-os-1011-el-capitan)

[http://blog.163.com/sujoe_2006/blog/static/335315120156525830958/](http://blog.163.com/sujoe_2006/blog/static/335315120156525830958/)