/**
 * The high-score web component module.
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
    .message-board {
      width: 400px;
      height: auto;
      padding: 10px;
      padding-left: 20px;
      padding-right: 20px;
      margin: 10px;
      background-image: linear-gradient( 135deg, #FFF720 10%, #3CD500 100%);
      border: 3px solid black;
      border-radius: 15px;
      text-align: center;
      font-size: 2rem;
    }
    #trophy {
      font-size: 100px;
      text-shadow: 2px 2px #000000;
      padding: 5px;
      margin: 5px;
    }
  </style>
  <div class="message-board">
    <p>You completed the game in </p><br>
  </div>
  <div class="highscore-board">
      <p id="trophy">🏆</p>
      <button id="reset-button">Start over</button>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('high-score',
/**
 * A new HTMLElement class instance.
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
      this._messageBoard = this.shadowRoot.querySelector('.message-board')
      this._resetButton = this.shadowRoot.querySelector('#reset-button')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Sends 'resetgame' event if the player chooses to restart game
      this._resetButton.addEventListener('click', (event) => {
        event.preventDefault()
        const resetGame = new CustomEvent('resetgame', {
          bubbles: true,
          composed: true
        })
        this.dispatchEvent(resetGame)
      })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['tries', 'completedtime']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      // Sets background color to green if the player has completed game
      if (name === 'completedtime' && oldValue !== newValue) {
        this._messageBoard.textContent += `${this.getAttribute('completedtime')} seconds and with ${this.getAttribute('tries')} tries!`
      }
    }
  }
)
