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
    };
    Scene1.prototype.sceneIn = function () {
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
