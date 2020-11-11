if (!Detector.webgl) Detector.addGetWebGLMessage();

var STATS_ENABLED = true;
var container, stats;

var camera, scene, renderer;
var controls;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var clock = new THREE.Clock();

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
    camera.position.y = 600;


    controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;

    // SCENE
    scene = new THREE.Scene();


    // lights
    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffeedd, 2);
    directionalLight.position.set(0, -70, 100).normalize();
    scene.add(directionalLight);


    // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {

        console.log(item, loaded, total);
    };

    var texture1 = new THREE.Texture();
    var loader1 = new THREE.ImageLoader(manager);
    loader1.load('model/js/af1.jpg', function (image) {

        texture1.image = image;
        texture1.needsUpdate = true;
    });

    var materials =
        [
            new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('model/js/af1.jpg'),
            transparent: !0,
            opacity: 0
        }), new THREE.MeshBasicMaterial({
            color: 0,
            wireframe: !0,
            wireframeLinewidth: 1
        }), new THREE.MeshBasicMaterial({
            transparent: !0,
            opacity: 0,
            color: 0xffffff
        })
        ];


    // model
    var loader1 = new THREE.JSONLoader();
    loader1.load("model/js/af1.js", function (geometry) {
        var _meshData={
            sortedGeometry: !1,
            smooth: !1,
            polygons:.03
        };
        _meshData.smooth = geometry.clone();
        _meshData.smooth .mergeVertices();

        var _mesh = new THREE.SceneUtils.createMultiMaterialObject(_meshData.smooth, materials)
        _mesh.position.set(0, 0, 0);
        _mesh.scale.set(8, 8, 8);
        scene.add(_mesh);


        var e = new THREE.SimplifyModifier(100);
        _meshData.sortedGeometry = e.modify(_meshData.smooth);

        TweenMax.to(_meshData,8,{polygons:1,delay:2,ease:Strong.easeInOut,onUpdate:changeVertices,onUpdateParams: [_meshData]});
        TweenMax.to(materials[2],1,{opacity:1,delay:6});
        TweenMax.to(materials[0],2,{opacity:1,delay:8});
        changeVertices(_meshData);

    });

    function changeVertices(_meshData) {
        var c, d =_meshData.polygons, e = _meshData.sortedGeometry.map, f = _meshData.sortedGeometry.vertices, g = f.length - 1, h = 0, i = _meshData.smooth;
        g = g * d || 0;
        for (var j = 0; j < i.faces.length; j++) {
            c = i.faces[j];
            var k = _meshData.sortedGeometry.faces[j];
            for (c.a = k.a, c.b = k.b, c.c = k.c; c.a > g;)c.a = e[c.a];
            for (; c.b > g;)c.b = e[c.b];
            for (; c.c > g;)c.c = e[c.c];
            c.a !== c.b && c.b !== c.c && c.c !== c.a && h++
        }
        i.computeFaceNormals();
        i.verticesNeedUpdate = !0;
        i.normalsNeedUpdate = !0;
    }


    //var loader5 = new THREE.JSONLoader();
    //loader5.load("model/js/kobe4.js", function (geometry, materials) {
    //    var zmesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    //    zmesh.position.set(0, 0, 100);
    //    zmesh.scale.set(8, 8, 8);
    //    scene.add(zmesh);
    //});


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

    render();
}

function render() {

    controls.update();
    renderer.render(scene, camera);

    if (STATS_ENABLED) stats.update();

}