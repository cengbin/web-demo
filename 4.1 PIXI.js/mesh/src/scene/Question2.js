/**
 * Created by weibin.zeng on 2017/9/7.
 */
GAME.DaTi2 = function ()
{
    PIXI.Sprite.call(this);

    var _this=this;

    this.init=function(fun){
        var _duiHua=this;
        var _boy=PIXI.Sprite.fromImage('assets/question/q2_a.png');
        _boy.x=345;
        _boy.y=0;
        var _girl=PIXI.Sprite.fromImage('assets/question/q2_b.png');
        _girl.x=242;
        _girl.y=199;
        var img=window['requestObj']['headImg']
        var headGirl=PIXI.Sprite.from(img);
        var scale=(70/img.width);
        headGirl.scale.set(scale);
        headGirl.anchor.set(0.5);
        headGirl.rotation=Math.PI/180*90;
        headGirl.x=12+70/2;
        headGirl.y=380+70/2;
        _girl.addChild(headGirl);

        _duiHua.addChild(_boy,_girl);

        var gou=PIXI.Sprite.fromImage('assets/question/gou.png');
        _duiHua.addChild(gou);
        gou.alpha=0;
        gou.x=0;
        gou.y=0

        var zuobiao=[
            [286,225],
            [286,298],
            [286,427]
        ]

        var btn1=new PIXI.Graphics();
        btn1.interactive=true;
        btn1.name='none';
        btn1.beginFill(0xFF700B, 0.01);
        btn1.drawRect(0,0,65,93);
        _duiHua.addChild(btn1);
        btn1.x=262;
        btn1.y=199;
        btn1.interactive=true;
        btn1.on('tap',function(event){
            if(fun)fun('none');
            gou.x=zuobiao[0][0];
            gou.y=zuobiao[0][1];
            _this.sceneOut();
            gou.alpha=1;
        });

        var btn=new PIXI.Graphics();
        btn.interactive=true;
        btn.name='scar';//划痕
        btn.beginFill(0xFF700B, 0.01);
        btn.drawRect(0,0,65,128);
        _duiHua.addChild(btn);
        btn.x=264;
        btn.y=290;
        btn.interactive=true;
        btn.on('tap',function(event){
            if(fun)fun('scar');
            gou.alpha=1;
            gou.x=zuobiao[1][0];
            gou.y=zuobiao[1][1];
            _this.sceneOut();
        });

        var btn=new PIXI.Graphics();
        btn.interactive=true;
        btn.name='bump';//碰撞
        btn.beginFill(0xFF700B, 0.01);
        btn.drawRect(0,0,65,131);
        _duiHua.addChild(btn);
        btn.x=264;
        btn.y=427;
        btn.interactive=true;
        btn.on('tap',function(event){
            if(fun)fun('bump');
            gou.alpha=1;
            gou.x=zuobiao[2][0];
            gou.y=zuobiao[2][1];
            _this.sceneOut();
        });
    }
    this.sceneOut=function(){
        TweenMax.to(_this,1.5,{x:30,alpha:0,delya:0.3,ease:Strong.easeOut,onComplete:function(){
            if(_this.parent)_this.parent.removeChild(_this);
        }});
    }
}
GAME.Utils.inherit(GAME.DaTi2, PIXI.Sprite);