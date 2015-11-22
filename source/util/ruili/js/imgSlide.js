	;(function($){
	var opts;
	$.fn.vgoSlider = function(option){
 
		opts = $.extend({}, $.fn.vgoSlider.defaults  , option);
        var $container  = this.find('ul'),           //ul
			$item       = $container.children(),    //li
			$sliderNav  = this.find('.contro-dot'),//导航
			moveTo      = 0,                      //记录移动的位置
			index       = 0,                     //第几页
			$width = $container.width(),
			interval = null;
		if($item.length==0){return;}//一个都没有就直接返回
		$container.css('overflow','hidden');
		//设置li可见
		$item.css('display','block');
		//设置容器宽度	
		var $containerWidth = $item.length * ($width);
		$container.css("width", $containerWidth);
		
		//设置item的宽度
		this.find("li").each(function(a,b){
			$(b).css("width", $width);
			$(b).css("float",'left');
		});
		
		//初始化导航
		var navLis = [];
		for(var i = 0, len = $item.length; i < len; i++){
			navLis.push('<span class="'+ (i==0?'current':'') +'"></span>');
		}
	    $sliderNav.html(navLis.join(''));
	
		//下一页
		function next(){
			var move = 0;
			if(index > $item.length - 2){
				//最后一页再点下一页无反应
					$container.css('-webkit-transform','translate3d(0, 0, 0)');
					index = 0;
					moveTo = 0;
					setIndex(index); 
				return;
			}
			moveTo -= $width;
			 
			++index;
			setIndex(index); 
			$container.css('-webkit-transform','translate3d('+ moveTo +'px, 0, 0)');
		};
		//上一页
		function prev(){
			var move = 0;
			//第一页点上一页无反应
			if(index <= 0){
					moveTo = -($containerWidth - $width);
					$container.css('-webkit-transform','translate3d('+ moveTo +'px, 0, 0)');
					index = $item.length - 1;
					setIndex(index); 
				return;
			}
			moveTo += $width;
			--index;
			setIndex(index)
			$container.css('-webkit-transform','translate3d('+ moveTo +'px, 0, 0)');
		}
		
		//设置导航
		function setIndex(index){
		    $sliderNav.find('span').removeClass('current');
			$sliderNav.find('span').eq(index).addClass('current');
		}
		
		this.swipeLeft(function(e){
		   clearInterval(interval);
		   next();
		   e.stopPropagation();
		});
		
		this.swipeRight(function(e){
		   clearInterval(interval);
		   prev();
		   e.stopPropagation();
		});
		
		if(opts.auto){
			interval = setInterval(next,4500);
		}
	   return this;
	}
	
    $.fn.vgoSlider.defaults = {
		 auto:true
    };
})(Zepto);