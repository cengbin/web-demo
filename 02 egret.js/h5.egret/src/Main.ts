
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
    
    private scene:Scene;

    public constructor() {
        super();
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
        RES.loadGroup("loading");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        
        if(event.groupName=="loading"){
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);

            RES.loadGroup("preload");
        }else if (event.groupName == "preload") {
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
            if(event.resItem.type=="sound"){
                
            }
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var sky:egret.Bitmap = Egr.getZBMP("bg_jpg");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        
        SoundEngine.getInstance().play("bg_mp3");
        
        
        setTimeout(function(){
            SoundEngine.getInstance().mute=true;
        },3000);
        
        setTimeout(function() {
            SoundEngine.getInstance().mute = false;
        },6000);
        
        this.scene = new Scene1();
        this.scene.addEventListener(Scene.SCENE_IN_COMPLETE,this.onSceneInComplete,this);
        this.scene.addEventListener(Scene.SCENE_OUT_COMPLETE,this.onSceneOutComplete,this);
        this.addChild(this.scene);
        this.scene.sceneIn();

        let topUi=new TopUI();
        this.addChild(topUi);
    }
    private onSceneInComplete(event:egret.Event):void{
        
    }
    private onSceneOutComplete(event:SceneEvent):void{
        console.log("param:",event.param);
        this.removeChild(this.scene);
        this.scene = null;
        
        switch(event.param){
            case "Scene1":
                this.scene = new Scene2();
                this.scene.addEventListener(Scene.SCENE_OUT_COMPLETE,this.onSceneOutComplete,this);
                this.addChild(this.scene);
                this.scene.sceneIn();
                break;
            case "Scene2":
                this.scene = new Scene3();
                this.scene.addEventListener(Scene.SCENE_OUT_COMPLETE,this.onSceneOutComplete,this);
                this.addChild(this.scene);
                this.scene.sceneIn();
                break;
            default:
                
            break;
        }
    }

}

