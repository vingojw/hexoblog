(function() {
    openid = 'orV45t96sxikAoHUI6By98biem_U';

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    window.app = {

        bind: function() {

            var _this = this;
            $('#Jcomment li').each(function(i) {
                // $(this).tap(function() {
                $(this).click(function() {

                    window.show = !window.show;

                    if (window.show && $(this).children('.box').children('.cmt-pop').css('display') == 'none') {
                        $(this).children('.box').children('.cmt-pop').show();
                        return;
                    }

                    //如果已经显示，那么直接return
                    if ($(this).children('.box').children('.cmt-pop').css('display') == 'block') {
                        return;
                    }

                    //如果show是true，而且里面的没显示，表示点击的其他
                    if (!window.show && $(this).children('.box').children('.cmt-pop').css('display') == 'none') {
                        $('.cmt-pop').hide();
                        return;
                    }
                });

                // 留言回复
                var setdate = $(this).find('.set-btn');
                setdate.click(function() {
                    $('#Jinput').focus().val('回复' + setdate.attr('data') + '楼：');
                    $('.cmt-pop').hide();
                    _this.isShow = false;
                });

                // 举报按钮
                $(this).find('.report').click(function() {
                    var reportId = $(this).attr('data');
                    console.log(openid);
                    $.ajax({
                        type: 'POST',
                        url: 'http://api.51viper.com/api/report.jsp?type=0&udid=' + openid + '&id=' + reportId,
                        // dataType: 'jsonp',
                        success: function(data) {
                            if (data.code == 100) {
                                alert(data.message);
                            } else {
                                alert('举报成功');
                                $('.cmt-pop').hide();
                                _this.isShow = false;
                            };
                        }
                    });
                });
            });
        },
        scrollLoad: function() {

            that = this;
            var myScroll,
                pullDownEl, pullDownOffset,
                pullUpEl, pullUpOffset,
                generatedCount = 4,
                fix = document.getElementById('Jpage');

            /**
             * 上拉返回 （自定义实现此方法）
             * myScroll.refresh();      // 数据加载完成后，调用界面更新方法
             */
            function pullDownAction() {
                setTimeout(function() {
                    myScroll.refresh(); //数据加载完成后，调用界面更新方法   
                }, 1000);
            }

            /**
             * 下拉刷新 （自定义实现此方法）
             * myScroll.refresh();      // 数据加载完成后，调用界面更新方法
             */
            function pullUpAction() {
                setTimeout(function() {

                    fix.className = 'fix';

                    // setHtml
                    function setHtml(data, j, obj) {
                        var msg = data.data,
                            html = '';
                        for (var i = j; i < msg.length; i++) {
                            html += '<li><div class="box"><div class="dPic"><div class="img"><img alt="' + msg[i].userName + '" src="' + msg[i].iconUrl + '"></div><div class="medal"><img src="http://www.sinaimg.cn/lf/sports/logo85/60.png"></div></div><div class="dInfo"><p class="date"><span class="name">' + msg[i].userName + '</span><span class="time">' + msg[i].date + ' <em>' + msg[i].floor + '楼</em></span></p><p class="get-c">' + msg[i].content + '</p></div><div class="cmt-pop"><span data="' + msg[i].floor + '" class="set-btn">回复</span><span data="' + msg[i].id + '" class="report">举报</span></div></div></li>'
                        };
                        $('#' + obj).append(html);
                    }

                    $.ajax({
                        type: 'GET',
                        url: 'http://api.51viper.com/api/list_comment.jsp?&match_id=' + getQueryString('match_id'),
                        dataType: 'jsonp',
                        success: function(data) {
                            setHtml(data, 0, 'Jcomment');
                            if ($('#Jcomment').children().length == 0) {
                                $('#Jcomment').after('<div style="height:100px; text-align: center; padding-top:50px; font-size: 18px; font-family:黑体">暂无留言<span> 点击发评论</span></div>');
                                $('#pullUp').hide();
                                $('#wrapper').css("background", '#fff')
                            };
                        }
                    });

                    that.bind()
                    myScroll.refresh(); // 数据加载完成后，调用界面更新方法 
                }, 1000);
            }

            /**
             * 初始化iScroll控件
             */
            function loaded() {
                pullDownEl = document.getElementById('pullDown');
                pullDownOffset = pullDownEl.offsetHeight;
                pullUpEl = document.getElementById('pullUp');
                pullUpOffset = pullUpEl.offsetHeight;

                myScroll = new iScroll('wrapper', {
                    scrollbarClass: 'myScrollbar',
                    /* 重要样式 */
                    useTransition: false,
                    topOffset: pullDownOffset,
                    onRefresh: function() {
                        if (pullUpEl.className.match('loading')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        }
                    },
                    onScrollMove: function() {
                        if (this.y > 0) {
                            pullDownEl.className = 'flip';
                            this.minScrollY = 0;
                        } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
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
        },
        init: function() {

            app.scrollLoad();
            var stockpile = {};

            // setHtml
            function setHtml(data, j, obj) {
                var msg = data.data,
                    html = '';
                for (var i = j; i < msg.length; i++) {
                    html += '<li><div class="box"><div class="dPic"><div class="img"><img alt="' + msg[i].userName + '" src="' + msg[i].iconUrl + '"></div><div class="medal"><img src="http://www.sinaimg.cn/lf/sports/logo85/60.png"></div></div><div class="dInfo"><p class="date"><span class="name">' + msg[i].userName + '</span><span class="time">' + msg[i].date + ' <em>' + msg[i].floor + '楼</em></span></p><p class="get-c">' + msg[i].content + '</p></div><div class="cmt-pop"><span data="' + msg[i].floor + '" class="set-btn">回复</span><span data="' + msg[i].id + '" class="report">举报</span></div></div></li>'
                };
                $('#' + obj).append(html);
            }

            //默认的评论列表
            $.ajax({
                type: 'GET',
                url: 'http://api.51viper.com/api/list_comment.jsp?pageSize=5&match_id=' + getQueryString('match_id'),
                dataType: 'jsonp',
                success: function(data) {
                    setHtml(data, 0, 'Jcomment');
                    if (data.data.length == 0) {
                        $('#Jcomment').after('<div id="Jnone" style="height:100px; text-align: center; padding-top:50px; font-size: 18px; font-family:黑体">暂无留言，快来抢沙发</div>');
                        $('#pullUp').hide();
                        $('#wrapper').css("background", '#fff')
                    };
                }
            });

            // 比赛信息
            if (getQueryString('match_id')) {
                $.ajax({
                    url: 'http://api.51viper.com/api/match_info.jsp?match_id=' + getQueryString('match_id') + '&udid=' + openid,
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function(data) {
                        var msg = data.data,
                            state = ['未开始', '进行中', '已结束']; //定义状态
                        $('.troops-left img,#JvsL img').attr({ //获取主队队徽
                            src: msg.team_icon1,
                            alt: msg.team_name1
                        });
                        $('.troops-right img,#JvsR img').attr({ //获取客队队徽
                            src: msg.team_icon2,
                            alt: msg.team_name2
                        });
                        $('title').html(msg.league + msg.round); //终端页 title
                        $('.troops-left .troops-name,#JvsL p').html(msg.team_name1); //主队名
                        $('.troops-right .troops-name,#JvsR p').html(msg.team_name2); //客队名
                        $('.troops-vs').html(msg.team_score1 + '-' + msg.team_score2); //比分
                        $('.troops-plan').html(state[msg.state - 1]); // 比赛状态

                        var l = msg.team_favorer1,
                            r = msg.team_favorer2,
                            a = l + r,
                            _l = (l / a).toFixed(2).slice(2, 4),
                            _r = (r / a).toFixed(2).slice(2, 4);
                        if ((r / a).toFixed(2) == 1.00) {
                            _r = 100;
                        }
                        if ((l / a).toFixed(2) == 1.00) {
                            _l = 100;
                        }
                        $('.progress-bar .left').css('width', _l + '%');
                        $('.progress-bar .right').css('width', _r + '%');
                        // 比分条算法获取

                        $('#Jnuml').html(l); //主队点赞数
                        $('#JnumR').html(r); //客队点赞数

                        if (msg.favorer == 1) {
                            $('.left-good span').addClass('gooded'); //主队点赞后的状态
                            $('#JpopBtn').remove(); //如果点赞后，不要弹窗提示支持
                            $('.troops-left span.crown').addClass('show-inline'); //点赞后加小皇冠
                        } else if (msg.favorer == 2) {
                            $('.right-good span').addClass('gooded'); //客队点赞后的状态
                            $('#JpopBtn').remove(); //如果点赞后，不要弹窗提示支持
                            $('.troops-right span.crown').addClass('show-inline'); //点赞后加小皇冠
                        }; //点赞的状态

                        stockpile.favorer = msg.favorer;
                        runAddGood();

                        $('.left-good span,#JvsL').attr('data', msg.team_id1); //设置主队ID，存储data，方便使用
                        $('.right-good span,#JvsR').attr('data', msg.team_id2); //设置客队ID，存储data，方便使用
                    }
                })
            };



            // 发表评论
            $('#Jpublish').click(function() {
                var txt = $('#Jinput').val();
                $.ajax({
                    type: 'POST',
                    url: 'http://api.51viper.com/api/create_comment.jsp?match_id=' + getQueryString('match_id') + '&udid=' + openid + '&content=' + txt,
                    // dataType: 'jsonp',
                    success: function(data) {
                        if (data.code == 100) {
                            alert(data.message);
                        } else {
                            if (txt == '') {
                                alert('评论不能为空');
                            } else if (txt != '') {
                                alert('发表成功');
                                html = '<li><div class="box"><div class="dPic"><div class="img"><img alt="广东省广州市网友" src="http://www.sinaimg.cn/lf/sports/logo85/61.png"></div><div class="medal"><img src="http://www.sinaimg.cn/lf/sports/logo85/60.png"></div></div><div class="dInfo"><p class="date"><span class="name">广东省广州市网友</span><span class="time">2014-12-03 17:20:16 <em>15楼</em></span></p><p class="get-c">' + txt + '</p></div><div class="cmt-pop"><span data="15" class="set-btn">回复</span><span data="79" class="report">举报</span></div></div></li>';
                                $('#Jcomment').prepend(html);
                                $('#Jnone').remove();
                            }

                        };

                    }
                });
            });


            $('#JpopBtn').click(function() {
                $('#Jpop').show();
            });

            $('#Jclose').click(function() {
                $('#Jpop').hide();
            });

            function maingood(obj) { //主队点赞函数
                var g = $(obj).attr('data'),
                    l = Number($('#Jnuml').html()),
                    r = Number($('#JnumR').html()),
                    a = l + r + 1,
                    _l = ((l + 1) / a).toFixed(2).slice(2, 4),
                    _r = (r / a).toFixed(2).slice(2, 4);

                if (((l + 1) / a).toFixed(2) == 1.00) {
                    _l = 100;
                }

                $.ajax({
                    type: 'POST',
                    url: 'http://api.51viper.com/api/favorer.jsp?match_id=' + getQueryString('match_id') + '&udid=' + openid + '&team_id=' + g,
                    // dataType: 'jsonp',
                    success: function(data) {
                        if (data.code == 100) {
                            alert(data.message);
                        } else {
                            $('.left-good span').addClass('gooded');
                            $('.troops-left .crown').addClass('show-inline');
                            $('.progress-bar .right').css('width', _r + '%');
                            $('.progress-bar .left').css('width', _l + '%');
                            $('#Jnuml').html(Number(l) + 1);
                        };

                    }
                });
            }

            function subgood(obj) { //客队点赞函数

                var g = $(obj).attr('data'),
                    l = Number($('#Jnuml').html()),
                    r = Number($('#JnumR').html()),
                    a = l + r + 1,
                    _l = (l / a).toFixed(2).slice(2, 4),
                    _r = ((r + 1) / a).toFixed(2).slice(2, 4);

                if (((r + 1) / a).toFixed(2) == 1.00) {
                    _r = 100;
                }

                $.ajax({
                    type: 'POST',
                    url: 'http://api.51viper.com/api/favorer.jsp?match_id=' + getQueryString('match_id') + '&udid=' + openid + '&team_id=' + g,
                    // dataType: 'jsonp',
                    success: function(data) {
                        if (data.code == 100) {
                            alert(data.message);
                        } else {
                            $('.right-good span').addClass('gooded');
                            $('.troops-right .crown').addClass('show-inline');
                            $('.progress-bar .left').css('width', _l + '%');
                            $('.progress-bar .right').css('width', _r + '%');
                            $('#JnumR').html(Number(r) + 1);
                        };

                    }
                });
            };

            function runAddGood() {
                if (stockpile.favorer == 0) {
                    //主队点赞
                    $('.left-good span').on('click', function() {
                        maingood($(this));
                        $('.left-good span').off(); //取消所有事件
                        $('.right-good span').off(); //取消所有事件
                        $('#JpopBtn').remove();
                    });

                    //客队点赞 
                    $('.right-good span').on('click', function() {
                        subgood($(this));
                        $('.right-good span').off(); //取消所有事件
                        $('.left-good span').off(); //取消所有事件
                        $('#JpopBtn').remove();
                    });

                    //主队弹窗点赞
                    $('#JvsL').on('click', function() {
                        maingood($(this))
                        $('#Jpop').hide();
                        $('#JpopBtn').remove();
                        $('#JvsR').off();
                        $('.right-good span').off();
                        $('.left-good span').off();
                    });

                    //客队弹窗点赞
                    $('#JvsR').on('click', function() {
                        subgood($(this))
                        $('#Jpop').hide();
                        $('#JpopBtn').remove();
                        $('#JvsL').off();
                        $('.right-good span').off();
                        $('.left-good span').off();
                    });

                };
            }

        }
    }

    // 错误信息
    if (!getQueryString('match_id')) {
        $('body').html('<div style="text-align: center; padding:30px; color: red">参数错误，match_id不能为空</div>');
    } else{
        app.init();
    };

    

})();