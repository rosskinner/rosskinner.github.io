export function getSpriteData (renderer, sprite) {
  return new Promise((resolve, reject) => {
    renderer.extract.canvas(sprite).toBlob(function (blob) {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Invalid blob.'))
      }
    }, 'image/png')
  })
}

export async function spriteToImage (renderer, sprite, filename) {
  const blob = await getSpriteData(renderer, sprite)
  const a = document.createElement('a')
  document.body.append(a)
  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.click()
  a.remove()
}
