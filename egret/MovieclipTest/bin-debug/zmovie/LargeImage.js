/**
 * Created by ASUS on 15-2-9.
 */
var zmovie;
(function (zmovie) {
    var LargeImage = (function (_super) {
        __extends(LargeImage, _super);
        function LargeImage(imgArr, libObj, libName) {
            _super.call(this);
            this.setObject(imgArr, libObj, libName);
        }
        var d = __define,c=LargeImage,p=c.prototype;
        p.setObject = function (imgArr, libObj, libName) {
            if (this.libObj == libObj && this.libName == libName) {
                return;
            }
            this.libName = libName;
            this.libObj = libObj;
            zmovie.Util.clearDisposeDisplay(this);
            var arr = zmovie.Util.getTextureArrByName(imgArr, libObj, libName);
            var len = arr.length;
            for (var i = len - 1; i >= 0; i--) {
                var o = arr[i];
                var img = new egret.Bitmap();
                img.touchEnabled = false;
                img.texture = o.t;
                img.x = o.x / libObj.scale;
                img.y = o.y / libObj.scale;
                this.addChild(img);
            }
        };
        return LargeImage;
    }(egret.DisplayObjectContainer));
    zmovie.LargeImage = LargeImage;
    egret.registerClass(LargeImage,'zmovie.LargeImage');
})(zmovie || (zmovie = {}));
