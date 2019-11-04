/**
 *
 * @author
 *
 */
var UIUseNine = (function (_super) {
    __extends(UIUseNine, _super);
    function UIUseNine() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=UIUseNine,p=c.prototype;
    p.onAddToStage = function () {
        var imgLoader = new egret.ImageLoader();
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/dialog-bg.png");
    };
    p.imgLoadHandler = function (event) {
        var bmd = event.currentTarget.data;
        var bm = new egret.Bitmap(bmd);
        this.addChild(bm);
        bm.anchorOffsetX = bm.width / 2;
        bm.anchorOffsetY = bm.height / 2;
        bm.x = this.stage.stageWidth / 2;
        //设置对象的9切片属性（又称9宫格属性）
        //最小宽度不可以小于左右切片的宽度总和
        //最小高度不可以小于上下切片的高度总和
        bm.scale9Grid = new egret.Rectangle(50, 50, 300, 300);
        console.log(bm.width, bm.height);
        egret.Tween.get(bm, { loop: true, onChange: function () {
                bm.anchorOffsetX = bm.width / 2;
                bm.anchorOffsetY = bm.height / 2;
            }
        }).to({ width: L.W_UI_MIN, height: L.H_UI_MIN }, 2000)
            .to({ width: L.W_UI_MAX, height: L.H_UI_MAX }, 2000);
    };
    return UIUseNine;
}(egret.DisplayObjectContainer));
egret.registerClass(UIUseNine,'UIUseNine');
var L = (function () {
    function L() {
    }
    var d = __define,c=L,p=c.prototype;
    L.W_UI_MAX = 400;
    L.H_UI_MAX = 400;
    L.W_UI_MIN = 100;
    L.H_UI_MIN = 100;
    return L;
}());
egret.registerClass(L,'L');
