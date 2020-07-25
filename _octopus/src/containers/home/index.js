import store from '../../store'
import { setHoverItemId, setView } from '../../actions'
import { selectSize } from '../../selectors'
import BaseContainer from '../base'
import { createSubtitle } from '../../components/html-label/factory'

// [itemId: viewId]
const itemToViewMap = new Map([
  ['headAnchor', 'anchor'],
  ['remote', 'remote'],
  ['headMovieClapper', 'film-clapper'],
  ['brain', 'brain'],
  ['coffee', 'coffee'],
  ['headCap', 'cap'],
  ['bolt', 'bolt']
])

export default class HomeContainer extends BaseContainer {
  constructor () {
    super()
    this.mouseX = 0
    this.mouseY = 0
    this.forceX = 0
    this.forceY = 0
    this.coefX = 1.0
    this.coefY = 1.0
    this.numItems = 0
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.size = selectSize(store.getState()).toJS()
    this.label = createSubtitle('Stroke my<br/>tentacles')
    this.updateLabelPosition()
    this.time = 0
  }

  init (octopusContainer) {
    super.init(octopusContainer)
    this.state = selectSize(store.getState())
    this.interactiveItems = this.list.filter(item => itemToViewMap.has(item.itemId))
  }

  open () {
    super.open()
    setTimeout(() => {
      this.label.open()
      this.updateLabelPosition()
    }, 200)
    setTimeout(() => this.openComplete(), 300)
  }

  openComplete () {
    window.addEventListener('mousemove', this.onMouseMove)
    this.interactiveItems.forEach(item => {
      item.interactive = true
      item.cursor = 'pointer'
      item.on('pointerdown', this.onItemClick)
      item.on('pointerover', this.onItemOver)
      item.on('pointerout', this.onItemOut)
    })

    super.openComplete()
  }

  close () {
    super.close()
    this.label.close()
    this.interactiveItems.forEach(item => {
      item.interactive = false
      item.off('pointerdown', this.onItemClick)
      item.off('pointerover', this.onItemOver)
      item.off('pointerout', this.onItemOut)
    })
    this.interactiveItems.length = 0
    window.removeEventListener('mousemove', this.onMouseMove)
    setTimeout(() => this.closeComplete(), 150)
  }

  update () {
    if (!this.opened) return
    const fx = this.coefX * this.forceX
    const fy = this.coefY * this.forceY
    let item
    let dx
    let dy
    for (let i = 0; i < this.numItems; i++) {
      item = this.list[i]
      dx = (item.z * fx) + item.initX
      dy = (item.z * fy) + item.initY + Math.sin(this.time + item.initX) * 8
      item.x += (dx - item.x) * 0.2
      item.y += (dy - item.y) * 0.2
      item.a += item.aInc
    }

    this.label.position(
      this.label.x + (this.labelx + (fx * 40) - this.label.x) * 0.5,
      this.label.y + (this.labely + (fy * 40) - this.label.y) * 0.5
    )

    this.time += 0.01
  }

  updateLabelPosition () {
    const ww = this.size.width
    const wh = this.size.height
    const spacex = ww * 0.5 - this.label.width() - 300
    const spacey = wh * 0.5 - this.label.height() - 150
    const safeSpace = 32
    this.labelx = Math.max(safeSpace, spacex)
    this.labely = Math.max(safeSpace, spacey)
  }

  onItemClick (e) {
    const itemId = e.currentTarget.itemId
    const viewId = itemToViewMap.get(itemId)
    store.dispatch(setView(viewId))
  }

  onItemOut (e) {
    store.dispatch(setHoverItemId(null))
  }

  onItemOver (e) {
    const itemId = e.currentTarget.itemId
    store.dispatch(setHoverItemId(itemId))
  }

  onMouseMove (e) {
    const w = window.innerWidth
    const h = window.innerHeight
    this.forceX = (e.clientX / w) - 0.5
    this.forceY = (e.clientY / h) - 0.5
    this.mouseX = e.clientX
    this.mouseY = e.clientY
  }

  onChange () {
    const newState = selectSize(store.getState())
    if (newState !== this.state) {
      this.state = newState
      this.size = newState.toJS()
      this.updateLabelPosition()
    }
  }
}
