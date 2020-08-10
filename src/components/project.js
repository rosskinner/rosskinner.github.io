import React, { useEffect, useState, Fragment } from 'react'
import { getProject } from '../store/selectors'
import { store } from '../store'
import { Link } from 'react-router-dom'

export default function ProjectPage (props) {
  const [project, setProject] = useState(null)
  const [stack, setStack] = useState([])
  const [link, setLink] = useState([])
  const [delivery, setDelivery] = useState([])
  const [images, setImages] = useState([])

  const setLists = (data) => {
    const s = []
    const l = []
    const d = []
    const i = []
    data.stack.forEach((item, key) => {
      s.push(<span key={key}>{item} / </span>)
    })
    setStack(s)

    data.links.forEach((item, key) => {
      l.push(<span key={key}>{item} / </span>)
    })
    setLink(l)

    data.delivery.forEach((item, key) => {
      d.push(<span key={key}>{item} / </span>)
    })
    setDelivery(d)

    data.images.forEach((item, key) => {
      const src = require(`../_projects${data.permalink}/${item}.jpg`).default
      i.push(<img className='w-100 mv2' key={key} src={src} />)
    })
    setImages(i)
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
  })
  

  console.log(project)
  const projectLoaded = project !== null


  return (
    <Fragment>
      {projectLoaded &&
        <div className='project-container w-100 pa4'>
          <div className='project-title tr'>
            <h1 className='pr5 f3'>{project.title}</h1>
          </div>
          <div className='w-100 flex items-center justify-center project-hero'>
            <div className='w-100 mwImage'>
              <img className='w-100 mv2' src={require(`../_projects${project.permalink}/${project.hero}`).default} />
            </div>
          </div>
          <div className='w-100 flex flex-column justify-center items-center'>
            <div className='project-content flex flex-row w-100 mw8 mb4'>
            
              <div className='w-50'>
                <p>
                  Date: {project.date}
                </p>
                <p>
                  Info: {project.info}
                </p>
                <p>
                  Deliverables: {delivery}
                </p>

                <p>
                  Links: {link}
                </p>
              </div>
              
              <div className='w-50'>
                <p>
                  {project.description}
                </p>
              </div>
            </div>
            <div className='flex flex-column'>
              {images}
            </div>
          </div>
        </div>
      }
      </Fragment>
      
    
  )
}
