var Carousel={
    init: function($stage,imgUrls){
        this.$stage=$stage;
        this.$container=$stage.find('#container');
        this.count=imgUrls.length;
        this.curIndex=0;
    },
    // 初始渲染
    render: function(){
        this.$container.css({'transform-style':'preserve-3d'});
        

    },
    // 旋转到第几张图片
    rotate: function(index){

    }
};