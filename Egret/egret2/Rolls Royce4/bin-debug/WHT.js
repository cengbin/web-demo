/**
 *
 * @author
 *
 */
var WHT = (function (_super) {
    __extends(WHT, _super);
    function WHT() {
        _super.call(this);
        this.triangleArr = [];
        this.page = 6;
        this.pingJunAng = 360 / this.page;
        this.upContainer = new egret.DisplayObjectContainer;
        this.downContainer = new egret.DisplayObjectContainer;
        this.endCount = 1;
    }
    var d = __define,c=WHT,p=c.prototype;
    p.onAddToStage = function (event) {
        _super.prototype.onAddToStage.call(this, event);
        this.addChild(this.downContainer);
        this.addChild(this.upContainer);
        for (var i = 0; i < this.page; i++) {
            var sp1 = new Sp1();
            this.downContainer.addChild(sp1);
            sp1.init(this.pingJunAng);
            var ang = i * this.pingJunAng;
            if (i % 2 == 0) {
                sp1.rotation = ang;
                var line = Egr.getZBMP("s2_sp6");
                //console.count("test");
                line.setTransform(line.width / 2, line.height / 2, this._sw / 2, this._sh / 2);
                this.upContainer.addChild(line);
                line.rotation = ang;
            }
            else {
                sp1.scaleX = -1;
                sp1.rotation = ang + 180 + ang;
            }
            sp1.x = this._sw / 2;
            sp1.y = this._sh / 2;
            this.triangleArr.push(sp1);
        }
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (event) {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.play();
    };
    p.play = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
        if (this.endCount == 1) {
            window["_hmt"].push(['_trackEvent', 'button', 'wht1']);
        }
        else if (this.endCount == 2) {
            window["_hmt"].push(['_trackEvent', 'button', 'wht2']);
        }
        else if (this.endCount == 3) {
            window["_hmt"].push(['_trackEvent', 'button', 'wht3']);
        }
        else if (this.endCount == 4) {
            window["_hmt"].push(['_trackEvent', 'button', 'wht4']);
        }
        if (this.endCount != 1) {
            for (var i = 0; i < this.triangleArr.length; i++) {
                var sp1 = this.triangleArr[i];
                sp1.reset();
            }
        }
    };
    p.onTouchEnd = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.stop();
    };
    p.stop = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
        if (this.endCount++ >= 4 && this.parent) {
            this.dispose();
            var scene2 = this.parent;
            scene2.sceneOut();
        }
    };
    p.enterframe = function (event) {
        for (var i = 0; i < this.triangleArr.length; i++) {
            var sp1 = this.triangleArr[i];
            sp1.update();
        }
    };
    p.dispose = function () {
        this.touchEnabled = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    return WHT;
}(Scene));
egret.registerClass(WHT,'WHT');
