//创建一个模型监听对象

//创建一个模型监听Object
function ObserverObject(data,subscribe){
    return extendDefineProperties({},subscribe,data);
}

//创建一个模型监听数组
function ObserverArray(data,subscribe){
    if(!(this instanceof ObserverArray)){
        return new ObserverArray(data,subscribe);
    }

    var datasource=extendDefineProperties([],subscribe,data);

    ["splice","push","shift","unshift"].forEach(function(name){
        datasource[name]=function(){
            var args=array_common.from(arguments);
            args.unshift(this);
            array_common[name].apply(this,args);
            subscribe.trigger(name,arguments);
        }
    });

    return datasource;
}

function extendDefineProperties(target,subscribe,data){
    var keys=Object.keys(data);
    keys.forEach(function(name){
        createGetterSetter(target,subscribe,name,data[name]);
    });
    return target;
}

function createGetterSetter(target,subscribe,name,defaultValue){
    var currentValue;

    function setValue(value){
        if(object_common.isObject(value)){
            currentValue=ObserverObject(value,subscribe.newSubscribe(name));
        }else if(object_common.isArray(value)){
            currentValue=ObserverArray(value,subscribe.newSubscribe(name));
        }else{
            currentValue=value;
        }
    }

    Object.defineProperty(target,name,{
        configurable:true,
        enumerable:true,
        get:function(){
            return currentValue;
        },
        set:function(value){
            var oldVal=currentValue;
            if(oldVal!==value){
                setValue(value);
                subscribe.trigger(name,oldVal,currentValue);
            }
        }
    });
}

