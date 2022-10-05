<?php
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = rawurlencode("$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
    $signPackage = json_decode(file_get_contents("http://h5.180network.com.cn/wx/api/jssdk/getSignPackage?path=$url"),true);

?>


<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>想象之印记</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        html, body {
            -ms-touch-action: none;
            background: #000;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>

    <!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
    <!--modules_files_start-->
	<script egret="lib" src="libs/modules/egret/egret.js" src-release="libs/modules/egret/egret.min.js"></script>
	<script egret="lib" src="libs/modules/egret/egret.web.js" src-release="libs/modules/egret/egret.web.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.js" src-release="libs/modules/game/game.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.web.js" src-release="libs/modules/game/game.web.min.js"></script>
	<script egret="lib" src="libs/modules/tween/tween.js" src-release="libs/modules/tween/tween.min.js"></script>
	<script egret="lib" src="libs/modules/res/res.js" src-release="libs/modules/res/res.min.js"></script>
	<!--modules_files_end-->

    <!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
    <!--other_libs_files_start-->
    <!--other_libs_files_end-->

    <!--这个标签会被替换为项目中所有的 javascript 文件。删除 game_files 标签后，项目文件加载列表将不会变化，请谨慎操作！-->
    <!--game_files_start-->
	<script egret="game" src="bin-debug/Hit.js"></script>
    <script egret="game" src="bin-debug/Main.js"></script>
    <script egret="game" src="bin-debug/Sp1.js"></script>
    <script egret="game" src="bin-debug/scene/Scene.js"></script>
    <script egret="game" src="bin-debug/WHT.js"></script>
    <script egret="game" src="bin-debug/component/Button.js"></script>
    <script egret="game" src="bin-debug/component/SoundSingle/SoundEngine.js"></script>
    <script egret="game" src="bin-debug/component/SoundSingle/SoundEngineObject.js"></script>
    <script egret="game" src="bin-debug/display/ZBitmap.js"></script>
    <script egret="game" src="bin-debug/effects/StarsParticle.js"></script>
    <script egret="game" src="bin-debug/effects/TextEffect.js"></script>
    <script egret="game" src="bin-debug/effects/TextEffect2.js"></script>
    <script egret="game" src="bin-debug/event/SceneEvent.js"></script>
    <script egret="game" src="bin-debug/interface/IScene.js"></script>
    <script egret="game" src="bin-debug/scene/LoadingUI.js"></script>
    <script egret="game" src="bin-debug/scene/RotationUI.js"></script>
    <script egret="game" src="bin-debug/scene/Scene1.js"></script>
    <script egret="game" src="bin-debug/scene/Scene2.js"></script>
    <script egret="game" src="bin-debug/scene/Scene3.js"></script>
    <script egret="game" src="bin-debug/scene/Scene4.js"></script>
    <script egret="game" src="bin-debug/scene/TopUI.js"></script>
    <script egret="game" src="bin-debug/utils/Egr.js"></script>
	<!--game_files_end-->


	<script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?69a8aa92439663aca3cdecf9baaa019c";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    </script>


</head>
<body>

    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="portrait"
         data-scale-mode="fixedWidth"
         data-frame-rate="30"
         data-content-width="640"
         data-content-height="1136"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
    </div>
    <audio id="bg" loop="loop" preload="auto">
    	<source src="resource/sound/bg.mp3" type="audio/mpeg">
    </audio>
    <script>
        /**
         * {
         * "renderMode":, //引擎渲染模式，"canvas" 或者 "webgl"
         * "audioType": "" //使用的音频类型，0:默认，1:qq audio，2:web audio，3:audio
         * "antialias": //WebGL模式下是否开启抗锯齿，true:开启，false:关闭，默认为false
         * }
         **/
        egret.runEgret({renderMode:"webgl", audioType:0});

    	var bg;
    	document.addEventListener("WeixinJSBridgeReady",function() {
	    	window["WeixinJSBridge"].invoke('getNetworkType',{},function(e) {
                bg = document.getElementById("bg");
                bg.play();
                bg.pause();
	    	});
    	});
    </script>

</body>
</html>


<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
    var link="http://"+window.location.host+"/2017/RollsRoyce2/";
    var title="心若无界 想象亦无穷";
    var desc="这是一场无止境的艺术之旅";
    var wxShare=function(param){
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title:desc, // 分享标题
            link: link, // 分享链接
            imgUrl: link+"resource/share.jpg", // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                window["_hmt"].push(['_trackEvent', 'evt', 'sharePYQsuccess']);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                window["_hmt"].push(['_trackEvent', 'evt', 'sharePYQcancel']);
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title:title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: link+"resource/share.jpg", // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                window["_hmt"].push(['_trackEvent', 'evt', 'sharePYsuccess']);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                window["_hmt"].push(['_trackEvent', 'evt', 'sharePYcancel']);
            }
        });
    }
    wx.config({
        debug: false,
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: <?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ]
    });
    wx.ready(wxShare);
</script>