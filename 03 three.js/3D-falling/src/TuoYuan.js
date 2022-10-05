/**
 * Created by weibin.zeng on 16/10/26.
 */


function Point(_x,_y,_z){
    this.x=_x||0;
    this.y=_y||0;
    this.z=_z||0;
}
Point.prototype={
    set x(val){
        this._x=val;
    },
    get x(){
        return this._x;
    },
    set y(val){
        this._y=val;
    },
    get y(){
        return this._y;
    },
    set z(val){
        this._z=val;
    },
    get z(){
        return this._z;
    }
}
var angle=0;

var axis=new Point(15,2.5,15);
var ellipseMotionObjArr=[];
function initItem(){

    var sphereGeometry=new THREE.SphereGeometry(1,32,32);
    var sphereMaterial=new THREE.MeshBasicMaterial({
        map:resourceArr["perlin-512.png"]
    });
    var sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);
    scene.add(sphere);
    sphere.scale.x=sphere.scale.y=sphere.scale.z=2;

    for(var i=0;i<50;i++){
        var texture=resourceArr["b"+randomInteger(1,13)+".png"];
        var particleGeometry=new THREE.PlaneGeometry(1,1,1);
        var particleMaterial=new THREE.MeshBasicMaterial({
            map:texture,
            transparent:true
        });
        var particle=new YZParticle(particleGeometry,particleMaterial);
        particle.init();

        var ang=particle._angle;

        var x=Math.cos(ang)*particle._vector_x;
        var y=randomFloat(-2,2);
        var z=Math.sin(ang)*particle._vector_z;
        //
        particle.position.x=x;
        particle.position.y=y;
        particle.position.z=z;

        scene.add(particle);
        ellipseMotionObjArr.push(particle);
    }
}

function motion(){
    return;
    for(var i=0;i<ellipseMotionObjArr.length;i++){

        var particle=ellipseMotionObjArr[i];
        var ang=angle+particle._angle;

        ang=ang*Math.PI/180;
        //
        var x=Math.cos(ang)*particle._vector_x;
        var z=Math.sin(ang)*particle._vector_z;
        //
        particle.position.x=x;
        particle.position.z=z;
    }

    angle++;

}