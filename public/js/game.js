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



    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //// ////
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
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

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);


    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    for (var i = 0; i < intersects.length; i++) {
        console.log(intersects[i].point);

        intersects[i].object.material.color.set(0x00ff00);

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