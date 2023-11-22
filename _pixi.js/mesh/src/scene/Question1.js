/**
 * Created by weibin.zeng on 2017/9/7.
 */
GAME.DaTi = function ()
{
    PIXI.Sprite.call(this);


    var _this=this;
    this.init=function(fun){

        var _duiHua=this;
        var _boy=PIXI.Sprite.fromImage('assets/question/q1_a.png');
        _boy.x=345;
        _boy.y=0;
        var _girl=PIXI.Sprite.fromImage('assets/question/q1_b.png');
        _girl.x=241;
        _girl.y=0;
        var img=window['requestObj']['headImg']
        var headGirl=PIXI.Sprite.from(img);
        var scale=(70/img.width);
        headGirl.scale.set(scale);
        headGirl.anchor.set(0.5);
        headGirl.rotation=Math.PI/180*90;
        headGirl.x=13+70/2;
        headGirl.y=644+70/2;
        _girl.addChild(headGirl);

        _duiHua.addChild(_boy,_girl);

        var gou=PIXI.Sprite.fromImage('assets/question/gou.png');
        _duiHua.addChild(gou);
        gou.alpha=0;
        gou.x=249;
        gou.y=528;

        var zuobiao=[
            [284,34],
            [284,138],
            [284,244],
            [284,354],
            [284,463]
        ]

        var btn1=new PIXI.Graphics();
        btn1.interactive=true;
        btn1.name='0';//金色
        btn1.beginFill(0xFF700B,0.01);
        btn1.drawRect(0,0,60,110);
        _duiHua.addChild(btn1);
        btn1.x=261;
        btn1.y=0;
        btn1.interactive=true;
        btn1.on('tap',function(event){
            gou.alpha=1;
            gou.x=zuobiao[0][0];
            gou.y=zuobiao[0][1];
            if(fun)fun('gold');
            _this.sceneOut();
        });

        var btn=new PIXI.Graphics();
        btn.interactive=true;
        btn.name='';
        btn.beginFill(0xFF700B,0.01);
        btn.drawRect(0,0,60,110);
        _duiHua.addChild(btn);
        btn.x=261;
        btn.y=117;
        btn.interactive=true;
        btn.on('tap',function(event){
            gou.alpha=1;
            gou.x=zuobiao[1][0];
            gou.y=zuobiao[1][1];
            if(fun)fun('black');
            _this.sceneOut();
        });

        btn=new PIXI.Graphics();
        btn.interactive=true;
        btn.name='';
        btn.beginFill(0xFF700B,0.01);
        btn.drawRect(0,0,60,110);
        _duiHua.addChild(btn);
        btn.x=261;
        btn.y=226;
        btn.interactive=true;
        btn.on('tap',function(event){
            gou.alpha=1;
            gou.x=zuobiao[2][0];
            gou.y=zuobiao[2][1];
            if(fun)fun('grey');
            _this.sceneOut();
        });

        btn=new PIXI.Graphics();
        btn.interactive=true;
        btn.name='';
        btn.beginFill(0xFF700B,0.01);
        btn.drawRect(0,0,60,110);
        _duiHua.addChild(btn);
        btn.x=261;
        btn.y=336;
        btn.interactive=true;
        btn.on('tap',function(event){
            gou.alpha=1;
            gou.x=zuobiao[3][0];
            gou.y=zuobiao[3][1];
            if(fun)fun('silver');
            _this.sceneOut();
        });

        btn=new PIXI.Graphics();
        btn.interactive=true;
        btn.name='';
        btn.beginFill(0xFF700B,0.01);
        btn.drawRect(0,0,60,160);
        _duiHua.addChild(btn);
        btn.x=261;
        btn.y=450;
        btn.interactive=true;
        btn.on('tap',function(event){
            gou.alpha=1;
            gou.x=zuobiao[4][0];
            gou.y=zuobiao[4][1];
            if(fun)fun('rose');
            _this.sceneOut();
        });
    }
    this.sceneOut=function(){
        TweenMax.to(_this,1.5,{x:30,alpha:0,delya:0.3,ease:Strong.easeOut,onComplete:function(){
            if(_this.parent)_this.parent.removeChild(_this);
        }});
    }
}
GAME.Utils.inherit(GAME.DaTi, PIXI.Sprite);