GAME.GameScene1 = function ()
{
    GAME.Scene.call(this);
    var _this = this;
    var _userData={
        'nikename':'鲸鱼chuck',
        'headImgUrl':'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIibHplsbM8iao6R1nwsQJicGASTjEqGx8h0VJBupv7bcTDY19yr2K6ibyNJDPalEVp24OCmqxnScibwBQ/0',
        'opendId':''
    }
    var color_copy={
        'black':['看这黑色 经过一年摩擦 指纹提取器失效了\n变成了划痕展示机','唔 是黑色 不管高亮黑哑光黑 最后都黑的发灰'],
        'grey':['比如这部手机 以前是灰 现在是很多灰…','让我们看看这手机 恩 它现在是流行的奶奶灰'],
        'gold':['你的手机以前是荣耀黄金 现在进化成了至尊铂金','看它 一寸光阴带走一寸金 现在只剩一点金'],
        'silver':['我一直很喜欢银色 因为用的再久 你也看不出来','看这手机 每天都被摩擦摩擦 现在是我的反光镜'],
        'rose':['玫瑰金自动升级粉粉玫瑰金 恩 这真是一次重大突破\n手动滑稽','玫瑰金给我灵感 所以这次隆重推出 - 腮红金！惊不惊喜']
    }
    var nick_copy={
        'bump':['它抵抗不了地心引力的诱惑 时不时飞向地板 楼梯 街道…','看这些坑洼的边缘 我猜它的主人不是手上抹了油\n就是马路低头族'],
        'scar':['有个划痕 多么动人 见证了它曾经的一次飞翔\n额 还有落地','哦 它经历了什么 伤痕累累 可能这手机是社会人 \n不 社会机'],
        'none':['唔 很完美的不是么 时间没有给它留下疤痕\n说明买个套是明智的 ',' 啊 就跟新的一样 它的主人平时没少给它做面膜吧'],
    }
    var water_copy={
        'have':['不难看出 这部手机很爱游泳。','看 应该是掉进过厕所 我猜它的主人一定喜欢坐在马桶上刷脸书','看它经历过大浪大风 大浪来自马桶 大风来自吹风机'],
        'none':['居然没经过水的洗礼 很好\n我建议它的主人多带着它上上厕所 总会有机会的','你知道我们特意让它能防水 可惜它没享受过潜水的感觉','一次水都没进过？它一定来自我们塔克拉玛干的用户']
    }
    var _userSelect={
        'color':'black',// 金色、银色、玫瑰金、深空灰色 //gold silver rose grey
        'nick':'none',//none无磕碰 bump磕碰磕碰  scar划痕划痕
        'water':'none'//进水 是、否 have none
    };

    var _hintText=new PIXI.Text();
    this.init = function ()
    {
        _inputFile=new InputFile('file');
        _inputFile.init();
        _inputFile.changeComplete=function(fileRender,img){
            //console.log(fileRender,img);
            //var photo = new PIXI.projection.Sprite2d(PIXI.Texture.from(img));
            //photo.anchor.set(0.5);
            // iphonec.addChild(photo);
            //photo.scale.set(0.5);
            // photo.x=523/2;
            // photo.y=257/2;
            // iphonec.interactive=false;

            // TweenMax.to(photo.scale, 1, { x: 0.5,y:0.5,ease:Strong.easeOut,delay:0.2});
            //TweenMax.to(iphonec, 1, { alpha:0,ease:Strong.easeOut,delay:0.2});
            iphonec.interactive=false;
            TweenMax.to(uploadContainer, 1, { alpha:0,ease:Strong.easeOut,delay:0.2,onCompelte:function(){
                if(uploadContainer.parent)uploadContainer.parent.removeChild(uploadContainer);
            }});

            //发送用户数据
            var base64=fileRender.result.substr(0);
            var data={
                'openid':requestObj['userId'],
                'userToken':requestObj['userToken'],
                'headimgurl':requestObj['headImgUrl'],
                'nickname':requestObj['nickname'],
                'color':_userSelect['color'],
                'nick':_userSelect['nick'],
                'water':_userSelect['water'],
                'img':base64
            }
            //console.log(data);
            window['$'].ajax({
                url:'http://lab.180china.com/zz/api/index/saveInfo',
                type:'POST',
                dataType:'JSON',
                data:data,
                success:function(data){
                    //console.log('保存用户选项:',JSON.stringify(data));
                    window["_hmt"].push(['_trackEvent', 'button', 'updateSuccess']);
                    if(data['code']==2000){
                        Object.assign(friendOption,{
                            "link":"https://zhuan.58.com/activity/zzyywx/authorizewx?callbackUrl=http%3A%2F%2Fm.zhuanzhuan.58.com%2FMzhuanzhuan%2Fzhuanzhuan%2Fzhuanzhuan%2Findex.html?uid="+data.result.uid,
                            'title':window['requestObj']['nickname_zh']+'刚刚给自己的手机办了一场发布会。',
                            'desc':'速速进场，强势围观。'
                        });
                        Object.assign(timeLineOption,{
                            'link':"https://zhuan.58.com/activity/zzyywx/authorizewx?callbackUrl=http%3A%2F%2Fm.zhuanzhuan.58.com%2FMzhuanzhuan%2Fzhuanzhuan%2Fzhuanzhuan%2Findex.html?uid="+data.result.uid,
                            'title':window['requestObj']['nickname_zh']+'刚刚给自己的手机办了一场发布会。'
                        });
                        wxShare();
                    }
                },
                error:function(err){

                }
            });

            _this.scLoading();
        }

        var data={
            fontFamily: 'SimHei',
            fontSize: 31+"px",
            fill: '#ffffff',
            align: 'center',
            padding:10,
            lineHeight:40,
            letterSpacing:2,//字母之间的间距量，默认为0
            fontWeight:'lighter'
            // fontVariant:'small-caps'
        }

        _hintText= new PIXI.Text("",data);
        _this.addChild(_hintText);
        _hintText.x=66;
        _hintText.rotation=Math.PI/180*90;
        // _this.setCopy('nick');
    }
    this.setCopy=function(pro){
        _hintText.x=66;
        if(pro=='color'){
            var random=Math.floor(Math.random()*2);
            _hintText.text=color_copy[_userSelect['color']][random];
            if((_userSelect['color']=='rose' && random==0) || _userSelect['color']=='black' &&random==0)
            {
                _hintText.x=95;
            }
        }else if(pro=='nick'){
            var random=Math.floor(Math.random()*2);
            //alert('pro');
            console.log('nick:',_userSelect['nick'],random);
            console.log('nick_copy:',nick_copy[_userSelect['nick']]);
            _hintText.text=nick_copy[_userSelect['nick']][random];
            if((_userSelect['nick']=='bump' && random==1)
                || (_userSelect['nick']=='scar')
                || (_userSelect['nick']=='none' && random==0)
                || (_userSelect['water']=='none' && random==0)
            )
            {
                _hintText.x=95;
            }
        }else if(pro=='water'){
            var random=Math.floor(Math.random()*3);
            _hintText.text=water_copy[_userSelect['water']][random];
            if((_userSelect['water']=='none' && random==0))
            {
                _hintText.x=95;
            }
        }else{
            _hintText.text='';
        }
        _hintText.y=(GAME.stageHeight-_hintText.width)/2;

    }


    this.sceneIn = function ()
    {
        GAME.Scene.prototype.sceneIn.apply(this);

        //this.dati();
    }

    this.show=function(name){
        console.log('task name:',name);
        this[name]();
    }

    var datiContainer;
    this.dati=function(){



        datiContainer = new PIXI.Container();
        _this.addChild(datiContainer);
        datiContainer.alpha=0;
        TweenMax.to(datiContainer, 1, { alpha:1,ease:Strong.easeIn,delay:0});

        var _bg = PIXI.Sprite.fromImage("assets/s1/a.jpg");
        _bg.width = GAME.stageWidth;
        _bg.height = GAME.stageHeight;
        datiContainer.addChild(_bg);

        $("#tankuang")[0].play();
        var _duiHua=new GAME.DaTi();
        datiContainer.addChild(_duiHua);
        _duiHua.init(function(color){
            _userSelect['color']=color;

            datiContainer.addChild(_duiHua2);
            _duiHua2.alpha=0;
            _duiHua2.x=-30;
            TweenMax.to(_duiHua2,1.5,{x:0,alpha:1,delay:0.5,onStart:function(){
                $("#tankuang")[0].play();
            }});
            _duiHua2.y=(GAME.stageHeight-_duiHua2.getBounds().height)/2;
        });
        _duiHua.y=(GAME.stageHeight-_duiHua.getBounds().height)/2;

        var _duiHua2=new GAME.DaTi2();
        _duiHua2.init(function(event){

            _userSelect['nick']=event;

            datiContainer.addChild(_duiHua3);
            _duiHua3.alpha=0;
            _duiHua3.x=-30;
            TweenMax.to(_duiHua3,1.5,{x:0,alpha:1,delay:0.5,onStart:function(){
                $("#tankuang")[0].play();
            }});
            _duiHua3.y=(GAME.stageHeight-_duiHua3.getBounds().height)/2;
        });


        var _duiHua3=new GAME.DaTi3();
        _duiHua3.init(function(event){
            _userSelect['water']=event;

            console.log(JSON.stringify(_userSelect));
            TweenMax.to(datiContainer, 1, { alpha:0,ease:Strong.easeIn,onComplete:function(){
                _this.removeChild(datiContainer);
            }});

            $('#video')[0].play();
        });

        /*setTimeout(function(){
            _this.removeChild(datiContainer);
            $('#video')[0].play();
        },2000);*/

    }


    var uploadContainer;
    var iphonec,
        _upload_txt;
    this.showUpload=function(){

        uploadContainer = new PIXI.Container();
        _this.addChild(uploadContainer);
        uploadContainer.alpha=0;
        TweenMax.to(uploadContainer, 1, { alpha:1,ease:Strong.easeIn});

        var _bg = PIXI.Sprite.fromImage("assets/s1/a.jpg");
        _bg.width = GAME.stageWidth;
        _bg.height = GAME.stageHeight;
        uploadContainer.addChild(_bg);

        var _txt=PIXI.Sprite.fromImage('assets/s1/upload_txt.png');
        uploadContainer.addChild(_txt);
        _txt.x=336;
        _txt.y=GAME.stageHeight/2-425;
        _upload_txt=_txt;



        iphonec=new PIXI.Sprite.fromImage('assets/s1/s1_iphone.png')
        uploadContainer.addChild(iphonec);
        iphonec.interactive=true;
        iphonec.on('tap',function(event){
            //console.log(event.currentTarget);
            _inputFile.input.click();
        });
        iphonec.anchor.set(0.5);
        iphonec.x=GAME.stageWidth/2;
        iphonec.y=GAME.stageHeight/2+274;

        var hand=PIXI.Sprite.fromImage('assets/s1/hand.png');
        iphonec.addChild(hand);
        hand.anchor.set(0.5);
        hand.scale.set(1.3);
        hand.x=-165;
        hand.y=45;
        hand.alpha=0;
        handtween=TweenMax.to(hand, 1,{alpha:1,x:-115,delay:1.5, repeat:-1, yoyo:true, onRepeat:function(){}, repeatDelay:1, ease:Linear.easeNone});
        // _this.scLoading();
    }
    var handtween;

    var loadingContainer=new PIXI.Container();
    this.scLoading=function(){

        if(handtween)handtween.kill();



        _this.addChild(loadingContainer);

        var loading_txt=PIXI.Sprite.fromImage('assets/s1/s1_loadingtxt.png');
        loading_txt.anchor.set(0,0.5);
        loading_txt.x=230;
        loading_txt.y=GAME.stageHeight/2;
        loadingContainer.addChild(loading_txt);

        var loading=PIXI.Sprite.fromImage('assets/loding/s1_loading.png');
        loading.x=353;
        loading.y=GAME.stageHeight/2;
        loadingContainer.addChild(loading);
        loading.anchor.set(0.5,0.5);
        var tween=TweenMax.to(loading,3,{rotation:Math.PI/180*360,ease:Linear.easeNone,repeat:-1});

        setTimeout(function(){
            tween.kill();
            /*TweenMax.to(uploadContainer, 0.5, { alpha:0.5,ease:Strong.easeOut,onComplete:function(){

            }});*/
            TweenMax.to(loadingContainer, 0.5, { alpha:0,ease:Strong.easeOut,onComplete:function(){
                _this.removeChild(loadingContainer);
            }});
            $('#video')[0].play();
        },2000);

    }

    var pptContainer;
    var pptMask;
    this.initPPT=function(){
        //this._jingtouBG1();

        if(videoState=='2'){//播放上一个用户的视频，显示上一个用户自己选择的颜色
            _userSelect={
                'color':window['requestObj']['last_select_color'],
                'nick':window['requestObj']['last_select_nick'],
                'water':window['requestObj']['last_select_water']
            }
        }

        if(!pptContainer){
            pptContainer=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/bacgroundGrayFrame.png'));
            pptContainer.x=165;
            pptContainer.y=GAME.stageHeight/2-443;
            this.addChildAt(pptContainer,0);
            pptContainer.addChild(getSp2d('assets/ppt/bacgroundGrayFrame.png'));

            pptMask=new PIXI.Graphics();
            this.addChildAt(pptMask,1);
            pptContainer.mask=pptMask;
        }
        pptContainer.alpha=1;
        pptUpdate=true;
        this.pptMesh('zhengmian');
    }
    var pptUpdate=false;
    this.update=function(){
        //console.log('initppt:',initppt);
        if(pptUpdate){
            pptContainer.proj.mapSprite(pptContainer, quad);
        }
    }


    var ppt1View;
    this.ppt_p1=function(){
        ppt1View=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/definition/BG.jpg'));
        pptContainer.addChildAt(ppt1View,0);

        ppt1View.alpha=0;
        TweenMax.to(ppt1View,1,{alpha:1,ease:Strong.easeOut});

        var copy=getSp2d('assets/ppt/definition/copy.png');
        ppt1View.addChild(copy);
        copy.x=183;
        copy.y=130;
        copy.alpha=0;
        TweenMax.to(copy,1,{alpha:1,y:112,delay:0.5,ease:Linear.none});

    }
    var ppt2View;
    this.ppt_p2_chang=function(state){
        if(state=='show'){
            ppt2View.alpha=0;
            TweenMax.to(ppt2View,0.3,{alpha:1});
        }else if(state=='hide'){
            TweenMax.to(ppt2View,0.2,{alpha:0});
        }
    }
    this.ppt_p2=function(){
        if(ppt1View && ppt1View.parent)ppt1View.parent.removeChild(ppt1View);

        ppt2View=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/compensate/BG.png'));
        pptContainer.addChildAt(ppt2View,0);

        var img=(videoState=='1'?window['requestObj']['headImg']:window['requestObj']['last_headImg']);
        var headGirl= new PIXI.projection.Sprite2d(PIXI.Texture.from(img));
        var scale=(80/img.width);
        headGirl.scale.set(scale);
        headGirl.anchor.set(0.5);
        headGirl.rotation=Math.PI/180*90;
        headGirl.x=191+80/2;
        headGirl.y=321+80/2;
        ppt2View.addChild(headGirl);

        var nickname=(videoState=='1'?window['requestObj']['nickname_zh']:window['requestObj']['last_nickname_zh']);
        var cas = document.createElement("canvas");
        cas.width=200;
        cas.height=50;
        if(cas.getContext){
            var ctx = cas.getContext("2d");
            ctx.font = "16px normal";
            ctx.fillStyle = "#ffffff";
            var a=ctx.measureText(nickname);
            var width=a.width;
            var x=(200-width)/2;
            ctx.fillText(nickname,x, 16);

            var b=ctx.measureText('的发布会');
            width=b.width;
            x=(200-width)/2;
            ctx.fillText('的发布会',x, 36);
        }
        var canvasTexture=new PIXI.Texture.fromCanvas(cas);
        var txt=new PIXI.projection.Sprite2d(canvasTexture);
        ppt2View.addChild(txt);

        txt.x=160;
        txt.y=(724-cas.width)/2;
        txt.rotation= Math.PI/180*90;
        ppt2View.addChild(txt);



    }
    var pptColorView;
    this.ppt_color_chang=function(state){
        if(state=='show'){
            pptColorView.alpha=0;
            TweenMax.to(pptColorView,0.3,{alpha:1});
        }else if(state=='hide'){
            TweenMax.to(pptColorView,0.2,{alpha:0});
        }
    }
    this.ppt_color=function(){

        pptContainer.removeChild(ppt2View);

        var color=_userSelect['color'];
        pptColorView=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/color/'+(color=='black'?'grey':color)+'/'+(color=='black'?'grey':color)+'-BG.png'));
        pptContainer.addChildAt(pptColorView,0);

        //用户的iphone @2x.png 图片会缩小一倍
        var iphone=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/color/'+color+'/'+color+'-phone_02.png'));
        pptColorView.addChild(iphone);
        iphone.x=0;
        iphone.y=105;

        var copy=getSp2d('assets/ppt/color/'+color+'/'+color+'-copy-'+(Math.random()>0.5?'A':'B')+'.png');
        copy.x=180;
        copy.y=81;
        pptColorView.addChild(copy);
        copy.y=110;
        copy.alpha=0;
        TweenMax.to(copy,1,{alpha:1,y:81,delay:0.2,ease:Linear.none});

        var point=getSp2d('assets/ppt/color/'+color+'/'+color+'-gr_03.png');
        pptColorView.addChild(point);
        point.x=216;
        point.y=50;

        var line=getSp2d('assets/ppt/line.png');
        line.x=378;
        pptColorView.addChild(line);

        var nickname=(videoState=='1'?window['requestObj']['nickname_zh']:window['requestObj']['last_nickname_zh']);
        // var nickname='chuck怎么办？';
        var cas = document.createElement("canvas");
        cas.width=300;
        cas.height=30;
        var ctx = cas.getContext("2d");
        ctx.font = "16px normal";
        ctx.fillStyle = ((color=='silver'|| color=="grey" || color=="black")?"#ffffff":"#000000");
        ctx.fillText((nickname+'的发布会'),0, 16);
        var canvasTexture=new PIXI.Texture.fromCanvas(cas);
        var txt=new PIXI.projection.Sprite2d(canvasTexture);
        txt.x=388;
        txt.y=70;
        txt.rotation= Math.PI/180*90;
        pptColorView.addChild(txt);

        var img=(videoState=='1'?_inputFile.img:window['requestObj']['last_desktopImg']);
        //用户的桌面截屏
        var scene=new PIXI.projection.Sprite2d(new PIXI.Texture.from(img));
        // var scene=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/scene2.jpg'));
        pptColorView.addChild(scene);
        scene.x=304;
        scene.y=241;
        //手机颜色 269 45
        var squares2 = [
            createSquare(0, 0),
            createSquare(132,186),
            createSquare(-98,524),
            createSquare(-231,337)
        ];
        var quad2 = squares2.map(function(s) { return s.position });
        renderer.ticker.add(function (delta) {
            scene.proj.mapSprite(scene, quad2);
        });

        var front_graph=getSp2d('assets/ppt/color/front-graph.png');
        pptColorView.addChild(front_graph);
    }
    var pptNickView;
    this.ppt_nick_chang=function(state){
        if(state=='show'){
            pptNickView.alpha=0;
            TweenMax.to(pptNickView,0.3,{alpha:1});
        }else if(state=='hide'){
            TweenMax.to(pptNickView,0.2,{alpha:0});
        }
    }
    this.ppt_nick=function(){
        // this._jingtouBG2();

        if(pptColorView && pptColorView.parent)pptColorView.parent.removeChild(pptColorView);

        pptNickView=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/compensate/BG.png'));
        pptContainer.addChildAt(pptNickView,0);

        var iphone=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/scar/bump/bump-phone_02.png'));
        pptNickView.addChild(iphone);
        iphone.x=0;
        iphone.y=218;

        var img=(videoState=='1'?_inputFile.img:window['requestObj']['last_desktopImg']);
        var scene=new PIXI.projection.Sprite2d(new PIXI.Texture.from(img));
        // var scene=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/scene.jpg'));
        pptNickView.addChild(scene);
        scene.x=215;
        scene.y=360;
        //是否有划痕
        var squares2 = [
         createSquare(0, 0),
         createSquare(233,191),
         createSquare(-83,828),
         createSquare(-338,691)
         ];
        var quad2 = squares2.map(function(s) { return s.position });
        renderer.ticker.add(function (delta) {
            scene.proj.mapSprite(scene, quad2);
        });

        var copy;
        if(_userSelect['nick']=='bump'){
            var bump=getSp2d('assets/ppt/scar/scar1/scar-gr_03.png');
            pptNickView.addChild(bump);
            bump.x=165;
            bump.y=223;

            copy=getSp2d('assets/ppt/scar/bump/bump-copy-'+(Math.random()<0.5?"A":"B")+'.png');
            pptNickView.addChild(copy);
            copy.x=59;
            copy.y=79;
        }else if(_userSelect['nick']=='scar'){
            var bump=getSp2d('assets/ppt/scar/bump/bump-gr_03.png');
            pptNickView.addChild(bump);
            bump.x=75;
            bump.y=415;

            copy=getSp2d('assets/ppt/scar/scar1/scar-copy-'+(Math.random()<0.5?"A":"B")+'.png');
            pptNickView.addChild(copy);
            copy.x=59;
            copy.y=79;
        }else{
            copy=getSp2d('assets/ppt/scar/no-'+(Math.random()<0.5?"bump":"scar")+'-copy_03.png');
            pptNickView.addChild(copy);
            copy.x=59;
            copy.y=79;
        }

        var tar_y=copy.y;
        copy.y=tar_y+30;
        copy.alpha=0;
        TweenMax.to(copy,1,{alpha:1,y:tar_y,delay:0.2,ease:Linear.none});

        var line=getSp2d('assets/ppt/line.png');
        line.x=378;
        pptNickView.addChild(line);

        var nickname=(videoState=='1'?window['requestObj']['nickname_zh']:window['requestObj']['last_nickname_zh']);
        var cas = document.createElement("canvas");
        cas.width=300;
        cas.height=30;
        var ctx = cas.getContext("2d");
        ctx.font = "16px normal";
        ctx.fillStyle ="#ffffff";
        ctx.fillText((nickname+'的发布会'),0,16);
        var canvasTexture=new PIXI.Texture.fromCanvas(cas);
        var txt=new PIXI.projection.Sprite2d(canvasTexture);
        txt.x=388;
        txt.y=70;
        txt.rotation= Math.PI/180*90;
        pptNickView.addChild(txt);

    }
    var pptWaterView;
    this.ppt_water_chang=function(state){
        if(state=='show'){
            pptWaterView.alpha=0;
            TweenMax.to(pptWaterView,0.3,{alpha:1});
        }else if(state=='hide'){
            TweenMax.to(pptWaterView,0.2,{alpha:0});
        }
    }
    this.ppt_water=function(){
        //this._jingtouBG2();
        if(pptNickView && pptNickView.parent)pptNickView.parent.removeChild(pptNickView);

        pptWaterView=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/water/'+_userSelect['water']+'/BG.png'));
        pptContainer.addChildAt(pptWaterView,0);

        var iphone=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/water/phone_01.png'));
        pptWaterView.addChildAt(iphone,0);
        iphone.x=0;
        iphone.y=0;
        var copy=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/water/'+_userSelect['water']+'/copy'+(Math.random()<0.5?"A":(_userSelect['water']=='none'?"C":"B"))+'_03.png'));
        pptWaterView.addChild(copy);
        copy.x=189;
        copy.y=416;
        copy.alpha=0;
        TweenMax.to(copy,1,{alpha:1,y:386,delay:0.2,ease:Linear.none});

        var img=(videoState=='1'?_inputFile.img:window['requestObj']['last_desktopImg']);
        var scene=new PIXI.projection.Sprite2d(new PIXI.Texture.from(img));
        // var scene=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/scene.jpg'));
        pptWaterView.addChild(scene);
        scene.x=225;
        scene.y=78;
        //水
        var squares2 = [
            createSquare(0, 0),
            createSquare(57,220),
            createSquare(-391,454),
            createSquare(-485,254)
        ];
        var quad2 = squares2.map(function(s) { return s.position });
        renderer.ticker.add(function (delta) {
            scene.proj.mapSprite(scene, quad2);
        });

        if(_userSelect['water']=='have'){
            var wate=getSp2d('assets/ppt/water/have/phone-water_02.png');
            pptWaterView.addChild(wate);
            wate.x=113;
            wate.y=18;
        }

        var line=getSp2d('assets/ppt/line.png');
        line.x=378;
        pptWaterView.addChild(line);

        var nickname=(videoState=='1'?window['requestObj']['nickname_zh']:window['requestObj']['last_nickname_zh']);
        var cas = document.createElement("canvas");
        cas.width=300;
        cas.height=30;
        var ctx = cas.getContext("2d");
        ctx.font = "16px normal";
        ctx.fillStyle ="#ffffff";
        ctx.fillText((nickname+'的发布会'),0, 16);
        var canvasTexture=new PIXI.Texture.fromCanvas(cas);
        var txt=new PIXI.projection.Sprite2d(canvasTexture);
        txt.x=388;
        txt.y=70;
        txt.rotation= Math.PI/180*90;
        pptWaterView.addChild(txt);
    }
    var compensateView;
    this.ppt_compensate_chang=function(state){
        if(state=='show'){
            compensateView.alpha=0;
            TweenMax.to(compensateView,0.3,{alpha:1});
        }else if(state=='hide'){
            TweenMax.to(compensateView,0.2,{alpha:0});
        }
    }
    this.ppt_compensate=function(){

        if(pptWaterView && pptWaterView.parent)pptWaterView.parent.removeChild(pptWaterView);

        compensateView=new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('assets/ppt/compensate/BG.png'));
        pptContainer.addChildAt(compensateView,0);

        var iphone=getSp2d('assets/ppt/compensate/phone_02.png');
        compensateView.addChild(iphone);
        iphone.y=350;

        var txt1=getSp2d('assets/ppt/compensate/copy_03.png');
        compensateView.addChild(txt1);
        txt1.x=150;
        txt1.y=63;

        var logo=getSp2d('assets/ppt/compensate/logo_02.png');
        compensateView.addChild(logo);
        logo.x=300;
        logo.y=63;

        var img=(videoState=='1'?_inputFile.img:window['requestObj']['last_desktopImg']);
        // var scene=getSp2d('assets/scene.jpg');
        var scene = new PIXI.projection.Sprite2d(PIXI.Texture.from(img));
        compensateView.addChild(scene);
        scene.x=309;
        scene.y=466;
        //水
        var squares2 = [
            createSquare(0, 0),
            createSquare(-8,183),
            createSquare(-453,58),
            createSquare(-410,-116)
        ];
        var quad2 = squares2.map(function(s) { return s.position });
        renderer.ticker.add(function (delta) {
            scene.proj.mapSprite(scene, quad2);
        });

    }
    this.ppt_hide=function(){
        pptUpdate=false;
        TweenMax.to(pptContainer, 3, {alpha:0,ease:Linear.easeNone,onComplete:function(){
                if(compensateView.parent)compensateView.parent.removeChild(compensateView);
            }
        });

        if(videoState=='2'){
            gameScene2.showDingzhi();
        }else if(videoState=='1'){
            gameScene2.showStage1();
        }


    }
    function getSp2d(url){
        return new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage(url));
    }

    var squares = [createSquare(-109,-49),createSquare(458,-79),createSquare(394,619),createSquare(40,614)];
    var quad = squares.map(function(s) { return s.position });
    this.pptMesh=function(jintou){

        if(jintou=='zhengmian'){//正面
            pptMask.clear();
            pptMask.beginFill(0xFF3300);
            pptMask.moveTo(0,0);
            pptMask.lineTo(392,0);
            pptMask.lineTo(392,693);
            pptMask.lineTo(0,691);
            pptMask.endFill();
            pptMask.x=164;
            pptMask.y=GAME.stageHeight/2-443;

            squares[0].position.x=0;
            squares[0].position.y=0;

            squares[1].position.x=389;
            squares[1].position.y=4;

            squares[2].position.x=395;
            squares[2].position.y=690;

            squares[3].position.x=0;
            squares[3].position.y=693;

        }else if(jintou=='cemian'){//侧面
            pptMask.clear();
            pptMask.beginFill(0xFF3300,0.3);
            pptMask.moveTo(0,0);
            pptMask.lineTo(572,-36);
            pptMask.lineTo(509, 666);
            pptMask.lineTo(149, 661);
            pptMask.endFill();
            pptMask.x=50;
            pptMask.y=GAME.stageHeight/2-491;

            squares[0].position.x=-113;
            squares[0].position.y=-49;

            squares[1].position.x=458;
            squares[1].position.y=-83;

            squares[2].position.x=394;
            squares[2].position.y=619;

            squares[3].position.x=35;
            squares[3].position.y=614;

        }else if(jintou=='texie'){
            pptMask.clear();
            pptMask.beginFill(0xFF3300,0.5);
            pptMask.moveTo(0,0);
            pptMask.lineTo(GAME.stageWidth,0);
            pptMask.lineTo(GAME.stageWidth,230);
            pptMask.lineTo(0,230);
            pptMask.endFill();
            pptMask.x=0;
            pptMask.y=0;
            pptMask.x=0;
            pptMask.y=GAME.stageHeight/2-353-230;

            squares[0].position.x=-362;
            squares[0].position.y=-1692;

            squares[1].position.x=501;
            squares[1].position.y=-1692;

            squares[2].position.x=610;
            squares[2].position.y=92;

            squares[3].position.x=-392;
            squares[3].position.y=92;
        }
    }

    this._jingtouBG1=function(){
        var bg=PIXI.Sprite.fromImage('assets/video_bg1.jpg');
        this.addChildAt(bg,0);
        bg.anchor.set(0,0.5);
        bg.y=GAME.stageHeight/2;
    }
    this._jingtouBG2=function(){
        var bg=PIXI.Sprite.fromImage('assets/video_bg2.jpg');
        this.addChildAt(bg,0);
        bg.anchor.set(0,0.5);
        bg.y=GAME.stageHeight/2;
    }
    this._jingtouBG3=function(){
        var bg=PIXI.Sprite.fromImage('assets/video_bg3.jpg');
        this.addChildAt(bg,0);
        bg.anchor.set(0,0.5);
        bg.y=GAME.stageHeight/2;
    }


    function createSquare(x, y) {
        var square = new PIXI.Sprite(PIXI.Texture.WHITE);
        square.tint = 0xff0000;
        square.factor = 1;
        square.anchor.set(0.5);
        square.position.set(x, y);
        return square;
    }

    this.sceneOut = function ()
    {
        GAME.Scene.prototype.sceneOut.apply(this);
        TweenMax.to(this, 3, {alpha:0,ease:Linear.easeNone,onComplete:function(){
                _this.sceneOutComplete();
                if(_this.parent)_this.parent.removeChild(_this);
            }
        });
    }
};
GAME.Utils.inherit(GAME.GameScene1, GAME.Scene);
