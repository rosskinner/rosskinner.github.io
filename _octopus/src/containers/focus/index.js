import { Container, Graphics, filters } from 'pixi.js'
import { circlePoints } from '../../utils/math'
// import { TweenMax, Power2 } from 'gsap/TweenMax'

const SIZE = 1400
const SIZE2 = SIZE * 0.5

export default class FocusContainer extends Container {
  constructor () {
    super()
    this.bg = new Graphics()
    this.bg
      .beginFill(0xf0f0f0, 0.7)
      .drawRect(0, 0, SIZE, SIZE)
      .endFill()
    this.addChild(this.bg)
    this.focus = new Graphics()
    this.focus.position.set(SIZE2, SIZE2)
    this.focus
      .beginFill(0x000000)
      .drawPolygon([-SIZE2, -SIZE2, SIZE, -SIZE2, SIZE, SIZE, -SIZE2, SIZE])
      .drawPolygon(circlePoints(0, 0, 100, 64))
      .addHole()
    // this.focus.drawCircle(0, 0, 100)
    this.addChild(this.focus)

    this.bg.mask = this.focus

    this.interactive = true

    this.onClick = this.onClick.bind(this)
    this.on('click', this.onClick)

    this.nightFilter = new filters.ColorMatrixFilter()
    this.nightFilter.negative()

    this.focus.scale.set(10, 10)

    // TweenMax.to(this.focus.scale, 1, { x: 1, y: 1, ease: Power2.easeInOut, delay: 1 })
  }

  onClick () {
    console.log(this.parent)

    if (this.parent.filters) {
      this.parent.filters = null
    } else {
      this.parent.filters = [this.nightFilter]
    }
  }
}
