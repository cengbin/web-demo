/**
 *
 * @author
 *
 */
var MaskObject = (function (_super) {
    __extends(MaskObject, _super);
    function MaskObject() {
        _super.call(this);
        this.col = 0;
        this.row = 0;
        this.vf = 0;
        this.plength = 0;
        this.min_w = 40;
        this.min_h = 40;
        this.nodeArr = [];
        this.dis = false;
        this.r = 40;
    }
    var d = __define,c=MaskObject,p=c.prototype;
    p.init = function (source_name, bo) {
        this._sw = Scene.S_W;
        this._sh = Scene.S_H;
        //alert(this._sw+"---"+this._sh);
        var sp1 = Egr.getZBMP(source_name);
        sp1.width = this._sw;
        sp1.height = this._sh;
        this.addChild(sp1);
        //sp1.name=source_name;
        this.sp = sp1;
        //sp1.alpha=0.5;
        this.maskView = new egret.DisplayObjectContainer();
        this.addChild(this.maskView);
        sp1.mask = this.maskView;
        var s2_sp8 = Egr.getZBMP("s2_sp8");
        s2_sp8.width = this.r;
        s2_sp8.height = this.r;
        s2_sp8.setTransform(s2_sp8.width / 2, s2_sp8.height / 2, this._sw / 2, this._sh / 2);
        s2_sp8.pixelHitTest = true;
        s2_sp8.visible = false;
        this.maskView.addChild(s2_sp8);
        this.curs = s2_sp8;
        //this.curs["offset"] = { stageX: sx,stageY: sy };
        this.curs["offset"] = { stageX: this._sw / 2, stageY: this._sh / 2 };
        /*var shap = new egret.Shape();
        shap.graphics.beginFill(0xff0000);
//        shap.graphics.drawCircle(300,300,this.r);
        shap.graphics.endFill();
        this.maskView.addChild(shap);
        this.curs = shap;*/
        this.creatNode();
    };
    p.creatNode = function () {
        this.col = Math.ceil(this._sw / this.min_w);
        this.row = Math.ceil(this._sh / this.min_h);
        this.plength = this.col * this.row;
        console.log("总列:%d 总行:%d 总长度:%d", this.col, this.row, this.plength);
        console.log("宽：%d 高:%d", this.min_w, this.min_h);
        for (var i = 0; i < this.col; i++) {
            var arr = [];
            this.nodeArr.push(arr);
            for (var j = 0; j < this.row; j++) {
                //var sl = Math.random() * 0xffffff;
                var x = i * this.min_w;
                var y = j * this.min_h;
                /*var sl = 0xcccccc;
                var s: egret.Shape = new egret.Shape();
                s.graphics.beginFill(sl);
                s.graphics.lineStyle(1,0xFF0000);
                s.graphics.moveTo(0,0);
                s.graphics.lineTo(0 + this.min_w,0);
                s.graphics.lineTo(0 + this.min_w,0 + this.min_w);
                s.graphics.lineTo(0,0 + this.min_w);
                s.graphics.endFill();
                this.addChildAt(s,0);
                s.x = i * this.min_w;
                s.y=y;*/
                var node = {
                    visible: true,
                    x: x,
                    y: y,
                    w: this.min_w,
                    h: this.min_h,
                };
                arr.push(node);
            }
        }
        //console.log(this.nodeArr);
    };
    p.play = function (sx, sy) {
        //this.r = 60;
        /*var shap = new egret.Shape();
        shap.graphics.beginFill(0xff0000);
        shap.graphics.drawCircle(sx,sy,this.r);
        shap.graphics.endFill();*/
        if (!this.curs.visible) {
            this.curs.visible = true;
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.onenterframe, this);
    };
    /*public pause() {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onenterframe,this);
    }*/
    p.stop = function () {
        if (this.hasEventListener(egret.Event.ENTER_FRAME))
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onenterframe, this);
        if (this.dis)
            return;
        //this.dispose();
    };
    p.onenterframe = function (event) {
        this.r += 8;
        /*this.curs.graphics.clear();
        this.curs.graphics.beginFill(0xff0000);
        this.curs.graphics.drawCircle(this.curs["offset"].stageX,this.curs["offset"].stageY,this.r);
        this.curs.graphics.endFill();*/
        this.curs.width = this.curs.height = this.r;
        this.curs.anchorOffsetX = this.curs.width / 2;
        this.curs.anchorOffsetY = this.curs.height / 2;
        if (this.nodeArr.length > 0) {
            var col = Math.floor((this.curs["offset"].stageX) / this.min_w);
            var row = Math.floor((this.curs["offset"].stageY) / this.min_h);
            //console.log("列：%d行：%d",col,row);
            var tag_node = this.nodeArr[col][row];
            var tag_node_x = tag_node.x + tag_node.w / 2;
            var tag_node_y = tag_node.y + tag_node.h / 2;
            for (var i = 0; i < this.col; i++) {
                for (var j = 0; j < this.row; j++) {
                    var cur_node = this.nodeArr[i][j];
                    var cur_node_x = cur_node.x + cur_node.w / 2;
                    var cur_node_y = cur_node.y + cur_node.h / 2;
                    var distance = Math.sqrt(Math.pow(cur_node_x - tag_node_x, 2) + Math.pow(cur_node_y - tag_node_y, 2));
                    if (distance <= this.r && cur_node.visible) {
                        cur_node.visible = false;
                        this.vf++;
                    }
                }
            }
            var a = (this.vf / this.plength) * 100;
            //console.log(a);
            if (a >= 100) {
                this.dispose();
            }
        }
    };
    p.dispose = function () {
        this.dis = true;
        if (this.hasEventListener(egret.Event.ENTER_FRAME))
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onenterframe, this);
        if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            var s2 = this.parent;
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, s2.onTouchBeginObj, s2);
        }
        /*var s2_sp8: ZBitmap = Egr.getZBMP("s2_sp8");
        this.maskView.addChild(s2_sp8);
        s2_sp8.setTransform(s2_sp8.width/2,s2_sp8.height/2,this._sw/2,this._sh/2);*/
        egret.Tween.get(this.curs, {
            onChange: function () {
                this.curs.anchorOffsetX = this.curs.width / 2;
                this.curs.anchorOffsetY = this.curs.height / 2;
            },
            onChangeObj: this
        }).to({ width: this._sh * 1.5, height: this._sh * 1.5 }, 1000).call(function () {
            this.dispatchEvent(new egret.Event("complete"));
            /*var s2: Scene2 = <Scene2>this.parent.parent;
            if(this.name != "m6")
                s2.showHit();*/
            this.sp.mask = null;
            this.maskView.visible = false;
            if (this.maskView.parent) {
                this.maskView.parent.removeChild(this.maskView);
            }
        }, this);
        console.log("dispose");
    };
    return MaskObject;
}(egret.Sprite));
egret.registerClass(MaskObject,'MaskObject');
