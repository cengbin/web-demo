/**
 * Created by liuyang on 2017/6/26.
 */
GAME.input=GAME.input||{};
GAME.input.config=function(type,obj){
    var  input=document.createElement("input")
    input.id="input"
    if(type)input.type=type;
    if(type=="file"){
        input.getImageBase64=function(fun) {
            input.addEventListener("change", function (e) {
                GAME.inputFile.fileSelect(e, fun)
            }, false)
        }
    }else{

        var data={
            fontFamily: 'Arial',
            fontSize: obj.promptSize?obj.promptSize:20,
            fill:obj.promptColor?obj.promptColor:"#000000",
        };


       var  demotxt= new PIXI.Text(obj.prompt,data);
        obj.father.addChild(demotxt);
        demotxt.anchor.x =1;
        demotxt.anchor.y = 0.5;

        var cursor = new PIXI.Graphics();
        cursor.beginFill(0xffffff)
        cursor.drawRect(0,-obj.fontSize/2,3,obj.fontSize);
        cursor.endFill();
        cursor.x=-demotxt.width*demotxt.anchor.x;
        if(demotxt.anchor.x==1)cursor.x=0;

        TweenMax.to(cursor,0.5,{alpha:0,ease:Linear.easeNone,repeat:-1,yoyo:true})

        $(input).on("keyup",function(){

            if(demotxt.style.fill!=obj.color)demotxt.style.fill=obj.color;
            if(demotxt.style.fontSize!=obj.fontSize)demotxt.style.fontSize=obj.fontSize;

            demotxt.text=this.value;


            if(this.value==""){
                demotxt.text=obj.prompt;
                demotxt.style.fill=obj.promptColor;
                demotxt.style.fontSize=obj.promptSize;
            }

            if(demotxt.anchor.x==0)cursor.x=demotxt.width;
            if(demotxt.anchor.x==0.5)cursor.x=demotxt.width/2;
            if(demotxt.anchor.x==1)cursor.x=0;

        })
        $(input).on("focus",function(){
            demotxt.addChild(cursor);
        })
        $(input).on("blur",function(){
            demotxt.removeChild(cursor);
        })

        input.style.position="absolute";
        input.style.top="-1000px";
        $("#bgcanvas").append(input);
    }
    return input
}