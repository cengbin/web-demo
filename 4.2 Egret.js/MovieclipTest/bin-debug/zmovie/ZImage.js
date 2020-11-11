/**
 * Created by ASUS on 15-2-9.
 */
var zmovie;
(function (zmovie) {
    var ZImage = (function (_super) {
        __extends(ZImage, _super);
        function ZImage(t) {
            _super.call(this);
            this.img = new egret.Bitmap();
            this.addChild(this.img);
            this.setTexture(t);
        }
        var d = __define,c=ZImage,p=c.prototype;
        p.setTexture = function (t) {
            this.img.texture = t;
        };
        p.setScale = function (s) {
            this.img.scaleX = 1 / s;
            this.img.scaleY = 1 / s;
        };
        return ZImage;
    }(egret.DisplayObjectContainer));
    zmovie.ZImage = ZImage;
    egret.registerClass(ZImage,'zmovie.ZImage');
})(zmovie || (zmovie = {}));
