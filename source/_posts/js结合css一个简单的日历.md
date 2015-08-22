title: js结合css一个简单的日历
date: 2014-08-09 02:51:20
tags:
---

[先看DEMO](http://www.jiweiwei.com/wp-content/uploads/2014/08/rili.html)

先分析一下这张图 
![demo](http://ww2.sinaimg.cn/large/005IOUf2gw1ej5shqterkj304s03lweh.jpg)

//只要知道每个月的第一天是星期几，以及这个月有多少天。
//比如：2014年8月1日 是星期5，这个月有31天，那么前面先添加5个空白日期占位，接着在循环31天的日期。
//日历中的每一天，用 `ul>li`  li设置样式`{float:left;width:14.28571429% /\* 这里是 100/7 \*/}` 控制每排显示7个，前面添加的占位就会把后面的顶下去。

```

//示例：通过创建function init(y,m,d){...}，传入y(年)、m(月)、d(日)三个参数，来生成日历（其实年月就够了）。

//核心代码：
function init(y,m,d){
	//当月有多少天
	var monthDays = (m + 1 > 12) ? new Date(+new Date(y+1+'/'+1+'/1') - 1).getDate() : new Date(+new Date(y+'/'+(m+1)+'/1') - 1).getDate();
	console.log(m+'月有'+monthDays+'天');		
	//第一天是星期几
	var firstDay = new Date(y+'/'+m+'/1').getDay();
	console.log('第一天'+y+'/'+m+'/1'+'是星期'+firstDay+'前面要添加'+(firstDay)+'个空白日期');
	var dayHtml = [];

	//填充空白日期
	for(var i = 0, len = firstDay; i < len; i++){
		dayHtml.push("<li><a></a></li>");
	}
	//填充日期
	for(var i = 1, len = monthDays; i <= len; i++){
		dayHtml.push("<li title='"+y+"/"+m+"/"+i+"'><a>" + i + "</a></li>");
	}
	
	//日历容器 ul.innerHTML = dayHtml.join('');
}
```

以下是完整代码
<!--more-->
```
<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <title>HTML5 canvas demo</title>
  <style>
    *{
      margin:0;padding:0;
    }
    ul,li{
      list-style:none;
    }
    #demo{
      background:#e9e9e9;
      padding:10px;
	  width:500px;
    }
    #demo .nav{
      width:100%;
      overflow:hidden;
      text-align:center;
      line-height:50px;
    }
    #demo .nav div{
      border:1px solid red;
    }
    
    #demo .nav a{
    	margin:10px;
    }
    #demo a.left{
      width:0px; 
      height:0px; 
      border-bottom:15px solid transparent;  /* left arrow slant */
      border-top:15px solid transparent; /* right arrow slant */
      border-right:15px solid #2f2f2f; /* bottom, add background color here */
      font-size:0px;
      line-height:0px;
      float:left;
      
    }
    #demo a.right{
       width:0px; 
       height:0px; 
       border-bottom:15px solid transparent;  /* left arrow slant */
       border-top:15px solid transparent; /* right arrow slant */
       border-left:15px solid #2f2f2f; /* bottom, add background color here */
       font-size:0px;
       line-height:0px;
      float:right;
    }
    #demo .content{
      overflow:hidden;
      border:1px solid #f60;
      border-top:none;
    }
    #demo ul{
		margin-right: -1px;
	}
    #demo li{
      height:40px;
      width:14.28%;
      float:left;
      display:block;
    }
    
    #demo li a{
      margin-right:-1px;
      display:block;
      border-right:1px solid #f60;
      border-bottom:1px solid #f60;
      height:100%;
      border-top:none;
      border-left:none;
      position:relative;
    }
 
    #demo .week{
      border-bottom:1px solid #F60;
      overflow:hidden;
    }
    #demo .week li{   
      text-align:center;
      line-height:40px;
    }
    #demo .week li a{
    	border-right:1px solid #f60;
    }
    </style>
    	 
  </head>
  <body>
    <div id="demo">
       <div class="nav">
         <div>
         <a id="left" class="left"></a>
         <a id="right" class="right"></a>
         <span id="currentDate" ></span>
         </div>
       </div>
      <div class="content" id="calendar">
        <ul class="week"><li><a>日</a></li><li><a>一</a></li><li><a>二</a></li><li><a>三</a></li><li><a>四</a></li><li><a>五</a></li><li><a>六</a></li></ul>
        <ul class="day" id="day">
        </ul>
      </div>
    </div>
    <script>
	
	/*日期格式化*/
	Date.prototype.Format = function (fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	
	 //日期
      
	function init(y,m,d){
		var day =  document.getElementById('day');
		try{
			var t = new Date(y+'/'+m+'/'+d);
		}catch(e){return '';}
		
		document.getElementById('currentDate').innerHTML = t.Format("yyyy年MM月");
		
		//当月有多少天
		var monthDays = (m + 1 > 12) ? new Date(+new Date(y+1+'/'+1+'/1') - 1).getDate() : new Date(+new Date(y+'/'+(m+1)+'/1') - 1).getDate();
		console.log(m+'月有'+monthDays+'天');		
		//第一天是星期几
		var firstDay = new Date(y+'/'+m+'/1').getDay();
		console.log('第一天'+y+'/'+m+'/1'+'是星期'+firstDay+'前面要添加'+(firstDay-1)+'个空白日期');
		var dayHtml = [];
		
		//填充空白日期
		for(var i = 0, len = firstDay; i < len; i++){
			dayHtml.push("<li><a></a></li>");
		}
		//填充日期
		for(var i = 1, len = monthDays; i <= len; i++){
			dayHtml.push("<li title='"+y+"/"+m+"/"+i+"'><a>" + i + "</a></li>");
		}
		
		day.innerHTML = dayHtml.join('');
		
		//绑定事件
		//前一天
		document.getElementById('left').onclick = function(){
			(--m < 1) && (--y,m = 12);
			init(y,m,d);
		}
		//后一天
		document.getElementById('right').onclick = function(){
			(++m > 12) && (++y,m = 1);
			init(y,m,d);
		}
	}
	 
	//初始化
	var date = new Date(); y = date.getFullYear(),m = date.getMonth()+1,d = date.getDate();
	init(y,m,d);
    </script>
  </body>
</html> 

```