/**
 *
 * @author
 *
 */
var SceneEvent = (function (_super) {
    __extends(SceneEvent, _super);
    function SceneEvent(type, param) {
        _super.call(this, type);
        this.param = param;
    }
    var d = __define,c=SceneEvent,p=c.prototype;
    return SceneEvent;
}(egret.Event));
egret.registerClass(SceneEvent,'SceneEvent');
