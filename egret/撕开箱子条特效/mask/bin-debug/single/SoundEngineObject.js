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
    var d = __define,c=SoundEngineObject,p=c.prototype;
    p.play = function (startTime, loops, volume) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 0; }
        var sc = this.sound.play(startTime, loops);
        sc.volume = volume;
        sc.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        this._soundChannelList.push(sc);
        return sc;
    };
    p.onSoundComplete = function (event) {
        var sc = event.currentTarget;
        var index = this._soundChannelList.indexOf(sc);
        if (index != -1) {
            this._soundChannelList.splice(index, 1);
            sc = null;
        }
        //        console.log(this._soundChannelList);
        //	    console.log(this.name+"  sound play complete");
    };
    p.stop = function () {
    };
    p.mute = function () {
        this.setAllSoundChannelVolume(0);
    };
    p.noMute = function () {
        this.setAllSoundChannelVolume(1);
    };
    p.setAllSoundChannelVolume = function (val) {
        if (this._soundChannelList.length > 0) {
            var i = 0;
            for (i; i < this._soundChannelList.length; i++) {
                this._soundChannelList[i].volume = val;
            }
        }
    };
    return SoundEngineObject;
}());
egret.registerClass(SoundEngineObject,'SoundEngineObject');
