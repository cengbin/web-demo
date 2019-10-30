document.addEventListener('touchmove', function(event){event.preventDefault();}, false);

var isVR=true;

var camera, scene, renderer,effect;
var controls;
var container;

var _w,_h;


init();
animate();
onWindowResize();


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
	container = document.getElementById( 'container' );
	
	video = document.getElementById( 'video1' );
	video.width = 1280;
	video.height = 720;
	video.autoplay = true;
	video.loop = true; 
	video.crossOrigin='anonymous';
	video.src=videoSRC;

	intObjectL();
	intObjectR();

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
	camera.target = new THREE.Vector3( 0, 0, 0 );


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );

	controls = new THREE.TyCameraControls( camera );
    //controls.maxPolarAngle = Math.PI / 2;
    //controls.minDistance = 500;
    //controls.maxDistance = 1000;
    controls.connect();


    effect = new THREE.TyVREffect( renderer );
	effect.eyeSeparation = 3;
	effect.setSize( window.innerWidth, window.innerHeight );

	window.addEventListener( 'resize', onWindowResize, false );
}
function intObjectL() 
{
	scene = new THREE.Scene();

	var geometry = new THREE.SphereGeometry( 500, 30, 30 );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

	var videoTexture = new THREE.VideoTexture( video );
	// videoTexture.repeat.set( 1, 0.5 );
	videoTexture.generateMipmaps = false;
	videoTexture.minFilter = THREE.LinearFilter;

	change_uvs( geometry, 1, 0.5, 0, 1 );

	var material   = new THREE.MeshBasicMaterial( { map : videoTexture } );
	var mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
}

var sceneR;
function intObjectR() 
{
	sceneR = new THREE.Scene();

	var geometry = new THREE.SphereGeometry( 500, 30, 30 );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

	var videoTexture = new THREE.VideoTexture( video );
	// videoTexture.repeat.set( 1, 0.5 );
	videoTexture.generateMipmaps = false;
	videoTexture.minFilter = THREE.LinearFilter;

	change_uvs( geometry, 1, 0.5, 0, 0 );

	var material   = new THREE.MeshBasicMaterial( { map : videoTexture } );
	var mesh = new THREE.Mesh( geometry, material );
	sceneR.add( mesh );
}

function onWindowResize() 
{
	_w=window.innerWidth ;
	_h=window.innerHeight 
	camera.aspect = _w / _h;
	camera.updateProjectionMatrix();

	renderer.setSize( _w, _h );
	effect.setSize( _w, _h );
}






function animate() {

	requestAnimationFrame( animate );
	update();

}

function update() 
{
	controls.update();	

	if(isVR)
	{
		effect.render( scene,sceneR, camera);
	}else{
		renderer.render( scene, camera );
	}
}



function change_uvs( geometry, unitx, unity, offsetx, offsety ) {
	var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
	for ( var i = 0; i < faceVertexUvs.length; i ++ ) {
		var uvs = faceVertexUvs[ i ];
		for ( var j = 0; j < uvs.length; j ++ ) {
			var uv = uvs[ j ];
			uv.x = ( uv.x + offsetx ) * unitx;
			uv.y = ( uv.y + offsety ) * unity;
		}
	}
}
