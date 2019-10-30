document.addEventListener('touchmove', function(event){event.preventDefault();}, false);
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var STATS_ENABLED = false;
var container, stats;

var camera, scene, renderer, effect;
var controls;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var color1,color2;

var waterNormals;

var morphs=[];
var clock = new THREE.Clock();

init();
animate();


var isVR=false;
$(".nav").on("click",changeEye);
function changeEye()
{
    console.log("changeEye");

    if(isVR)
    {
        $(".glass1").show();
        $(".glass2").hide();
    }else{
        $(".glass1").hide();
        $(".glass2").show();
    }

    isVR=!isVR;

    onWindowResize();
}



function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );



    effect = new THREE.StereoEffect( renderer );
    effect.eyeSeparation = 4;
    effect.setSize( window.innerWidth, window.innerHeight );



    // CAMERAS
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.y=600;


    controls = new THREE.DeviceOrientationControls( camera );
    //controls.maxPolarAngle = Math.PI / 2;
    //controls.minDistance = 500;
    //controls.maxDistance = 1000;
    controls.connect();

    // SCENE
    scene = new THREE.Scene();


    // lights
    scene.add( new THREE.AmbientLight( 0xaaaaaa ) );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    dirLight.position.set( 0.1, 0, -1 ).normalize();
    scene.add( dirLight );

    // lens flares
    var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
    var textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare2.png" );
    var textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare3.png" );

    var light = new THREE.PointLight( 0xffffff, 1.5, 5000 );
    light.position.set( 100, 700, -1000 );
    scene.add( light );

    var flareColor = new THREE.Color( 0xffffff );
    var lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );
    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

    lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

    lensFlare.position.copy( light.position );
    scene.add( lensFlare );

    lensFlare.customUpdateCallback = function ( object )
    {
        var f, fl = object.lensFlares.length;
        var flare;
        var vecX = -object.positionScreen.x * 2;
        var vecY = -object.positionScreen.y * 2;
        for( f = 0; f < fl; f++ ) {

            flare = object.lensFlares[ f ];

            flare.x = object.positionScreen.x + vecX * flare.distance;
            flare.y = object.positionScreen.y + vecY * flare.distance;

            flare.rotation = 0;
        }
        object.lensFlares[ 2 ].y += 0.025;
        object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
    }




    //Water

    waterNormals = new THREE.ImageUtils.loadTexture( 'textures/waternormals.jpg' );
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 

    water = new THREE.Water( renderer, camera, scene, {
        textureWidth: 512, 
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha:  1.0,
        sunDirection: dirLight.position.normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 5.0,
    } );

    mirrorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry( 100000, 100000, 50, 50 ), 
        water.material
    );
    
    mirrorMesh.add( water );
    mirrorMesh.rotation.x = - Math.PI * 0.5;
    scene.add( mirrorMesh );



    color1=new THREE.Color( 0x66feb1 );
    color2=new THREE.Color( 0x56f775 );

    //fog
    //scene.fog = new THREE.Fog( 0x56f8eb, 500, 1500 );
    scene.fog = new THREE.Fog( color2, 500, 1500 );


    // load skybox
    var cubeMap = new THREE.CubeTexture( [] );
    cubeMap.format = THREE.RGBFormat;
    cubeMap.flipY = false;

    var loader = new THREE.ImageLoader();
    loader.load( 'textures/skyboxsun25degtest.png', function ( image ) {

        var getSide = function ( x, y ) {

            var size = 1024;

            var canvas = document.createElement( 'canvas' );
            canvas.width = size;
            canvas.height = size;

            var context = canvas.getContext( '2d' );
            context.drawImage( image, - x * size, - y * size );

            return canvas;
        };

        cubeMap.images[ 0 ] = getSide( 2, 1 ); // px
        cubeMap.images[ 1 ] = getSide( 0, 1 ); // nx
        cubeMap.images[ 2 ] = getSide( 1, 0 ); // py
        cubeMap.images[ 3 ] = getSide( 1, 2 ); // ny
        cubeMap.images[ 4 ] = getSide( 1, 1 ); // pz
        cubeMap.images[ 5 ] = getSide( 3, 1 ); // nz
        cubeMap.needsUpdate = true;

    } );

    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = cubeMap;

    var skyBoxMaterial = new THREE.ShaderMaterial( {
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });

    var skyBox = new THREE.Mesh(
        new THREE.BoxGeometry( 100000, 100000, 100000 ),
        skyBoxMaterial
    );
    
    scene.add( skyBox );



    // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );
    };

    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( manager );
    loader.load( 'WuQi/p_weapon017.png', function ( image ) {

        texture.image = image;
        texture.needsUpdate = true;
    } );


    var texture1 = new THREE.Texture();
    var loader1 = new THREE.ImageLoader( manager );
    loader1.load( 'WuQi/phw_weaponA001.png', function ( image ) {

        texture1.image = image;
        texture1.needsUpdate = true;
    } );

    var texture2 = new THREE.Texture();
    var loader2 = new THREE.ImageLoader( manager );
    loader2.load( 'WuQi/pnm_weaponB101.png', function ( image ) {

        texture2.image = image;
        texture2.needsUpdate = true;
    } );


    var loader = new THREE.OBJLoader( manager );
    loader.load( 'WuQi/p_weapon017.obj', function ( object )
    {
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                child.material.map = texture;
            }
        } );
        object.position.y = 301;
        object.position.z = - 600;
        object.scale.set( 8, 8, 8 );
        scene.add( object );
    } );



    var loader1 = new THREE.OBJLoader( manager );
    loader1.load( 'obj/1.obj', function ( object )
    {
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                child.material.map = texture1;
            }
        } );
        object.position.x = 400;
        object.position.y = 100;
        object.position.z = - 400;
        object.scale.set( 3, 3, 3 );
        scene.add( object );
    } );


    var loader2 = new THREE.OBJLoader( manager );
    loader2.load( 'WuQi/pnm_weaponB101.obj', function ( object )
    {
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                child.material.map = texture2;
            }
        } );
        object.position.x = -400;
        object.position.y = 300;
        object.position.z = - 600;
        object.scale.set( 4, 4, 4 );
        scene.add( object );
    } );

/*
    var dae;
    var loader3 = new THREE.ColladaLoader();
    loader3.options.convertUpAxis = true;
    loader3.load( 'DAE/arthas_run.dae', function ( collada )
    {
        dae = collada.scene;
        dae.traverse( function ( child ) {
            if ( child instanceof THREE.SkinnedMesh ) {

                var animation = new THREE.Animation( child, child.geometry.animation );
                animation.play();
            }
        } );
        dae.scale.x = dae.scale.y = dae.scale.z = 0.2;
        dae.updateMatrix();
        scene.add(dae);
    } );


    var loader4 = new THREE.JSONLoader();
    loader4.load( "DAE/monster.js", function ( geometry, materials )
    {
        var faceMaterial = new THREE.MeshFaceMaterial( materials );
        for ( var i = 0; i < 30; i ++ )
        {
            // random placement in a grid
            var x = THREE.Math.randFloatSpread( 1000 );
            var z = THREE.Math.randFloatSpread( 1000 );
            morph = new THREE.MorphAnimMesh( geometry, faceMaterial );
            // one second duration
            morph.duration = 1000;
            // random animation offset
            morph.time = 1000 * Math.random();

            var s = THREE.Math.randFloat( 0.01, 0.1 );
            morph.scale.set( s, s, s );

            morph.position.set( x, 0, z );
            //morph.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

            morph.matrixAutoUpdate = false;
            morph.updateMatrix();

            scene.add( morph );
            morphs.push( morph );
        }
    } );

*/

    var loader5 = new THREE.JSONLoader();
    loader5.load( "DAE/js/kobe4.js", function ( geometry, materials )
    {
        var zmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        zmesh.position.set( 0, 200, 0 );
        zmesh.scale.set( 8, 8, 8 );
        scene.add( zmesh );
    });



    if ( STATS_ENABLED ) {

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.zIndex = 100;
        container.appendChild( stats.domElement );

    }

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    effect.setSize( window.innerWidth, window.innerHeight );
}


//

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {

    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();

    controls.update();


    if(isVR)
    {
        effect.render( scene, camera );
    }else{
        renderer.render( scene, camera );
    }

    if ( STATS_ENABLED ) stats.update();

}