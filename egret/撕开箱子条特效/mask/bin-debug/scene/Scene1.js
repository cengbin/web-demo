/**
 *
 * @author
 *
 */
var Scene1 = (function (_super) {
    __extends(Scene1, _super);
    function Scene1() {
        _super.call(this);
    }
    var d = __define,c=Scene1,p=c.prototype;
    p.onAddToStage = function (event) {
        var slider = new Slider();
        this.addChild(slider);
        slider.x = 200;
        slider.y = 200;
        slider.init();
        slider.dragDirection = DragDirections.RIGHT_TO_LEFT;
        var hint = new Hint();
        this.addChild(hint);
        hint.x = 450;
        hint.y = 300;
        egret.Tween.get(hint, { loop: true }).wait(1700).to({ x: 200 }, 600, egret.Ease.quadOut).wait(1300);
        var foreground = new Foreground();
        this.addChild(foreground);
        foreground.fill("foreground_6_", 4, -0.5);
        foreground.y = this.stage.stageHeight - foreground.height;
        var foreground = new Foreground();
        this.addChild(foreground);
        foreground.fill("foreground_5_", 4, -1);
        foreground.y = this.stage.stageHeight - foreground.height;
        var foreground = new Foreground();
        this.addChild(foreground);
        foreground.fill("foreground_4_", 1, -1.5);
        foreground.y = this.stage.stageHeight - foreground.height;
        var foreground = new Foreground();
        this.addChild(foreground);
        foreground.fill("foreground_3_", 4, -2);
        foreground.y = this.stage.stageHeight - foreground.height;
        var foreground = new Foreground();
        this.addChild(foreground);
        foreground.fill("foreground_2_", 5, -2.5);
        foreground.y = this.stage.stageHeight - foreground.height;
        foreground = new Foreground();
        this.addChild(foreground);
        foreground.fill("foreground_1_", 4, -3);
        foreground.y = this.stage.stageHeight - foreground.height;
        for (var i = 1; i <= 30; i++) {
            var bm = new egret.Bitmap(RES.getRes("page_3_part" + (window["parseInt"](Math.random() * 9) + 1) + "_png"));
            this.addChild(bm);
            bm.x = 100 + (440 * Math.random());
            bm.y = this.stage.stageHeight - 300 - (100 * Math.random());
            bm.alpha = 0;
            bm.scaleX = bm.scaleY = 0.5;
            var y1 = bm.y - 220 - (110 * Math.random());
            var y2 = y1 - 110 - (60 * Math.random());
            egret.Tween.get(bm, { loop: true }).wait(5000 * Math.random()).to({ alpha: 1, scaleX: 1, scaleY: 1, y: y1 }, 2000).to({ alpha: 0, scaleX: 0.8, scaleY: 0.8, y: y2 }, 1000);
        }
    };
    return Scene1;
}(Scene));
egret.registerClass(Scene1,'Scene1');
