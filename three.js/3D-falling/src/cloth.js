/**
 * Created by weibin.zeng on 16/10/28.
 */


//阻尼
const DAMPING=0.03;
//拖曳
const DRAG=1-DAMPING;
//质量
const MASS=0.1;

var restDistance=5;

var xSegs=7;
var ySegs=7;

var clothFunction=plane(restDistance*xSegs,restDistance*ySegs);

function plane(width,height){
    return function(u,v){
        var x=(u-0.5)*width;
        var y=(v+0.5)*height;
        var z=0;

        return new THREE.Vector3(x,y,z);
    }
}
//cloth 布
var cloth=new Cloth(xSegs,ySegs);
var clothGeometry;
var clothObj;

var clothArr=[];

function initCloth(){
    var clothTexture=resourceArr["ybh.jpg"];
    //表面有光泽的材质类型
    //var clothMaterial = new THREE.MeshPhongMaterial( {
    var clothMaterial=new THREE.MeshBasicMaterial({
        specular:0x030303,
        map:clothTexture,
        side:THREE.DoubleSide,
        alphaTest:0.5
    });
    //clothGeometry=new THREE.PlaneGeometry(15,15,15);
    clothGeometry= new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );
    //如果设置为false,属性数组的中间值将被删除
    //如果设置为true,属性缓存将实时改变,除非内部属性数组被送到GPU,对应的缓存被删除
    clothGeometry.dynamic = true;
    var object=new THREE.Mesh(clothGeometry,clothMaterial);
    //是否生成阴影
    //object.castShadow=true;
    object.rotation.y=Math.PI/180*90;
    scene.add(object);
    console.log(clothGeometry.faces);
    //ellipseMotionObjArr.push(object);




    clothObj=new THREE.Mesh(new THREE.MeshBasicMaterial({
        specular:0x030303,
        map:clothTexture,
        side:THREE.DoubleSide,
        alphaTest:0.5
    }),new THREE.ParametricGeometry(
        clothFunction,cloth.w,cloth.h
    ));

    console.log( clothObj.geometry.vertices);
    //scene.add(clothObj);
    //object.position.set(0,10,0);

    clothArr.push(object,clothObj);



}

function Cloth(w,h){
    w=w||10;
    h=h||10;

    //布宽
    this.w=w;
    //布高
    this.h=h;

    var particles=[];
    var constraints=[];

    var u,v;

    //创建粒子
    for(v=0;v<=h;v++){
        for(u=0;u<=w;u++){
            particles.push(
                //创建布上的每个点
                new Particle(u/w,v/h,0,MASS)
            )
        }
    }

    //console.log("particles:",particles);
    function index(u,v){
        return u+v*(w+1);
    }

    //Structural 结构的；建筑的
    for(v=0;v<h;v++){
        for(u=0;u<w;u++){

            //console.log(index(u,v));
            //console.log("v+1:",index(u,v+1));
            constraints.push([
                particles[index(u,v)],
                particles[index(u,v+1)],
                restDistance
            ]);

            constraints.push([
                particles[index(u,v)],
                particles[index(u+1,v)],
                restDistance
            ])
        }
    }
    //console.log("constraints:",constraints);

    for(u=w,v=0;v<h;v++){
        constraints.push([
            particles[index(u,v)],
            particles[index(u,v+1)],
            restDistance
        ]);
    }

    for(v=h,u=0;u<w;u++){
        constraints.push([
            particles[index(u,v)],
            particles[index(u+1,v)],
            restDistance
        ])
    }

    this.particles=particles;
    this.constraints=constraints;
    this.index=index;

}

function Particle(x,y,z,mass){


    this.position=clothFunction(x,y);//位置
    this.previous=clothFunction(x,y);//以前的
    this.original=clothFunction(x,y);
    this.a=new THREE.Vector3(0,0,0);//加速度

    this.mass=mass;
    this.invMass=1/mass;
    this.tmp=new THREE.Vector3();
    this.tmp2=new THREE.Vector3();
}
Particle.prototype.addForce=function(force){
    this.a.add(
        this.tmp2.copy(force).multiplyScalar(this.invMass)
    )
}
Particle.prototype.integrate=function(timesg){
    var newPos=this.tmp.subVectors(this.position,this.previous);
    newPos.multiplyScalar(DRAG).add(this.position);
    newPos.add(this.a.multiplyScalar(timesg));

    this.tmp=this.previous;
    this.previous=this.position;
    this.position=newPos;

    this.a.set(0,0,0);
}

var lastTime;

//重力
const GRAVITY=981*1.4;
var gravity=new THREE.Vector3(0,-GRAVITY,0).multiplyScalar(MASS);

const TIMESTEP=18/1000;
const TIMESTEP_SQ=TIMESTEP*TIMESTEP;

//扩散器（diffuser）；微分；差速器（differential）
var diff=new THREE.Vector3();

var pinsFormation=[];
var pins=[6];

pinsFormation.push(pins);

pins=[0,1,2,3,4,5,6,7];
pinsFormation.push(pins);

pins=[0];
pinsFormation.push(pins);

pins=[];
pinsFormation.push(pins);

pins=[0,cloth.w];
pinsFormation.push(pins);

pins=pinsFormation[1];

var wind=true;
var windStrength=2;
var windForce=new THREE.Vector3(0,0,0);
var tmpForce=new THREE.Vector3();

function togglePins(){
    pins=pinsFormation[~~(Math.random()*pinsFormation.length)];
}

function satisifyConstraints(p1,p2,distance){

    //将三维向量的(x,y,z)坐标值分别于参数(a,b)的(x,y,z)相减.并返回新的坐标值的三维向量.
    diff.subVectors(p2.position,p1.position);
    //length方法将返回三维向量的长度（只读）.
    // NOTE：勾股定理a^2 + b^2 + c^2=d^2,d=Math.sqrt(a^2 + b^2+c^2),这里返回的是d.
    var currentDist=diff.length();
    if(currentDist===0)return;
    //multiplyScalar方法用来将三维向量的(x,y,z)坐标值直接与参数s相乘.并返回新的坐标值的三维向量.
    var correction=diff.multiplyScalar(1-distance/currentDist);
    var correctionHalf=correction.multiplyScalar(0.5);
    p1.position.add(correctionHalf);
    p2.position.sub(correctionHalf);
}

function simulate(time){
    if(!lastTime){
        lastTime=time;
        return;
    }

    var i,il,particles,particle,constraints,constraint;

    if(wind){
        var face,faces=clothGeometry.faces,normal;
        particles=cloth.particles;

        for(i=0,il=faces.length;i<il;i++){
            face=faces[i];
            //console.log("face:",face);
            //三角面法线向量,或顶点法线向量数组
            normal=face.normal;



            tmpForce.copy(normal)//拷贝3维向量
                .normalize()//3维向量的单位化
                .multiplyScalar(// multiplyScalar(scalar) 3维向量与标量scalar的乘法
                    normal.dot(windForce)
                );

            particles[face.a].addForce(tmpForce);
            particles[face.b].addForce(tmpForce);
            particles[face.c].addForce(tmpForce);

        }
    }
    //wind=false;

    for(particles=cloth.particles,i=0,il=particles.length;i<il;i++){
        particle=particles[i];
        particle.addForce(gravity);

        particle.integrate(TIMESTEP_SQ);
    }

    constraints=cloth.constraints;
    il=constraints.length;
    for(i=0;i<il;i++){
        constraint=constraints[i];
        satisifyConstraints(constraint[0],constraint[1],constraint[2]);
    }

    for(particles=cloth.particles,i=0,il=particles.length;i<il;i++){
        particle=particles[i];
        pos=particle.position;

        if(pos.y<-250){
            pos.y=-250;
        }
    }

    for(i=0,il=pins.length;i<il;i++){
        var xy=pins[i];
        var p=particles[xy];
        p.position.copy(p.original);
        p.previous.copy(p.original);
    }
}







