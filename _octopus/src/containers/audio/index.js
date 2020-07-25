import store from '../../store'
import { selectView, selectHoverItemId } from '../../selectors'
import { Howl, Howler } from 'howler'
import audios from '../../assets/audios'

let view
let hoverItemId
let unsubscribe

const audiosMap = new Map()
// audios for views
audiosMap.set('anchor', new Howl({ src: [audios.anchorClick] }))
audiosMap.set('brain', new Howl({ src: [audios.brainClick] }))
audiosMap.set('cap', new Howl({ src: [audios.capClick] }))
audiosMap.set('coffee', new Howl({ src: [audios.coffeeClick] }))
audiosMap.set('film-clapper', new Howl({ src: [audios.filmClapperClick] }))
audiosMap.set('remote', new Howl({ src: [audios.remoteClick], volume: 0.3 }))
audiosMap.set('bolt', new Howl({ src: [audios.lightSwitchClick], volume: 0.3 }))

// extra sounds
audiosMap.set('coffee-open', new Howl({ src: [audios.coffeeOpen] }))
audiosMap.set('remote-open', new Howl({ src: [audios.remoteOpen] }))
audiosMap.set('hover', new Howl({ src: [audios.bubblePopping] }))

function onChange () {
  const state = store.getState()
  const newView = selectView(state)
  const newHoverItemId = selectHoverItemId(state)

  if (newView !== view) {
    // on view close
    if (view === 'bolt') {
      audiosMap.get('bolt').play()
    }

    view = newView

    if (audiosMap.has(view)) {
      audiosMap.get(view).play()
    }

    if (view === 'coffee') {
      audiosMap.get('coffee-open').play()
    } else if (view === 'remote') {
      audiosMap.get('remote-open').play()
    }
  }

  // Play hover Sounds
  if (newHoverItemId !== hoverItemId && newHoverItemId !== null) {
    audiosMap.get('hover').play()
  }
}

function open () {
  unsubscribe = store.subscribe(onChange)
  view = selectView(store.getState())
  view = selectHoverItemId(store.getState())
  Howler.volume(0.5)
}

function close () {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
}

export default {
  close,
  open
}
