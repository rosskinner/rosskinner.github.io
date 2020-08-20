import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Default (props) {
  return (
    <main className='flex flex-column relative ma3-l' aria-label='Content'>
      <div className='nav flex flex-row justify-between mb4 fixed top-0 left-0 w-100 pa3 bg-white'>
        <div className='w-70 mt2'>
          <div className='title'>
            <Link to={'/'} className='mt0 mb3 link black'>
              Rosalind Skinner
            </Link>
          </div>
        </div>
        <Link to={'/projects'} className='link black fr mt2'>Projects</Link>
      </div>
      
      {props.children}
      <div className='footer w-100 fixed bottom-0 left-0 bg-white'>
        <div className='w-100 flex justify-between'>
          <a className='link black ma3' href='mailto:ros.skinner@gmail.com'>Email</a>
          <a className='link black ma3 ' href='https://www.instagram.com/ros_skinner/'>Instagram</a>
          <a className='link black ma3' href='https://au.linkedin.com/in/rosalind-skinner-6335219a'>LinkedIn</a>
          <a className='link black ma3' href='https://github.com/rosskinner'>Github</a>
        </div>
      </div>
    </main>
  )
}
