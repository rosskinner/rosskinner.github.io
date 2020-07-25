import { Container } from 'pixi.js'
import store from '../store'

export default class BaseContainer extends Container {
  constructor () {
    super()
    this.visible = false
    this.opened = false
  }

  getItemById (itemId) {
    return this.itemsMap.get(itemId)
  }

  init (octopusItemsContainer) {
    this.list = octopusItemsContainer.list
    this.itemsMap = octopusItemsContainer.itemsMap
    this.numItems = this.list.length
    this.oic = octopusItemsContainer
  }

  destroy () {
    this.list = null
    this.itemsMap = null
    this.numItems = null
    this.oic = null
    this.unsubscribe()
    this.unsubscribe = null
    super.destroy()
  }

  open () {
    this.opened = true
    this.unsubscribe = store.subscribe(() => this.onChange())
    this.visible = true
  }

  close () {
    this.unsubscribe()
  }

  closeComplete () {
    this.opened = false
    this.visible = false
    this.emit('close-complete')
  }

  openComplete () {
    this.emit('open-complete')
  }

  // please override the following methods if you need to use them =)
  onChange () {}

  update () {}
}
