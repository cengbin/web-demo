var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var SoundEngine = (function () {
    function SoundEngine(ses) {
        this._mute = false;
        this._count = 0;
        if (SoundEngine._instance)
            throw new Error("该类不能被实例化，这是一个声音引擎单例模式");
        this._soundList = new Array();
    }
    SoundEngine.getInstance = function () {
        if (!this._instance)
            this._instance = new SoundEngine(new SoundEngineSingle());
        return this._instance;
    };
    SoundEngine.prototype.play = function (name, startTime, loops) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 0; }
        var sound = RES.getRes(name);
        if (sound) {
            this.count++; //记录播放了系统播放了多少次
            if (!this._soundList[name]) {
                this._soundList[name] = new SoundEngineObject(name, sound);
            }
            this._soundList[name].play(startTime, loops, Number(!this._mute));
        }
    };
    Object.defineProperty(SoundEngine.prototype, "mute", {
        /*
         * 设置系统静音
         * @param v {true:静音,false:不静音}
         * */
        set: function (v) {
            this._mute = v;
            var s;
            for (s in this._soundList) {
                if (v) {
                    this._soundList[s].mute();
                }
                else {
                    this._soundList[s].noMute();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundEngine.prototype, "count", {
        get: function () {
            return this._count++;
        },
        set: function (val) {
            this._count = val;
        },
        enumerable: true,
        configurable: true
    });
    return SoundEngine;
}());
__reflect(SoundEngine.prototype, "SoundEngine");
var SoundEngineSingle = (function () {
    function SoundEngineSingle() {
    }
    return SoundEngineSingle;
}());
__reflect(SoundEngineSingle.prototype, "SoundEngineSingle");
