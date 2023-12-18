;GAME.GameLoading = function ()
{
    GAME.Scene.call(this);
    var _this = this;
    var _isSceneIn = false;
    var _stage1Container,_bg;
    this.init = function ()
    {
        initStage1();
    }
    this.sceneIn = function ()
    {
        GAME.Scene.prototype.sceneIn.apply(this);
        _isSceneIn = true;
    }
    this.update = function ()
    {
        if (!_isSceneIn)return;
    }
    function initStage1()
    {
        _stage1Container = new PIXI.Container();
        // _stage1Container.position.x = GAME.stageWidth/2;
        // _stage1Container.position.y = GAME.stageHeight/2;
        _this.addChild(_stage1Container);

        _bg = PIXI.Sprite.fromImage("assets/loding/s1_sp1.jpg");
        // _bg.width=GAME.stageWidth;
        // _bg.height=GAME.stageHeight;
        _bg.anchor.set(0,0.5);
        _stage1Container.addChild(_bg);
        _bg.y=GAME.stageHeight/2;

        var loading_c=new PIXI.Sprite.fromImage('assets/loding/s1_loading.png');
        loading_c.anchor.set(0.5,0.5);
        loading_c.x=345;
        loading_c.y=GAME.stageHeight/2;
        _stage1Container.addChild(loading_c);
        tween=TweenMax.to(loading_c,3,{rotation:Math.PI/180*360,ease:Linear.easeNone,repeat:-1});

        var data={
            fontFamily: 'Arial',
            fontSize: 25+"px",
            fill: '#ffffff',

        }
        _txt1= new PIXI.Text("Loading... 0%",data);
        // _txt1.scale.set(0);
        _stage1Container.addChild(_txt1);
        _txt1.x=256;
        _txt1.y=(GAME.stageHeight-_txt1.width)/2;
        _txt1.rotation=Math.PI/180*90;


    }
    var _txt1;
    this.setLoadTxt=function(progress){
        _txt1.text="Loading... "+parseInt(progress)+"%"
    }
    var tween;
    this.sceneOut = function ()
    {
        GAME.Scene.prototype.sceneOut.apply(this);
        tween.kill();
        TweenMax.to(_this, 0.4, {alpha:0,
            onComplete:function(){
                _this.sceneOutComplete()
                if(_this.parent)_this.parent.removeChild(_this);
            }
        });
    }
};
GAME.Utils.inherit(GAME.GameLoading, GAME.Scene);
