$(".ico_arrow-left").click(function () {
    if (document.referrer) {
        history.back();
    } else {
        location.href = "/Index";            
    }
    return false;
});

Insurance = {

    Init: function () {
        Insurance.InitUI();
    },
    InitUI: function () {

    },
    TouchEvent: function(){
    	// 点击右侧箭头变化
        function openAndClose(ele, nextClass){
            if(ele.hasClass("item_arr-up")){
                ele.removeClass("item_arr-up").addClass("item_arr-down").next(nextClass).hide();
            }else if(ele.hasClass("item_arr-down")){
                ele.removeClass("item_arr-down").addClass("item_arr-up").next(nextClass).show();
            }
        }

        $(".item").click(function () {
            var that = $(this);

            openAndClose(that, "")
        });

        $(".switch_box").on("click", function(){
            $(this).toggleClass("switch_box-on");
        });
        $(".ico_checkbox2").on("click", function(){
            if(!$(this).hasClass("ico_checkbox2-disabled")){
                $(this).toggleClass("ico_checkbox2-on");
            }
        });

        var icoCheckList = $(".ico_checkbox"),
        	supplierList = $(".iins"),
        	supplierName = $("#supplierName");
        $(".item .item_left").click(function(e){
        	e.stopPropagation();
        	var that = $(this);

        	if(that.find(".iins").length){
        		supplierList.each(function(){
                    var thatP = $(this).parent(".item_left");
                    if(thatP.hasClass("option-on")){
                        thatP.removeClass("option-on");
                    }
                });
                that.addClass("option-on");
                supplierName.html(that.data("txt"));
        	}
        });

        var tabList = $(".ui_tab-wrap").find("li"),
            insurProdName = $("#insurProdName"),
            packInfoList = $(".package_dtl");

        var oneInAll = {
            tabSwitch: function(ele, targEle, className){
                ele.each(function(i){
                    $(ele[i]).removeClass(className);
                });
                targEle.addClass(className);
            },
            infoSwitch: function(ele, targEleIndex){
                ele.each(function(i){
                    $(ele[i]).hide();
                });
                $(ele[targEleIndex]).show();
            }
        }

        $(".ui_tab-wrap").on("click", "li",  function(){
            var that = $(this),
                thatText = that.data("txt");

            oneInAll.tabSwitch(tabList, that, "ui_tab-on");

            insurProdName.html(thatText);

            oneInAll.infoSwitch(packInfoList, that.index());
        });

        $(".option_list").on("click", "li",function(e){
            var that = $(this),
                thatSib = that.siblings("li");

            oneInAll.tabSwitch(thatSib, that, "option-on");

            that.parents(".item_unfold").prev().find(".item_left small").html(that.html());
        });
    }
}

Zepto(function ($) {
    Insurance.Init();
    Insurance.TouchEvent();
});
