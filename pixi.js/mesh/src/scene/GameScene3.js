GAME.GameScene3 = function ()
{
    GAME.Scene.call(this);
    var _this = this;
    var _isSceneIn = false;
    var _stage1Container,_stage2Container;

    this.init = function ()
    {
        initStage1();
    }
    this.sceneIn = function ()
    {
        GAME.Scene.prototype.sceneIn.apply(this);
        _isSceneIn = true;
        // this.alpha=0;
        // TweenMax.to(this,0.5,{alpha:1});
    }
    this.update = function ()
    {
        if (!_isSceneIn)return;
        //car.rotation+=0.02;

    }
    function initStage1() {

        _stage1Container = new PIXI.Container();
        _this.addChild(_stage1Container);

        var _bg = PIXI.Sprite.fromImage("assets/shouye/bg.jpg");
        _bg.anchor.set(0.5);
        _stage1Container.addChild(_bg);
        _bg.x = GAME.stageWidth / 2;
        _bg.y = GAME.stageHeight / 2;

        var icon_suo=PIXI.Sprite.fromImage("assets/shouye/icon_suo.png");
        _stage1Container.addChild(icon_suo);
        icon_suo.anchor.set(0.5,0.5);
        icon_suo.x=GAME.stageWidth/2;
        icon_suo.y=GAME.stageHeight/2-213;
        icon_suo.alpha=0;
        icon_suo.scale.x=icon_suo.scale.y=0;
        TweenMax.to(icon_suo,1,{alpha:1,delay:0.5,ease:Strong.easeOut});
        TweenMax.to(icon_suo.scale,1.5,{x:1,y:1,alpha:1,delay:0.5,ease:Elastic.easeOut});

        var suo_txt=PIXI.Sprite.fromImage("assets/shouye/suo_txt.png");
        _stage1Container.addChild(suo_txt);
        suo_txt.anchor.set(0.5,0);
        suo_txt.x=GAME.stageWidth/2+50;
        suo_txt.y=GAME.stageHeight/2-93;
        suo_txt.alpha=0;
        TweenMax.to(suo_txt,1.5,{x:GAME.stageWidth/2,alpha:1,delay:1,ease:Strong.easeOut});


        var barView=new PIXI.Sprite();
        _stage1Container.addChild(barView);

        var bar_bg=PIXI.Sprite.fromImage('assets/shouye/bar_bg.png');
        barView.addChild(bar_bg);
        var bar_txt=PIXI.Sprite.fromImage('assets/shouye/bar_txt.png');
        barView.addChild(bar_txt);
        bar_txt.x=114;
        bar_txt.y=39;

        var graphics=new PIXI.Graphics();
        graphics.beginFill(0xff0000,1);
        graphics.drawRect(0,0,270,100);
        barView.addChild(graphics);
        graphics.x=326;
        graphics.scale.x=-1;
        bar_txt.mask=graphics;

        var bar_point=PIXI.Sprite.fromImage('assets/shouye/bar_point.png');
        barView.addChild(bar_point);
        bar_point.anchor.set(0.5);
        bar_point.x=10+51;
        bar_point.y=5+51;
        bar_point.interactive=true;
        bar_point.buttonMode = true;
        bar_point
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
        function onDragStart(event) {
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = event.data;
            this.alpha = 0.8;
            this.dragging = true;



        }

        function onDragEnd() {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;

            bar_point.interactive=false;
            bar_point.buttonMode =false;

            TweenMax.to(bar_point,0.3,{x:245+61,ease:Strong.easeOut,onUpdate:function(){
                var bili=(bar_point.x-61)/245;
                graphics.scale.x=bili-1;
            },onComplete:function(){
                _this.sceneOut();
            }});

            $('#video')[0].play();
            $('#video')[0].pause();
            $('#video')[0].play();

            $("#jiesuo")[0].play();

        }

        function onDragMove() {
            if (this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.x = newPosition.x;
                if(this.x>=245+61){
                    this.x=245+61;
                }
                if(this.x<=61){
                    this.x=61;
                }
                var bili=(this.x-61)/245;
                graphics.scale.x=bili-1;

                // console.log();
                // console.log(bar_point.x-61);
                // this.y = newPosition.y;
            }
        }

        // console.log(bar_bg);
        barView.x=(GAME.stageWidth-377)/2;
        barView.y=GAME.stageHeight-200;

    }
    this.sceneOut = function ()
    {
        GAME.Scene.prototype.sceneOut.apply(this);
        TweenMax.to(_this, 0.5, {alpha:0,ease:Linear.easeNone,onComplete:function(){
                _this.sceneOutComplete();
                if(_this.parent)_this.parent.removeChild(_this);
            }
        });
    }
}

GAME.Utils.inherit(GAME.GameScene3, GAME.Scene);
