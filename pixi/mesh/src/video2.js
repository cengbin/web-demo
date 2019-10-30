/**
 * Created by weibin.zeng on 2017/9/4.
 */
$(function(){
    var video=document.getElementById('video');
    // video.volume=0;
    // video.playbackRate=1.5;
    video.addEventListener('ended',function(){
        //gameScene.showEnded();
        console.log('onended,当媒介已到达结尾（可发送类似“感谢观看”之类的消息）。');
    },false);
    video.addEventListener('canplay',function(){
        console.log('oncanplay,当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。');
    },false);
    video.addEventListener('waiting',function(){
        console.log('onwaiting,当媒介已停止播放但打算继续播放时（比如当媒介暂停已缓冲更多数据）运行脚本');
    },false);
    video.addEventListener('onplay',function(){
        console.log('onplay,当媒介已就绪可以开始播放时运行的脚本。');
    },false);
    video.addEventListener('playing',function(){
        console.log('onplaying,当媒介已开始播放时运行的脚本。');
    },false);
    video.addEventListener('pause',function(){
        console.log('onpause,当媒介被用户或程序暂停时运行的脚本。');
    },false);
    video.addEventListener('timeupdate',function(){
        //console.log('ontimeupdate,当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。');

    },false);

    function animate(){
        requestAnimationFrame(animate);
        // console.log('ontimeupdate:',video.currentTime,'/',video.duration);
        // console.log('videoState:',videoState);
        for(var s in dian){
            if(videoState=='2'){
                if(dian[s]['time']>21 && (video.currentTime+21)>dian[s]['time'] && dian[s]['onTask']=='0'){
                    dian[s]['onTask']='1';
                    var task=dian[s]['task'];
                    if(typeof task=='object'){
                        console.log('task:',task['name']);
                        gameScene1[task['name']](dian[s]['task']['param']);
                    }else{
                        console.log('task:',task);
                        gameScene1[task]();
                    }
                }
                if(dian[s]['time']>21 && (video.currentTime+21)>dian[s]['time'] && dian[s]['pause'] && dian[s]['pause']==1){
                    dian[s]['pause']=0;
                    video.pause();
                }
            }else if(videoState=='1'){
                if((video.currentTime>dian[s]['time']) && dian[s]['onTask'] && dian[s]['onTask']=='0'){
                    dian[s]['onTask']='1';
                    var task=dian[s]['task'];
                    if(typeof task=='object'){
                        console.log('task:',task['name']);
                        gameScene1[task['name']](dian[s]['task']['param']);
                    }else{
                        console.log('task:',task);
                        gameScene1[task]();
                    }
                }
                if((video.currentTime>dian[s]['time']) && dian[s]['pause'] && dian[s]['pause']==1){
                    dian[s]['pause']=0;
                    video.pause();
                }
            }
        }
    }
    animate();

});

var dian=[
    {
        time:6.13,
        task:'dati',
        onTask:'0',
        pause:0
    },
    {
        time:7.22,
        pause:1
    },
    {
        time:13.01,
        task:'showUpload',
        onTask:'0',
        pause:1
    },
    {
        time:22.03,
        task:'initPPT',//初始化ppt
        onTask:'0'
    },
    {
        time:22.03,
        task:'ppt_p1',//重新定义你的首页
        onTask:'0'
    },
    {
        time:35,
        task:'ppt_p2',//xxx的手机发布会
        onTask:'0'
    },
    {
        time:36.56,
        task:{
            name:'ppt_p2_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:36.66,
        task:{
            name:'ppt_p2_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:36.66,
        task:{
            name:'pptMesh',
            param:'cemian'
        },//ppt侧面
        onTask:'0'
    },


    {
        time:39.57,
        task:{
            name:'ppt_p2_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:39.67,
        task:{
            name:'ppt_p2_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:39.67,
        task:{
            name:'pptMesh',
            param:'zhengmian'
        },//ppt正面
        onTask:'0'
    },




    {
        time:42.5,
        task:'ppt_color',//显示手机颜色
        onTask:'0'
    },

    {
        time:44.04,
        task:{
            name:'ppt_color_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:44.14,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
        },
        onTask:'0'
    },
    {
        time:44.14,
        task:{
            name:'ppt_color_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:46.1,
        task:{
            name:'setCopy',//出现颜色的随机文字
            param:'color'
        },
        onTask:'0'
    },
    {
        time:49,
        task:{
            name:'setCopy',//隐藏颜色的随机文字
            param:''
        },
        onTask:'0'
    },




    {
        time:51.10,
        task:{
            name:'ppt_color_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:51.20,
        task:{
            name:'ppt_color_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:51.20,
        task:{
            name:'pptMesh',
            param:'zhengmian'//ppt正面
        },
        onTask:'0'
    },
    {
        time:52,
        task:'ppt_nick',//显示疤痕
        onTask:'0'
    },
    {
        time:57.12,
        task:{
            name:'setCopy',//出现划痕的随机文字
            param:'nick'
        },
        onTask:'0'
    },



    {
        time:59.83,
        task:{
            name:'ppt_nick_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:59.93,
        task:{
            name:'ppt_nick_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:59.93,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
        },
        onTask:'0'
    },
    {
        time:62,
        task:{
            name:'setCopy',//影藏划痕的随机文字
            param:''
        },
        onTask:'0'
    },




    {
        time:62.59,
        task:{
            name:'ppt_nick_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:62.69,
        task:{
            name:'ppt_nick_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:62.69,
        task:{
            name:'pptMesh',
            param:'texie'//ppt特写
        },
        onTask:'0'
    },


    {
        time:65.70,
        task:{
            name:'ppt_nick_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:65.80,
        task:{
            name:'ppt_nick_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:65.80,
        task:{
            name:'pptMesh',
            param:'zhengmian'//ppt正面
        },
        onTask:'0'
    },
    {
        time:67.30,
        task:'ppt_water',//显示水
        onTask:'0'
    },
    {
        time:68,
        task:{
            name:'setCopy',//显示进水的随机文字
            param:'water'
        },
        onTask:'0'
    },




    {
        time:72.60,
        task:{
            name:'ppt_water_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:72.60,
        task:{
            name:'ppt_water_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:72.60,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
        },
        onTask:'0'
    },
    {
        time:75,
        task:{
            name:'setCopy',//隐藏进水的随机文字
            param:''
        },
        onTask:'0'
    },


    {
        time:75.14,
        task:{
            name:'ppt_water_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:75.24,
        task:{
            name:'ppt_water_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:75.24,
        task:{
            name:'pptMesh',
            param:'zhengmian'//ppt正面
        },
        onTask:'0'
    },



    {
        time:82.90,
        task:{
            name:'ppt_water_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:83.00,
        task:{
            name:'ppt_water_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:83.00,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
        },
        onTask:'0'
    },
    {
        time:83,
        task:'ppt_compensate',
        onTask:'0'
    },



    {
        time:86.03,
        task:{
            name:'ppt_water_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:86.13,
        task:{
            name:'ppt_water_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:86.13,
        task:{
            name:'pptMesh',
            param:'texie'//ppt特写
        },
        onTask:'0'
    },
    {
        time:88,
        task:'ppt_hide',
        onTask:'0'
    }
]



var dian2=[
    {
        time:6.13,
        task:'dati',
        onTask:'0',
        pause:0
    },
    {
        time:7.22,
        pause:1
    },
    {
        time:13.01,
        task:'showUpload',
        onTask:'0',
        pause:1
    },
    {
        time:22.03,
        task:'initPPT',//初始化ppt
        onTask:'0'
    },
    {
        time:22.03,
        task:'ppt_p1',//重新定义你的首页
        onTask:'0'
    },
    {
        time:35,
        task:'ppt_p2',//xxx的手机发布会
        onTask:'0'
    },
    {
        time:36.56,
        task:{
            name:'ppt_p2_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:36.66,
        task:{
            name:'ppt_p2_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:36.66,
        task:{
            name:'pptMesh',
            param:'cemian'
        },//ppt侧面
        onTask:'0'
    },


    {
        time:39.57,
        task:{
            name:'ppt_p2_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:39.67,
        task:{
            name:'ppt_p2_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:39.67,
        task:{
            name:'pptMesh',
            param:'zhengmian'
        },//ppt正面
        onTask:'0'
    },




    {
        time:42.5,
        task:'ppt_color',//显示手机颜色
        onTask:'0'
    },

    {
        time:44.04,
        task:{
            name:'ppt_color_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:44.14,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
        },
        onTask:'0'
    },
    {
        time:44.14,
        task:{
            name:'ppt_color_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:46.1,
        task:{
            name:'setCopy',//出现颜色的随机文字
            param:'color'
        },
        onTask:'0'
    },
    {
        time:49,
        task:{
            name:'setCopy',//隐藏颜色的随机文字
            param:''
        },
        onTask:'0'
    },




    {
        time:51.10,
        task:{
            name:'ppt_color_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:51.20,
        task:{
            name:'ppt_color_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:51.20,
        task:{
            name:'pptMesh',
            param:'zhengmian'//ppt正面
        },
        onTask:'0'
    },
    {
        time:52,
        task:'ppt_nick',//显示疤痕
        onTask:'0'
    },
    {
        time:57.12,
        task:{
            name:'setCopy',//出现划痕的随机文字
            param:'nick'
        },
        onTask:'0'
    },



    {
        time:59.83,
        task:{
            name:'ppt_nick_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:59.93,
        task:{
            name:'ppt_nick_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:59.93,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
        },
        onTask:'0'
    },
    {
        time:62,
        task:{
            name:'setCopy',//影藏划痕的随机文字
            param:''
        },
        onTask:'0'
    },




    {
        time:62.59,
        task:{
            name:'ppt_nick_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:62.69,
        task:{
            name:'ppt_nick_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:62.69,
        task:{
            name:'pptMesh',
            param:'texie'//ppt特写
        },
        onTask:'0'
    },


    {
        time:65.70,
        task:{
            name:'ppt_nick_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:65.80,
        task:{
            name:'ppt_nick_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:65.80,
        task:{
            name:'pptMesh',
            param:'zhengmian'//ppt正面
        },
        onTask:'0'
    },
    {
        time:67.30,
        task:'ppt_water',//显示水
        onTask:'0'
    },
    {
        time:68,
        task:{
            name:'setCopy',//显示进水的随机文字
            param:'water'
        },
        onTask:'0'
    },




    {
        time:72.60,
        task:{
            name:'ppt_water_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:72.60,
        task:{
            name:'ppt_water_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:72.60,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
        },
        onTask:'0'
    },
    {
        time:75,
        task:{
            name:'setCopy',//隐藏进水的随机文字
            param:''
        },
        onTask:'0'
    },


    {
        time:75.14,
        task:{
            name:'ppt_water_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:75.24,
        task:{
            name:'ppt_water_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:75.24,
        task:{
            name:'pptMesh',
            param:'zhengmian'//ppt正面
        },
        onTask:'0'
    },



    {
        time:82.90,
        task:{
            name:'ppt_water_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:83.00,
        task:{
            name:'ppt_water_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:83.00,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
        },
        onTask:'0'
    },
    {
        time:83,
        task:'ppt_compensate',
        onTask:'0'
    },



    {
        time:86.03,
        task:{
            name:'ppt_water_chang',
            param:'hide'
        },
        onTask:'0'
    },
    {
        time:86.13,
        task:{
            name:'ppt_water_chang',
            param:'show'
        },
        onTask:'0'
    },
    {
        time:86.13,
        task:{
            name:'pptMesh',
            param:'texie'//ppt特写
        },
        onTask:'0'
    },
    {
        time:88,
        task:'ppt_hide',
        onTask:'0'
    }
]