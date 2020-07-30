/**
 *
 * @author 
 *
 */
class Scene extends egret.DisplayObjectContainer{
    
    static SCENE_IN_COMPLETE:string="scene_in_complete";
    static SCENE_OUT_COMPLETE:string="scene_out_complete";
    
	public constructor() {
    	  super();
        this.name = egret.getQualifiedClassName(this);
        console.log("class name is:",this.name);
    	  this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	public onAddToStage(event:egret.Event):void{
	    
	}
	public init(){
	    
	}
    public sceneIn(){
        
    }
    public sceneInComplete(){
        this.dispatchEvent(new egret.Event(Scene.SCENE_IN_COMPLETE));
    }
    public sceneOut(){
    
    }
    public sceneOutComplete(){
        this.dispatchEvent(new SceneEvent(Scene.SCENE_OUT_COMPLETE,this.name));
    }
}
