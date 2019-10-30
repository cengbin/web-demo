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
var TextEffect2 = (function (_super) {
    __extends(TextEffect2, _super);
    function TextEffect2(o) {
        var _this = _super.call(this) || this;
        _this.data = o;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    TextEffect2.prototype.onAddToStage = function (event) {
        var texts = this.data.text.split("");
        var font = RES.getRes(this.data.source);
        //console.log(texts);
        var textArr = [];
        var mg_right = 0;
        var last_x = 0;
        var last_y = 0;
        var show = this.data.showTime || 1500;
        var br = this.data.br;
        for (var i = 0; i < texts.length; i++) {
            var bo = false;
            if (br) {
                for (var j = 0; j < br.length; j++) {
                    if (i == br[j][0]) {
                        bo = true;
                        mg_right = br[j][1];
                        last_x = textArr[i - 1].x - textArr[i - 1].width - 7;
                        last_y = textArr[i - 1].height;
                    }
                }
            }
            var t = new egret.BitmapText();
            t.font = font;
            this.addChild(t);
            t.text = texts[i];
            t.rotation = 90;
            t.anchorOffsetX = t.width / 2;
            t.anchorOffsetY = t.height / 2;
            t.alpha = 0;
            if (i != 0) {
                if (bo) {
                    t.x = textArr[i - 1].x - textArr[i - 1].height - 6 - last_x - mg_right;
                    t.y = textArr[i - 1].y - last_y - 15;
                }
                else {
                    t.x = textArr[i - 1].x - textArr[i - 1].height - 6;
                    t.y = textArr[i - 1].y;
                }
            }
            var rd1 = Math.random() * 1500;
            var rd2 = Math.random() * 500 + 1500;
            egret.Tween.get(t).wait(rd1)
                .to({ alpha: 1 }, rd2);
            egret.Tween.get(this).wait(show + 3500).to({ alpha: 0 }, rd2);
            textArr.push(t);
        }
    };
    return TextEffect2;
}(egret.Sprite));
__reflect(TextEffect2.prototype, "TextEffect2");
//# sourceMappingURL=TextEffect2.js.map