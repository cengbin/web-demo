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
var StarsParticle = (function (_super) {
    __extends(StarsParticle, _super);
    function StarsParticle() {
        var _this = _super.call(this) || this;
        _this.maxNum = 20;
        return _this;
    }
    StarsParticle.prototype.init = function () {
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
__reflect(StarsParticle.prototype, "StarsParticle");
//# sourceMappingURL=StarsParticle.js.map