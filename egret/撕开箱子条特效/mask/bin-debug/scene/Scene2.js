/**
 *
 * @author
 *
 */
var Scene2 = (function (_super) {
    __extends(Scene2, _super);
    function Scene2() {
        _super.call(this);
    }
    var d = __define,c=Scene2,p=c.prototype;
    p.onAddToStage = function (event) {
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
    p.sceneIn = function () {
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
    p.sceneOut = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 300).call(function () {
            this.sceneOutComplete();
        }, this);
    };
    p.addListener = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.sceneOut();
        }, this);
    };
    return Scene2;
}(Scene));
egret.registerClass(Scene2,'Scene2');
