import { isMobile } from './utils/device'
import { checkOldUrls } from './utils/urls'

function getApp () {
  /* eslint-disable-next-line */
  return import(/* webpackChunkName: "app" */ './app')
    .then(({ default: App }) => {
      return new App()
    }).catch(error => console.log('An error occurred while loading the App', error))
}

function createApp () {
  document.body.className += ' octopus'
  getApp().then(app => app.load(clearLoader))
}

function createMobileImage () {
  const container = document.getElementsByClassName('octopus-app')[0]
  const mobileImage = new window.Image()
  mobileImage.onload = clearLoader
  mobileImage.src = '/assets/images/octopus.jpg'
  container.appendChild(mobileImage)
}

window.onload = () => {
  if (isMobile()) {
    createMobileImage()
  } else {
    createApp()
  }
}

function clearLoader () {
  const loadingContainer = document.getElementById('loading')
  const loader = document.getElementById('loading-mask')
  loader.classList.toggle('loader-anim')
  loader.classList.toggle('loader-clear')
  loadingContainer.classList.toggle('loading-container-clear')
  const ae = window.whichAnimationEvent(loadingContainer)
  ae && loader.addEventListener(ae, () => {
    loader.classList.toggle('loader-clear')
    loadingContainer.classList.toggle('loading-container-clear')
    loadingContainer.classList.toggle('dn')
    loadingContainer.parentElement.removeChild(loadingContainer)
  })
}

checkOldUrls()
