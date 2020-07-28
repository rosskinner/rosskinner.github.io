let mousePos = { x: 0, y: 0 }
let imageActive = []
window.addEventListener('load', function () {
  const projects = document.getElementsByClassName('project-item')
  // const container = document.getElementsByClassName('projects-container')
  Array.from(projects).forEach((project) => {
    imageActive.push(null)
    project.addEventListener('mouseenter', showImage, false)
    project.addEventListener('mousemove', cycleImages, false)
    project.addEventListener('mouseleave', resetImages, false)
    project.addEventListener('click', showContent, false)
  })
})

function showImage (e) {
  // if (this.classList.contains('active-project')) return
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
  // if (this.classList.contains('active-project')) return
  const container = this.children[0]
  let a = mousePos.x - e.x
  let b = mousePos.y - e.y
  let c = Math.sqrt((a * a) + (b * b))

  if (c > 40) {
    mousePos = {
      x: e.x,
      y: e.y
    }
    
    const index = parseInt(this.getAttribute('data-index'))
    container.children[imageActive[index]].removeAttribute('data-active')
    const nextImage = imageActive[index] === container.children.length - 1 ? 0 : imageActive[index] + 1
    imageActive[index] = nextImage
    container.children[nextImage].setAttribute('data-active', '')
  }
  
  container.style.left = `${e.clientX}px`
  container.style.top = `${e.clientY + window.pageYOffset}px`
  // console.log(window.pageYOffset)
}

function resetImages (e) {
  // if (this.classList.contains('active-project')) return
  const container = this.children[0]
  const index = parseInt(this.getAttribute('data-index'))
  container.children[imageActive[index]].removeAttribute('data-active')
  imageActive[index] = 0
}

function showContent () {
  this.classList.toggle('active-project')
}
