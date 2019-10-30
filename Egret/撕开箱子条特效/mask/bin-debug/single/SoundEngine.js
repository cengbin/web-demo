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
    var d = __define,c=SoundEngine,p=c.prototype;
    SoundEngine.getInstance = function () {
        if (!this._instance)
            this._instance = new SoundEngine(new SoundEngineSingle());
        return this._instance;
    };
    p.play = function (name, startTime, loops) {
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
    d(p, "mute",undefined
        /*
         * 设置系统静音
         * @param v {true:静音,false:不静音}
         * */
        ,function (v) {
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
        }
    );
    d(p, "count"
        ,function () {
            return this._count++;
        }
        ,function (val) {
            this._count = val;
        }
    );
    return SoundEngine;
}());
egret.registerClass(SoundEngine,'SoundEngine');
var SoundEngineSingle = (function () {
    function SoundEngineSingle() {
    }
    var d = __define,c=SoundEngineSingle,p=c.prototype;
    return SoundEngineSingle;
}());
egret.registerClass(SoundEngineSingle,'SoundEngineSingle');
