import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Hero (props) {
  
  return (
    <div className={`absolute w-100 vh-100 items-center justify-center hero-container ${props.active}`}>
      <Link className='w-100 hero-background mw7 ph5 pv6 items-center justify-center flex db' style={{backgroundImage: `url(${require(`../projects${props.permalink}/background.jpg`).default})`}} to={`/projects${props.permalink}`}>
      <img className='w-100 mw6 hero-image' src={require(`../projects${props.permalink}/1.jpg`).default}/>
    </Link> 
    </div>
    
  )
}