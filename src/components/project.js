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
    data.tech.forEach((item, key) => {
      let spacer = ','
      if (key === data.tech.length - 1) spacer = ''
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
    if (loadedImages + 1 === project.images.flat().length) {
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
        {/* <div className='project-title tr'>
          <h1 className='pr5 f4 f3-l georgia'>{project.title}</h1>
        </div> */}
        <div className='w-100 flex items-center justify-center project-hero'>
          <div className='w-100 mwImage mh4 mh0-l'>
            <img className='w-100 mv2' onLoad={onLoad} src={require(`../projects${project.permalink}/${project.hero}`).default} />
          </div>
        </div>
        <div>
          <h1 className='pr5 f4 f2-l georgia'>{project.title}</h1>
        </div>
        <div className='w-100 flex flex-column justify-center items-center'>
          <div className='project-content flex flex-column flex-row-l w-100-l mh4 mh0-l mt5 mb3 f4 f4-l'>
            <div className='w-100 w-40-l mt3 mt0-l pr2-l'>
              <p>
                <strong>Date:</strong> {project.date}
              </p>
              <p>
                <strong>Client:</strong> {project.client}
              </p>

              <p>
                <strong>Agency:</strong> {project.agency}
              </p>
              <p>
                <strong>Info:</strong> {project.info}
              </p>

              <p>
                <strong>Role:</strong> {project.role}
              </p>
            </div>
            
            <div className='w-100 w-60-l pl4-l'>
              <p>
                <strong>Deliverables:</strong> {delivery}
              </p>
              <p>
                <strong>Tech:</strong> {stack}
              </p>
              <p>
                <strong>Links:</strong> {link}
              </p>

              <p className='f4 f4-l mt5'>
                {project.description}
              </p>
              
            </div>
          </div>
          {project.video &&
            <div className='flex flex-column w-100 video-container mt0 mt4-l mb0 mb3-l'>

            <iframe
            className='video'
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${project.video}?rel=0&amp;showinfo=0;modestbranding=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
            <video  onLoad={onLoad} src={project.video} />
          </div>
          }
          
          <div className='flex flex-column w-100'>
            {project.images.map((image, key) => {
               let padding = 'mb0 mb3-l'
               if (Array.isArray(image)) {
                 const group = []
                  image.map((im, keyn) => {
                    let pad = ''
                    if (keyn % 2 == 0) pad = 'mr0 mr4-l'
                    group.push(<img className={`portrait mt0 mt4-l ${padding} ${pad} portrait`} onLoad={onLoad} key={keyn} src={require(`../projects${project.permalink}/${im}`).default} />) 
                  })
                  return <div key={key} className='flex flex-row w-100 flex-wrap justify-between'>{group}</div>
                
               } else {
                if (key === project.images.length -1) padding = ''
                return <img className={`w-100 mt0 mt4-l ${padding}`} onLoad={onLoad} key={key} src={require(`../projects${project.permalink}/${image}.jpg`).default} />
               }
               
            })}
          </div>
        </div>
      </div>
      }
      </div>
    
  )
}
