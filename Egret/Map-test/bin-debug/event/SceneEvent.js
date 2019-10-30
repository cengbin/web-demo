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
var SceneEvent = (function (_super) {
    __extends(SceneEvent, _super);
    function SceneEvent(type, param) {
        var _this = _super.call(this, type) || this;
        _this.param = param;
        return _this;
    }
    return SceneEvent;
}(egret.Event));
__reflect(SceneEvent.prototype, "SceneEvent");
