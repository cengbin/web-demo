class Jishiqi extends egret.Sprite{
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(event){
		var jishiqi:ZBitmap=Egr.getZBMP("s2_sp7");
        this.addChild(jishiqi);
        jishiqi.anchorOffsetX=jishiqi.width/2;

		var font:egret.BitmapFont=RES.getRes("Number1");

        var _secondBitmapText:egret.BitmapText = new egret.BitmapText();
        _secondBitmapText.font = font;
        _secondBitmapText.x = -75;
        _secondBitmapText.y = 70;
        this.addChild(_secondBitmapText );
        _secondBitmapText.text='00';
		_secondBitmapText.scaleX=_secondBitmapText.scaleY=1.3;
		this._secondBitmapText=_secondBitmapText;

        var _millisecondBitmapText:egret.BitmapText=new egret.BitmapText();
        _millisecondBitmapText.font=font;
        _millisecondBitmapText.x = 7;
        _millisecondBitmapText.y = 80;
        this.addChild(_millisecondBitmapText);
        _millisecondBitmapText.text='000';
		this._millisecondBitmapText=_millisecondBitmapText;
		        
		// var timer:egret.Timer=new egret.Timer(10,0);
		// timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		// timer.start();
		// this.timer=timer;

		

        
	}
	private _startTime=0;
	public _miao=0;
	public _haomiao=0;
	private _secondBitmapText;
	private _millisecondBitmapText;
	
	private numToString(num:Number){
		if(num<10){
			return "00"+num.toString();
		}else if(num<100){
			return "0"+num.toString();
		}
		return num.toString();
	}
	private numToString2(num:Number){
		if(num<10){
			return "0"+num.toString();
		}
		return num.toString();
	}
	public onRest(){
		this._startTime=0;
		this._miao=0;
		this._haomiao=0;
		this._millisecondBitmapText.text="000";
		this._secondBitmapText.text="00";
	}
	public start(){
		this._startTime=egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
	public stop(){
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

	private onEnterFrame(event:egret.Event){

		this._haomiao=Math.ceil((egret.getTimer()-this._startTime)%1000);
		var miao=Math.floor((egret.getTimer()-this._startTime)/1000);
		
		//console.log(miao," : ",this._haomiao);

		this._millisecondBitmapText.text=this.numToString(this._haomiao);
		if(miao!=this._miao){
			this._miao=miao;
			this._secondBitmapText.text=this.numToString2(this._miao);
		}

	}

}