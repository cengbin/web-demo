/**
 *
 * @author
 *
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.call(this);
        this.isSceneIn = false;
        this.isSceneOut = false;
        this.name = egret.getQualifiedClassName(this);
        //console.log("class name is:",this.name);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Scene,p=c.prototype;
    p.onAddToStage = function (event) {
        //this._sw=this.stage.stageWidth;
        //this._sh=this.stage.stageHeight;
        this._sw = Scene.S_W;
        this._sh = Scene.S_H;
        //console.log("%s: _sw:%d_sh:%d",this.name,this._sw,this._sh);
    };
    p.init = function () {
    };
    p.initStage1 = function () {
        this.stage1View = new egret.DisplayObjectContainer();
        this.addChild(this.stage1View);
    };
    p.initStage2 = function () {
        this.stage2View = new egret.DisplayObjectContainer();
        this.addChild(this.stage2View);
    };
    p.addBG = function (name) {
        this.bg = Egr.getZBMP(name);
        this.bg.width = this._sw;
        this.bg.height = this._sh;
        this.addChild(this.bg);
    };
    p.sceneIn = function () {
        //console.log(this.name + ": scene in");
        this.isSceneIn = true;
        this.dispatchEvent(new egret.Event(Scene.SCENE_IN));
    };
    p.sceneInComplete = function () {
        this.dispatchEvent(new egret.Event(Scene.SCENE_IN_COMPLETE));
    };
    p.sceneOut = function () {
        //console.log(this.name+": scene out");
        if (this.isSceneOut)
            return;
        this.isSceneOut = true;
        this.dispatchEvent(new egret.Event(Scene.SCENE_OUT));
    };
    p.sceneOutComplete = function () {
        this.dispatchEvent(new SceneEvent(Scene.SCENE_OUT_COMPLETE, this.name));
    };
    Scene.SCENE_IN = "scene_in";
    Scene.SCENE_OUT = "scene_out";
    Scene.SCENE_IN_COMPLETE = "scene_in_complete";
    Scene.SCENE_OUT_COMPLETE = "scene_out_complete";
    return Scene;
}(egret.DisplayObjectContainer));
egret.registerClass(Scene,'Scene');
