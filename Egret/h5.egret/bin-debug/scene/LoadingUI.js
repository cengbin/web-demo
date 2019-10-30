var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function (event) {
        var bg = Egr.getZBMP("lbg");
        this.addChild(bg);
        var bm = Egr.getZBMP("parsher");
        var txt = new egret.TextField();
        txt.width = 80;
        txt.height = 40;
        txt.x = -20;
        txt.rotation = 90;
        txt.textAlign = "center";
        txt.text = "0%";
        this.textField = txt;
        var parsher = new egret.Sprite();
        parsher.addChild(bm);
        parsher.addChild(txt);
        this.addChild(parsher);
        parsher.anchorOffsetX = parsher.width / 2;
        parsher.anchorOffsetY = parsher.height / 2;
        parsher.x = this.stage.stageWidth / 2;
        parsher.y = this.stage.stageHeight / 2;
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.textField.text = String(Math.ceil((current / total) * 100)) + "%";
    };
    LoadingUI.prototype.screenOut = function () {
        //console.log("loading screenout");
        egret.Tween.get(this).to({ alpha: 0 }, 500).call(function () {
            if (this.parent)
                this.parent.removeChild(this);
        }, this);
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map