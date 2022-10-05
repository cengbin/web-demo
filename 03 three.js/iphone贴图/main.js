/**
 * Created by weibin.zeng on 2017/8/16.
 */

var canvas,scene,camera,renderer,controls;

window.onload=function(){
    init();
    animate();
};

function init(){

    canvas=document.createElement("canvas");
    document.body.appendChild(canvas);

    scene=new THREE.Scene();

    camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,10000);
    camera.position.z=2;

    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    renderer=new THREE.WebGLRenderer({
        canvas:canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(0x000000);

    controls=new THREE.OrbitControls(camera,canvas);

    scene1();
}
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}


function scene1(){

    var img=new Image();
    img.onload=function(){
        var c=document.createElement("canvas");
        c.width=160;
        c.height=100;
        var ctx=c.getContext("2d");
        ctx.drawImage(img,0,0);
        ctx.fillStyle="#ff0000";
        ctx.font="20px arial";
        ctx.fillText("Hello World!",0,20);

        var count=1;
        var objloader=new THREE.OBJLoader();
        // objloader.setMaterials(materials);
        objloader.setPath('iphone6/');
        objloader.load(
            'iphone_6_model.obj',
            // 'iphone6/iphone_6_model.obj',
            function(object){
                //console.log(object);
                object.traverse( function ( child ) {

                    if ( child instanceof THREE.Mesh ) {

                        // child.material.map = THREE.ImageUtils.loadTexture('0.png');
                        if(count++==10){
                            console.log(child);
                            child.material.map = new THREE.Texture(c);
                            child.material.map.needsUpdate=true;
                        }
                    }

                } );

                object.position.y = 0;
                scene.add( object );
                object.scale.x=5;
                object.scale.y=5;
                object.scale.z=5;
                object.rotation.x=1.50;
            },
            function(xhr){
                console.log((xhr.loaded/xhr.total*100)+'% loaded');
            },
            function(xhr){

            }
        );
        return;

        var imgs=['bricks.jpg','clouds.jpg','crate.jpg','stone-wall.jpg','water.jpg','wood-floor.jpg']
        var metrials=[];
        for(var i=0;i<6;i++){
            var mt=new THREE.MeshBasicMaterial({
                map:THREE.ImageUtils.loadTexture(imgs[i])
            });
            if(i==4){
                mt.map=new THREE.Texture(c);
                mt.map.needsUpdate=true;
            }else{

            }
            metrials.push(mt);
        }
        var gm=new THREE.BoxGeometry(20,20,20);
        var boxMash=new THREE.Mesh(gm,new THREE.MeshFaceMaterial(metrials));
        //scene.add(boxMash);

    }
    img.src='0.jpg';

    var mtlloader=new THREE.MTLLoader();
    mtlloader.setPath('iphone6/');
    mtlloader.load(
        'iphone_6_model.mtl',
        function(materials){
            materials.preload();

        }
    );




}