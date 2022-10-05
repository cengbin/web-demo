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
        var music:ZBitmap=Egr.getZBMP("music");
        this.addChild(music);
        music.setTransform(music.width / 2,music.height / 2,59,53);
        var tw=egret.Tween.get(music,{loop:true}).to({rotation:360},10000);
        
        var isplay=true;
        var button:Button=new Button(0xff0000,0.001,25,20,70,70);
        this.addChild(button);
        //button.cancelable=false;
        button.addTapListener(function(){
            
            if(isplay){
                egret.Tween.pauseTweens(music);
                window["bg"].pause();
                //SoundEngine.getInstance().mute=true;
            }else{
                egret.Tween.resumeTweens(music);
                window["bg"].play();
                //SoundEngine.getInstance().mute = false;
            }
                
            isplay=!isplay;
        },button);
        
        var pw = Main.cb("parsher_white");
        this.addChild(pw);
        pw.anchorOffsetX=pw.width;
        pw.x=this.stage.stageWidth-36;
        pw.y=27;
        
    }
}
