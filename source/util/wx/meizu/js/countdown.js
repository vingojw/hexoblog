/*
count down
倒计时的容器必须标注:data-role=countdown
天:data-name=day
小时:data-name=hour
分钟:data-name=minute
秒:data-name=second
毫秒:data-name=millisecond

*/
(function ($) {
    if ($.fn.countDown) {
        if (console) {
            console.warn("$.fn.countDown已经存在");
        }
        return;
    }
    Number.prototype.leftPad = function (str, min) {
        var s = this.toString();
        var len = min - s.length;
        if (len > 0) {
            var tem = "";
            var i;
            for (i = 0; i < len; i++) {
                tem += str;
            }
            s = tem + s;
        }
        return s;
    };

    function getMS(date) {
        if (date instanceof Date) return date.valueOf();
        return date;
    }

    function getTime(ms) {
        var milliSecond = ms % 1000;
        ms -= milliSecond;
        ms /= 1000;
        var second = ms % 60;
        ms -= second;
        ms /= 60;
        var minute = ms % 60;
        ms -= minute;
        ms /= 60;
        var hour = ms % 24;
        ms -= hour;
        ms /= 24;
        var day = ms;
        return {
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            milliSecond: milliSecond
        };
    }

    function updateUI(tag, ms) {
        tag.show();
        var obj = getTime(ms);
        var day = tag.find("[data-name=day]");
        if (day.length > 0) day.text(obj.day.leftPad("0", day.length > 1 ? 2 : 1));

        var hour = tag.find("[data-name=hour]");
        if (hour.length > 0) hour.text(obj.hour.leftPad("0", 2));


        var hourend = tag.find("[data-name=hourend]");
        if (hourend.length > 0) hourend.text((obj.hour + obj.day * 24).leftPad("0", 2));

        var minute = tag.find("[data-name=minute]");
        if (minute.length > 0) minute.text(obj.minute.leftPad("0", 2));


        var second = tag.find("[data-name=second]");
        if (second.length > 0) second.text(obj.second.leftPad("0", 2));

        var milliSecond = tag.find("[data-name=milliSecond]");
        if (milliSecond.length > 0) milliSecond.text(obj.milliSecond);
    }

    var timer = null;

    var times = [];
    var i;
    //倒计时步长
    var escape = 1000;
    /*
    {
    ms:1000,
    stopped:function(){},
    update:function(){},
    tag:$(this)
    }
    */
    function addTime(obj) {
        times.push(obj);
    }

    function step() {
        i = 0;
        if (timer) clearTimeout(timer);
        for (; i < times.length; i++) {
            if (times[i] == null) {
                continue;
            };
            times[i].ms -= times[i].step;
            updateUI(times[i].tag, times[i].ms);
            if (times[i].ms <= 0) {
                if (times[i].stopped) {
                    times[i].stopped(times[i].tag);
                }
                times[i] = null;
                continue;
            }
        }
        timer = setTimeout(step, escape);
    }

    function go() {
        if (timer) return;
        step();
    }

    /*
     {
     time:倒计时时间
     step:倒计时步长
     stopped:倒计时结束事件
     }
     */
    $.fn.countDown = function (config, autoStart) {
        var me = $(this);
        var dataRole = $(this).attr("data-role");
        if (dataRole != "countdown") return;
        var time = getMS(config.time);
        if (isNaN(time)) {
            throw "时间无效";
        }
        if (time <= 0) return;
        var timeStep = parseInt(config.step);
        if (isNaN(timeStep)) {
            throw "步长必须是正数,单位:ms";
        }
        addTime({
            ms: time,
            step: timeStep,
            stopped: config.stopped,
            tag: $(this)
        });
        if (autoStart && autoStart == true) go();
    };

    $.extend($, {
        countDown: function () {
            if (arguments[0] == "option") {
                if (arguments[1] == "step") {
                    escape = arguments[2];
                }
            }
            if (arguments[0] == "go") {
                go();
            }
        }
    });

})(Zepto);