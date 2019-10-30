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
var Scene3 = (function (_super) {
    __extends(Scene3, _super);
    function Scene3() {
        return _super.call(this) || this;
    }
    Scene3.prototype.onAddToStage = function (event) {
        this._stage1Container = new egret.DisplayObjectContainer();
        this._stage1Container.x = this.stage.stageWidth / 2;
        this._stage1Container.y = this.stage.stageHeight / 2;
        this._pic7 = Main.createBitmapByName("pic7_png");
        this._pic7.anchorOffsetX = this._pic7.width / 2;
        this._pic7.anchorOffsetY = this._pic7.height / 2;
        this._stage1Container.addChild(this._pic7);
        this._pic8 = Main.createBitmapByName("pic8_png");
        this._pic8.setTransform(this._pic8.width / 2, this._pic8.height / 2, -134, -58);
        this._stage1Container.addChild(this._pic8);
        this._pic9 = Main.createBitmapByName("pic9_png");
        this._pic9.setTransform(this._pic9.width / 2, this._pic9.height / 2, -54, -128);
        this._stage1Container.addChild(this._pic9);
        this._pic10 = Main.createBitmapByName("pic10_png");
        this._pic10.setTransform(this._pic10.width / 2, this._pic10.height / 2, 61, -128);
        this._stage1Container.addChild(this._pic10);
        this._pic11 = Main.createBitmapByName("pic11_png");
        this._pic11.setTransform(this._pic11.width / 2, this._pic11.height / 2, 134, -58);
        this._stage1Container.addChild(this._pic11);
    };
    Scene3.prototype.sceneIn = function () {
        if (!this.contains(this._stage1Container))
            this.addChild(this._stage1Container);
        this._pic7.alpha = 0;
        this._pic7.scaleX = this._pic7.scaleY = 0;
        egret.Tween.get(this._pic7).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut);
        this._pic8.alpha = 0;
        this._pic8.scaleX = this._pic8.scaleY = 0;
        egret.Tween.get(this._pic8).wait(200).call(function () {
            SoundEngine.getInstance().play("s2_mp3", 0, 1);
        }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut);
        this._pic9.alpha = 0;
        this._pic9.scaleX = this._pic9.scaleY = 0;
        egret.Tween.get(this._pic9).wait(400).call(function () {
            SoundEngine.getInstance().play("s2_mp3", 0, 1);
        }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut);
        this._pic10.alpha = 0;
        this._pic10.scaleX = this._pic10.scaleY = 0;
        egret.Tween.get(this._pic10).wait(600).call(function () {
            SoundEngine.getInstance().play("s2_mp3", 0, 1);
        }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut);
        this._pic11.alpha = 0;
        this._pic11.scaleX = this._pic11.scaleY = 0;
        egret.Tween.get(this._pic11).wait(800).call(function () {
            SoundEngine.getInstance().play("s2_mp3", 0, 1);
        }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut);
    };
    Scene3.prototype.sceneOut = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 300).call(function () {
            console.log(this.name);
            this.sceneOutComplete();
        }, this);
    };
    Scene3.prototype.addListener = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.sceneOut();
        }, this);
    };
    return Scene3;
}(Scene));
__reflect(Scene3.prototype, "Scene3");
