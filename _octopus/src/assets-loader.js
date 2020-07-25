import { loaders } from 'pixi.js'
import images from './assets/images'

export const loader = new loaders.Loader()

function addOctopusImage (id) {
  const urlBw = images.octopus[id]
  const colorId = `${id}Color`
  const urlColor = images.octopus[colorId]
  loader.add(id, urlBw)
  loader.add(colorId, urlColor)
}

export function getResource (id) {
  if (loader[id]) {
    return loader[id]
  }
  console.warn(`Resorce ${id} not found.`)
  return null
}

// throughout the process multiple signals can be dispatched.
// loader.onProgress.add(() => {})
// loader.onError.add(() => {})
// loader.onLoad.add((e) => {})
// loader.onComplete.add(() => {})

// Add More assets Here

// Octopus assets
addOctopusImage('base')
addOctopusImage('hair')
// addOctopusImage('headBase')
// legs
addOctopusImage('blobLegBase')
addOctopusImage('blobLegExtra')
addOctopusImage('geometricLeg')
addOctopusImage('legDigital')
addOctopusImage('legInk')
// addOctopusImage('brainLegBase')
addOctopusImage('legTwist')
addOctopusImage('legsLeft')
addOctopusImage('brainLegBrush')
addOctopusImage('shipWheel')
addOctopusImage('brain')
addOctopusImage('blob1')
addOctopusImage('blob2')
addOctopusImage('blob3')
addOctopusImage('remote')
addOctopusImage('beer')
addOctopusImage('telescope')
addOctopusImage('bolt')
addOctopusImage('fountainPen')
addOctopusImage('coffee')
addOctopusImage('flowerPot')

// Head
addOctopusImage('headCurveLeft')
addOctopusImage('headBrush')
addOctopusImage('headCap')
addOctopusImage('headCurveRight')
addOctopusImage('headBalls')
addOctopusImage('headMovieClapper')
addOctopusImage('headSquiggle')
addOctopusImage('headAnchor')
addOctopusImage('headRocket')

// addOctopusImage('sphere1')
// addOctopusImage('sphere2')
// addOctopusImage('sphere3')
// addOctopusImage('sphere4')

// color
// addOctopusImage('brainColor')
// addOctopusImage('coffeeColor')
// addOctopusImage('headAnchorColor')
// addOctopusImage('headCapColor')
// addOctopusImage('headMovieClapperColor')
// addOctopusImage('remoteColor')
