
import HtmlLabel from './index'

const TITLE_COLOR = '#151515'
const SUBTITLE_COLOR = '#747474'

function chl (text, classes, color) {
  return new HtmlLabel(text, `${classes} b no-wrap`, color)
}

export function createTitle (text, classes = '') {
  return chl(text, `html-label-title lh-title ${classes}`, TITLE_COLOR)
}

export function createSubtitle (text, classes = '') {
  return chl(text, `html-label-title lh-solid ${classes}`, SUBTITLE_COLOR)
}

export function createTitleTL (text) {
  return createTitle(text, 'html-label-tl')
}

export function createTitleBL (text) {
  return createTitle(text, 'html-label-bl')
}

export function createSubtitleBR (text) {
  return createSubtitle(text, 'html-label-br')
}

export function createSubtitleTR (text) {
  return createSubtitle(text, 'html-label-tr')
}
