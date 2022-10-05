/**
 * Created by weibin.zeng on 16/10/25.
 */
var GAME=GAME||{};

documentReady(function(){

    GAME.stageWidth=document.documentElement.clientWidth||document.body.clientWidth;
    GAME.stageHeight=document.documentElement.clientHeight||document.body.clientHeight;

    initThree();
});


var canvas,
    renderer,
    scene,
    camera,
    controls;

var resourceArr=[];

function initThree(){


    canvas=document.createElement("canvas");
    document.body.appendChild(canvas);

    renderer=new THREE.WebGLRenderer({
        canvas:canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(GAME.stageWidth,GAME.stageHeight);
    renderer.setClearColor(0x000000);//87ceeb

    scene=new THREE.Scene();

    camera=new THREE.PerspectiveCamera(75,GAME.stageWidth/GAME.stageHeight,1,10000);
    camera.position.z=200;
    camera.lookAt(0,0,0);

    controls=new THREE.OrbitControls(camera,renderer.domElement);
    //controls.maxPolarAngle=Math.PI/2;

    //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    //var cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );

    var resourceUrl=["b1.png",
        "b2.png",
        "b3.png",
        "b4.png",
        "b5.png",
        "b6.png",
        "b7.png",
        "b8.png",
        "b9.png",
        "b10.png",
        "b11.png",
        "b12.png",
        "b13.png",
        "sprite0.png",
        "disturb.jpg",
        "perlin-512.png",
        "circuit_pattern.png",
        "ybh.jpg"
        ];

    function loadTexture(index){
        var texture=new THREE.TextureLoader();
        texture.load("img/"+resourceUrl[index],function(texture){
            resourceArr[resourceUrl[index]]=texture;
            //console.log(index,resourceUrl[index],resourceArr[resourceUrl[index]]);
            if(++index<resourceUrl.length){
                loadTexture(index);
            }else{
                initItem();
                initCloth();
                animate();
            }
        });
    }
    loadTexture(0);

    scene.add(new THREE.AxisHelper(20));

    function animate(){
        requestAnimationFrame(animate);

        if(controls)controls.update();

        var time=Date.now();

        windStrength=(Math.cos(time/7000)*20+40);
        //console.log("windStrength:",windStrength);
        //windForce.set(Math.sin(time/2000),Math.cos(time/3000),Math.sin(time/1000)).normalize().multiplyScalar(windStrength);
        //三个参数分别是x轴方向的风速，y轴的风速，z轴的风速
        windForce.set(Math.sin(time/2000),Math.cos(time/3000),1).normalize().multiplyScalar(windStrength);
        //windForce.set(1,2,0.5).normalize().multiplyScalar(windStrength);

        move();

        motion();

        simulate(time);

        renderer.render(scene,camera);

        var p=cloth.particles;
        for(var i= 0,il= p.length;i<il;i++){

            clothGeometry.vertices[i].copy(p[i].position);

            //clothObj.geometry.vertices[i].copy(p[i].position);

        }

        clothGeometry.computeFaceNormals();
        clothGeometry.computeVertexNormals();
        clothGeometry.normalsNeedUpdate=true;
        clothGeometry.verticesNeedUpdate=true;

        //clothObj.geometry.computeFaceNormals();
        //clothObj.geometry.computeVertexNormals();
        //clothObj.geometry.normalsNeedUpdate=true;
        //clothObj.geometry.verticesNeedUpdate=true;

    }

}

