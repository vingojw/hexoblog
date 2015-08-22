title: css3阴影box-shadow
date: 2014-09-06 15:51:07
tags:
---

box-shadow: 0 0 0px 5px #ff6600`最里面的一层`,0 0 0px 15px #fff`中间的白色`,0 0 0 20px #4fc1e9`最外一层`;

[css3多边框demo](http://jsbin.com/riwotucanofi/1/edit)

```html
 <!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <title>HTML5 canvas demo</title>
	 <style>
       *{
         box-sizing:border-box;
       }
      .test{
        height:100px;width:100px;
         border:0px solid #4fc1e9;
         border-radius:100%;
         transition:all .3s ease;
         display:flex;
         -webkit-justify-content: center; 
         -webkit-align-items: center;
      }
       .test1{
         padding:5px;
       }
      .test1:hover{
        padding:0;
        border-width:5px;
      }
 
       .test3:hover{
	-webkit-box-shadow: 0 0 0 5px #4fc1e9;
	   -moz-box-shadow: 0 0 0 5px #4fc1e9;
		-ms-box-shadow: 0 0 0 5px #4fc1e9;
		 -o-box-shadow: 0 0 0 5px #4fc1e9;
         box-shadow: 0 0 0px 5px #ff6600/*最里面的一层*/,0 0 0px 15px #fff/*中间的白色*/,0 0 0 20px #4fc1e9/*最外一层*/;
       }
       
    .test4:hover{
	-webkit-box-shadow: 0 0 0 5px #4fc1e9;
	   -moz-box-shadow: 0 0 0 5px #4fc1e9;
		-ms-box-shadow: 0 0 0 5px #4fc1e9;
		 -o-box-shadow: 0 0 0 5px #4fc1e9;
         box-shadow: 0 0 0 5px #ff6600 inset/*最外面的一层*/,0 0 0 10px #ffffff inset/*中间的白色*/,0 0 0 15px #4fc1e9/*最里一层*/ inset;
       }
       
    </style>
    
  </head>
  <body>
    <div class='test test1'>内padding</div>
    <div class='test test3'>外box-shadow 双边效果</div>
    <div class='test test4'>内box-shadow 双边效果</div>
  </body>
</html>


```
