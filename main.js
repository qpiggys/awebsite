import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.getElementById("myScene").appendChild( renderer.domElement );

const curve = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( 0.3, -1000.5, 0.3 ),
  new THREE.Vector3( 0.3, 1000.5, -0.3 ),
] );

curve.curveType = "centripetal";
curve.closed = false;



const tubeGeo = new THREE.TubeGeometry(curve, 2000, 5, 64, true);
const wireframeMat = new THREE.MeshStandardMaterial({color: 0x0000ff, emissive:0x550044,wireframe: true, opacity: 1, transparent: false});
const tubeLines = new THREE.Mesh(tubeGeo, wireframeMat);



const tubeMaterial = new THREE.MeshStandardMaterial({color:0x660022, wireframe: false, side: THREE.DoubleSide, transparent: false, opacity: 1});
const pointMat = new THREE.PointsMaterial({color:0x660094, size:0.15});
const tubeWalls = new THREE.Mesh(tubeGeo, tubeMaterial);


const tubeDots = new THREE.Points(tubeGeo, pointMat);

const clock = new THREE.Clock();

// scene.add( tubeDots);


const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  // Create text geometry with the loaded font
  const textGeometry = new TextGeometry('Congrats!', {
    font: font,
    size: 1,           // Size of the text
    height: 0.2,       // Thickness of the text
    curveSegments: 12, // Number of segments for curved areas
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 5
  });

  // Create a material for the text
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // Create a mesh with the geometry and material
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Position the text in the scene
  textMesh.position.set(-2.75, -980, 0);
  textMesh.quaternion.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI / 2);

  // Add the text mesh to the scene
  scene.add(textMesh);
});

loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  // Create text geometry with the loaded font
  const textGeometry = new TextGeometry('You made it!', {
    font: font,
    size: 1,           // Size of the text
    height: 0.2,       // Thickness of the text
    curveSegments: 12, // Number of segments for curved areas
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 5
  });

  // Create a material for the text
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // Create a mesh with the geometry and material
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Position the text in the scene
  textMesh.position.set(-3.8, -1000, 0);
  textMesh.quaternion.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI / 2);

  // Add the text mesh to the scene
  scene.add(textMesh);
});

let textMesh;
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    // Create text geometry with the loaded font
    const textGeometry = new TextGeometry('Matthew Shi', {
        font: font,
        size: 1,           // Size of the text
        height: 0.2,       // Thickness of the text
        curveSegments: 12, // Number of segments for curved areas
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 5
    });

    // Create a material for the text
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000080 });

    // Create a mesh with the geometry and material
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Position the text in the scene
    textMesh.position.set(-3.853, 990, 0.35);
    
    textMesh.quaternion.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI / 2);

    // Add the text mesh to the scene
    scene.add(textMesh);

});


const particles = new THREE.BufferGeometry;

var particleCount = 3000000;

var posArray = new Float32Array(particleCount);

for(let i =0; i<particleCount * 3; i++){
    posArray[i] = (Math.random() - 0.5)*2000;
}

particles.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
const particleMaterial = new THREE.PointsMaterial({ 
    size: 0.12,
    transparent: true,
    color: "white",
}); 
var particlesMesh = new THREE.Points(particles, particleMaterial);
scene.add(particlesMesh);


const particlesFar = new THREE.BufferGeometry;

var particleCountFar = 3000000;

var posArrayFar = new Float32Array(particleCountFar);

for(let i =0; i<particleCountFar * 3; i++){
    posArrayFar[i] = (Math.random() - 0.5)*2000;
}

particlesFar.setAttribute("position", new THREE.BufferAttribute(posArrayFar, 3));
const particleMaterialFar = new THREE.PointsMaterial({ 
    size: 0.12,
    transparent: true,
    color: "white",
}); 
var particlesMeshFar = new THREE.Points(particlesFar, particleMaterialFar);
scene.add(particlesMeshFar);


let tyme = 0;
camera.position.copy(new THREE.Vector3(0,1000,0));
tubeDots.position.x = 0;
tubeDots.position.z = 0;
tubeDots.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0), (Math.PI / 180) * 45 );
tubeWalls.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0), (Math.PI / 180) * 45 );

function render(){

    tyme += 0.01;

    camera.position.y -= 0.01;
    if (textMesh && textMesh.position.y >= -960) {
        textMesh.position.y -= 0.01;
    }

    camera.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), tyme / 10);

    tubeWalls.rotation.y += 0.001;
    tubeDots.rotation.y += 0.001;
    
    renderer.autoClear = false;
    renderer.clear();
    renderer.setPixelRatio(window.devicePixelRatio);

    const  time = clock.getElapsedTime();
    const  looptime = 60;
    const  t = (time % looptime) / looptime;
    const  pos = tubeWalls.geometry.parameters.path.getPointAt(t);

    camera.lookAt(new THREE.Vector3(0, -5000, 0));

    // moveText();
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth , window.innerHeight);
    renderer.render( scene, camera);
    requestAnimationFrame(render);
  }

render();