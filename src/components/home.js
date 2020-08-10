import React, { useEffect, useState, useRef } from 'react'
import { getHeroProjects } from '../store/selectors'
import { store } from '../store'
import * as Hero from './hero'

export default function HomePage (props) {
  const [projects, setProjects] = useState([])
  const [heroProjects, setHeroProjects] = useState([])
  const [activeProject, setActiveProject] = useState(0)
  const [distance, setDistance] = useState(0)
  const [textures, setTextures] = useState([])
  const [redirect, setRedirect] = useState(false)
  
  const fetchProjects = () => {
    const data = getHeroProjects(store.getState())

    if (data !== projects) {
      const projectData = []
      let count = 0
      
      data.forEach((project, key) => {
        const p = {...project, index: count, active: activeProject === count ? 'flex': 'dn', key: key}
        projectData.push(p)
        count++
      })
      setProjects(projectData)
      
    }
    
  }

  const onClick = (e) => {
    setRedirect(true)
  }
  const onEnter = () => {
    setDistance(0)
  }
  const onMove = () => {
    const c = distance + 1
    setDistance(c)
    
    if (c > 200) {
      setDistance(0)
      const index = activeProject === projects.length - 1 ? 0 : activeProject + 1
      setActiveProject(index)
    }   
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener( 'resize', Hero.onWindowResize, false )
    
    fetchProjects()
    return () => {
      
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      window.addEventListener( 'resize', Hero.onWindowResize)
    }
    
  },[distance])

  useEffect(() => {
    const data = getHeroProjects(store.getState())
    if (data !== heroProjects) {
      // console.log('heroProjects', heroProjects)
      setHeroProjects(data)
      const t = []
      data.forEach((project, key) => {
        t.push(require(`../_projects${key}/texture.png`).default)
      })
      setTextures(t)
      Hero.init('hero-container', t, onClick)
      Hero.animate(0)
    }

    return () => {
      Hero.setLoaded(false)
    }
  },[])

  projects.forEach((project, key) => {
    if (project.active !== 'dn') {
      Hero.updateTexture(key)
    }
    
  })
  if (redirect) props.history.push(`/projects${projects[activeProject].key}`)

  return (
    <div className='w-100 h-100' id='hero-container'>
    </div>
  )
}