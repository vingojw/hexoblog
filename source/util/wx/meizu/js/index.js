/*判断用户登陆*/
if(YMC.register.loginStatus() != false){
    $('.loginN').hide();
    $('.loginY').show();
    $('.changeR').show();
}else{
    $('.loginN').show();
    $('.loginY').hide();
    $('.changeR').hide();
}

$('.changeR').on('click',function(){
    YMC.local("ymcToken", null);
    window.location.href = "_login.html";
})
//配置初始化
juicer.set({ 'tag::operationOpen': '{^' });
var dataA = {
    CityId:""
};

var loading = new UI.loading;
 function loadDataByCityId(obj){
     var url="Platform/Home/Index";
     YMC.ajax({
        url:url,
        data: obj,
        success: function(res){
            if(!res.success){
                UI.alert(res.error.message);
                return;
            }

            //console.info(JSON.stringify(res, null, 4));
            var tpl = $('#banner').html();
            var banner = juicer(tpl, res);
            $('#swBanner').html("");
            $('#swBanner').html(banner);

            /*banner*/
            var swiper = new Swiper('.swiper-banner', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay:3000 //3秒自动切换
            });

            var tpl1 = $('#bLogo').html();
            var bLogo = juicer(tpl1, res);
            $('.car_logo_wrap').html("");
            $('.car_logo_wrap').html(bLogo);

          /*  var $carLogo =  $('.car_logo');
            $carLogo.each(function(i,el){
                $(el).on('click',function(){
                    $carLogo.removeClass("car_logo-on");
                    $(this).addClass('car_logo-on');
                });
            });*/



            var tpl2 = $('#hotCar').html();
            var hotCar = juicer(tpl2, res);
             $('.hotCar').html("");
            $('.hotCar').html(hotCar);

            var tpl3 = $('#newCar').html();
            var newCar = juicer(tpl3, res);
            $('.newCar').html("");
            $('.newCar').html(newCar);


            $('.car_img').each(function(i,item){
               var img = YMC.getResourceUrl($(item).attr('atrimg'));
                // 临时数据
                //var img1 = "http://image.yaomaiche.com/neg/Original/722a0bb5-ee8d-49f2-ae5a-ff7a527a1793.png";
                $(item).css({
                    'background-image': 'url('+ img+ ')'
                })
            });


            $(".attrSrc").each(function(i,item){
                var srcImg = YMC.getResourceUrl($(item).attr('attrSrc'));
                $(item).attr('src',srcImg);
            });

            $('.loHref').each(function(i,item){
                var href = 'product.html' +"?id="+ $(item).attr('Lid');
                $(item).attr('href',href);
            });

            /*滚动*/
            var viewHeight = window.innerHeight,loaded = false,car_logo_outer = $('.car_logo_outer');

            var listBot = $('.car_prod3_wrap'),
            loadPos = listBot.offset().top + listBot.height() - viewHeight - 50;

            var carLogo = $('.car_logo_wrap'),
            hdHeight = $('header.hd').height(),
            getBback = carLogo.offset().top - hdHeight,
            fixStart = $('.car_prod1').offset().top - hdHeight;
            $(window).scroll(function() {
                //load delay
                var scrollTop = $(window).scrollTop();
                if(loaded == false) {
                    if(scrollTop >= loadPos) {
                        loaded = true;
                    }
                }
                if(scrollTop <= fixStart){
                    car_logo_outer.removeClass('car_logo_fix');
                }
            });

            var startY = endY = 0;
            function handleTouchEvent(event) {
                if(event.touches.length == 1) {
                    if(event.type == 'touchstart') {
                        startY = event.touches[0].clientY;
                    } else if(event.type == 'touchmove') {

                        endY = event.changedTouches[0].clientY;
                        if((document.body.scrollTop || document.documentElement.scrollTop) > fixStart) {
                            if((startY - endY) < -4) {
                                car_logo_outer.addClass('car_logo_fix');
                            } else if((startY - endY) > 4) {
                                car_logo_outer.removeClass('car_logo_fix');
                            }
                        }
                    }
                }
            }
            $(".main_cnt").on("touchstart", handleTouchEvent);
            $(".main_cnt").on("touchmove", handleTouchEvent);
        },
        error: function(){},
        beforeSend: function(){},
        complete: function(){
            loading.hide();
        }
    })
 }

//城市列表
function listCity(){
    var url="Core/OpenCity/GetAllOpenCityList";
     YMC.ajax({
        url:url,
        data: {},
        success:function(res){
         if(res.success){
            dataA.CityId = res.result;
            var tplCity = $('#tplCity').html();
            var listCity = juicer(tplCity, res);
            $('#listCity').html("");
            $('#listCity').html(listCity);
         }
        },complete:function(){
            window.AMapReady(function(){
                loading.show();
                var local_cityId=YMC.local("cityID");
                var local_cityName=YMC.local("cityTxt");
                if(local_cityId !="" && local_cityName != "" && local_cityId !=null && local_cityName != null){
                    dataA.CityId = local_cityId;
                    loadDataByCityId(dataA);
                    $(".cityname li").removeClass('city-on');
                    $(".cName span").text(local_cityName);
                    $('.cityname li[data_id="'+local_cityId+'"]').addClass('city-on');
                }else{
                    locationInfo( geocoder_CallBack );
                    return false;
                }
            });
        }
    })
}
listCity();
//通过定位,获取城市,根据城市,通过请求获得城市id,渲染对应城市id的数据
function locationCity(obj){
    var url='Core/OpenCity/GetOpenCityIdByName';
    YMC.ajax({
        url: url,
        success: function(res){
           if(res.success){
                var cityId = res.result;
                var city_name=obj.cityName;
                var local_cityId=YMC.local("cityID");
                var local_cityName=YMC.local("cityTxt");
                if(local_cityId && local_cityName){
                    dataA.CityId = local_cityId;
                    obj.cityName = local_cityName;
               }else{
                    dataA.CityId = cityId;
                    obj.cityName = city_name;
               }

               YMC.local("cityID",dataA.CityId);
               YMC.local("cityTxt",obj.cityName);
           }
        },
        complete:function(){
           $(".cName span").text(obj.cityName);
           loadDataByCityId(dataA);
        }
    })
}

$(document).ready(function() {
     /*城市选择*/
    var cityList = $(".citylist"),pagetitle  = $(".pagetitle"),Mark = new UI.mark();
    Mark.setcallback(function() {
        this.removeout();
    });
    $(".cName").on("click", function(){
        Mark.show()
        cityList.addClass("citylist-on");
    });

    cityList.on("click", ".iclick3, li", function(){
        var that = $(this);
         var data_id=$(this).attr("data_id");
         var local_cityId=YMC.local("cityID");
        if(that.is("li")){
            tabSwitch(that.siblings("li"), that, "city-on");
            pagetitle.find("span.cName>span").html(that.text());
        }
        Mark.hide();
        cityList.removeClass("citylist-on");

        //如果连续点击的是同一城市 不需要请求数据
        if(data_id && data_id != null && data_id != local_cityId){
            loading.show();
            dataA = {
                CityId:data_id
            };
            loadDataByCityId(dataA);
        }


            YMC.local("cityID",data_id);
            YMC.local("cityTxt",$(this).text());


    });

    /*左边导航*/
    showPop('.nav-left','.left_menu','left_menu_cur');
    var swiper1 = new Swiper('.swiper-menu', {
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
    });
});


function showPop(obj, target, sClass){
     $(obj).click(function(){
        var $target=$(target);
        if(this.mark){
            if($target.is(sClass)){
                this.mark.removeout();
                _nubind();
            }else{
                this.mark.show();
                bodyUntouch();
            }
        }else{
            this.mark=new UI.mark();
            bodyUntouch();
            this.mark.setcallback(function(){
                this.removeout();
                _nubind();
                $target.removeClass(sClass);
                })
            this.mark.show();
        }
        $target.toggleClass(sClass);
        return false;
    })
}

function tabSwitch(ele, targEle, className){
    ele.each(function(i){
        $(ele[i]).removeClass(className);
    });
    targEle.addClass(className);
}

function eventDefault(e) {
    e.preventDefault();
};
function bodyUntouch() {
  document.addEventListener("touchmove", eventDefault, false);
};
function _nubind() {
  document.removeEventListener("touchmove", eventDefault ,false);
};


    //高德地图
    window.AMapReadyDone = function(){
        AMapReady.ready = true;
        if (AMapReady.readyList) {
            for (var i = 0; i < AMapReady.readyList.length; i++) {
                AMapReady.readyList[i] && AMapReady.readyList[i]();
            }
        }
    }
    window.AMapReady = function(fn){
        if (AMapReady.ready) {
            fn && fn();
        } else {
            AMapReady.readyList = AMapReady.readyList || [];
            fn && AMapReady.readyList.push(fn);
            if (!AMapReady.load) {
                AMapReady.load = true;
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = 'http://webapi.amap.com/maps?v=1.3&key=684c10ff05d461d66da941bfe22f96d1&callback=AMapReadyDone';
                document.body.appendChild(script);
            }
        }
    }

    /*
        @@首先判断localStorage有没有cityId和cityTxt,
        @@如果有,就不需要定位
    */


    //定位当前地址
    function locationInfo(getlocalCallback) {
        var amap;
        if(!document.getElementById('Amap')){
            amap = document.createElement('div');
            amap.id = 'iCenter';
            amap.style.display = 'none';
            document.body.appendChild(amap);
        }
        mapObj = new AMap.Map("iCenter");
       if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onComplate, locationError, {
                    // 指示浏览器获取高精度的位置，默认为false
                    enableHighAcuracy: true,
                    // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                    timeout: 5000,
                    // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
                    maximumAge: 3000
                });
            } else {
                locationError();
            }
    }



    loading.show();
    /*定位成功,将经纬度转为地址*/
    function onComplate(pos) {
      var _lng = pos.coords.longitude;
      var _lat = pos.coords.latitude;
      var lnglatXY = new AMap.LngLat(_lng, _lat);
      var MGeocoder;
      //将经纬度转为实际地址
      //加载地理编码插件
      mapObj.plugin(["AMap.Geocoder"], function() {
          MGeocoder = new AMap.Geocoder({
              enableHighAccuracy: true, //是否使用高精度定位，默认:true
              extensions: "all",
              showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
              zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          //返回地理编码结果
          AMap.event.addListener(MGeocoder, "complete", geocoder_CallBack);
          //逆地理编码
          MGeocoder.getAddress(lnglatXY);
      });
    }
    //定位失败,默认城市为上海
    function locationError(){
        var obj = {
            cityName: '上海市',
         };
        locationCity(obj);
    }

    function geocoder_CallBack(data) {
        var comp = data.regeocode.addressComponent;
        var city=!comp.city?comp.province:comp.city;
        var obj = {
            cityName: city,
         };
        locationCity(obj);
    }

    //进入个人中心
    $(document).on('click', '.customer_btn', function(event) {
        if(!YMC.register.loginStatus()){
            UI.alert("亲,请先登录",1500,function(){
               window.location.href="_login.html";
           })
        }else{
            window.location.href="user-info.html";
        }
    });
