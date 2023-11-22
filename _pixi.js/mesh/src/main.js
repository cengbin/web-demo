var view,stage,renderer,gameScene,assetsManager,logo,stats,bg,isLoad=false,load1,load2,loadtxt,_bg,_bg2,laba1,laba2;
var _inputFile;
var winWidth,winHeight;
//if(!GAME.Utils.isWechat()||!GAME.isMobile)GAME.Utils.banPc();//禁止手机微信以外访问
$(function(){
   if(GAME.isbanPc)return;
    // document.addEventListener('touchmove', function(event){event.preventDefault();}, false);

    var video=document.getElementById('video');
    //解决微信浏览器不播放声音的问题
    document.addEventListener("WeixinJSBridgeReady",function() {
        window["WeixinJSBridge"].invoke('getNetworkType',{},function(e) {
            video.play();
            video.pause();

            document.getElementById('jiesuo').play();
            document.getElementById('jiesuo').pause();

            document.getElementById('tankuang').play();
            document.getElementById('tankuang').pause();
        });
    });

    //解码用户的昵称
    window['requestObj']['nickname_zh']=decodeURIComponent(window['requestObj']['nickname']);
    //解码用户头像路径
    window['requestObj']['headImgUrl_en']=decodeURIComponent(window['requestObj']['headImgUrl']);
    //加载用户头像图片
    console.log(JSON.stringify(requestObj));
    window['requestObj']['headImg']=loadImg(window['requestObj']['headImgUrl_en'],function(){
        if(window['requestObj']['uid']){
            console.log("uid:",window['requestObj']['uid']);

            window['$'].ajax({
                url:'http://lab.180china.com/zz/api/index/getInfo',
                type:'POST',
                dataType:'JSON',
                data:{'uid':window['requestObj']['uid']},
                success:function(data){
                    console.log('用户保存信息:',JSON.stringify(data));
                    window['requestObj']['last_nickname']=data.result['nickname'];
                    window['requestObj']['last_nickname_zh']=decodeURIComponent(window['requestObj']['last_nickname']);
                    window['requestObj']['last_headImgUrl']=decodeURIComponent(data.result['headimgurl']);
                    window['requestObj']['last_desktopImgUrl']=data.result['img'];
                    window['requestObj']['last_select_nick']=data.result['nick'];
                    window['requestObj']['last_select_color']=data.result['color'];
                    window['requestObj']['last_select_water']=data.result['water'];

                    Object.assign(friendOption,{
                        "link":"https://zhuan.58.com/activity/zzyywx/authorizewx?callbackUrl=http%3A%2F%2Fm.zhuanzhuan.58.com%2FMzhuanzhuan%2Fzhuanzhuan%2Fzhuanzhuan%2Findex.html?uid="+window['requestObj']['uid'],
                        'title':window['requestObj']['last_nickname_zh']+'刚刚给自己的手机办了一场发布会。',
                        'desc':'速速进场，强势围观。'
                    });
                    Object.assign(timeLineOption,{
                        'link':"https://zhuan.58.com/activity/zzyywx/authorizewx?callbackUrl=http%3A%2F%2Fm.zhuanzhuan.58.com%2FMzhuanzhuan%2Fzhuanzhuan%2Fzhuanzhuan%2Findex.html?uid="+window['requestObj']['uid'],
                        'title':window['requestObj']['last_nickname_zh']+'刚刚给自己的手机办了一场发布会。'
                    });
                    wxShare();

                    window['requestObj']['last_headImg']=loadImg(window['requestObj']['last_headImgUrl'],function(){
                        window['requestObj']['last_desktopImg']=loadImg(window['requestObj']['last_desktopImgUrl'],function(){
                            init();
                            console.log('b用户进入,初始化');
                        });
                    });

                    //console.log(JSON.stringify(window['requestObj']));

                },
                error:function(err){
                    //alert('获取用户信息失败:'+err);
                }
            });
            /*if(!window['requestObj']['last_nickname']){
                window['requestObj']['last_nickname']='上一个用户abcdefg';
            }
            window['requestObj']['last_nickname_zh']=decodeURIComponent(window['requestObj']['last_nickname']);
            if(!window['requestObj']['last_headImgUrl']){
                window['requestObj']['last_headImgUrl']='assets/girlHead.png'
            }
            if(!window['requestObj']['last_desktopImgUrl']){
                window['requestObj']['last_desktopImgUrl']='assets/scene.jpg'
            }
            if(!window['requestObj']['last_select_color']){
                window['requestObj']['last_select_color']='grey';
            }
            if(!window['requestObj']['last_select_nick']){
                window['requestObj']['last_select_nick']='none';
            }
            if(!window['requestObj']['last_select_water']){
                window['requestObj']['last_select_water']='none';
            }*/

        }else{
            init();
            console.log('a用户进入,初始化');
        }
    });
});
function init(){

    winWidth=document.body.clientWidth||document.documentElement.clientWidth;
    winHeight=document.body.clientHeight||document.documentElement.clientHeight;

    $(window).on('resize',resizeCanvas);
    resizeCanvas();

}
function resizeCanvas()
{
    winWidth=document.documentElement.clientWidth||document.body.clientWidth;
    winHeight=document.documentElement.clientHeight||document.body.clientHeight;

    GAME.stageWidth=winWidth/(winWidth/640);
    GAME.stageHeight=winHeight/(winWidth/640);
    console.log('winWidth:',winWidth,'winHeight:',winHeight,'GAME.stageWidth:',GAME.stageWidth,'GAME.stageHeight:',GAME.stageHeight);

    if(winHeight>winWidth && !renderer)
    {
        initPIXI();
    }
}


function initPIXI(){
    console.log('init pixi');
    renderer = new PIXI.Application(GAME.stageWidth, GAME.stageHeight,{transparent: true});

    view=renderer.view;
    view.style.position="absolute";
    view.style.top = '0px';
    view.style.left = '0px';
    document.getElementById("bgcanvas").appendChild(view);

    stage = new PIXI.Container();
    renderer.stage.addChild(stage);

    GAME.renderer = renderer;
    GAME.canvas = view;
    GAME.stage = stage;


    initScene()
    animate();
}

var videoState='';
var gameLoading;
function initScene(){
    gameLoading=new GAME.GameLoading();
    stage.addChild(gameLoading);
    gameLoading.init();
    gameLoading.sceneIn();

    assetsManager=new GAME.AssetsManager();
    assetsManager.onComplete=function()
    {
        console.log("加载完成");
        gameLoading.sceneOut();

        if(window['requestObj']['uid']){
            videoState='2';
            $('#video').attr('src','http://m.zhuanzhuan.58.com/Mzhuanzhuan/zhuanzhuan/zhuanzhuan/resource/media/move2.mp4');

            initScene1();
            initScene2();
            gameScene2.showStage2();
        }else{
            videoState="1";
            // $('#video').attr('src','http://lab.180china.com/zhuanzhuan/resource/media/move.mp4');
            initScene3();

        }
    };
    assetsManager.start();
}
function initScene3(){
    gameScene=new GAME.GameScene3();
    gameScene.addEventListener(GAME.SCENE_OUT,function(e)
    {

        initScene1();

        initScene2();

        $('#video-wrap').css('opacity','1');
        $('#video')[0].play();

    });
    stage.addChildAt(gameScene,0);
    gameScene.init();
    gameScene.sceneIn();
}

var gameScene1;
function initScene1()
{

    gameScene1=new GAME.GameScene1();
    stage.addChild(gameScene1);
    gameScene1.init();
    gameScene1.sceneIn();

    // gameScene1.dati();

    // gameScene.showUpload();

    // gameScene1.initPPT();
    // gameScene1._jingtouBG1();
    // gameScene.ppt_p1();
    // gameScene.ppt_p2();
    // gameScene1.ppt_color();
    // gameScene1.ppt_nick();
    // gameScene.setCopy('nick');
    // gameScene.ppt_water();
    // gameScene1.ppt_compensate();

    // gameScene.ppt_p2();
    // gameScene1.pptMesh('cemian');

}

var gameScene2;
function initScene2()
{
    if(!gameScene2){
        gameScene2=new GAME.GameScene2();
        gameScene2.init();
    }
    stage.addChild(gameScene2);
    gameScene2.sceneIn();

}

function animate()
{
    requestAnimationFrame(animate);
    //renderer.render(stage);
    // GAME.renderer.render(GAME.stage);
    // GAME.renderer.render(stage);
    if(stats)stats.update();
    if(gameScene1)gameScene1.update();
};


function loadImg(url,fun){
    console.log('img url:',url);
    var img=new Image();
    img.onload=function(){
        if(fun)fun();
    }
    img.crossOrigin = 'anonymous';
    img.src=url;
    return img;
}