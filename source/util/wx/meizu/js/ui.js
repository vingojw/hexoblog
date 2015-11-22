var isSupportTouch = "ontouchstart" in window || "ontouchend" in window.document;
var _tapClick = isSupportTouch ? "tap" : "click";
var isOldWebKit = +navigator.userAgent.toLowerCase().replace(/.*(?:applewebkit|androidwebkit)\/(\d+).*/, "$1") < 536;
var sizeRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;

var YTconfig = {
   resourcePath: 'http://ecmobile.test.yaomaiche.com/',
   sourcePath: "http://ecmobile.test.yaomaiche.com/",
   //actionPath: "http://carmaster.yaomaiche.com",
   actionPath: "http://localhost:47002",
    buidUrl: function (data) {
        /*if (data.indexOf('http://') > -1) {
            return data;
        }*/
        return
        a;
    },
    formatPriceToMillion: function (price) {
        return price / 10000 + "万";
    }
}

window["UI"] = window["UI"] || {};
var markFlag = true,alertFlag = true,confirmFlag = true,popFlag = true, loadingFlag = true;
(function (ui) {
    function mark(){
        this.guid = (new Date()).getTime();
        this.markdiv = null;
    }
    mark.prototype = {
        create:function(){
            var _this = this;
            this.markdiv = $("<div class='markdiv' id='mark" + this.guid + "'></div>");
            this.markdiv.unbind("click").click(function () {
                _this.callback();
            });
            $("body").append(this.markdiv);

        },
        show:function(){
            var _this = this;
            if(markFlag){
                _this.create();
                markFlag = !markFlag;
            }
        },
        hide:function(){
            if(this.markdiv && this.markdiv.length ){
                this.markdiv.hide();
                markFlag = !markFlag;
            }
        },
        removeout: function () {
            this.markdiv.remove();
            markFlag = !markFlag;
        },
        setcallback: function (fn) {
            this.callback = fn;
        },
        callback: function () {
            this.callback.call(this);
        }
    }
    ui.mark = mark;
})(UI);

(function (ui) {
    function uialert(msg, s, fn) {
        var self = this;
        self.msg = msg;
        //默认3000ms
        self.s = s || 3000;
        self.fn = fn;
        self.mark = new ui.mark();
        self.mark.setcallback(function () {
            if (self.tid) {
                clearTimeout(self.tid);
            }
            self.$el.hide();
            self.mark.hide();
            self.fn && self.fn();
        })

        var alertdiv = $("#uialert").length?$("#uialert"):$("<div id='uialert' class='alertdiv'><div class='msg'></div></div>");
        $("body").append(alertdiv);
        alertdiv.hide();
        self.$el = alertdiv;

    }
    uialert.prototype = {
        show: function (msg, s, fn) {
            var self = this;
            self.mark.show();
            self.$el.find(".msg").html(self.msg);
            self.$el.show();
            if (self.s) {
                if (self.tid) {
                    clearTimeout(self.tid);
                }
                self.tid = setTimeout(function () {
                    self.mark.callback();
                }, self.s)
            }
        }
    }

    ui.alert = function (msg, s, fn) {
        var uialertobj = new uialert(msg, s, fn);
        setTimeout(function(){
            uialertobj.show();
        },10);
    }
})(UI);


(function (ui) {
    function uiconfirm() {
        var self = this;
        self.mark = new ui.mark();
        self.mark.setcallback(function () {
            if (self.tid) {
                clearTimeout(self.tid);
            }
            self.$el.hide();
            self.mark.hide();
        })
        var alertdiv = $("#uiconfirm").length?$("#uiconfirm"):$("<div id='uiconfirm' class='alertdiv' style='z-index:9999'><div class='confirm'><h3></h3><div class='confirmp'></div><div class='confirmbtnp'><a href='###' class='btna'>取消</a><a href='###' class='btna'>确定</a></div></div></div>");
        $("body").append(alertdiv);
        alertdiv.hide();
        self.$el = alertdiv;
        self.$btna = self.$el.find(".btna");
    }
    uiconfirm.prototype = {
        show: function (msg, title, btncall, s, confirmtitle, canceltitle) {
            var self = this;
            self.mark.show();
            self.$el.find(".confirmp").html(msg);
            self.$el.find("h3").html(title);
            if (canceltitle) {
                self.$el.find(".confirmbtnp .btna").eq(0).html(canceltitle);
            }
            if (confirmtitle) {
                self.$el.find(".confirmbtnp .btna").eq(1).html(confirmtitle);
            }
            self.$el.show();
            if (btncall) {
                $.each(self.$btna, function (k, v) {
                    $(v).unbind().click(function (e) {
                        if (btncall[k]) {
                            btncall[k].call(self, e);
                        }
                    })
                });
            }
            if (s) {
                if (self.tid) {
                    clearTimeout(self.tid);
                }
                self.tid = setTimeout(function () {
                    self.mark.callback();
                }, s)
            }

        },
        hide: function () {
            this.$el.hide();
            this.mark.hide();
        }

    }

    ui.confirm = function (msg, title, btncall, s, confirmtitle, canceltitle) {
        var uiconfirmobj = new uiconfirm();
        uiconfirmobj.show(msg, title, btncall, s, confirmtitle, canceltitle);
    }
})(UI);


// 弹出层 popDiv为div的id. width值为<=1的时候，宽度为可视区宽度的百分比，>1的时候为具体值
//new UI.Popup("ta",'afafa','1').show();
(function (ui) {
    function uiPoP(popDiv, title, width) {
        this.guid = (new Date()).getTime();
        var _self = this;
        _self.title = title;
        _self.docW = document.body.clientWidth || document.documentElement.clientWidth;
        _self.id = "pop" + this.guid;
        _self.popDiv = popDiv;
        _self.mark = new ui.mark();

        _self.width = width;
        var markup = '<div id="' + this.id + '" class="car-popup"><h2>' + this.title + '</h2>';
        markup += '<div class="content-body"></div>';

        $("body").append($(markup));
        if (_self.popDiv) {
            var $content = $("body").find(".content-body");
            var $popDiv = $("#" + _self.popDiv);
            $popDiv.appendTo($content);
        }

    }
    uiPoP.prototype = {
        show: function () {
            var _self = this;

            _self.mark.show();
            $(".content-body").find("#" + _self.popDiv).show();
            _self.positionPopup();

            var $wrap = $("#" + this.id);
            $wrap.on("orientationchange", function () {
                _self.positionPopup();
            });
            // 设置mark的点击callback事件
            _self.mark.setcallback(function () {
                _self.hide();
            });

        },
        hide: function () {
            var _self = this;
            _self.mark.remove();
            if (_self.popDiv) {
                var $popDiv = $(".content-body").find("#" + _self.popDiv).hide();
                $popDiv.appendTo($("body"));
            }
            var $wrap = $("#" + _self.id);
            $wrap.unbind("orientationchange").remove();
        },
        positionPopup: function () {
            var _self = this;
            var $wrap = $("#" + this.id);
            var w0 = $(window).width() || 360,
                  h0 = $(window).height() || 500,
                  w1 = $wrap[0].clientWidth || 300,
                  h1 = $wrap[0].clientHeight || 100;

            if( (_self.width.indexOf('.') != -1 && _self.width.charAt(0) == '0') || _self.width == '1'){
                 _self.width = parseInt(_self.docW * Number(_self.width));
            }else{
                _self.width = Number(_self.width);
            }

            $wrap.css({
                "top": (h0 / 2) - (h1 / 2) + "px",
                 "left":(w0 / 2) - (_self.width / 2) + "px",
                 "width": _self.width
            });
        }
    }
    ui.Popup = uiPoP;
})(UI);

(function (ui) {
    function uiloading() {
        if (ui.loadingobj) {
            return ui.loadingobj;
        }
        var self = this;
        self.mark = new ui.mark();
        self.mark.setcallback(function () { });
        var loadingdiv = $(".uiload");
        if (loadingdiv.length <= 0) {
            loadingdiv = $("<div class='uiload'><div class='uiloadicon'><span class='ui-loading'><i class='t1'></i><i class='t2'></i><i class='t3'></i></span><span>加载中...</span></div></div>");
            $("body").append(loadingdiv);
            loadingdiv.hide();
        } else {
            loadingdiv.hide();
        }
        this.$el = loadingdiv;
        ui.loadingobj = this;
    }
    uiloading.prototype = {
        show: function () {
            this.$el.show();
            this.mark.show();
        },
        hide: function () {
            this.$el.hide();
            this.mark.removeout();
        }
    }
    ui.loading = uiloading;
})(UI);

(function (ui) {
    function uiBindTab(tab,child) {
        //tab 切换
        var tabObj = tab ? $(tab) : $(".tab");
        tabObj.each(function () {
            var $this = $(this),tabc = UI.childUntil(".tabc", $this.parent());
            $this.children(child+":not([rel*='link'])").add($this.find(".tabitem:not([rel*='link'])")).each(function (n) {
                $(this).attr("rel", n);
            }).on("click", function (e) {
                if ($this.attr("enableLink") != "true") {
                    if ($this.attr("trigger") != "click") { return false; }
                }
                $(this).addClass("current").siblings().removeClass("current");
                tabc && tabc.hide().eq(parseInt($(this).attr("rel"))).show();
                if ($(this).attr("command")) {
                    eval($(this).attr('command') + "(this)");
                }
            });
        });
    }
    ui.bindTab = uiBindTab;
})(UI);

(function (ui) {
    ui.childUntil = function (expr, obj) {
        if (obj.length == 0) return null;
        var child = obj.children(expr);
        if (child.length == 0) {
            return arguments.callee(expr, obj.children());
        } else {
            return child;
        }
    }
})(UI);




var YMC = {
    //localStorage相关
    // YMC.local("key","value") //存
    // YMC.local("key")         //取
    // YMC.local("key",null)    //删
    local:function(){
        var args = Array.prototype.slice.call( arguments );
        var key,value;
        key = args[0];
        if(args.length == 1){
            return window.localStorage.getItem(args[0]);
        }
        if(args.length == 2){

            value = args[1];

            if($.type(value)=='null'){
                return window.localStorage.removeItem(key);
            }

            if($.type(value) === 'object'  ){
                value = JSON.stringify(value);
            }

            try{
                return window.localStorage.setItem(key, value);
            }catch(e){
                alert('您开启了秘密浏览或无痕浏览模式，请关闭');
            }
        }

    },
    isWeiXin: function (){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }(),
    gup: function gup(url) {
        // get url's parameters
        // return an object
        // input: http://m.yaomaiche.com?id=ex1&id2=ex2
        // output: { "id": "ex1", "id2": "ex2" }
        var obj = {};
        var paraArr, strArr, urlArr, paraStr;
        if (url.indexOf("?") > -1) {
            urlArr = url.split("?");
            paraStr = urlArr[1]
        } else {
            paraStr = url
        }
        if (paraStr.indexOf("&") > -1) {
            paraArr = paraStr.split("&")
        } else {
            paraArr = new Array(paraStr)
        }

        for (var ind = 0; ind < paraArr.length; ind++) {
            try {
                paraArr[ind] = paraArr[ind].indexOf("=") > -1 ? paraArr[ind] : paraArr[ind] + "=";
                strArr = paraArr[ind].split("=");
                obj[strArr[0]] = decodeURIComponent(strArr[1].replace(/\+/g, " "))
            } catch (by) {}
        }
        return obj
    },
    sup: function sup(url, obj){
        // set url's parameters
        // return a url
        // input: http://m.yaomaiche.com, {"id": "ex1", "id2": "ex2"}
        // output: http://m.yaomaiche.com?id=ex1&id2=ex2
        var urlArr, paraStr, paraArr;

        if(url.indexOf("?") === -1){
            url += "?";
        }
        urlArr = url.split("?");
        paraStr = urlArr[1];

        if (paraStr.indexOf("&") > -1) {
            paraArr = paraStr.split("&")
        } else {
            if(paraStr){
                paraArr = new Array(paraStr)
            }else{
                paraArr = []
            }
        }

        if(Object.prototype.toString.call(obj).toLowerCase() === "[object object]"){
            for (var item in obj){
                if(obj.hasOwnProperty(item)){
                    paraArr.push(encodeURIComponent(item) + "=" + encodeURIComponent(obj[item]));
                }
            }
        }

        return urlArr[0] + "?" + paraArr.join("&");
    },
    isLocal: window.location.href.match(/(localhost|\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})/),//通过本地localhost 或者 通过本机ip地址
    isTest: window.location.href.match(/test\.(?:yaomaiche\.)?com/),//通过后端接口
    getAjaxUrl:function(url){
        if(window.baseUrl){
            return window.baseUrl + url;
        }
        var status = 'online';
        if(this.isLocal){
            status = 'local';
        }
        if(this.isTest){
            status = 'test';
        }
        var Mode = {
            online: '生产的地址',
            test: 'http://ecmobile.test.yaomaiche.com/api/services/',
            local:'./json/'
        }
        return Mode[status] + (url || '');
    },
    //获取图片地址，如果地址带有 http://那么就认为是绝对地址，然后直接返回
    getResourceUrl:function(url){
        if(url.match(/http:\/\//)){
            return url;
        }
        if(window.baseResourceUrl){
            return window.baseResourceUrl + url;
        }
        var testUrl  = 'http://resource.test.yaomaiche.com/Uploader/';//此url到时候走配置
        return testUrl + url;
    },
    log: function(logType , msg ){
        if(!this.debug || !window.console){
            return;
        }
        try{
            //存在打印类型就输出到控制台
            if(window.console[logType]){
                window.console[logType](msg);
            }else{
                //不存在打印类型(形参个数>1，提示logType写错；形参个数===1，直接输出到控制台)
                if(arguments.length>1){
                    window.console.log('logType undefined -→ '+'%c'+arguments[0],'color:red');
                }else if(arguments.length === 1){
                    window.console.log(arguments[0]);
                }
            }
        }catch(ex){}
    },
    debug : false,
    /*
    {
        url     : '后端给的api地址'
        data    : {} 对象形式
        success : function
        error   : function
        使用：
        YMC.ajax({
            url        : ''
            data       : {},
            success    : function(res){},
            error      : function(){},
            beforeSend : function(){},
            complete   : function(){},
            showLoading: true //是否显示loading效果
        })
    }
     */
    ajax:function(opt){
        var url = YMC.getAjaxUrl(opt.url);
        if(opt.url.match(/http:\/\//)){ //如果传的url含有 http://说明是个绝对路径，就不用拼了
            url = opt.url;
        }
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            url: url,
            data: JSON.stringify(opt.data || {}),
            timeout: 30000,
            success: function(res){
                $.type(opt.success) === 'function' && opt.success(res);
            },
            error: function(){
                $.type(opt.error) === 'function' && opt.error();
            },
            beforeSend: function(xhr){
                var loginStatus = YMC.register.loginStatus();
                var userKey = YMC.getUserKey();

                if(loginStatus){
                    xhr.setRequestHeader("Authorization", "Bearer " + loginStatus);
                }

                if(userKey){
                    xhr.setRequestHeader("__UserKey", userKey );
                }

                opt.showLoading && YMC.ajaxLoadingObj.show();
                $.type(opt.beforeSend) === 'function' && opt.beforeSend(xhr);
            },
            complete: function(){
                opt.showLoading && YMC.ajaxLoadingObj.hide();
                $.type(opt.complete) === 'function' && opt.complete();
            }
        });
    },
    getUserKey:function(){
        var userKey = '';
        try{
            userKey = YMC.local("__UserKey") || '';
        }catch(e){
            return '';
        }
        return userKey;
    },
    ajaxLoadingObj: new UI.loading
};
YMC.debug = YMC.isLocal || YMC.isTest;


//注册相关
YMC.register = {
    registerNum : 60,
    //获取手机验证码
    getCode:function(telNum,errorfn){
        var data = {
            Mobile: $.trim(telNum)
        };

        YMC.ajax({
            url: 'Content/MessageValidate/CreateMobileValidateCodeSendMobile',
            data: data,
            success: function(res){
                var result = res.result;

            },
            error: function(){
                UI.alert("获取验证码失败，请稍后再试", 1500, function(){
                    errorfn && errorfn();
                });
            }
        });
    },
    //电话
    validateMobile:function(mobile){
        mobile = $.trim(mobile.replace(/\s/g,''));
        if (!(/^(13[0-9]|15[012356789]|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/.test($.trim(mobile)))) {
                return false;
        }else{
            return true;
        }
    },
    //验证身份证
    validateIdNumber:function(idNumber){
        idNumber = idNumber.replace(/\s+/g,"");
        var reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        if (reg.test(idNumber)) {
            return true;
        }else{
            return false;
        }
    },
    //倒计时
    coutDown:function(btn,ele){
            var txt = "s";
            var _this=this;
            if (this.registerNum == 0) {
                btn.show();
                ele.hide();
                this.registerNum = 60;
            } else {
                txt = this.registerNum + "s";
                ele.text(txt).show();
                btn.hide();
                this.registerNum--;
                setTimeout(function(){_this.coutDown(btn,ele)}, 1000);
            }
    },
    //验证手机验证码
    checkCode:function(Mobile,Code,succFn,url){
        var data = {
            Mobile: $.trim(Mobile).replace(/\s/g,''),
            Code: $.trim(Code)
        };
        YMC.ajax({
            url: url || "Content/MessageValidate/IsSuccessMobileValidateBySendCode",
            data: data,
            success: function(res){
                var result = res.result;
                if(res.success && res.result.result){
                    succFn.call();
                }else{
                    UI.alert(res.result.message, 1500);
                }
            },
            error: function(){
                UI.alert("验证码错误", 1500);
            }
        });
    },
    //登录状态，有字符串表示登录成功，字符串为token值；false未登录。
    loginStatus: function(){
        var date = (new Date()).getTime(),
            ymcToken = YMC.local("ymcToken") || "";

        if(ymcToken){
            ymcToken = JSON.parse(ymcToken);
            if(ymcToken.id&&(ymcToken.expireTime-date)>0){
                return ymcToken.id;
            }
            YMC.local("ymcToken", null);
        }

        return false;
    },
    //设置用户token {token:'',expiresMinutes:'分钟数'}
    setYMCToken: function(data){
        var expireTime = (new Date()).getTime() + data.expiresMinutes*60*1000,
            ymcToken = {
                "id": data.token,
                "expireTime": expireTime
            };

        YMC.local("ymcToken", JSON.stringify(ymcToken));
    }
}

