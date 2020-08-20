
export default function Copy (container, source) {
  var canvas = document.createElement('canvas')
  const size = source.domElement
  const style = source.domElement.style
  console.log(size)
  canvas.style.width = style.width
  canvas.style.height = style.height
  canvas.width = size.width
  canvas.height = size.height
  container.prepend(canvas)
  this.destCtx = canvas.getContext('2d')
  console.log('source', source.getSize())
  //call its drawImage() function passing it the source canvas directly
  this.destCtx.drawImage(source.domElement, 0, 0)

}

Copy.prototype.update = function (source) {
  // console.log(source.width, source.style)
  // const width = parseInt(source.style.width.split('px')[0])
  // const height = parseInt(source.style.height.split('px')[0])
  const width = source.width
  const height = source.height
  const oldWidth = width 
  const oldHeight = height
  const newWidth = width * 1.5
  const newHeight = height * 1.5
  // const posX = -(newWidth - oldWidth)/2
  // const posY = -(newHeight - oldHeight)/2
  const posX = -(newWidth - oldWidth)/2
  const posY = -(newHeight - oldHeight)/2
  // console.log(posX, posY)
  this.destCtx.drawImage(source, posX, posY, newWidth, newHeight)
}
