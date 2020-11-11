/**
 *
 * @author
 *
 */
var ZBitmap = (function (_super) {
    __extends(ZBitmap, _super);
    function ZBitmap(value) {
        _super.call(this, value);
    }
    var d = __define,c=ZBitmap,p=c.prototype;
    p.setTransform = function (aox, aoy, x, y) {
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
    };
    return ZBitmap;
}(egret.Bitmap));
egret.registerClass(ZBitmap,'ZBitmap');
