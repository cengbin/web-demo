/**
 *
 * @author 
 *
 */
class Foreground extends egret.DisplayObjectContainer{
	public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(event:egret.Event){
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
	public fill(name,count,vx){
        var cbm: egret.Bitmap;
        for(var i: number = 1;i <= count;i++) {
            var bitmap: egret.Bitmap = new egret.Bitmap(RES.getRes(name + i + "_png"));
            this.addChild(bitmap);
            bitmap["vx"] = vx;

            if(cbm)
                bitmap.x = cbm.x + cbm.width;
            else
                bitmap.x = 0;

            cbm = bitmap;

            this.bms.push(bitmap);
        }
	}
    private bms: egret.Bitmap[] = [];
    private onEnterFrame(event: egret.Event) {
        for(var i: number = 0;i < this.bms.length;i++) {
            this.bms[i].x += this.bms[i]["vx"];
        }
    }
}
