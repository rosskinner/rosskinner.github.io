import 'tachyons'
import './assets/css/styles.css'
import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
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

// const routes = [
  // { path: '/', name: 'Home', Component: HomePage },
  // { path: '/projects', name: 'Projects', Component: ProjectsPage },
  // { path: '/projects/:id', name: 'Project', Component: ProjectPage },
// ]

const Application = (props) => {
  const { location } = props
  return (
    <Default>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
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


{/* {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
          {(props) => (
            
            <CSSTransition
              in={props.match != null}
              timeout={400}
              classNames='page'
              unmountOnExit
            >
              <div className='page'>
                <Component {...props} />
              </div>
            </CSSTransition>
          )}
        </Route>
        ))} */}


window.addEventListener('load', () => {
  const application = document.getElementById('app')

  render(
    <Router>
      <Route path='/' component={Application} />
    </Router>,
    application
  )
})
