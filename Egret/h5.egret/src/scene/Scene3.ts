/**
 *
 * @author 
 *
 */
class Scene3 extends Scene{
    
    private _stage1Container:egret.DisplayObjectContainer;
    
    private _pic7:ZBitmap;
    private _pic8: ZBitmap;
    private _pic9: ZBitmap;
    private _pic10: ZBitmap;
    private _pic11: ZBitmap;
    
    
	public constructor() {
        super();
	}
    public onAddToStage(event:egret.Event):void{
        
        this._stage1Container=new egret.DisplayObjectContainer();
        this._stage1Container.x=this.stage.stageWidth/2;
        this._stage1Container.y=this.stage.stageHeight/2;
        
        this._pic7 = Egr.getZBMP("pic7_png");
        this._pic7.anchorOffsetX=this._pic7.width/2;
        this._pic7.anchorOffsetY=this._pic7.height/2;
        this._stage1Container.addChild(this._pic7);
        
        this._pic8 = Egr.getZBMP("pic8_png");
        this._pic8.setTransform(this._pic8.width / 2,this._pic8.height / 2,-134,-58);
        this._stage1Container.addChild(this._pic8);
        
        this._pic9 = Egr.getZBMP("pic9_png");
        this._pic9.setTransform(this._pic9.width / 2,this._pic9.height / 2,-54,-128);
        this._stage1Container.addChild(this._pic9);
        
        this._pic10 = Egr.getZBMP("pic10_png");
        this._pic10.setTransform(this._pic10.width / 2,this._pic10.height / 2,61,-128);
        this._stage1Container.addChild(this._pic10);
        
        this._pic11 = Egr.getZBMP("pic11_png");
        this._pic11.setTransform(this._pic11.width / 2,this._pic11.height / 2,134,-58);
        this._stage1Container.addChild(this._pic11);
        
    }
    public sceneIn(){
        
        if(!this.contains(this._stage1Container)) this.addChild(this._stage1Container);
        
        this._pic7.alpha=0;
        this._pic7.scaleX=this._pic7.scaleY=0;
        egret.Tween.get(this._pic7).to({alpha:1,scaleX:1,scaleY:1},1000,egret.Ease.elasticOut);
        
        this._pic8.alpha = 0;
        this._pic8.scaleX = this._pic8.scaleY = 0;
        egret.Tween.get(this._pic8).wait(200).call(function(){
            SoundEngine.getInstance().play("s2_mp3",0,1); 
        }).to({ alpha: 1,scaleX: 1,scaleY: 1 },1000,egret.Ease.elasticOut);
        
        this._pic9.alpha = 0;
        this._pic9.scaleX = this._pic9.scaleY = 0;
        egret.Tween.get(this._pic9).wait(400).call(function() {
            SoundEngine.getInstance().play("s2_mp3",0,1);
        }).to({ alpha: 1,scaleX: 1,scaleY: 1 },1000,egret.Ease.elasticOut);
        
        this._pic10.alpha = 0;
        this._pic10.scaleX = this._pic10.scaleY = 0;
        egret.Tween.get(this._pic10).wait(600).call(function() {
            SoundEngine.getInstance().play("s2_mp3",0,1);
        }).to({ alpha: 1,scaleX: 1,scaleY: 1 },1000,egret.Ease.elasticOut);
        
        this._pic11.alpha = 0;
        this._pic11.scaleX = this._pic11.scaleY = 0;
        egret.Tween.get(this._pic11).wait(800).call(function() {
            SoundEngine.getInstance().play("s2_mp3",0,1);
        }).to({ alpha: 1,scaleX: 1,scaleY: 1 },1000,egret.Ease.elasticOut);
        
        
    }
    public sceneOut(){
        egret.Tween.get(this).to({alpha:0},300).call(function(){
            console.log(this.name);
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
