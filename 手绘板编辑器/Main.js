/**
 * Created by weibin.zeng on 16/3/8.
 */
var canvas_width=800;
var canvas_height=canvas_width;
var game_canvas;
var context;
var strokeColor="black";

var isMouseDown=false;
var lastLocation=null;
var lastData=null;
var lastLineWidth=0;
var minLineWidth=1;
var maxLineWidth=30;
var minV=0.1;
var maxV=15;

window.onload=function(){
    var dpr = window.devicePixelRatio || 1;
    var scale=1/dpr;
    var viewport=document.getElementById("viewport");
    viewport.content="width=640,init-scale="+scale+",user-scalable=no";

    game_canvas=document.getElementById("game_canvas");
    game_canvas.width=canvas_width;
    game_canvas.height=canvas_height;
    context=game_canvas.getContext("2d");

    drawBackground();
    addEvent();

}
function addEvent(){
    game_canvas.addEventListener("mousedown",onMouseDownCanvas,false);
    game_canvas.addEventListener("mousemove",onMouseMoveCanvas,false);
    game_canvas.addEventListener("mouseup",onMouseUpCanvas,false);
    game_canvas.addEventListener("mouseout",onMouseUpCanvas,false);

    document.getElementById("remove_button").addEventListener("click",onClickRemovebutton,false);
    var button_arr=document.getElementsByClassName("color-button");
    for(var i= 0,a;a=button_arr[i];i++){
        a.addEventListener("click",function(event){
            for(var j=0,b;b=button_arr[j];j++)
                Utils.removeClass(b,"button-selected");

            var elem_a=this;
            strokeColor=elem_a.getAttribute("data-color");
            Utils.addClass(elem_a,"button-selected");
        });
    }
}
function onMouseDownCanvas(event){
    isMouseDown=true;
    lastLocation=globalToLocal(event.clientX,event.clientY);
    lastData=new Date().getTime();
}
function onMouseMoveCanvas(event){
    if(isMouseDown && lastLocation && lastData){

        context.save();
        var currentLocation=globalToLocal(event.clientX,event.clientY);
        var currentData=new Date().getTime()
        var s=calculateDistance(currentLocation,lastLocation);
        var t=currentData - lastData;


        context.beginPath();
        context.moveTo(lastLocation.x,lastLocation.y);
        context.lineTo(currentLocation.x,currentLocation.y);
        context.closePath();
        context.strokeStyle=strokeColor;
        context.lineWidth=conversionStrokeSize(s,t);
        context.lineJoin="round";
        context.stroke();
        lastLocation=currentLocation;
        lastData=currentData;
    }
}
function calculateDistance(currentl,lastl){
    return Math.sqrt(Math.pow(currentl.x-lastl.x,2) + Math.pow(currentl.y-lastl.y,2) );
}
function conversionStrokeSize(s,t){

    var v=s/t;
    console.log("s:"+s+"       t:"+t+"           v:"+v);
    var lineWidth;
    if(v<=minV){
        lineWidth=maxLineWidth;
    }else if(v>=maxV){
        lineWidth=minLineWidth;
    }else{
        lineWidth=(lastLineWidth*2/3) + (maxLineWidth - (v-minV)/(maxV-minV) * (maxLineWidth - minLineWidth))*1/3;
    }
    lastLineWidth=lineWidth;
    return lineWidth;
}
function onMouseUpCanvas(event){
    isMouseDown=false;
    lastLocation=null;
    lastData=null;
    lastLineWidth=0;
}
function onClickRemovebutton(event){
    context.clearRect(0,0,canvas_width,canvas_height);
    drawBackground();
}
function globalToLocal(x,y){
    return {
        "x":x-game_canvas.offsetLeft,
        "y":y-game_canvas.offsetTop
    }
}
function drawBackground(){
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvas_width,0);
    context.lineTo(canvas_width,canvas_height);
    context.lineTo(0,canvas_height);
    context.closePath();
    context.strokeStyle="red";
    context.lineWidth=5;
    context.stroke();

    context.beginPath();
    context.moveTo(0,canvas_height/2);
    context.lineTo(canvas_width,canvas_height/2);
    context.closePath();
    context.strokeStyle="gray";
    context.lineWidth=2;
    context.stroke();

    context.beginPath();
    context.moveTo(canvas_width/2,0);
    context.lineTo(canvas_width/2,canvas_height);
    context.closePath();
    context.strokeStyle="gray";
    context.lineWidth=2;
    context.stroke();

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvas_width,canvas_height);
    context.closePath();
    context.strokeStyle="gray";
    context.lineWidth=2;
    context.stroke();

    context.beginPath();
    context.moveTo(canvas_width,0);
    context.lineTo(0,canvas_height);
    context.closePath();
    context.strokeStyle="gray";
    context.lineWidth=2;
    context.stroke();
}