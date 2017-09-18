$(function() {
    var $windowLeft = $('.page-c .window-left');
    var $windowRight = $('.page-c .window-right');
    var $deer = $('#deer');
    // 关闭窗户
    function closeWindow() {
        var closeLeft = addEffect($windowLeft, 'close');
        var closeRight = addEffect($windowRight, 'close');
        // 阴影出现
        var shadowPromise = animPromise('#shadow', {
            'opacity': 1
        }, {
            delay: 1000,
            duration: 1500
        });
        return Promise.all([closeLeft, closeRight, shadowPromise]);
    }
    // 关闭窗户的同时，出现阴影
    function pageCAnimPlay() {
        return closeWindow().then(function() {
            console.log('window');
        });
    }

    // 雪橇的运动
    function sledAnimPlay() {
        return new Promise(function(resolve, reject) {
            $deer.addClass('deer-walk');
            $deer.velocity({
                right: '-7rem',
                bottom: '5rem',
                scale: 0.8
            }, {
                duration: 4000

            }).velocity({
                'rotateY': '180deg'
            }, {
                duration: 500
            }).velocity({
                right: '100%',
                bottom: '11.5rem',
                scale: 0.2
            }, {
                duration: 10000,
                complete: function() {
                    $deer.removeClass('deer-walk');
                    $deer.remove();
                    resolve();
                    console.log('complete');
                }
            });
        });

    }
    pageCAnimPlay().then(function() {
        // 与此同时，开始飘雪花，使用canvas实现
        sledAnimPlay();
    });
});