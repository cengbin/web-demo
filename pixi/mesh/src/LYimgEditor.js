/**
 * Created by liuyang on 2017/6/21.
 */
GAME.imgEditor=function(event,target){

    event
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);


    var touchOne,touchOneX,touchOneY,touchTwo,touchTwoX,touchTwoY,startPoint,end_tou=false,startStage=false,drawScaleW;
    var moveScale=false,movePosition=false,moveRotate=false;
    var positionSpeed=1,posi_indexX=0,posi_indexY=0,drawX,drawY,movePoint,scaleIndex=0,scaleSpeed=0.001,rotateSpeed=0.5;
    var startRotation=0,startRotate=0;

    function onDragStart() {

        if(window.event.touches.length>2)return;
        this.isdrand=true;
        drawX=target.x;
        drawY=target.y;
        drawScaleW=target.scale.x;
        startRotation=target.rotation/Math.PI*180
        if(window.event.touches.length<2){

            touchOne=window.event.touches[0];
            touchOneX=touchOne.pageX;
            touchOneY=touchOne.pageY;
            console.log(touchOneX)

        }else{
            touchTwo=window.event.touches[1];
            touchTwoX=touchTwo.pageX;
            touchTwoY=touchTwo.pageY;
            startPoint= twoPoint(touchOne,touchTwo);
            startRotate=rotateToPoint(touchOne.pageX,touchOne.pageY,touchTwo.pageX,touchTwo.pageY)
        }

    }

    function onDragEnd() {
        if(window.event.touches.length>1)return;
        this.isdrand=false;

        drawX=target.x;
        drawY=target.y;
        drawScaleW=target.scale.x;
        startRotation=target.rotation/Math.PI*180


        posi_indexY=0
        posi_indexX=0
        startStage=false;
        scaleIndex=0;
        startRotate=0

    }

    function onDragMove() {
        if (window.event.touches.length > 2)return;
       if(!this.isdrand)return
        touchOne = window.event.touches[0];

        if (window.event.touches.length > 1) {
            end_tou=true;
            if (!startStage) {
                startStage = true;
                startPoint= twoPoint(touchOne,touchTwo);
                startRotate=rotateToPoint(touchOne.pageX,touchOne.pageY,touchTwo.pageX,touchTwo.pageY)

            }
            touchTwo = window.event.touches[1];
            if (touchOne && touchTwo){
                if(!moveRotate)imgRotate(touchOne.pageX,touchOne.pageY,touchTwo.pageX,touchTwo.pageY)
                if(!moveScale)imgScale()
            }
        } else {
            if(end_tou){
                end_tou=false;
                touchOneX= window.event.touches[0].pageX;
                touchOneY= window.event.touches[0].pageY;
            }
            if(!movePosition)imgPosi()
        }
    }
    function imgPosi(){
        posi_indexX=(window.event.touches[0].pageX-touchOneX)*positionSpeed;
        posi_indexY=(window.event.touches[0].pageY-touchOneY)*positionSpeed;

        target.x=drawX+ posi_indexX;
        target.y=drawY+ posi_indexY;

    }
    function imgScale(){
        movePoint= twoPoint(touchOne,touchTwo);
        scaleIndex=(movePoint-startPoint)*scaleSpeed;

        target.scale.set(drawScaleW+scaleIndex);
        if(target.scale.x<0.001)target.scale.set(0.001)
        if(target.scale.x>10)target.scale.set(10)

    }
    function imgRotate(dx1,dy1,dx2,dy2){
        var roa=rotateToPoint(dx1,dy1,dx2,dy2)


        var indexRotate=(roa-startRotate)*rotateSpeed
        //$("#p").html(
        //    "indexRotate" +indexRotate+
        //    "<br>startRotation" +startRotation+
        //    "<br>roa" +roa+
        //    "<br>startRotate" +startRotate+
        //    ""
        //)
       target.rotation=(startRotation+indexRotate)*Math.PI/180;
    }
    function twoPoint(source,target){
        var  x1=source.pageX;
        var  y1=source.pageY;
        var  x2=target.pageX;
        var  y2=target.pageY;

        var xdiff = Math.abs(x2 - x1);  // 计算两个点的横坐标之差
        var ydiff = Math.abs(y2 - y1);// 计算两个点的纵坐标之差
        var   c=Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5)
        return c;
    }
    function rotateToPoint(mx, my, px, py){
        var self = this;
        var dist_Y = my - py;
        var dist_X = mx - px;
        var angle = Math.atan2(dist_Y,dist_X);
        var degrees = angle * 180/ Math.PI;
        return  degrees;
    }
}