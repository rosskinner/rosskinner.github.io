// Convert svg points

/*

On Sketch copy the svg code for the Polygon used to map the image hit area

SVG example for Movie Clapper image:

<svg width="114px" height="149px" viewBox="0 0 114 149" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <polygon id="Polygon" stroke="#FF0000" points="61 1 71 4 93 40.5 113 108 41 148 31 145 12 88 1 68"></polygon>
  </g>
</svg>

Copy the "points" attributes

example items

 items.push({
  id: 'headAnchor',
  imageWidth: 200,
  imageHeight: 100,
  offsetx: -100,
  offsety: -50,
  points: ''
})
 */

const items = []

function add (id, imageWidth, imageHeight, points) {
  items.push({ id, imageWidth, imageHeight, points })
}

function outputItems () {
  items.forEach(item => {
    const points = item.points.split(' ').map(v => Math.round(v))

    for (let i = 0; i < points.length; i += 2) {
      // shift minus half width and half height
      const offsetx = -Math.round(item.imageWidth * 0.5)
      const offsety = -Math.round(item.imageHeight * 0.5)
      points[i] += offsetx
      points[i + 1] += offsety
    }

    console.log(`---\n${item.id}\n[${points.join(', ')}]`)
  })
}

add('headAnchor', 176, 224, '20.2919922 108.147461 93.2607422 36.7226562 164.375 0 173.69043 10.5283203 176 28.21875 140.333008 180.078125 115.50293 212.263672 33.8339844 226.504883 0 216.121094 3.97265625 138.123047')
add('brain', 136, 102, '60 1 101 1 130 16 147 55 137 91.0624458 96 108 18 90 1 66 8 44 26.6489719 18.9375542')
add('headMovieClapper', 105, 141, '61 1 71 4 93 40.5 113 108 41 148 31 145 12 88 1 68')
add('remote', 110, 133, '35 1 72 21 121 106 84 141 67 141 11 74 1 31')
add('headCap', 138, 76, '98 1 138 9 151 57 133 77 81 85 17 81 1 50 28 17')

outputItems()
