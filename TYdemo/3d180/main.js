if (!Detector.webgl) Detector.addGetWebGLMessage();

/*

 python /Applications/XAMPP/xamppfiles/htdocs/three.js/utils/converters/obj/convert_obj_three.py -i/Applications/XAMPP/xamppfiles/htdocs/3d180/model/1.obj -o /Applications/XAMPP/xamppfiles/htdocs/3d180/model/1.js
*/

var STATS_ENABLED = true;
var container, stats;

var camera, scene, renderer;
var controls;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var clock = new THREE.Clock();

var Mesh1, Mesh8, Mesh0;
var Tmesh1, Tmesh8, Tmesh0;
var uniforms;
var displacement, noise;
var displacement8, noise8;
var displacement0, noise0;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor( scene.fog.color, 1 );
    //renderer.setFaceCulling( THREE.CullFaceNone );
    //renderer.autoClear = false;
    container.appendChild(renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    // CAMERAS
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.5, 10);
    camera.position.y = 5;

    controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;

    // SCENE
    scene = new THREE.Scene();


    // lights
    scene.add(new THREE.AmbientLight(0x999999));

    var light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);


    // texture
    /*
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {

            console.log(item, loaded, total);
        };

        var texture1 = new THREE.Texture();
        var loader1 = new THREE.ImageLoader(manager);
        loader1.load('model/1.jpg', function (image) {

            texture1.image = image;
            texture1.needsUpdate = true;
        });
    */

    uniforms = {

        amplitude: {
            type: "f",
            value: 1.0
        },
        color: {
            type: "c",
            value: new THREE.Color(0xff2200)
        },
        texture: {
            type: "t",
            value: THREE.ImageUtils.loadTexture("textures/water.jpg")
        },
    };

    uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

    var shaderMaterial = new THREE.ShaderMaterial({

        uniforms: uniforms,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent

    });

    // model1
    var loader1 = new THREE.JSONLoader();
    loader1.load("model/1.js", function(g) {

        Mesh1 = new THREE.Mesh(g, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: !0,
            wireframeLinewidth: 1
        }));
        Mesh1.position.set(-1, 0, 0);
        // scene.add(Mesh1);

        // var geometry=initTriangles(g.vertices);
        var geometry = createBufferGeometry(g);

        displacement = new Float32Array(geometry.attributes.position.count);
        noise = new Float32Array(geometry.attributes.position.count);
        for (var i = 0; i < displacement.length; i++) {
            noise[i] = Math.random();
        }
        geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 1));
        Tmesh1 = new THREE.Mesh(geometry, shaderMaterial);
        Tmesh1.position.set(-1, 0, 0);
        scene.add(Tmesh1);
    });


    // model8
    var loader2 = new THREE.JSONLoader();
    loader2.load("model/8.js", function(g) {
        Mesh8 = new THREE.Mesh(g, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: !0,
            wireframeLinewidth: 1
        }));
        Mesh8.position.set(0, 0, 0);
        // scene.add(Mesh8);

        // var Tmesh8=initTriangles(g.vertices);
        // Tmesh8.position.set(0, 0, 0);
        // scene.add(Tmesh8);

        var geometry = createBufferGeometry(g);
        displacement8 = new Float32Array(geometry.attributes.position.count);
        noise8 = new Float32Array(geometry.attributes.position.count);
        for (var i = 0; i < displacement8.length; i++) {
            noise8[i] = Math.random();
        }
        geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement8, 1));
        Tmesh8 = new THREE.Mesh(geometry, shaderMaterial);
        Tmesh8.position.set(0, 0, 0);
        scene.add(Tmesh8);
    });


    // model0
    var loader3 = new THREE.JSONLoader();
    loader3.load("model/0.js", function(g) {
        Mesh0 = new THREE.Mesh(g, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: !0,
            wireframeLinewidth: 1
        }));
        Mesh0.position.set(1, 0, 0);
        // scene.add(Mesh0);

        // var Tmesh0=initTriangles(geometry.vertices);
        // Tmesh0.position.set(1, 0, 0);
        // scene.add(Tmesh0);

        var geometry = createBufferGeometry(g);
        displacement0 = new Float32Array(geometry.attributes.position.count);
        noise0 = new Float32Array(geometry.attributes.position.count);
        for (var i = 0; i < displacement0.length; i++) {
            noise0[i] = Math.random();
        }
        geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement0, 1));
        Tmesh0 = new THREE.Mesh(geometry, shaderMaterial);
        Tmesh0.position.set(1, 0, 0);
        scene.add(Tmesh0);
    });


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

    initGeometry();

    window.addEventListener('resize', onWindowResize, false);
}

function createBufferGeometry(geometry) {
    var buffer_geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(geometry.faces.length * 3 * 3);
    var normals = new Float32Array(geometry.faces.length * 3 * 3);
    var colors = new Float32Array(geometry.faces.length * 3 * 3);
    var color = new THREE.Color();

    geometry.faces.forEach(function(face, index) {

        var cur_element = index;

        positions[cur_element * 9 + 0] = geometry.vertices[face.a].x;
        positions[cur_element * 9 + 1] = geometry.vertices[face.a].y;
        positions[cur_element * 9 + 2] = geometry.vertices[face.a].z;
        positions[cur_element * 9 + 3] = geometry.vertices[face.b].x;
        positions[cur_element * 9 + 4] = geometry.vertices[face.b].y;
        positions[cur_element * 9 + 5] = geometry.vertices[face.b].z;
        positions[cur_element * 9 + 6] = geometry.vertices[face.c].x;
        positions[cur_element * 9 + 7] = geometry.vertices[face.c].y;
        positions[cur_element * 9 + 8] = geometry.vertices[face.c].z;

        normals[cur_element * 9 + 0] = face.normal.x;
        normals[cur_element * 9 + 1] = face.normal.y;
        normals[cur_element * 9 + 2] = face.normal.z;
        normals[cur_element * 9 + 3] = face.normal.x;
        normals[cur_element * 9 + 4] = face.normal.y;
        normals[cur_element * 9 + 5] = face.normal.z;
        normals[cur_element * 9 + 6] = face.normal.x;
        normals[cur_element * 9 + 7] = face.normal.y;
        normals[cur_element * 9 + 8] = face.normal.z;

        colors[cur_element * 9 + 0] = color.r;
        colors[cur_element * 9 + 1] = color.g;
        colors[cur_element * 9 + 2] = color.b;
        colors[cur_element * 9 + 3] = color.r;
        colors[cur_element * 9 + 4] = color.g;
        colors[cur_element * 9 + 5] = color.b;
        colors[cur_element * 9 + 6] = color.r;
        colors[cur_element * 9 + 7] = color.g;
        colors[cur_element * 9 + 8] = color.b;
    });

    buffer_geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    buffer_geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    buffer_geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    buffer_geometry.computeBoundingSphere();
    return buffer_geometry;
}


function initTriangles(vertices) {
    var triangles = vertices.length;
    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(triangles * 3 * 3);
    var normals = new Float32Array(triangles * 3 * 3);
    var colors = new Float32Array(triangles * 3 * 3);
    var color = new THREE.Color();

    var n = 1,
        n2 = n / 2; // triangles spread in the cube
    var d = .2,
        d2 = d / 2; // individual triangle size

    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();

    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();


    for (var i = 0; i < positions.length; i += 9) {
        // positions
        var x, y, z;

        if (Math.floor(i / 9) < vertices.length) {
            // console.log(Math.floor(i/9));
            x = vertices[Math.floor(i / 9)].x;
            y = vertices[Math.floor(i / 9)].y;
            z = vertices[Math.floor(i / 9)].z;
        }

        var ax = x + Math.random() * d - d2;
        var ay = y + Math.random() * d - d2;
        var az = z + Math.random() * d - d2;

        var bx = x + Math.random() * d - d2;
        var by = y + Math.random() * d - d2;
        var bz = z + Math.random() * d - d2;

        var cx = x + Math.random() * d - d2;
        var cy = y + Math.random() * d - d2;
        var cz = z + Math.random() * d - d2;

        positions[i] = ax;
        positions[i + 1] = ay;
        positions[i + 2] = az;

        positions[i + 3] = bx;
        positions[i + 4] = by;
        positions[i + 5] = bz;

        positions[i + 6] = cx;
        positions[i + 7] = cy;
        positions[i + 8] = cz;

        // flat face normals
        pA.set(ax, ay, az);
        pB.set(bx, by, bz);
        pC.set(cx, cy, cz);

        cb.subVectors(pC, pB);
        ab.subVectors(pA, pB);
        cb.cross(ab);

        cb.normalize();

        var nx = cb.x;
        var ny = cb.y;
        var nz = cb.z;

        normals[i] = nx;
        normals[i + 1] = ny;
        normals[i + 2] = nz;

        normals[i + 3] = nx;
        normals[i + 4] = ny;
        normals[i + 5] = nz;

        normals[i + 6] = nx;
        normals[i + 7] = ny;
        normals[i + 8] = nz;

        // colors

        var vx = (x / n) + 0.5;
        var vy = (y / n) - 1;
        var vz = (z / n) + 0.5;

        color.setRGB(vx, vy, vz);

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        colors[i + 3] = color.r;
        colors[i + 4] = color.g;
        colors[i + 5] = color.b;

        colors[i + 6] = color.r;
        colors[i + 7] = color.g;
        colors[i + 8] = color.b;
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    geometry.computeBoundingSphere();
    return geometry;
}


var GeometryMesh;

function initGeometry() {
    // geometry
    var triangles = 1;
    var instances = 20000;

    var geometry = new THREE.InstancedBufferGeometry();

    geometry.maxInstancedCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise

    var vertices = new THREE.BufferAttribute(new Float32Array(triangles * 3 * 3), 3);
    vertices.setXYZ(0, 0.025, -0.025, 0);
    vertices.setXYZ(1, -0.025, 0.025, 0);
    vertices.setXYZ(2, 0, 0, 0.025);

    geometry.addAttribute('position', vertices);
    var offsets = new THREE.InstancedBufferAttribute(new Float32Array(instances * 3), 3, 1);
    for (var i = 0, ul = offsets.count; i < ul; i++) {
        offsets.setXYZ(i, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
    }

    geometry.addAttribute('offset', offsets);
    var colors = new THREE.InstancedBufferAttribute(new Float32Array(instances * 4), 4, 1);
    for (var i = 0, ul = colors.count; i < ul; i++) {
        colors.setXYZW(i, Math.random(), Math.random(), Math.random(), Math.random());
    }
    geometry.addAttribute('color', colors);
    var vector = new THREE.Vector4();
    var orientationsStart = new THREE.InstancedBufferAttribute(new Float32Array(instances * 4), 4, 1);
    for (var i = 0, ul = orientationsStart.count; i < ul; i++) {
        vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        vector.normalize();
        orientationsStart.setXYZW(i, vector.x, vector.y, vector.z, vector.w);
    }
    geometry.addAttribute('orientationStart', orientationsStart);

    var orientationsEnd = new THREE.InstancedBufferAttribute(new Float32Array(instances * 4), 4, 1);
    for (var i = 0, ul = orientationsEnd.count; i < ul; i++) {
        vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        vector.normalize();
        orientationsEnd.setXYZW(i, vector.x, vector.y, vector.z, vector.w);
    }
    geometry.addAttribute('orientationEnd', orientationsEnd);

    // material
    var material = new THREE.RawShaderMaterial({
        uniforms: {
            time: {
                type: "f",
                value: 1.0
            },
            sineTime: {
                type: "f",
                value: 1.0
            }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.DoubleSide,
        transparent: true

    });

    GeometryMesh = new THREE.Mesh(geometry, material);
    scene.add(GeometryMesh);

    //console.log(GeometryMesh.geometry);
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
    var time = performance.now();
    if (GeometryMesh) {
        GeometryMesh.rotation.y = time * 0.0002;
        GeometryMesh.material.uniforms.time.value = time * 0.005;
        GeometryMesh.material.uniforms.sineTime.value = Math.sin(GeometryMesh.material.uniforms.time.value * 0.05) + 2;
    }

    time = Date.now() * 0.01;
    uniforms.amplitude.value = 0.1 * Math.sin(0.01 * time);
    uniforms.color.value.offsetHSL(0.0005, 0, 0);
    if (Tmesh1) {
        for (var i = 0; i < displacement.length; i++) {
            displacement[i] = Math.sin(0.1 * i + time) * 0.2;
            noise[i] += 0.1 * (Math.random() - 0.5);
            noise[i] = THREE.Math.clamp(noise[i], -0.1, 0.1);
            displacement[i] += noise[i];
        }
        Tmesh1.geometry.attributes.displacement.needsUpdate = true;
    }
    if (Tmesh8) {
        for (var i = 0; i < displacement8.length; i++) {
            displacement8[i] = Math.sin(0.1 * i + time) * 0.2;
            noise8[i] += 0.1 * (Math.random() - 0.5);
            noise8[i] = THREE.Math.clamp(noise8[i], -0.1, 0.1);
            displacement8[i] += noise8[i];
        }
        Tmesh8.geometry.attributes.displacement.needsUpdate = true;
    }
    if (Tmesh0) {
        for (var i = 0; i < displacement0.length; i++) {
            displacement0[i] = Math.sin(0.1 * i + time) * 0.2;
            noise0[i] += 0.1 * (Math.random() - 0.5);
            noise0[i] = THREE.Math.clamp(noise0[i], -0.1, 0.1);
            displacement0[i] += noise0[i];
        }
        Tmesh0.geometry.attributes.displacement.needsUpdate = true;
    }

    controls.update();
    renderer.render(scene, camera);

    if (STATS_ENABLED) stats.update();

}