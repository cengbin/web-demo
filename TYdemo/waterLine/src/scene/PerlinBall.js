function PerlinBall(_position)
{
    var _this = this;


    var perlinNoise = new PerlinNoise(Math.floor(Math.random() * 1000) + 1);
    perlinNoise.octaves(4);
    //perlinNoise.fallout(0.4);

    var off = 0;
    var points;

    //Position
    _this.position=new Point(_position.x,_position.y);
    var end = new Point(_this.position.x*2,0);

    // radius
    _this.r=10;

    // speed
    _this.speed = 0.004;

    // line width
    _this.lineWidth = 1;

    // alpha
    _this.alpha=1;


    _this.update = function()
    {

        var length = Math.PI*_this.r*2;
        var step = Math.floor(Math.sqrt(_this.r)+6);//point Number

        var normal = end.subtract(_this.position);
        var rad = normal.angle();
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        var i, len;

        points = [];
        off += _this.speed;


        for (i = 0, len = step + 1; i < len; i++)
        {
            var na = length*perlinNoise.noise(i / 40 - off);
            var ax = sin * na;
            var ay = cos * na;

            var nb = length*perlinNoise.noise(i / 40 + off);
            var bx = sin * nb;
            var by = cos * nb;

            var m = Math.sin((Math.PI * (i / (len - 1))));

            var x = _this.position.x + Math.cos(i/step*Math.PI*2)*_this.r+ (ax - bx) * m;
            var y = _this.position.y + Math.sin(i/step*Math.PI*2)*_this.r+ (ay - by) * m;


            points.push(new Point(x, y));
        };

    };

    _this.draw = function(ctx)
    {
        var i, len, p;

        ctx.lineStyle(Math.random() * _this.lineWidth + 1,0xffffff,0.4*_this.alpha);
        ctx.beginFill(0xffffff,0.3*_this.alpha);
        for (i = 0, len = points.length; i < len; i++)
        {
            p = points[i];
            ctx[i === 0 ? 'moveTo' : 'lineTo'](p.x, p.y);
        }
        ctx.endFill();
    };

}
