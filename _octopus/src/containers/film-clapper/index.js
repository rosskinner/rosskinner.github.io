import BaseContainer from '../base'
import { createTitleTL, createSubtitleBR } from '../../components/html-label/factory'
import YoutubePlayer from '../../components/youtube-player'
import { Point } from 'pixi.js'
import { selectSize } from '../../selectors'
import { setView } from '../../actions'
import store from '../../store'
import focusLayer from '../../components/focus-layer'

export default class FilmClapperContainer extends BaseContainer {
  init (itemsContainer) {
    super.init(itemsContainer)
    this.state = selectSize(store.getState())
    this.size = this.state.toJS()
    this.item = this.getItemById('headMovieClapper')
    this.globalPos = this.item.toGlobal(new Point(0, 0))
    this.focus = focusLayer
    this.addChild(this.focus)
    this.title = createTitleTL('Cheers to<br />a great year!')
    this.subtitle = createSubtitleBR('Reel Love')
    this.vp = new YoutubePlayer('wR47x-FJiqI')
    this.onFocusClick = this.onFocusClick.bind(this)
  }

  open () {
    super.open()
    this.item.onOver() // needs to replace with colored image later
    this.focus.open(0, () => {
      this.title.open()
      this.subtitle.open(0.1)
      this.vp.open(0.2)
      setTimeout(() => this.openComplete(), 500)
    })

    this.updateGlobalPos()
    this.updateElements()
  }

  close () {
    super.close()
    this.item.onOut() // needs to replace with colored image later
    this.title.close()
    this.subtitle.close()
    this.vp.close()
    this.focus.off('pointerdown', this.onFocusClick)
    this.focus.close()
    setTimeout(() => this.closeComplete(), 1000)
  }

  openComplete () {
    this.focus.interactive = true
    this.focus.on('pointerdown', this.onFocusClick)
    super.openComplete()
  }

  updateGlobalPos () {
    const p = new Point()
    this.item.toGlobal(p, this.globalPos)
    this.focus.focusPosition(this.globalPos.x, this.globalPos.y, 250 * this.oic.scale.x)
  }

  updateElements () {
    const safeSpace = 64
    this.vp.position(Math.max(this.globalPos.x - 120, safeSpace), this.globalPos.y + 100)
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

  onFocusClick () {
    store.dispatch(setView('home'))
  }
}
