/**
 *
 * @author 
 *
 */
class SceneEvent extends egret.Event {
    
    public param:Object;
	public constructor(type:string,param:Object) {
    	  super(type);
    	  this.param=param;
	}
}
