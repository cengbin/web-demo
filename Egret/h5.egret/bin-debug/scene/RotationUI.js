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
var RotationUI = (function (_super) {
    __extends(RotationUI, _super);
    function RotationUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    RotationUI.prototype.onAddToStage = function (event) {
        this.img = Egr.getZBMP("tips1");
    };
    RotationUI.prototype.show = function () {
        this.img.width = this.stage.stageWidth;
        this.img.height = this.stage.stageHeight;
        this.addChild(this.img);
        this.img.alpha = 0;
        egret.Tween.get(this.img).to({ alpha: 1 }, 300);
    };
    RotationUI.prototype.hide = function () {
        if (this.img.parent) {
            egret.Tween.get(this.img).to({ alpha: 0 }, 300).call(function () {
                this.img.parent.removeChild(this.img);
            }, this);
        }
    };
    return RotationUI;
}(egret.DisplayObjectContainer));
__reflect(RotationUI.prototype, "RotationUI");
//# sourceMappingURL=RotationUI.js.map