var view,stage,renderer,loading,gameScene,assetsManager,logo,initTimer;
$(document).ready(function()
{
    document.addEventListener('touchmove', function(event){event.preventDefault();}, false);
    if(GAME.Utils.isAndroid()||!GAME.retinaSupport)
    {
        GAME.imageScale=0.7;
        $("#viewport")[0].content="width=device-width, user-scalable=no, minimum-scale=0.8, maximum-scale=0.8";

        $(window).resize(resizeCanvas);
        setTimeout(resizeCanvas,100);
    }
    else
    {
        GAME.imageScale=1;
        $("#viewport")[0].content="width=device-width, user-scalable=no, minimum-scale=0.5, maximum-scale=0.5";

        document.addEventListener('WeixinJSBridgeReady', onWxBridgeReady);
        initTimer=setTimeout(function()
        {
            document.removeEventListener('WeixinJSBridgeReady', onWxBridgeReady);
            $(window).resize(resizeCanvas);
            resizeCanvas();
        },1500);
    }

});
function onWxBridgeReady()
{
    clearTimeout(initTimer);
    WeixinJSBridge.call('hideToolbar');
    $(window).resize(resizeCanvas);
    setTimeout(resizeCanvas,100);
}
function resizeCanvas()
{
    var winWidth=$(window).get(0).innerWidth;
    var winHeight=$(window).get(0).innerHeight;
    if(winWidth>winHeight)
    {
        $("#landscape").width(winWidth);
        $("#landscape").height(winHeight);
        $("#landscape").show();
        return;
    }
    if(view)
    {
        $("#landscape").hide();
        $("html,body").scrollLeft(0);
        return;
    }
    GAME.stageWidth=winWidth;
    GAME.stageHeight=winHeight;
    init();
    initStatsBar();
}
function initStatsBar()
{
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
};
function init()
{
    view = document.getElementById("canvas");
    view.width=GAME.stageWidth;
    view.height=GAME.stageHeight;
    GAME.canvas = view;

    stage = new PIXI.Stage(0x284c8e, true);
    GAME.stage = stage;

    renderer = new PIXI.CanvasRenderer(GAME.stageWidth, GAME.stageHeight, view);
    GAME.renderer = renderer;
    showLoading();
}


function showLoading()
{
    loading=new GAME.LoadingScene();
    loading.init();
    loading.addEventListener(GAME.SCENE_OUT_COMPLETE,function(e)
    {
        stage.removeChild(loading);
        loading=null;
        initScene();

    });
    stage.addChild(loading);
    loading.sceneIn();

    assetsManager=new GAME.AssetsManager();
    assetsManager.onComplete=function()
    {
        loading.sceneOut();
    };

    //
    assetsManager.start();


    requestAnimFrame(animate);
}
function initScene()
{
    gameScene=new GAME.GameScene();
    stage.addChild(gameScene);

    gameScene.init();
}
function animate()
{
    requestAnimFrame(animate);
    GAME.renderer.render(GAME.stage);
    if(loading)
    {
        loading.update();
        return;
    };
    gameScene.update();

    stats.update();
};

