var myScroll;
function loaded() {
    myScroll = new IScroll('#addressList', { mouseWheel: false, click: true });
}
function selectListCity(){
}
selectListCity.prototype={
    init:function(){
        _this=this;
        h=$('body').height();
        this.loadData();
        this.showCity();
        this.choosePro();
        this.gotoBack();
        this.reChoosePro();
        array_city=[];
        obj=$("#selectAdr");
        provinceName=$(".provinceName");
        cityName=$(".cityName");
        areaName=$(".areaName");
        listcity=$("#listcity");
        userSelect=$("#userSelect");
        addressList=$("#addressList");
        province=$(".province");
        subCity=$(".subCity");
        subArea=$(".subArea");
        juicer.set({ 'tag::operationOpen': '{^' });
    },
    loadData:function(){
        YMC.ajax({
            url: 'Core/Region/GetProvinceList',
            data: {},
            success:function(res){
                var data_city=res.result;
                var str = "";
                for(var i in data_city){
                    str += "<li data-id="+data_city[i].id+">"+data_city[i].name+"</li>";
                    array_city[i]=data_city[i].citys;
                }
                $(".province").html(str);
            }
        })
    },
    showCity:function(){
        $("#tplBox").on('click',"#chooseInfo",function(event) {
           obj.css({"height":h+61});
           obj.addClass('active');
           $(window).scrollTop(0);
          loaded();
        });
    },
    choosePro:function(){
        $(listcity).on("click",'li',function(e){
            var cls=e.target.parentNode.className;
            if(cls=="province"){
                _this.fillData(this,provinceName,'provinceId');
                $(userSelect).show();
                $(addressList).css({"top":"92px"});
                _this.renderCity();
                var prov_id=$(this).data("id");
                $(subCity).html("");
                index=$(this).index();
                _this.getCityByProv(index);
            }else if(cls=='subCity'){
                _this.fillData(this,cityName,'cityId');
                _this.renderArea();
                _this.closePop();
                $("#chooseInfo").data("proid",userInfo['provinceId']);
                $("#chooseInfo").data("cityid",userInfo['cityId']);
                $("#chooseInfo .txt1").html("");
                $("#chooseInfo .txt1").html(userInfo.provinceName+"  "+userInfo.cityName);
                userInfo.provinceName=$(provinceName).text();
                userInfo.cityName=$(cityName).text();
            }else if(cls=='subArea'){
                // _this.fillData(this,areaName,'areaId');
                // _this.closePop();
                // $("#chooseInfo").data("proid",userInfo['provinceId']);
                // $("#chooseInfo").data("cityid",userInfo['cityId']);
                // $("#chooseInfo .txt1").html("");
                // $("#chooseInfo .txt1").html(userInfo.provinceName+"  "+userInfo.cityName);
                // userInfo.provinceName=$(provinceName).text();
                // userInfo.cityName=$(cityName).text();
            }
            _this.refresh();
            $(listcity).css({"transform":"translate(0px,0px)"});
      })
    },
    getCityByProv:function(index){
        for(var i in array_city[index]){
            $(subCity).append(
                "<li data-id='"+array_city[index][i].id+"'>"+array_city[index][i].name+"</li>"
            )
        }
    },
    //重新选择区域
    reChoosePro:function(){
        $(userSelect).on('click', 'span', function(e) {
            var cls=e.target.className;
            if(cls=='provinceName'){
                _this.renderPro();
            }else if(cls=='cityName'){
                _this.renderCity();
            }else if(cls=='areaName'){
                _this.renderArea();
            }
        });
    },
    //返回关闭页面
    gotoBack:function(){
        $(".ico-close-city").click(function(){
            _this.closePop();
        });
    },
    renderPro:function(){
        province.show();
        subCity.hide();
        subArea.hide();
        _this.refresh();
    },
    renderCity:function(){
        province.hide();
        subCity.show();
        subArea.hide();
         _this.refresh();
    },
    renderArea:function(){
        province.hide();
        subCity.hide();
        subArea.show();
        _this.refresh();
    },
    //根据选择的元素，将其渲染到对应的容器中
    fillData:function(that,targetTxt,id){
        var _id=$(that).data("id");
        var _txt=$.trim($(that).text());
        $(targetTxt).text(_txt);
        var a=targetTxt[0].className;
        for(var i in userInfo){
            if(i==a){
                userInfo[a]=_txt;
            }
            if(i==id){
                userInfo[id]=_id;
            }
        }
    },
    closePop:function(){
        $(selectAdr).removeClass('active');
        $("body").css({"overflow":"auto"});
    },
    refresh:function(){
       myScroll.refresh();
   }
}
var selctArea=new selectListCity();
selctArea.init();