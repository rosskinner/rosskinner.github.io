export const INIT = 'app/INIT'
export const SET_HOVER_ITEM_ID = 'app/SET_HOVER_ITEM_ID'
export const SET_SIZE = 'app/SET_SIZE'
export const SET_MODE = 'app/SET_MODE'
export const SET_VIEW = 'app/SET_VIEW'

export function init (data) {
  return { type: INIT, data }
}

export function setHoverItemId (itemId) {
  return { type: SET_HOVER_ITEM_ID, itemId }
}

export function setMode (mode) {
  return { type: SET_MODE, mode }
}

export function setSize (width, height) {
  return { type: SET_SIZE, size: { width, height } }
}

export function setView (id) {
  return { type: SET_VIEW, id }
}
