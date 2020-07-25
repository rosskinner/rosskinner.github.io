import { TweenMax, Power2 } from 'gsap'
import './index.css'

export default class HtmlLabel {
  constructor (text, classes = '', color = '#000000') {
    this.el = document.createElement('span')
    this.el.className = `absolute pe-none ${classes}`
    this.el.style.transform = 'translate3d(0, 0, 1px)'
    this.el.style.zIndex = 100
    this.el.style.opacity = 0
    this.el.style.color = color
    this.el.innerHTML = text
    this._x = 0
    this._y = 0
    document.body.appendChild(this.el)
  }

  width () {
    return this.el.offsetWidth
  }

  height () {
    return this.el.offsetHeight
  }

  position (x, y) {
    this.x = x
    this.y = y
  }

  set x (value) {
    this._x = value
    this.el.style.left = `${this._x}px`
  }

  get x () { return this._x }

  set y (value) {
    this._y = value
    this.el.style.top = `${this._y}px`
  }

  get y () { return this._y }

  open (delay = 0) {
    TweenMax.to(this.el, 0.3, { opacity: 1, delay, ease: Power2.easeInOut })
  }

  close (delay = 0) {
    TweenMax.to(this.el, 0.3, {
      opacity: 0,
      ease: Power2.easeOut,
      delay,
      onComplete: () => {
        document.body.removeChild(this.el)
      }
    })
  }
}
