/**
 * The my-about-app web component module.
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
      background: #ffe259;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to top, #ffa751, #ffe259);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to top, #ffa751, #ffe259); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      width:400px;
      height:400px;
      padding: 10px;
      text-align: center;
    }
    p {
      font-size: small;
    }
    .credits {
      font-size: x-small;
    }
  </style>
  <img src="./images/lnu-symbol.png" id="logo">
  <h1>Personal Web Desktop</h1>
  <p>1DV025 Assignment B3</p>
  <p>Per Rawdin</p>
  <p class="credits">2020-2021</p>
  <p class="credits">Credits</p>
  <p class="credits">PWD: https://www.w3schools.com/howto/howto_js_draggable.asp & sweetalert2</p>
  <p class="credits">Chat app: emoji-picker-element & popperjs</p>
`

/**
 * Define custom element.
 */
customElements.define('my-about-app',
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
