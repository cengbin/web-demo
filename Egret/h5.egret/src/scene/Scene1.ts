/**
 *
 * @author 
 *
 */
class Scene1 extends Scene{
    
    
    private _pic1:egret.Bitmap;
    
    private _pic2:egret.Bitmap;
    
    private _btn1:egret.Bitmap;
    
	public constructor() {
        super();
	}
    public onAddToStage(event:egret.Event):void{
        
        this._pic1=Egr.getZBMP("pic1_jpg");
        this._pic1.anchorOffsetX=this._pic1.width/2;
        this._pic1.x=this.stage.stageWidth/2;
        this._pic1.y=this.stage.height;
        
        this._pic2 = Egr.getZBMP("pic2_jpg");
        this._pic2.anchorOffsetX = this._pic2.width / 2;
        this._pic2.x = this.stage.stageWidth / 2;
        this._pic2.y = this.stage.height;
        
        this._btn1=Egr.getZBMP("btn1_png");
        this._btn1.anchorOffsetX=this._btn1.width/2;
        this._btn1.x=this.stage.stageWidth/2;
        this._btn1.y=this.stage.stageHeight;
    }
    public sceneIn(){
        
        if(!this.contains(this._pic1))this.addChild(this._pic1);
        this._pic1.alpha=0;
        egret.Tween.get(this._pic1).to({alpha:1,y:this.stage.stageHeight-350},1000,egret.Ease.elasticOut);
        
        if(!this.contains(this._pic2)) this.addChild(this._pic2);
        this._pic2.alpha = 0;
        egret.Tween.get(this._pic2).wait(400).to({ alpha: 1,y: this.stage.stageHeight - 210 },1000,egret.Ease.elasticOut);
        
        if(!this.contains(this._btn1)) this.addChild(this._btn1);
        this._btn1.alpha = 0;
        egret.Tween.get(this._btn1).wait(800).to({ alpha: 1,y: this.stage.stageHeight - 80 },1000,egret.Ease.elasticOut).call(function(){
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
            
            SoundEngine.getInstance().play("s1_mp3",0,1);

            this.sceneOut();
        },this);
    }
}
