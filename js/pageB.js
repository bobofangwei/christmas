$(function() {

    var boy = document.getElementById('pagebBoy');
    var girl = document.getElementById('pagebGirl');
    var cat = document.getElementById('pagebCat');
    $.Velocity.animate(boy, {
        right: '7rem'
    }, {
        duration: '8000'
    }).then(function() {
        $(boy).removeClass('boy-walk').css({
            'backgroundPosition': '28.57% 0'
        });
        return addEffect($(girl), 'girl-standup');
    }).then(function() {
        // 女孩子扔书
        $(girl).removeClass('girl-standup');
        $(cat).addClass('cat-book');
        return addEffect($(girl), 'girl-throwbook');
    }).then(function() {
        $(girl).removeClass('girl-throwbook').addClass('girl-walk');
    }).then(function() {
        return $.Velocity.animate(girl, {
            left: '6.8rem',
            bottom: '2rem'
        }, {
            duration: 5000
        });
    }).then(function() {
        $(girl).removeClass('girl-walk').css({
            'background-position': '50% 0'
        });
    }).then(function(){
        // 男孩拆包裹
        return addEffect($(boy), 'boy-unwrap');
    });

});