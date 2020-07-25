import BaseContainer from '../base'
import { createSubtitleBR, createTitleTL } from '../../components/html-label/factory'
import YoutubePlayer from '../../components/youtube-player'
import { Point } from 'pixi.js'
import { selectSize } from '../../selectors'
import { setView } from '../../actions'
import store from '../../store'
import focusLayer from '../../components/focus-layer'

export default class AnchorContainer extends BaseContainer {
  init (itemsContainer) {
    super.init(itemsContainer)
    this.state = selectSize(store.getState())
    this.size = this.state.toJS()
    this.item = this.getItemById('headAnchor')
    this.globalPos = this.item.toGlobal(new Point(0, 0))
    this.focus = focusLayer
    this.addChild(this.focus)
    this.title = createTitleTL('There\'s a<br />reason we <3<br />octopuses')
    this.subtitle = createSubtitleBR('Clever')
    this.vp = new YoutubePlayer('N6L82iJ_NTI', 480, 360)
    this.onFocusClick = this.onFocusClick.bind(this)
  }

  open () {
    // Anchor Item
    super.open()
    this.item.onOver() // needs to replace with colored image later
    this.focus.open(0, () => {
      this.title.open(0.1)
      this.subtitle.open(0.1)
      this.vp.open(0.5)
      setTimeout(() => this.openComplete(), 1000)
    })

    this.updateGlobalPos()
    this.updateElements()
  }

  close () {
    super.close()
    this.focus.interactive = false
    this.focus.off('pointerdown', this.onFocusClick)
    this.item.onOut() // needs to replace with colored image later
    this.title.close()
    this.subtitle.close()
    this.vp.close()
    this.focus.close()
    setTimeout(() => this.closeComplete(), 1000)
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
      this.updateElements()
    }
  }

  updateGlobalPos () {
    const p = new Point()
    this.item.toGlobal(p, this.globalPos)
    this.focus.focusPosition(this.globalPos.x, this.globalPos.y, 200 * this.oic.scale.x)
  }

  updateElements () {
    this.vp.position(this.globalPos.x - 140, this.globalPos.y + 80)
  }

  onFocusClick () {
    store.dispatch(setView('home'))
  }
}
