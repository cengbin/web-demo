var ARRAY_CORE=[];
var OBJECT_CORE={};
var array_common={};
var object_common={};

["pop","push","reverse","shift","unshift"].forEach(function(name){
   array_common[name]=wrapFunc(ARRAY_CORE[name]);
});
["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toString"].forEach(function(name){
   object_common[name]=wrapFunc(OBJECT_CORE[name]);
});
["Object","Array","Function"].forEach(function(name){
   object_common["is"+name]=wrapFunc(function(){
      return  object_common.toString(this) == "[object "+name+"]";
   });
});

function wrapFunc(func){
    return function(data){
        return func.apply(data,ARRAY_CORE.slice.call(arguments,1));
    }
}