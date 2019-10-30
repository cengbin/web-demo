/**
 *
 * @author
 *
 */
var Hint = (function (_super) {
    __extends(Hint, _super);
    function Hint() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Hint,p=c.prototype;
    p.onAddToStage = function (event) {
        var circle = new egret.Shape();
        circle.graphics.beginFill(0xffffff);
        circle.graphics.drawCircle(0, 0, 30);
        circle.graphics.endFill();
        this.addChild(circle);
        circle.alpha = 0;
        circle.scaleX = circle.scaleY = 0.5;
        circle.x = 20;
        egret.Tween.get(circle, { loop: true }).wait(1000).to({ alpha: 0.5, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
            .wait(1000).to({ alpha: 0 }, 500).wait(100);
        var bm = new egret.Bitmap(RES.getRes("page_1_hand_png"));
        this.addChild(bm);
        bm.alpha = 0;
        bm.scaleX = bm.scaleY = 1.2;
        egret.Tween.get(bm, { loop: true }).wait(1100).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
            .wait(1000).to({ alpha: 0 }, 500);
    };
    return Hint;
}(egret.DisplayObjectContainer));
egret.registerClass(Hint,'Hint');
