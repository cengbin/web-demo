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
var EditImage = (function (_super) {
    __extends(EditImage, _super);
    function EditImage() {
        var _this = _super.call(this) || this;
        _this.wth = 305;
        _this.heig = 305;
        _this.touchPoints = { names: [] };
        _this.touchCon = 0;
        _this.distance = 0;
        _this.defAngle = 0;
        _this.currentEditObjRotation = 0;
        return _this;
    }
    EditImage.prototype.startEditImage = function (img) {
        var bmd = new egret.BitmapData(img);
        var texture = new egret.Texture();
        texture._setBitmapData(bmd);
        this.editObj = new egret.Bitmap(texture);
        this.editObj.anchorOffsetX = this.editObj.width / 2;
        this.editObj.anchorOffsetY = this.editObj.height / 2;
        this.editObj.x = this.maskObj.width / 2;
        this.editObj.y = this.maskObj.height / 2;
        this.addChild(this.editObj);
        var bm = this.editObj;
        // 判断拍照设备持有方向调整照片角度
        //alert("--"+window["EXIF"].pretty(img));
        var obj = window["EXIF"].getAllTags(img);
        /*
         * 图片显示情况
         * 0°	1
         * 顺时针90°	6
         * 逆时针90°	8
         * 180°	3
         */
        var or = obj["Orientation"];
        switch (or) {
            case 6:
                bm.rotation = 90;
                this.currentEditObjRotation = 90;
                break;
            case 3:
                bm.rotation = 180;
                this.currentEditObjRotation = 180;
                break;
            case 8:
                bm.rotation = -90;
                this.currentEditObjRotation = -90;
                break;
            default:
        }
        this.editObj.mask = this.maskObj;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.mouseUp, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    EditImage.prototype.endEditImage = function () {
        this.touchEnabled = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.mouseUp, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    EditImage.prototype.TextureToBase64 = function () {
        var rt = new egret.RenderTexture(); //建立缓冲画布
        console.log(this.wth, this.heig);
        var boo = rt.drawToTexture(this, new egret.Rectangle(0, 0, this.wth, this.heig)); //将对象画到缓冲画布上(可指定画对象的某个区域，或画整个)
        var imageBase64 = rt.toDataURL("image/png"); //转换为图片base64；
        //imageBase64 = imageBase64.substr(22); //去掉 data:image/png;base64,
        console.log(imageBase64.length);
        return imageBase64;
    };
    EditImage.prototype.mouseDown = function (evt) {
        this.editObj["offset"] = { x: evt.stageX - this.editObj.x, y: evt.stageY - this.editObj.y };
        //egret.log("touch begin:"+evt.touchPointID);
        if (this.touchPoints[evt.touchPointID] == null) {
            this.touchPoints[evt.touchPointID] = new egret.Point(evt.stageX, evt.stageY);
            this.touchPoints["names"].push(evt.touchPointID);
        }
        this.touchCon++;
        if (this.touchCon == 2) {
            this.distance = this.getTouchDistance();
            //egret.log("distance:"+this.distance);
            this.defAngle = this.getTouchAngle();
        }
    };
    EditImage.prototype.mouseMove = function (evt) {
        this.touchPoints[evt.touchPointID].x = evt.stageX;
        this.touchPoints[evt.touchPointID].y = evt.stageY;
        if (this.touchCon == 1) {
            //egret.log("touch move:" + evt.touchPointID);
            this.editObj.x = evt.stageX - this.editObj["offset"].x;
            this.editObj.y = evt.stageY - this.editObj["offset"].y;
        }
        if (this.touchCon == 2) {
            var newdistance = this.getTouchDistance();
            this.editObj.scaleX = this.editObj.scaleY = newdistance / this.distance;
            var newangle = this.getTouchAngle();
            this.editObj.rotation = this.currentEditObjRotation + newangle - this.defAngle;
        }
    };
    EditImage.prototype.mouseUp = function (evt) {
        egret.log("touch end:" + evt.touchPointID);
        delete this.touchPoints[evt.touchPointID];
        var index = this.touchPoints["names"].indexOf(evt.touchPointID);
        if (index >= 0) {
            this.touchPoints["names"].splice(index, 1);
        }
        if (this.touchPoints["names"].length > 0) {
            var touchPointId = this.touchPoints["names"][0];
            var p = this.touchPoints[touchPointId];
            //window["$"]("#msg").html(p.x+"--"+p.y);
            window["$"]("#msg").html(p);
            this.editObj["offset"] = { x: p.x - this.editObj.x, y: p.y - this.editObj.y };
        }
        this.touchCon--;
        this.editObj.width *= this.editObj.scaleX;
        this.editObj.height *= this.editObj.scaleY;
        this.editObj.scaleX = 1;
        this.editObj.scaleY = 1;
        this.editObj.anchorOffsetX = this.editObj.width / 2;
        this.editObj.anchorOffsetY = this.editObj.height / 2;
        this.currentEditObjRotation = this.editObj.rotation;
        egret.log("bird size [wdith:" + this.editObj.width.toFixed(1) + ", height:" + this.editObj.height.toFixed(1) + "]");
        egret.log("bird angle:" + this.editObj.rotation);
        //        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
        //        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.mouseUp,this);
        //        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
    };
    EditImage.prototype.getTouchDistance = function () {
        var distance = 0;
        var names = this.touchPoints["names"];
        var p1 = this.touchPoints[names[names.length - 1]];
        var p2 = this.touchPoints[names[names.length - 2]];
        distance = egret.Point.distance(p1, p2);
        return distance;
    };
    EditImage.prototype.getTouchAngle = function () {
        var ang = 0;
        var names = this.touchPoints["names"];
        var p1 = this.touchPoints[names[names.length - 1]];
        var p2 = this.touchPoints[names[names.length - 2]];
        var radian = Math.atan2((p1.y - p2.y), (p1.x - p2.x));
        ang = 180 / Math.PI * radian;
        return ang;
    };
    return EditImage;
}(egret.Sprite));
__reflect(EditImage.prototype, "EditImage");
//# sourceMappingURL=EditImage.js.map