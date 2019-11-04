/**
 *
 * @author 
 *
 */
class Button extends egret.Sprite{
	public constructor(c,a,x,y,w,h,n:string="") {
    	 super();
        this.graphics.beginFill(c,a);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();
        this.x = x;
        this.y = y;
        this.name = n;
	}
	private fun:Function;
	private obj:any;
	public addTapListener(fun:Function,obj:any,once?:boolean):void{
        this.fun=fun;
        this.obj=obj;
	    this.touchEnabled=true;
	    if(once){
            this.once(egret.TouchEvent.TOUCH_TAP,fun,obj);
	    }else{
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,fun,obj);
	    }
	}
	public removeTapListener():void{
	    this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.fun,this.obj);
	}
}
