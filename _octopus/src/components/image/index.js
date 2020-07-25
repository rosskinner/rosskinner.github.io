import { Sprite, Container, Filter, Rectangle } from 'pixi.js'
import { TweenMax, Power2 } from 'gsap'
import imageFrag from './image.frag'

export default class Image extends Container {
  constructor (url, width, height) {
    super()
    const f = new Filter(null, imageFrag)
    const pixelRatio = 1
    f.uniforms.resolution = [window.innerWidth * pixelRatio, window.innerHeight * pixelRatio]
    f.uniforms.time = 0
    this.f = f
    this.filterArea = new Rectangle(0, 0, width, height)
    this.image = Sprite.fromImage(url)

    if (this.image.texture.baseTexture.hasLoaded) {
      // image already cached in pixi's default loader
      this.image.width = width
      this.image.height = height
    } else {
      this.image.texture.on('update', () => {
        // wait until the texture is up to date to force width and height
        // otherwise it will use the default image width and height
        this.image.width = width
        this.image.height = height
      })
    }

    this.image.filters = [this.f]
    this.addChild(this.image)

    this._width = width
    this._height = height
  }

  get width () {
    return this._width
  }

  get height () {
    return this._height
  }

  open (delay = 0, cb = undefined) {
    this.visible = true
    const onComplete = () => {
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
    const onComplete = () => {
      this.visible = false
      this.filters = []
    }
    TweenMax.to(this.f.uniforms, 0.7, {
      time: 0,
      onComplete,
      ease: Power2.easeOut
    })
  }
}
