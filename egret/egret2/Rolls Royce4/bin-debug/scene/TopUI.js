/**
 *
 * @author
 *
 */
var TopUI = (function (_super) {
    __extends(TopUI, _super);
    function TopUI() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    var d = __define,c=TopUI,p=c.prototype;
    p.createView = function (event) {
        var music = Egr.getZBMP("music");
        this.addChild(music);
        music.setTransform(music.width / 2, music.height / 2, 59, 53);
        var tw = egret.Tween.get(music, { loop: true }).to({ rotation: 360 }, 10000);
        var isplay = true;
        var button = new Button(0xff0000, 0.001, 25, 20, 70, 70);
        this.addChild(button);
        //button.cancelable=false;
        button.addTapListener(function () {
            if (isplay) {
                egret.Tween.pauseTweens(music);
                window["bg"].pause();
            }
            else {
                egret.Tween.resumeTweens(music);
                window["bg"].play();
            }
            isplay = !isplay;
        }, button);
        var pw = Main.cb("parsher_white");
        this.addChild(pw);
        pw.anchorOffsetX = pw.width;
        pw.x = this.stage.stageWidth - 36;
        pw.y = 27;
    };
    return TopUI;
}(egret.DisplayObjectContainer));
egret.registerClass(TopUI,'TopUI');
