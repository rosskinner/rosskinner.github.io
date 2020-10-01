import * as THREE from 'three'
import { Vector3, Scene } from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import {Cloth, ClothFunction} from './cloth'
// import Copy from './copy'
const root = document.documentElement

let startTime = 0
var loaded = false
let cameraHeight = 300
var mousePos = new Vector3(0,0,0)

var MASS = 0.1
var xSegs = 10
var ySegs = 10

var raycaster = new THREE.Raycaster()

var clothFunction  = new ClothFunction(xSegs, ySegs )

var cloth = new Cloth( xSegs, ySegs, MASS, clothFunction )

var gravity = new Vector3( 0, -1, -1 ).multiplyScalar( MASS )

var TIMESTEP = 18 / 1000
var TIMESTEP_SQ = TIMESTEP * TIMESTEP

var ballSize = 10
var ballPosition = new Vector3( 0, 0, 0 )

var diff = new Vector3()
var windForce = new THREE.Vector3( 0, 0, 0 )
var tmpForce = new THREE.Vector3()
var selectProject
var animFrame
var fixedCameraRotation 
// var copyCanvas

function satisfyConstraints( p1, p2, distance ) {

  diff.subVectors( p2.position, p1.position );
  var currentDist = diff.length();
  if ( currentDist === 0 ) return; // prevents division by 0
  var correction = diff.multiplyScalar( 1 - distance / currentDist );
  var correctionHalf = correction.multiplyScalar( 0.5 );
  p1.position.add( correctionHalf );
  p2.position.sub( correctionHalf );

}

var container
var camera, scene, renderer
var clothGeometry
var object
var projectTextures = []
var loader
var key = 'default'
// var controls

function updateTexture (textureIndex) {
  // renderer.render( scene, camera )
  // copyCanvas.update(renderer.domElement)
  if (object.material.map !== projectTextures[textureIndex]) {

    object.material.map = projectTextures[textureIndex][key]
    object.customDepthMaterial.map = projectTextures[textureIndex][key]
    // console.log('update', renderer)
  }
}

function createTexture (tex) {
  var clothTexture = loader.load( tex )
  clothTexture.anisotropy = 16
  clothTexture.wrapS = THREE.RepeatWrapping
  clothTexture.wrapT = THREE.RepeatWrapping
  clothTexture.repeat.x = - 1
  // projectTextures.push(clothTexture)
  return clothTexture
}

function init(containerId, textures, select, imagesLoaded) {
  startTime = 0.0001 * Date.now()
  loaded = true
  container = document.getElementById(containerId)
  selectProject = select

  // scene

  scene = new THREE.Scene()
  // scene.background = new THREE.Color( 0xffffff )

  // camera

  camera = new THREE.PerspectiveCamera( 30, (window.innerWidth-32) / window.innerHeight, 1, 1000 )
  camera.position.set( 0, cameraHeight, 50 )
  
  // lights

  scene.add( new THREE.AmbientLight( 0xffffff ) )

  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setClearColor( 0x000000, 0 )

  container.appendChild( renderer.domElement )

  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.shadowMap.enabled = false
  onWindowResize()

  // cloth material
  loader = new THREE.TextureLoader()
  loader.manager.onLoad = function ()  {
    imagesLoaded()
  }
  for (var t = 0; t < textures.length; t++) {
    const tex = textures[t]
    const defaulty = createTexture(tex.default)
    const mobile = createTexture(tex.mobile)
    projectTextures.push({default: defaulty, mobile: mobile})
  }

  var clothMaterial = new THREE.MeshLambertMaterial({
    map: projectTextures[0][key],
    side: THREE.DoubleSide,
    transparent: true, 
    alphaTest: 0.5
  })

  // cloth geometry

  clothGeometry = new THREE.ParametricBufferGeometry( clothFunction, cloth.w, cloth.h )

  // cloth mesh

  object = new THREE.Mesh( clothGeometry, clothMaterial )
  object.position.set( 0, 0, 0 )
  // object.castShadow = true
  scene.add( object )

  object.customDepthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
    map: projectTextures[0],
    alphaTest: 0.5
  })


  window.addEventListener( 'mousemove', onMove, false )
  window.addEventListener( 'touchmove', onMove, false )
  renderer.domElement.addEventListener( 'click', onClick, false )
  window.addEventListener( 'resize', onWindowResize, false )
  render()
  fixedCameraRotation =  THREE.Math.degToRad(180)
  camera.lookAt(cloth.center)
  camera.rotateZ(fixedCameraRotation)
}
function onClick () {
  var intersects = raycaster.intersectObjects( scene.children )
  if (intersects.length > 0) selectProject(true)
}
function onMove (event) {
  
  let mouse = event
  if (mouse.clientX === undefined) mouse = event.touches[0]
  const x = ( mouse.clientX / window.innerWidth ) * 2 - 1
  const y =  - ( mouse.clientY / window.innerHeight ) * 2 + 1
  const z = 0.5

  mousePos.set(x, y, z)
  raycaster.setFromCamera( mousePos, camera )
  var intersects = raycaster.intersectObjects( scene.children )

  for ( var i = 0; i < intersects.length; i++ ) {
    ballPosition.z = intersects[ i ].point.z
    ballPosition.y = intersects[ i ].point.y + (ballSize-2.5)
    ballPosition.x = intersects[ i ].point.x
  }

  root.style.setProperty(
    "--cursor-scale",
      intersects.length > 0 ? 2 : 1
  )
  
}
function onWindowResize() {
  camera.position.set( 0, cameraHeight, 50 )

  camera.aspect = (window.innerWidth) / (window.innerHeight)
  camera.updateProjectionMatrix()

  key = 'default'
  if (window.innerWidth < window.innerHeight) {
    key = 'mobile'
    ballSize = 25
  }

  renderer.setSize( window.innerWidth,  (window.innerHeight) )
}


function simulate( now ) {
  
  var i, il, particles, particle, constraints, constraint;


  particles = cloth.particles
  var windStrength = Math.cos( now / 7000 )
  
  windForce.set( Math.sin( now / Math.random() * 2000 ), Math.cos( now / Math.random() * 3000 ), Math.sin( now / Math.random() * 1000 ) )
  windForce.normalize()
  windForce.multiplyScalar( windStrength )

  var i, j, il, particles, particle, constraints, constraint

// Aerodynamics forces


  var indx
  var normal = new THREE.Vector3()
  var indices = clothGeometry.index
  var normals = clothGeometry.attributes.normal

  for ( i = 0, il = indices.count; i < il; i += 3 ) {
    for ( j = 0; j < 3; j ++ ) {
      indx = indices.getX( i + j )
      normal.fromBufferAttribute( normals, indx )
      tmpForce.copy( normal ).normalize().multiplyScalar( normal.dot( windForce ) )
      particles[ indx ].addForce( tmpForce )
    }
  }

  for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {

    particle = particles[ i ];
    particle.addForce( gravity )

    particle.integrate( TIMESTEP_SQ );

  }

  // Start Constraints

  constraints = cloth.constraints;
  il = constraints.length;

  for ( i = 0; i < il; i ++ ) {
    constraint = constraints[ i ]
    satisfyConstraints( constraint[ 0 ], constraint[ 1 ], constraint[ 2 ] )
  }

  for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {
    particle = particles[ i ]
    var pos = particle.position
    diff.subVectors( pos, ballPosition )
    if ( diff.length() < ballSize ) {
      // collided
      diff.normalize().multiplyScalar( ballSize )
      pos.copy( ballPosition ).add( diff )
    }
  }

  // Floor Constraints

  // for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {
  //   particle = particles[ i ]
  //   var pos = particle.position
  //   if ( pos.y < - 250 ) {
  //     pos.y = - 250
  //   }
  // }
}

function cancelAnimation () {
  cancelAnimationFrame(animFrame)
}

function animate(now) {
  animFrame = requestAnimationFrame( animate )
  // const time = 0.0001 * Date.now()
  simulate(now)
  render()
  camera.updateProjectionMatrix()
}

function render() {
  var p = cloth.particles
  for ( var i = 0, il = p.length; i < il; i ++ ) {
    var v = p[ i ].position
    cloth.center.x += v.x
    cloth.center.y += v.y
    cloth.center.z += v.z
    clothGeometry.attributes.position.setXYZ( i, v.x, v.y, v.z )
  }
  
  cloth.center.x = cloth.center.x/(p.length - 1)
  cloth.center.y = cloth.center.y/(p.length - 1)
  cloth.center.z = cloth.center.z/(p.length - 1)

  clothGeometry.attributes.position.needsUpdate = true
  clothGeometry.computeVertexNormals()
  
  camera.position.y = cloth.center.y + cameraHeight
  camera.position.x = cloth.center.x
  camera.position.z = cloth.center.z

  renderer.render( scene, camera )
}

function setLoaded(load) {
  loaded = load
}

function removeListeners () {
  window.removeEventListener('mousemove', onMove)
  // window.removeEventListener('touchmove', onMove)
  renderer.domElement.removeEventListener('click', onClick)
  window.removeEventListener('resize', onWindowResize )
}

export {
  init,
  animate,
  updateTexture,
  onWindowResize,
  setLoaded,
  cancelAnimation,
  removeListeners
}
