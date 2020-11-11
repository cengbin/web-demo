/**
 * Created by zringhost on 15-2-10.
 */
var zmovie;
(function (zmovie) {
    var Util = (function () {
        function Util() {
        }
        var d = __define,c=Util,p=c.prototype;
        Util.clearDisposeDisplay = function (d) {
            try {
                var tmpD;
                for (var i = d.numChildren - 1; i >= 0; i--) {
                    tmpD = d.getChildAt(i);
                    d.removeChild(tmpD);
                }
            }
            catch (err) { }
        };
        Util.getTextureArrByName = function (imgArr, libObj, libName) {
            var ret = [];
            var t = Util.getTextureByName(imgArr, libName);
            if (null == t) {
                var arr = libObj.clipping[libName];
                if (null != arr) {
                    for (var i = arr.length - 1; i >= 0; i--) {
                        t = Util.getTextureByName(imgArr, arr[i].name);
                        if (null != t) {
                            ret.push({ t: t, x: arr[i].x, y: arr[i].y });
                        }
                        else {
                            return ret;
                        }
                    }
                }
                return ret;
            }
            ret.push({ t: t, x: 0, y: 0 });
            return ret;
        };
        Util.getTextureByName = function (imgArr, libName) {
            var t = null;
            try {
                t = RES.getRes(imgArr + "." + libName);
            }
            catch (err) { }
            try {
                if (null == t) {
                    var arr = imgArr;
                    for (var i = arr.length - 1; i >= 0; i--) {
                        var t = RES.getRes(arr[i] + "." + libName);
                        if (null != t) {
                            return t;
                        }
                    }
                }
            }
            catch (err) { }
            return t;
        };
        return Util;
    }());
    zmovie.Util = Util;
    egret.registerClass(Util,'zmovie.Util');
})(zmovie || (zmovie = {}));
