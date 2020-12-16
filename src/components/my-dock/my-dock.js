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
      display: inline-block;
      background:#000000;
      color: #ffffff;
      text-align: center;
      width:50%;
      height:70px;
      border: 2px solid #ffffff;
      border-radius: 10px;
      margin-left: auto;
      margin-right: auto;
      position: fixed;
      bottom: 0;
      right: 50%;
    }
  </style>

  <p part="text">MY DOCK</p>
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
