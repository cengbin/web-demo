var com;
(function (com) {
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item() {
            _super.call(this);
            this.vec = [];
            this.op = 0;
            this.pos = 0;
            this.dir = 0;
            this.t = 0;
            this.cid = -1;
            this.spacing = 30;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Item,p=c.prototype;
        p.onAddToStage = function (e) {
            var w = this.stage.stageWidth;
            var h = this.stage.stageHeight;
            var mc = new egret.Sprite();
            for (var i = 0; i < 20; i++) {
                var sp = new egret.Shape();
                sp.name = String(i);
                sp.y = (150 + this.spacing) * i;
                var g = sp.graphics;
                g.beginFill(0xFF0000, 0.5);
                g.drawRect(0, 0, w, 150);
                g.endFill();
                mc.addChild(sp);
                sp.touchEnabled = true;
                this.vec.push(sp);
                sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            }
            var sv = new egret.ScrollView2(mc);
            sv.width = w;
            sv.height = h;
            sv.touchChildren = true;
            this.addChild(sv);
        };
        p.onTouch = function (e) {
            var _this = this;
            var yp = e.stageY;
            var sp = e.currentTarget;
            switch (e.type) {
                case "touchBegin":
                    this.t = egret.getTimer();
                    this.cid = Number(sp.name);
                    this.op = this.pos = yp;
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    sp.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    sp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
                    break;
                case "touchMove":
                    /*
                    if (egret.getTimer() - this.t <= 200) {
                        return;
                    }
                    */
                    var offset = Math.abs(yp - this.op) / 4;
                    if (this.pos > yp) {
                        this.dir = -1;
                    }
                    else {
                        this.dir = 1;
                    }
                    this.pos = yp;
                    var _loop_1 = function(i) {
                        var obj = this_1.vec[i];
                        egret.Tween.removeTweens(obj);
                        if (this_1.dir > 0) {
                            if (i < this_1.cid) {
                                egret.Tween.get(obj).to({ y: (150 + this_1.spacing) * i - offset }, 100).call(function () {
                                    egret.Tween.get(obj).wait(Math.abs(i - _this.cid) * 50).to({ y: (150 + _this.spacing) * i }, 150);
                                }, this_1);
                            }
                            else {
                                egret.Tween.get(obj).to({ y: (150 + this_1.spacing) * i }, 50);
                            }
                        }
                        else {
                            if (i <= this_1.cid) {
                                egret.Tween.get(obj).to({ y: (150 + this_1.spacing) * i }, 50);
                            }
                            else {
                                egret.Tween.get(obj).to({ y: (150 + this_1.spacing) * i + offset }, 100).call(function () {
                                    egret.Tween.get(obj).wait(Math.abs(i - _this.cid) * 50).to({ y: (150 + _this.spacing) * i }, 150);
                                }, this_1);
                            }
                        }
                    };
                    var this_1 = this;
                    for (var i = 0; i < 10; i++) {
                        _loop_1(i);
                    }
                    break;
                case "touchEnd":
                case "touchReleaseOutside":
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    sp.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    sp.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
                    break;
            }
        };
        return Item;
    }(egret.Sprite));
    com.Item = Item;
    egret.registerClass(Item,'com.Item');
})(com || (com = {}));
//# sourceMappingURL=Item.js.map