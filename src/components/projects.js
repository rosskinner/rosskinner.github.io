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
  const gotProjects = projects.size > 0
  const projectList = []
  projects.forEach((project, key) => {
    projectList.push(<article className='w-100 flex flex-wrap pointer project' key={key} alt={ project.title } title={ project.title } >
        <div className='w-40'>
          <p>{project.title}</p>
        </div>
        <div className='w-10'>
          <p>{project.date}</p>
        </div>
        <div className='w-30'>
          <p>{project.info}</p>
        </div>
        <div className='w-10'>
          <Link to={`projects${project.permalink}`}>GO</Link>
        </div>
      </article>
    )
  })
  return (
    <Fragment>
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
      {projectList}
    </Fragment>
  )
}
