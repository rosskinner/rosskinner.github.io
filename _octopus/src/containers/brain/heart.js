import { Sprite, Container } from 'pixi.js'
import { TweenMax, Power2 } from 'gsap'
import images from '../../assets/images'
import { rangeInt } from '../../utils/math'

const RAINBOW = [0xa800ff, 0x0079ff, 0x00f11d, 0xffef00, 0xff7f00, 0xff0900]
let currentColor = 0

export default class Heart extends Container {
  constructor () {
    super()
    this.image = Sprite.fromImage(images.heartWhite)
    this.addChild(this.image)
  }

  open (x, y, cb = undefined) {
    this.image.tint = RAINBOW[currentColor]
    currentColor++
    currentColor %= RAINBOW.length
    const onComplete = () => {
      this.visible = false
      if (cb) cb()
    }
    this.visible = true

    this.x = x
    this.y = y
    this.image.anchor.set(0.5, 0.5)
    this.image.scale.set(0.1, 0.1)
    this.alpha = 0

    TweenMax.to(this.image.scale, 1, {
      x: 1,
      y: 1,
      ease: Power2.easeOut
    })
    const dy = y - rangeInt(50, 100)
    TweenMax.to(this, 3, {
      bezier: {
        values: [
          { x: rangeInt(x - 50, x + 50), y: dy },
          { x: rangeInt(x - 75, x + 75), y: dy - 30 },
          { x: rangeInt(x - 50, x + 50), y: dy - 50 }
        ]
      },
      ease: Power2.easeOut
    })

    TweenMax.to(this, 1, {
      alpha: 1,
      yoyo: true,
      repeat: 1,
      ease: Power2.easeOut,
      onComplete
    })
  }
}
