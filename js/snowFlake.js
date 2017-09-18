$(function() {
    const MaxX = config.width;
    const MaxY = config.height;
    const MaxRadius = 20;
    const MinRadius = 5;
    const MinMoveX = 40;
    const MaxMoveX = 60;
    const MinSpeedY = 10;
    const MaxSpeedY = 20;
    const SpeedX = 0.05;
    const MinAlpha = 0.3;
    const MaxAlpha = 1;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    // 单个雪花
    var Snow = {
        init: function(ctx) {
            this.initX = Math.random() * MaxX;
            this.y = 0;
            this.radius = randomInRange(MinRadius, MaxRadius);
            this.speedY = randomInRange(MinSpeedY, MaxSpeedY);
            this.moveX = randomInRange(MinMoveX, MaxMoveX);
            this.angle = Math.random(Math.PI * 2);
            this.speedX = speedX;
            this.ctx = ctx;
            this.alpha = randomInRange(MinAlpha, MaxAlpha);
        };
        // 渲染
        render: function() {
            
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        },
        // 数据更新
        update: function() {
            this.y += this.speedY;
            this.angle = this.angle + this.speedX;
            if (this.angle > Math.PI * 2) {
                this.angel -= Math.PI * 2;
            }
            this.x = this.initX + this.moveX * Math.sin(this.angle);
        }
    }
    var snowFlake = {
        init: function() {
            var canvas = document.getElementById('canvas');
            canvas.width = config.width;
            canvas.height = config.height;
            this.ctx = canvas.getContext('2d');
        },
        initSnows: function() {},
        _drawSingleSnow: function(x, y, radius, opacity) {
            this.ctx.beginPath();

            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.closePath();
        }

    };
});