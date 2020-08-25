import React, { useEffect, useState, Fragment } from 'react'
import { getProjects } from '../store/selectors'
import { store } from '../store'
import { Link } from 'react-router-dom'

export default function ProjectsPage (props) {
  const [projects, setProjects] = useState([])

  const fetchProjects = () => {
    const data = getProjects(store.getState())
    if (data !== projects) {
      setProjects(data)
    }
  }
  useEffect(() => {
    fetchProjects()
  },[])

  return (
    <div className='page projects-container f3 ph4-l flex items-center justify-center'>
      <div className='w-100 project-link-container'>
        {Array.from(projects).map((pro, key) => {
          const project = pro[1]

          return(
            <Link className='w-100 pointer link black pointer ma1 project-link f2 f1-l georgia db' to={`projects${project.permalink}`} key={key} alt={ project.title } title={ project.title } >
              {project.title}{key === projects.size - 1 ? '': ' '}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

{/* 

  <article className='w-100 flex flex-wrap pointer mb4 bb'>
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

  
  <Link className='w-100 flex flex-wrap pointer project link black pointer' to={`projects${project.permalink}`} key={key} alt={ project.title } title={ project.title } >
            <div className='w-40'>
              <p>{project.title}</p>
            </div>
            <div className='w-10'>
              <p>{project.date}</p>
            </div>
            <div className='w-30'>
              <p>{project.info}</p>
            </div>
          </Link> */}
