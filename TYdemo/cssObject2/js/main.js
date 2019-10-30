/**
 * Created by zengweibin on 2015/5/19.
 */
$(function(){
    //横屏提示
    var tip=new Game.GOrientationTop();
    //加载素材
    var loader=new Game.GLoader("",['css/ps2.png','css/ps3.png','css/sps.png','css/txts.png']);
    loader.gloader.addProgressListener(function (e) {
        //在这里做 Loading 页面中百分比的显示
        var percent = Math.round((e.completedCount / e.totalCount) * 100);
    });
    loader.gloader.addCompletionListener(function () {
        //可以在这里隐藏 Loading 页面开始进入主内容页面
        $(".wrap").show();
    });
    loader.gloader.start();

    // 滑动插件
    var slider=new Game.GSlider({
        pages: document.querySelectorAll('.screen'),
        swipe:"X",//滑动方向
        banSlider:false, //禁止滑动
        speed:500,
        index:0
    });
    slider.pageSlider.onBefore=function(){
        console.log("on before index:"+slider.pageSlider.index);
    }
    slider.pageSlider.onComplete=function(){
        console.log("on complete index:"+slider.pageSlider.index);
    }
    setTimeout(function(){
//        slider.pageSlider.moveTo(3,true);
    },3000);

    //声音
    var music=new Game.GMusic();
    music.addSound("bg_sound");
})