$(".ico_arrow-left").click(function () {
    if (document.referrer) {
        history.back();
    } else {
        location.href = "/Index";            
    }
    return false;
});

LoanService = {

    Init: function () {
        LoanService.InitUI();
    },
    InitUI: function () {
        function optionOn (eleWrap, currName, currClassName, eleTxt) {
            var childEle = eleTxt || "span",
                currClassName = currClassName || "option-on";
            eleWrap.find(".option").each(function() {
                var that = $(this);
                if(that.find(childEle)[0].innerText === currName){
                    that.addClass(currClassName);
                }else{
                    that.removeClass(currClassName);
                }
            })
        }

        var item = $(".item");

        // 付款方式
        var payType = $(item[0]).find('.txt1')[0].innerText,
            payOption = $("#payOption");
        optionOn(payOption, payType);

        // 银行
        var bankName = $(item[1]).find('.txt1')[0].innerText,
            bankOption = $("#bankOption");
        optionOn(bankOption, bankName, "", "i");

        // 首付比例
        var payRatioNum = $(item[2]).find('.txt1')[0].innerText,
            payRatioOption = $("#payRatioOption");
        optionOn(payRatioOption, payRatioNum);

        // 按揭利率
        var interest = $(item[3]).find('.txt1')[0].innerText,
            interestOption = $("#interestOption");
        optionOn(interestOption, interest);

        //计算默认的金融服务费
        var serviceFee = LoanService.CalServiceFeed();
        $("#serviceFee").text(serviceFee);

    },
    TouchEvent: function () {

        // 返回我的购车方案
        $(".ico_arrow-left").off("click").on("click", function () {
            LoanService.UpdateSchemeLoan();
        });

        // 点击右侧箭头变化
        $(".item").click(function () {
            var that = $(this);
            if(that.hasClass("item_arr-up")){
                that.removeClass("item_arr-up").addClass("item_arr-down").next().hide();
            }else{
                that.removeClass("item_arr-down").addClass("item_arr-up").next().show();
            }
        })

        // 选项点击事件
        $(".option").click(function(){
            var that = $(this);
            var optionTxt = that.attr("title")?that.attr("title"):that.find("span")[0].innerText,
                parentEle = that.parent();

            parentEle.children().each(function(){
                if($(this).hasClass("option-on")){
                    $(this).removeClass("option-on");
                }
            });
            that.addClass("option-on");
            parentEle.prev().find(".txt1")[0].innerText = optionTxt;
            if(parentEle.is("#payOption")){
                optionTxt === "全额购买"?($("#loanInfoWrap").hide()):($("#loanInfoWrap").show());
            }else if(parentEle.is("#payRatioOption")){
                $("#serviceFee")[0].innerText = LoanService.CalServiceFeed(optionTxt);
            }
        });

        // 银行点击事件
        $(".pic_item_inner").click(function (e) {
            // 阻止事件派发
            e.stopPropagation();

            $(this).parent().parent().children().each(function (index) {
                if ($(this).hasClass("pic_item_cur")) {
                    $(this).removeClass("pic_item_cur");
                }
            });

            $(this).parent().addClass("pic_item_cur");
            var tp = $(this).attr("title");
            // show() hide()
            LoanService.BankDivControl(tp);

            if (tp == "建设银行") {
                $("#icbc").find(".list_floatitem").each(function (index) {
                    if ($(this).hasClass("cur")) {
                        $(this).removeClass("cur");
                    }
                });
                $("#boc").find(".list_floatitem").each(function (index) {
                    if ($(this).hasClass("cur")) {
                        $(this).removeClass("cur");
                    }
                });
                var first = $("#ccb").find(".list_floatitem")[0];
                $(first).addClass("cur");
            }
            if (tp == "工商银行") {
                $("#ccb").find(".list_floatitem").each(function (index) {
                    if ($(this).hasClass("cur")) {
                        $(this).removeClass("cur");
                    }
                });
                $("#boc").find(".list_floatitem").each(function (index) {
                    if ($(this).hasClass("cur")) {
                        $(this).removeClass("cur");
                    }
                });

                var first = $("#icbc").find(".list_floatitem")[0];
                $(first).addClass("cur");
            }
            if (tp == "中国银行") {
                $("#icbc").find(".list_floatitem").each(function (index) {
                    if ($(this).hasClass("cur")) {
                        $(this).removeClass("cur");
                    }
                });
                $("#ccb").find(".list_floatitem").each(function (index) {
                    if ($(this).hasClass("cur")) {
                        $(this).removeClass("cur");
                    }
                });

                var first = $("#boc").find(".list_floatitem")[0];
                $(first).addClass("cur");
            }
            // 设置按揭利息
            $("#tax").prev().find(".tr").text($("#tax").find(".cur")[0].innerText);
            // 银行选择
            $(this).parent().parent().parent().parent().find(".tr").text(tp);
            // 银行介绍
            $("#icbcDesc").parent().find(".tr").text(tp);
            
            
        });
    },
    FormatMoney: function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    CalServiceFeed: function (num) {
        var firstRate = num || "";
        if(!firstRate){
            $(".item_left").each(function () {
                if ($(this)[0].innerText === "首付比例") {
                    // 首付比例
                    firstRate = $(this).next()[0].innerText;
                }
            });
        }
        firstRate = firstRate.substring(0, 2);

        // 计算服务费
        var carPrice = $("#price").attr("value");
        var serviceFee = carPrice * (1 - (firstRate / 100)) * (2 / 100);
        return LoanService.FormatMoney(serviceFee, 2);
    },
    BankDivControl:function(bank,toggle){
        switch (bank) {
            case "建设银行":
                $("#icbc").hide();
                $("#icbcDesc").hide();
                $("#boc").hide();
                $("#bocDesc").hide();
                $("#ccb").show();
                $("#ccbDesc").show();
                break;
            case "工商银行":
                $("#icbc").show();
                $("#icbcDesc").show();
                $("#boc").hide();
                $("#bocDesc").hide();
                $("#ccb").hide();
                $("#ccbDesc").hide();
                break;
            case "中国银行":
                $("#icbc").hide();
                $("#icbcDesc").hide();
                $("#boc").show();
                $("#bocDesc").show();
                $("#ccb").hide();
                $("#ccbDesc").hide();
                break;
        }
    },
    BankDescToggle: function (bank) {
        switch (bank) {
            case "建设银行":
                $("#icbcDesc").hide();
                $("#bocDesc").hide();
                    if ($("#ccbDesc").css("display") == "none") {
                        $("#ccbDesc").show();
                    } else {
                        $("#ccbDesc").hide();
                    }
                
                break;
            case "工商银行":
                $("#bocDesc").hide();
                $("#ccbDesc").hide();

                if ($("#icbcDesc").css("display") == "none") {
                    $("#icbcDesc").show();
                } else {
                    $("#icbcDesc").hide();
                }
                break;
            case "中国银行":
                $("#icbcDesc").hide();
                $("#ccbDesc").hide();
                if ($("#bocDesc").css("display") == "none") {
                    $("#bocDesc").show();
                } else {
                    $("#bocDesc").hide();
                }
                break;
        }
    },
    UpdateSchemeLoan: function () {
        console.log("yeah");
        var item = $(".item");
        var loanInfo = {
            SchemeSysNo:'71',
            PayType: $(item[0]).find('.txt1')[0].innerText,
            Bank: $(item[1]).find('.txt1')[0].innerText,
            FirstPay: $(item[2]).find('.txt1')[0].innerText,
            LoanRate: $(item[3]).find('.txt1')[0].innerText,
            serviceFee: $("#serviceFee")[0].innerText
        }

        $.ajax({
            type: "POST",
            url: "/Scheme/AjaxUpdateSchemeLoan",
            data: { data: JSON.stringify(loanInfo) },
            dataType: "JSON",
            async: false,
            beforeSend: function (XMLHttpRequest) { },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            success: function (res) {
                var obj = JSON.parse(res);
                if (obj.Success) {
                    // 更新成功后跳转到我的购车方案
                    if (document.referrer) {
                        location.href = "/scheme/index";
                    } else {
                        //alert('return native main.');
                        location.href = "app://return-home";
                    }
                }
            }
        });
    }
}

Zepto(function ($) {
    LoanService.Init();
    LoanService.TouchEvent();
});