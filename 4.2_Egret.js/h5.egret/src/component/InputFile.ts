/**
 *
 * @author 
 *
 */
class InputFile{
    
  
    
    public input:HTMLInputElement=null;
    private _onLoad:boolean=false;
    private func:Function;
    
    public changeComplete:Function=null;
    
	public constructor(eleId?) {
    	  var self=this;
        if(window["File"] && window["FileList"] && window["FileReader"] && window["Blob"]) {
            let input: HTMLInputElement = <HTMLInputElement>document.getElementById(eleId); 
            
            if(!input){
                input= <HTMLInputElement>document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
            }
            
            input.addEventListener("change",(event)=>{
                this.inputChange.call(this,event);
            });
            this.input=input;
        } else {
            alert("你的浏览器不支持File Api")
        }
	}
	
	private inputChange(event){
        //     非IE || IE
        event = event || window.event;
        //获取选择的文件列表
        let files = event.target["files"];

        //正则匹配 图片
        let ireg = /image\/.*/i;

        let index = 0;
        let file = files[0];
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
        var reader: FileReader = new FileReader();
        reader.onload = this.readerOnload;
        reader.readAsDataURL(file);
        
	}
	
	
	public readerOnload(event){
    	  console.log('reader onload:',event.target);
        
        let img = new Image();
        img.onload = ()=>{
            
            if(this.changeComplete)
                this.changeComplete.call(this,img);
        }
        img.src = event.target.result;
	}
	
}
