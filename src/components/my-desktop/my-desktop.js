/**
 * The my-desktop web component module.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */
import '../my-dock/'
import '../my-desktop-bar/'
import '../my-window/'
import '../my-messages-app/'
import '../my-memory-game/my-memory-game/'
import '../my-camera-app/'
import '../my-photo/'
import '../my-about-app/'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      width: 100%;
      height: 100%;
      min-height: 100%;
      background: url(images/bg.jpg) no-repeat center center fixed; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }
  </style>
  <my-desktop-bar></my-desktop-bar>
  <my-dock></my-dock>
`

/**
 * Define custom element.
 */
customElements.define('my-desktop',
/**
 * A new HTMLElement class instance.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Eventlistener, adds my-window component with specified app to the DOM.
      this.addEventListener('openApp', (event) => {
        const myWindow = document.createElement('my-window')
        myWindow.setAttribute('app', event.detail.name)
        this.shadowRoot.appendChild(myWindow)
      })
      // Eventlistener, removes my-window component with specified app from the DOM.
      this.addEventListener('closeApp', (event) => {
        const thisWindow = event.detail.window
        this.shadowRoot.removeChild(thisWindow)
      })
      // Eventlistener, adds my-photo component with specified image to the DOM.
      this.addEventListener('photo', (event) => {
        const myWindow = document.createElement('my-window')
        myWindow.setAttribute('app', 'my-photo')
        myWindow.shadowRoot.querySelector('my-photo').setAttribute('src', event.detail.photo)
        this.shadowRoot.appendChild(myWindow)
      })
    }
  }
)
