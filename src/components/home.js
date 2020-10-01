import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { getHeroProjects } from '../store/selectors'
import { store } from '../store'
import * as Hero from './hero'
import Loader from './loader'

// import './gyro'

export default function HomePage (props) {
  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [textures, setTextures] = useState([])
  const [redirect, setRedirect] = useState(false)
  let distance = 0
  let totalDistance = 200
  
  const fetchProjects = () => {
    const data = getHeroProjects(store.getState())
    if (data !== projects) {
      const projectData = []
      let count = 0
      const t = []
      data.forEach((project, key) => {
        const img = require(`../projects${key}/texture.png`).default
        const mobile = require(`../projects${key}/texture-m.png`).default
        t.push({default: img, mobile:mobile})
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
  const onMove = (e) => {
    distance++
    console.log(distance, totalDistance)
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
    if (window.innerWidth < 800) totalDistance = 20
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
    
  },[activeProject])

  useEffect(() => {
    fetchProjects()
    if (window.innerWidth < 800) totalDistance = 20
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('hidden')

    return () => {
      body.classList.remove('hidden')
      Hero.cancelAnimation()
      Hero.removeListeners()
    }
  },[])

  if (redirect) return <Redirect to={`/projects${projects[activeProject].key}`}/>
  
    return (
      <div className='w-100 h-100 page home bg-white' id='hero-container'>
        <Loader loaded={loaded}/>
      </div>
    )
  
}