/**
 * Created by weibin.zeng on 16/10/25.
 */

/*
* 随机取整
* */
function randomInteger(low,high){
    return low+Math.floor(Math.random()*(high-low));
}

function randomFloat(low,high){
    return low+(Math.random()*(high-low));
}




//飘落无数量
var fallArr=[];
var currentCount=0;
var maxCount=randomInteger(50,100);

function move(){
    return;
    if(currentCount++>maxCount){
        creatFallItem();
        maxCount=randomInteger(50,100);
        currentCount=0;
    }
    for(var i=0;i<fallArr.length;i++){
        var leaf=fallArr[i];
        leaf.position.y+=-leaf.speed;
        leaf.rotation.z+=leaf.rotationz;

        if(leaf.position.y<=leaf.endPointY){
            //scene.remove(leaf);
            fallArr.splice(fallArr.indexOf(leaf),1);
            ellipseMotionObjArr.push(leaf);
        }
    }
}

function creatFallItem(){
    var random=randomInteger(1,11);
    var texture=resourceArr["b"+random+".png"];
    //console.log(random,texture);
    var leafGeometry=new THREE.PlaneGeometry(1,1,1,1);
    var leafMaterial=new THREE.MeshBasicMaterial({
        map:texture,
        transparent:true
    });

    var particle=new YZParticle(leafGeometry,leafMaterial);
    particle.init();
    var ang=particle._angle;
    var x=Math.cos(ang)*randomFloat(axis.x,axis.x+20);
    var y=randomFloat(-2,2);
    var z=Math.sin(ang)*axis.z;
    particle.position.x=x;
    particle.position.y=randomFloat(15,20);
    particle.position.z=z;

    particle.endPointY=randomFloat(-2,2);
    particle.speed=randomFloat(0.05,0.1);
    particle.rotationz=randomFloat(particle.speed-0.05,particle.speed-0.03);

    scene.add(particle);
    fallArr.push(particle);

}





