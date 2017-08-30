$(function() {
    // 开窗的动画处理
    function openWindow() {
        var animPromise = function(selector, props, options) {
            options = options || {};
            return new Promise(function(resolve, reject) {
                options.complete = function(elems) {
                    resolve();
                };
                $(selector).velocity(props, options);
            });
        }
        var openLeft = animPromise('.window-left', { 'rotateY': '60deg' }, { 'duration': '2000' });
        var openRight = animPromise('.window-right', { 'rotateY': '-60deg' }, { 'duration': '2000' });
        return Promise.all([openLeft, openRight]);
    }
    // 小男孩儿拉雪橇的动作处理
    $('#boyDeer').velocity({
            'scale': '0.2'
        })
        .velocity({
            'right': '21rem',
            'top': '4rem',
            'scale': '0.9'
        }, {
            'duration': '10000'
        }).velocity({
            'rotateY': '180deg'
        }, {
            'duration': '500'
        }).velocity({
            'right': '1.3rem',
            'top': '9.8rem',
            'scale': '1.2'
        }, {
            'duration': '6600',
            'complete': function(elem) {
                $(elem).removeClass('boy-walk');
                openWindow().then(function() {
                    emitter.trigger('pageAEnd');
                });
            }
        })
});