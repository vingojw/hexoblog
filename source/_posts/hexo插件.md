title: hexo插件
date: 2014-10-31 14:26:50
tags: hexo插件
---

[文章后台hexo-admin](https://github.com/jaredly/hexo-admin  )
hexo-admin插件使用时生成后 发现近期文章有很多重复，解决办法就是 删除public 文件夹，和 db.json，再生成一次。

[将 wordpress里文章 转移到 hexo的插件](https://github.com/hexojs/hexo-migrator-wordpress) --- [迁移教程](http://xbin999.com/2014/09/18/%E8%BF%81%E7%A7%BBwordpress%E5%88%B0hexo/) --- <a href="javascript:;" onclick="document.getElementById('hide').style.display='block'">可能遇到的问题（点击展开）</a>

<div id="hide" style="display:none;">
在转换的过程中，遇到生成的文件名都是类似这样的名字`-e3-80-8a-e4-b8-89-e4-b8-96-e7-95-8c-e3-80-8b.md`。
用javascript的方式也可以，文件名的生成是根据xml中<wp:post_name>的值来的，需要做的就是将这个值decodeURI，就OK了。
将xml里面的内容变成数组[xml复制到这里](http://www.css88.com/tool/html2js/)，然后

```
var s = 刚才生成的数组，去掉后面的.join('')
for(var i = 0, len = s.length; i < len; i++){
	if(s[i].trim().indexOf('<wp:post_name>')==0){
		var ss = s[i].trim().match(/<wp:post_name>(.*)<\/wp:post_name>/);
		s[i] = '<wp:post_name>'+ decodeURI(ss[1]) +'<\/wp:post_name>';
	}
}
copy(s.join(''));
直接在xml文件中CTRL+V，保存。
再运行
hexo migrate wordpress xml的路径

//s[i]=s[i].replace(/<wp:post_name>(.*)<\/wp:post_name>/,function(a,b){return decodeURI(b);})

```


</div>

[安装这个插件，压缩你的 html css js image](https://github.com/FlashSoft/hexo-console-optimize)

[自动抽取文章摘要](https://github.com/vfasky/hexo-summarizer)


