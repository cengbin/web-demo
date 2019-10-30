if (!Detector.webgl) Detector.addGetWebGLMessage();

var STATS_ENABLED = true;
var container, stats;
var camera, scene, renderer;
var controls;
var ModelInfo, Modelbuffer, ModelMesh;
$(document).ready(function() {
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);


    load_model();

    window.addEventListener('resize', resizeCanvas, false);
});

function resizeCanvas() {
    var winWidth = $(window).get(0).innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var winHeight = $(window).get(0).innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    camera.aspect = winWidth / winHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(winWidth, winHeight);
}

function load_model() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "model/scene1.oemodel", true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e) {

        Modelbuffer = this.response;
        ModelInfo = read_info(Modelbuffer);
        init();
        animate();
    };
    xhr.send();
}



function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    // SCENE
    scene = new THREE.Scene();


    // CAMERAS
    camera = new THREE.PerspectiveCamera(
        Math.atan2(0.495 * ModelInfo.camera_width, ModelInfo.camera_fx) * 360 / Math.PI,
        window.innerWidth / window.innerHeight,
        .01,
        100
    );
    camera.position.set(0, 0, 1);
    camera.up.set(-1, 0, 0);
    camera.lookAt(scene.position);


    controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;



    // lights
    //scene.add( new THREE.AmbientLight( 0xffffff ) );
    //
    //var dirLight = new THREE.DirectionalLight( 0x00ffff, 2 );
    //dirLight.position.set( 0.1, 0, -1 ).normalize();
    //scene.add( dirLight );



    ModelMesh = create_mesh(ModelInfo, Modelbuffer);
    scene.add(ModelMesh);

    // var texture = THREE.ImageUtils.loadTexture('model/UV.jpg');
    var texture = THREE.ImageUtils.loadTexture('model/poster1.jpg');

    ModelMesh.material = new THREE.MeshBasicMaterial({
            //color: 0,
            wireframe: !0,
            needsUpdate: true,
            map: texture,
            wireframeLinewidth: 2
        });

        window.addEventListener('mousedown', function() {
        ModelMesh.material.wireframe=!0;
    }, false);
        window.addEventListener('mouseup', function() {
        ModelMesh.material.wireframe=0;
    }, false);

            window.addEventListener('touchstart', function() {
        ModelMesh.material.wireframe=!0;
    }, false);
        window.addEventListener('touchend', function() {
        ModelMesh.material.wireframe=0;
    }, false);




    if (STATS_ENABLED) {

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.zIndex = 100;
        container.appendChild(stats.domElement);
    }

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



// read_info
function read_info(buffer) {

    function read_int(buffer, offset) {
        return new Int32Array(buffer, offset, 1)[0];
    }

    function read_float(buffer, offset) {
        return new Float32Array(buffer, offset, 1)[0];
    }

    return {
        version: read_int(buffer, 0),
        camera_width: read_int(buffer, 4),
        camera_height: read_int(buffer, 8),
        camera_fx: read_float(buffer, 12),
        camera_fy: read_float(buffer, 16),
        camera_k1: read_float(buffer, 20),
        camera_k2: read_float(buffer, 24),
        depthmap_width: read_int(buffer, 28),
        depthmap_height: read_int(buffer, 32),
        header_size: 36
    };
}

//Model mesh
function create_mesh(header, buffer) {
    console.log(header);

    var cw = header.camera_width,
        ch = header.camera_height,
        fx = header.camera_fx,
        fy = header.camera_fy,
        dw = header.depthmap_width,
        dh = header.depthmap_height;

    function add_face(geometry, a, b, c) {
        geometry.faces.push(new THREE.Face3(a, b, c));
        //add_UV(geometry,a,b,c);
    }

    function add_UV(geometry, n, r, i, s, o, u) {
        geometry.faceVertexUvs[0].push(
            [
                new THREE.Vector2(n, r),
                new THREE.Vector2(i, s),
                new THREE.Vector2(o, u)
            ]);
    }


    var depthmap = new Float32Array(buffer, header.header_size, dw * dh);
    var geometry = new THREE.Geometry();
    var o = [];



    for (var y = 0; y < dh; ++y) {
        for (var x = 0; x < dw; ++x) {
            var depth = depthmap[y * dw + x];

            var _X = ((x + 0.5) / dw - 0.5) * depth / fx * cw,
                _Y = -((y + 0.5) / dh - 0.5) * depth / fy * ch,
                _Z = -(depth - 1);

            //reset toplines
            if (x < 5) {
                _X = -1.2
                _Z = -2;
            }

            o.push((x + .5) / dw);
            o.push(1 - (y + .5) / dh);

            geometry.vertices.push(new THREE.Vector3(_X, _Y, _Z));

            if (y > 0 && x > 0) {
                var a = (y - 1) * dw + x - 1;
                var b = (y - 1) * dw + x;
                var c = y * dw + x - 1;
                var d = y * dw + x;

                add_face(geometry, a, c, b);
                add_face(geometry, b, c, d);

                add_UV(geometry,
                    o[a * 2], o[a * 2 + 1],
                    o[c * 2], o[c * 2 + 1],
                    o[b * 2], o[b * 2 + 1]
                );
                add_UV(geometry,
                    o[b * 2], o[b * 2 + 1],
                    o[c * 2], o[c * 2 + 1],
                    o[d * 2], o[d * 2 + 1]
                );
            }

        }
    }
    geometry.uvsNeedUpdate = true;
    geometry.buffersNeedUpdate = true;


    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: 0,
        wireframe: !0,
        wireframeLinewidth: 1
    }));
    return mesh;
}