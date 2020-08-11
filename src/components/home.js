import React, { useEffect, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { getHeroProjects } from '../store/selectors'
import { store } from '../store'
import * as Hero from './hero'

export default function HomePage (props) {
  const [projects, setProjects] = useState([])
  const [heroProjects, setHeroProjects] = useState([])
  const [activeProject, setActiveProject] = useState(0)
  // const [distance, setDistance] = useState(0)
  const [textures, setTextures] = useState([])
  const [redirect, setRedirect] = useState(false)
  let distance = 0
  
  const fetchProjects = () => {
    console.log('fetchprojects')
    const data = getHeroProjects(store.getState())
    if (data !== projects) {
      const projectData = []
      let count = 0
      
      data.forEach((project, key) => {
        const p = {...project, index: count, key: key}
        projectData.push(p)
        count++
      })
      setProjects(projectData)
    }

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
    
  }

  const onClick  = useCallback(e => {
    setRedirect(true)
    // props.history.push(`/projects${projects[activeProject].key}`)
  })
  const onEnter = () => {
    setDistance(0)
  }
  const onMove = () => {
    distance++
    
    // setDistance(distance + 1)
    
    if (distance > 200) {
      distance = 0
      const index = activeProject === projects.length - 1 ? 0 : activeProject + 1
      setActiveProject(index)
    }   
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener( 'resize', Hero.onWindowResize )
    
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener( 'resize', Hero.onWindowResize)
    }
    
  },[activeProject])

  useEffect(() => {
    fetchProjects()

    return () => {
      Hero.setLoaded(false)
    }
  },[])

  if (projects.length > 0) Hero.updateTexture(activeProject)
  if (redirect) return <Redirect to={`/projects${projects[activeProject].key}`}/>
  return (
    <div className='w-100 h-100 page' id='hero-container'>
    </div>
  )
}