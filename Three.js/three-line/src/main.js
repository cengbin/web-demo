/**
 * Created by weibin.zeng on 16/8/23.
 */


var app=app||{};

//if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

documentReady(function(){

    app.stageWidth=document.documentElement.clientWidth||document.body.clientWidth;
    app.stageHeight=document.documentElement.clientHeight||document.body.clientHeight;

    initThree();
});


function initThree(){
    var canvas,
        renderer,
        scene,
        camera,
        controls;

    canvas=document.createElement("canvas");
    document.body.appendChild(canvas);

    renderer=new THREE.WebGLRenderer({
        canvas:canvas
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( app.stageWidth, app.stageHeight );
    renderer.setClearColor(0x000000);

    scene=new THREE.Scene();

    camera=new THREE.PerspectiveCamera(75,app.stageWidth/app.stageHeight,1,10000);
    camera.position.z = 75;
    camera.lookAt(0,0,0);

    controls=new THREE.OrbitControls(camera,renderer.domElement);

    var axisHelper = new THREE.AxisHelper( 25 );
    scene.add( axisHelper );



    var geometry=new THREE.Geometry();
    var material=new THREE.LineBasicMaterial({
        color:0xff0000
    });
    var point=new THREE.Vector3();
    var direction=new THREE.Vector3();
    setInterval(function(){
        direction.x=Math.random()*1-0.5;
        direction.y=Math.random()*1-0.5;
        direction.z=Math.random()*1-0.5;
        direction.normalize();
        direction.multiplyScalar(10);

        point.add(direction);
        geometry.vertices.push(point.clone());
    },1000);
    var object=new THREE.Line(geometry,material);
    scene.add(object);



    function animate() {

        requestAnimationFrame( animate );

        if(controls)controls.update(); // required if there is damping or if autoRotate = true

        TWEEN.update();

        renderer.render( scene, camera );

    }
    animate();
}