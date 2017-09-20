var pageBAnimPlay = (function() {

    var $boy = $('#pagebBoy');
    var $girl = $('#pagebGirl');
    var $cat = $('#pagebCat');
    var $boyHead = $('#boyHead');
    $boyHead.hide();
    var carousel = Object.create(Carousel);
    var carouselImgUrls = ['./images/carousel/1.png', './images/carousel/2.png', './images/carousel/3.png'];
    var carouselVideoUrls = ['./images/carousel/1.mp4', './images/carousel/2.mp4', './images/carousel/3.mp4'];
    carousel.init($('#carousel'), carouselImgUrls, carouselVideoUrls);
    carousel.hide();

    var boy = {
        // 男孩从右向左走
        walk: function() {
            resetClass($boy);
            $boy.addClass('boy-walk');
            return $.Velocity.animate($boy, {
                right: '7rem'
            }, {
                duration: '7000'
            }).then(function() {
                $boy.removeClass('boy-walk').css({
                    'backgroundPosition': '28.57% 0'
                });
            });
        },
        // 男孩儿解下包裹
        unwrap: function() {
            return addEffect($boy, 'boy-unwrap');
        },
        // 男孩儿脱衣服
        undress1: function() {
            return addEffect($boy, 'boy-undress1');
        },
        undress2: function() {
            return addEffect($boy, 'boy-undress2');
        },
        undress3: function() {
            return addEffect($boy, 'boy-undress3');
        },
        // 测试使用
        changePosition: function() {
            $boy.addClass('endPosition').removeClass('boy-walk');
            return this;
        },
        hug: function() {
            return addEffect($boy, 'boy-hug').then(function() {
                $boyHead.show();
                $boy.css({ right: '7.5rem' });
            });
        }

    };
    var girl = {
        standup: function() {
            return addEffect($girl, 'girl-standup');
        },
        throwbook: function() {
            return addEffect($girl, 'girl-throwbook');
        },
        walk: function() {
            resetClass($girl);
            $girl.addClass('girl-walk');
            return $.Velocity.animate($girl, {
                left: '6.2rem',
                bottom: '2.2rem'
            }, {
                duration: 5000
            }).then(function() {
                resetClass($girl);
                $girl.css({
                    'background-position': '50% 0'
                });
            });
        },
        // 女孩儿举手，选择视频
        choose: function() {
            return addEffect($girl, 'girl-handup');
        },
        // 女孩儿将手放下
        handDown: function() {
            return addEffect($girl, 'girl-handdown');
        },
        goHug: function() {
            resetClass($girl);
            $girl.addClass('girl-gohug');
            return $.Velocity.animate($girl, {
                left: '10.3rem',
                bottom: '2.2rem'
            }, {
                duration: '3000'
            }).then(function() {
                $girl.removeClass('girl-gohug').css({
                    'backgroundPosition': '85% 0'
                });
            });
        },
        hug: function() {
            return addEffect($girl, 'girl-hug');
        },
        changePosition: function() {
            $girl.css({ left: '6.2rem', 'bottom': '2.2rem', 'background-position': '20% 0' });
        }
    };
    var cat = {
        hasBook: function() {
            return addEffect($cat, 'cat-book');
        }
    };

    function pageBAnimPlay() {
        return boy.walk().then(function() {
            return girl.standup();
        }).then(function() {
            cat.hasBook();
            return girl.throwbook();
        }).then(function() {
            return girl.walk();
        }).then(function() {
            return boy.unwrap();
        }).then(function() {
            return carousel.show();
        }).then(function() {
            return girl.choose();
        }).then(function() {
            return delay(500);
        }).then(function() {
            return carousel.rotateAndScale(0);
        }).then(function() {
            // 播放视频的同时，需要完成女孩儿将手放下，男孩儿换装等动作
            return Promise.all([girl.handDown(), carousel.playVideo(), carousel.scaleTo(1, 200), boy.undress1()]);
        }).then(function() {
            return girl.choose();
        }).then(function() {
            return delay(500);
        }).then(function() {
            return carousel.rotateAndScale(1);
        }).then(function() {
            return Promise.all([girl.handDown(), carousel.playVideo(), carousel.scaleTo(1, 200), boy.undress2()]);
        }).then(function() {
            return girl.choose();
        }).then(function() {
            return delay(500);
        }).then(function() {
            return carousel.rotateAndScale(2);
        }).then(function() {
            return Promise.all([girl.handDown(), carousel.playVideo(), carousel.scaleTo(1, 200), boy.undress3()]);
        }).then(function() {
            return carousel.hide();
        }).then(function() {
            return girl.goHug();
        }).then(function() {
            return Promise.all([girl.hug(), boy.hug()]);
        }).then(function() {
            // 场景B结束
            emitter.trigger('pageBEnd');
        });
    }
    return pageBAnimPlay;
})();