/**
 *
 * @author 
 *
 */
class ScrollSlow extends egret.Sprite{
    
    
    private slideContainer: egret.DisplayObjectContainer;
    private scrollView: egret.ScrollView;
    private itemArr:any[];
    private lastScrollTop:number=0;
    private curInd:number=0;
    
    
    private direction: string = null;
    private lastTime: number;
    private lastY: number;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(event:egret.Event):void{
    	
        this.slideContainer = new egret.DisplayObjectContainer();
        this.addChild(this.slideContainer);
        this.slideContainer.touchEnabled=true;
        this.slideContainer.touchChildren=true;
        
        var textArr: any[] = [];
        for(var j = 0;j < 4;j++) {

            var sp: egret.Sprite = new egret.Sprite();
            sp.graphics.beginFill(0xff0000,0.5);
            sp.graphics.drawRect(0,0,100,200);
            sp.graphics.endFill();
            sp.touchEnabled = true;
            sp.name=j.toString();
            this.slideContainer.addChildAt(sp,0);
            
            sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(event: egret.TouchEvent) {
                var o = event.target;
                console.log("target name:",o.name);
            },this);

            var text: egret.TextField = new egret.TextField();
            this.addChild(text);
            text.text = j.toString();
            sp.addChild(text);
            textArr.push(sp);
            
        }
        this.itemArr = textArr;
        for(j = 0;j < this.itemArr.length;j++) {
            var sp2 = this.itemArr[j];
            egret.Tween.get(this.itemArr[j]).to({ scaleX: 1,scaleY: 1,y: j * (sp2.height+30) },800,egret.Ease.circInOut);
        }
        

        //创建 ScrollView
        /*this.scrollView = new egret.ScrollView();
        //设置滚动内容
        this.scrollView.setContent(this.slideContainer);
        //设置滚动区域宽高
        this.scrollView.width = this.stage.stageWidth;
        this.scrollView.height = this.stage.stageHeight;
        this.addChild(this.scrollView);
        this.scrollView.touchEnabled=true;

        this.scrollView.addEventListener(egret.Event.CHANGE,this.changeCallback,this);*/

        

        var direction: string = null;
        var startTime: number;
        var startY: number;
        var lastY:number;
        
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(event: egret.TouchEvent) {
            var target=event.target;
            this.curInd = textArr.indexOf(target);
            
            var o = event.currentTarget;
            o["offset"] = { x: o.x - event.stageX,y: o.y - event.stageY };

            startTime = Date.now();
            startY = event.stageY;
            lastY=event.stageY;

        },this);
        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_END,function(event: egret.TouchEvent) {
            var o = event.currentTarget;

            var distance = event.stageY - startY;
            var time = Date.now() - startTime;

            o["speed"] = distance / time * 15;
            this.currentItem = o;

            //console.log("speed:",this.currentItem["speed"]);

            o["offset"] = null;
        },this);

        this.slideContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(event: egret.TouchEvent) {
            var o: egret.Bitmap = event.currentTarget;
            o.y = event.stageY + o["offset"].y;

            if(event.stageY < lastY) {//向上滑动
                direction = "up";
            } else {//向下滑动
                direction = "down";
            }

            var dis = event.stageY - lastY;
            
            if(direction=="up") {//上
                //console.log("up dis:",dis);
                
                
                
                for(var i = this.curInd;i < this.itemArr.length - 1;i++) {
                    var currentTarget = this.itemArr[i];
                    var target = this.itemArr[i + 1];
                    var endY2 = currentTarget.y + currentTarget.height + 30 - this.slideContainer.y;
                    target.y = endY2;
                }
            } else {//下
                /*console.log("down dis:",dis);
                for(var i = this.curInd;i > 0;i--) {
                    var currentTarget = this.itemArr[i];
                    var target = this.itemArr[i - 1];

                    var endY3 = currentTarget.y - currentTarget.height - 30 + dis;
                    target.y = endY3;
                }*/
            }
            lastY = event.stageY;
            
            
        },this);
        
        this.stage.addEventListener(egret.Event.ENTER_FRAME,function(event: egret.Event) {
            return;
            if(direction == "up") {//上
                for(var i = this.curInd;i < this.itemArr.length - 1;i++) {
                    var currentTarget = this.itemArr[i];
                    var target = this.itemArr[i + 1];
                    var startY = target.y;
                    var endY2 = currentTarget.y + currentTarget.height + 30;
                    //console.log(startY,endY2);
                    var slowSpeed=0.5;
                    target.y += (endY2-startY)*slowSpeed;
                }
            } else {//下
                /*for(var i = this.curInd;i > 0;i--) {

                    var currentTarget = this.itemArr[i];
                    var target = this.itemArr[i - 1];

                    var endY1 = currentTarget.y - currentTarget.height - 30;
                    target.y = endY1;
                }*/
            }
      
        },this);
        
        
        /*this.scrollView.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(event: egret.TouchEvent) {
            var o = event.target;
            o["offset"] = { x: o.x - event.stageX,y: o.y - event.stageY };
            
            this.curInd = textArr.indexOf(o);
            
            this.lastTime=Date.now();
            this.lastY=event.stageY;
            
            this.lastScrollTop = this.scrollView.scrollTop;
//            console.log("target name:",o.name);
//            console.log("start lastScrollTop:",this.lastScrollTop);
        },this);
        this.scrollView.addEventListener(egret.TouchEvent.TOUCH_END,function(event: egret.TouchEvent) {
            var o = event.target;
          
        },this);

        this.scrollView.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(event: egret.TouchEvent) {
            //console.log("move");
            for(var i = this.curInd;i < this.itemArr.length - 1;i++) {
                var target = this.itemArr[i + 1];
                var startY = target.y;
                var endY2 = this.itemArr[i].y + this.itemArr[i].height;
                var slowSpeed = 0.5;
                //sp.y += (endY2 - startY) * slowSpeed + 20;
                target.y = (i + 1) * 170 + this.scrollView.scrollTop;
            }
        },this);

        this.stage.addEventListener(egret.Event.ENTER_FRAME,function(event: egret.Event) {
            for(var i = this.curInd;i < textArr.length - 1;i++) {
                var currentTarget = textArr[i];
                var target = textArr[i + 1];
                var startY = target.y;
                var endY2 = currentTarget.y + currentTarget.height;
                var slowSpeed = 0.5;
                var distance = (endY2 - startY) * slowSpeed + 20;
                //console.log(distance);
                target.y += distance;
            }

        },this);*/
        
        
         
  
	}
    private changeCallback(event: egret.Event) {
       
        //console.log(this.scrollView.scrollTop,this.lastScrollTop);
        var dis=this.scrollView.scrollTop-this.lastScrollTop;
//        console.log("dis:"+dis);
        
        if(this.scrollView.scrollTop > this.lastScrollTop){//上
//            console.log("curInd:",this.curInd);
            for(var i = this.curInd;i < this.itemArr.length - 1;i++) {
                var currentTarget = this.itemArr[i];
                var target = this.itemArr[i + 1];
                var endY2 = currentTarget.y + currentTarget.height + 30 + dis;
                //var endY2 = i * (currentTarget.height + 30) +dis;
                target.y = endY2;
            }
        }else{//下
            for(var i = this.curInd;i > 0;i--) {

                var currentTarget = this.itemArr[i];
                var target = this.itemArr[i - 1];
    
                var endY1 = currentTarget.y - currentTarget.height - 30 - dis;
                target.y = endY1;
            }
        }
        
        
        
        this.lastScrollTop = this.scrollView.scrollTop;
        /*for(var i = this.curInd;i > 0;i--) {

            var target = this.itemArr[i - 1];
            var currentTarget = this.itemArr[i];

            var startY = currentTarget.y;
            var endY1 = currentTarget.y - currentTarget.height;
            var slowSpeed = 0.5;
            target.y = endY1 - 20;
        }*/

//        console.log(this.curInd);
       
    }
}