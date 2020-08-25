import React, { useEffect, useState, Fragment } from 'react'
import { getProject } from '../store/selectors'
import { store } from '../store'
import Loader from './loader'
import { Link } from 'react-router-dom'

export default function ProjectPage (props) {
  const [project, setProject] = useState(null)
  const [stack, setStack] = useState([])
  const [link, setLink] = useState([])
  const [delivery, setDelivery] = useState([])
  const [loaded, setloaded] = useState(false)
  const [loadedImages, setloadedImages] = useState(0)
  // let count = 0

  const setLists = (data) => {
    const s = []
    const l = []
    const d = []
    const i = []
    data.stack.forEach((item, key) => {
      let spacer = ','
      if (key === data.stack.length - 1) spacer = ''
      s.push(<span key={key}>{item}{spacer} </span>)
    })
    setStack(s)

    data.links.forEach((item, key) => {
      let spacer = ','
      if (key === data.links.length - 1) spacer = ''
      l.push(<a className='link black' href={item} key={key}>{item}{spacer} </a>)
    })
    setLink(l)

    data.delivery.forEach((item, key) => {
      let spacer = ','
      if (key === data.delivery.length - 1) spacer = ''
      d.push(<span key={key}>{item}{spacer} </span>)
    })
    setDelivery(d)
  }

  const onLoad = () => {
    // count++
    setloadedImages(loadedImages + 1)
    if (loadedImages + 1 === project.images.length + 1) {
      setloaded(true)
    }
  }

  const fetchProject = () => {
    const data = getProject(store.getState(), `/${props.match.params.id}`)
    if (data !== project) {
      setProject(data)
      setLists(data)
    }
  }
  useEffect(() => {
    fetchProject()
  },[])
  
  const projectLoaded = project !== null
  // console.log('projectLoaded', projectLoaded)

  return (
    <div className='page'>
      <Loader loaded={loaded} />
    {projectLoaded &&
      <div className='project-container page w-100 ph0 ph4-l pb4'>
        <div className='project-title tr'>
          <h1 className='pr5 f4 f3-l georgia'>{project.title}</h1>
        </div>
        <div className='w-100 flex items-center justify-center project-hero'>
          <div className='w-100 mwImage mh4 mh0-l'>
            <img className='w-100 mv2' onLoad={onLoad} src={require(`../projects${project.permalink}/${project.hero}`).default} />
          </div>
        </div>
        <div className='w-100 flex flex-column justify-center items-center'>
          <div className='project-content flex flex-column flex-row-l w-100-l mh4 mh0-l mt5 mb3 f4 f3-l'>
          
            <div className='w-100 w-40-l mt3 mt0-l pr2-l'>
              <p>
                <strong>Date:</strong> {project.date}
              </p>
              <p>
                <strong>Info:</strong> {project.info}
              </p>
              <p>
                <strong>Deliverables:</strong> {delivery}
              </p>
              <p>
                <strong>Stack:</strong> {stack}
              </p>
              <p>
                <strong>Links:</strong> {link}
              </p>
            </div>
            
            <div className='w-100 w-60-l'>
              <p className='f4 f3-l'>
                {project.description}
              </p>
            </div>
          </div>
          <div className='flex flex-column w-100'>
            {project.images.map((image, key) => {
               let padding = 'mb0 mb3-l'
               if (key === project.images.length -1) padding = ''
               return <img className={`w-100 mt0 mt4-l ${padding}`} onLoad={onLoad} key={key} src={require(`../projects${project.permalink}/${image}.jpg`).default} />
            })}
          </div>
        </div>
      </div>
      }
      </div>
    
  )
}
