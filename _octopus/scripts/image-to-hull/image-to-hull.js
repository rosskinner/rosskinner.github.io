const PNG = require('png-js')
const path = require('path')
const concaveman = require('concaveman')
const convexHull = require('monotone-convex-hull-2d')
const fs = require('fs')
const simplify = require('simplify-path')

// Set to false to make a convex hull
const CONCAVE = false

if (process.argv.length !== 3) {
  console.log('Usage: node imageToHull.js image.png')
  process.exit()
}

const fullPath = path.resolve(__dirname, process.argv[2])

const png = PNG.load(fullPath)

png.decode((pixels) => {
  // pixels is a 1d array (in rgba order) of decoded pixel data

  let pixelList = []
  let rawPoints = []
  let outPoints = []

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] > 10) {
      const y = Math.floor((i / 4) / png.width)
      const x = i / 4 - y * png.width

      pixelList.push([ x, y ])
    }
  }

  if (CONCAVE) {
    rawPoints = concaveman(pixelList, 2, 10)
  } else {
    const indices = convexHull(pixelList)
    for (let index of indices) {
      rawPoints.push(pixelList[index])
    }
  }

  console.log('Raw points:', rawPoints.length)

  rawPoints = simplify(rawPoints, 2)
  console.log('Simplified points:', rawPoints.length)

  // Change origin to centre and re-format for Pixi
  for (let i = 0; i < rawPoints.length; i++) {
    outPoints.push(rawPoints[i][0] - png.width / 2)
    outPoints.push(rawPoints[i][1] - png.height / 2)
  }

  fs.writeFileSync(fullPath.split('.')[0] + '-hull.json', JSON.stringify(outPoints))
})
