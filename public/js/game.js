let scene, renderer;
let geometry, material, mesh;

let camera;

//// ////
let raycaster;
let mouse;
let ambientLight;
let shipSprite;
let player = new Player();
let controller = new Controller();
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
    var spriteMap = new THREE.TextureLoader().load("./assets/images/Space Ship.png");

    var spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        color: 0xffffff
    });
    shipSprite = new THREE.Sprite(spriteMaterial);
    scene.add(shipSprite);
    //// ////

    //// ////
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    //// ////


    controller.setup();
}



function animate() {

    requestAnimationFrame(animate);

    // controller.update();

    var left = -1;
    var up = 1;
    var right = 1;
    var down = -1;

    var speed = camera.position.z / 40;

    if (controller.leftarrow) {
        camera.position.x += left * speed;
    }
    if (controller.uparrow) {
        camera.position.y += up * speed;
    }
    if (controller.rightarrow) {
        camera.position.x += right * speed;
    }
    if (controller.downarrow) {
        camera.position.y += down * speed;
    }

    //shift 16
    //ctrl	17

    var shift = -1;
    var ctrl = 1;

    if (controller.keyCodes[16]) {
        camera.position.z += shift * speed;
    }
    if (controller.keyCodes[17]) {
        camera.position.z += ctrl * speed;
    }



    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);


    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    for (var i = 0; i < intersects.length; i++) {
        // console.log(intersects[i].point);
        // intersects[i].object.material.color.set(0x00ff00);
    }

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;


    renderer.render(scene, camera);
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