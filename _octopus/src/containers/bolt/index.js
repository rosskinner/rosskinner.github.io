import BaseContainer from '../base'
import { createSubtitleBR, createTitleTL } from '../../components/html-label/factory'
import { selectSize } from '../../selectors'
import { setView } from '../../actions'
import store from '../../store'

export default class BoltContainer extends BaseContainer {
  init (itemsContainer) {
    super.init(itemsContainer)
    this.state = selectSize(store.getState())
    this.size = this.state.toJS()
    this.item = this.getItemById('bolt')
    this.subtitle = createSubtitleBR('Shimmy!')
    this.title = createTitleTL(`Life's better<br />with a bit of<br />colour`)
  }

  open () {
    super.open()
    this.subtitle.open(0.1)
    this.title.open(0.2)
    let time = 100
    this.list.forEach(item => {
      setTimeout(() => item.color(), time)
      time += 10
    })
    setTimeout(() => this.openComplete(), time)
    setTimeout(() => store.dispatch(setView('home')), 3000 + time)
  }

  close () {
    super.close()
    this.item.onOut() // needs to replace with colored image later
    this.title.close()
    this.subtitle.close()
    this.shakeItems = null
    let time = 20
    this.list.forEach(item => {
      setTimeout(() => {
        item.blackAndWhite()
      }, time)
      time += 10
    })
    setTimeout(() => this.closeComplete(), time)
  }
}
