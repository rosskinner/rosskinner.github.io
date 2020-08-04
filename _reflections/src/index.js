import * as donut from './donut'

let imageActive = []
let projects

function hoverImage (e) {
  this.parentElement.parentElement.children[0].setAttribute('data-active', '')
  const img = this.children[0].children[0].src
  donut.updateImage(img)
}

function hoverOffImage (e) {
  this.parentElement.parentElement.children[0].removeAttribute('data-active')
}

window.onload = () => {
  projects = document.getElementsByClassName('project-item')

  Array.from(projects).forEach((project, index) => {
    imageActive.push(null)
    project.addEventListener('mouseenter', hoverImage, false)
    project.addEventListener('mouseleave', hoverOffImage, false)
  })

  donut.init()
  donut.animate()
}
