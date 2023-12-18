/**
 *
 * @author 
 *
 */
function InputFile(eleId){


    this.changeComplete=null;
    this.input=null;
    this.fileRender=null;
    this.img=null;

    var _this=this;

    this.init=function(){
        var img=new Image();
        img.onload=function(){
            _this.img=img;
        }
        img.src='assets/girlHead.png';

        if(window["File"] && window["FileList"] && window["FileReader"] && window["Blob"]) {
            var input =document.getElementById(eleId);
            if(!input){
                input=document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
            }

            input.addEventListener("change",function(event){
                _this.inputChange(event);
            });
            this.input=input;
        } else {
            alert("你的浏览器不支持File Api")
        }
    }
	this.inputChange=function(event){
        //     非IE || IE
        event = event || window.event;
        //获取选择的文件列表
        var files = event.target["files"];

        //正则匹配 图片
        var ireg = /image\/.*/i;

        var index = 0;
        var file = files[0];
        console.log('选择了文件:',file.name);
        if(!file.type.match(ireg)) {
            //LoadingUI2.getInstance().hide();
            alert(file.name + "不是图片文件");
            return;
        }
        
        if(file.size > 5120000) {
            //LoadingUI2.getInstance().hide();
            alert(file.name + "图片大小大于5MB!");
            return;
        }

        //读取图片数据
        var reader = new FileReader();
        reader.onload = function(rd){
            _this.fileRender=rd;
            _this.readerOnload(rd);
        };
        reader.readAsDataURL(file);
        
	}
	
	
	this.readerOnload=function(event){
    	console.log('reader onload:',event.target);

        var img = new Image();
        img.onload =function(){
            //egret.log('this:',this);
            _this.img=img;
            if(_this.changeComplete)
                _this.changeComplete(event.target,img);
        }
        img.src = event.target.result;
	}
	
}
