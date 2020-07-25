export const select = (state) => state.get('main')

export const selectHoverItemId = (state) => {
  return select(state).get('hoverItemId')
}

export const selectView = (state) => {
  return select(state).get('view')
}

export const selectSize = state => {
  return select(state).get('size')
}

export const selectMode = state => {
  return select(state).get('mode')
}
