/**
 *
 * @author
 *
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.call(this);
        this.name = egret.getQualifiedClassName(this);
        console.log("class name is:", this.name);
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Scene,p=c.prototype;
    p.onAddToStage = function (event) {
    };
    p.init = function () {
    };
    p.sceneIn = function () {
    };
    p.sceneInComplete = function () {
        this.dispatchEvent(new egret.Event(Scene.SCENE_IN_COMPLETE));
    };
    p.sceneOut = function () {
    };
    p.sceneOutComplete = function () {
        this.dispatchEvent(new SceneEvent(Scene.SCENE_OUT_COMPLETE, this.name));
    };
    Scene.SCENE_IN_COMPLETE = "scene_in_complete";
    Scene.SCENE_OUT_COMPLETE = "scene_out_complete";
    return Scene;
}(egret.DisplayObjectContainer));
egret.registerClass(Scene,'Scene');
