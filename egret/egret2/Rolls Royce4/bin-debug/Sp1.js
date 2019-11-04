/**
 *
 * @author
 *
 */
var Sp1 = (function (_super) {
    __extends(Sp1, _super);
    function Sp1() {
        _super.call(this);
        this.speed = 2;
    }
    var d = __define,c=Sp1,p=c.prototype;
    p.init = function (_ang) {
        //console.log(RES.getRes("s2_sp2"));
        var bg = Egr.getZBMP("s2_sp2");
        bg["name2"] = "s2_sp2";
        this.addChild(bg);
        bg.setTransform(bg.width / 2, bg.height / 2);
        this.bg = bg;
        //        this.bg.rotation+=-90;
        //console.log(_ang);
        var ang = _ang;
        var radian = ang * Math.PI / 180;
        var r = 301;
        var p1 = new egret.Point(0, 0);
        var p2 = new egret.Point(r, 0);
        var p3 = new egret.Point(r * Math.cos(radian), r * Math.sin(radian));
        var shap = new egret.Shape();
        shap.graphics.beginFill(0xff0000);
        shap.graphics.moveTo(p1.x, p1.y);
        shap.graphics.lineTo(p2.x, p2.y);
        shap.graphics.lineTo(p3.x, p3.y);
        shap.graphics.endFill();
        this.addChild(shap);
        //shap.alpha=0.5;
        bg.mask = shap;
    };
    p.update = function () {
        //        this.bg.x += this.speed;
        //        this.bg.y += this.speed;
        this.bg.rotation += -2;
        if (this.bg.x >= this.bg.width || this.bg.y <= 0) {
            this.speed = -this.speed;
        }
        //console.log(this.bg.anchorOffsetX);
    };
    p.reset = function () {
        var url = "s2_sp" + String(Number(this.bg["name2"].slice(-1)) + 1);
        //console.log(url);
        this.bg.texture = RES.getRes(url);
        this.bg["name2"] = url;
        this.bg.rotation = 0;
    };
    return Sp1;
}(egret.Sprite));
egret.registerClass(Sp1,'Sp1');
