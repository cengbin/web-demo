/**
 *
 * @author 
 *
 */

/*
 * 拖动方向
 * */
enum DragDirections {
    AUTO=1,
    LEFT_TO_RIGHT=2,
    RIGHT_TO_LEFT=3
}

/*
 * 拖动条显示方向
 * */
enum ShowDirections{
    LEFT_TO_RIGHT,
    RIGHT_TO_LEFT
}


class Slider extends egret.DisplayObjectContainer {
    
    public interactable:boolean=true;
    public backgroundactable:boolean=true;
    public dragWidth=300;
    private _value:number=0;
    public minValue=0;
    public maxValue=1;
    
    private _showDirection:ShowDirections=null;
    public dragDirection:DragDirections=null;
    
    public Background:egret.DisplayObject=null;
    
    public FillArea: egret.DisplayObject=null;
    public Fill: egret.DisplayObject=null;
    
    public HandleSlideArea: egret.Rectangle=null;
    public Handle: egret.DisplayObject=null;
    
    public set showDirection(v){
        this._showDirection=v;
    }
    
    public constructor() {
        super();
    	  
    	  this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
          
	}
    private onAddToStage(event:egret.Event):void{
        var shp: egret.Shape = this.creatShape("rect",0xcccccc,1,0,0,300,30);
        this.addChild(shp);
        this.Background = shp;
        
        shp = this.creatShape("rect",0xff0000,1,0,0,this.value *this.dragWidth,30);
        this.addChild(shp);
        this.FillArea = shp;
        
        shp = this.creatShape("rect",0xff0000,1,0,0,300,30);
        this.addChild(shp);
        this.Fill = shp;
        
        var rectangle: egret.Rectangle = new egret.Rectangle(0,0,this.dragWidth,0);
        this.HandleSlideArea=rectangle;
        
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(3,0xcccccc);
        shp.graphics.beginFill(0xffffff,1);
        shp.graphics.drawCircle(0,0,30);
        shp.graphics.endFill();
        this.addChild(shp);
        shp.y=this.Fill.height/2;
        this.Handle = shp;
        
	}
	public init():void{
    	
    	//this.rotation=90;
    	
    	this.value=1;
    	
        this.Fill.mask = this.FillArea;
        
	    this.Handle.x=this.FillArea.width;
	    
	    this.showDirection=ShowDirections.LEFT_TO_RIGHT;
	    
	    this.dragDirection=DragDirections.AUTO;
	    
	    if(this.interactable){
            this.Handle.touchEnabled = true;
            //当用户第一次触摸启用触摸的设备时（例如，用手指触摸配有触摸屏的移动电话或平板电脑）调度。
            this.Handle.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginHandle,this);
	    }
	    
	    if(this.backgroundactable){
            this.Background.touchEnabled=true;
            this.Background.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapBackground,this);
	    }
	    
	}
    public touchTapBackground(event:egret.TouchEvent){
        
        var point:egret.Point=this.localToGlobal(this.Background.x,this.Background.y);
        this.Background["offset"] = { x: event.stageX - point.x,y: event.stageY - point.y};
        
        this.changeShapeWidth(this.Background["offset"].x);
        
        this.Handle.x = this.Background["offset"].x;
    }
	
    public touchMoveStage(event: egret.TouchEvent) {
        if(this.Handle["onTouchBegin"]){
            if(this.dragDirection==DragDirections.AUTO){
                this.Handle.x = event.stageX + this.Handle["offset"].x; 
            }else if(this.dragDirection==DragDirections.LEFT_TO_RIGHT){
                if(event.stageX>this.Handle["lastStageX"]){
                    this.Handle.x = event.stageX + this.Handle["offset"].x;
                    this.Handle["lastStageX"]=event.stageX;
                }
            }else if(this.dragDirection==DragDirections.RIGHT_TO_LEFT){
                if(event.stageX < this.Handle["lastStageX"]) {
                    this.Handle.x = event.stageX + this.Handle["offset"].x;
                    this.Handle["lastStageX"] = event.stageX;
                }
            }
            
            this.changeShapeWidth(this.Handle.x);
            
            if(this.Handle.x <= 0){
                this.Handle.x=0;
            } else if(this.Handle.x >= this.HandleSlideArea.width){
                this.Handle.x = this.HandleSlideArea.width;
            }
        }
    }
    
    
    public touchBeginHandle(event: egret.TouchEvent) {
        this.Handle["onTouchBegin"]=true;
        this.Handle["lastStageX"]=event.stageX;
        this.Handle["offset"] = { x: this.Handle.x - event.stageX,y: this.Handle.y-event.stageY};
        
        //当用户触碰设备时进行调度，而且会连续调度，直到接触点被删除。
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMoveStage,this);
        //当用户移除与启用触摸的设备的接触时（例如，将手指从配有触摸屏的移动电话或平板电脑上抬起）调度。
        this.Handle.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndHandle,this);
        //当用户在启用触摸设备上的已启动接触的不同 DisplayObject 实例上抬起接触点时（例如，在配有触摸屏的移动电话或平板电脑的显示对象上的某一点处按下并释放手指）调度。
        this.Handle.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEndHandle,this);
    }
    public touchEndHandle(event: egret.TouchEvent) {
        this.Handle["onTouchBegin"] = false;
        this.Handle["offset"] = null;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMoveStage,this);
        this.Handle.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEndHandle,this);
        this.Handle.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEndHandle,this);
    }
    
    private creatShape(type,color,alpha,x,y,w,h?):egret.Shape{
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(color,alpha);
        switch(type){
            case "circle":
            shp.graphics.drawCircle(x,y,w);
            break;
            case "rect":
                shp.graphics.drawRect(x,y,w,h);
            break;
        }
        shp.graphics.endFill();
        return shp;
    }
    private changeShapeWidth(w: number) {
        var fillArea: egret.Shape = <egret.Shape>this.FillArea;
        fillArea.graphics.clear();
        fillArea.graphics.beginFill(0xff0000,1);
        fillArea.graphics.drawRect(0,0,w,30);
        fillArea.graphics.endFill();
    }
    
    
    
    
    
    
    
    public set value(v) {
        this._value = v;
        
        this.changeShapeWidth(v*this.dragWidth);
    }
    public get value(): number {
        return this._value;
    }
    
}
