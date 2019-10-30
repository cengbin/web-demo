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
var Scene2 = (function (_super) {
    __extends(Scene2, _super);
    function Scene2() {
        return _super.call(this) || this;
    }
    Scene2.prototype.onAddToStage = function (event) {
        this._pic1 = Main.createBitmapByName("pic5_png");
        this._pic1.anchorOffsetX = this._pic1.width / 2;
        this._pic1.anchorOffsetY = this._pic1.height / 2;
        this._pic1.x = this.stage.stageWidth / 2;
        this._pic1.y = this.stage.height / 2;
        this._btn1 = Main.createBitmapByName("btn2_jpg");
        this._btn1.anchorOffsetX = this._btn1.width / 2;
        this._btn1.x = this.stage.stageWidth / 2;
        this._btn1.y = this.stage.stageHeight / 2 + 200;
    };
    Scene2.prototype.sceneIn = function () {
        if (!this.contains(this._pic1))
            this.addChild(this._pic1);
        this._pic1.alpha = 0;
        this._pic1.scaleX = this._pic1.scaleY = 0.5;
        egret.Tween.get(this._pic1).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut);
        if (!this.contains(this._btn1))
            this.addChild(this._btn1);
        this._btn1.alpha = 0;
        this._btn1.scaleX = this._btn1.scaleY = 0;
        egret.Tween.get(this._btn1).wait(200).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut).call(function () {
            this.sceneInComplete();
            this.addListener();
        }, this);
    };
    Scene2.prototype.sceneOut = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 300).call(function () {
            this.sceneOutComplete();
        }, this);
    };
    Scene2.prototype.addListener = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.sceneOut();
        }, this);
    };
    return Scene2;
}(Scene));
__reflect(Scene2.prototype, "Scene2");
