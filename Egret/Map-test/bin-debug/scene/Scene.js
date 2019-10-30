var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.isSceneIn = false;
        _this.isSceneOut = false;
        _this.name = egret.getQualifiedClassName(_this);
        //console.log("class name is:",this.name);
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Scene.prototype.onAddToStage = function (event) {
        //this._sw=this.stage.stageWidth;
        //this._sh=this.stage.stageHeight;
        this._sw = Scene.S_W;
        this._sh = Scene.S_H;
        //console.log("%s: _sw:%d_sh:%d",this.name,this._sw,this._sh);
    };
    Scene.prototype.init = function () {
    };
    Scene.prototype.sceneIn = function () {
        //console.log(this.name + ": scene in");
        this.isSceneIn = true;
        this.dispatchEvent(new egret.Event(Scene.SCENE_IN));
    };
    Scene.prototype.sceneInComplete = function () {
        this.dispatchEvent(new egret.Event(Scene.SCENE_IN_COMPLETE));
    };
    Scene.prototype.sceneOut = function () {
        //console.log(this.name+": scene out");
        if (this.isSceneOut)
            return;
        this.isSceneOut = true;
        this.dispatchEvent(new egret.Event(Scene.SCENE_OUT));
    };
    Scene.prototype.sceneOutComplete = function () {
        this.dispatchEvent(new SceneEvent(Scene.SCENE_OUT_COMPLETE, this.name));
    };
    return Scene;
}(egret.DisplayObjectContainer));
Scene.SCENE_IN = "scene_in";
Scene.SCENE_OUT = "scene_out";
Scene.SCENE_IN_COMPLETE = "scene_in_complete";
Scene.SCENE_OUT_COMPLETE = "scene_out_complete";
__reflect(Scene.prototype, "Scene");
