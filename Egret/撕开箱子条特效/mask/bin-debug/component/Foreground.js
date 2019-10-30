/**
 *
 * @author
 *
 */
var Foreground = (function (_super) {
    __extends(Foreground, _super);
    function Foreground() {
        _super.call(this);
        this.bms = [];
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Foreground,p=c.prototype;
    p.onAddToStage = function (event) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.fill = function (name, count, vx) {
        var cbm;
        for (var i = 1; i <= count; i++) {
            var bitmap = new egret.Bitmap(RES.getRes(name + i + "_png"));
            this.addChild(bitmap);
            bitmap["vx"] = vx;
            if (cbm)
                bitmap.x = cbm.x + cbm.width;
            else
                bitmap.x = 0;
            cbm = bitmap;
            this.bms.push(bitmap);
        }
    };
    p.onEnterFrame = function (event) {
        for (var i = 0; i < this.bms.length; i++) {
            this.bms[i].x += this.bms[i]["vx"];
        }
    };
    return Foreground;
}(egret.DisplayObjectContainer));
egret.registerClass(Foreground,'Foreground');
