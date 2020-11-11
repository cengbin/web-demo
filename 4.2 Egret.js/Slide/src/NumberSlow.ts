/**
 *
 * @author 
 *
 */
class NumberSlow extends egret.Sprite{
    
    
    private slideContainer: egret.DisplayObjectContainer;
    private scrollView: egret.ScrollView;
    private itemArr:any[];
    private curInd: number = 0;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(event:egret.Event):void{
    	
        this.slideContainer = new egret.DisplayObjectContainer();
        this.addChild(this.slideContainer);
        
        var textArr: any[] = [];
        for(var j = 0;j < 20;j++) {

            var sp: egret.Sprite = new egret.Sprite();
            sp.graphics.beginFill(0xff0000,0.5);
            sp.graphics.drawRect(0,0,100,200);
            sp.graphics.endFill();
            sp.touchEnabled = true;
            this.slideContainer.addChildAt(sp,0);


            var text: egret.TextField = new egret.TextField();
            this.addChild(text);
            text.text = j.toString();
            sp.addChild(text);
            textArr.push(sp);
            
            
            /*var bm: egret.Bitmap = this.createBitmapByName("sp" + String(j % 3 + 1));
            //var bm: egret.Bitmap = this.createBitmapByName("sp2");
            this.slideContainer.addChildAt(bm,0);
            bm.width = 600;
            bm.height = 400;
            bm.touchEnabled = true;
            textArr.push(bm);*/
            
        }
        this.itemArr=textArr;

        var direction: string = "up";
        var startTime: number;
        var startY: number;
        this.slideContainer.touchEnabled = true;
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(event: egret.TouchEvent) {
            var o = event.target;
            o["offset"] = { x: o.x - event.stageX,y: o.y - event.stageY };

            startTime = Date.now();
            startY = event.stageY;

            this.curInd = textArr.indexOf(o);
            startObj = o;
        },this);
        var startObj=null;
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_END,function(event: egret.TouchEvent) {
            var o = event.target;

            var distance = event.stageY - startY;
            var time = Date.now() - startTime;

            o["speed"] = distance / time * 15;
            this.currentItem = o;

            //console.log("speed:",this.currentItem["speed"]);

            o["offset"] = null;
            startObj=null;
        },this);

        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(event: egret.TouchEvent) {
            var o: egret.Bitmap = event.target;
            //console.log(o["offset"].y);
            if(o == startObj){
                o.y = event.stageY + o["offset"].y;

                if(event.stageY < startY) {//向上滑动
                    direction = "up";
                } else {//向下滑动
                    direction = "down";
                }
            }
            startY=event.stageY;
        },this);

        this.stage.addEventListener(egret.Event.ENTER_FRAME,function(event: egret.Event) {
            for(var i = this.curInd;i > 0;i--) {

                var target = textArr[i - 1];
                var currentTarget=textArr[i];
                
                var startY = target.y;
                var endY1 = currentTarget.y - currentTarget.height -20;
                var slowSpeed = 0.5;

                if(direction=="up"){
                    target.y = endY1;
                }else{
                    target.y += (endY1 - startY) * slowSpeed;
                }
                     
            }
            for(var i = this.curInd;i < textArr.length - 1;i++) {

                var sp = textArr[i + 1];
                var startY = sp.y;
                var endY2 = textArr[i].y + textArr[i].height + 20;
                var slowSpeed = 0.5;

                if(direction == "up") {
                    sp.y += (endY2 - startY) * slowSpeed;
                    
                } else {
                    sp.y = endY2;
                }
            }

        },this);
        
	}
    private changeCallback(event: egret.Event) {
        /*var s = 0.8;//0.8 向上滑动   1 向下滑动
        (this.scrollView.scrollTop > this.lastScrollTop)? s = 0.9 : s=1;
        var index: number = (Math.floor((this.scrollView.scrollTop - 1) / 420) + 1);
        if(this.itemArr[index].scaleX != s) {
            egret.Tween.get(this.itemArr[index]).to({ scaleX: s,scaleY: s },100);
        }
        this.lastScrollTop=this.scrollView.scrollTop;
        return;*/
        
        /*for(var i = this.curInd;i > 0;i--) {

            var target = this.itemArr[i - 1];
            var currentTarget = this.itemArr[i];

            var startY = currentTarget.y;
            var endY1 = currentTarget.y - currentTarget.height;
            var slowSpeed = 0.5;
            target.y = endY1 - 20;
        }*/
        for(var i = this.curInd;i < this.itemArr.length - 1;i++) {
            var sp = this.itemArr[i + 1];
            var startY = sp.y;
            var endY2 = this.itemArr[i].y + this.itemArr[i].height;
            var slowSpeed = 0.5;
            sp.y += (endY2 - startY) * slowSpeed + 20;
        }
    }
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
