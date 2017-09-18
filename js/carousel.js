// 字符串的模板替换
function replace(template, data) {
    return template.replace(/\{(\d+)\}/g, function(all, index) {
        return data[index];
    });
}
var Carousel = {
    init: function($stage, imgUrls, videoUrls) {
        this.$stage = $stage;
        this.$container = $stage.find('#stage-container');
        this.count = imgUrls.length;
        this.curIndex = 0;
        this.imgUrls = imgUrls;
        this.videoUrls = videoUrls;
        this.render();
    },
    hide: function() {
        return $.Velocity(this.$stage, { opacity: 0 }, { display: 'none' })
    },
    show: function() {
        return $.Velocity(this.$stage, { opacity: 1 }, { display: 'block', delay: 500 });
    },
    // 初始渲染
    render: function() {
        this.$stage.css({ 'perspective': '1000px' });
        this.$container.css({ 'transform-style': 'preserve-3d', 'backface-visiblity': 'hidden', 'width': '100%', 'height': '100%' });
        var str = '';
        for (var i = 0; i < this.count; i++) {
            str += replace('<img class="carousel-item" src="{' + i + '}">', this.imgUrls);
        }
        this.$imgs = $(str);
        var width = this.$stage.width();
        var rotateYDeg = 360 / this.count;
        var translateZDis = width / 2 * Math.tan(Math.PI * (this.count - 2) / this.count / 2) + 5;
        this.$imgs.each(function(index, elem) {
            $(elem).css({ 'position': 'absolute', 'height': '100%', 'width': '100%', 'transform': 'rotateY(-' + index * rotateYDeg + 'deg) translateZ(' + translateZDis + 'px) scale(.85)' });

        });
        this.$container.append(this.$imgs);

    },
    // 旋转到第几张图片
    rotateTo: function(index) {
        var tmp = index * 360 / this.count + 360;
        this.curIndex = index;
        return $.Velocity.animate(this.$container, { rotateY: tmp + 'deg' }, { duration: 1000 });
    },
    // 放大
    scaleTo: function(beishu,duration) {
        return $.Velocity.animate(this.$stage, { scale: beishu }, { duration: duration });
    },
    // 视频播放
    playVideo: function() {
        var self = this;
        return new Promise(function(resolve, reject) {
            var videoStr = '<video height="50%" src="' + self.videoUrls[self.curIndex] + '" width="50%" class="animated  bounceIn" style="position: absolute; top: 30%; left: 25%;" preload="auto"></video>';
            $video = $(videoStr);
            self.$stage.after($video);
            $video[0].play();
            $video.on('ended', function(elem) {
                // 退出效果
                $video.removeClass('bounceIn');
                addEffect($video, 'bounceOut').then(function() {
                    $video.remove();
                    resolve();
                });
            });
        });
    },
    // 对外的接口，先旋转，再放大，然后播放
    rotateAndScale: function(index) {
        var self = this;
        return this.rotateTo(index).then(function() {
            return self.scaleTo(1.5, 2000);
        });
    },
};