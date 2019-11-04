/**
 *
 * @author
 *
 */
var NumberSlow = (function (_super) {
    __extends(NumberSlow, _super);
    function NumberSlow() {
        _super.call(this);
        this.curInd = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=NumberSlow,p=c.prototype;
    p.onAddToStage = function (event) {
        this.slideContainer = new egret.DisplayObjectContainer();
        this.addChild(this.slideContainer);
        var textArr = [];
        for (var j = 0; j < 20; j++) {
            var sp = new egret.Sprite();
            sp.graphics.beginFill(0xff0000, 0.5);
            sp.graphics.drawRect(0, 0, 100, 200);
            sp.graphics.endFill();
            sp.touchEnabled = true;
            this.slideContainer.addChildAt(sp, 0);
            var text = new egret.TextField();
            this.addChild(text);
            text.text = j.toString();
            sp.addChild(text);
            textArr.push(sp);
        }
        this.itemArr = textArr;
        var direction = "up";
        var startTime;
        var startY;
        this.slideContainer.touchEnabled = true;
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event) {
            var o = event.target;
            o["offset"] = { x: o.x - event.stageX, y: o.y - event.stageY };
            startTime = Date.now();
            startY = event.stageY;
            this.curInd = textArr.indexOf(o);
            startObj = o;
        }, this);
        var startObj = null;
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_END, function (event) {
            var o = event.target;
            var distance = event.stageY - startY;
            var time = Date.now() - startTime;
            o["speed"] = distance / time * 15;
            this.currentItem = o;
            //console.log("speed:",this.currentItem["speed"]);
            o["offset"] = null;
            startObj = null;
        }, this);
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (event) {
            var o = event.target;
            //console.log(o["offset"].y);
            if (o == startObj) {
                o.y = event.stageY + o["offset"].y;
                if (event.stageY < startY) {
                    direction = "up";
                }
                else {
                    direction = "down";
                }
            }
            startY = event.stageY;
        }, this);
        this.stage.addEventListener(egret.Event.ENTER_FRAME, function (event) {
            for (var i = this.curInd; i > 0; i--) {
                var target = textArr[i - 1];
                var currentTarget = textArr[i];
                var startY = target.y;
                var endY1 = currentTarget.y - currentTarget.height - 20;
                var slowSpeed = 0.5;
                if (direction == "up") {
                    target.y = endY1;
                }
                else {
                    target.y += (endY1 - startY) * slowSpeed;
                }
            }
            for (var i = this.curInd; i < textArr.length - 1; i++) {
                var sp = textArr[i + 1];
                var startY = sp.y;
                var endY2 = textArr[i].y + textArr[i].height + 20;
                var slowSpeed = 0.5;
                if (direction == "up") {
                    sp.y += (endY2 - startY) * slowSpeed;
                }
                else {
                    sp.y = endY2;
                }
            }
        }, this);
    };
    p.changeCallback = function (event) {
        /*var s = 0.8;//0.8 向上滑动   1 向下滑动
        (this.scrollView.scrollTop > this.lastScrollTop)? s = 0.9 : s=1;
        var index: number = (Math.floor((this.scrollView.scrollTop - 1) / 420) + 1);
        if(this.itemArr[index].scaleX != s) {
            egret.Tween.get(this.itemArr[index]).to({ scaleX: s,scaleY: s },100);
        }
        this.lastScrollTop=this.scrollView.scrollTop;
        return;*/
        /*for(var i = this.curInd;i > 0;i--) {

            var target = this.itemArr[i - 1];
            var currentTarget = this.itemArr[i];

            var startY = currentTarget.y;
            var endY1 = currentTarget.y - currentTarget.height;
            var slowSpeed = 0.5;
            target.y = endY1 - 20;
        }*/
        for (var i = this.curInd; i < this.itemArr.length - 1; i++) {
            var sp = this.itemArr[i + 1];
            var startY = sp.y;
            var endY2 = this.itemArr[i].y + this.itemArr[i].height;
            var slowSpeed = 0.5;
            sp.y += (endY2 - startY) * slowSpeed + 20;
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return NumberSlow;
}(egret.Sprite));
egret.registerClass(NumberSlow,'NumberSlow');
//# sourceMappingURL=NumberSlow.js.map