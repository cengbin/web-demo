//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.setMaxLoadingThread(5);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        
        
        

//window.addEventListener('deviceorientation', handleOrientation);
         
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var sky:egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        
//        return;

        /*var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.1);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        var icon:egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        
        var textfield = new egret.TextField();
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        */

        
        
        
        
        var scrollContaienr:egret.DisplayObjectContainer=new egret.DisplayObjectContainer();
        var bg1: egret.Bitmap = this.createBitmapByName("bg1_jpg");
        scrollContaienr.addChild(bg1);
        var bg2: egret.Bitmap = this.createBitmapByName("bg2_jpg");
        scrollContaienr.addChild(bg2);
        bg2.x=bg1.x+bg1.width;
        var bg3: egret.Bitmap = this.createBitmapByName("bg3_jpg");
        scrollContaienr.addChild(bg3);
        bg3.x = bg2.x + bg2.width;
        var bg4: egret.Bitmap = this.createBitmapByName("bg4_jpg");
        scrollContaienr.addChild(bg4);
        bg4.x = bg3.x + bg3.width;
        this.addChild(scrollContaienr);
//        scrollContaienr.x = -scrollContaienr.width/2+this.stage.stageWidth/2;
        console.log("scrollContainer.width:"+scrollContaienr.width);
        
        var scrollView: egret.ScrollView = new egret.ScrollView();
        scrollView.setContent(scrollContaienr);
        scrollView.width=640;
        scrollView.height=640;
        this.addChild(scrollView);
        scrollView.scrollLeft=scrollContaienr.width/2-scrollView.width/2;
        
        console.log("maxScrollLeft:"+scrollView.getMaxScrollLeft());
        
        
        var label1 = new egret.TextField();
        label1.textColor = 0xffffff;
        label1.text="hello";
        label1.width = stageW;
        label1.size = 24;
        this.addChild(label1);
        
        var label2 = new egret.TextField();
        label2.textColor = 0xffffff;
        label2.text = "hello";
        label2.width = stageW;
        label2.size = 24;
        label2.y=100;
        this.addChild(label2);
        
        let motion = new egret.Motion();
        motion.addEventListener(egret.Event.CHANGE,function(e){
            var speed = e.rotationRate.beta;
            label1.text = speed;
            let num: number;
            if(egret.Capabilities.os == "iOS") {
                num = Math.max(0,scrollView.scrollLeft - speed);
            } else {
                num = Math.max(0,scrollView.scrollLeft - speed * 60);
            }
            scrollView.scrollLeft = Math.min(scrollView.getMaxScrollLeft(),num);
        },this);
        motion.start();
        
        return;
        
        if(window["DeviceMotionEvent"]) {
            if(egret.Capabilities.os =="iOS"){
                window.addEventListener("deviceorientation",deviceMotionHandler,false);
            }else{
                window.addEventListener("devicemotion",handleMotion,true);
            }
            
        }
        var self=this;
        function deviceMotionHandler(event){
            var _alpha=event.alpha;
            label1.text = String(_alpha);
            var _a=180-Math.abs(event.alpha-180);

            if(_alpha<180)_a=-_a;
            if(_a<-70)_a=-70;
            if(_a>70)_a=70;
            
            var bz=_a/70;
            var initX= -scrollContaienr.width / 2 + self.stage.stageWidth / 2;

            scrollContaienr.x = initX + (bz * (scrollContaienr.width / 2 - self.stage.stageWidth));
        }
        function handleMotion(event){
            var acceleration = event.accelerationIncludingGravity;
            label1.text = String(acceleration.z);
            
            label2.text=event.rotationRate.alpha;
        }

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
//        RES.getResAsync("description_json", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


