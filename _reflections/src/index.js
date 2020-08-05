import * as donut from './donut'
import html2canvas from 'html2canvas'

let imageActive = []
let projects

function nearestPow2 (aSize) {
  return Math.pow(2, Math.round(Math.log(aSize) / Math.log(2)))
}

function hoverImage (e) {
  this.parentElement.parentElement.children[0].setAttribute('data-active', '')
  const index = parseInt(this.getAttribute('data-index'))
  donut.updateImage(index)
}

function hoverOffImage (e) {
  this.parentElement.parentElement.children[0].removeAttribute('data-active')
}

window.onload = () => {
  projects = document.getElementsByClassName('project-title')
  const images = []

  Array.from(projects).forEach((project, index) => {
    imageActive.push(null)
    project.addEventListener('mouseenter', hoverImage, false)
    project.addEventListener('mouseleave', hoverOffImage, false)
    html2canvas(project).then(canvas => {
      // document.body.appendChild(canvas)
      // canvas.width = canvas.height
      const image = canvas.toDataURL()
      const sizeWidth = nearestPow2(canvas.width)
      const sizeHeight = sizeWidth * (canvas.height / canvas.width)
      const iteration = parseInt(sizeWidth / sizeHeight)

      const img = new Image()
      img.src = image

      const newCanvas = document.createElement('canvas')
      newCanvas.width = sizeWidth
      newCanvas.height = sizeWidth

      const ctx = newCanvas.getContext('2d')
      ctx.fillStyle = 0xffffff

      img.onload = () => {
        for (let i = 0; i < iteration; i++) {
          ctx.drawImage(img, 0, sizeHeight * i, sizeWidth, sizeHeight)
        }
        console.log(newCanvas.width)
        const imageUrl = newCanvas.toDataURL()
        images.push(imageUrl)
        // document.body.appendChild(newCanvas)
        // image.height = window.innerWidth
        if (index === projects.length - 1) {
          donut.init(images)
          donut.animate()
        }
      }
    })
  })
}
