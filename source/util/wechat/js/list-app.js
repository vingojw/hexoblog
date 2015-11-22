(function() {

    var myDate = new Date(),
        y = myDate.getFullYear(),
        m = myDate.getMonth(),
        d = myDate.getDate(),
        begin = getNowFormatDate(y + '-' + m + '-' + d), //获取到当前客户端时间 2014-11-03
        begin7a = GetDateStr(-7), //一个星期前
        begin7b = GetDateStr(7); //一个星期后
        loadingDay = GetDateStr(8); //一个星期后

    console.log('一个星期前：' + begin7a);
    console.log('一个星期后：' + begin7b);
    console.log('动态加载开始的日期：' + loadingDay);
    console.log('今天日期：' + begin);

    function getQueryString(name) { //获取url参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    function getNowFormatDate() { //格式化时间
        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";
        //初始化时间 
        Year = day.getFullYear(); //ie火狐下都可以 
        Month = day.getMonth() + 1;
        Day = day.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10) {
            CurrentDate += Month + "-";
        } else {
            CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10) {
            CurrentDate += Day;
        } else {
            CurrentDate += "0" + Day;
        }
        return CurrentDate;
    }

    function GetDateStr(AddDayCount) { //日期算法
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
    }

    // setHtml
    function setHtml(data, obj) {
        var msg = data.data,
            state = ['未开始', '比赛中', '已结束'],
            tag = ['tag tag-no', 'tag', 'tag tag-no'],
            html = '<div class="item-list-box">';

        for (var key in msg) {
            if (msg[key] != 0) {
                html += '<div class="item-tit">' + key + '</div>';
                for (var i = 0; i < msg[key].length; i++) {
                    html += '<div class="item-list"><a href="page-v1.html?match_id=' + msg[key][i].id + '"><div class="troops troops-left"><img width="70" height="70" alt="' + msg[key][i].team_name1 + '" src="' + msg[key][i].team_icon1 + '"><p>' + msg[key][i].team_name1 + '</p></div><div class="troops-msg"><p class="troops-plan">' + msg[key][i].league + msg[key][i].round + '</p><p class="troops-vs">' + ((msg[key][i].state != 1) ? (msg[key][i].team_score1 + ':' + msg[key][i].team_score1) : 'VS') + '</p><p class="troops-state">' + ((msg[key][i].state == 1) ? ('<span class="time">' + msg[key][i].time.substring(11) + '</span>') : '') + '<span class="' + tag[msg[key][i].state - 1] + '">' + state[msg[key][i].state - 1] + '</span></p></div><div class="troops troops-right"><img width="70" height="70" alt="' + msg[key][i].team_name2 + '" src="' + msg[key][i].team_icon2 + '"><p>' + msg[key][i].team_name2 + '</p></div></a></div>'
                };
            };
        }

        html += '</div>'
        $('#' + obj).append(html);
    }


    window.app = {
        main: function() {
            app.scrollLoad();
            //当前的默认列表
            $.ajax({
                type: 'GET',
                url: 'http://api.51viper.com/api/list_match.jsp?begin=' + begin7a + '&end=' + begin7b,
                dataType: 'jsonp',
                success: function(data) {
                    setHtml(data, 'Jlist');
                }
            });
        },
        scrollLoad: function() {
            var myScroll,
                pullUpEl, pullUpOffset,
                generatedCount = 0;

            /**
             * 滚动翻页 （自定义实现此方法）
             * myScroll.refresh();      // 数据加载完成后，调用界面更新方法
             */
            function pullUpAction() {
                setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
                    $.ajax({
                        type: 'GET',
                        url: 'http://api.51viper.com/api/list_match.jsp?begin=' + loadingDay,
                        dataType: 'jsonp',
                        success: function(data) {
                            setHtml(data, 'Jlist');
                        }
                    });

                    myScroll.refresh(); // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
                }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
            }

            /**
             * 初始化iScroll控件
             */
            function loaded() {

                pullUpEl = document.getElementById('pullUp');
                pullUpOffset = pullUpEl.offsetHeight;

                myScroll = new iScroll('wrapper', {
                    scrollbarClass: 'myScrollbar',
                    /* 重要样式 */
                    useTransition: false,
                    /* 此属性不知用意，本人从true改为false */
                    onRefresh: function() {
                        if (pullUpEl.className.match('loading')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        }
                    },
                    onScrollMove: function() {
                        if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                            pullUpEl.className = 'flip';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                            this.maxScrollY = this.maxScrollY;
                        } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                            this.maxScrollY = pullUpOffset;
                        }
                    },
                    onScrollEnd: function() {
                        if (pullUpEl.className.match('flip')) {
                            pullUpEl.className = 'loading';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                            pullUpAction(); // Execute custom function (ajax call?)
                        }
                    }
                });

                setTimeout(function() {
                    document.getElementById('wrapper').style.left = '0';
                }, 800);
            }

            //初始化绑定iScroll控件 
            document.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);
            document.addEventListener('DOMContentLoaded', loaded, false);
        }
    }
    app.main()
})()