import { Container, Graphics, Sprite, Polygon } from 'pixi.js'
import { loader } from '../../assets-loader'
import { TweenMax, Back } from 'gsap'

export default class OctopusItem extends Container {
  constructor (id = null, initX = 0, initY = 0, z = 1, size = 20) {
    super()
    this.w = size
    this.h = size
    this.itemId = id
    this.h2 = this.w2 = size * 0.5
    this.maxDistance = size

    this.initX = initX
    this.initY = initY
    this.x = initX
    this.y = initY

    if (id && loader.resources[id]) {
      this.normalTexture = loader.resources[id].texture
      if (loader.resources[`${id}Color`]) {
        this.colorTexture = loader.resources[`${id}Color`].texture
      }
      this.g = new Sprite(loader.resources[id].texture)
      this.onTextureUpdate()
    } else {
      this.g = new Graphics()
      this.g.beginFill(0xffffff, 0.5)
      this.g.drawRect(-this.w2, -this.h2, size, size)
    }

    this.addChild(this.g)

    this.z = z
    this.a = Math.random() * Math.PI * 2
    this.aInc = this.z * 0.0001
    this.onOver = this.onOver.bind(this)
    this.onOut = this.onOut.bind(this)
    this.on('mouseout', this.onOut)
    this.on('mouseover', this.onOver)
  }

  createDebugCross () {
    const g = new Graphics()
    g.lineStyle(2, 0x20FBF4)
    g.moveTo(-20, 0)
    g.lineTo(20, 0)
    g.moveTo(0, -20)
    g.lineTo(0, 20)
    this.addChild(g)
    this.cross = g
  }

  debugMode () {
    if (!this.cross) {
      this.createDebugCross()
    }
    this.cross.visible = true
  }

  normalMode () {
    if (this.cross) {
      this.cross.visible = false
    }
  }

  setCustomHitArea (arr) {
    if (arr.length > 2) {
      this.hitArea = new Polygon(arr)

      // Re-format hull from how Pixi likes it to how Matter.js likes it
      this.hull = []
      for (let i = 0; i < arr.length; i += 2) {
        this.hull.push({ x: arr[i], y: arr[i + 1] })
      }

      // debug only
      // const po = new Graphics()
      // this.addChild(po)
      // po.lineStyle(1, 0x25FF06)
      // po.drawPolygon(new Polygon(arr))
    }
  }

  onTextureUpdate () {
    this.g.anchor.set(0.5, 0.5)
    this.w = this.g.width
    this.w2 = this.w * 0.5
    this.h = this.g.height
    this.h2 = this.h * 0.5

    this.initX += this.w2
    this.x += this.w2

    this.initY += this.h2
    this.y += this.h2

    this.maxDistance = Math.min(200, (this.w2 + this.h2) * 0.5)
  }

  // light () {
  //   this.g.tint = 0xffffff
  // }

  // dark () {
  //   this.g.tint = 0x000000
  // }

  color () {
    if (this.colorTexture) {
      this.g.texture = this.colorTexture
    } else {
      this.g.tint = 0xf9abff
    }
  }

  blackAndWhite () {
    if (this.colorTexture) {
      this.g.texture = this.normalTexture
    } else {
      this.g.tint = 0xffffff
    }
  }

  onOver () {
    this.color()
    TweenMax.killTweensOf(this.g)
    TweenMax.to(this.g, 0.3, {
      width: this.w + 40,
      height: this.h + 40,
      ease: Back.easeOut
    })
  }

  onOut () {
    this.blackAndWhite()
    TweenMax.killTweensOf(this.g)
    TweenMax.to(this.g, 0.2, {
      width: this.w,
      height: this.h,
      ease: Back.easeIn
    })
  }
}
