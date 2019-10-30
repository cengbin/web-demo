GAME.AssetsManager=function()
{
    var _asset = ["assets/assets.json"];
    var _assetAndroid = ["assets/assets_android.json"];
    var _assetLoader;

    if(GAME.Utils.isAndroid()||!GAME.retinaSupport)
        _assetLoader=new PIXI.AssetLoader(_assetAndroid);
    else
        _assetLoader=new PIXI.AssetLoader(_asset);

    this.onComplete=null;
    this.start=function()
    {
        _assetLoader.load();
        _assetLoader.onComplete=this.onComplete;
    }
};
