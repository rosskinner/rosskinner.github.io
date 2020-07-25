const hull = [-52.5, -61, -63.5, -51, -70.5, -35]

const canvasElem = document.createElement('canvas')

canvasElem.width = 1000
canvasElem.height = 1000

document.body.appendChild(canvasElem)

const ctx = canvasElem.getContext('2d')
ctx.strokeStyle = '#f0f'

ctx.beginPath()

ctx.moveTo(hull[0] + 200, hull[1] + 200)
for (let i = 2; i < hull.length; i += 2) {
  ctx.lineTo(hull[i] + 200, hull[i + 1] + 200)
}
ctx.stroke()
