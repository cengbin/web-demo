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
var ZBitmap = (function (_super) {
    __extends(ZBitmap, _super);
    function ZBitmap(value) {
        return _super.call(this, value) || this;
    }
    ZBitmap.prototype.setTransform = function (aox, aoy, x, y) {
        this.anchorOffsetX = aox || 0;
        this.anchorOffsetY = aoy || 0;
        this.x = x || 0;
        this.y = y || 0;
        //        this.scaleX = scaleX == null ? 1 : scaleX;
        //        this.scaleY = scaleY == null ? 1 : scaleY;
        //        this.rotation = rotation || 0;
        //        this.skewX = skewX || 0;
        //        this.skewY = skewY || 0;
        //        this.regX = regX || 0;
        //        this.regY = regY || 0;
        return this;
    };
    return ZBitmap;
}(egret.Bitmap));
__reflect(ZBitmap.prototype, "ZBitmap");
//# sourceMappingURL=ZBitmap.js.map