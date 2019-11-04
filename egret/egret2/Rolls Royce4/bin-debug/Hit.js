/**
 *
 * @author
 *
 */
var Hit = (function (_super) {
    __extends(Hit, _super);
    function Hit() {
        _super.call(this);
        var c1 = new egret.Shape();
        c1.graphics.beginFill(0xffffff);
        c1.graphics.drawCircle(0, 0, 25);
        c1.graphics.endFill();
        this.addChild(c1);
        c1.alpha = 0;
        egret.Tween.get(c1, { loop: true }).to({ alpha: 1 }, 1200).wait(2800).to({ alpha: 0 }, 500).wait(500);
        var c2 = new egret.Shape();
        c2.graphics.beginFill(0xffffff);
        c2.graphics.drawCircle(0, 0, 35);
        c2.graphics.endFill();
        this.addChild(c2);
        c2.alpha = 0;
        egret.Tween.get(c2, { loop: true }).wait(400).to({ alpha: 0.7 }, 1000).wait(2200).to({ alpha: 0 }, 500).wait(900);
        var c3 = new egret.Shape();
        c3.graphics.beginFill(0xffffff);
        c3.graphics.drawCircle(0, 0, 45);
        c3.graphics.endFill();
        this.addChild(c3);
        c3.alpha = 0;
        egret.Tween.get(c3, { loop: true }).wait(800).to({ alpha: 0.4 }, 800).wait(1800).to({ alpha: 0 }, 500).wait(1100);
        var t = Main.cb("s2_txt1");
        this.addChild(t);
        t.y = 60;
        t.x = -15;
        t.alpha = 0;
        egret.Tween.get(t).wait(300).to({ alpha: 1 }, 500);
    }
    var d = __define,c=Hit,p=c.prototype;
    return Hit;
}(egret.Sprite));
egret.registerClass(Hit,'Hit');
