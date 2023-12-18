if (!Detector.webgl) Detector.addGetWebGLMessage();

var STATS_ENABLED = true;
var container, stats;

var camera, scene, renderer;
var controls;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();
function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor( scene.fog.color, 1 );
    //renderer.setFaceCulling( THREE.CullFaceNone );
    //renderer.autoClear = false;
    container.appendChild(renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    // CAMERAS
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.y = 200;
    camera.position.z = -800;
    camera.rotation.x=Math.PI;
    camera.rotation.z=Math.PI;



    // SCENE
    scene = new THREE.Scene();

    // lights
    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffeedd, 2);
    directionalLight.position.set(0, -70, 100).normalize();
    scene.add(directionalLight);


    // model
    var dae;
    var loader3 = new THREE.ColladaLoader();
    loader3.options.convertUpAxis = true;
    loader3.load( 'model/changjing.dae', function ( collada )
    {
        dae = collada.scene;
        dae.scale.x = dae.scale.y = dae.scale.z = 20;
        dae.updateMatrix();
        scene.add(dae);
        //dae.rotation.y=Math.PI/2;


        var tree=dae.getObjectByName("tree").children[0];
        tree.material=new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('model/shu_uv.jpg')
        });

        var house=dae.getObjectByName("house").children[0].children[0];
        house.material=new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('model/fangzi-tietu.jpg')
        });

        var chimney=dae.getObjectByName("house").children[1].children[0];
        chimney.material=new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('model/chimney.jpg')
        });

        var smoke = dae.getObjectByName("yan").children[0];
        smoke.rotation.z=Math.PI;
        smoke.material=new THREE.MeshBasicMaterial({
            map: smokeArr[0],
            transparent: !0
        });
        UpdataM(smoke.material,smokeArr,smokeNum);

        var bird = dae.getObjectByName("niao").children[0];
        bird.material=new THREE.MeshBasicMaterial({
            map: birdArr[0],
            transparent: !0
        });
        UpdataM(bird.material,birdArr,birdNum);

        var lu = dae.getObjectByName("lu").children[0];
        lu.material=new THREE.MeshBasicMaterial({
            map: luArr[0],
            transparent: !0
        });
        UpdataM(lu.material,luArr,luNum);


        var floor=dae.getObjectByName("floor").children[0];
        floor.material=new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('model/dimian.png')
        });

        var letterBox=dae.getObjectByName("xinxiang1").children[0];
        letterBox.material=new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('model/xinxiang_uv.jpg')
        });

        ///////tree_s
        for ( i = 1; i <=4 ; i++)
        {
            dae.getObjectByName("xiaoshu"+i).children[0].material=new THREE.MeshBasicMaterial({
                map: new THREE.ImageUtils.loadTexture('model/xiaoshu_uv.jpg')
            });
        }
        ///////Grass
        for ( i = 1; i <=7 ; i++)
        {
            dae.getObjectByName("cao" + i).children[0].material=new THREE.MeshBasicMaterial({
                map: new THREE.ImageUtils.loadTexture('model/cao_uv.png'),
                transparent: !0
            });
        }
        ///////Boxs
        for ( i = 1; i <=3 ; i++)
        {
            dae.getObjectByName("lipinhe"+i).children[0].material=new THREE.MeshBasicMaterial({
                map: new THREE.ImageUtils.loadTexture('model/lipinhe.jpg')
            });
        }
        ///////letters
        for (i = 1; i <=8 ; i++)
        {
            dae.getObjectByName("cell"+i).children[0].material=new THREE.MeshBasicMaterial({
                map: new THREE.ImageUtils.loadTexture('model/letter_cell.png'),
                transparent: !0
            });
        }


    } );

    var smokeNum=1;
    var smokeArr=[];
    for ( var i = 1; i <= 20; i ++ ) {

        var map = THREE.ImageUtils.loadTexture('model/smoke/p'+i+'.png');
        //map.premultiplyAlpha = true;
        map.needsUpdate = true;
        smokeArr.push( map );
    }
    var birdNum=1;
    var birdArr=[];
    for ( i = 1; i <= 100; i ++ ) {

        var map = THREE.ImageUtils.loadTexture('model/bird/p'+i+'.png');
        //map.premultiplyAlpha = true;
        map.needsUpdate = true;
        birdArr.push( map );
    }
    var luNum=1;
    var luArr=[];
    for ( i = 1; i <= 138; i ++ ) {

        var map = THREE.ImageUtils.loadTexture('model/lu/p'+i+'.png');
        //map.premultiplyAlpha = true;
        map.needsUpdate = true;
        luArr.push( map );
    }


    function UpdataM(_m,_arr,_num)
    {
        _num++;
        if(_num>_arr.length)_num=1;
        _m.map= _arr[_num-1];
        TweenMax.delayedCall(0.04,function()
        {
            UpdataM(_m,_arr,_num)
        });
    }


    if (STATS_ENABLED) {

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.zIndex = 100;
        container.appendChild(stats.domElement);

    }

    //

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {
    requestAnimationFrame(animate);

//    scene.rotation.y = (scene.rotation.y + 0.01) % (Math.PI * 2);

    render();
}

function render() {

    renderer.render(scene, camera);


    if (STATS_ENABLED) stats.update();

}