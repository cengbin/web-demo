/**
 *
 * @author 
 *
 */
class SoundEngineObject {
    public name:string;
    public sound:egret.Sound;
    
    private _soundChannelList:egret.SoundChannel[];
	public constructor(name:string,sound:egret.Sound) {
        this.name=name;
        this.sound=sound;
        this._soundChannelList=[];
	}
	
	public play(startTime:number=0,loops:number=0,volume:number):egret.SoundChannel{
        var sc:egret.SoundChannel=this.sound.play(startTime,loops);
        sc.volume=volume;
        sc.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
        this._soundChannelList.push(sc);
	    return sc;
	}
	private onSoundComplete(event:egret.Event){
        var sc: egret.SoundChannel=<egret.SoundChannel>event.currentTarget;
        var index:number=this._soundChannelList.indexOf(sc);
        if(index!=-1){
            this._soundChannelList.splice(index,1);
            sc=null;
        }
//        console.log(this._soundChannelList);
//	    console.log(this.name+"  sound play complete");
	}
	public stop(){
    	
	}
	public mute(){
        this.setAllSoundChannelVolume(0);
	}
	public noMute(){
        this.setAllSoundChannelVolume(1);
	}
	private setAllSoundChannelVolume(val:number){
        if(this._soundChannelList.length > 0) {
            var i: number = 0;
            for(i;i < this._soundChannelList.length;i++) {
                this._soundChannelList[i].volume = val;
            }
        }
	}
}
