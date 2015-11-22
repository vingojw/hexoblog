$(".ico_arrow-left").click(function () {
    if (document.referrer) {
        history.back();
    } else {
        location.href = "/Index";
    }
    return false;
});

var Fee = {
        serviceFee: 1490,
        formalRegFee: 0,
        tempRegFee: 0,
        formalRegPrice: 120,
        tempRegPrice: 12,
        tempRegTimes: 1,
        regFee: function(){
            return this.formalRegFee + this.tempRegFee;
        },
        totalFee: function(){
            return this.serviceFee + this.regFee();
        }
    };
var serviceFeeEle = $("#serviceFee"),
    regFeeEle = $("#regFee"),
    formalRegFeeEle = $("#formalRegFee"),
    tempRegFeeEle = $("#tempRegFee"),
    totalFeeEle = $("#totalFee");


Insurance = {

    Init: function () {
        Insurance.InitUI();
    },
    InitUI: function () {
        serviceFeeEle.html("¥"+Fee.serviceFee);
        regFeeEle.html("¥"+Fee.regFee());
        formalRegFeeEle.html("¥"+Fee.formalRegPrice);
        tempRegFeeEle.html("¥"+Fee.tempRegPrice);
        totalFeeEle.html("¥"+Fee.totalFee());
    },
    TouchEvent: function(){
    	// 点击右侧箭头变化
        $(".item").click(function () {
            var that = $(this);

            if(that.hasClass("item_arr-up")){
                that.removeClass("item_arr-up").addClass("item_arr-down").next().hide();
            }else if(that.hasClass("item_arr-down")){
                that.removeClass("item_arr-down").addClass("item_arr-up").next().show();
            }
        });

        $(".switch_box").click(function(){
            $(this).toggleClass("switch_box-on");
        });

        var isRegFeeOn = {
                formal: false,
                temp: false
            },
            uiAdj = $(".ui_adjust");
        $(".item .item_left").click(function(){
            var that = $(this);

            if(that.find(".ico_checkbox2").length){
                that.find(".ico_checkbox2").toggleClass("ico_checkbox2-on");
            }

            if(that.hasClass("formalreg")){
                isRegFeeOn.formal = !isRegFeeOn.formal;
                if(isRegFeeOn.formal){
                    Fee.formalRegFee = Fee.formalRegPrice;
                }else{
                    Fee.formalRegFee = 0;
                }
            }else if(that.hasClass("tempreg")){
                isRegFeeOn.temp = !isRegFeeOn.temp;
                if(isRegFeeOn.temp){
                    Fee.tempRegFee = Fee.tempRegFee?Fee.tempRegFee:Fee.tempRegPrice;
                    uiAdj.show();
                }else{
                    Fee.tempRegFee = 0;
                    uiAdj.hide();
                    tempRegFeeEle.html("¥"+Fee.tempRegPrice);
                    uiAdj.find(".ui_adjust_view").html("申办1次");
                }
            }
            regFeeEle.html("¥"+Fee.regFee());
            totalFeeEle.html("¥"+Fee.totalFee());
        });

        uiAdj.click(function(e){
            var targ = e.target,
                that = $(this);

            if($(targ).hasClass("ui_adjust_minus")){
                if(Fee.tempRegTimes > 1){
                    Fee.tempRegTimes -= 1;
                    if(Fee.tempRegTimes == 1){
                        $(targ).addClass("disabled");
                    }
                    $(targ).siblings(".ui_adjust_plus").removeClass("disabled");
                }else{
                    $(targ).addClass("disabled");
                }
            }else if($(targ).hasClass("ui_adjust_plus")){
                if(Fee.tempRegTimes < 3){
                    Fee.tempRegTimes += 1;
                    if(Fee.tempRegTimes == 3){
                        $(targ).addClass("disabled");
                    }
                    $(targ).siblings(".ui_adjust_minus").removeClass("disabled");
                }else{
                    $(targ).addClass("disabled");
                }
            }

            Fee.tempRegFee = Fee.tempRegPrice * Fee.tempRegTimes;
            that.find(".ui_adjust_view").html("申办"+Fee.tempRegTimes+"次");
            regFeeEle.html("¥"+Fee.regFee());
            tempRegFeeEle.html("¥"+Fee.tempRegFee);
            totalFeeEle.html("¥"+Fee.totalFee());
        });
    }
}

Zepto(function ($) {
    Insurance.Init();
    Insurance.TouchEvent();
});
