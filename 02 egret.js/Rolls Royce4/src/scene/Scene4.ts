/**
 *
 * @author 
 *
 */
class Scene4 extends Scene {
    
    
    public constructor() {
        super();
    }
    protected onAddToStage(event: egret.Event): void {
        super.onAddToStage(event);
        this.sceneIn();
    }
    
    public sceneIn() {
        super.sceneIn();
        
        super.addBG("s4_sp1");
        this.bg.alpha = 0;
        egret.Tween.get(this.bg).to({ alpha: 1 },800);
            
        this.initStage1();
    }
    public initStage1() {
        var t:egret.Bitmap=Egr.getZBMP("s4_sp2");
        this.addChild(t);
        t.x=243;
        t.y=241;
        t.alpha=0;
        t.touchEnabled=true;
        t.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event:egret.TouchEvent):void{
            setTimeout(function() {
                window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxMzIzNzk3MA==&scene=110#wechat_redirect";
            },50);
        },this);
        egret.Tween.get(t).wait(500).to({alpha:1},800);
        
    }
}
