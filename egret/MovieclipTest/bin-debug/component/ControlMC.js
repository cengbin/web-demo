/**
 *
 * @author
 *
 */
var ControlMC = (function (_super) {
    __extends(ControlMC, _super);
    function ControlMC(mc, dragHot) {
        _super.call(this);
        this._isDrag = null;
        this._direction = "";
        this._lastX = undefined;
        this._mcCurrentFrame = undefined;
        this._mc = mc;
        this._dragHot = dragHot;
        this._dragHot.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._dragHot.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._dragHot.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    var d = __define,c=ControlMC,p=c.prototype;
    p.onTouchBegin = function (event) {
        this._isDrag = true;
        this._lastX = event.localX;
        this._mcCurrentFrame = this._mc.getCurrFrame();
        this._mc.stop();
    };
    p.onTouchMove = function (event) {
        //console.log("localX:"+event.localX);
        if (event.localX > this._lastX) {
            this._mcCurrentFrame = (this._mcCurrentFrame++ > this._mc.getTotalFrame()) ? 0 : this._mcCurrentFrame;
            this._direction = "right";
        }
        else {
            this._mcCurrentFrame = (this._mcCurrentFrame-- < 0) ? this._mc.getTotalFrame() : this._mcCurrentFrame;
            this._direction = "left";
        }
        this._mc.gotoAndStop(this._mcCurrentFrame);
        this._lastX = event.localX;
    };
    p.onTouchEnd = function (event) {
        this._isDrag = false;
    };
    p.onEnterFrame = function (event) {
        if (this._isDrag != null && this._isDrag == false) {
            if (this._direction == "right") {
                this._mc.nextFrame();
            }
            else {
                this._mc.prevFrame();
            }
        }
    };
    return ControlMC;
}(egret.DisplayObject));
egret.registerClass(ControlMC,'ControlMC');
