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
var Scene1 = (function (_super) {
    __extends(Scene1, _super);
    function Scene1() {
        return _super.call(this) || this;
    }
    Scene1.prototype.onAddToStage = function (event) {
        this._pic1 = Egr.getZBMP("pic1_jpg");
        this._pic1.anchorOffsetX = this._pic1.width / 2;
        this._pic1.x = this.stage.stageWidth / 2;
        this._pic1.y = this.stage.height;
        this._pic2 = Egr.getZBMP("pic2_jpg");
        this._pic2.anchorOffsetX = this._pic2.width / 2;
        this._pic2.x = this.stage.stageWidth / 2;
        this._pic2.y = this.stage.height;
        this._btn1 = Egr.getZBMP("btn1_png");
        this._btn1.anchorOffsetX = this._btn1.width / 2;
        this._btn1.x = this.stage.stageWidth / 2;
        this._btn1.y = this.stage.stageHeight;
    };
    Scene1.prototype.sceneIn = function () {
        if (!this.contains(this._pic1))
            this.addChild(this._pic1);
        this._pic1.alpha = 0;
        egret.Tween.get(this._pic1).to({ alpha: 1, y: this.stage.stageHeight - 350 }, 1000, egret.Ease.elasticOut);
        if (!this.contains(this._pic2))
            this.addChild(this._pic2);
        this._pic2.alpha = 0;
        egret.Tween.get(this._pic2).wait(400).to({ alpha: 1, y: this.stage.stageHeight - 210 }, 1000, egret.Ease.elasticOut);
        if (!this.contains(this._btn1))
            this.addChild(this._btn1);
        this._btn1.alpha = 0;
        egret.Tween.get(this._btn1).wait(800).to({ alpha: 1, y: this.stage.stageHeight - 80 }, 1000, egret.Ease.elasticOut).call(function () {
            this.sceneInComplete();
            this.addListener();
        }, this);
    };
    Scene1.prototype.sceneOut = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 300).call(function () {
            this.sceneOutComplete();
        }, this);
    };
    Scene1.prototype.addListener = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundEngine.getInstance().play("s1_mp3", 0, 1);
            this.sceneOut();
        }, this);
    };
    return Scene1;
}(Scene));
__reflect(Scene1.prototype, "Scene1");
//# sourceMappingURL=Scene1.js.map