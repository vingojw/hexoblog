//显示http://segmentfault.com/u/用户名/answers 所有回答过的问题
var url = window.location.href+'?page=';
var maxPage=0;
var pageIndex = 1;
$.get(url+'100',function(res){
    var s = res.match(/<li class="active"><a href="javascript:void\(0\);">(\d+)<\/a>/);
    maxPage = s ? s[1] : 0;
    go(pageIndex);
});
var targ = $('.col-md-8 .text-center');
var reg = /<div class="stream-list board border-top">(?:[\r\n].*)+<\/section>[\r\n].*<\/div>/;
function go(pageIndex){
    if(pageIndex>maxPage){return;}
    console.log(pageIndex);
    $.get(url+(++pageIndex),function(res){
        var str = res.match(reg);
        $(str).insertBefore(targ);
        go(pageIndex);
    });
};