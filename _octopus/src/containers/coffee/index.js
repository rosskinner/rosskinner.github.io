import BaseContainer from '../base'
import { createSubtitleBR, createTitleTL } from '../../components/html-label/factory'
import { selectSize } from '../../selectors'
import { setView } from '../../actions'
import store from '../../store'
import { rangeInt } from '../../utils/math'
import { TweenMax, Power2 } from 'gsap'

export default class CoffeeContainer extends BaseContainer {
  init (itemsContainer) {
    super.init(itemsContainer)
    this.state = selectSize(store.getState())
    this.size = this.state.toJS()
    this.item = this.getItemById('coffee')
    this.subtitle = createSubtitleBR('Oh boy')
    this.title = createTitleTL('Hook it to<br />our veins!')

    const ww = itemsContainer.width * 0.5
    const wh = itemsContainer.height * 0.5

    this.shakeItems = this.list.map(item => {
      return {
        item,
        cx: item.x,
        cy: item.y,
        ax: Math.random() * 2 * Math.PI,
        ix: rangeInt(10, 30) / 10,
        ay: Math.random() * 2 * Math.PI,
        iy: rangeInt(10, 30) / 10,
        rx: rangeInt(2, 6),
        ry: rangeInt(1, 10),
        diffsx: Math.round((item.initX - ww) * 0.01),
        diffsy: Math.round((item.initY - wh) * 0.01)
      }
    })

    this.coef = 0
  }

  open () {
    super.open()
    this.subtitle.open(0.1)
    this.title.open(0.2)
    setTimeout(() => this.openComplete(), 500)

    TweenMax.to(this, 1, {
      coef: 2,
      ease: Power2.easeInOut,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        store.dispatch(setView('home'))
      }
    })
  }

  close () {
    super.close()
    this.item.onOut() // needs to replace with colored image later
    this.title.close()
    this.subtitle.close()
    this.shakeItems = null
    setTimeout(() => this.closeComplete(), 400)
  }

  onChange () {
    const newState = selectSize(store.getState())
    if (newState !== this.state) {
      this.state = newState
      this.size = this.state.toJS()
    }
  }

  update () {
    this.shakeItems.forEach(it => {
      it.item.x = Math.cos(it.ax) * it.rx * this.coef + it.cx + this.coef * it.diffsx
      it.ax += it.ix
      it.item.y = Math.sin(it.ax) * it.ry * this.coef + it.cy + this.coef * it.diffsy
      it.ay += it.iy
    })
  }

  updateLabelPosition () {
    const ww = this.size.width
    const wh = this.size.height
    const space = ww * 0.1
    const safeSpace = 64

    this.subtitle.position(
      Math.max(safeSpace, space),
      Math.max(safeSpace, space)
    )

    this.title.position(
      Math.min(ww - this.title.width() - safeSpace, ww - this.title.width() - space),
      Math.max(wh - this.title.height() - safeSpace, wh - this.title.height() - space)
    )
  }
}
