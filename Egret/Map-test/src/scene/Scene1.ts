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
        
        
    }
    public sceneIn(){
        
        
        
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
