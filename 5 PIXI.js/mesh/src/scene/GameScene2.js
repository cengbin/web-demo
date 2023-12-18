GAME.GameScene2 = function ()
{
    GAME.Scene.call(this);
    var _this = this;
    var _isSceneIn = false;
    var _bgContainer;
    var _stage1Container,
        _stage2Container,
        _stage3Container;

    var oncickdingzhi=false;

    this.init = function ()
    {
        initStage1();

        dingzhi();
    }
    this.sceneIn = function ()
    {
        GAME.Scene.prototype.sceneIn.apply(this);

        _isSceneIn = true;

        this.alpha=0;
        TweenMax.to(this,3,{alpha:1});
    }
    this.update = function ()
    {
        if (!_isSceneIn)return;
        //car.rotation+=0.02;

    }
    function initStage1() {

        _bgContainer = new PIXI.Container();
        // _stage1Container.x = GAME.stageWidth / 2;
        // _stage1Container.y = GAME.stageHeight / 2;
        _this.addChild(_bgContainer);
        _bgContainer.visible=false;

        // var _bg =new PIXI.Sprite.fromImage();
        // _bg.anchor.set(0.5);
        var _bg = PIXI.Sprite.fromImage("assets/dibi/background.jpg");
        _bg.anchor.set(0.5);
        _bgContainer.addChild(_bg);
        _bg.x = GAME.stageWidth / 2;
        _bg.y = GAME.stageHeight / 2;

    }

    function dingzhi(){
        _stage3Container=new PIXI.Container();
        _this.addChild(_stage3Container);
        _stage3Container.visible=false;

        var dingzhi_bg=PIXI.Sprite.fromImage('assets/dingzhi/opening.jpg');
        _stage3Container.addChild(dingzhi_bg);
        dingzhi_bg.anchor.set(0.5);
        dingzhi_bg.x=GAME.stageWidth/2;
        dingzhi_bg.y=GAME.stageHeight/2;

        var dingzhi_line=PIXI.Sprite.fromImage('assets/dingzhi/line.png');
        _stage3Container.addChild(dingzhi_line);
        dingzhi_line.anchor.set(0.5);
        dingzhi_line.x=GAME.stageWidth/2;
        dingzhi_line.y=GAME.stageHeight/2;

        var btn_dingzhi=PIXI.Sprite.fromImage("assets/dingzhi/word.png");
        _stage3Container.addChild(btn_dingzhi);
        btn_dingzhi.anchor.set(0.5);
        btn_dingzhi.x=GAME.stageWidth/2;
        btn_dingzhi.y=GAME.stageHeight/2;
        btn_dingzhi.interactive=true;
        btn_dingzhi.on('tap',function(event){
            window["_hmt"].push(['_trackEvent', 'button', 'dingzhi']);
            if(!oncickdingzhi)return;
            oncickdingzhi=false;
            TweenMax.to(_this, 0.4, {alpha:0,onComplete:function(){
                if(_stage3Container.parent)_stage3Container.parent.removeChild(_stage3Container);
            }});
            $('#video')[0].play();
        });

    }
    function createSquare(x, y) {
        var square = new PIXI.Sprite(PIXI.Texture.WHITE);
        square.tint = 0xff0000;
        square.factor = 1;
        square.anchor.set(0.5);
        square.position.set(x, y);
        return square;
    }

    this.showStage1=function(){
        //_stage2Container.visible=false;
        _stage3Container.visible=false;
        _bgContainer.visible=true;

        _stage1Container=new PIXI.Container();
        _this.addChild(_stage1Container);

        /*var sharetxt=PIXI.Sprite.fromImage("assets/dibi/sharetxt.png");
        _stage1Container.addChild(sharetxt);
        sharetxt.x=570;
        sharetxt.y=62;*/

        var la=PIXI.Sprite.fromImage("assets/ppt/compensate/logo_02.png");
        _stage1Container.addChild(la);
        la.x=540;
        la.y=GAME.stageHeight/2+284;

        //每一步手机
        var copy1=PIXI.Sprite.fromImage("assets/dibi/W1.png");
        _stage1Container.addChild(copy1);
        copy1.x=385;
        copy1.y=GAME.stageHeight/2-477;

        //上转转第比配，高价买手机
        var word=PIXI.Sprite.fromImage("assets/dibi/W2.png");
        _stage1Container.addChild(word);
        word.x=332;
        word.y=GAME.stageHeight/2-477;
        //富士康联合自检
        var copy2=PIXI.Sprite.fromImage("assets/dibi/W3.png");
        _stage1Container.addChild(copy2);
        copy2.x=292;
        copy2.y=GAME.stageHeight/2-477;


        //一件估价
        var btn1=PIXI.Sprite.fromImage("assets/dibi/btn1.png");
        _stage1Container.addChild(btn1);
        btn1.x=185;
        btn1.y=GAME.stageHeight/2-477;
        btn1.interactive=true;
        btn1.on('tap',function(event){
            window["_hmt"].push(['_trackEvent', 'button', 'gujia']);
            setTimeout(function(){
                window.location.href='http://t.cn/RpPdW8D';
            },300);
        });



        var phone=PIXI.Sprite.fromImage("assets/dibi/phone.png");
        _stage1Container.addChild(phone);
        phone.x=0;
        phone.y=GAME.stageHeight/2-399;

        var img=_inputFile.img;
        //用户的桌面截屏
        var scene=new PIXI.projection.Sprite2d(new PIXI.Texture.from(img));
        phone.addChild(scene);
        scene.x=417;
        scene.y=539;
        var squares2 = [
            createSquare(0, 0),
            createSquare(-14,287),
            createSquare(-714,85),
            createSquare(-645,-182)
        ];
        var quad2 = squares2.map(function(s) { return s.position });
        renderer.ticker.add(function (delta) {
            scene.proj.mapSprite(scene, quad2);
        });

        _this.alpha=0;
        TweenMax.to(_this,3,{alpha:1});

    }
    this.showStage2=function(){

        _stage3Container.visible=false;
        _bgContainer.visible=true;

        _stage2Container=new PIXI.Container();
        _this.addChild(_stage2Container);

        //观看a用户的视频
        var btn1=PIXI.Sprite.fromImage("assets/dibi/btn_guankan.png");
        _stage2Container.addChild(btn1);
        btn1.x=253;
        btn1.y=GAME.stageHeight/2-375;
        btn1.interactive=true;
        btn1.on('tap',function(event){
            TweenMax.to(_this, 0.4, {alpha:0,onComplete:function(){
                if(_stage2Container.parent)_stage2Container.parent.removeChild(_stage2Container);
            }});
            //gameLoading.sceneOut();
            // _this.sceneOut();
            $("#video-wrap").css('opacity','1');
            $('#video')[0].play();
        });

        var img=window['requestObj']['last_headImg']
        var headGirl=PIXI.Sprite.from(img);//PIXI.Texture.from();
        var scale=(84/img.width);
        headGirl.scale.set(scale);
        headGirl.anchor.set(0.5);
        headGirl.rotation=Math.PI/180*90;
        headGirl.x=379+84/2;
        headGirl.y=(GAME.stageHeight/2-372)+84/2;
        _stage2Container.addChild(headGirl);

        var nickname=window['requestObj']['last_nickname_zh'];
        var cas = document.createElement("canvas");
        cas.width=200;
        cas.height=60;
        if(cas.getContext){
            var ctx = cas.getContext("2d");
            ctx.font = "24px normal";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(nickname,0, 24);
            ctx.fillText('的发布会',0, 50);
        }
        var canvasTexture=new PIXI.Texture.fromCanvas(cas);
        var txt=new PIXI.projection.Sprite2d(canvasTexture);
        txt.x=369;
        txt.y=(GAME.stageHeight/2-372);
        txt.rotation= Math.PI/180*90;
        _stage2Container.addChild(txt);

        var phone=PIXI.Sprite.fromImage("assets/dibi/phone.png");
        _stage2Container.addChild(phone);
        phone.x=0;
        phone.y=GAME.stageHeight/2-399;

        var img=window['requestObj']['last_desktopImg'];
        //用户的桌面截屏
        var scene=new PIXI.projection.Sprite2d(new PIXI.Texture.from(img));
        phone.addChild(scene);
        scene.x=417;
        scene.y=539;
        var squares2 = [
            createSquare(0, 0),
            createSquare(-14,287),
            createSquare(-714,85),
            createSquare(-645,-182)
        ];
        var quad2 = squares2.map(function(s) { return s.position });
        renderer.ticker.add(function (delta) {
            scene.proj.mapSprite(scene, quad2);
        });

        _this.alpha=0;
        TweenMax.to(_this,1,{alpha:1});
    }

    this.showDingzhi=function(){
        //_stage2Container.visible=false;
        _bgContainer.visible=false;
        _stage3Container.visible=true;

        _this.alpha=0;
        TweenMax.to(_this,3,{alpha:1,onComplete:function(){
            oncickdingzhi=true;
            $('#video').attr('src','http://m.zhuanzhuan.58.com/Mzhuanzhuan/zhuanzhuan/zhuanzhuan/resource/media/move.mp4');
            videoState='1';
            dian=dian2;
        }});
    }
    this.sceneOut = function ()
    {
        GAME.Scene.prototype.sceneOut.apply(this);
        TweenMax.to(_this, 0.4, {alpha:0,
            onComplete:function(){
                _this.sceneOutComplete()
                if(_this.parent)_this.parent.removeChild(_this);
            }
        });
    }

}

GAME.Utils.inherit(GAME.GameScene2, GAME.Scene);
