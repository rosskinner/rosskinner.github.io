import * as THREE from 'three'
// import Stats from 'three/examples/jsm/libs/stats.module.js'

const WIDTH = 900
const HEIGHT = 900
var camera, scene, renderer, object
var planes, planeObjects, planeHelpers
var clock
var reflect, po
var clippedColorFront

var params = {
  animate: true,
  0: {
    constant: 0.4
  },
  1: {
    constant: 0.3
  },
  2: {
    constant: 0.8
  }
}

function createPlaneStencilGroup (geometry, plane, renderOrder) {
  var group = new THREE.Group()
  var baseMat = new THREE.MeshBasicMaterial()
  baseMat.depthWrite = false
  baseMat.depthTest = false
  baseMat.colorWrite = false
  baseMat.stencilWrite = true
  baseMat.stencilFunc = THREE.AlwaysStencilFunc

  // back faces
  var mat0 = baseMat.clone()
  mat0.side = THREE.BackSide
  mat0.clippingPlanes = [ plane ]
  mat0.stencilFail = THREE.IncrementWrapStencilOp
  mat0.stencilZFail = THREE.IncrementWrapStencilOp
  mat0.stencilZPass = THREE.IncrementWrapStencilOp

  var mesh0 = new THREE.Mesh(geometry, mat0)
  mesh0.renderOrder = renderOrder
  group.add(mesh0)

  // front faces
  var mat1 = baseMat.clone()
  mat1.side = THREE.FrontSide
  mat1.clippingPlanes = [ plane ]
  mat1.stencilFail = THREE.DecrementWrapStencilOp
  mat1.stencilZFail = THREE.DecrementWrapStencilOp
  mat1.stencilZPass = THREE.DecrementWrapStencilOp

  var mesh1 = new THREE.Mesh(geometry, mat1)
  mesh1.renderOrder = renderOrder

  group.add(mesh1)

  return group
}

function init () {
  clock = new THREE.Clock()

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(36, WIDTH / HEIGHT, 1, 100)
  camera.position.set(2, 2, 2)

  scene.add(new THREE.AmbientLight(0xffffff, 0.5))

  var dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(5, 10, 7.5)
  dirLight.castShadow = true
  dirLight.shadow.camera.right = 2
  dirLight.shadow.camera.left = -2
  dirLight.shadow.camera.top = 2
  dirLight.shadow.camera.bottom = -2

  dirLight.shadow.mapSize.width = 1024
  dirLight.shadow.mapSize.height = 1024
  scene.add(dirLight)

  planes = [
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
  ]

  planeHelpers = planes.map(p => new THREE.PlaneHelper(p, 2, 0xffffff))
  planeHelpers.forEach(ph => {
    ph.visible = false
    scene.add(ph)
  })

  var geometry = new THREE.TorusKnotBufferGeometry(0.4, 0.15, 220, 60, 1, 1)
  object = new THREE.Group()
  scene.add(object)

  // Set up clip plane rendering
  planeObjects = []
  var planeGeom = new THREE.PlaneBufferGeometry(4, 4)

  var tex = document.getElementsByClassName('texture')[0].src
  reflect = new THREE.CubeTextureLoader().load([tex, tex, tex, tex, tex, tex])
  reflect.wrapS = THREE.RepeatWrapping
  reflect.wrapT = THREE.RepeatWrapping
  reflect.needsUpdate = true

  // scene.background = reflect
  for (var i = 0; i < 3; i++) {
    var poGroup = new THREE.Group()
    var plane = planes[ i ]
    planes[ 0 ].constant = params[0].constant
    planes[ 1 ].constant = params[1].constant
    planes[ 2 ].constant = params[2].constant
    var stencilGroup = createPlaneStencilGroup(geometry, plane, i + 1)

    // plane is clipped by the other clipping planes
    var planeMat = new THREE.MeshStandardMaterial({
      color: 0x19a974,
      metalness: 0.2,
      roughness: 0.75,
      clippingPlanes: planes.filter(p => p !== plane),
      stencilWrite: true,
      stencilRef: 0,
      stencilFunc: THREE.NotEqualStencilFunc,
      stencilFail: THREE.ReplaceStencilOp,
      stencilZFail: THREE.ReplaceStencilOp,
      stencilZPass: THREE.ReplaceStencilOp
    })
    po = new THREE.Mesh(planeGeom, planeMat)
    po.onAfterRender = function (renderer) {
      renderer.clearStencil()
    }
    po.renderOrder = i + 1.1

    object.add(stencilGroup)
    poGroup.add(po)
    planeObjects.push(po)
    scene.add(poGroup)
  }

  var material = new THREE.MeshStandardMaterial({
    envMap: reflect,
    metalness: 1,
    roughness: 0,
    clippingPlanes: planes,
    clipShadows: true,
    shadowSide: THREE.DoubleSide
  })

  // add the color
  clippedColorFront = new THREE.Mesh(geometry, material)
  clippedColorFront.castShadow = true
  clippedColorFront.renderOrder = 6
  object.add(clippedColorFront)

  var ground = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(9, 9, 1, 1),
    new THREE.ShadowMaterial({ color: 0, opacity: 0.25, side: THREE.DoubleSide })
  )

  ground.rotation.x = -Math.PI / 2 // rotates X/Y to X/Z
  ground.position.y = -1
  ground.receiveShadow = true
  scene.add(ground)

  // Stats
  // stats = new Stats()
  // document.body.appendChild(stats.dom)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(WIDTH, HEIGHT)
  renderer.setClearColor(0xFFFFFF)
  window.addEventListener('resize', onWindowResize, false)
  document.getElementById('projects').appendChild(renderer.domElement)
  // document.body.appendChild(renderer.domElement)

  renderer.localClippingEnabled = true
}

function onWindowResize () {
  let width = WIDTH
  if (window.innerWidth < WIDTH) width = window.innerWidth
  renderer.setSize(width, width)
}
function animate () {
  var delta = clock.getDelta()
  requestAnimationFrame(animate)

  object.rotation.x += delta * 0.5
  object.rotation.y += delta * 0.2
  camera.lookAt(object.position)

  for (var i = 0; i < planeObjects.length; i++) {
    var plane = planes[ i ]
    var po = planeObjects[ i ]
    plane.coplanarPoint(po.position)
    po.lookAt(
      po.position.x - plane.normal.x,
      po.position.y - plane.normal.y,
      po.position.z - plane.normal.z
    )
  }

  // stats.begin()
  renderer.render(scene, camera)
  // stats.end()
}

function updateImage (img) {
  if (clippedColorFront.material.envMap.image[0] === img) return
  reflect = new THREE.CubeTextureLoader().load([img, img, img, img, img, img])
  // clippedColorFront.material.envMap.image = [img, img, img, img, img, img]
  clippedColorFront.material.envMap = reflect
  for (var i = 0; i < planeObjects.length; i++) {
    var plane = planeObjects[ i ]
    plane.material.envMap = reflect
  }
}

export {
  init,
  animate,
  updateImage
}
