import { TweenMax, Power2 } from 'gsap'

export default class YoutubePlayer {
  constructor (id, width = 560, height = 315, classes = '') {
    this.el = document.createElement('div')
    this.el = document.createElement('iframe')
    this.el.className = `absolute bg-black db ${classes}`
    this.el.style.opacity = 0
    this.el.style.zIndex = 101
    this.el.width = width
    this.el.height = height
    this.el.src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=0&color=white`
    this.el.frameborder = 0
    this.el.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
    this.el.allowfullscreen = true
    this.opened = false
  }

  position (x, y) {
    this.el.style.left = `${x >> 0}px`
    this.el.style.top = `${y >> 0}px`
  }

  open (delay = 0) {
    if (this.opened) return
    this.opened = true
    document.body.appendChild(this.el)
    TweenMax.to(this.el, 0.5, { opacity: 1, delay, ease: Power2.easeInOut })
  }

  close (delay = 0) {
    if (!this.opened) return
    this.opened = false
    TweenMax.to(this.el, 0.5, {
      opacity: 0,
      delay,
      ease: Power2.easeOut,
      onComplete: () => {
        document.body.removeChild(this.el)
      }
    })
  }
}
