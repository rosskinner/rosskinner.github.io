import BaseContainer from '../base'
import { createSubtitleBR, createTitleTL } from '../../components/html-label/factory'
import { Point } from 'pixi.js'
import { selectSize } from '../../selectors'
import { setView } from '../../actions'
import store from '../../store'
import focusLayer from '../../components/focus-layer'

export default class CapContainer extends BaseContainer {
  init (itemsContainer) {
    super.init(itemsContainer)
    this.state = selectSize(store.getState())
    this.size = this.state.toJS()
    this.item = this.getItemById('headCap')
    this.globalPos = this.item.toGlobal(new Point(0, 0))
    this.focus = focusLayer
    this.addChild(this.focus)
    this.title = createTitleTL('We got merch')
    this.subtitle = createSubtitleBR('Hat game strong')
    this.onFocusClick = this.onFocusClick.bind(this)
  }

  open () {
    // Anchor Item
    super.open()
    this.item.onOver() // needs to replace with colored image later
    this.focus.open(0, () => {
      this.title.open()
      this.subtitle.open(0.1)
      setTimeout(() => this.openComplete(), 500)
    })

    this.updateGlobalPos()
  }

  close () {
    super.close()
    this.item.onOut() // needs to replace with colored image later
    this.title.close()
    this.subtitle.close()
    this.focus.close()
    this.focus.off('pointerdown', this.onFocusClick)
    setTimeout(() => {
      this.removeChild(this.focus)
      this.closeComplete()
    }, 1000)
  }

  openComplete () {
    this.focus.interactive = true
    this.focus.on('pointerdown', this.onFocusClick)
    super.openComplete()
  }

  onChange () {
    const newState = selectSize(store.getState())
    if (newState !== this.state) {
      this.state = newState
      this.size = this.state.toJS()
      this.updateGlobalPos()
    }
  }

  updateGlobalPos () {
    const p = new Point()
    this.item.toGlobal(p, this.globalPos)
    this.focus.focusPosition(this.globalPos.x, this.globalPos.y, 250 * this.oic.scale.x)
  }

  onFocusClick () {
    store.dispatch(setView('home'))
  }
}
