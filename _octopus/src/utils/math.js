/**
 * @param {String} strColor '#ff00ff'
 * @returns {Number} 0xff00ff
 */
export function colorStrToNum (strColor) {
  return parseInt(`0x${strColor.substring(1, strColor.length)}`, 16)
}

export function rgbToHex (r, g, b) {
  return (1 << 24) + (r << 16) + (g << 8) + b
}

/**
 * @param {Number} colorNum 0xff00ff
 * @return {String} '#ff00ff'
 */
export function colorNumToStr (colorNum) {
  return `#${colorNum.toString(16)}`
}

export function range (a, b) {
  return (b - a) * Math.random() + a
}

export function rangeInt (a, b) {
  return range(a, b) >> 0
}

// https://stackoverflow.com/questions/3309617/calculating-degrees-between-2-points-with-inverse-y-axis
export function getAngle (x, y, centerx, centery) {
  const a = centerx - x
  const b = centery - y
  var angle = Math.atan2(b, a)
  if (angle < 0) {
    angle += 2 * Math.PI
  }
  return angle
}

export function getDistance (x1, y1, x2, y2) {
  const a = x2 - x1
  const b = y2 - y1
  return Math.sqrt((a * a) + (b * b))
}

export function vecSub (v1, v2) {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y
  }
}

export function vecLength (v) {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

export function vecDistance (v1, v2) {
  const a = v2.x - v1.x
  const b = v2.y - v1.y
  return Math.sqrt(a * a + b * b)
}

export function angleBetweenPoints (v1, v2) {
  // angle in radians
  var angleRadians = Math.atan2(v2.y - v1.y, v2.x - v1.x)
  if (angleRadians < 0) {
    angleRadians += 2 * Math.PI
  }
  return angleRadians
  // angle in degrees
  // var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}

export function getMidpoint (x1, y1, x2, y2) {
  return [
    (x1 + x2) / 2,
    (y1 + y2) / 2
  ]
}

export function subPoints (x1, y1, x2, y2) {
  return [
    x1 - x2,
    y1 - y2
  ]
}

export function lengthPoint (x, y) {
  return Math.sqrt(x * x + y * y)
}

export function getHypotenuse (a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

export function circlePoints (x, y, radius, numPoints = 16) {
  const pts = []
  let a = 0
  const aInc = (Math.PI * 2) / numPoints

  for (let i = 0; i < numPoints; i++) {
    pts.push(Math.cos(a) * radius + x, Math.sin(a) * radius + y)
    a += aInc
  }

  return pts
}

export const RAD_90 = Math.PI / 2
export const RAD_45 = Math.PI / 4
export const RAD_135 = RAD_90 + RAD_45
export const RAD_180 = Math.PI
export const RAD_360 = Math.PI * 2
