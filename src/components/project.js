import React, { useEffect, useState } from 'react'
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
      s.push(<p key={key}>{item}</p>)
    })
    setStack(s)

    data.links.forEach((item, key) => {
      l.push(<p key={key}>{item}</p>)
    })
    setLink(l)

    data.delivery.forEach((item, key) => {
      d.push(<p key={key}>{item}</p>)
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
    <div>
      {projectLoaded &&
        <div>
          <article className='w-100 flex flex-wrap mb4 bb'>
          <div className='w-40'>
            <p>Project</p>
          </div>
          <div className='w-10'>
            <p>Date</p>
          </div>
          <div className='w-40'>
            <p>Info</p>
          </div>
        </article>
        <article className='w-100 flex flex-wrap project' alt={ project.title } title={ project.title } >
          <div className='w-40'>
            <p>{project.title}</p>
          </div>
          <div className='w-10'>
            <p>{project.date}</p>
          </div>
          <div className='w-30'>
            <p>{project.info}</p>
          </div>
          <div className='w-100'>
            <div className='w-100 flex flex-row'>
              <div className='w-50'>
                <p className='w-20 fr'>Description</p>
              </div>
              <div className='w-50'>
                <p>{project.description}</p>
              </div>
            </div>

          <div className='w-100'>
            <div className='w-100 flex flex-row'>
              <div className='w-50'>
                <p className='w-20 fr'>Stack</p>
              </div>
              <div className='w-50'>
              {stack}
              </div>
            </div>
            
            <div className='w-100 flex flex-row'>
              <div className='w-50'>
                <p className='w-20 fr'>Deliverables</p>
              </div>
              <div className='w-50'>
                {delivery}
              </div>
            </div>
          
            <div className='w-100 flex flex-row'>
              <div className='w-50'>
                <p className='w-20 fr'>Links</p>
              </div>
              <div className='w-50'>
                {link}
              </div>
            </div>
            <div className='w-100'>
              {images}
            </div>
          </div>
        </div>
        </article>
      </div> 
      }
      </div>
      
    
  )
}
