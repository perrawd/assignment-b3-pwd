/**
 * The my-dock web component module.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: block;
      background-color:rgba(0, 0, 0, 0.9);
      color: #ffffff;
      width: 300px;
      height: 60px;
      border: 3px solid #000000;
      border-radius: 10px;
      position: fixed;
      bottom: 0;
      margin: auto;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 1000;
    }
    #icons {
      max-height: 55px;
    }
    img {
      max-height: 55px;
      margin-left: 5px;
      margin-right: 5px;
    }

    img:hover {
      transition: transform .2s;
      transform: scale(1.1);
    }
  </style>
<div id="icons"></div>
`

/**
 * Define custom element.
 */
customElements.define('my-dock',
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

      // Default values.
      this.pathToModule = import.meta.url
      this.path = new URL('./icons/', this.pathToModule)
      this.icons = this.shadowRoot.querySelector('#icons')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Chat app icon
      this.chat = document.createElement('img')
      this.chat.setAttribute('src', `${this.path}chat.png`)
      this.chat.setAttribute('title', 'Chat app')
      this.chat.setAttribute('alt', 'my-messages-app')
      this.icons.appendChild(this.chat)
      // Memory game icon
      this.memory = document.createElement('img')
      this.memory.setAttribute('src', `${this.path}memorygame.png`)
      this.memory.setAttribute('title', 'Memory game app')
      this.memory.setAttribute('alt', 'my-memory-game')
      this.icons.appendChild(this.memory)
      // Memory game icon
      this.cam = document.createElement('img')
      this.cam.setAttribute('src', `${this.path}camera.png`)
      this.cam.setAttribute('title', 'Camera app')
      this.cam.setAttribute('alt', 'my-camera-app')
      this.icons.appendChild(this.cam)
      // Dispatch events to start apps
      this.chat.addEventListener('click', this._openApp)
      this.memory.addEventListener('click', this._openApp)
      this.cam.addEventListener('click', this._openApp)
    }

    /**
     * Dispatches an openApp event.
     *
     */
    _openApp () {
      this.dispatchEvent(new CustomEvent('openApp', {
        bubbles: true,
        composed: true,
        detail: { name: this.getAttribute('alt') }
      }))
    }
  }
)
