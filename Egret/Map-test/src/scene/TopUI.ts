/**
 *
 * @author 
 *
 */
class TopUI extends egret.DisplayObjectContainer{
	public constructor() {
    	  super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
	}
    private createView(event: egret.Event): void {
        
        
    }
}
