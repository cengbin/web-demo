var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this);
        this.isInited = false;
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    var d = __define,c=Test,p=c.prototype;
    p.createView = function (e) {
        var _this = this;
        var input = document.createElement("input");
        input.id = "upload";
        input.type = "file";
        input.onchange = function (e) {
            var file = input.files[0];
            console.log(file);
            window["EXIF"].getData(file, function () {
                alert("--" + window["EXIF"].getTag(file, 'Orientation'));
            });
            var url = window.URL.createObjectURL(file);
            var img = new Image();
            img.onload = function (e) {
                var bmp = new egret.Bitmap(new egret.BitmapData(img));
                _this.addChild(bmp);
            };
            img.src = url;
        };
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!_this.isInited) {
                input.click();
                _this.isInited = true;
            }
            else {
                var rt = new egret.RenderTexture();
                rt.drawToTexture(_this, new egret.Rectangle(0, 0, 200, 200));
                var str = rt.toDataURL("image/png");
                var img = new Image();
                img.src = str;
                document.body.appendChild(img);
            }
        }, this);
    };
    return Test;
}(egret.Sprite));
egret.registerClass(Test,'Test');
