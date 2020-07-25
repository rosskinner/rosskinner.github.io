import decomp from 'poly-decomp'
import { Bodies, Body, Engine, Mouse, MouseConstraint, World, Events, Query } from 'matter-js'
import BaseContainer from '../base'
import { createSubtitleBR, createTitleBL } from '../../components/html-label/factory'
import { selectSize } from '../../selectors'
import store from '../../store'
import { createRect } from '../../utils/pixi'
import { setView } from '../../actions'
import { TweenMax, Power2 } from 'gsap'

window.decomp = decomp

export default class RemoteContainer extends BaseContainer {
  init (itemsContainer) {
    super.init(itemsContainer)
    this.state = selectSize(store.getState())
    this.size = this.state.toJS()
    this.subtitle = createSubtitleBR('Weeeeee...')
    this.title = createTitleBL('We have lift off')
    // create engine
    const engine = Engine.create()
    const world = engine.world
    const ww = window.innerWidth
    const wh = window.innerHeight
    const size = 200
    const size2 = size / 2

    this.bodies = []

    const c = [0xff00ff, 0x0000ff, 0xff00cc, 0xcc00ff]
    let scale = itemsContainer.scale.x

    this.list.forEach((item, i) => {
      const k = createRect(
        -(item.width * scale) / 2,
        -(item.height * scale) / 2,
        item.width * scale,
        item.height * scale,
        c[i % c.length],
        0.0
      )

      k.x = itemsContainer.x + item.x * scale
      k.y = itemsContainer.y + item.y * scale

      this.addChild(k)

      // Copy and scale item.hull so it doesn't re-scale every time
      // remote is navigated to.
      let hullScaled = []
      for (let i = 0; i < item.hull.length; i++) {
        hullScaled.push({
          x: item.hull[i].x * scale,
          y: item.hull[i].y * scale
        })
      }

      const b = Bodies.fromVertices(k.x, k.y, hullScaled)
      b.refItem = item
      b.debugItem = k
      this.bodies.push(b)
    })

    const createWall = (x, y, w, h) => {
      const body = Bodies.rectangle(x, y, w, h, { isStatic: true })
      // debug: show wall rectangle
      // const r = createRect(-w / 2, -h / 2, w, h, 0xff0000)
      // r.x = body.position.x
      // r.y = body.position.y
      // this.addChild(r)
      return body
    }

    this.walls = [
      // top
      createWall(ww / 2, -size2, ww + size, size),
      // right
      createWall(ww + size2, wh / 2, size, wh + size),
      // bottom
      createWall(ww / 2, wh + size2, ww + size, size),
      // left
      createWall(-size2, wh / 2, size, wh + size),
      // header left
      createWall(135, 35, 270, 70),
      // header right
      createWall(ww - 290, 35, 580, 70)
    ]

    // add mouse control
    const mouse = Mouse.create(document.getElementsByTagName('canvas')[0])
    this.mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { }
    })

    let initialMouseMove = true
    let lastMousePos = { x: 0, y: 0 }

    Events.on(this.mouseConstraint, 'mousemove', (e) => {
      const activeBodies = Query.point(this.bodies, e.mouse.absolute)

      if (initialMouseMove) {
        lastMousePos.x = e.mouse.absolute.x
        lastMousePos.y = e.mouse.absolute.y
        initialMouseMove = false
      }

      let mouseVelocity = {
        x: 0.3 * scale * (e.mouse.absolute.x - lastMousePos.x),
        y: 0.3 * scale * (e.mouse.absolute.y - lastMousePos.y)
      }

      for (const body of activeBodies) {
        Body.applyForce(body, e.mouse.absolute, mouseVelocity)
      }

      lastMousePos.x = e.mouse.absolute.x
      lastMousePos.y = e.mouse.absolute.y
    })

    engine.timing.timeScale = 0.2 // slow down explosion of octopus
    engine.world.gravity.y = -4.0 // stronger gravity to compensate for slower simulation

    // add walls
    World.add(world, this.walls)
    World.add(world, this.bodies)

    this.mouse = mouse
    this.engine = engine
    this.world = world
    console.log(this.bodies)
    console.log(this.walls)
  }

  open () {
    super.open()
    this.subtitle.open(0.1)
    this.title.open(0.2)
    Engine.run(this.engine)
    setTimeout(() => store.dispatch(setView('home')), 10000)
  }

  close () {
    this.subtitle.close()
    this.title.close()

    if (this.mouseConstraint) {
      Events.off(this.mouseConstraint, 'mousemove')
    }
    Engine.clear(this.engine)
    World.clear(this.world)

    this.bodies.forEach(body => {
      body.refItem = null
    })

    this.bodies.length = 0
    this.bodies = null
    this.engine = null
    this.world = null

    let delay = 0
    this.list.forEach((item, i) => {
      TweenMax.to(item, 0.4, { x: item.initX, y: item.initY, rotation: 0, ease: Power2.easeInOut, delay })
      delay += 0.01
    })
    super.close()

    setTimeout(() => this.closeComplete(), 400 + delay * 1000)
  }

  update () {
    const scale = 1 / this.oic.scale.x
    this.bodies.forEach((body, i) => {
      body.refItem.x = (body.position.x - this.oic.x) * scale
      body.refItem.y = (body.position.y - this.oic.y) * scale
      body.refItem.rotation = body.angle
      // debug only, remove later!
      body.debugItem.x = body.position.x
      body.debugItem.y = body.position.y
      body.debugItem.rotation = body.angle
    })
  }

  onChange () {
    const newState = selectSize(store.getState())
    if (newState !== this.state) {
      this.state = newState
      this.size = this.state.toJS()
    }
  }
}
