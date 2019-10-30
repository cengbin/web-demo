

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);
    }

    private textField:egret.TextField;

    private createView(event:egret.Event):void {
        var bg = Main.cb("lbg");
        this.addChild(bg);
        
        var bm = Main.cb("parsher");
        
        var txt:egret.TextField = new egret.TextField();
        txt.width=80;
        txt.height=40;
        txt.x=-20;
        txt.rotation=90;
        txt.textAlign = "center";
        txt.text="0%";
        this.textField=txt;
        
        var parsher=new egret.Sprite();
        parsher.addChild(bm);
        parsher.addChild(txt);
        this.addChild(parsher);
        parsher.anchorOffsetX=parsher.width/2;
        parsher.anchorOffsetY=parsher.height/2;
        parsher.x=this.stage.stageWidth/2;
        parsher.y=this.stage.stageHeight/2;
        
    }

    public setProgress(current:number, total:number):void {
        this.textField.text = String(Math.ceil((current / total) * 100))+"%";
    }
    
    public screenOut() {
        //console.log("loading screenout");
        egret.Tween.get(this).to({ alpha: 0 },500).call(function() {
            if(this.parent)
                this.parent.removeChild(this);
        },this);
    }
}
