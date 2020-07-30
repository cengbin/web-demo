/**
 *
 * @author 
 *
 */
class EditImage extends egret.Sprite{
    
    private bg: egret.Shape;
    public maskObj: egret.Shape;

    
    public wth:number=305;
    public heig:number=305;
    
	public constructor() {
        super();
        
	}
    
	public startEditImage(img){
    	  
	    
	    var bmd: egret.BitmapData = new egret.BitmapData(img);
        var texture: egret.Texture = new egret.Texture();
        texture._setBitmapData(bmd);
        
        this.editObj = new egret.Bitmap(texture);
        this.editObj.anchorOffsetX = this.editObj.width/2;
        this.editObj.anchorOffsetY = this.editObj.height/2;
        this.editObj.x = this.maskObj.width / 2;
        this.editObj.y = this.maskObj.height / 2;
        this.addChild(this.editObj);
        
        var bm =this.editObj;
        
        // 判断拍照设备持有方向调整照片角度
        //alert("--"+window["EXIF"].pretty(img));
        var obj = window["EXIF"].getAllTags(img);
        /*
         * 图片显示情况
         * 0°	1
         * 顺时针90°	6
         * 逆时针90°	8
         * 180°	3
         */
        var or = obj["Orientation"];
        switch(or) {
            case 6:
                bm.rotation=90;
                this.currentEditObjRotation=90;
                break;
            case 3:
                bm.rotation=180;
                this.currentEditObjRotation = 180;
                break;
            case 8:
                bm.rotation=-90;
                this.currentEditObjRotation = -90;
                break;
            default:
            
        }
        
        this.editObj.mask = this.maskObj;
        
        this.touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.mouseUp,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
        
	}
	
	public endEditImage(){
        this.touchEnabled = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.mouseUp,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
	}
	

    public TextureToBase64(): string {
        var rt: egret.RenderTexture = new egret.RenderTexture();//建立缓冲画布
        console.log(this.wth,this.heig);
        let boo = rt.drawToTexture(this,new egret.Rectangle(0,0,this.wth,this.heig));//将对象画到缓冲画布上(可指定画对象的某个区域，或画整个)
        var imageBase64: string = rt.toDataURL("image/png");//转换为图片base64；
        //imageBase64 = imageBase64.substr(22); //去掉 data:image/png;base64,
        console.log(imageBase64.length);
        return imageBase64;
    }
	
	private editObj:egret.Bitmap;
	private touchPoints:Object={names:[]};
	private touchCon:number=0;
	private distance:number=0;
	private defAngle:number=0;
    private currentEditObjRotation:number=0;
	private mouseDown(evt:egret.TouchEvent)
    {
        
        this.editObj["offset"]={x:evt.stageX-this.editObj.x,y:evt.stageY-this.editObj.y};
        
        //egret.log("touch begin:"+evt.touchPointID);
        if(this.touchPoints[evt.touchPointID]==null)
        {
            this.touchPoints[evt.touchPointID] = new egret.Point(evt.stageX,evt.stageY);
            this.touchPoints["names"].push(evt.touchPointID);
        }
        
        this.touchCon++;

        if(this.touchCon==2)
        {
            this.distance = this.getTouchDistance();
            //egret.log("distance:"+this.distance);

            this.defAngle = this.getTouchAngle();
            //alert("touch angle:"+this.defAngle);
            //egret.log("bird angle:"+this._bird.rotation);
        }
        
    }
 

    private mouseMove(evt:egret.TouchEvent)
    {
        

        this.touchPoints[evt.touchPointID].x = evt.stageX;
        this.touchPoints[evt.touchPointID].y = evt.stageY;
        if(this.touchCon==1){
            //egret.log("touch move:" + evt.touchPointID);
            this.editObj.x=evt.stageX-this.editObj["offset"].x;
            this.editObj.y=evt.stageY-this.editObj["offset"].y;
        }
        if(this.touchCon==2)
        {
            var newdistance = this.getTouchDistance();
            this.editObj.scaleX = this.editObj.scaleY=newdistance/this.distance;

            var newangle = this.getTouchAngle();
            this.editObj.rotation = this.currentEditObjRotation + newangle - this.defAngle;
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        egret.log("touch end:"+evt.touchPointID);
        delete  this.touchPoints[evt.touchPointID];

        var index:number = this.touchPoints["names"].indexOf(evt.touchPointID);
        if (index >= 0) {
            this.touchPoints["names"].splice(index, 1);
        }
        if(this.touchPoints["names"].length>0){
            var touchPointId=this.touchPoints["names"][0];
            var p=this.touchPoints[touchPointId];
            //window["$"]("#msg").html(p.x+"--"+p.y);
            window["$"]("#msg").html(p);
            this.editObj["offset"] = { x: p.x - this.editObj.x,y: p.y - this.editObj.y };
        }
        
        this.touchCon--;
        
        this.editObj.width *= this.editObj.scaleX;
        this.editObj.height *= this.editObj.scaleY;
        this.editObj.scaleX = 1;
        this.editObj.scaleY = 1;
        this.editObj.anchorOffsetX = this.editObj.width/2;
        this.editObj.anchorOffsetY = this.editObj.height/2;
        this.currentEditObjRotation = this.editObj.rotation;
        

        egret.log("bird size [wdith:"+this.editObj.width.toFixed(1) +", height:"+this.editObj.height.toFixed(1)+"]");
        egret.log("bird angle:"+this.editObj.rotation);
        
//        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
//        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.mouseUp,this);
//        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
    }
    
    
    private getTouchDistance(): number {
        var distance: number = 0;
        var names = this.touchPoints["names"];
        var p1 = this.touchPoints[names[names.length - 1]];
        var p2 = this.touchPoints[names[names.length - 2]];
        distance = egret.Point.distance(p1,p2);
        return distance;
    }
    private getTouchAngle(): number {
        var ang: number = 0;
        var names = this.touchPoints["names"];
        var p1: egret.Point = this.touchPoints[names[names.length - 1]];
        var p2: egret.Point = this.touchPoints[names[names.length - 2]];
        var radian = Math.atan2((p1.y - p2.y),(p1.x - p2.x));
        ang = 180 / Math.PI * radian;
        return ang;
    }
    
    
}
