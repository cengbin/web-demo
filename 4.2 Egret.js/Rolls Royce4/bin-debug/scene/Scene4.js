/**
 *
 * @author
 *
 */
var Scene4 = (function (_super) {
    __extends(Scene4, _super);
    function Scene4() {
        _super.call(this);
    }
    var d = __define,c=Scene4,p=c.prototype;
    p.onAddToStage = function (event) {
        _super.prototype.onAddToStage.call(this, event);
        this.sceneIn();
    };
    p.sceneIn = function () {
        _super.prototype.sceneIn.call(this);
        _super.prototype.addBG.call(this, "s4_sp1");
        this.bg.alpha = 0;
        egret.Tween.get(this.bg).to({ alpha: 1 }, 800);
        this.initStage1();
    };
    p.initStage1 = function () {
        var t = Egr.getZBMP("s4_sp2");
        this.addChild(t);
        t.x = 243;
        t.y = 241;
        t.alpha = 0;
        t.touchEnabled = true;
        t.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            setTimeout(function () {
                window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxMzIzNzk3MA==&scene=110#wechat_redirect";
            }, 50);
        }, this);
        egret.Tween.get(t).wait(500).to({ alpha: 1 }, 800);
    };
    return Scene4;
}(Scene));
egret.registerClass(Scene4,'Scene4');
