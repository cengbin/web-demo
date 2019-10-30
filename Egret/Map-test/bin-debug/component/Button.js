var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(c, a, x, y, w, h, n) {
        if (n === void 0) { n = ""; }
        var _this = _super.call(this) || this;
        _this.graphics.beginFill(c, a);
        _this.graphics.drawRect(0, 0, w, h);
        _this.graphics.endFill();
        _this.x = x;
        _this.y = y;
        _this.name = n;
        return _this;
    }
    Button.prototype.addTapListener = function (fun, obj, once) {
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
    Button.prototype.removeTapListener = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun, this.obj);
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
