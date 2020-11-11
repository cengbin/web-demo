;GAME.AssetsManager=function()
{
    var _asset = [

        "assets/loding/s1_sp1.jpg",
        "assets/loding/s1_loading.png",

        "assets/shouye/bar_bg.png",
        "assets/shouye/bar_point.png",
        "assets/shouye/bar_txt.png",
        "assets/shouye/bg.jpg",
        "assets/shouye/sp3.png",

        "assets/ppt/bacgroundGrayFrame.png",
        "assets/ppt/color/front-graph.png",
        "assets/ppt/color/gold/gold-BG.png",
        "assets/ppt/color/gold/gold-phone_02.png",
        "assets/ppt/color/grey/grey-BG.png",
        "assets/ppt/color/grey/grey-phone_02.png",
        "assets/ppt/color/rose/rose-BG.png",
        "assets/ppt/color/rose/rose-phone_02.png",
        "assets/ppt/color/silver/silver-BG.png",
        "assets/ppt/color/silver/silver-phone_02.png",

        "assets/ppt/compensate/BG.png",
        "assets/ppt/compensate/copy_03.png",
        "assets/ppt/compensate/front-shadow_02.png",
        "assets/ppt/compensate/iconA_03.png",
        "assets/ppt/compensate/iconB_03.png",
        "assets/ppt/compensate/logo_02.png",
        "assets/ppt/compensate/phone_02.png",

        "assets/ppt/definition/BG.jpg",

        "assets/ppt/scar/bump/bump-copy-A.png",
        "assets/ppt/scar/bump/bump-copy-B.png",
        "assets/ppt/scar/bump/bump-gr_03.png",
        "assets/ppt/scar/bump/bump-phone_02.png",
        "assets/ppt/scar/no-bump-copy_03.png",

        "assets/ppt/scar/no-scar-copy_03.png",
        "assets/ppt/scar/scar1/scar-copy-A.png",
        "assets/ppt/scar/scar1/scar-copy-B.png",
        "assets/ppt/scar/scar1/scar-gr_03.png",
        "assets/ppt/scar/scar1/scar-phone_02.png",

        "assets/ppt/water/front-shadow.png",
        "assets/ppt/water/phone_01.png",

        "assets/ppt/water/have/BG.png",
        "assets/ppt/water/have/copyA_03.png",
        "assets/ppt/water/have/copyB_03.png",
        "assets/ppt/water/have/phone-water_02.png",

        "assets/ppt/water/none/BG.png",
        "assets/ppt/water/none/copyA_03.png",
        "assets/ppt/water/none/copyB_03.png",
        "assets/ppt/water/none/copyC_03.png",

        "assets/s1/a.jpg",
        "assets/s1/s1_loadingtxt.png"
    ];
    var _assetLoader=new PIXI.loaders.Loader(GAME.assetsLink);

    this.onComplete=null;
    this.onProgress=function(_e)
    {
        // console.log(_e.progress)
        //load2.scale.x=_e.progress/100;
        gameLoading.setLoadTxt(parseInt(_e.progress));

    };

    this.start=function()
    {


        _assetLoader.add(_asset);
        _assetLoader.once('complete',this.onComplete);
        _assetLoader.on('progress',this.onProgress);
        _assetLoader.load();

    }
};
