/**
 *
 * @author 
 *
 */
class ControlMC extends egret.DisplayObject{
    
    private _mc:any;
    private _dragHot:any;
    
    private _isDrag: any = null;
    private _direction: string = ""; 
    private _lastX: number = undefined;
    private _mcCurrentFrame: number = undefined;

	public constructor(mc,dragHot) {
        super();
        this._mc=mc;
        this._dragHot=dragHot;
        this._dragHot.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this._dragHot.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this._dragHot.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
	private onTouchBegin(event){
        this._isDrag = true;
        this._lastX = event.localX;
        this._mcCurrentFrame = this._mc.getCurrFrame();
        this._mc.stop();
	}
	private onTouchMove(event){
        //console.log("localX:"+event.localX);
        if(event.localX > this._lastX) {//向右滑动
            this._mcCurrentFrame = (this._mcCurrentFrame++ > this._mc.getTotalFrame()) ? 0 : this._mcCurrentFrame;
            this._direction = "right";
        } else {//向左滑动
            this._mcCurrentFrame = (this._mcCurrentFrame-- < 0) ? this._mc.getTotalFrame() : this._mcCurrentFrame;
            this._direction = "left";
        }
        this._mc.gotoAndStop(this._mcCurrentFrame);
        this._lastX = event.localX;
	}
	private onTouchEnd(event){
        this._isDrag = false;
	}
	
    private onEnterFrame(event){
        if(this._isDrag != null && this._isDrag == false) {
            if(this._direction == "right") {
                this._mc.nextFrame();
            } else {
                this._mc.prevFrame();
            }
        }
    }
}
