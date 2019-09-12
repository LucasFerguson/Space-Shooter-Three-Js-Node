//          ////////////////////////////
//         //// SPACE SHOOTER GAME ////
//        ////    Created By      ////
//       ////   Lucas Ferguson   ////
//      ////////////////////////////


//// ////
let raycaster;
let mouse;

let world = {
    width: 2000,
    height: 2000,
    depth: 2000
}

let shipSprite;
//// ////

/**
 * backgroundPlane for mouse raycaster to hit
 */
let backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(world.width, world.height, 10, 10),
    new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true
    })
);
backgroundPlane.name = "backgroundPlane";
scene.add(backgroundPlane);
backgroundPlane.material.visible = false;
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * skybox for mouse raycaster to hit
 */
let skybox = new THREE.Mesh(
    new THREE.CubeGeometry(world.width, world.height, world.depth),
    [
        new THREE.MeshBasicMaterial({
            map: images.skybox.front,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.back,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.up,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.down,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.right,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.left,
            side: THREE.DoubleSide
        }),
    ]
);
scene.add(skybox);
skybox.name = "skybox";
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * backgroundSphere for mouse raycaster to hit
 */
let backgroundSphere1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(250, 25, 25), // 250, 25, 25
    new THREE.MeshStandardMaterial({
        // flatShading: true,
        color: 0x0000ff
    })
);
backgroundSphere1.castShadow = true; //default is false
backgroundSphere1.receiveShadow = true; //default false
backgroundSphere1.position.z = -500;
backgroundSphere1.name = "backgroundSphere1";
scene.add(backgroundSphere1);
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * backgroundSpher2 for mouse raycaster to hit
 */
let backgroundSphere2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(60, 10, 10),
    new THREE.MeshStandardMaterial({
        // flatShading: true,
        color: 0x0000ff
    })
);
backgroundSphere2.position.x = 0;
backgroundSphere2.position.y = 0;
backgroundSphere2.position.z = -150;
backgroundSphere2.castShadow = true; //default is false
backgroundSphere2.receiveShadow = true; //default false
backgroundSphere2.name = "backgroundSphere2";
scene.add(backgroundSphere2);

////    ////    //// 
///    ////    ////
//    ////    ////

/**
 * ambientLight Disabled **Disabled**
 */
let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
ambientLight.name = "ambientLight";
scene.add(ambientLight); // **Disabled**
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * directionalLight 
 */

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(world.width / 4, 0, world.depth / 2);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;

// these six values define the boundaries of the yellow box
directionalLight.shadow.camera.near = 2;
directionalLight.shadow.camera.far = world.depth;
directionalLight.shadow.camera.left = -1000;
directionalLight.shadow.camera.right = 1000;
directionalLight.shadow.camera.top = 1000;
directionalLight.shadow.camera.bottom = -1000;

// shadow map
directionalLight.shadow.mapSize.set(512 * 3, 512 * 3);

directionalLight.name = "directionalLight";

scene.add(directionalLight);

// only for debugging
scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))

////    ////    ////
///    ////    ////
//    ////    ////

/**
 * geometry 
 */

// geometry
var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(-10, 10, 0),
    new THREE.Vector3(-10, -10, 0),
    new THREE.Vector3(10, -10, 0)
);

geometry.faces.push(new THREE.Face3(0, 1, 2));

// material
var material = new THREE.MeshStandardMaterial({
    color: 0xffffff
})

// line
var line = new THREE.Mesh(geometry, material);
scene.add(line);
line.geometry.verticesNeedUpdate = true;
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * SHAPE
 * One-sided
 */
// geometry
var rectShape = new THREE.Shape();

rectShape.moveTo(0, 0);
rectShape.lineTo(0, 100);
rectShape.lineTo(50, 100);
//
rectShape.lineTo(60, 50);
rectShape.lineTo(20, 10);

//
rectShape.lineTo(50, 0);
rectShape.lineTo(0, 0);

var extrudeSettings = {
    amount: 8,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1
};

var geometry = new THREE.ShapeBufferGeometry(rectShape);

var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
mesh.castShadow = true; //default is false
mesh.receiveShadow = true; //default false
scene.add(mesh);
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


var textmesh;

function setup() {

    /**
     * TextGeometry 
     */

    var textgeo = new THREE.TextGeometry('Hay three.js!', {
        font: font_helvetiker,
        size: 10,
        height: 10
    });

    let textmat = new THREE.MeshPhongMaterial();

    textmesh = new THREE.Mesh(textgeo, textmat);

    textmesh.geometry = new THREE.TextGeometry('Hello NEW World', {
        font: font_helvetiker,
        size: 10,
        height: 0
    });

    scene.add(textmesh);


    ////    ////    ////
    ///    ////    ////
    //    ////    ////
}


let deltaTime;
let then = 0;
let frameCount = 0;
/**
 * @description Master Function for running the game   
 * requestAnimationFrame(gameLoop);  
 * update();  
 * render();  
 */
function gameLoop(now) {

    // setTimeout(function () {

    //     requestAnimationFrame(gameLoop);

    // }, 1000 / 30);

    now *= 0.001; // make it seconds

    deltaTime = now - then;
    then = now;

    requestAnimationFrame(gameLoop);
    frameCount++;

    if (frameCount > 10) {
        update();
        render();
    }

}
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * update
 */
function update() {
    controller.update();

    // console.log("Mouse  x" + controller.mouse.x + "  y" + controller.mouse.y);

    backgroundSphere2.position.x = Math.sin(frameCount / 400) * 400;
    backgroundSphere2.position.z = -500 + Math.cos(frameCount / 400) * 400;

    var left = -1;
    var up = 1;
    var right = 1;
    var down = -1;

    var speed = camera.position.z / 40;

    // if (controller.leftarrow) {
    //     camera.position.x += left * speed;
    // }
    // if (controller.uparrow) {
    //     camera.position.y += up * speed;
    // }
    // if (controller.rightarrow) {
    //     camera.position.x += right * speed;
    // }
    // if (controller.downarrow) {
    //     camera.position.y += down * speed;
    // }

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

    if (controller.keyCodes[17] || controller.keyCodes[81]) {
        camera.position.z += ctrl * speed;
    }

    player.update();

    camera.position.x = player.pos.x;
    camera.position.y = player.pos.y;

    skybox.position.x = camera.position.x;
    skybox.position.y = camera.position.y;
    skybox.position.z = camera.position.z;


    // console.log(scene.children);

}
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * render
 */
function render() {
    renderer.render(scene, camera);
}
////    ////    ////
///    ////    ////
//    ////    ////


function runGame() {
    console.log("runGame");
    setup();
    gameLoop();
}

////////////////////////////////////