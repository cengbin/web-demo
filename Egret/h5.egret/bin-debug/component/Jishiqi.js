var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Jishiqi = (function (_super) {
    __extends(Jishiqi, _super);
    function Jishiqi() {
        var _this = _super.call(this) || this;
        _this._startTime = 0;
        _this._miao = 0;
        _this._haomiao = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Jishiqi.prototype.onAddToStage = function (event) {
        var jishiqi = Egr.getZBMP("s2_sp7");
        this.addChild(jishiqi);
        jishiqi.anchorOffsetX = jishiqi.width / 2;
        var font = RES.getRes("Number1");
        var _secondBitmapText = new egret.BitmapText();
        _secondBitmapText.font = font;
        _secondBitmapText.x = -75;
        _secondBitmapText.y = 70;
        this.addChild(_secondBitmapText);
        _secondBitmapText.text = '00';
        _secondBitmapText.scaleX = _secondBitmapText.scaleY = 1.3;
        this._secondBitmapText = _secondBitmapText;
        var _millisecondBitmapText = new egret.BitmapText();
        _millisecondBitmapText.font = font;
        _millisecondBitmapText.x = 7;
        _millisecondBitmapText.y = 80;
        this.addChild(_millisecondBitmapText);
        _millisecondBitmapText.text = '000';
        this._millisecondBitmapText = _millisecondBitmapText;
        // var timer:egret.Timer=new egret.Timer(10,0);
        // timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        // timer.start();
        // this.timer=timer;
    };
    Jishiqi.prototype.numToString = function (num) {
        if (num < 10) {
            return "00" + num.toString();
        }
        else if (num < 100) {
            return "0" + num.toString();
        }
        return num.toString();
    };
    Jishiqi.prototype.numToString2 = function (num) {
        if (num < 10) {
            return "0" + num.toString();
        }
        return num.toString();
    };
    Jishiqi.prototype.onRest = function () {
        this._startTime = 0;
        this._miao = 0;
        this._haomiao = 0;
        this._millisecondBitmapText.text = "000";
        this._secondBitmapText.text = "00";
    };
    Jishiqi.prototype.start = function () {
        this._startTime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Jishiqi.prototype.stop = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Jishiqi.prototype.onEnterFrame = function (event) {
        this._haomiao = Math.ceil((egret.getTimer() - this._startTime) % 1000);
        var miao = Math.floor((egret.getTimer() - this._startTime) / 1000);
        //console.log(miao," : ",this._haomiao);
        this._millisecondBitmapText.text = this.numToString(this._haomiao);
        if (miao != this._miao) {
            this._miao = miao;
            this._secondBitmapText.text = this.numToString2(this._miao);
        }
    };
    return Jishiqi;
}(egret.Sprite));
__reflect(Jishiqi.prototype, "Jishiqi");
//# sourceMappingURL=Jishiqi.js.map