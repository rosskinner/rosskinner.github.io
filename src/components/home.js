import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { getHeroProjects } from '../store/selectors'
import { store } from '../store'
import * as Hero from './hero'
import Loader from './loader'

export default function HomePage (props) {
  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [textures, setTextures] = useState([])
  const [redirect, setRedirect] = useState(false)
  let distance = 0
  let totalDistance = 200
  
  const fetchProjects = () => {
    console.log('fetchprojects')
    const data = getHeroProjects(store.getState())
    if (data !== projects) {
      const projectData = []
      let count = 0
      const t = []
      data.forEach((project, key) => {
        const img = require(`../projects${key}/texture.png`).default
        t.push(img)
        const p = {...project, index: count, key: key, image: img}
        projectData.push(p)
        count++
      })
      
      setTextures(t)
      setProjects(projectData)
      loadHero(t)
    }
    
  }

  const onClick  = useCallback(e => {
    setRedirect(true)
  })
  const onEnter = () => {
    setDistance(0)
  }
  const onMove = () => {
    distance++
    
    if (distance > totalDistance) {
      distance = 0
      const index = activeProject === projects.length - 1 ? 0 : activeProject + 1
      setActiveProject(index)
    }   
  }

  const onLoad = (e) => {
    setLoaded(true)
  }
  const loadHero = (t) => {
    Hero.init('hero-container', t, onClick, onLoad)
    Hero.animate(0)
  }

  useEffect(() => {
    if (loaded) Hero.updateTexture(activeProject)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener( 'resize', Hero.onWindowResize )
    
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener( 'resize', Hero.onWindowResize)
    }
    
  },[activeProject])

  useEffect(() => {
    fetchProjects()
    if (window.innerWidth < 800) totalDistance = 100

    return () => {
      Hero.cancelAnimation()
    }
  },[])


  if (redirect) return <Redirect to={`/projects${projects[activeProject].key}`}/>
    return (
      <div className='w-100 h-100 page home' id='hero-container'>
        <Loader loaded={loaded}/>
      </div>
    )
  
}