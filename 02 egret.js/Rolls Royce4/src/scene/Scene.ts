/**
 *
 * @author 
 *
 */
class Scene extends egret.DisplayObjectContainer{
    
    static S_W:number;
    static S_H:number;
    
    static SCENE_IN:string="scene_in";
    static SCENE_OUT:string="scene_out";
    static SCENE_IN_COMPLETE:string="scene_in_complete";
    static SCENE_OUT_COMPLETE:string="scene_out_complete";
    
    protected _sw:number;
    protected _sh:number;
    protected isSceneIn:boolean=false;
    protected isSceneOut:boolean=false;
    
    public bg:ZBitmap;
    public stage1View:egret.DisplayObjectContainer;
    public stage2View:egret.DisplayObjectContainer;
    
	public constructor() {
    	  super();
        this.name = egret.getQualifiedClassName(this);
        //console.log("class name is:",this.name);
    	  this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	protected onAddToStage(event:egret.Event):void{
	    //this._sw=this.stage.stageWidth;
	    //this._sh=this.stage.stageHeight;
	    
        this._sw = Scene.S_W;
        this._sh = Scene.S_H;
        //console.log("%s: _sw:%d_sh:%d",this.name,this._sw,this._sh);
	}
	public init(){
	    
	}
    public initStage1(){
        this.stage1View=new egret.DisplayObjectContainer();
        this.addChild(this.stage1View);
    }
    public initStage2() {
        this.stage2View = new egret.DisplayObjectContainer();
        this.addChild(this.stage2View);
    }
	public addBG(name){
        this.bg = Egr.getZBMP(name);
        this.bg.width = this._sw;
        this.bg.height = this._sh;
        this.addChild(this.bg);
	}
    public sceneIn(){
        //console.log(this.name + ": scene in");
        this.isSceneIn=true;
        this.dispatchEvent(new egret.Event(Scene.SCENE_IN));
    }
    public sceneInComplete(){
        this.dispatchEvent(new egret.Event(Scene.SCENE_IN_COMPLETE));
    }
    public sceneOut(){
        //console.log(this.name+": scene out");
        if(this.isSceneOut)return;
        
        this.isSceneOut=true;
        this.dispatchEvent(new egret.Event(Scene.SCENE_OUT));
    }
    public sceneOutComplete(){
        this.dispatchEvent(new SceneEvent(Scene.SCENE_OUT_COMPLETE,this.name));
    }
}
