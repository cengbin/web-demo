/**
 *
 * @author 
 *
 */
class Egr {
    
    public static getZBMP(value: string): ZBitmap {
        return new ZBitmap(RES.getRes(value));
    }
    
    public static getSHC():egret.Shape {
        var shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawCircle(0,0,100);
        shape.graphics.endFill();
       return shape;
    }

    public static getSHRR(): egret.Shape {
        var shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRoundRect(100,100,100,100,10,10);
        shape.graphics.endFill();
        return shape;
    }

    public static getSHR(color,x,y,width,height,alpha?:any): egret.Shape {
        var shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color,alpha);
        shape.graphics.drawRect(x,y,width,height);
        shape.graphics.endFill();
        return shape;
    }
}
