import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import {
  INIT,
  SET_HOVER_ITEM_ID,
  SET_MODE,
  SET_SIZE,
  SET_VIEW
} from './actions'

// The initial state of the App
const initialState = fromJS({
  loaded: false,
  config: {},
  size: {
    width: 0,
    height: 0
  },
  mode: '',
  view: 'intro',
  hoverItemId: null
})

function init (state, data) {
  const { appVariation, content } = data
  const hasContent = Object.keys(content).length > 0
  if (hasContent) {
    let screenNum = 0
    const a = appVariation.split('-')
    if (a.length === 2 && Number(a[1])) {
      screenNum = Number(a[1]) - 1
    }
    return state
      .set('screenNum', screenNum)
      .set('content', fromJS(data.content))
      .set('view', 'home')
  } else {
    return state
      .set('view', 'init')
  }
}

function mainReducer (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return init(state, action.data)

    case SET_SIZE:
      return state
        .set('size', fromJS(action.size))

    case SET_VIEW:
      return state
        .set('hoverItemId', null)
        .set('view', action.id)

    case SET_MODE:
      return state
        .set('mode', action.mode)

    case SET_HOVER_ITEM_ID:
      return state
        .set('hoverItemId', action.itemId)

    default:
      return state
  }
}

export default function createReducer (injectedReducers) {
  return combineReducers({
    main: mainReducer,
    ...injectedReducers
  })
}
