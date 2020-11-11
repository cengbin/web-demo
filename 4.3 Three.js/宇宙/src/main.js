/**
 * Created by weibin.zeng on 17/5/3.
 */


var ww,wh,aspect;
var canvas,camera, controls;
var renderer;
var scene;

init();

function init() {

    ww=window.innerWidth;
    wh=window.innerHeight;
    aspect=ww/wh;

    canvas=document.createElement("canvas");
    document.body.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({
        canvas:canvas
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);
    //?
    renderer.sortObjects = false;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 70,ww/wh, 0.1, 1000);
    camera.position.z = 0.01;

    controls = new THREE.OrbitControls(camera);
    //controls.enableZoom = false;
    //controls.enablePan = false;
    controls.zoomSpeed=20;
    controls.constraint.minPolarAngle=90*Math.PI/180;
    controls.constraint.maxPolarAngle=90*Math.PI/180;

    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    var axisHelper = new THREE.AxisHelper(150);
    scene.add( axisHelper );


    /*var earth_gm=new THREE.SphereGeometry(200,32,32);
    var earth_mt=new THREE.MeshBasicMaterial({
        map:THREE.ImageUtils.loadTexture('img/earth.jpg'),
        side:THREE.BackSide,
        overdraw: true
    });
    var earth_obj=new THREE.Mesh(earth_gm,earth_mt);
    scene.add(earth_obj);*/


    //添加宇宙
    var imagePrefix = "img/nebula-",
        //right left top bottom back front
        directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"],
        //directions  = ["xk1", "xk2", "xk3", "xk4", "xk5", "xk6"],
        imageSuffix = ".jpg";

    var textureLoader = new THREE.TextureLoader();
    var materials = [];
    for (var i = 0; i < 6; i++){
        materials.push( new THREE.MeshBasicMaterial( { map: textureLoader.load( imagePrefix + directions[i] + imageSuffix ) } ) );
    }
    var cube = new THREE.Mesh( new THREE.BoxGeometry( 200, 200, 200), new THREE.MultiMaterial( materials ) );
    cube.scale.x = - 1;
    scene.add(cube);


    var objects=[];
    var objects_clone=[];
    var textureLoader = new THREE.TextureLoader();
    var arrMap=[
        textureLoader.load( "img/DSC_2250.JPG" ),
        textureLoader.load( "img/DSC_2278.JPG" ),
        textureLoader.load( "img/DSC_2294.JPG" ),
        textureLoader.load( "img/DSC_2298.JPG" ),
        textureLoader.load( "img/DSC_2367.JPG" ),
        textureLoader.load( "img/DSC_2375.JPG" ),
        textureLoader.load( "img/lensflare0.png"),
        textureLoader.load( "img/lensflare1.png"),
        textureLoader.load( "img/lensflare2.jpg")
    ];
    for(var i=0;i<360;i+=10){
        if(i==0 || i==180){
            var radian=i*Math.PI/180;
            var x=Math.cos(radian)*10;
            var y=0;
            var z=Math.sin(radian)*10;
            var material = new THREE.SpriteMaterial( { map: textureLoader.load( "img/share_btn.png")});
            var sprite = new THREE.Sprite( material );
            sprite.position.x = x;
            sprite.position.y = y;
            sprite.position.z = z;
            scene.add(sprite);
            sprite.name="goto618";
            objects.push(sprite);
            continue;
        }
        for(var j=0;j<3;j++){
            var radian=i*Math.PI/180;

            var x=Math.cos(radian)*10;
            var y=-2+j*2;
            var z=Math.sin(radian)*10;

            var bigx=Math.cos(radian)*1;
            var bigz=Math.sin(radian)*1;

            var material = new THREE.SpriteMaterial( { size:4,map: arrMap[Math.floor(Math.random()*arrMap.length)]});
            var sprite = new THREE.Sprite( material );
            sprite.angle=i;
            sprite.radian=radian;
            sprite.initPoint=new THREE.Vector3(x,y,z);
            sprite.bigPoint=new THREE.Vector3(bigx,0,bigz);
            sprite.position.set(x,y,z);
            objects.push(sprite);
        }
    }

    objects_clone=objects.slice();
    //console.log("objects_clone.length:",objects_clone.length);
    console.log('objects.length:',objects.length);

    var group0=new THREE.Group(),
        group1=new THREE.Group(),
        group8=new THREE.Group();
    scene.add(group0,group1,group8);

    var dian_max=parseInt(objects_clone.length/3);
    console.log("dian_max:",dian_max);
    new THREE.JSONLoader().load('model/0.js',function(geometry,material){
        createBoxs(geometry,group0);
        /*var mt=new THREE.MeshNormalMaterial();
         var mesh=new THREE.Mesh(geometry,mt);
        mesh.position.z=-10;
        group0.add(mesh);*/
    });
    new THREE.JSONLoader().load('model/1.js',function(geometry,material){createBoxs(geometry,group1);});
    new THREE.JSONLoader().load('model/8.js',function(geometry,material){createBoxs(geometry,group8);});

    function createBoxs(geometry,group){
        var jia=parseInt(geometry.vertices.length/dian_max);
        for(var i=0;i<geometry.vertices.length;i+=jia){
            var random=Math.floor(objects_clone.length*Math.random());
            var object=objects_clone[random];
            if(object){
                //console.log(object.geometry);
                object.endPosition=geometry.vertices[i].clone();
                group.add(object);
                objects_clone.splice(random,1);
            }
        }
    }


    var raycaster=new THREE.Raycaster();
    var mouse=new THREE.Vector2(),
        INTERSECTED;

    canvas.addEventListener('touchmove', onDocumentMouseMove, false );
    canvas.addEventListener('mousemove', onDocumentMouseMove, false );
    canvas.addEventListener('touchstart', onDocumentMouseDown, false );
    canvas.addEventListener('mousedown', onDocumentMouseDown, false );
    canvas.addEventListener('touchsend', onDocumentMouseUp, false );
    canvas.addEventListener('mouseup', onDocumentMouseUp, false );
    function onDocumentMouseMove( event ) {
        var theta=controls.constraint.getPolarAngle();
        //console.log("摄像机角度：",theta/Math.PI*180);
        //event.preventDefault();
        if(event.type.indexOf("touch")!=-1){
            var touch=event.changedTouches[0];
            mouse.x=(touch.clientX/ww)*2-1;
            mouse.y=-(touch.clientY/wh)*2+1;
        }else{
            mouse.x=(event.clientX/ww)*2-1;
            mouse.y=-(event.clientY/wh)*2+1;
        }
        //console.log('mouse:',mouse.x,mouse.y);

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( objects );

        if ( intersects.length > 0 ) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'auto';
        }

    }
    function onDocumentMouseDown(event){

        var theta=controls.constraint.getAzimuthalAngle();

        //event.preventDefault();

    }
    function onDocumentMouseUp( event ) {
        //event.preventDefault();
        //console.log("touchend:");
        var theta=controls.constraint.getAzimuthalAngle();
        //console.log("摄像机角度：",theta/Math.PI*180);

        if(event.type.indexOf("touch")!=-1){
            var touch=event.changedTouches[0];
            mouse.x=(touch.clientX/ww)*2-1;
            mouse.y=-(touch.clientY/wh)*2+1;
        }

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects(objects);

        //console.log("touchstart:",intersects.length);
        if ( intersects.length > 0 ) {

            if ( INTERSECTED != intersects[ 0 ].object ) {

                if(controls)controls.enabled = false;

                if ( INTERSECTED )
                    TweenMax.to(INTERSECTED.position,1,{x:INTERSECTED.initPoint.x,y:INTERSECTED.initPoint.y,z:INTERSECTED.initPoint.z});

                INTERSECTED = intersects[ 0 ].object;

                if(INTERSECTED.name=='goto618'){
                    for(var j=0;j<objects.length;j++){
                        var mesh=objects[j];
                        var p=mesh.endPosition;
                        if(p){
                            var end_scale=0.05+Math.random()*0.05;
                            TweenMax.to(mesh.scale,2+Math.random()*3.5,{x:end_scale,y:end_scale});
                            TweenMax.to(mesh.position,2+Math.random()*3.5,{x: p.x,y: p.y,z: p.z});
                        }
                    }

                    TweenMax.to(group0.position,5,{x:-1,z:-5,y:-0.5});
                    TweenMax.to(group1.position,5,{x:0,z:-5,y:-0.5});
                    TweenMax.to(group8.position,5,{x:1,z:-5,y:-0.5});

                    var end_at=new THREE.Vector3(0,0,-1);
                    var start_at=camera.getWorldDirection();

                    TweenMax.to(start_at,1,{x:end_at.x,y:0,z:end_at.z,onUpdate:function(){
                        camera.lookAt(start_at);
                    }});

                    return;
                }

                if(INTERSECTED.position.z!=INTERSECTED.initPoint.z){
                    TweenMax.to(INTERSECTED.position,1,{x:INTERSECTED.initPoint.x,y:INTERSECTED.initPoint.y,z:INTERSECTED.initPoint.z});
                }else{
                    TweenMax.to(INTERSECTED.position,1,{x:INTERSECTED.bigPoint.x,y:INTERSECTED.bigPoint.y,z:INTERSECTED.bigPoint.z});
                }
                //var groupAngle=group.rotation.y/Math.PI*180;
                //var currentTargetAngle=INTERSECTED.angle;
                //var targetRadian=INTERSECTED.radian;

                //console.log('grop角度：',groupAngle);
                //console.log("点击对象角度：",currentTargetAngle);
                //console.log("摄像机y轴角度：",theta/Math.PI*180);

                var target_at=INTERSECTED.position.clone();
                var currtentTag_at=camera.getWorldDirection().multiplyScalar(10);

                TweenMax.to(currtentTag_at,1,{x:target_at.x,y:0,z:target_at.z,onUpdate:function(){
                    camera.lookAt(currtentTag_at);
                }});

                /*TweenMax.to(group.rotation,1,{y:t,onUpdate:function(){
                 },onComplete:function(){
                 console.log('grop角度：',group.rotation.y/Math.PI*180);
                 }});*/
            }

        }

        if(controls)controls.enabled = true;
    }

    function animate() {

        //if(controls)controls.update();


        renderer.render( scene, camera );

        requestAnimationFrame( animate );

    }
    animate();
}






