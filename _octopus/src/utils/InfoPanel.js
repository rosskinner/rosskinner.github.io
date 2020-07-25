import './InfoPanel.css'

class InfoPanel {
  constructor () {
    this.el = document.createElement('div')
    this.el.className = 'info-panel'
    document.body.appendChild(this.el)
  }

  addMessage (message, key) {
    const div = document.createElement('div')

    if (key) {
      div.innerHTML = `<span>${key}</span>${message}`
    } else {
      div.innerHTML = message
    }

    this.el.appendChild(div)
  }
}

const infoPanel = new InfoPanel()

export default infoPanel
