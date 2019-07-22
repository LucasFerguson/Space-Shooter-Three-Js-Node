//          ////////////////////////////
//         //// SPACE SHOOTER GAME ////
//        ////    Created By      ////
//       ////   Lucas Ferguson   ////
//      ////////////////////////////


THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {

    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

THREE.DefaultLoadingManager.onLoad = function () {

    console.log('Loading Complete!');

    runGame();

};


THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {

    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

THREE.DefaultLoadingManager.onError = function (url) {

    console.log('There was an error loading ' + url);

};
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * Create a WebGLRenderer with shadows in the renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
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
camera.position.z = 50;
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * textureLoader
 */
var textureLoader = new THREE.TextureLoader();

var images = {
    skybox: {
        front: textureLoader.load("./assets/images/skybox/front.png"),
        back: textureLoader.load("./assets/images/skybox/back.png"),
        up: textureLoader.load("./assets/images/skybox/up.png"),
        down: textureLoader.load("./assets/images/skybox/down.png"),
        right: textureLoader.load("./assets/images/skybox/right.png"),
        left: textureLoader.load("./assets/images/skybox/left.png")
    }
};
// console.log(images);
// C:\Users\Lucas\Documents\GitHub\Space-Shooter-Three-Js-Node\public\assets\images\skybox\purplenebula_bk.png
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * FontLoader
 */
var fontLoader = new THREE.FontLoader();
// var textgeo = new THREE.TextGeometry('Hello three.js!', {
// font: font,
// size: 10,
// height: 0
// curveSegments: 12,
// bevelEnabled: true,
// bevelThickness: 10,
// bevelSize: 8,
// bevelOffset: 0,
// bevelSegments: 5
// });

// fontLoader.load('./assets/fonts/helvetiker_regular.typeface.json', function (font) {
//     FONT_helvetiker = new THREE.Font(font);
//     console.log(FONT_helvetiker);

//     asdf();

//     var textgeo = new THREE.TextGeometry('Hello three.js!', {
//         font: font,
//         size: 10,
//         height: 0
//     });

//     let textmat = new THREE.MeshPhongMaterial();

//     let textmesh = new THREE.Mesh(textgeo, textmat);

//     scene.add(textmesh);


// });

var font_helvetiker;
var font = fontLoader.load(
    // resource URL
    './assets/fonts/helvetiker_regular.typeface.json',

    // onLoad callback
    function (font) {
        // do something with the font
        // scene.add(font);
        font_helvetiker = font;
        // console.log(font);
    },

    // onProgress callback
    function (xhr) {
        // console.log('fontLoader ' + (xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // onError callback
    function (err) {
        // console.log('An error happened');
    }
);

// console.log(font_helvetiker);
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