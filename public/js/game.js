//          ////////////////////////////
//         //// SPACE SHOOTER GAME ////
//        ////    Created By      ////
//       ////   Lucas Ferguson   ////
//      ////////////////////////////


//// ////
let raycaster;
let mouse;


let shipSprite;
//// ////


/**
 * backgroundPlane for mouse raycaster to hit
 */
let backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        wireframe: true
    })
);
scene.add(backgroundPlane);
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * backgroundPlane for mouse raycaster to hit
 */
let ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * player
 */
let player = new Player();
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * Game controller for all user input
 */
let controller = new Controller();
controller.setup();
////    ////    ////
///    ////    ////
//    ////    ////

function setup() {}

/**
 * @description Master Function for running the game   
 * requestAnimationFrame(gameLoop);  
 * update();  
 * render();  
 */
function gameLoop() {
    requestAnimationFrame(gameLoop);

    update();
    render();
}

function update() {
    controller.update();

    player.shipSprite.position.x = controller.mouse.x;
    player.shipSprite.position.y = controller.mouse.y;


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

    if (controller.keyCodes[16] || controller.keyCodes[69]) {
        camera.position.z += shift * speed;
    }
    if (controller.keyCodes[17] || controller.keyCodes[81]) {
        camera.position.z += ctrl * speed;
    }

}

function render() {

    renderer.render(scene, camera);
}

setup();
gameLoop();

////////////////////////////////////

// init();
// animate();

function init() {
    //// ////
    // var spriteMap = new THREE.TextureLoader().load("./assets/images/Space Ship.png");

    // var spriteMaterial = new THREE.SpriteMaterial({
    //     map: spriteMap,
    //     color: 0xffffff
    // });
    // shipSprite = new THREE.Sprite(spriteMaterial);
    // scene.add(shipSprite);
    //// ////

    //// ////
    // raycaster = new THREE.Raycaster();
    // mouse = new THREE.Vector2();

    //// ////

    // controller.setup();
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

    if (controller.keyCodes[16] || controller.keyCodes[69]) {
        camera.position.z += shift * speed;
    }
    if (controller.keyCodes[17] || controller.keyCodes[81]) {
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

    renderer.render(scene, camera);
}