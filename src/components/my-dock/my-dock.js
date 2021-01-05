/**
 * The my-dock web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 2.0.0
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
      width:500px;
      height:60px;
      border: 3px solid #000000;
      border-radius: 10px;
      position: fixed;
      bottom: 0;
      margin: auto;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 100;
    }
    #icons {
      max-height: 55px;
    }
    img {
      max-height: 55px;
    }

    img:hover {
      transition: transform .2s;
      transform: scale(1.3);
    }
  </style>
<div id="icons"><div>
`

/**
 * Define custom element.
 */
customElements.define('my-dock',
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
      this._textElement = this.shadowRoot.querySelector('p')

      // TODO: Maybee you need to define some default values here
      this.icons = this.shadowRoot.querySelector('#icons')
      this.pathToModule = import.meta.url
      this.path = new URL('./icons/', this.pathToModule)
    }

    /**
     * Watches the attributes "text" and "speed" for changes on the element.
     *
     * @returns {Array} The observed attributes.
     *
     */
    static get observedAttributes () {
      // TODO: Add observer for text and speed.
      return ['text', 'speed']
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
      if (name === 'text') { this.text = newValue + ' ' }
      if (name === 'speed') { this.speed = newValue }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // TODO: Add your eventlisteners for mousedown, mouseup here. You also need to add mouseleave to stop writing
      //       when the mouse pointer leavs the bart board. This should stop the printing.
      this.chat = document.createElement('img')
      this.chat.setAttribute('src', `${this.path}chat.png`)
      this.chat.setAttribute('title', 'Chat app')
      this.icons.appendChild(this.chat)
      this.memory = document.createElement('img')
      this.memory.setAttribute('src', `${this.path}memorygame.png`)
      this.memory.setAttribute('title', 'Memory game app')
      this.icons.appendChild(this.memory)
      this.chat.addEventListener('click', (e) => {
        this.dispatchEvent(new CustomEvent('openApp', {
          bubbles: true,
          composed: true,
          detail: { name: 'my-messages-app' }
        }))
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // TODO: Remove your eventlisterners here.
      this.removeEventListener('mousedown', this._onWrite)
      this.removeEventListener('mouseup', this.stopWriting)
      this.removeEventListener('mouseleave', this.stopWriting)
    }

    /**
     * Stops the writing.
     *
     */
    stopWriting () {
      // TODO: Implement the method
      clearTimeout(this.timeoutID)
    }

    /**
     * Wipes the board clean and resets the letter counter.
     */
    clear () {
      // TODO: Implement the method
      this._textElement.textContent = ''
      this.i = 0
    }
    // TODO: Add methods at will. The solution file will use the aditional: "_onWrite"
  }
)
