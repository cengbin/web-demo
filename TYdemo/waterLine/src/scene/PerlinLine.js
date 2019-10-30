function PerlinLine(startPoint,endPoint)
{
    var _this = this;

    var start = new Point(startPoint.x,startPoint.y);
    var end = new Point(endPoint.x,endPoint.y);
    var step = 8;

    var perlinNoise = new PerlinNoise(Math.floor(Math.random() * 1000) + 1);
    perlinNoise.octaves(5);
    perlinNoise.fallout(0.4);

    var off = 0;
    var points;
    var mouse=new Point(0,0);

    // speed
    _this.speed = 0.002;

    // line width
    _this.lineWidth = .1;

    _this.length = function()
    {
        return start.distance(end);
    };

    _this.movePoint = function(_x,_y)
    {
        mouse.set(_x,_y);
    }
    _this.setPoint = function(startPoint,endPoint)
    {
        start.set(startPoint.x,startPoint.y);
        end.set(endPoint.x,endPoint.y);
    }

    _this.update = function()
    {

        var length = _this.length();
        var normal = end.subtract(start).normalize(length / step);
        var rad = normal.angle();
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        var i, len;

        points = [];
        off += _this.speed;


        for (i = 0, len = step + 1; i < len; i++)
        {
            var na = length * perlinNoise.noise(i / 60 - off);
            var ax = sin * na;
            var ay = cos * na;

            var nb = length * perlinNoise.noise(i / 60 + off);
            var bx = sin * nb;
            var by = cos * nb;

            var p= new Point(start.x +(end.x-start.x)*i/step, start.y+(ay-by));
            var m= 100/(p.distance(mouse)+5);
            if(ay>by)m=1;

            if(mouse.x>0)mouse.x-=0.1;
            if(mouse.y>0)mouse.y-=0.1;

            var x = start.x + (end.x-start.x)*i/step+ (ax - bx) * m;
            var y = start.y + (end.y-start.y)*i/step+ (ay - by) * m;

            points.push(new Point(x, y));
        };

    };

    _this.draw = function(ctx,_y)
    {
        var i, len, p;

        ctx.lineStyle(Math.random() * _this.lineWidth + 1,0xffffff,0.5);
        ctx.beginFill(0xffffff,0.2);
        for (i = 0, len = points.length; i < len; i++) {
            p = points[i];
            //ctx[i === 0 ? 'moveTo' : 'lineTo'](p.x, p.y);
            if(i==0)
            {
                ctx.moveTo(start.x,_y);
                ctx.lineTo(p.x,p.y);
            }else if(i==len-1)
            {
                ctx.lineTo(p.x,p.y);
                ctx.lineTo(end.x,_y);
            }else{
                ctx.lineTo(p.x,p.y);
            }
        }
        ctx.endFill();
        //ctx.restore();


    };
}
