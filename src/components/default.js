import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Default (props) {
  return (
    <main className='flex flex-column relative ma3' aria-label='Content'>
      <div className='flex flex-row justify-between mb4 fixed top-0 left-0 w-100 pa3 bg-white'>
        <div className='w-70 mt2'>
          <div className=''>
            <Link to={'/'} className='mt0 mb3 link black'>
              {/* <svg viewBox="0 0 425 300">
                <path id="curve" d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" />
                <text x="25">
                  <textPath xlink:href="#curve">
                    Rosalind Skinner
                  </textPath>
                </text>
              </svg> */}
              Rosalind Skinner
            </Link>
          </div>
        </div>
        <Link to={'/projects'} className='link black fr'>Index</Link>
      </div>
      
      {props.children}
      <div className='w-100 fixed bottom-0 left-0 bg-white'>
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
