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
var TopUI = (function (_super) {
    __extends(TopUI, _super);
    function TopUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    TopUI.prototype.createView = function (event) {
        var music = Egr.getZBMP("music");
        this.addChild(music);
        music.setTransform(music.width / 2, music.height / 2, 59, 53);
        var tw = egret.Tween.get(music, { loop: true }).to({ rotation: 360 }, 10000);
        var isplay = true;
        var button = new Button();
        button.testBtn(0xff0000, 0.001, 25, 20, 70, 70, '音乐开关');
        this.addChild(button);
        //button.cancelable=false;
        button.addTapListener(function () {
            isplay = !isplay;
        }, button);
        var pw = Egr.getZBMP("parsher_white");
        this.addChild(pw);
        pw.anchorOffsetX = pw.width;
        pw.x = this.stage.stageWidth - 36;
        pw.y = 27;
    };
    return TopUI;
}(egret.DisplayObjectContainer));
__reflect(TopUI.prototype, "TopUI");
//# sourceMappingURL=TopUI.js.map