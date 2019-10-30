(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"images/dialogbg.png", id:"dialogbg"}
	]
};



// symbols:



(lib.dialogbg = function() {
	this.initialize(img.dialogbg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.dialogbg();
	this.instance.setTransform(-200,-200);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-200,-200,400,400);


// stage content:
(lib.mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.mc1();
	this.instance.setTransform(200,200);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(275,200,400,400);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;