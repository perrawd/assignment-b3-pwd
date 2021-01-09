/**
 * The my-photo web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
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
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: auto 45px;
      grid-template-areas:
        "header"
        "footer";
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background:#ffffff;
    }
    img {
      width: 320px;
      height: 240px;
    }
    #photo {
      grid-area: header;
      padding: 12px;
    }
    footer {
      grid-area: footer;
    }
  </style>
  <div id="photo"></div>
  <footer></footer>
`

/**
 * Define custom element.
 */
customElements.define('my-photo',
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
      this._photo = this.shadowRoot.querySelector('#photo')

      // TODO: Maybee you need to define some default values here
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // TODO: Add your eventlisteners for mousedown, mouseup here. You also need to add mouseleave to stop writing
      //       when the mouse pointer leavs the bart board. This should stop the printing.
    }

    /**
     * Watches the attributes "text" and "speed" for changes on the element.
     *
     * @returns {Array} The observed attributes.
     *
     */
    static get observedAttributes () {
      // TODO: Add observer for text and speed.
      return ['src']
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
      if (name === 'src') {
        const img = document.createElement('img')
        img.setAttribute('src', newValue)
        this._photo.appendChild(img)
      }
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

    }
    // TODO: Add methods at will. The solution file will use the aditional: "_onWrite"
  }
)
