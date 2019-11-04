/**
 *
 * @author
 *
 */
var Scene1 = (function (_super) {
    __extends(Scene1, _super);
    function Scene1() {
        _super.call(this);
        this.imgArr = [];
        this.curImgIndex = 0;
        this.textCurrentIndex = 0;
        this.textinfos = null;
        this.itv = null;
    }
    var d = __define,c=Scene1,p=c.prototype;
    p.onAddToStage = function (event) {
        _super.prototype.onAddToStage.call(this, event);
        //this.sceneIn();
    };
    p.sceneIn = function () {
        this._sw = Scene.S_W;
        this._sh = Scene.S_H;
        //alert(this._sw + "---" + this._sh);
        this.initStage1();
        egret.setTimeout(this.initStage2, this, 600);
    };
    p.sceneOut = function () {
        _super.prototype.sceneOut.call(this);
        egret.Tween.get(this).to({ alpha: 0 }, 800).call(function () {
            if (this.parent)
                this.parent.removeChild(this);
        }, this);
    };
    p.initStage1 = function () {
        this.imgArr.push({ showTime: 7000 }, { showTime: 3500 }, { showTime: 10000 });
        //console.log(this.imgArr);
        for (var i = 0; i < this.imgArr.length; i++) {
            var img = Egr.getZBMP("s1_sp" + String(i + 1));
            img.alpha = 0;
            img.width = this._sw;
            img.height = this._sh;
            this.imgArr[i]["img"] = img;
        }
        this.changeImg();
    };
    p.changeImg = function () {
        this.curImg = this.imgArr[this.curImgIndex]["img"];
        this.addChildAt(this.curImg, 0);
        var delay = this.imgArr[this.curImgIndex]["showTime"];
        egret.Tween.get(this.curImg)
            .to({ alpha: 1 }, 800)
            .wait(delay).to({ alpha: 0 }, 800).call(function () {
            if (this.parent)
                this.parent.removeChild(this);
        }, this.curImg);
        if (++this.curImgIndex < this.imgArr.length) {
            egret.setTimeout(this.changeImg, this, delay + 800);
        }
        else {
            egret.setTimeout(this.sceneOut, this, delay + 800);
        }
    };
    p.initStage2 = function () {
        this.textCurrentIndex = 0;
        this.textinfos = [
            {
                "source": "s1_txt2_fnt",
                "text": "中国当代影像大家杨福东先生",
                "showTime": 500,
                "br": [[8, 0]]
            },
            {
                "source": "s1_txt3_fnt",
                "text": "在造访左劳斯莱斯之家右后",
                "showTime": 500,
                "br": [[3, 0]]
            },
            {
                "source": "s1_txt4_fnt",
                "text": "创作出艺术短片上愚公移山下",
                "showTime": 500,
                "br": [[7, 0]]
            },
            {
                "source": "s1_txt5_fnt",
                "text": "以独具特色的黑白影像将中国古老故事与现代精神融合碰撞",
                "showTime": 2000,
                "br": [[10, 0], [22, 0]]
            },
            {
                "source": "s1_txt6_fnt",
                "text": "重新阐述坚持不懈的中国传统文化精髓",
                "br": [[9, 0]]
            }
        ];
        this.creatText();
    };
    p.creatText = function () {
        //console.count("");
        var textSp2 = new TextEffect2(this.textinfos[this.textCurrentIndex], true);
        this.addChild(textSp2);
        textSp2.x = this._sw - 84 - 15;
        textSp2.y = this._sh - 55 - 15;
        var show = this.textinfos[this.textCurrentIndex].showTime || 1500;
        var delay = 3500 + show;
        if (++this.textCurrentIndex < this.textinfos.length) {
            egret.setTimeout(this.creatText, this, delay);
        }
    };
    return Scene1;
}(Scene));
egret.registerClass(Scene1,'Scene1');
