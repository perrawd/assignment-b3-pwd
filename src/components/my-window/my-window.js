/**
 * The my-window web component module.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */
import '../my-about-app/'
import '../my-messages-app/'
import '../my-memory-game/my-memory-game/'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      position: absolute;
      display: inline-block;
      background: rgba(000, 000, 000, 0.85); 
      border: 3px solid rgba(000, 000, 000, 0.85);
      border-radius: 7px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      top: 30px;
      left: 1px;
    }
    #close {
      width: 18px;
      height: 18px;
      text-align: center;
      display: inline-block;
      margin: 1px
    }
    #close:hover {
      cursor: default;
    }
  </style>
  <div part="window" id="window">
    <div id="close"></div>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('my-window',
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
      this._windowBar = this.shadowRoot.querySelector('#window')
      this._closeButton = this.shadowRoot.querySelector('#close')
      // Add close button.
      this.pathToModule = import.meta.url
      this.path = new URL('./img/', this.pathToModule)
      const img = document.createElement('img')
      img.setAttribute('src', `${this.path}close.png`)
      img.setAttribute('height', '18px')
      img.setAttribute('width', '18px')
      this._closeButton.appendChild(img)
    }

    /**
     * Watches the attribute "app" for applying sub-application.
     *
     * @returns {Array} The observed attributes.
     *
     */
    static get observedAttributes () {
      // Add observer for app.
      return ['app']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      // Attaches the specified sub-application component to the window.
      if (name === 'app') {
        const addApp = document.createElement(newValue)
        this.shadowRoot.appendChild(addApp)
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Default z-index
      this.style.zIndex = 100
      // Start dragWindow method for the window.
      this._dragWindow(this)
      // Close window.
      this._closeButton.addEventListener('click', (e) => {
        this.dispatchEvent(new CustomEvent('closeApp', {
          bubbles: true,
          composed: true,
          detail: { window: this }
        }))
      })
    }

    /**
     * Makes windows draggable across the desktop within viewport.
     * Code for draggable windows inspired by https://www.w3schools.com/howto/howto_js_draggable.asp.
     * Viewport and focus code by me.
     *
     * @param {string} window of the attribute.
     */
    _dragWindow (window) {
      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0

      /**
       * On mousedown.
       *
       * @param {string} event The event object.
       */
      const dragMouseDown = (event) => {
        // Set top focus on windowbar mousedown...
        this.style.zIndex = '200'
        // and decrease focus on all other windows.
        this.shadowRoot.host.parentNode.querySelectorAll('my-window').forEach(app => (app.style.zIndex = Number(app.style.zIndex) - 1))
        // Default event values.
        event = event || window.event
        event.preventDefault()
        // Get the mouse cursor position at startup:
        pos3 = event.clientX
        pos4 = event.clientY
        document.onmouseup = closeDragElement
        // Call a function whenever the cursor moves:
        document.onmousemove = windowDrag
      }

      /**
       * Moves the window.
       *
       * @param {string} event The event object.
       */
      const windowDrag = (event) => {
        event = event || window.event
        event.preventDefault()
        // Viewport limits
        if (this.getBoundingClientRect().y <= 0) {
          this.style.top = '1px'
          closeDragElement()
        } else if (this.getBoundingClientRect().x <= 0) {
          this.style.left = '1px'
          closeDragElement()
        } else if (this.getBoundingClientRect().right >= document.documentElement.clientWidth) {
          this.style.left = (document.documentElement.clientWidth - this.offsetWidth - 1) + 'px'
          closeDragElement()
        } else if (this.getBoundingClientRect().bottom >= document.documentElement.clientHeight) {
          this.style.top = (document.documentElement.clientHeight - this.offsetHeight - 1) + 'px'
          closeDragElement()
        } else {
          // Set the new cursor position:
          pos1 = pos3 - event.clientX
          pos2 = pos4 - event.clientY
          pos3 = event.clientX
          pos4 = event.clientY
          // Set element new position:
          this.style.top = (this.offsetTop - pos2) + 'px'
          this.style.left = (this.offsetLeft - pos1) + 'px'
        }
      }

      /**
       * Stop moving when mouse button is released.
       *
       */
      const closeDragElement = () => {
        document.onmouseup = null
        document.onmousemove = null
      }

      // The window bar onmousedown to activate the function.
      this._windowBar.onmousedown = dragMouseDown
    }
  }
)
