import store from '../../store'
import { setMode } from '../../actions'
import { selectMode } from '../../selectors'

let mode
let unsubscribe

const availabeModes = new Map()
availabeModes.set('d', 'debug')
availabeModes.set('n', 'normal')

function onChange () {
  const newMode = selectMode(store.getState())
  if (newMode !== mode) {
    mode = newMode
  }
}

function onKeyUp (e) {
  if (availabeModes.get(e.key)) {
    console.log(`mode found for key: ${e.key}`)
    store.dispatch(setMode(availabeModes.get(e.key)))
  }
}

function open () {
  window.addEventListener('keyup', onKeyUp)
  unsubscribe = store.subscribe(onChange)
  mode = selectMode(store.getState())
}

function close () {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
  window.removeEventListener('keyup', onKeyUp)
}

export default {
  close,
  open
}
