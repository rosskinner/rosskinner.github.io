import * as THREE from 'three'

import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'

var camera, scene, renderer, controls;

window.onload = function () {
  init();
  animate();
}

function init() {

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

  controls = new DeviceOrientationControls( camera );

  scene = new THREE.Scene();

  var helperGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 );
  var helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
  var helper = new THREE.Mesh( helperGeometry, helperMaterial );
  scene.add( helper );

  //

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );


}

function animate() {

  window.requestAnimationFrame( animate );

  controls.update();
  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

console.log(window.DeviceOrientationEvent)
let sensorRel
if (window.DeviceOrientationEvent !== undefined) {
  
  sensorRel = new RelativeOrientationSensor()
  console.log(sensorRel)

Promise.all([navigator.permissions.query({ name: "accelerometer" }),
navigator.permissions.query({ name: "gyroscope" })])
.then(results => {
  if (results.every(result => result.state === "granted")) {
  sensorRel.start()
  } else {
    console.log("No permissions to use RelativeOrientationSensor.");
  }
 })
let rotationMatrix = new Float32Array(16)
sensorRel.onreading = () => {
  sensorRel.populateMatrix(rotationMatrix)
  // console.log(rotationMatrix)
  // camera.matrix.fromArray(rotationMatrix)
  console.log(ballPosition.applyMatrix3(rotationMatrix))
  // ballPosition.matrix.fromArray(rotationMatrix)
  // ballPosition.applyMatrix4(sensorRel.quaternion)
  // camera.quaternion.fromArray(sensorRel.quaternion).inverse();
  console.log()
}
// sensorRel.start()
}