import * as THREE from 'three'
import { Vector3, Scene } from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import defaultTexture from '../assets/images/test.png'
import {Cloth, ClothFunction} from './cloth'

let startTime = 0
var loaded = false
const CAMERA_HEIGHT = 400
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

function updateTexture (textureIndex) {
  if (object.material.map !== projectTextures[textureIndex]) {
    object.material.map = projectTextures[textureIndex]
    object.customDepthMaterial.map = projectTextures[textureIndex]
  }
}

function init(containerId, textures, select, imagesLoaded) {
  startTime = 0.0001 * Date.now()
  loaded = true
  container = document.getElementById(containerId)
  selectProject = select

  // scene

  scene = new THREE.Scene()
  scene.background = new THREE.Color( 0xffffff )

  // camera

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 )
  camera.position.set( 0, CAMERA_HEIGHT, 50 )
  
  // lights

  scene.add( new THREE.AmbientLight( 0xffffff ) )

  // cloth material
  var loader = new THREE.TextureLoader()
  loader.manager.onLoad = function ()  {
    imagesLoaded()
  }
  for (var t = 0; t < textures.length; t++) {
    const tex = textures[t]
    
    var clothTexture = loader.load( tex )
    clothTexture.anisotropy = 16
    clothTexture.wrapS = THREE.RepeatWrapping
    clothTexture.wrapT = THREE.RepeatWrapping
    clothTexture.repeat.x = - 1
    projectTextures.push(clothTexture)
  }

 
  

  var clothMaterial = new THREE.MeshLambertMaterial({
    map: projectTextures[0],
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

  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth - 32, (window.innerHeight - 100) )

  container.appendChild( renderer.domElement )

  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.shadowMapEnabled = false
  renderer.autoClear = false
  window.addEventListener( 'mousemove', onMove, false )
  window.addEventListener( 'touchmove', onMove, false )
  window.addEventListener( 'click', onClick, false )

}
function onClick () {
  var intersects = raycaster.intersectObjects( scene.children )
  if (intersects.length > 0) selectProject(true)
}
function onMove (event) {
  // console.log(event.clientX)
  let mouse = event
  if (mouse.clientX === undefined) mouse = event.touches[0]
  const x = ( mouse.clientX / window.innerWidth ) * 2 - 1
  const y =  - ( mouse.clientY / window.innerHeight ) * 2 + 1
  const z = 0.5

  mousePos.set(x, y, z)
  raycaster.setFromCamera( mousePos, camera )
  
}
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth - 32, window.innerHeight )
}


function simulate( now ) {
  
  var i, il, particles, particle, constraints, constraint;


  particles = cloth.particles

  if (now - startTime < 1) {
    var windStrength = Math.cos( now / 7000 );

    windForce.set( Math.sin( now / 2000 ), Math.cos( now / 3000 ), Math.sin( now / 100 ) );
    windForce.normalize();
    windForce.multiplyScalar( windStrength );

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

function animate( ) {
  animFrame = requestAnimationFrame( animate )
  const time = 0.0001 * Date.now()
  simulate( time )
  render()
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

  // console.log(cloth.center)

  clothGeometry.attributes.position.needsUpdate = true
  clothGeometry.computeVertexNormals()
  
  camera.position.y = cloth.center.y + CAMERA_HEIGHT
  camera.lookAt(cloth.center)

  var intersects = raycaster.intersectObjects( scene.children )
  

	for ( var i = 0; i < intersects.length; i++ ) {
    
    ballPosition.z = intersects[ i ].point.z
    ballPosition.y = intersects[ i ].point.y + (ballSize-2.5)
    ballPosition.x = intersects[ i ].point.x
  }
  
  renderer.render( scene, camera )
}

function setLoaded(load) {
  loaded = load
}


export {
  init,
  animate,
  updateTexture,
  onWindowResize,
  setLoaded,
  cancelAnimation
}
