var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var InputFile = (function () {
    function InputFile(eleId) {
        var _this = this;
        this.input = null;
        this._onLoad = false;
        this.changeComplete = null;
        var self = this;
        if (window["File"] && window["FileList"] && window["FileReader"] && window["Blob"]) {
            var input = document.getElementById(eleId);
            if (!input) {
                input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
            }
            input.addEventListener("change", function (event) {
                _this.inputChange.call(_this, event);
            });
            this.input = input;
        }
        else {
            alert("你的浏览器不支持File Api");
        }
    }
    InputFile.prototype.inputChange = function (event) {
        //     非IE || IE
        event = event || window.event;
        //获取选择的文件列表
        var files = event.target["files"];
        //正则匹配 图片
        var ireg = /image\/.*/i;
        var index = 0;
        var file = files[0];
        console.log('选择了文件:', file.name);
        if (!file.type.match(ireg)) {
            //LoadingUI2.getInstance().hide();
            alert(file.name + "不是图片文件");
            return;
        }
        if (file.size > 5120000) {
            //LoadingUI2.getInstance().hide();
            alert(file.name + "图片大小大于5MB!");
            return;
        }
        //读取图片数据
        var reader = new FileReader();
        reader.onload = this.readerOnload;
        reader.readAsDataURL(file);
    };
    InputFile.prototype.readerOnload = function (event) {
        var _this = this;
        console.log('reader onload:', event.target);
        var img = new Image();
        img.onload = function () {
            if (_this.changeComplete)
                _this.changeComplete.call(_this, img);
        };
        img.src = event.target.result;
    };
    return InputFile;
}());
__reflect(InputFile.prototype, "InputFile");
//# sourceMappingURL=InputFile.js.map