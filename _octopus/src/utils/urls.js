const pattern = '#!/'
const oldUrlsMap = {
  '?projects': '/studio',
  '?about': '/about',
  '?contact': '/contact',
  'projects/transport-accident-commision': '/projects/road-to-zero/',
  'projects/mad-hatters': '/projects/mad-hatters/',
  'projects/australian-music-vault': '/projects/australian-music-vault/',
  'projects/kings-of-baxter': '/projects/kings-of-baxter/',
  'projects/uluru-street-view-launch': '/projects/uluru-street-view-launch/',
  'projects/the-oracles': '/projects/the-oracles/',
  'projects/resting-pitch-face': 'projects/resting-pitch-face/',
  'projects/wings-activation': '/projects/wings-activation/',
  'projects/story-spheres': '/projects/story-spheres/',
  'projects/pixel': '/projects/pixel/',
  'projects/love-at-fifth-site': '/projects/love-at-fifth-site/',
  'projects/google-impact-challenge-2016': '/projects/google-impact-challenge-2016/',
  'projects/for-the-love-of-meat': '/projects/for-the-love-of-meat/',
  'projects/ghosts-vr': '/projects/ghosts-vr/',
  'projects/talks-at-google': '/projects/talks-at-google/',
  'projects/ghosts--toast-and-the-things-unsaid': '/projects/ghosts-toast-and-the-things-unsaid/',
  'projects/loom': '/projects/loom/',
  'projects/teddy-x': '/projects/teddy-x/',
  'projects/the-cube': '/projects/the-cube/',
  'projects/hangouts-in-history': '/projects/hangouts-in-history/',
  'projects/start-with-code': '/projects/start-with-code/',
  'projects/midsummer-nights-dreaming': '/projects/midsummer-nights-dreaming/',
  'projects/google-impact-challenge': '/projects/google-impact-challenge/',
  'projects/remember-me': '/projects/remember-me/',
  'projects/the-binoculars': '/projects/the-binoculars/',
  'projects/shakespeares-450th-birthday': '/projects/shakespeares-450th-birthday/',
  'projects/skypad': '/projects/skypad/'
}

export function checkOldUrls () {
  const { location } = document || window
  const { hash, origin } = location

  if (hash.indexOf(pattern) > -1) {
    const newPath = hash.replace(pattern, '')
    if (oldUrlsMap.hasOwnProperty(newPath)) {
      location.replace(`${origin}${oldUrlsMap[newPath]}`)
    }
  }
}
