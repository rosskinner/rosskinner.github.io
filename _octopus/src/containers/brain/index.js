import BaseContainer from '../base'
import { createSubtitleBR, createTitleTL } from '../../components/html-label/factory'
import { Point } from 'pixi.js'
import { selectSize } from '../../selectors'
import { setView } from '../../actions'
import store from '../../store'
import focusLayer from '../../components/focus-layer'
import Image from '../../components/image'
import Heart from './heart'
import teamImage from '../../assets/images/team-2.png'

const HEART_DELAY = 300

export default class BrainContainer extends BaseContainer {
  init (itemsContainer) {
    super.init(itemsContainer)
    this.state = selectSize(store.getState())
    this.size = this.state.toJS()
    this.item = this.getItemById('brain')
    this.globalPos = this.item.toGlobal(new Point(0, 0))
    this.focus = focusLayer
    this.addChild(this.focus)
    this.title = createTitleTL('The brains of<br />this operation')
    this.subtitle = createSubtitleBR('So many<br />feels')
    this.image = new Image(teamImage, 524, 444)
    this.addChild(this.image)
    this.lastHeartTime = Date.now()

    this.onFocusClick = this.onFocusClick.bind(this)
    this.onImageClick = this.onImageClick.bind(this)
    this.onImageMouseMove = this.onImageMouseMove.bind(this)
  }

  open () {
    super.open()
    this.item.onOver() // needs to replace with colored image later
    this.focus.open(0, () => {
      this.subtitle.open()
      this.title.open(0.1)
      this.image.open()
      setTimeout(() => this.openComplete(), 500)
    })

    this.updateGlobalPos()
    this.updateElements()
  }

  openComplete () {
    this.focus.interactive = true
    this.image.interactive = true
    this.image.buttonMode = true
    this.focus.on('pointerdown', this.onFocusClick)
    this.image.on('pointerdown', this.onImageClick)
    this.image.on('mousemove', this.onImageMouseMove)
    super.openComplete()
  }

  close () {
    this.focus.interactive = false
    this.image.interactive = false
    this.image.buttonMode = false
    super.close()
    this.image.close()
    this.item.onOut() // needs to replace with colored image later
    this.subtitle.close()
    this.title.close()
    this.focus.close()
    this.image.off('pointerdown', this.onImageClick)
    this.image.off('mousemove', this.onImageMouseMove)
    this.focus.off('pointerdown', this.onFocusClick)
    setTimeout(() => this.closeComplete(), 1000)
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
    this.focus.focusPosition(this.globalPos.x, this.globalPos.y, 250 * this.oic.scale.x)
  }

  updateElements () {
    const wh = this.size.height
    const safeSpace = 64

    this.image.x = Math.max(
      this.globalPos.x - this.image.width + 30,
      safeSpace
    )
    this.image.y = Math.min(
      this.globalPos.y - 180,
      wh - safeSpace - this.image.height
    )
  }

  onFocusClick () {
    store.dispatch(setView('home'))
  }

  onImageClick () {
    document.location.href = '/about'
  }

  onImageMouseMove (e) {
    if (e.target === null) return
    if (Date.now() > this.lastHeartTime + HEART_DELAY) {
      this.lastHeartTime = Date.now()
      const { x, y } = e.data.global
      const h = new Heart()
      this.addChild(h)
      h.open(x, y, () => this.removeChild(h))
    }
  }
}
