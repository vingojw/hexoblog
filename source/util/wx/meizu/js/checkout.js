
(function (win) {

    var UILoading = new UI.loading(),
        ajaxRequestCount = 0;

    UILoading.mark.$el.css("z-index", "10000");

    var context = {
        OrderMemo: "",
        PayTypeID: 0,
        ShippingAddressID: 0,
        PromotionCode: "",
        ValidateKey: "",
        ShoppingItemParam: "",
        PlanGuid:""
    };

    function setContext() {
        context.PlanGuid = $("#planguid").val();
        context.UserName = $("#userName").val();
        context.CellPhone = $("#userPhone").val().replace(/\ /g, "");
        context.ValidateKey = $("#userValidateCode").length == 0 ? "" : $("#userValidateCode").val();
        //var remarkinfoDom = $(".remarkinfo .inarea:eq(0)");
        //var remarkinfo = remarkinfoDom.val();
        //if (remarkinfo == remarkinfoDom.attr("placeholder")) {
        //    remarkinfo = "";
        //}
        //context.OrderMemo = remarkinfo;
        //context.PayTypeID = $(".paytype div:eq(0)").attr("PayTypeID");
        //context.ShippingAddressID = $(".checkout_address .myaddrlist:eq(0)").attr("ShipTypeID");
        //context.PromotionCode = $(".platCoupinSec div:eq(0)").attr("CouponCode");
        ////商家优惠券
        //var merchantCouponList = [];

        //$("input:checked[name=ticket][type=radio]").each(function () {
        //    if ($.trim($(this).val()).length > 0) {
        //        var str = $(this).val();
        //        merchantCouponList.push({
        //            MerchantSysNo: parseInt($(this).attr("MerchantSysNo")),
        //            CouponCode: $.trim($(this).val()),
        //            CouponName: $.trim($(this).next("span").text())
        //        });
        //    }
        //});
        //context.MerchantCouponCodeParam = JSON.stringify(merchantCouponList);
    }

    function modifyCheckout(c) {
        setContext();
        $.extend(context, c, {});
        ajaxProcessor("Build", context, function (data) {
            $("#checkoutPannel").html(data);
        });
    }

    function expandNewAddressPanel() {
        if (!$("#addressPop").hasClass("newaddr_show")) {
            $("#addressPop").addClass("newaddr_show");
        }
        $("#catepro_iscroll").height(window.innerHeight - 45); //计算并设置可滑动区域的高度
        setTimeout(function () {
            $("#catepro_iscroll").get(0).opener.refresh();
            $("#catepro_iscroll").get(0).opener.scrollTo(0, -1 * (($("#myaddrlist").height() - window.innerHeight) < 0 ? 0 : $("#myaddrlist").height() - window.innerHeight + 45));
        }, 150);
    }

    function collapseNewAddressPanel() {
        if ($("#addressPop").hasClass("newaddr_show")) {
            $("#addressPop").removeClass("newaddr_show");
        }
    }

    function ajaxProcessor(action, postData, callback, dataType) {
        dataType = dataType || "html";
        $.ajax({
            type: "post",
            dataType: dataType,
            url: win["baseurl"] + "/Checkout/" + action,
            data: postData,
            cache: false,
            beforeSend: function (XMLHttpRequest) {
                if (++ajaxRequestCount <= 1) {
                    UILoading.show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                UI.alert("系统错误", 1200);
            },
            success: function (data, textStatus, jqXHR) {
                if (data.error) {
                    if (data.code == 401) {
                        window.location.href = $("#__LoginUrl__").val();
                    }
                    else if (data.message) {
                        window.scrollTo(0, 0);
                        UI.alert(data.message, 1200);
                    }
                    else if (data.messages && data.messages.length > 0) {
                        var errormessage = "";
                        for (var i = 0; i < data.messages.length; i++) {
                            errormessage += data.messages[i] + "\r\n";
                        }
                        window.scrollTo(0, 0);
                        UI.alert(errormessage, 1200);
                    }
                    return;
                }
                if (typeof (callback) == "function") {
                    callback(data);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                if (--ajaxRequestCount <= 0) {
                    UILoading.hide();
                }
            }
        });
    }

    var Checkout = win["Checkout"] = win["Checkout"] || {

        context: context,

        applyCoupon: function (e) {
            var $this = $(e);
            var prePromotionCode = $this.parents(".inputCoupon").find("input").eq(0).val();
            if (prePromotionCode.length <= 0) {
                UI.alert("请输入优惠券编码！", 1200);
                return;
            }
            setContext();
            context.PromotionCode = prePromotionCode;
            ajaxProcessor("ApplyCoupon", context, function (data) {
                if (data.success) {
                    $(".platCoupinSec div:eq(0)").attr("CouponCode", data.couponCode);
                    $(".coupon_pop").get(0).opener.mark.callback();
                    modifyCheckout();
                }
                else {
                    $this.parents(".inputCoupon").find("input").eq(0).val("");
                    $(".inputCoupon .applyMsg").remove();
                    $("<span class=\"applyMsg\">优惠券应用失败：" + data.message + "</span>").insertBefore(".inputCoupon .inputwrap");
                }
            }, "json");
        },


        cancelApplyCoupon: function (e) {
            modifyCheckout({ PromotionCode: "" });
        },

        applyMerchantCoupon: function (e) {
            var $this = $(e);
            var $query = $this.parents(".couponlist").find("input:checked");
            if ($query.length <= 0) {
                UI.alert("请选择要使用的优惠券！", 1200);
                return;
            }
            //setContext();
            modifyCheckout();
        },

        cancelApplyMerchantCoupon: function (e) {
            $(e).parents(".couponlist").find("input[type=radio]").removeAttr("checked");
            //setContext();
            modifyCheckout();
        },

        saveCustAuthInfo: function () {
            var postData = $("#form_auth").serialize();
            ajaxProcessor("CsutomerAuth/Submit", postData, function (data) {
                if (!data.error) {
                    $(".auth_pop").get(0).opener.mark.callback();
                    $(".authSec div:eq(0)").attr("CustAuthID", data.SysNo);

                    $("#authentiCation").html("实名认证<em class=\"blue\">（已认证）</em>")
                    UI.alert("保存成功！", 1200);
                }
            }, "json");
        },
        selShippingAddress: function (e) {
            var $this = $(e);
            var sysno = parseInt($this.find("input:eq(0)").prop("checked", true).val());
            if (sysno <= 0) {
                $("#form_newaddr input").each(function () {
                    $(this).val("");
                    if ($(this).attr("name") == "SysNo") {
                        $(this).val("0");
                    }
                })
                $("#form_newaddr select").each(function () {
                    $(this).attr("selectVal", "0");
                })
                window.Area.init();
                expandNewAddressPanel();
            }
            else {
                $(".checkout_address .myaddrlist:eq(0)").attr("ShipTypeID", sysno);
                collapseNewAddressPanel();
                //收起选择地址浮层
                $(".checkout_address").get(0).opener.mark.callback();
                modifyCheckout();
            }
        },
        editShippingAddress: function (e) {
            var $this = $(e);
            $("#myaddrlist ul>li").prop("checked", false);
            $this.parent().find("input:eq(0)").prop("checked", true);
            var sysno = parseInt($this.parent().find("input:eq(0)").val());
            if (sysno > 0) {
                ajaxProcessor("ShippingAddress/Get", { id: sysno, cmd: "Get" }, function (data) {
                    $("#addressPop").eq(0).html(data);
                    expandNewAddressPanel();
                });
            }
        },
        saveShippingAddress: function (e) {
            var postData = $("#form_newaddr").serialize();
            ajaxProcessor("ShippingAddress/Submit", postData, function (data) {
                //收起选择地址浮层
                $(".checkout_address").get(0).opener.mark.callback();
                modifyCheckout({ ShippingAddressID: data.SysNo });
            }, "json");
        },

        selPayType: function (e) {
            var $this = $(e);
            var sysno = parseInt($this.find("input:eq(0)").prop("checked", true).val());

            $(".paytype").find("div[data-target='checkout_paytype']").attr("PayTypeID", sysno);
            collapseNewAddressPanel();
            //收起选择地址浮层
            $(".checkout_paytype").get(0).opener.mark.callback();
            modifyCheckout();

        },

        submit: function (e) {
            setContext();
            context.PayTypeID = e;
            if (!$(".agree .checkbox_wrap").hasClass("checkbox_checked")) {
                UI.alert("请阅读并同意要买车用户服务协议！");
                return false;
            }
            //验证
            if (context.UserName == "") {
                UI.alert("请输入您的姓名！");
                return false;
            }

            if (!Biz.Common.Validation.isMobile(context.CellPhone)) {
                UI.alert("请输入正确的手机号码！");
                return false;
            }

            if (context.ValidateKey == "" && $("#txtUserSysNo").val() == undefined) {
                UI.alert("请输入手机验证码！");
                return false;
            }


            ajaxProcessor("Submit", context, function (data) {

                if (data.iphoneApp) {
                    jsBridge.postNotification('orderpay', { userInfoJson: data.userInfoJson, soSysNo: data.soSysNo, payID: data.payID, authKey: data.authKey });
                    return;
                }

                if (data.androidApp) {
                    window.jsPayObj.pay(data.payID, data.soSysNo, data.userInfoJson, data.authKey);
                    return;
                }

                if (data.url) {
                    window.location = data.url;
                    return;
                }
                else if (data.weixinimg) {
                    var msg = '<div id="weixin" class="weixin"><p style="text-align:center; margin-top:50px;"> <img id="weixinimg" title="二维码" height="200" width="200" src="' + data.weixinimg + '" style="margin:auto"></p>';
                    msg += '<p class="mt5">1.请用手机的屏幕截图功能将包含上方二维码区域的屏幕保存到手机本地图片相册。</p>';
                    msg += '<p class="mt5">2.然后打开微信APP，在“扫一扫"”功能中使用图片扫码功能完成支付。</p>';
                    msg += '<p class="mt5">3.微信端提示支付成功后，请主动返回此页面，点击“支付已完成”按键</p></div>';
                    UI.confirm(msg, "微信二维码扫码支付 ", [function (e) { this.hide(); document.location.reload(); }, function (e) {
                        $.get(getstatusurl.replace("abc", data.sosysno), function (msg) {
                            if (msg.status && msg.status > 0) {
                                document.location.href = sodetailurl + "?so=" + data.sosysno;
                            }
                            else {
                                UI.alert("未收到支付信息，请稍后重试。", 2000);
                            }
                        });
                    }
                    ], 1000000, "支付成功", "支付遇到问题");
                    $(".confirm h3").css("text-align", "left");
                    $(".confirm").css("text-align", "left");
                    return;
                }
                else if (data.weixinJS) {
                    Checkout.wxjspay(data.weixinJS);
                }
                else if (data.msg) {
                    var msg = "";
                    for (var i = 0; i < data.msg.length; i++) {
                        msg += data.msg[i];
                    }
                    UI.alert(msg);
                }

            }, "json");
        },
        sendVerfiyCode: function () {
            if (!$(".agree .checkbox_wrap").hasClass("checkbox_checked")) {
                UI.alert("请阅读并同意销售合同普通条款！");
                return false;
            }
            var CustomerID = $.trim($("#userPhone").val()).replace(/\ /g, "");
            if (!Biz.Common.Validation.isMobile(CustomerID.replace(" ", ""))) {
                UI.alert("请输入正确的手机号码！");
                return false;
            }

            $.ajax({
                type: "post",
                url: "/Common/SendValidateCode",
                dataType: "json",
                async: false,
                timeout: 30000,
                data: { cellphone: CustomerID },
                beforeSend: function (XMLHttpRequest) {
                    $("#getvalidatecode").hide();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { },
                success: function (data) {
                    if (data == 's') {
                        var second = 59;
                        var timer = window.setInterval(function () {
                            if (second > 0) {
                                $(".tipReget").show().html("<span>(" + (second--) + "秒后重新发送) </span>");
                            } else {
                                clearInterval(timer);
                                $("#getvalidatecode").show();
                                $(".tipReget").hide();
                            }
                        }, 1000);
                    } else {
                        alert(data);
                        $("#getvalidatecode").show();
                    }
                },
                complete: function (XMLHttpRequest, textStatus) { }
            });
        },
        wxjspay: function (dataStr) {
            WXDATA = dataStr.split("|");
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady();
            }
        }
    };

})(window);


//var WXDATA = new Array();
//function onBridgeReady() {
//    WeixinJSBridge.invoke(
//        'getBrandWCPayRequest', {
//            "appId": '"' + WXDATA[0] + '"',
//            "timeStamp": '"' + WXDATA[1] + '"',
//            "nonceStr": '"' + WXDATA[2] + '"',
//            "package": '"' + WXDATA[3] + '"',
//            "signType": "MD5",
//            "paySign": '"' + WXDATA[4] + '"'
//        },
//        function (res) {
//            if (res.err_msg == "get_brand_wcpay_request:ok") {
//                window.location.href = WXDATA[5];
//            } else {
//                alert(res.err_msg);
//            }
//        }
//    );
//}