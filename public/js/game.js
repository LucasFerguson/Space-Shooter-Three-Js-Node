let scene, renderer;
let geometry, material, mesh;

let camera;

//// ////
let raycaster;
let mouse;
let ambientLight;
//// ////

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000);
    camera.position.z = 30;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //// ////
    geometry = new THREE.PlaneGeometry(50, 50);
    material = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //// ////

    //// ////
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    //// ////
}

function animate() {

    requestAnimationFrame(animate);

    keyboard();

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);


    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    for (var i = 0; i < intersects.length; i++) {
        console.log(intersects[i].point);
        // intersects[i].object.material.color.set(0x00ff00);
    }

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;


    renderer.render(scene, camera);
}





// mousemove
window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}


// onWindowResize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    renderer.setSize(windowWidth, windowHeight);
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
}


var keyCode = {}; // You could also use an array
onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    keyCode[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}

function keyboard() {
    if (keyCode) {
        var left = -1;
        var up = 1;
        var right = 1;
        var down = -1;

        var speed = camera.position.z / 40;

        if (keyCode[37]) {
            camera.position.x += left * speed;
        }
        if (keyCode[38]) {
            camera.position.y += up * speed;
        }
        if (keyCode[39]) {
            camera.position.x += right * speed;
        }
        if (keyCode[40]) {
            camera.position.y += down * speed;
        }

        //shift 16
        //ctrl	17

        var shift = -1;
        var ctrl = 1;

        if (keyCode[16]) {
            camera.position.z += shift * speed;
        }
        if (keyCode[17]) {
            camera.position.z += ctrl * speed;
        }
    }
}