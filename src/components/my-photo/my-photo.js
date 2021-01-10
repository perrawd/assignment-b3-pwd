/**
 * The my-photo web component module.
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

      // Get the element in which the image is added to.
      this._photo = this.shadowRoot.querySelector('#photo')
    }

    /**
     * Watches the attributes "src" for changes on the element.
     *
     * @returns {Array} The observed attributes.
     *
     */
    static get observedAttributes () {
      // Observer for src.
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
      // Adds the picture to the DOM from the attribute as an img element.
      if (name === 'src') {
        const img = document.createElement('img')
        img.setAttribute('src', newValue)
        this._photo.appendChild(img)
      }
    }
  }
)
