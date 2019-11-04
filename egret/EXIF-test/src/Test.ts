class Test extends egret.Sprite {

    private isInited = false;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }

    private createView(e): void {
        let input = <HTMLInputElement>document.createElement("input");
        input.id = "upload";
        input.type = "file";
        input.onchange = e => {
            var file = input.files[0];
            console.log(file);
            window["EXIF"].getData(file,function() {

                alert("--" + window["EXIF"].getTag(file,'Orientation'));

            });
            
            let url = window.URL.createObjectURL(file);
            let img = new Image();
            img.onload = e => {
                
                let bmp = new egret.Bitmap(new egret.BitmapData(img));
                this.addChild(bmp);
            }
            img.src = url;
        }

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (!this.isInited) {
                input.click();
                this.isInited = true;
            } else {
                let rt = new egret.RenderTexture();
                rt.drawToTexture(this, new egret.Rectangle(0, 0, 200, 200));
                let str = rt.toDataURL("image/png");

                let img = new Image();
                img.src = str;
                document.body.appendChild(img);
            }
        }, this);
    }
}
