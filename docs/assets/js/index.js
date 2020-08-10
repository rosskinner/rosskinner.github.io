let activeProject = null
let projects
function toggleOpen (e) {
  const currentIndex = parseInt(this.getAttribute('data-index'))
  if (activeProject !== null && activeProject !== currentIndex) projects[activeProject].classList.remove('open')
  activeProject = currentIndex
  if (this.classList.contains('open')) {
    activeProject = null
    this.classList.remove('open')
  } else {
    this.classList.add('open')
  }
  
}

window.onload = () => {
  projects = Array.from(document.getElementsByClassName('project'))
  // console.log('projects', projects)
  projects.forEach((project) => {
    project.addEventListener('click', toggleOpen)
  })
}