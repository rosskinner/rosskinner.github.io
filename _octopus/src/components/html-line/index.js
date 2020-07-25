import { TweenMax, Power2 } from 'gsap'
import { getDistance, getAngle } from '../../utils/math'

export default class HtmlLine {
  constructor (color = '#000000', thickness = 2, classes = '') {
    this.el = document.createElement('div')
    this.el.className = `absolute pe-none ${classes}`
    this.el.style.zIndex = 90
    this.el.style.opacity = 0
    this.el.style.backgroundColor = color
    this.el.style.height = `${thickness}px`
    this.el.style.transformOrigin = '0 0 0'
    this.opened = false
    this._width = 0
    document.body.appendChild(this.el)
    this.position = this.position.bind(this)
  }

  position (x1, y1, x2, y2) {
    this.el.style.left = `${x1 >> 0}px`
    this.el.style.top = `${y1 >> 0}px`
    this._width = getDistance(x1, y1, x2, y2) >> 0
    const angle = getAngle(x1, y1, x2, y2)
    this.el.style.transform = `rotate(${angle}rad)`

    if (this.opened) {
      this.el.style.width = `${this._width}px`
    }
  }

  open (delay = 0) {
    this.opened = true
    TweenMax.to(this.el, 0.3, {
      opacity: 1,
      width: this._width,
      delay,
      ease: Power2.easeInOut })
  }

  close (delay = 0) {
    TweenMax.to(this.el, 0.3, {
      opacity: 0,
      width: 0,
      delay,
      ease: Power2.easeOut,
      onComplete: () => {
        this.opened = false
        document.body.removeChild(this.el)
      }
    })
  }
}
