/**
 * Created by weibin.zeng on 2015/7/8.
 */
var Game=Game||{};
Game.GOrientationTop=function(){
    $(window).resize(resizeTip);
    function resizeTip()
    {
        var winWidth=$(window).width();
        var winHeight=$(window).height();
        if(winWidth>winHeight){
            window.screenState="horizontally";
            $("#landscape").show();
        }else{
            window.screenState="vertical";
            $("#landscape").hide();
        }
        console.log("window.screenState:"+window.screenState);
    }
    resizeTip();
};
Game.GLoader=function(basePath,fileList){

    this.gloader=new PxLoader();

    var loader =this.gloader;
    //声明资源文件列表
    for (var i = 0; i < fileList.length; i++) {
        loader.addImage(basePath + fileList[i]);
    }
}
Game.GSlider=function(config){
    var screenHeight,screenWidth;

    $(window).resize(resizeItem);
    function resizeItem(){
        screenHeight = document.documentElement.clientHeight;
        screenWidth = document.documentElement.clientWidth;
        scaleEle(".screen-t","top","left");
        scaleEle(".screen-c","top","left");
        scaleEle(".screen-b","bottom","left");
    }
    resizeItem();

    // 缩放规则
    // UI设计layout大小(640x1136 iphone5尺寸,包括状态栏、导航栏、主菜单栏的高度); 状态栏高度：40px,导航栏高度:88px,主菜单栏高度:98px;（1136-40-88=1008)，注：（因为微信浏览器底部没有菜单栏所以不减98px）;
    // 每个页面分 top center bottom 三个部分
    // 按比例（屏幕的宽度/640)  scale缩放元素,分别定为在屏幕的上 中 下，内部元素通过定位显示元素
    // top 显示在页面的上方，center 显示在屏幕的中间（上下距离相等），bottom显示在屏幕的下方
    function scaleEle(selector,originX,originY){
        var currentScale=screenWidth/640;
        var itemcHeight;
        itemcHeight=1008*currentScale;

        var attrName,value;
        switch(selector.slice(-1)){
            case "t":
                attrName="top";
                value=0;
                break;
            case "c":
                attrName="top";
                value=(screenHeight-itemcHeight)/2;
//                if(value<=0)value=0;
                break;
            case "b":
                attrName="bottom";
                value=0;
                break;
        }
        var cssValue={};
        cssValue[attrName]=value;
        cssValue["-webkit-transform-origin"]=originX+" "+originY;
        cssValue["transform-origin"]=originX+" "+originY;
        cssValue["-webkit-transform"]="scale("+currentScale+","+currentScale+")";
        cssValue["transform"]="scale("+currentScale+","+currentScale+")";
        $(selector).css(cssValue);
    }

    this.pageSlider=new PageSlider(config);
}
Game.GMusic=function(){
    var _this=this;
    var soundObject={};
    var isSystemMute=false;

    this.addSound=function(url){
        var sound=$("#"+url)[0];
        soundObject[url]={};
        soundObject[url]["target"]=sound;
        sound.addEventListener("canplay",function(event){//当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。
            soundObject[url]["canplay"]=true;
        });
        sound.addEventListener("loadeddata",function(event){//当媒介数据已加载时运行的脚本。
            soundObject[url]["loadeddata"]=true;
        });
        sound.addEventListener("loadstart",function(event){//在文件开始加载且未实际加载任何数据前运行的脚本。
            soundObject[url]["loadstart"]=true;
        });
        sound.addEventListener("ended",function(){//当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）。
            soundObject[url]["ended"]=true;
            var soundLoops=soundObject[url]["loops"];
//            alert("soundloops;"+soundObject[url]+"---"+soundObject[url]["loops"]);
            _this.playSound(url,--soundObject[url]["loops"]);
        });
    }
    this.playSound=function(url,loops){
        if(isSystemMute)return;
        soundObject[url]["target"].play();
        (loops<0)?soundObject[url]["loops"]=9999999:soundObject[url]["loops"]=loops;
    }
    this.pauseSound=function(url){
        soundObject[url]["target"].pause();
    }
    this.stopSound=function(url){
        soundObject[url]["target"].stop();
    }
    this.systemPlaySound=function(){
        isSystemMute=false;
    }
    this.systemStopSound=function(){
        isSystemMute=true;
    }
}
