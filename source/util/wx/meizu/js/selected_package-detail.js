$(".ico_arrow-left").click(function (e) {
    e.preventDefault();
    if(document.referrer){
        history.back();
    }else{
        window.location.href = "index.html";
    }
});
SelectedPackage = {

    Init: function () {
        SelectedPackage.InitUI();
    },
    InitUI: function () {
        // load the content
        function cntLoad(url, fn){
            YMC.ajax({
                url: url,
                data: {"id":YMC.gup(window.location.href)["id"]||""},
                success: function (e) {
                    if(e.success&&e.result){
                        $(".uiload").hide();
                        var res = e.result;

                        fn(res);
                    }
                },
                error: function(e){
                    UI.alert("网络连接失败，请稍后再试", 1500, function(){
                        $(".uiload").hide();
                    });
                }
            });
        }

        function prodInfo(res){
            var html = "";

            html = '<div class="main_cnt" data-id="'+res.id+'">'+
                        '<div class="img_wrap"><img src="'+res.picUrl+'" /></div>'+
                        '<div class="item clearfix">'+
                            '<div class="item_left">商品价格</div>'+
                            '<div class="item_right"><span class="txt1">&yen;'+res.ymcPrice+'</span></div>'+
                        '</div>'+
                        '<div class="item clearfix"><div class="item_left">商品详情</div><div class="item_right">&nbsp;</div></div>'+
                        '<div class="item_detail1">'+
                            '<h3 class="item_detail1-title">商品展示</h3>'+
                            '<div>'+(res.description?res.description:"暂无描述")+'</div>'+
                        '</div>'+ 
                    '</div>';

            $("#main").html(html);
            $(".pagetitle .lg-txt").text(res.name);
            $(".img_wrap img").attr("src", function(){
                return YMC.getResourceUrl($(this).attr("src"));
            });
        }

        // 根据url参数决定传入参数。
        cntLoad('Products/ShoppingCart/GetProductInfo', prodInfo);
    }
}

Zepto(function ($) {
    SelectedPackage.Init();
});
