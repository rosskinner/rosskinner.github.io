let mousePos = { x: 0, y: 0 }
let imageActive = []
window.addEventListener('load', function () {
  const projects = document.getElementsByClassName('project-item')
  Array.from(projects).forEach((project) => {
    imageActive.push(null)
    project.addEventListener('mouseenter', showImage, false)
    project.addEventListener('mousemove', cycleImages, false)
    project.addEventListener('mouseleave', resetImages, false)
  })
})

function showImage (e) {
  const imageContainer = this.children[0]

  if (!imageContainer.children[0].hasAttribute('data-active')) {
    imageContainer.children[0].setAttribute('data-active', '')
    const index = parseInt(this.getAttribute('data-index'))
    imageActive[index] = 0
  }

  mousePos = {
    x: e.x,
    y: e.y
  }
}

function cycleImages (e) {
  let a = mousePos.x - e.x
  let b = mousePos.y - e.y
  let c = Math.sqrt((a * a) + (b * b))
  if (c > 20) {
    mousePos = {
      x: e.x,
      y: e.y
    }
    const container = this.children[0]
    const index = parseInt(this.getAttribute('data-index'))
    container.children[imageActive[index]].removeAttribute('data-active')
    const nextImage = imageActive[index] === container.children.length - 1 ? 0 : imageActive[index] + 1
    imageActive[index] = nextImage
    container.children[nextImage].setAttribute('data-active', '')
  }
}

function resetImages (e) {
  const container = this.children[0]
  const index = parseInt(this.getAttribute('data-index'))
  container.children[imageActive[index]].removeAttribute('data-active')
  imageActive[index] = 0
}
