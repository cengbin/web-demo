/**
 *
 * @author 
 *
 */
class TextEffect2 extends egret.Sprite{
    private data:any;
    private s:boolean;
    private c:string="";
    private view:egret.DisplayObjectContainer;
	public constructor(o,s,c?) {
    	super();
    	this.data=o;
    	this.s=s;
    	if(c){
    	    this.c=c;
    	}else{
    	    this.c="";
    	}
    	this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        
	}
    private onAddToStage(event:egret.Event):void{
        
        this.view=new egret.DisplayObjectContainer();
        this.addChild(this.view);
        
        var texts= this.data.text.split("");
        var font: egret.BitmapFont = RES.getRes(this.data.source);
        //console.log(texts);
        
        var textArr=[];
        var mg_right=0;
        var last_x=0;
        var last_y=0;
        
        var show=this.data.showTime||1500;
        var br = this.data.br;
        
        for(var i = 0;i < texts.length;i++) {
            
           
            var bo=false;
            if(br){
                for(var j = 0;j<br.length;j++){
                    
                    if(i == br[j][0]){
                        bo=true;
                        mg_right=br[j][1];
                        
                        last_x = textArr[i - 1].x - textArr[i - 1].width - 7;
                        last_y = textArr[i - 1].height;
                        //console.log("i:%d,mg_right:%d,last_x%d,last_y%d",i,mg_right,last_x,last_y);
                    }
                }
            }
            
            
            var t: egret.BitmapText = new egret.BitmapText();
            t.font = font;
            this.view.addChild(t);
            t.text = texts[i];
            if(this.c==""){
                t.width = 30;
                t.height = 30;
            }
            t.rotation = 90;
            t.anchorOffsetX = t.width / 2;
            t.anchorOffsetY = t.height / 2;
            if(this.c == "") {
                t.scaleX = t.scaleY = 30 / 41;
            }
            t.alpha = 0;
            
            /*var distance: number = 6;           /// 阴影的偏移距离，以像素为单位
            var angle: number = 45;              /// 阴影的角度，0 到 360 度
            var color: number = 0x000000;        /// 阴影的颜色，不包含透明度
            var alpha: number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
            var blurX: number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
            var blurY: number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            var strength: number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
            var quality: number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
            var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
            var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
            var dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(distance,angle,color,alpha,blurX,blurY,
                strength,quality,inner,knockout);
                t.filters=[dropShadowFilter];*/
            
            
            if(i != 0) {
                
                if(bo){
                    t.x = textArr[i - 1].x - textArr[i - 1].height - 6 - last_x - mg_right;
                    t.y = textArr[i - 1].y - last_y - 15;
                }else{
                    t.x = textArr[i - 1].x - textArr[i - 1].height - 6;
                    t.y = textArr[i - 1].y;
                }
                
            }
            
            var rd1 = Math.random() * 1000;
            var rd2 = Math.random() * 500 + 1000;
            egret.Tween.get(t).wait(rd1)
                .to({ alpha: 1 },rd2);
                
            textArr.push(t);
        }
        //console.log("show:"+show);
        if(this.s)
            egret.Tween.get(this.view).wait(show + 2500).to({ alpha: 0 },1000);
    }
}
