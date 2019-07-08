//          ////////////////////////////
//         //// SPACE SHOOTER GAME ////
//        ////    Created By      ////
//       ////   Lucas Ferguson   ////
//      ////////////////////////////

/**
 * This is the renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * This is the scene
 */
const scene = new THREE.Scene();
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * This is the camera
 */
const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10000
);
camera.position.z = 20;
////    ////    ////
///    ////    ////
//    ////    ////


// onWindowResize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    renderer.setSize(windowWidth, windowHeight);
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
}