/**
 *
 * @author 
 *
 */
class ZBitmap extends egret.Bitmap{
	public constructor(value?:egret.BitmapData | egret.Texture) {
        super(value);
	}
	public setTransform(aox?:number,aoy?:number,x?:number,y?:number):ZBitmap{
    	
        this.anchorOffsetX = aox || 0;
        this.anchorOffsetY = aoy || 0;

        this.x = x || 0;
        this.y = y || 0;
        
//        this.scaleX = scaleX == null ? 1 : scaleX;
//        this.scaleY = scaleY == null ? 1 : scaleY;
//        this.rotation = rotation || 0;
//        this.skewX = skewX || 0;
//        this.skewY = skewY || 0;
//        this.regX = regX || 0;
//        this.regY = regY || 0;
        
        return this;
	}
}
