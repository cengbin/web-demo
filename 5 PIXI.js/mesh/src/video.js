/**
 * Created by weibin.zeng on 2017/9/4.
 */
$(function(){
    var video=document.getElementById('video');
    video.volume=0;
    video.playbackRate=1;
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
        //console.log('ontimeupdate:',video.currentTime,'/',video.duration);

        for(var s in dian){
            if(video.currentTime>dian[s]['time'] && dian[s]['onTask'] && dian[s]['onTask']=='0'){
                // console.log('on task:',)
                dian[s]['onTask']='1';

                var task=dian[s]['task'];

                if(typeof task=='object'){
                    console.log('task:',task['name']);
                    gameScene[task['name']](dian[s]['task']['param']);
                }else{
                    console.log('task:',task);
                    gameScene[task]();
                }

            }

            if(video.currentTime>dian[s]['time'] && dian[s]['pause'] && dian[s]['pause']==1){
                dian[s]['pause']=0;
                video.pause();
            }
        }
    }
    animate();

});

var dian=[

    {
        time:0,
        task:'initPPT',//初始化ppt
        onTask:'0'
    },
    {
        time:0,
        task:'ppt_color',//重新定义你的首页
        onTask:'0'
    },
    {
        time:2.4,
        task:{
            name:'ppt_color_chang',
            param:'hide'
        },//ppt侧面
        onTask:'0'
    },
    {
        time:2.5,
        task:{
            name:'ppt_color_chang',
            param:'show'
        },//ppt侧面
        onTask:'0'
    },
    {
        time:2.5,
        task:{
            name:'pptMesh',
            param:'cemian'
        },//ppt侧面
        onTask:'0'
    },
    {
        time:39.17,
        task:{
            name:'pptMesh',
            param:'zhengmian'
        },//ppt正面
        onTask:'0'
    },
    {
        time:44,
        task:'ppt_color',//显示手机颜色
        onTask:'0'
    },
    {
        time:44.07,
        task:{
            name:'pptMesh',
            param:'cemian'//ppt侧面
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
        time:51.05,
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
        time:59.22,
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
        time:62.19,
        task:{
            name:'pptMesh',
            param:'texie'//ppt特写
        },
        onTask:'0'
    },
    {
        time:65.20,
        task:{
            name:'pptMesh',
            param:'zhengmian'//ppt正面
        },
        onTask:'0'
    },
    {
        time:67.30,
        task:{
            name:'setCopy',//显示进水的随机文字
            param:'water'
        },
        onTask:'0'
    },
    {
        time:68,
        task:'ppt_water',//显示水
        onTask:'0'
    },
    {
        time:72.15,
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
        time:75.04,
        task:{
            name:'pptMesh',
            param:'zhengmian'//ppt正面
        },
        onTask:'0'
    },
    {
        time:82.22,
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