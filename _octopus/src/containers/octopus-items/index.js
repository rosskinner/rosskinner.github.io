import { Container, Graphics } from 'pixi.js'
import { TweenMax, Power2 } from 'gsap/TweenMax'
import { getAngle } from '../../utils/math'
import Item from '../../components/octopus-item/'
import store from '../../store'
import { selectMode } from '../../selectors'
import hulls from './hulls.js'

const width = 1440
const height = 1440
const width2 = width * 0.5
const height2 = height * 0.5

export default class OctopusItems extends Container {
  constructor () {
    super()
    this.state = selectMode(store.getState())
    this.list = []
    this.itemsMap = new Map()
    this.numItems = 0
    this.createImages()

    store.subscribe(() => this.onChange())
  }

  get width () { return width }
  get height () { return height }

  createDebugGuides () {
    // debug
    const g = new Graphics()
    g.lineStyle(1, 0x333333, 1)
    g.moveTo(width2, -height2)
    g.lineTo(width2, height * 1.5)
    g.moveTo(-width2, height2)
    g.lineTo(width * 1.5, height2)
    g.lineStyle(1, 0xff00ff, 1)
    g.drawRect(0, 0, width, height)
    this.addChild(g)
    g.visible = false
    this.debugGuides = g
  }

  createImages () {
    this.addImageItem('base', 232, 332, 20, hulls.base)
    this.addImageItem('hair', 440, 592, 20, hulls.hair)

    // legs
    this.addImageItem('blobLegBase', 662, 680, 30, hulls.blobLegBase)
    this.addImageItem('blobLegExtra', 860, 670, 30, hulls.blobLegExtra)
    this.addImageItem('geometricLeg', 818, 896, 30, hulls.geometricLeg)
    this.addImageItem('legDigital', 462, 786, 30, hulls.legDigital)
    this.addImageItem('legInk', 558, 824, 30, hulls.legInk)

    this.addImageItem('legTwist', 864, 660, 30, hulls.legTwist)
    this.addImageItem('legsLeft', 282, 654, 30, hulls.legsLeft)

    this.addImageItem('brainLegBrush', 1036, 732, 80, hulls.brainLegBrush)

    this.addImageItem('shipWheel', 522, 656, 200, hulls.shipWheel)
    this.addImageItem('brain', 940, 660, 220, [-18, -50, 23, -50, 52, -35, 69, 4, 59, 40, 18, 57, -60, 39, -77, 15, -70, -7, -51, -32])

    this.addImageItem('blob1', 712, 890, 150, hulls.blob1)
    this.addImageItem('blob2', 690, 1000, 110, hulls.blob2)
    this.addImageItem('blob3', 974, 874, 120, hulls.blob3)

    this.addImageItem('remote', 870, 732, 100, [-20, -66, 17, -46, 66, 39, 29, 74, 12, 74, -44, 7, -54, -36])

    this.addImageItem('beer', 638, 762, 80, hulls.beer)

    this.addImageItem('telescope', 712, 728, 110, hulls.telescope)
    this.addImageItem('bolt', 738, 710, 100, hulls.bolt)
    this.addImageItem('fountainPen', 700, 900, 80, hulls.fountainPen)

    this.addImageItem('coffee', 220, 820, 290, hulls.coffee)
    this.addImageItem('flowerPot', 420, 660, 220, hulls.flowerPot)

    // Head
    this.addImageItem('headCurveLeft', 510, 330, 40, hulls.headCurveLeft)
    this.addImageItem('headBrush', 510, 300, 80, hulls.headBrush)
    this.addImageItem('headCurveRight', 635, 325, 120, hulls.headCurveRight)
    this.addImageItem('headCap', 635, 284, 120, [29, -37, 69, -29, 82, 19, 64, 39, 12, 47, -52, 43, -68, 12, -41, -21])

    this.addImageItem('headBalls', 580, 502, 80, hulls.headBalls)
    this.addImageItem('headMovieClapper', 550, 318, 120, [8, -70, 18, -67, 40, -30, 60, 37, -12, 77, -22, 74, -41, 17, -52, -3])
    this.addImageItem('headSquiggle', 475, 325, 160, hulls.headSquiggle)

    this.addImageItem('headAnchor', 520, 420, 200, [-68, -4, 5, -75, 76, -112, 86, -101, 88, -84, 52, 68, 28, 100, -54, 115, -88, 104, -84, 26])
    this.addImageItem('headRocket', 780, 410, 200, hulls.headRocket)

    // need to add the spheres with new colors later
    // this.addImageItem('sphere1', 1154, 822, 120, hulls.sphere1)
    // this.addImageItem('sphere2', 1100, 830, 80, hulls.sphere2)
    // this.addImageItem('sphere3', 700, 998, 70, hulls.sphere3)
    // this.addImageItem('sphere4', 472, 1076, 100, hulls.sphere4)
  }

  addImageItem (id, x, y, z, customHitArea) {
    const item = new Item(id, x, y, z)
    // item.itemId = id
    if (customHitArea) item.setCustomHitArea(customHitArea)
    this.addChild(item)
    this.list.push(item)
    this.itemsMap.set(id, item)
    this.numItems = this.list.length
  }

  moveItemsAway () {
    const items = [
      'blobLegExtra',
      'brainLegBrush',
      'shipWheel',
      'brain',
      'blob1',
      'blob2',
      'blob3',
      'remote',
      'beer',
      'telescope',
      'bolt',
      'fountainPen',
      'coffee',
      'flowerPot',
      'headCurveLeft',
      'headBrush',
      'headCap',
      'headCurveRight',
      'headBalls',
      'headMovieClapper',
      'headSquiggle',
      'headAnchor',
      'headRocket',
      'sphere1',
      'sphere2',
      'sphere3',
      'sphere4'
    ].map(id => this.itemsMap.get(id))

    items.forEach(item => {
      const a = getAngle(width2, height2, item.initX, item.initY)
      const x = Math.cos(a) * 700 + width2
      const y = Math.sin(a) * 700 + height2
      TweenMax.to(item, 0.4, { x, y, ease: Power2.easeInOut })
    })
  }

  debugMode () {
    if (!this.debugGuides) this.createDebugGuides()
    this.debugGuides.visible = true
    this.list.forEach(item => item.debugMode())
  }

  normalMode () {
    if (this.debugGuides) this.debugGuides.visible = false
    this.list.forEach(item => item.normalMode())
  }

  onChange () {
    const newState = selectMode(store.getState())

    if (newState !== this.state) {
      this.state = newState
      if (this.state === 'debug') {
        this.debugMode()
      } else if (this.state === 'normal') {
        this.normalMode()
      }
    }
  }
}
