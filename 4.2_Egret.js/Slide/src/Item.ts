module com
{
    export class Item extends egret.Sprite {
        private vec: Array<egret.Shape> = [];
        private op = 0;
        private pos = 0;
        private dir = 0;
        private t = 0;
        private cid = -1;

        private spacing = 30;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(e): void {
            let w = this.stage.stageWidth;
            let h = this.stage.stageHeight;
            let mc = new egret.Sprite();

            for (let i = 0; i < 20; i++) {
                let sp = new egret.Shape();
                sp.name = String(i);
                sp.y = (150 + this.spacing) * i;
                let g = sp.graphics;
                g.beginFill(0xFF0000, 0.5);
                g.drawRect(0, 0, w, 150);
                g.endFill();
                mc.addChild(sp);
                sp.touchEnabled = true;
                this.vec.push(sp);

                sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            }

            let sv = new egret.ScrollView2(mc);
            sv.width = w;
            sv.height = h;
            sv.touchChildren=true;

            this.addChild(sv);
        }

        private onTouch(e): void {
            let yp = e.stageY;
            let sp = <egret.Shape>e.currentTarget;
            switch (e.type) {
                case "touchBegin":
                    this.t = egret.getTimer();
                    this.cid = Number(sp.name);
                    this.op = this.pos = yp;
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    sp.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    sp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
                    break;
                case "touchMove":
                    /*
                    if (egret.getTimer() - this.t <= 200) {
                        return;
                    }
                    */
                    let offset = Math.abs(yp - this.op) / 4;
                    if (this.pos > yp) {
                        this.dir = -1;
                    } else {
                        this.dir = 1;
                    }
                    this.pos = yp;

                    for (let i = 0; i < 20; i++) {
                        let obj = this.vec[i];
                        egret.Tween.removeTweens(obj);
                        
                        if(this.dir > 0) {
                            if(i < this.cid) {
                                egret.Tween.get(obj).to({ y: (150 + this.spacing) * i - offset },100).call(() => {
                                    egret.Tween.get(obj).wait(Math.abs(i - this.cid) * 50).to({ y: (150 + this.spacing) * i },150);
                                },this);
                            } else {
                                egret.Tween.get(obj).to({ y: (150 + this.spacing) * i },50);
                            }
                        } else {
                            if(i <= this.cid) {
                                egret.Tween.get(obj).to({ y: (150 + this.spacing) * i },50);
                            } else {
                                egret.Tween.get(obj).to({ y: (150 + this.spacing) * i + offset },100).call(() => {
                                    egret.Tween.get(obj).wait(Math.abs(i - this.cid) * 50).to({ y: (150 + this.spacing) * i },150);
                                },this);
                            }
                        }
                        
                    }
                    break;
                case "touchEnd":
                case "touchReleaseOutside":
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    sp.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    sp.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
                    break;
            }
        }
    }
}
