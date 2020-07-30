/**
 *
 * @author 
 *
 */
class Scene2 extends Scene{
    
    
    private _pic1:egret.Bitmap;
    
    private _btn1:egret.Bitmap;
    
	public constructor() {
        super();
	}
    public onAddToStage(event:egret.Event):void{
        
        this._pic1 = Egr.getZBMP("pic5_png");
        this._pic1.anchorOffsetX=this._pic1.width/2;
        this._pic1.anchorOffsetY=this._pic1.height/2;
        this._pic1.x=this.stage.stageWidth/2;
        this._pic1.y=this.stage.height/2;
        
        this._btn1=Egr.getZBMP("btn2_jpg");
        this._btn1.anchorOffsetX=this._btn1.width/2;
        this._btn1.x=this.stage.stageWidth/2;
        this._btn1.y=this.stage.stageHeight/2+200;
    }
    public sceneIn(){
        
        if(!this.contains(this._pic1))this.addChild(this._pic1);
        this._pic1.alpha=0;
        this._pic1.scaleX=this._pic1.scaleY=0.5;
        egret.Tween.get(this._pic1).to({alpha:1,scaleX:1,scaleY:1},1000,egret.Ease.elasticOut);
        
        if(!this.contains(this._btn1)) this.addChild(this._btn1);
        this._btn1.alpha = 0;
        this._btn1.scaleX = this._btn1.scaleY = 0;
        egret.Tween.get(this._btn1).wait(200).to({ alpha: 1,scaleX: 1,scaleY: 1 },1000,egret.Ease.elasticOut).call(function(){
            this.sceneInComplete();
            this.addListener();
        },this);
        
    }
    public sceneOut(){
        egret.Tween.get(this).to({alpha:0},300).call(function(){
            this.sceneOutComplete();
        },this);
    }
        
    private addListener(){
        this.touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){

            this.sceneOut();
        },this);
    }
}
