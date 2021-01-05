/**
 * The card-tile web component module.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

import '../card-side/'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
<style>

#card {
  background-color: transparent;
  width: 100px;
  height: 100px;
  perspective: 1000px;
  align-items: center;
  margin: 10px;
}

#tile {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

#cardcheckbox:checked + #tile {
  transform: rotateY(180deg);
}

/* Hide the checkbox for focus and keyboard usage */
input[type="checkbox"] {
  position: absolute;
  height: 1px; 
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

/* Focus */
#cardcheckbox:focus + #tile {
  box-sizing: border-box;
  border-style: solid;
  border-width: medium;
  border-color: orange;
  border-radius: 10px;
  background-color: orange;
}

#front, #back {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

#front {
  transform: rotateY(180deg);
}

</style>
<div id="card">
  <label for="cardcheckbox">
  <input type="checkbox" id="cardcheckbox">
    <div id="tile">
      <card-side part="front" id="front">
        <slot></slot>
      </card-side>
      <card-side part="back" id="back">
        <slot></slot>
      </card-side>
    </div>
  </label>
</div>
`

/**
 * Define custom element.
 */
customElements.define('card-tile',
  /**
   * New class.
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
      // Declarations.
      this.checkbox = this.shadowRoot.querySelector('#cardcheckbox')
    }

    /**
     * Called when the component is added to the DOM.
     */
    connectedCallback () {
      // Event checked checkbox
      this.checkbox.addEventListener('change', () => {
        this.dispatchEvent(new CustomEvent('cardflip', {
          bubbles: true,
          composed: true,
          detail: {
            side: this.checkbox.checked
              ? 'Front'
              : 'Back',
            message: this.innerHTML
          }
        }))
      })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['active', 'visibility']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      // Deactivates card flipping and add dotted border to indicate
      if (name === 'active' && newValue === 'false') {
        this.checkbox.disabled = true
        this.shadowRoot.querySelector('#card').style.opacity = '0.7'
      } else if (name === 'active' && newValue === 'true') {
        this.checkbox.disabled = false
        this.shadowRoot.querySelector('#card').style.opacity = 'unset'
      }
      // Hides the card if 'visibility' attribute is 'false'.
      if (name === 'visibility' && newValue === 'false') {
        this.shadowRoot.querySelector('#card').style.visibility = 'hidden'
      }
    }
  }
)
