GAME.Scene = function ()
{
    PIXI.Container.call(this);
};
GAME.Utils.inherit(GAME.Scene, PIXI.Container);
GAME.Utils.extend(GAME.Scene.prototype, GAME.EventDispatcher.prototype);
GAME.Scene.prototype.init = function (){}
GAME.Scene.prototype.destroy = function (){}
GAME.Scene.prototype.sceneIn = function ()
{
    this.dispatchEvent(new GAME.Event(GAME.SCENE_IN));
};
GAME.Scene.prototype.update=function(){

}
GAME.Scene.prototype.sceneOut = function ()
{
    this.dispatchEvent(new GAME.Event(GAME.SCENE_OUT));
};
GAME.Scene.prototype.sceneInComplete = function ()
{
    this.dispatchEvent(new GAME.Event(GAME.SCENE_IN_COMPLETE));
};
GAME.Scene.prototype.sceneOutComplete = function ()
{
    this.dispatchEvent(new GAME.Event(GAME.SCENE_OUT_COMPLETE));
};