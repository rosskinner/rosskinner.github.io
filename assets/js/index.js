window.addEventListener('load', function () {
  const projects = document.getElementsByClassName('project-item')
  Array.from(projects).forEach((project) => {
    project.addEventListener('mousemove', showImage, false)
  })
})

function showImage (e) {
  const image = this.children[0]
  image.style.left = `${e.x}px`
  image.style.top = `${e.y - this.offsetTop}px`
}
