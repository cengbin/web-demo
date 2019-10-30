/**
 *
 * @author
 *
 */
var StarsParticle = (function (_super) {
    __extends(StarsParticle, _super);
    function StarsParticle() {
        _super.call(this);
        this.maxNum = 20;
    }
    var d = __define,c=StarsParticle,p=c.prototype;
    p.init = function () {
        for (var i = 0; i < this.maxNum; i++) {
            var star = Egr.getZBMP("s2_stars" + Math.floor(Math.random() * 2 + 1));
            this.addChild(star);
            star.alpha = Math.random() * 0.5 + 0.5;
            var s = Math.random() * 0.5 + 0.1;
            star.scaleX = star.scaleY = s;
            star.setTransform(star.width / 2, star.height / 2, Math.random() * this.stage.stageWidth, Math.random() * this.stage.stageHeight);
            egret.Tween.get(star, { loop: true })
                .to({ scaleX: s + 0.4, scaleY: s + 0.4 }, Math.random() * 1200 + 1200)
                .to({ scaleX: s, scaleY: s }, Math.random() * 1200 + 1200);
        }
    };
    return StarsParticle;
}(egret.DisplayObjectContainer));
egret.registerClass(StarsParticle,'StarsParticle');
