/**
 * The grid-menu web component module.
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
      margin: auto;
      display: grid;
      justify-items: center;
      align-items: center;
      text-align: center;
    }
    #container {
      width: auto;
      max-width: 500px;
      display: grid;
      justify-items: center;
      align-items: center;
      grid-template-columns: 120px 120px 120px;
    }
    button {
      background-color: #4CAF50;
      border: none;
      border-radius: 15px;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }
  }
</style>
<p>
  <h1>MEMORY GAME</h1>
</p>
<p>
  Please click on type of game to start
</p>
<div id="container">
    <button id="twoByTwo">2x2</button>
    <button id="fourByTwo">4x2</button>
    <button id="fourByFour">4x4</button>
</div>
`

/**
 * Define custom element.
 */
customElements.define('grid-menu',
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
      // Declarations.
      this.twoByTwo = this.shadowRoot.querySelector('#twoByTwo')
      this.fourByTwo = this.shadowRoot.querySelector('#fourByTwo')
      this.fourByFour = this.shadowRoot.querySelector('#fourByFour')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Event listener buttons
      this.twoByTwo.addEventListener('click', (event) => {
        event.preventDefault()
        this.dispatchEvent(new CustomEvent('grid', {
          bubbles: true,
          composed: true,
          detail: { grid: '2x2' }
        }))
      })

      this.fourByTwo.addEventListener('click', (event) => {
        event.preventDefault()
        this.dispatchEvent(new CustomEvent('grid', {
          bubbles: true,
          composed: true,
          detail: { grid: '4x2' }
        }))
      })

      this.fourByFour.addEventListener('click', (event) => {
        event.preventDefault()
        this.dispatchEvent(new CustomEvent('grid', {
          bubbles: true,
          composed: true,
          detail: { grid: '4x4' }
        }))
      })
    }
  }
)
