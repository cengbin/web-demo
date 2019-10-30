/**
 *
 * @author
 *
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(c, a, x, y, w, h, n) {
        if (n === void 0) { n = ""; }
        _super.call(this);
        this.graphics.beginFill(c, a);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
        this.x = x;
        this.y = y;
        this.name = n;
    }
    var d = __define,c=Button,p=c.prototype;
    p.addTapListener = function (fun, obj, once) {
        this.fun = fun;
        this.obj = obj;
        this.touchEnabled = true;
        if (once) {
            this.once(egret.TouchEvent.TOUCH_TAP, fun, obj);
        }
        else {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, obj);
        }
    };
    p.removeTapListener = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun, this.obj);
    };
    return Button;
}(egret.Sprite));
egret.registerClass(Button,'Button');
