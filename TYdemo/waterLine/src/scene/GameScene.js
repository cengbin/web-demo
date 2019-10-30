GAME.GameScene = function ()
{
    GAME.Scene.call(this);
    var _this = this;
    var _isSceneIn = false;
    var _background;
    var lineArr;
    var linesGraphics;
    var ballArr;
    var ballsGraphics;
    var _bottleContainer;
    var _bottle;
    var mouse=new Point(0,0);
    var _gamma=0;

    var uploadBtn;


    this.init = function ()
    {
        _background = PIXI.Sprite.fromFrame("bg.png");
        _background.height = GAME.stageHeight;
        _background.width = GAME.stageWidth;
        this.addChild(_background);
        _background.alpha=0;
        TweenMax.to(_background, 1, { alpha: 1});

        _bottleContainer = new PIXI.DisplayObjectContainer();
        this.addChild(_bottleContainer);

        PerlinNoise.useClassic = true;
        linesGraphics=new PIXI.Graphics();
        _bottleContainer.addChild(linesGraphics);


        _bottle = PIXI.Sprite.fromFrame("bottleMask.png");
        _bottle.anchor.y = 1;
        _bottle.width = GAME.stageWidth;
        _bottle.scale.y = _bottle.scale.x;
        _bottle.position.y= GAME.stageHeight;
        _bottleContainer.addChild(_bottle);

        lineArr=[];
        for (var i=0; i < 4; i++)
        {
            var line=new PerlinLine({x:GAME.stageWidth*0.2,y:GAME.stageHeight-_bottle.height*0.5},{x:GAME.stageWidth*0.8,y:GAME.stageHeight-_bottle.height*0.5});
            lineArr.push(line);
        };


        ballsGraphics=new PIXI.Graphics();
        _bottleContainer.addChild(ballsGraphics);
        ballArr=[];

        _background.interactive = true;
        _background.mousedown = _background.touchstart = function ()
        {
            _background.mousemove = _background.touchmove = function (data)
            {

                var mousePosition = data.getLocalPosition(this.parent);
                for (var i=0; i < lineArr.length; i++)
                {
                    lineArr[i].movePoint(mousePosition.x,mousePosition.y);
                }
            }
        }
        _background.mouseup = _background.touchend  = function (data)
        {
            _background.mousemove = _background.touchmove =null;

            addBall();
        }


        window.addEventListener("deviceorientation",rock,true);
        _isSceneIn = true;



        uploadBtn= PIXI.Sprite.fromFrame("upload.png");
        this.addChild(uploadBtn);
        uploadBtn.position.x=GAME.stageWidth*0.8;
        uploadBtn.interactive = true;
        uploadBtn.click=function ()
        {
            uploadImage(GAME.canvas,0,0,GAME.stageWidth,GAME.stageHeight,GAME.stageWidth/4,GAME.stageHeight/4);
        }
    }

    /**
     *
     * @param _canvas  原图
     * @param _cx  开始剪切的 x 坐标
     * @param _cy  开始剪切的 y 坐标
     * @param _cw  从原图上剪切多宽
     * @param _ch  从原图上剪切多高
     * @param _w  最后生成的图像宽度
     * @param _h  最后生成的图像高度
     */
    function uploadImage(_canvas,_cx,_cy,_cw,_ch,_w,_h)
    {
        $("#imgCanvas").hide();
        var imgCanvas=document.getElementById('imgCanvas');
        imgCanvas.width=_w;
        imgCanvas.height=_h;
        var ctx=imgCanvas.getContext("2d");
        ctx.drawImage(_canvas,_cx,_cy,_cw,_ch,0,0,_w,_h);


        var image = imgCanvas.toDataURL("image/png");
        var imageData = image.substr(22); //去掉 data:image/png;base64,

        //var w=window.open('about:blank','image from canvas');
        //w.document.write("<img src='"+image+"' alt='from canvas'/>");

        $.post("upload.php",imageData,
            function(data)
            {
                //alert("Data Loaded: " + data);
                window.location.replace(data);
            }
        );
    }

    function addBall()
    {
        var ball=new PerlinBall({x:GAME.stageWidth*0.5,y:GAME.stageHeight*0.4});
        ballArr.push(ball);
        TweenMax.to(ball, 2, {r:60});
        TweenMax.to(ball.position, 7, {y:0});
        TweenMax.to(ball, 2, {alpha:0,delay:4,
            onComplete:function()
            {
                ballArr.splice(0,1);
                ball=null;
            }
        });
    }



    function rock(e)
    {
        //ppo.log("beta:"+e.beta+" gamma:"+e.gamma);
        //ppo.log(e.gamma);

        //
        // linesGraphics.rotation+=(-e.gamma*Math.PI/180-linesGraphics.rotation)/4;
        if(e.gamma>-90 && e.gamma<90)
        {
            _gamma+=(-e.gamma*Math.PI/180-_gamma)*0.4;
        }
        for (var i=0; i < lineArr.length; i++)
        {
            lineArr[i].setPoint(
                {
                    x:GAME.stageWidth*0.2,
                    y:GAME.stageHeight*0.5-Math.atan(_gamma)*GAME.stageWidth*0.4
                },
                {
                    x:GAME.stageWidth*0.8,
                    y:GAME.stageHeight*0.5+Math.atan(_gamma)*GAME.stageWidth*0.4
                });
        }
    }

    this.update = function ()
    {
        if (!_isSceneIn)return;
        linesGraphics.clear();
        for (var i=0; i < lineArr.length; i++)
        {
            lineArr[i].update();
            lineArr[i].draw(linesGraphics,GAME.stageHeight);
        }

        ballsGraphics.clear();
        for (var i=0; i < ballArr.length; i++)
        {
            ballArr[i].update();
            ballArr[i].draw(ballsGraphics);
        }
    }





};
GAME.Utils.inherit(GAME.GameScene, GAME.Scene);
