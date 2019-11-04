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
        var button:Button=new Button();
        button.testBtn(0xff0000,0.001,25,20,70,70,'音乐开关');
        this.addChild(button);
        //button.cancelable=false;
        button.addTapListener(function(){
            
            
            isplay=!isplay;
        },button);
        
        var pw = Egr.getZBMP("parsher_white");
        this.addChild(pw);
        pw.anchorOffsetX=pw.width;
        pw.x=this.stage.stageWidth-36;
        pw.y=27;
        
    }
}
