/**
 *
 * @author 
 *
 */
class TextEffect2 extends egret.Sprite{
    private data:any;
	public constructor(o) {
    	super();
    	this.data=o;
    	this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        
	}
    private onAddToStage(event:egret.Event):void{
        
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
            this.addChild(t);
            t.text = texts[i];
            t.rotation = 90;
            t.anchorOffsetX = t.width / 2;
            t.anchorOffsetY = t.height / 2;
            t.alpha = 0;
            
            
            if(i != 0) {
                
                if(bo){
                    t.x = textArr[i - 1].x - textArr[i - 1].height - 6 - last_x - mg_right;
                    t.y = textArr[i - 1].y - last_y - 15;
                }else{
                    t.x = textArr[i - 1].x - textArr[i - 1].height - 6;
                    t.y = textArr[i - 1].y;
                }
                
            }
            
            var rd1 = Math.random() * 1500;
            var rd2 = Math.random() * 500 + 1500;
            egret.Tween.get(t).wait(rd1)
                .to({ alpha: 1 },rd2);
                
            egret.Tween.get(this).wait(show+3500).to({ alpha: 0 },rd2);
                
            textArr.push(t);
        }
    }
}
