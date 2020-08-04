// let mousePos = { x: 0, y: 0 }
// let imageActive = []
// let activeProject
// let hoverProject
// let projectsContainer
// let projects
// let projectImageContainer

// window.addEventListener('load', function () {
//   projects = document.getElementsByClassName('project-item')
//   const projectTitles =  document.getElementsByClassName('project-title')
//   projectsContainer = document.getElementById('projects')
//   projectImageContainer = document.getElementsByClassName('project-image-container')
//   // const container = document.getElementsByClassName('projects-container')
//   Array.from(projectTitles).forEach((project, index) => {
//     imageActive.push(null)
//     // project.addEventListener('mouseenter', hoverImage, false)
//     // project.addEventListener('mouseleave', hoverOffImage, false)
//     project.addEventListener('mouseenter', showImage, false)
//     project.addEventListener('mousemove', cycleImages, false)
//     project.addEventListener('mouseleave', resetImages, false)
//     project.addEventListener('click', showContent, false)
//   })
// })

// function hoverImage (e) {
//   this.parentElement.parentElement.children[0].setAttribute('data-active', '')
// }

// function hoverOffImage (e) {
//   this.parentElement.parentElement.children[0].removeAttribute('data-active')
// }

// function showImage (e) {
//   if (projectsContainer.getAttribute('data-open') !== null) return
//   // if (this.classList.contains('active-project')) return
//   // console.log(this.parentElement.parentElement)
//   const imageContainer = this.parentElement.parentElement.children[0]

//   if (!imageContainer.children[0].hasAttribute('data-active')) {
//     imageContainer.children[0].setAttribute('data-active', '')
//     const index = parseInt(this.getAttribute('data-index'))
//     imageActive[index] = 0
//   }

//   mousePos = {
//     x: e.x,
//     y: e.y
//   }
// }

// function cycleImages (e) {
//   // if (this.classList.contains('active-project')) return
//   // console.log(projectsContainer.getAttribute('data-open'))
//   if (projectsContainer.getAttribute('data-open') !== null) return
//   const container = this.parentElement.parentElement.children[0]
  
//   let a = mousePos.x - e.x
//   let b = mousePos.y - e.y
//   let c = Math.sqrt((a * a) + (b * b))

//   if (c > 40) {
//     mousePos = {
//       x: e.x,
//       y: e.y
//     }
    
//     const index = parseInt(this.getAttribute('data-index'))
//     container.children[imageActive[index]].removeAttribute('data-active')
//     const nextImage = imageActive[index] === container.children.length - 1 ? 0 : imageActive[index] + 1
//     imageActive[index] = nextImage
//     container.children[nextImage].setAttribute('data-active', '')
//   }
  
//   // container.style.left = `${e.clientX}px`
//   // container.style.top = `${e.clientY + window.pageYOffset}px`
//   // console.log(window.pageYOffset)
// }

// function resetImages (e) {
//   if (projectsContainer.getAttribute('data-open') !== null) return
//   const container = this.parentElement.parentElement.children[0]
//   const index = parseInt(this.getAttribute('data-index'))
//   container.children[imageActive[index]].removeAttribute('data-active')
//   imageActive[index] = 0
// }

// function showContent () {
//   if (activeProject && projects[activeProject].getAttribute('data-active-project') !== null) {
//     console.log('already open', projects[activeProject])
//     projects[activeProject].removeAttribute('data-active-project')
//     projectsContainer.removeAttribute('data-open')
//     return
//   }
//   // if (projects[activeProject] === this.parentElement.parentElement) return
//   if (activeProject) projects[activeProject].removeAttribute('data-active-project')
//   projectsContainer.setAttribute('data-open', '')
//   activeProject = this.parentElement.parentElement.getAttribute('data-index')
//   projects[activeProject].setAttribute('data-active-project','')

//   const imageContainer = projects[activeProject].children[0]
//   if (!imageContainer.children[0].hasAttribute('data-active')) {
//     imageContainer.children[0].setAttribute('data-active', '')
//     const index = parseInt(this.getAttribute('data-index'))
//     imageActive[index] = 0
//   }
//   // document.getElementById('projects').scrollIntoView()
// }
