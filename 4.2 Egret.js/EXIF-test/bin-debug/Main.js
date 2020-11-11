var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        console.log("main");
        var test = new Test();
        this.addChild(test);
    }
    var d = __define,c=Main,p=c.prototype;
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
