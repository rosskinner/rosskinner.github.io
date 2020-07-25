import { Graphics } from 'pixi.js'

export function createRect (x, y, width, height, color = 0x000000, alpha = 1) {
  const r = new Graphics()
  r.beginFill(color, alpha)
  r.drawRect(x, y, width, height)
  r.endFill()
  return r
}

export function createCross (size, lineWidth, color = 0x000000, alpha = 1) {
  const halfSize = size * 0.5
  const g = new Graphics()
  g.lineStyle(lineWidth, color, alpha)
  g.moveTo(-halfSize, 0)
  g.lineTo(halfSize, 0)
  g.moveTo(0, -halfSize)
  g.lineTo(0, halfSize)
  return g
}

export default {
  createCross,
  createRect
}
