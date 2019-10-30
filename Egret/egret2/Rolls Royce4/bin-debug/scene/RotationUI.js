/**
 *
 * @author
 *
 */
var RotationUI = (function (_super) {
    __extends(RotationUI, _super);
    function RotationUI() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=RotationUI,p=c.prototype;
    p.onAddToStage = function (event) {
        this.img = Egr.getZBMP("tips1");
    };
    p.show = function () {
        this.img.width = this.stage.stageWidth;
        this.img.height = this.stage.stageHeight;
        this.addChild(this.img);
        this.img.alpha = 0;
        egret.Tween.get(this.img).to({ alpha: 1 }, 300);
    };
    p.hide = function () {
        if (this.img.parent) {
            egret.Tween.get(this.img).to({ alpha: 0 }, 300).call(function () {
                this.img.parent.removeChild(this.img);
            }, this);
        }
    };
    return RotationUI;
}(egret.DisplayObjectContainer));
egret.registerClass(RotationUI,'RotationUI');
