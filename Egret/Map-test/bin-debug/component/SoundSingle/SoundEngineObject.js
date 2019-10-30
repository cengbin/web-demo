var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var SoundEngineObject = (function () {
    function SoundEngineObject(name, sound) {
        this.name = name;
        this.sound = sound;
        this._soundChannelList = [];
    }
    SoundEngineObject.prototype.play = function (startTime, loops, volume) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 0; }
        var sc = this.sound.play(startTime, loops);
        sc.volume = volume;
        sc.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        this._soundChannelList.push(sc);
        return sc;
    };
    SoundEngineObject.prototype.onSoundComplete = function (event) {
        var sc = event.currentTarget;
        var index = this._soundChannelList.indexOf(sc);
        if (index != -1) {
            this._soundChannelList.splice(index, 1);
            sc = null;
        }
        //        console.log(this._soundChannelList);
        //	    console.log(this.name+"  sound play complete");
    };
    SoundEngineObject.prototype.stop = function () {
    };
    SoundEngineObject.prototype.mute = function () {
        this.setAllSoundChannelVolume(0);
    };
    SoundEngineObject.prototype.noMute = function () {
        this.setAllSoundChannelVolume(1);
    };
    SoundEngineObject.prototype.setAllSoundChannelVolume = function (val) {
        if (this._soundChannelList.length > 0) {
            var i = 0;
            for (i; i < this._soundChannelList.length; i++) {
                this._soundChannelList[i].volume = val;
            }
        }
    };
    return SoundEngineObject;
}());
__reflect(SoundEngineObject.prototype, "SoundEngineObject");
