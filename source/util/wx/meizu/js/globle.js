var ajaxhost =YTconfig.resourcePath;//Get API Path;
function YtGloble(){
}
var num = 60;
YtGloble.prototype={
    getCode:function(telNum){
        var data = {
            Mobile: $.trim(telNum)
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            url: ajaxhost + "api/services/Content/MessageValidate/CreateMobileValidateCodeSendMobile",
            data: JSON.stringify(data),
            timeout: 30000,
            success: function(e){
                codeMsg = e.result;
            },
            error: function(){
                UI.alert("获取验证码失败，请稍后再试", 1500, function(){
                });
            }
        });
    },
    vilidateMobile:function(mobile){
        if (!(/^(13[0-9]|15[012356789]|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/.test($.trim(mobile)))) {
                return false;
        }else{
            return true;
        }
    },
    vilidateIdNumber:function(idNumber){
        var reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        if (reg.test($.trim(idNumber))) {
                return false;
        }else{
            return true;
        }
    },
    coutDown:function(btn,ele){
            var txt = "s";
            var _this=this;
            if (num == 0) {
                btn.show();
                ele.hide();
                num = 60;
            } else {
                txt = num + "s";
                ele.text(txt).show();
                btn.hide();
                num--;
                setTimeout(function(){_this.coutDown(btn,ele)}, 1000);
            }
    },
    checkCode:function(Mobile,Code,succFn){
        var data = {
            Mobile: $.trim(Mobile),
            Code: $.trim(Code)
        };
        $.ajax({
               type: "POST",
               contentType: 'application/json',
               url: ajaxhost + "api/services/Content/MessageValidate/IsSuccessMobileValidateBySendCode",
               data: JSON.stringify(data),
               dataType: "json",
               timeout: 30000,
               success: function (res) {
                    if(res.success && res.result.result){
                        succFn.call();
                    }else{
                        UI.alert(res.result.message, 1500);
                    }
               }
        })
    }

}

var yt=new YtGloble();
