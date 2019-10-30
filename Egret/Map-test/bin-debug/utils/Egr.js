var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Egr = (function () {
    function Egr() {
    }
    Egr.getZBMP = function (value) {
        return new ZBitmap(RES.getRes(value));
    };
    Egr.getSHC = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawCircle(0, 0, 100);
        shape.graphics.endFill();
        return shape;
    };
    Egr.getSHRR = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRoundRect(100, 100, 100, 100, 10, 10);
        shape.graphics.endFill();
        return shape;
    };
    Egr.getSHR = function (color, x, y, width, height, alpha) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color, alpha);
        shape.graphics.drawRect(x, y, width, height);
        shape.graphics.endFill();
        return shape;
    };
    return Egr;
}());
__reflect(Egr.prototype, "Egr");
