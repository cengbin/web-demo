/**
 *
 * @author 
 *
 */
class WHT extends Scene{
    
    private triangleArr:Sp1[]=[];
    private page:number=6;
    private pingJunAng:number=360/this.page;
    
    private upContainer:egret.DisplayObjectContainer=new egret.DisplayObjectContainer;
    private downContainer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer;
    
    private endCount:number=1;
	public constructor() {
        super();
	}
    public onAddToStage(event:egret.Event):void{
        super.onAddToStage(event);
        
        this.addChild(this.downContainer);
        this.addChild(this.upContainer);
        for(var i: number = 0;i < this.page;i++){
            let sp1 = new Sp1();
            this.downContainer.addChild(sp1);
            sp1.init(this.pingJunAng);
            
            let ang = i * this.pingJunAng;
            if(i % 2 == 0) {
                sp1.rotation = ang;
                var line = Egr.getZBMP("s2_sp6");
                //console.count("test");
                line.setTransform(line.width / 2,line.height / 2,this._sw / 2,this._sh / 2);
                this.upContainer.addChild(line);
                line.rotation = ang;
            } else {
                sp1.scaleX = -1;
                sp1.rotation = ang + 180 + ang;
            }

            sp1.x = this._sw / 2;
            sp1.y = this._sh / 2;
            this.triangleArr.push(sp1);
        }
        
        this.touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        
    }
    private onTouchBegin(event:egret.TouchEvent){
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTouchEnd,this);
        this.play();
    }
    public play(){
        this.addEventListener(egret.Event.ENTER_FRAME,this.enterframe,this);
        if(this.endCount == 1) {
            window["_hmt"].push(['_trackEvent','button','wht1']);
        } else if(this.endCount == 2) {
            window["_hmt"].push(['_trackEvent','button','wht2']);
        } else if(this.endCount == 3) {
            window["_hmt"].push(['_trackEvent','button','wht3']);
        } else if(this.endCount == 4) {
            window["_hmt"].push(['_trackEvent','button','wht4']);
        }
        if(this.endCount != 1) {
            for(var i: number = 0;i < this.triangleArr.length;i++) {
                let sp1 = <Sp1>this.triangleArr[i];
                sp1.reset();
            }
        }
    }
    private onTouchEnd(event: egret.TouchEvent) {
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTouchEnd,this);
        this.stop();
    }
    public stop(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.enterframe,this);
        if(this.endCount++ >= 4 && this.parent) {
            this.dispose();
            var scene2: Scene2 = <Scene2>this.parent;
            scene2.sceneOut();
        }
    }
    private enterframe(event:egret.Event){
        for(var i: number = 0;i < this.triangleArr.length;i++) {
            let sp1 = <Sp1>this.triangleArr[i];
            sp1.update();
        }
    }
    
    public dispose(){
        this.touchEnabled=false;
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
    }
   
}
