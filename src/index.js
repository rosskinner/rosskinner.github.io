import 'tachyons'
import './assets/css/styles.css'
import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import HomePage from './components/home'
import ProjectsPage from './components/projects'
import ProjectPage from './components/project'
import Default from './components/default'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

const Application = (props) => {
  const { location } = props

  return (
    <Default>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          timeout={400}
          classNames='page'
          unmountOnExit
        >
          <Switch location={location}>
            <Route exact path='/' render={(props) => <HomePage {...props} />} />
            <Route exact path='/projects' render={(props) => <ProjectsPage {...props} />} />
            <Route exact path='/projects/:id' render={(props) => <ProjectPage {...props} />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Default>

  )
}


window.addEventListener('load', () => {
  const application = document.getElementById('app')

  render(
    <Router>
      <Route path='/' component={Application} />
    </Router>,
    application
  )
})
