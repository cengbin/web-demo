/**
 *
 * @author 
 *
 */
class SoundEngine {
    
    static _instance:SoundEngine;
    
    private _soundList:SoundEngineObject[];
    
    private _mute:Boolean=false;    
    private _count:number=0;
    
	public constructor(ses:SoundEngineSingle) {
    	  if(SoundEngine._instance)
        	  throw new Error("该类不能被实例化，这是一个声音引擎单例模式");
        
        this._soundList=new Array();
	}
	public static getInstance():SoundEngine{
    	  if(!this._instance)
            this._instance=new SoundEngine(new SoundEngineSingle());
        return this._instance;
	}
	public play(name:string,startTime=0,loops=0){
        var sound: egret.Sound = RES.getRes(name);
	    if(sound){
    	      this.count++;//记录播放了系统播放了多少次
    	      
	        if(!this._soundList[name]){
	            this._soundList[name]=new SoundEngineObject(name,sound);
	        }
	        
            this._soundList[name].play(startTime,loops,Number(!this._mute));
	    }
	}
	/*
	 * 设置系统静音
	 * @param v {true:静音,false:不静音}
	 * */
	public set mute(v:boolean){
    	  this._mute=v;
        var s:string;
	    for(s in this._soundList){
	        if(v){
	            this._soundList[s].mute();
	        }else{
	            this._soundList[s].noMute();
	        }
	    }
	}
	
	
	public set count(val:number){
	    this._count=val;
	}
	public get count():number{
	    return this._count++;
	}
}
class SoundEngineSingle{}
