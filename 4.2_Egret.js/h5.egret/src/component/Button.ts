/**
 *
 * @author 
 *
 */
class Button extends egret.Sprite{
	public constructor() {
    	 super();
        
	}
    public testBtn(c,a,x,y,w,h,text: string = ""){
        this.graphics.beginFill(c,a);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();
        this.x = x;
        this.y = y;
        
        var txt=new egret.TextField();
        this.addChild(txt);
        txt.text = text;
        txt.textAlign='center';
        txt.width=w;
        //console.log(h,txt.height);
        txt.y=(h-txt.height)/2;
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
