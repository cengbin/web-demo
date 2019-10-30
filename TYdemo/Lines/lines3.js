PerlinNoise.useClassic = true;


var stats;
var canvas;
var context;
var lightningArr;
var _w,_h;

function init_stats()
{
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
}


function init()
{
	document.body.style.backgroundColor='#000';
	
    canvas = document.getElementById('c');
    canvas.width = _w = window.innerWidth-30;
    canvas.height= _h = window.innerHeight-30;
    context = canvas.getContext('2d');
	
	lightningArr=[];
	for (var i=0; i < 3; i++) 
	{
	   var lightning=new Lightning();
	   lightningArr.push(lightning);
	};
	
	setInterval(loop,1000/60);
};


function loop()
{
    stats.update();
    context.fillStyle = '#000';
    context.fillRect(0, 0, _w, _h);
    
    for (var i=0; i < lightningArr.length; i++) 
    {
       lightningArr[i].update();
       lightningArr[i].draw(context);
    };
}



/**
 * Lightning
 */
function Lightning() {
    var self = this;
        
    var start = new Point(0,200);
    var end = new Point(_w,200);
    var step = 30;
    var length = start.distance(end);
    
    var perlinNoise = new PerlinNoise(Math.floor(Math.random() * 1000) + 1);
    perlinNoise.octaves(4);
    // perlinNoise.fallout(0.5);
    
    var off = 0;
    var points;
    var children = [];
    
    
    // speed
    self.speed = 0.01;
    
    // line width
    self.lineWidth = 4;
    
    self.length = function() {
        return start.distance(end);
    };
    
    self.update = function() {
        
        var length = self.length();
        var normal = end.subtract(start).normalize(length / step);
        var rad = normal.angle();
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        var i, len;
        
        points = [];
        off += self.speed;
        
        for (i = 0, len = step + 1; i < len; i++) {
            var na = length * perlinNoise.noise(i / 60 - off);
            var ax = sin * na;
            var ay = cos * na;
            
            var nb = length * perlinNoise.noise(i / 60 + off);
            var bx = sin * nb;
            var by = cos * nb;
            
            var m = Math.sin((Math.PI * (i / (len - 1))));
            
            var x = start.x + normal.x * i + (ax - bx) * m;
            var y = start.y + normal.y * i - (ay - by) * m;
            
            points.push(new Point(x, y));
        }
        
    };
    
    self.draw = function(ctx) {
        var i, len, p;
    
        ctx.save();
        ctx.lineWidth = Math.random() * self.lineWidth + 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        for (i = 0, len = points.length; i < len; i++) {
            p = points[i];
            ctx[i === 0 ? 'moveTo' : 'lineTo'](p.x, p.y);
        }
        ctx.stroke();
        ctx.restore();
       
        
    };
}



window.onload=function()
{
	init_stats();
	init();
};
