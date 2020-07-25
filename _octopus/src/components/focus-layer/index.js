import { Graphics, Container, Filter, Rectangle } from 'pixi.js'
import { TweenMax, Power2 } from 'gsap'
import focusFrag from './focus.frag'
import { selectSize } from '../../selectors'
import store from '../../store'

class FocusLayer extends Container {
  constructor (color = 0xffffff, alpha = 0.8) {
    super()
    this.state = selectSize(store.getState())
    this.size = this.state.toJS()
    const f = new Filter(null, focusFrag)
    this.pixelRatio = 1
    f.uniforms.resolution = [
      this.size.width * this.pixelRatio,
      this.size.height * this.pixelRatio
    ]
    f.uniforms.time = 0
    f.uniforms.radius = 100
    f.uniforms.focusPosition = [0, 0]
    this.f = f
    this.bg = new Graphics()
    this.addChild(this.bg)
    this.filters = [this.f]
    this.filterArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight)
    this.unsubscribe = store.subscribe(() => this.onChange())
  }

  focusPosition (_x, _y, radius) {
    const x = Math.round(_x)
    const y = Math.round(_y)
    const r = (radius >> 0) || 100
    const pixelRatio = 1
    this.f.uniforms.focusPosition = [ x * pixelRatio, y * pixelRatio ]
    this.filterArea.width = window.innerWidth
    this.filterArea.height = window.innerHeight
    this.f.uniforms.resolution = [window.innerWidth * pixelRatio, window.innerHeight * pixelRatio]
    this.f.uniforms.radius = r
    this.bg.clear()
    this.bg.beginFill(0xffffff, 0.4)
    this.bg.drawRect(0, 0, window.innerWidth, window.innerHeight)
  }

  open (delay = 0, cb = undefined) {
    this.visible = true
    const onComplete = () => {
      this.interactive = true
      if (cb) cb()
    }

    TweenMax.to(this.f.uniforms, 0.7, {
      time: 1,
      delay,
      ease: Power2.easeInOut,
      onComplete
    })
  }

  close () {
    this.interactive = false
    const onComplete = () => {
      this.visible = false
    }
    TweenMax.to(this.f.uniforms, 0.7, {
      time: 0,
      onComplete
    })
  }

  onChange () {
    const newState = selectSize(store.getState())
    if (newState !== this.state) {
      this.state = newState
      this.size = this.state.toJS()
      this.f.uniforms.resolution = [
        this.size.width * this.pixelRatio,
        this.size.height * this.pixelRatio
      ]
    }
  }
}

const focusLayer = new FocusLayer()

export default focusLayer
