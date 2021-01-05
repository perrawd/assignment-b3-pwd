/**
 * The my-desktop web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 2.0.0
 */
import '../my-dock/'
import '../my-about-app/'
import '../my-window/'
import '../my-messages-app/'
import '../my-memory-game/my-memory-game/'
/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      padding: 1px;
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
    p {
      margin: 0;
      padding: 0;
    }
    #item {
      position: absolute;
      width: 500px;
      height: 500px;
      background-color: #ffffff;
      contain: content;
      left: 0;
    }
  </style>
<my-dock></my-dock>
  <p part="text">hello</p>
  <my-window app="my-about-app"></my-window>
  <my-window app="my-memory-game"></my-window>
`

/**
 * Define custom element.
 */
customElements.define('my-desktop',
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
      this.window = this.shadowRoot.querySelector('my-window')
      this.windowHeader = this.shadowRoot.querySelector('my-window').shadowRoot.querySelector('#window')
      this.chat = this.shadowRoot.querySelector('my-messages-app')
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
      // this.item.addEventListener('mousedown', this.moveWindow)
      // this.about.addEventListener('mousedown', this.moveWindow)
      // this.windowHeader.addEventListener('mousedown', this.moveWindow)
      this.addEventListener('close', (event) => {
        console.log(event.detail.window)
        const thisWindow = event.detail.window
        this.shadowRoot.removeChild(thisWindow)
      })
      this.addEventListener('openApp', (event) => {
        console.log(event.detail.name)
        const myWindow = document.createElement('my-window')
        myWindow.setAttribute('app', event.detail.name)
        this.shadowRoot.appendChild(myWindow)
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // TODO: Remove your eventlisterners here.
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
