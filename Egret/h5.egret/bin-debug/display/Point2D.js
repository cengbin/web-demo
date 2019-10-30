var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Point2D = (function () {
    function Point2D(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    return Point2D;
}());
__reflect(Point2D.prototype, "Point2D");
//# sourceMappingURL=Point2D.js.map