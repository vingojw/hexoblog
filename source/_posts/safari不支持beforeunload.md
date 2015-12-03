title: beforeunload 不支持 safari
date: 2015-12-03 18:09:00
tags:
---

UBT统计需要在页面离开的时候上报一些数据

平常可以用 beforeunload 事件
```
	window.addEventListener('beforeunload', function (event) {
		//上报ubt
		window._track.push();

	});

```

但是在 safari 浏览器里面这玩意不好用
此时可以使用 pagehide方法

```
	window.addEventListener('pagehide方法', function (event) {
		if(window._track){
			//上报ubt
			window._track.push();
		}
	});

```

综合一下就是

```

//代码来自 https://github.com/amfe/lib-env/blob/master/src/browser.js?from=groupmessage&amp;isappinstalled=0
var env = function(){
         _env = {};

         var ua = window.navigator.userAgent;
         var matched;

         if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
             /**
              * @instance browser
              * @memberof _env
              * @property {String} name - 浏览器名称，比如UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown等
              * @property {Version} version - 浏览器版本号
              * @property {Boolean} isUC - 是否是UC浏览器
              * @property {Boolean} isQQ - 是否是QQ浏览器
              * @property {Boolean} isIE - 是否是IE浏览器
              * @property {Boolean} isIEMobile - 是否是IE移动版浏览器
              * @property {Boolean} isIELikeWebkit - 是否是IE兼容了Webkit特性的浏览器
              * @property {Boolean} isChrome - 是否是Chrome浏览器
              * @property {Boolean} isAndroid - 是否是Android的原生浏览器
              * @property {Boolean} isSafari - 是否是Safari浏览器
              * @property {Boolean} isWebview - 是否是iOS下的Webview或Android下Chrome的Webview
              */
             _env.browser = {
                 name: 'UC',
                 isUC: true,
                 version: matched[1]
             }
         } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
             _env.browser = {
                 name: 'QQ',
                 isQQ: true,
                 version: matched[1]
             }
         } else if ((matched = ua.match(/Firefox\/([\d\.]+)/))) {
             _env.browser = {
                 name: 'Firefox',
                 isFirefox: true,
                 version: matched[1]
             }
         } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) ||
                         (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

             _env.browser = {
                 version: matched[1]
             }

             if (ua.match(/IEMobile/)) {
                 _env.browser.name = 'IEMobile';
                 _env.browser.isIEMobile = true;
             } else {
                 _env.browser.name = 'IE';
                 _env.browser.isIE = true;
             }

             if (ua.match(/Android|iPhone/)) {
                 _env.browser.isIELikeWebkit = true;
             }
         } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
             _env.browser = {
                 name: 'Chrome',
                 isChrome: true,
                 version: matched[1]
             }

             if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
                 _env.browser.name = 'Chrome Webview';
                 _env.browser.isWebview = true;
             }
         } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
             _env.browser = {
                 name: 'Android',
                 isAndroid: true,
                 version: matched[1]
             }
         } else if(ua.match(/iPhone|iPad|iPod/)) {
             if(ua.match(/Safari/)) {
                 matched = ua.match(/Version\/([\d\.]+)/)
                 _env.browser = {
                     name: 'Safari',
                     isSafari: true,
                     version: matched[1]
                 }
             } else {
                 matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
                 _env.browser = {
                     name: 'iOS Webview',
                     isWebview: true,
                     version: matched[1].replace(/\_/, '.')
                 }
             }
         } else {
             _env.browser = {
                 name:'unknown',
                 version:'0.0.0'
             }
         }
         return _env;
     }();

	//在ios里面不支持beforeunload事件
	var eventName = (env.browser.isWebview && env.browser.name === "iOS Webview" || env.browser.name==='Safari' ) ? "pagehide" : "beforeunload";
	console.log(eventName);
	//页面关闭后上报数据
	window.addEventListener(eventName, function (event) {
		//上报ubt
		window._track.push();
	});


```