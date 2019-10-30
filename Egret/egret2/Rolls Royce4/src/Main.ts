

class Main extends egret.DisplayObjectContainer {

    
    static STAGE_WIDTH:number;
    static STAGE_HEIGHT:number;
    
    private onLoading: boolean = false;
    private onLoadingComplete: boolean = false;

    private onstart: boolean = false;
    
    //锁屏提示
    private lockScenePrompt: ZBitmap;
    //旋转屏幕提示
    private rotationScenePrompt: RotationUI;
    
    private loadingView:LoadingUI;
    
    private topView: TopUI;
    
    private curScene:Scene;
    
    public constructor() {
        super();
        window["_hmt"].push(['_trackEvent','page','landing']);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        
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
        RES.loadGroup("orientation");
        window["_hmt"].push(['_trackEvent','scene','orientation']);
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        
        if(event.groupName =="orientation"){
            
            /*this.lockScenePrompt = Egr.getZBMP("tips2");
            this.addChild(this.lockScenePrompt);
            this.lockScenePrompt.width = this.stage.stageWidth;
            this.lockScenePrompt.height = this.stage.stageHeight;
            this.lockScenePrompt.touchEnabled = true;
            this.lockScenePrompt.once(egret.TouchEvent.TOUCH_TAP,this.onClickLockScene,this);*/
            //this.lockScenePrompt.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
            
            this.rotationScenePrompt = new RotationUI();
            this.addChild(this.rotationScenePrompt);
            
            this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE,this.onStageOrientation,this);
            this.onStageOrientation(null);
            
        } else if(event.groupName == "loading"){
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.stage.addChildAt(this.loadingView,0);
            this.curScene=this.loadingView;
            RES.loadGroup("preload");
            window["_hmt"].push(['_trackEvent','scene','loadingStart']);
        }else if (event.groupName == "preload") {
            window["_hmt"].push(['_trackEvent','scene','loadingEnd']);
            this.onLoadingComplete=true;
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }
    
    private onStageOrientation(event: egret.Event): void {
        //console.log(this.stage.stageWidth + "---" + this.stage.stageHeight);
        var winWidth = window["innerWidth"];
        var winHeight = window["innerHeight"];
        if(winWidth > winHeight) {
            console.log(this.stage.stageWidth + "---" + this.stage.stageHeight,window["innerWidth"],window["innerHeight"],"横屏");
           
            //this.rotationScenePrompt.show();
            RES.loadGroup("loading");
            Scene.S_W = this.stage.stageWidth;
            Scene.S_H = this.stage.stageHeight;
            return;
        } else {
            console.log(this.stage.stageWidth + "---" + this.stage.stageHeight,window["innerWidth"],window["innerHeight"],"竖屏");
            //this.rotationScenePrompt.hide();
            if(!this.onLoading){
                this.onLoading = true;
                RES.loadGroup("loading");
                
                Scene.S_W = this.stage.stageWidth;
                Scene.S_H = this.stage.stageHeight;
                //console.log(Scene.S_W,Scene.S_H);
            }
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
        //console.log(event.resItem.name);
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    
    
    //点击锁屏提示
    /*public onClickLockScene(event:egret.Event):void{
        egret.Tween.get(this.lockScenePrompt).to({ alpha: 0 },800).call(function() {
            this.onstart = true;
            this.removeChild(this.lockScenePrompt);

            if(this.onLoadingComplete && this.curScene) {
                this.curScene.sceneIn();
            }
        },this);
    }*/


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        
        /*if(!window["bg"])
            window["bg"] = document.getElementById("bg");//alert("play");
        window["bg"].play();*/
        
        
        this.loadingView.screenOut();
        
        this.topView = new TopUI();
        this.addChildAt(this.topView,0);
        
        var s1:Scene1=new Scene1();
        this.addChildAt(s1,0);
        s1.addEventListener(Scene.SCENE_OUT,this.changeScene,this);
        this.curScene=s1;
        s1.sceneIn();
        
        
        /*var s2: Scene2 = new Scene2();
        s2.addEventListener(Scene.SCENE_OUT,this.changeScene,this);
        this.addChildAt(s2,0);
        this.curScene = s2;
        if(this.onstart) {
            this.curScene.sceneIn();
        }*/
        
        /*var s3: Scene3 = new Scene3();
        s3.addEventListener(Scene.SCENE_OUT,this.changeScene,this);
        this.addChildAt(s3,0);*/
        
        /*var s4: Scene4 = new Scene4();
        this.addChildAt(s4,1);*/
        
        return;

    }
    private changeScene(event:egret.Event){
        //console.log(event.target.name);
        switch(event.target.name){
            case "Scene1":
                var s2: Scene2 = new Scene2();
                s2.addEventListener(Scene.SCENE_OUT,this.changeScene,this);
                this.addChildAt(s2,1);
                s2.sceneIn();
            break;
            case "Scene2":
                var s3: Scene3 = new Scene3();
                s3.addEventListener(Scene.SCENE_OUT,this.changeScene,this);
                this.addChildAt(s3,1);
            case "Scene3":
                var s4: Scene4 = new Scene4();
                this.addChildAt(s4,1);
            break;
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static cb(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

   
}


