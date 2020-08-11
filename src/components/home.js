import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { getHeroProjects } from '../store/selectors'
import { store } from '../store'
import * as Hero from './hero'

export default function HomePage (props) {
  const [projects, setProjects] = useState([])
  const [heroProjects, setHeroProjects] = useState([])
  const [activeProject, setActiveProject] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [textures, setTextures] = useState([])
  const [redirect, setRedirect] = useState(false)
  const imageRef = useRef(null);
  let distance = 0
  let imageLoaded = 0
  
  const fetchProjects = () => {
    console.log('fetchprojects')
    const data = getHeroProjects(store.getState())
    if (data !== projects) {
      const projectData = []
      let count = 0
      const t = []
      data.forEach((project, key) => {
        const img = require(`../_projects${key}/texture.png`).default
        t.push(img)
        const p = {...project, index: count, key: key, image: img}
        projectData.push(p)
        count++
      })
      
      setTextures(t)
      setProjects(projectData)
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

  const onLoad = (e) => {
    imageLoaded++
    if (imageLoaded === projects.length - 1) setLoaded(true)
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


  if (redirect) return <Redirect to={`/projects${projects[activeProject].key}`}/>
  if (loaded) {
    console.log(textures)
    Hero.init('hero-container', textures, onClick)
    Hero.animate(0)
    Hero.updateTexture(activeProject)
  }
    
  return (
    <div className='w-100 h-100 page' id='hero-container'>
      {!loaded && 
        <div className='loader' />
      }
      <div className='image-container'>
        {projects.map((project, i) => {
          return (<img ref={imageRef}  className='home-image' onLoad={onLoad} key={i} src={project.image} />)
        })}
      </div>
    </div>
  )
}