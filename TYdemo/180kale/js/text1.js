var _w = window.innerWidth;
var _h = window.innerHeight;

var _r=_w>_h?_w/2:_h/2;

var renderer = PIXI.autoDetectRenderer(_r*2, _r*2);


document.getElementById('wrap').style.marginLeft = -_r+'px'
document.getElementById('wrap').style.marginTop = _h/2-_r+'px'

document.getElementById('wrap').appendChild(renderer.view);

var stage = new PIXI.Container();
    stage.interactive = true;

var pageX=0.5,pageY=0.5;

document.addEventListener('mousemove',function(event){
    pageX = event.pageX/(_r*4);
    pageY = event.pageY/(_r*4);
})

document.addEventListener('touchmove',function(e){
    e=e||window.event;
    pageX=(!!e.changedTouches? e.changedTouches[0].pageX: e.pageX)/(_r*4);
    pageY=(!!e.changedTouches? e.changedTouches[0].pageY: e.pageY)/(_r*4);
})


var pic=['img/bg.jpg']
var img=pic[0];

var count = 0;
var ImgA_list=[];
var ImgB_list=[];


var moveSpeed=-0.0006;


var pos={
    X:['1','1','1',(Math.tan(Math.PI/8)+1)/2,'0.5',1-(Math.tan(Math.PI/8)+1)/2,'0','0','0','0','0',1-(Math.tan(Math.PI/8)+1)/2,'0.5',(Math.tan(Math.PI/8)+1)/2,'1','1','1'],
    Y:['0.5',(Math.tan(Math.PI/8)+1)/2,'1','1','1','1','1',(Math.tan(Math.PI/8)+1)/2,'0.5',1-(Math.tan(Math.PI/8)+1)/2,'0','0','0','0','0',1-(Math.tan(Math.PI/8)+1)/2,'0.5']
}



function drawA(img,index)
{
    var _imgA=PIXI.Sprite.fromImage(img);
    _imgA.position.x = _r;
    _imgA.position.y = _r;
    _imgA.anchor.x = 0.5;
    _imgA.anchor.y = 0.5;
    stage.addChild(_imgA);
    
    var _mask=new PIXI.Graphics();
    _mask.lineStyle(0);
    _mask.beginFill(0x00ff00, 0.4);
    _mask.moveTo(_r, _r );
    _mask.lineTo(pos.X[(index-1)*2] *_r*2, pos.Y[(index-1)*2]*_r*2);
    _mask.lineTo(pos.X[index*2-1] *_r*2, pos.Y[index*2-1]*_r*2);
    _mask.endFill();
    stage.addChild(_mask);

    _imgA.rotation = (Math.PI/4)*(index-1) +count;
    _imgA.mask = _mask;


    ImgA_list.push(_imgA)
}






function drawB(img,index)
{
    var _imgB=PIXI.Sprite.fromImage(img);
    _imgB.position.x = _r;
    _imgB.position.y = _r;
    _imgB.anchor.x = 0.5;
    _imgB.anchor.y = 0.5;
    stage.addChild(_imgB);


    var _mask=new PIXI.Graphics();
    _mask.lineStyle(0);
    _mask.beginFill(0x00ff00, 0.4);
    _mask.moveTo(_r, _r);
    _mask.lineTo(pos.X[(index-1)*2+1] *_r*2, pos.Y[(index-1)*2+1]*_r*2);
    _mask.lineTo(pos.X[index*2] *_r*2, pos.Y[index*2]*_r*2);
    _mask.endFill();
    stage.addChild(_mask);

    _imgB.rotation = (Math.PI*5/4)+(Math.PI/4)*(index-1);
    _imgB.scale.x = -1;
    _imgB.mask = _mask;


    ImgB_list.push(_imgB)

}



for (var i = 1; i <= 8; i++) {
    drawA(img,i);
    drawB(img,i);
}

animate();


function animate()
{
    if(pageX+count>0&&pageX+count<0.5&&pageY+count>0&&pageY+count<0.5){
        for(var i=0;i<ImgA_list.length;i++){
            ImgA_list[i].anchor.x =pageX+count;
            ImgA_list[i].anchor.y =pageY+count;
            ImgB_list[i].anchor.x =pageX+count;
            ImgB_list[i].anchor.y =pageY+count;
        }
    }

    count +=moveSpeed;

    if(count<-0.2)moveSpeed=-moveSpeed;
    if(count>0.2)moveSpeed=-moveSpeed;


    
    renderer.render(stage);
    requestAnimationFrame(animate);
}





