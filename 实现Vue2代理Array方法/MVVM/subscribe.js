function Subscribe(){}

function DepSubscribe(){
    this.path="";
    this.subscribe=new Subscribe();
}

object_common.assign(DepSubscribe.prototype,{
    on:function(name,handler){
        name=name=="*"?"all":name+".change";
        this.subscribe.on(name,handler);
    },
    trigger:function(){

    },
    triggerArray:function(name,args){

    },
    off:function(){

    },
    _listenerData:function(subscribe){

    },
    newSubscribe:function(name){
       var subscribe=new Subscribe();
       subscribe.path=name;
       this._listenerData(subscribe);
       return subscribe;
    }
});