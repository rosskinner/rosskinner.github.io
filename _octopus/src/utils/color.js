import { rangeInt } from './math'

export const COLORS = [
  0xFFBAC8,
  0xEAAFFF,
  0xFFFFFF,
  0xBABEFF,
  0xFF7C7C,
  0x67FCE1,
  0x7C80FF,
  0xFF6969,
  0xFBDCB6,
  0xFFDD58,
  0xFFB9A4,
  0xCEFFB6,
  0xDDBCBC,
  0xFF345E,
  0x53E4B3
]

const len = COLORS.length

export function randomColorNum (excludeColor) {
  const index = rangeInt(0, len)
  var color = COLORS[index]
  if (color === excludeColor) {
    return COLORS[(index + 1) % len]
  }
  return color
}
