// 一些常见的工具函数
$.fn.center=function(){
    $this=$(this);
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var selfWidth = $this.width();
    var selfHeight = $this.height();
    var scrollTop = $(window).scrollTop();
    $this.css({
        left: screenWidth / 2 - selfWidth / 2,
        top: screenHeight / 2 - selfHeight / 2 + scrollTop
    });
}