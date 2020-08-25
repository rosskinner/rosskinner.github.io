import React from 'react'
import { CSSTransition } from 'react-transition-group'

export default function Loader (props) {
  return (
    <CSSTransition
    in={!props.loaded}
    timeout={1200}
    classNames='load'
    unmountOnExit
  >
    <div className='fixed loader-container flex flex-column items-center justify-center bg-white' >
      <div className='loader georgia' />
    </div>
  </CSSTransition>
  )
}