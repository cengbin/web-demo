/**
 *
 * @author 
 *
 */
class RotationUI extends egret.DisplayObjectContainer{
    
    
    private img:egret.Bitmap;
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);       
    }
    private onAddToStage(event:egret.Event):void{
        this.img = Egr.getZBMP("tips1");
    }
	public show(){
        this.img.width = this.stage.stageWidth;
        this.img.height = this.stage.stageHeight;
	    this.addChild(this.img);
	    this.img.alpha=0;
	    egret.Tween.get(this.img).to({alpha:1},300);
	}
	public hide(){
        if(this.img.parent){
            egret.Tween.get(this.img).to({ alpha: 0 },300).call(function(){
                this.img.parent.removeChild(this.img);
            },this);
    	  }
        
	}
}
