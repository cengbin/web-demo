/**
 * Created by weibin.zeng on 16/10/26.
 */
var Utils={
    inherit:function(ctor,superCtor){
        ctor.superClass=superCtor;
        ctor.prototype=Object.create(superCtor.prototype);
        ctor.prototype.constructor=ctor;
    },
    extend:function(origin,add){
        // Don't do anything if add isn't an object
        if (!add || typeof add !== 'object')
            return origin;

        var keys = Object.keys(add);
        var i = keys.length;
        while (i--)
        {
            origin[keys[i]] = add[keys[i]];
        }
        return origin;
    }
};


function YZParticle(geomery,material){

    THREE.Mesh.call(this,geomery,material);

    this._angle=null;

    this._vector_x=null;

    this.init=function(){
        this._angle=randomInteger(0,360);

        this._vector_x=randomFloat(axis.x,axis.x+10);
        this._vector_z=randomFloat(axis.z,axis.z+10);
    }
}
Utils.inherit(YZParticle,THREE.Mesh);