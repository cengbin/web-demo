class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        console.log("main");
        var test=new Test();
        this.addChild(test);
    }
}