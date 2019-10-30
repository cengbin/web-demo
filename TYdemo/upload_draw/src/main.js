
var assetsToLoader = ["assets/assets.json"];
loader = new PIXI.AssetLoader(assetsToLoader);
loader.onComplete = onAssetsLoaded

loader.load();

var stageWidth=window.innerWidth;
var stageHeight=window.innerHeight;
var stage = new PIXI.Stage(0xcccccc, true);
var canvas = document.getElementById("canvas");
var renderer = new PIXI.CanvasRenderer(stageWidth, stageHeight, canvas);


var uploadBtn;




function onAssetsLoaded()
{
    uploadBtn= PIXI.Sprite.fromFrame("upload.png");
    stage.addChild(uploadBtn);
    uploadBtn.position.x=stageWidth-100;

    $('#upload').bind('change', function(e)
    {
        var reader = new FileReader();
        var f = $(this).attr('files')[0];
        reader.onload = (function(theFile)
        {
            return function(e)
            {
                var image = new Image();
                image.onload = function()
                {
                    uploadImage(image);
                    //setTimeout(uploadImage,100,image)
                }
                image.src = e.target.result;
            };
        })(f);
        reader.readAsDataURL(f);
    });

}




function uploadImage(_image)
{
    var maskCanvas = document.createElement("canvas");
    maskCanvas.style.display = "block";
    maskCanvas.id="maskCanvas";
    document.body.appendChild(maskCanvas);
    maskCanvas.width=256;
    maskCanvas.height=256;
    var maskContext = maskCanvas.getContext("2d");
    var maskImg = PIXI.Texture.fromFrame("b1.png").baseTexture.source;
    maskContext.drawImage(maskImg,0,0,256,256,0,0,256,256);

    var imgCanvas = document.createElement('canvas');
    imgCanvas.style.display = "block";
    imgCanvas.id="imgCanvas";
    document.body.appendChild(imgCanvas);
    imgCanvas.width=256;
    imgCanvas.height=256;
    var imgContext=imgCanvas.getContext("2d");

    var _w=_image.width;
    var _h=_image.height;
    if(_w>1000)_w=1000;
    if(_h>1000)_h=1000;
    imgContext.drawImage(_image,0,0,_w,_h,0,0,256,256);

    var upImg =PIXI.Texture.fromFrame("b0.png").baseTexture.source;
    imgContext.drawImage(upImg,0,0,256,256,0,0,256,256);
    imgContext.restore();



    var maskData=maskContext.getImageData(0,0,256,256);
    var imgData=imgContext.getImageData(0,0,256,256);
    for(var i=0;i<256;i++)
    {
        for(var j=0;j<256;j++)
        {
            if(getPixel(maskData,i,j)<=50)
            {
                setPixel(imgData,i,j,getPixel(maskData,i,j));
            }
        }

    }
    imgContext.putImageData(imgData,0,0);

    var image = imgCanvas.toDataURL("image/png");
    var imageData = image.substr(22); //去掉 data:image/png;base64,

    //var w=window.open('about:blank','image from canvas');
    //w.document.write("<img src='"+image+"' alt='from canvas'/>");

    document.body.removeChild(imgCanvas);
    document.body.removeChild(maskCanvas);

    //return;
    PostHorse(imageData,imageData,"名字","内容",end)
}


function PostHorse(_skinData,_sourceData,_name,_content,_success)
{
    $.post("upload.php",{skinData:_skinData,sourceData:_sourceData,name:_name,content:_content},
        _success
    );
}


function end(data)
{
    window.location.replace(data);
}


function setPixel(imgData,x, y,alpha)
{
    var pos = (x + y * 256) * 4;
    imgData.data[pos + 3] = alpha;
}

function getPixel(imgData,x, y)
{
    var pos = (x + y * 256) * 4;
    return imgData.data[pos + 3];
}









requestAnimFrame(animate);

function animate() {

    requestAnimFrame( animate );
    renderer.render(stage);






}