/**
 *
 * @author
 *
 */
var Scene3 = (function (_super) {
    __extends(Scene3, _super);
    function Scene3() {
        _super.call(this);
    }
    var d = __define,c=Scene3,p=c.prototype;
    p.onAddToStage = function (event) {
        _super.prototype.onAddToStage.call(this, event);
        this.sceneIn();
    };
    p.sceneIn = function () {
        _super.prototype.addBG.call(this, "s3_sp1");
        this.bg.alpha = 0;
        egret.Tween.get(this.bg).to({ alpha: 1 }, 800);
        egret.setTimeout(this.initStage1, this, 300);
        egret.setTimeout(this.sceneOut, this, 7000);
    };
    p.sceneOut = function () {
        _super.prototype.sceneOut.call(this);
        egret.Tween.get(this).to({ alpha: 0 }, 800).call(function () {
            if (this.parent)
                this.parent.removeChild(this);
        }, this);
    };
    p.initStage1 = function () {
        this.creatText1();
        egret.setTimeout(this.creatText2, this, 1500);
    };
    p.creatText1 = function () {
        var data = {
            "source": "s3_txt_fnt",
            "text": "持恒为之完美",
            "showTime": 3500
        };
        var texts = data.text.split("");
        var font = RES.getRes(data.source);
        var show = data.showTime || 1500;
        var view = new egret.DisplayObjectContainer();
        this.addChild(view);
        view.x = this._sw - 160;
        view.y = 300;
        var textArr = [];
        var mg_right = 0;
        var last_x = 0;
        var last_y = 0;
        for (var i = 0; i < texts.length; i++) {
            var t = new egret.BitmapText();
            t.font = font;
            view.addChild(t);
            t.text = texts[i];
            t.anchorOffsetX = t.width / 2;
            t.anchorOffsetY = t.height / 2;
            t.alpha = 0;
            if (i != 0) {
                t.x = textArr[i - 1].x - textArr[i - 1].width - 6;
                if (texts[i] == "为") {
                    t.x += 23;
                }
                t.y = textArr[i - 1].y;
            }
            var rd1 = Math.random() * 1500;
            var rd2 = Math.random() * 500 + 1500;
            egret.Tween.get(t).wait(rd1)
                .to({ alpha: 1 }, rd2);
            textArr.push(t);
        }
    };
    p.creatText2 = function () {
        var view = new egret.DisplayObjectContainer();
        this.addChild(view);
        view.x = this._sw - 200;
        view.y = 232;
        var data = {
            "source": "s3_txt_fnt",
            "text": "每一辆劳斯莱斯都是车轮上的艺术品",
            "br": [[9, 90]]
        };
        var texts = data.text.split("");
        var font = RES.getRes(data.source);
        var textArr = [];
        var mg_right = 0;
        var last_x = 0;
        var last_y = 0;
        var show = 1500;
        var br = data.br;
        for (var i = 0; i < texts.length; i++) {
            var bo = false;
            if (br) {
                for (var j = 0; j < br.length; j++) {
                    if (i == br[j][0]) {
                        bo = true;
                        mg_right = br[j][1];
                        last_x = textArr[i - 1].x - textArr[i - 1].width - 4;
                        last_y = textArr[i - 1].height;
                    }
                }
            }
            var t = new egret.BitmapText();
            t.font = font;
            view.addChild(t);
            t.text = texts[i];
            t.rotation = 90;
            t.anchorOffsetX = t.width / 2;
            t.anchorOffsetY = t.height / 2;
            t.alpha = 0;
            if (i != 0) {
                if (bo) {
                    t.x = textArr[i - 1].x - textArr[i - 1].height - 3 - last_x - mg_right;
                    t.y = textArr[i - 1].y - last_y - 15;
                }
                else {
                    t.x = textArr[i - 1].x - textArr[i - 1].height - 3;
                    t.y = textArr[i - 1].y;
                }
            }
            var rd1 = Math.random() * 1000;
            var rd2 = Math.random() * 500 + 1000;
            egret.Tween.get(t).wait(rd1)
                .to({ alpha: 1 }, rd2);
            textArr.push(t);
        }
    };
    return Scene3;
}(Scene));
egret.registerClass(Scene3,'Scene3');