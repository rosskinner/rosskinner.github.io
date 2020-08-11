import { createReducer } from '@reduxjs/toolkit'
import projects from '../projects'


const projectsMap = new Map()
const projectsHeroMap = new Map()

// const projects = [HomeView, HypeView, GameView, EndView, ConfigView]
// this.bg = new BackgroundView()
// this.addChild(this.bg)
projects.forEach((project, index) => {
  projectsMap.set(project.permalink, project)
  projectsHeroMap.set(project.permalink, {hero: project.hero, title: project.title})
})

const sortedProjects = new Map([...projectsMap.entries()].sort((a,b) => {
  return new Date(parseInt(a.date)).getTime() - 
      new Date(parseInt(b.date)).getTime()
}))
console.log(sortedProjects)

const initialState = {
  projects: sortedProjects,
  projectsHero: projectsHeroMap,
  currentProject: null
}

const appReducer = createReducer(initialState, {
  
})

export default { appReducer }
