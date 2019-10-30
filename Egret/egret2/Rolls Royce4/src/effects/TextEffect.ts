/**
 *
 * @author 
 *
 */
class TextEffect extends egret.Sprite{
    private data:any;
	public constructor(o) {
    	super();
    	this.data=o;
    	this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        
	}
    private onAddToStage(event:egret.Event):void{
        var textArr = [];
        var margin_top=0;
        var br_bottom=0;
        var br_right=0;
        var br_num=0;
        for(var i = 0;i < this.data.length;i++) {
            
            var br = this.data.br;
            var bo=false;
            if(br){
                for(var j = 0;j<br.length;j++){
                    
                    if(i == br[j][0]){
                        bo=true;
                        br_num = br[j][0];
                        margin_top=br[j][1];
                        
                        br_bottom = textArr[i - 1].x - textArr[i - 1].width - 5;
                        //console.log("br_bottom:",br_bottom);
                        br_right=textArr[i-1].y-textArr[i-1].height;
                        //console.log("br_num%d,margin_top:%d,br_top%d,br_right%d",br_num,margin_top,br_top,br_right);
                    }
                }
            }
            
            var key = this.data.key + i.toString() +"_png";
            //console.log(key);
            var t = Egr.getZBMP(key);
            t.setTransform(t.width/2,t.height/2);
            t.rotation=90;
            this.addChild(t);
            t.alpha = 0;
            if(i == 0) {
                t.y = 0;
            } else {
                if(br_num){
                    t.y = br_right;
                    if(bo){
                        t.x = textArr[i - 1].x - textArr[i - 1].width - 5 - br_bottom - margin_top;
                    }else{
                        t.x = textArr[i - 1].x - textArr[i - 1].width - 5;
                    }
                    
                }else{
                    t.x = textArr[i - 1].x - textArr[i - 1].width - 5;
                }
                
            }
            
            var rd = Math.random() * 500 + 1500;
            egret.Tween.get(t).wait(Math.random() * 1500)
                .to({ alpha: 1 },rd)
                .wait(1500).to({alpha:0},rd);
            textArr.push(t);
        }
    }
}
