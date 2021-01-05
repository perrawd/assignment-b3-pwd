/**
 * The card-side web component module.
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
    display: flex;
    width: 140px;
    height: 140px;
    border-style: solid;
    border-width: medium;
    border-color: #000000;
    border-radius: 10px;
    background-color: #ffff00;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  ::slotted(*) {
  max-width: 100%;
  max-height: 100%:
  }
  </style>
  <slot></slot>
`

/**
 * Define custom element.
 */
customElements.define('card-side',
  /**
   * Define class.
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
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['part']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      // Sets back side default to lnu image
      if (name === 'part' && newValue === 'back') {
        this.shadowRoot.host.style.backgroundImage = 'url("./images/lnu-symbol.png")'
      }
    }
  }
)
