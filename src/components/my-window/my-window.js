/**
 * The my-window web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
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
    #window {
      /*
      border-top: 25px solid red;
      */
    }
    #close {
      width: 18px;
      height: 18px;
      text-align: center;
      background: rgb(131,58,180);
      background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
      display: inline-block;
      border-radius: 50%;
      margin: 1px
    }
    #close:hover {
      cursor: default;
    }
    img {
      
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
 * Define custom element.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the p-element in which we add the text.
      this._windowBar = this.shadowRoot.querySelector('#window')
      this._closeButton = this.shadowRoot.querySelector('#close')
      // Close button
      this.pathToModule = import.meta.url
      this.path = new URL('./img/', this.pathToModule)
      console.log(this.path)
      const img = document.createElement('img')
      img.setAttribute('src', `${this.path}close.png`)
      img.setAttribute('height', '18px')
      img.setAttribute('width', '18px')
      this._closeButton.appendChild(img)
    }

    /**
     * Watches the attributes "text" and "speed" for changes on the element.
     *
     * @returns {Array} The observed attributes.
     *
     */
    static get observedAttributes () {
      // TODO: Add observer for text and speed.
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
      // TODO: Add your code for handling updates and creation of the observed attributes.
      if (name === 'app') {
        const addApp = document.createElement(newValue)
        this.shadowRoot.appendChild(addApp)
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // TODO: Add your eventlisteners for mousedown, mouseup here. You also need to add mouseleave to stop writing
      //       when the mouse pointer leavs the bart board. This should stop the printing.
      // Default z-index
      this.style.zIndex = 100
      // this._windowBar.addEventListener('mousedown', this.moveWindow)
      this.dragWindow(this)
      this._closeButton.addEventListener('click', (e) => {
        this.dispatchEvent(new CustomEvent('close', {
          bubbles: true,
          composed: true,
          detail: { window: this }
        }))
      })
    }

    /**
     * Makes windows draggable across dekstop within viewport.
     * Code for draggable windows inspired by https://www.w3schools.com/howto/howto_js_draggable.asp.
     * Viewport code by me.
     *
     * @param {string} window of the attribute.
     */
    dragWindow (window) {
      // const that = this
      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0

      /**
       * On mousedown.
       *
       * @param {string} event of the attribute.
       */
      const dragMouseDown = (event) => {
        this.shadowRoot.host.parentNode.querySelectorAll('my-window').forEach(app => (app.style.zIndex = Number(app.style.zIndex) - 1))
        this.style.zIndex = '200'
        event = event || window.event
        event.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = event.clientX
        pos4 = event.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = windowDrag
      }

      /**
       * Moves the window.
       *
       * @param {string} event The event.
       */
      const windowDrag = (event) => {
        event = event || window.event
        event.preventDefault()
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
          // calculate the new cursor position:
          pos1 = pos3 - event.clientX
          pos2 = pos4 - event.clientY
          pos3 = event.clientX
          pos4 = event.clientY
          // set the element's new position:
          this.style.top = (this.offsetTop - pos2) + 'px'
          this.style.left = (this.offsetLeft - pos1) + 'px'
        }
      }

      /**
       * Stop moving when mouse button is released.
       *
       */
      function closeDragElement () {
        document.onmouseup = null
        document.onmousemove = null
      }

      // The window bar of which
      this._windowBar.onmousedown = dragMouseDown
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // TODO: Remove your eventlisterners here.
    }

    /**
     * Stops the writing.
     *
     */
    stopWriting () {
      // TODO: Implement the method
    }

    /**
     * Wipes the board clean and resets the letter counter.
     */
    clear () {
      // TODO: Implement the method
    }

    // TODO: Add methods at will. The solution file will use the aditional: "_onWrite"
  }
)
