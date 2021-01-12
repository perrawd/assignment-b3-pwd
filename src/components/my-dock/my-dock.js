/**
 * The my-dock web component module.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

const ICONS_URL = new URL('./icons/', import.meta.url).href

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
<div id="icons">
    <img src=${ICONS_URL}chat.png id="chat" alt="my-messages-app" title="Chat app">
    <img src=${ICONS_URL}memorygame.png id="memory" alt="my-memory-game" title="Memory game app">
    <img src=${ICONS_URL}camera.png id="cam" alt="my-camera-app" title="Camera app">
</div>
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
      this.chat = this.shadowRoot.querySelector('#chat')
      this.memory = this.shadowRoot.querySelector('#memory')
      this.cam = this.shadowRoot.querySelector('#cam')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Dispatch events to start applications.
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
