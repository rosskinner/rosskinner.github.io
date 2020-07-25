import { Filter } from 'pixi.js'
import { TweenMax, Power2 } from 'gsap/TweenMaxBase'
import store from '../../store'
import { setView } from '../../actions'
import introFrag from './intro-octopus.frag'
import BaseContainer from '../base'

export default class IntroContainer extends BaseContainer {
  init (octopusItemsContainer) {
    super.init(octopusItemsContainer)
    const f = new Filter(null, introFrag)
    f.uniforms.resolution = [window.innerWidth, window.innerHeight]
    f.uniforms.time = 0
    this.f = f
    this.oic.filters = [f]
    this.firstTime = true
  }

  open () {
    super.open()
    TweenMax.to(this.f.uniforms, 3, {
      time: 1.26,
      delay: 0.5,
      ease: Power2.easeInOut,
      onComplete: () => {
        // remove filter animation
        this.oic.filters = []
        this.openComplete()
        store.dispatch(setView('home'))
      }
    })
  }

  close () {
    super.close()
    this.oic.filters = []
    setTimeout(() => this.closeComplete(), 20)
  }
}
