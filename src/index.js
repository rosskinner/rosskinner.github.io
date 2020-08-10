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


const Application = (props) => {

  return (
    <Switch>
      <Default>
        <Route exact path='/' render={(props) => <HomePage {...props} />} />
        <Route exact path='/projects' render={(props) => <ProjectsPage {...props} />} />
        <Route exact path='/projects/:id' render={(props) => <ProjectPage {...props} />} />
      </Default>
    </Switch>

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
