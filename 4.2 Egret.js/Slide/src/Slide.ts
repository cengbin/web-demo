/**
 *
 * @author 
 *
 */
class Slide extends egret.Sprite{
    private scrollView: egret.ScrollView;
    private slideContainer: egret.DisplayObjectContainer;
    private currentIndex: number = 0;
    private itemArr: egret.Bitmap[] = [];
    private currentItem: egret.Bitmap;
    private lastItem: egret.Bitmap;
    private lastY: number = 0;
    
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(event:egret.Event){
        this.slideContainer = new egret.DisplayObjectContainer();
        this.addChild(this.slideContainer);

        /*for(var i = 0;i < 10;i++) {
            var bm: egret.Bitmap = this.createBitmapByName("sp" + String(i % 3 + 1));
 //           var bm: egret.Bitmap = this.createBitmapByName("sp2");
            this.slideContainer.addChildAt(bm,0);
            bm.anchorOffsetX=bm.width/2;
            bm.anchorOffsetY=bm.height/2;
            bm.width=600;
            bm.height=400;
            bm.x=this.stage.stageWidth/2;
            bm.y = i * 420 + bm.height/2;
            this.itemArr.push(bm);
            
            if(i==this.currentIndex){
                bm.scaleX = bm.scaleY = 0.8;
            }
        }*/
        var textArr: any[] = [];
        var curInd = 0;
        for(var j = 0;j < 10;j++) {

            var sp: egret.Sprite = new egret.Sprite();
            sp.graphics.beginFill(0xff0000,0.5);
            sp.graphics.drawRect(0,0,50,50);
            sp.graphics.endFill();
            sp.touchEnabled = true;
            this.slideContainer.addChildAt(sp,0);


            var text: egret.TextField = new egret.TextField();
            this.addChild(text);
            text.text = j.toString();
            sp.addChild(text);

            /*var sp: egret.Bitmap = this.createBitmapByName("sp" + String(j % 3 + 1));
            this.slideContainer.addChildAt(sp,0);
            sp.touchEnabled = true;
            sp.anchorOffsetX = sp.width / 2;
            sp.x=this.stage.stageWidth/2;
            sp.width = 600;
            sp.height =        
            textArr.push(sp);*/
        }

        var direction: string = null;
        var startTime: number;
        var startY: number;
        this.slideContainer.touchEnabled = true;
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(event: egret.TouchEvent) {
            var o = event.target;
            o["offset"] = { x: o.x - event.stageX,y: o.y - event.stageY };

            startTime = Date.now();
            startY = event.stageY;

            curInd = textArr.indexOf(o);
        },this);
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_END,function(event: egret.TouchEvent) {
            var o = event.target;

            var distance = event.stageY - startY;
            var time = Date.now() - startTime;

            o["speed"] = distance / time * 15;
            this.currentItem = o;

            console.log("speed:",this.currentItem["speed"]);

            o["offset"] = null;
        },this);

        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(event: egret.TouchEvent) {
            var o: egret.Bitmap = event.target;
            o.y = event.stageY + o["offset"].y;

            if(event.stageY < startY) {//向上滑动
                direction = "up";
            } else {//向下滑动
                direction = "down";
            }

            var s = 0.9;
            for(var i = 0;i < textArr.length;i++) {
                var sp = textArr[i];
                if(direction == "up" && sp.y < 300) {
                    s = 0.9;
                    if(sp.scaleX != s) {
                        egret.Tween.get(sp).to({ scaleX: s,scaleY: s },100);
                    }
                } else if(direction == "down" && sp.y > 150) {
                    s = 1;
                    if(sp.scaleX != s) {
                        egret.Tween.get(sp).to({ scaleX: s,scaleY: s },100);
                    }
                }
            }

        },this);

        this.stage.addEventListener(egret.Event.ENTER_FRAME,function(event: egret.Event) {
            for(var i = curInd;i > 0;i--) {

                var sp = textArr[i - 1];
                var startY = sp.y;
                var endY1 = textArr[i].y - textArr[i].height;
                var slowSpeed = 0.5;

                console.log("direction:",direction);

                sp.y = endY1 - 20;

                /*if(direction=="up"){
                    sp.y = endY1-20;
                }else{
                    sp.y += (endY1 - startY) * slowSpeed - 20;*/
                     
            }
            for(var i = curInd;i < textArr.length - 1;i++) {

                var sp = textArr[i + 1];
                console.log(sp);
                var startY = sp.y;
                var endY2 = textArr[i].y + textArr[i].height;
                var slowSpeed = 0.5;

                if(direction == "up") {
                    sp.y = endY2 - 20;
                } else {
                    sp.y += (endY2 - startY) * slowSpeed + 20;
                }
                //               sp.y += (endY2 - startY) * slowSpeed+20;
            }

            if(this.currentItem) {
                this.currentItem.y += this.currentItem["speed"];

                var subNum = 1;

                var s = 0.9;

                if(this.currentItem["speed"] < 0) {
                    this.currentItem["speed"] += subNum;

                    for(var i = 0;i < textArr.length;i++) {
                        var sp = textArr[i];
                        s = 0.9;
                        if(sp.y < 300) {
                            if(sp.scaleX != s) {
                                egret.Tween.get(sp).to({ scaleX: s,scaleY: s },100);
                            }
                        }
                    }

                } else {
                    this.currentItem["speed"] -= subNum;

                    for(var i = 0;i < textArr.length;i++) {
                        var sp = textArr[i];
                        s = 1;
                        if(sp.y > 150) {
                            if(sp.scaleX != s) {
                                egret.Tween.get(sp).to({ scaleX: s,scaleY: s },100);
                            }
                        }
                    }
                }


                console.log(this.currentItem["speed"]);
                if(Math.abs(this.currentItem["speed"]) <= 1) {
                    this.currentItem["speed"] = null;
                    this.currentItem = null;
                }



            }
        },this);
        return;

        /*for(var i = 0;i < 10;i++) {
            var bm: egret.Bitmap = this.createBitmapByName("sp" + String(i % 3 + 1));
            this.slideContainer.addChildAt(bm,0);
            bm.touchEnabled = true;
            bm.anchorOffsetX = bm.width / 2;
            bm.width = 600;
            bm.height = 400;
            bm.x = this.stage.stageWidth / 2;
            bm.y = this.stage.stageHeight / 2 - i * 30;

            var s = i;
            if(i > 5) {
                s = 5;
                bm.y = this.stage.stageHeight / 2 - s * 30;
            }
            bm.scaleX = bm.scaleY = (10 - s) / 10;
            this.itemArr.push(bm);

        }*/
        /*var self = this;
        setTimeout(function() {
            var blurFliter = new egret.BlurFilter(1,1);
            sky.filters = [blurFliter];

            for(i = 0;i < self.itemArr.length;i++) {
                if(i == 0) {
                    egret.Tween.get(self.itemArr[i]).to({ scaleX: 0.9,scaleY: 0.9,y: i * 420 },800,egret.Ease.circInOut);
                } else {
                    egret.Tween.get(self.itemArr[i]).to({ scaleX: 1,scaleY: 1,y: i * 420 },800,egret.Ease.circInOut);
                }
            }
        },1000);*/



       /*
         
         创建 ScrollView
       this.scrollView= new egret.ScrollView();
       设置滚动内容
       this.scrollView.setContent(this.slideContainer);
       设置滚动区域宽高
       this.scrollView.width = this.stage.stageWidth;
       this.scrollView.height = this.stage.stageHeight;
       this.addChild(this.scrollView);
       
       this.scrollView.addEventListener(egret.Event.CHANGE,this.changeCallback,this);
       */
	}
	
    private onTouchBegin(event: egret.TouchEvent): void {
        //        console.log(this.itemArr.indexOf(event.target));
        var o: egret.Bitmap = event.target;
        o["offset"] = { x: o.x - event.stageX,y: o.y - event.stageY };
    }
    private onTouchMove(event: egret.TouchEvent): void {
        var o: egret.Bitmap = event.target;
        o.y = event.stageY + o["offset"].y;
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
    }
    
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}