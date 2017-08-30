 var $window = $(window);
 var $container = $('#container');
 var $docElem = $(document.documentElement);
 $pageA = $('#pageA');
 $pageB = $('#pageB');
 $pageC = $('#pageC');

 // 每次resize事件，都需要重新调整图片容器的长宽比，并再次居中
 var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
 var resizeHandler = function() {
     var ratio = 901 / 1441;
     var containerWidth = $container.width();
     $container.height(containerWidth * ratio);
     $container.center();
     // 采用rem布局，设置根元素的字体大小
     // docElem.style.fontSize = 12 * ($docElem.width() / 320) + 'px';
     $docElem.css({ fontSize: 12 * ($docElem.width() / 320) });
 }
 // 页面初次加载时执行一次
 resizeHandler();
 $window.on(resizeEvt, resizeHandler);

 // 播放背景音乐
 function audio(url, loop) {
     var audio = new Audio(url);
     audio.autoplay = true;
     audio.loop = loop;
     audio.play();
     return {
         end: function(callback) {
             audio.on('ended', function() {
                 callback();
             });
         }
     };
 }
 // audio('./music/scene.mp3', false);

 // //执行页面切换
 // //添加一些动画相关类，并在动画执行完毕时，执行对应的回调
 var addEffect = function($elem, effect) {
     return new Promise(function(resolve, reject) {
         $elem.addClass(effect).one('animationend webkitAnimationEnd', function() {
             resolve();
         });
     });

 };
 // var emitter = Object.create(Emitter);
 // emitter.init();
 // emitter.subscribe('pageAEnd', function() {
 //     //开启切换动画
 //     console.log('pageAEnd');
 //     addEffect($pageA, 'effect-out');
 // });
 // emitter.subscribe('pageBEnd', function() {

 // });