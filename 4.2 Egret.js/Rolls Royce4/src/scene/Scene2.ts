/**
 *
 * @author 
 *
 */
class Scene2 extends Scene {

    public constructor() {
        super();
    }
    protected onAddToStage(event: egret.Event): void {
        super.onAddToStage(event);
    }

    public sceneIn() {
        super.sceneIn();
        
        this._sw = Scene.S_W;
        this._sh = Scene.S_H;
        //alert(this._sw + "---" + this._sh);

        this.bg = Egr.getZBMP("s2_sp1");
        this.bg.width = this._sw;
        this.bg.height = this._sh;
        this.bg.alpha = 0;
        this.bg.name = "m0";
        this.addChild(this.bg);
        egret.Tween.get(this.bg).to({ alpha: 1 },800);

        this.initStage1();
        
        egret.setTimeout(this.initStage2,this,600);
    }
    public sceneOut() {
        super.sceneOut();

        egret.Tween.get(this).to({ alpha: 0 },800).call(function() {
            if(this.parent)
                this.parent.removeChild(this);
        },this);
    }

    private maskObj: MaskObject;
    private maskObj2: MaskObject;
    private maskObj3: MaskObject;
    private maskObj4: MaskObject;
    private maskObj5:MaskObject;
    private maskObj6: MaskObject;
    private curMaskObj:MaskObject;
    public curTouchName: string;
    private touchEnd:boolean=false;
    public initStage1() {
        super.initStage1();

        this.maskObj = new MaskObject();
        this.stage1View.addChild(this.maskObj);
        this.maskObj.init("s2_sp2");
        this.maskObj.name = "m1";
        this.maskObj.touchEnabled = true;
        this.maskObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBeginObj,this);
        this.maskObj.addEventListener("complete",function(event:egret.Event){
            this.curMaskObj = this.maskObj2;
            if(!this.touchEnd){
                this.maskObj2.play();
            }
        },this);
        this.curMaskObj=this.maskObj;

        this.maskObj2 = new MaskObject();
        this.stage1View.addChild(this.maskObj2);
        this.maskObj2.init("s2_sp3");
        this.maskObj2.name = "m2";
        this.maskObj2.touchEnabled = true;
        this.maskObj2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBeginObj,this);
        this.maskObj2.addEventListener("complete",function(event: egret.Event) {
            this.curMaskObj = this.maskObj3;
            if(!this.touchEnd) {
                this.maskObj3.play();
            }
        },this);

        this.maskObj3 = new MaskObject();
        this.stage1View.addChild(this.maskObj3);
        this.maskObj3.init("s2_sp4");
        this.maskObj3.name = "m3";
        this.maskObj3.touchEnabled = true;
        this.maskObj3.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBeginObj,this);
        this.maskObj3.addEventListener("complete",function(event: egret.Event) {
            this.curMaskObj = this.maskObj4;
            if(!this.touchEnd) {
                this.maskObj4.play();
            }
        },this);

        this.maskObj4 = new MaskObject();
        this.stage1View.addChild(this.maskObj4);
        this.maskObj4.init("s2_sp5");
        this.maskObj4.name = "m4";
        this.maskObj4.touchEnabled = true;
        this.maskObj4.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBeginObj,this);
        this.maskObj4.addEventListener("complete",function(event: egret.Event) {
            this.curMaskObj = this.maskObj5;
            if(!this.touchEnd) {
                this.maskObj5.play();
            }
        },this);
        
        this.maskObj5 = new MaskObject();
        this.stage1View.addChild(this.maskObj5);
        this.maskObj5.init("s2_sp9");
        this.maskObj5.name = "m5";
        this.maskObj5.touchEnabled = true;
        this.maskObj5.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBeginObj,this);
        this.maskObj5.addEventListener("complete",function(event: egret.Event) {
            this.curMaskObj = this.maskObj6;
            if(!this.touchEnd) {
                this.maskObj6.play();
            }
        },this);
        
        this.maskObj6 = new MaskObject();
        this.stage1View.addChild(this.maskObj6);
        this.maskObj6.init("s2_sp10");
        this.maskObj6.name = "m6";
        this.maskObj6.touchEnabled = true;
        //this.maskObj6.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBeginObj,this);
        this.maskObj6.addEventListener("complete",function(){
            egret.setTimeout(this.sceneOut,this,1000);
            //console.log("complte");
        },this);

    }


    public onTouchBeginObj(event: egret.TouchEvent): void {
        console.log(event.currentTarget.name);
        
        this.touchEnd=false;
        //if(this.curTouchName != event.currentTarget.name) {
            if(this.touchhit.alpha!=0){
                this.hideHit();
            }
       // }
        this.curTouchName = event.currentTarget.name;
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);

        this.curMaskObj.play();
        /*switch(event.currentTarget.name) {
            case "m0":
                this.maskObj.play(event.stageX,event.stageY);
                break;
            case "m1":
                this.maskObj2.play(event.stageX,event.stageY);
                break;
            case "m2":
                this.maskObj3.play(event.stageX,event.stageY);
                break;
            case "m3":
                this.maskObj4.play(event.stageX,event.stageY);
                break;
            case "m4":
                this.maskObj5.play(event.stageX,event.stageY);
                break;
            case "m5":
                this.maskObj6.play(event.stageX,event.stageY);
                break;
        }*/
    }
    private onTouchEnd(event: egret.TouchEvent) {

        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.curMaskObj.stop();
        this.touchEnd=true;
        //egret.setTimeout(this.showHit,this,2000);
        /*switch(this.curTouchName) {
            case "m0":
                this.maskObj.stop();
                break;
            case "m1":
                this.maskObj2.stop();
                break;
            case "m2":
                this.maskObj3.stop();
                break;
            case "m3":
                this.maskObj4.stop();
                break;
            case "m4":
                this.maskObj5.stop();
                break;
            case "m5":
                this.maskObj6.stop();
                break;
        }*/
    }
    
    public initStage2() {
        super.initStage2();

        this.textCurrentIndex = 0;
        this.textinfos = [
            {
                "source": "s1_txt7_fnt",
                "text": "恒久之念契而不舍这也正是让劳斯莱斯荣耀百年的传承基因",
                "showTime": 2000,
                "br": [[8,0],[17,0]]
            },
            {
                "source": "s1_txt8_fnt",
                "text": "每一寸工艺都是传世艺术每一处设计皆是极致美学",
                "br": [[11,0]]
            }
            
        ];

        this.creatText();
        
        
        
        
    }
    private textCurrentIndex = 0;
    private textinfos = null;
    private itv = null;
    private creatText() {
        //console.count("");
        var textSp2 = new TextEffect2(this.textinfos[this.textCurrentIndex],true);
        this.stage2View.addChild(textSp2);
        textSp2.x = this._sw - 84 - 15;
        textSp2.y = this._sh - 55 - 15;
        var show = this.textinfos[this.textCurrentIndex].showTime || 1500;
        var delay = 3500 + show;
        if(++this.textCurrentIndex < this.textinfos.length) {
            egret.setTimeout(this.creatText,this,delay);
        }else{
            egret.setTimeout(function() {
                this.bg.touchEnabled = true;
                this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBeginObj,this);
                this.showHit();
            },this,5000);
        }
    }
    
    private touchhit:egret.DisplayObjectContainer;
    public showHit(){
        if(!this.touchhit){
            this.touchhit = new egret.DisplayObjectContainer();
            this.stage2View.addChild(this.touchhit);
            this.touchhit.x = 137;
            this.touchhit.y = this._sh - 270;

            var s2_sp6 = Egr.getZBMP("s2_sp6");
            this.touchhit.addChild(s2_sp6);
            s2_sp6.setTransform(s2_sp6.width / 2,s2_sp6.height / 2,s2_sp6.width / 2,s2_sp6.height / 2)
            s2_sp6.alpha = 0;
            s2_sp6.scaleX = s2_sp6.scaleY = 1.3;
            egret.Tween.get(s2_sp6,{ loop: true }).to({ alpha: 1,scaleX: 1,scaleY: 1 },1000)
                .wait(2000).to({ alpha: 0 },1000).wait(1000);

            var s2_sp7 = Egr.getZBMP("s2_sp7");
            this.touchhit.addChild(s2_sp7);
            s2_sp7.setTransform(s2_sp7.width / 2,s2_sp7.height / 2,s2_sp7.width / 2 + 60,s2_sp7.height / 2)
            s2_sp7.scaleX = s2_sp7.scaleY = 0.8;
            s2_sp7.alpha = 0;
            egret.Tween.get(s2_sp7,{ loop: true }).wait(900).to({ alpha: 1,scaleX: 1,scaleY: 1 },1000)
                .to({ alpha: 0,scaleX: 1.2,scaleY: 1.2 },1000).wait(2100); 
        }
        if(this.touchhit.alpha==0){
            egret.Tween.get(this.touchhit).wait(500).to({ alpha: 1 },500);
        }
       
    }
    public hideHit(){
        if(this.touchhit.alpha!=0)
            egret.Tween.get(this.touchhit).to({alpha:0},500);
    }
}
