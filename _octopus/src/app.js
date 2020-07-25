import { Application } from 'pixi.js'
import OctopusItemsContainer from './containers/octopus-items/'
import store from './store'
import { loader } from './assets-loader'
import { selectView } from './selectors'
import { setView, setSize } from './actions'
import AnchorContainer from './containers/anchor'
import HomeContainer from './containers/home'
import IntroContainer from './containers/intro'
import RemoteContainer from './containers/remote'
import CoffeeContainer from './containers/coffee'
import CapContainer from './containers/cap'
import FilmClapperContainer from './containers/film-clapper'
import BrainContainer from './containers/brain'
import BoltContainer from './containers/bolt'
import keyboardContainer from './containers/keyboard'
import audioContainer from './containers/audio'
import debounce from 'debounce'

export default class App {
  constructor () {
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      // resolution: window.devicePixelRatio || 1,
      resolution: 1,
      antialias: true,
      backgroundColor: 0xf3f3f3
    })
    this.start = this.start.bind(this)
    this.update = this.update.bind(this)
    this.onResize = this.onResize.bind(this)

    // ALL eastereggs classes need to be in a lazy load scenario at somepoint.
    this.viewsMap = new Map()
    this.viewsMap.set('anchor', AnchorContainer)
    this.viewsMap.set('home', HomeContainer)
    this.viewsMap.set('intro', IntroContainer)
    this.viewsMap.set('remote', RemoteContainer)
    this.viewsMap.set('film-clapper', FilmClapperContainer)
    this.viewsMap.set('brain', BrainContainer)
    this.viewsMap.set('coffee', CoffeeContainer)
    this.viewsMap.set('cap', CapContainer)
    this.viewsMap.set('bolt', BoltContainer)

    const c = document.getElementsByClassName('octopus-app')[0]
    c.appendChild(this.app.view)
    this.onResize = debounce(this.onResize, 1000 / 60)
    // this.onResize = thi
    window.addEventListener('resize', this.onResize)
  }

  changeView (viewId) {
    const oldView = this.view

    if (this.viewsMap.get(viewId)) {
      const ContainerClass = this.viewsMap.get(viewId)
      this.view = new ContainerClass()
    } else {
      console.log(`View not found for location: ${viewId}`)
      return
    }

    this.view.init(this.octopusItemsContainer)

    if (oldView) {
      oldView.once('close-complete', () => {
        this.app.stage.removeChild(oldView)
        oldView.destroy()

        this.app.stage.addChild(this.view)
        this.view.open()
      })
      oldView.close()
    } else {
      this.app.stage.addChild(this.view)
      this.view.open()
    }
  }

  onChange () {
    const newState = selectView(store.getState())
    if (newState !== this.state) this.changeView(newState)
    this.state = newState
  }

  load (cb) {
    loader.load(() => {
      cb()
      this.start()
      store.dispatch(setView('intro'))
    })
  }

  start () {
    this.unsubscribe = store.subscribe(() => this.onChange())
    keyboardContainer.open()
    audioContainer.open()
    this.createViews()
    this.app.ticker.add(this.update)
    this.app.start()
  }

  createViews () {
    this.octopusItemsContainer = new OctopusItemsContainer()
    this.app.stage.addChild(this.octopusItemsContainer)
    this.onResize()
  }

  update () {
    if (this.view) this.view.update()
  }

  onResize () {
    const w = Math.max(960, window.innerWidth)
    const h = Math.max(720, window.innerHeight)
    this.app.view.width = `${w}px`
    this.app.view.height = `${h}px`
    this.app.view.style.width = `${w}px`
    this.app.view.style.height = `${h}px`
    this.app.renderer.resize(w, h)

    const oct = this.octopusItemsContainer
    let s = Math.min(Math.min(w, h) / oct.width + 0.2, 1)
    oct.scale.set(s, s)
    // s = 1
    oct.x = (w - oct.width * s) >> 1
    oct.y = (h - oct.height * s) >> 1

    store.dispatch(setSize(w, h))
  }
}
