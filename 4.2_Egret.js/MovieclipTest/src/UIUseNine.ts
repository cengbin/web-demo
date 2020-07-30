
	/**
	 *
	 * @author 
	 *
	 */
class UIUseNine extends egret.DisplayObjectContainer{
	public constructor() {
    	super();
    	this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(){
	    var imgLoader:egret.ImageLoader=new egret.ImageLoader();
	    imgLoader.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
	    imgLoader.load("resource/assets/dialog-bg.png");
	}
	private imgLoadHandler(event:egret.Event){
	    var bmd:egret.BitmapData=event.currentTarget.data;
	    
	    var bm:egret.Bitmap=new egret.Bitmap(bmd);
	    this.addChild(bm);
	    bm.anchorOffsetX=bm.width/2;
	    bm.anchorOffsetY=bm.height/2;
	    bm.x=this.stage.stageWidth/2;
	    
	    //设置对象的9切片属性（又称9宫格属性）
	    //最小宽度不可以小于左右切片的宽度总和
	    //最小高度不可以小于上下切片的高度总和
	    bm.scale9Grid=new egret.Rectangle(50,50,300,300);
	    
	    console.log(bm.width,bm.height);
	    
        egret.Tween.get(bm,{loop:true,onChange:()=>{
                bm.anchorOffsetX = bm.width / 2;
                bm.anchorOffsetY = bm.height / 2;  
            }
        }).to({width:L.W_UI_MIN,height:L.H_UI_MIN},2000)
        .to({width:L.W_UI_MAX,height:L.H_UI_MAX},2000);
	}
}
class L{
    public static W_UI_MAX:number=400;
    public static H_UI_MAX:number=400;
    public static W_UI_MIN:number=100;
    public static H_UI_MIN:number=100;
}