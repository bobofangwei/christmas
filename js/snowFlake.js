var snowFlake = (function() {
    const MaxX = config.width;
    const MaxY = config.height;
    const MaxRadius = 6;
    const MinRadius = 3;
    const MinMoveX = 5;
    const MaxMoveX = 15;
    const MinSpeedY = 0.05;
    const MaxSpeedY = 1;
    const SpeedX = 0.05;
    const MinAlpha = 0.3;
    const MaxAlpha = 1;
    const SnowNum = 30;

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
            this.speedX = SpeedX;
            this.ctx = ctx;
            this.alpha = randomInRange(MinAlpha, MaxAlpha);
        },
        // 渲染
        render: function() {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255,' + this.alpha + ')';
            this.ctx.closePath();
            this.ctx.fill();
        },
        // 数据更新
        update: function() {
            this.y += this.speedY; // 匀速下落，考虑如何实现加速下落
            if (this.y > config.height) {
                this.y = 0;
            }
            this.angle = this.angle + this.speedX;
            if (this.angle > Math.PI * 2) {
                this.angel -= Math.PI * 2;
            }
            this.x = this.initX + this.moveX * Math.sin(this.angle);
        },
        updateAndRender: function() {
            this.update();
            this.render();
        }

    };
    var snowFlake = {
        init: function(canvasId) {
            var canvas = document.getElementById(canvasId);
            canvas.width = config.width;
            canvas.height = config.height;
            this.ctx = canvas.getContext('2d');
            this.snows = [];
            this.initSnows();
        },
        initSnows: function() {
            for (var i = 0; i < SnowNum; i++) {
                var snow = Object.create(Snow);
                snow.init(this.ctx);
                this.snows.push(snow);
            }
        },
        render: function() {
            this.ctx.clearRect(0, 0, config.width, config.height);
            for (var i = 0; i < SnowNum; i++) {
                this.snows[i].updateAndRender();
            }
            requestAnimationFrame(this.render.bind(this));
        },
    };
    return snowFlake;
})();