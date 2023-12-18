/**
 * Created by weibin.zeng on 2017/9/7.
 */
GAME.DaTi3 = function ()
{
    PIXI.Sprite.call(this);

    var _this=this;
    this.init=function(fun){

        var _duiHua=this;
        var _boy=PIXI.Sprite.fromImage('assets/question/q3_a.png');
        _boy.x=345;
        _boy.y=0;
        var _girl=PIXI.Sprite.fromImage('assets/question/q3_b.png');
        _girl.x=242;
        _girl.y=335;
        var img=window['requestObj']['headImg']
        var headGirl=PIXI.Sprite.from(img);
        var scale=(70/img.width);
        headGirl.scale.set(scale);
        headGirl.anchor.set(0.5);
        headGirl.rotation=Math.PI/180*90;
        headGirl.x=12+70/2;
        headGirl.y=211+70/2;
        _girl.addChild(headGirl);

        _duiHua.addChild(_boy,_girl);

        var gou=PIXI.Sprite.fromImage('assets/question/gou.png');
        _duiHua.addChild(gou);
        gou.alpha=0;
        gou.x=0;
        gou.y=0

        var zuobiao=[
            [283,365],
            [283,443]
        ]

        var btn1=new PIXI.Graphics();
        btn1.interactive=true;
        btn1.name='have';
        btn1.beginFill(0xFF700B, 0.01);
        btn1.drawRect(0,0,50,75);
        _duiHua.addChild(btn1);
        btn1.x=270;
        btn1.y=335;
        btn1.interactive=true;
        btn1.on('tap',function(event){
            if(fun)fun('have');
            gou.alpha=1;
            gou.x=zuobiao[0][0];
            gou.y=zuobiao[0][1];
            _this.sceneOut();
        });

        var btn=new PIXI.Graphics();
        btn.interactive=true;
        btn.name='none';
        btn.beginFill(0xFF700B, 0.01);
        btn.drawRect(0,0,50,88);
        _duiHua.addChild(btn);
        btn.x=270;
        btn.y=411;
        btn.interactive=true;
        btn.on('tap',function(event){
            if(fun)fun('none');
            gou.alpha=1;
            gou.x=zuobiao[1][0];
            gou.y=zuobiao[1][1];
            _this.sceneOut();
        });
    }
    this.sceneOut=function(){
        TweenMax.to(_this,1.5,{x:30,alpha:0,delya:0.3,ease:Strong.easeOut,onComplete:function(){
            if(_this.parent)_this.parent.removeChild(_this);
        }});
    }
}
GAME.Utils.inherit(GAME.DaTi3, PIXI.Sprite);