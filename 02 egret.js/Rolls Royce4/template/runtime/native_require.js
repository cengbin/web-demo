
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"bin-debug/Hit.js",
	"bin-debug/Main.js",
	"bin-debug/Sp1.js",
	"bin-debug/scene/Scene.js",
	"bin-debug/WHT.js",
	"bin-debug/component/Button.js",
	"bin-debug/component/SoundSingle/SoundEngine.js",
	"bin-debug/component/SoundSingle/SoundEngineObject.js",
	"bin-debug/display/ZBitmap.js",
	"bin-debug/effects/MaskObject.js",
	"bin-debug/effects/StarsParticle.js",
	"bin-debug/effects/TextEffect.js",
	"bin-debug/effects/TextEffect2.js",
	"bin-debug/event/SceneEvent.js",
	"bin-debug/interface/IScene.js",
	"bin-debug/scene/LoadingUI.js",
	"bin-debug/scene/RotationUI.js",
	"bin-debug/scene/Scene1.js",
	"bin-debug/scene/Scene2.js",
	"bin-debug/scene/Scene3.js",
	"bin-debug/scene/Scene4.js",
	"bin-debug/scene/TopUI.js",
	"bin-debug/utils/Egr.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedHeight",
		contentWidth: 640,
		contentHeight: 1008,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};