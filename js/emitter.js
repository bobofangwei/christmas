var Emitter = {
    init: function(ctx) {
        this.ctx = ctx || this;
        this.cache = {};
    },
    subscribe: function(type, fn) {
        this.cache[type] = this.cache[type] || [];
        this.cache[type].push(fn);
    },
    trigger: function(type) {
        var fns = this.cache[type] || [];
        for (var i = 0, len = fns.length; i < len; i++) {
            fns[i].apply(this.ctx, [].slice.call(arguments));
        }
    },
    // 仅触发一次
    one: function(type, fn) {
        var newFn = function() {
            this.unSubscribe(type, newFn);
            fn.apply(this.ctx, [].slice.call(arguments));
        }
        this.subscribe(type, newFn);
    },
    unSubscribe: function(type, fn) {
        if (!this.cache[type] || !this.cache[type].length) {
            return;
        }
        if (!fn) {
            this.cache[type] = [];
            return;
        }
        for (var i = 0, len = this.cache[type].length; i < len; i++) {
            if (this.cache[type][i] === fn) {
                this.cache[type].splice(i, 1);
            }
        }

    }

};