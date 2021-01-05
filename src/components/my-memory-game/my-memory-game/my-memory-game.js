/**
 * The my-memory-game web component module.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

import '../memory-game-board/'
import '../grid-menu/'
import '../high-score/high-score'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      margin: auto;
      width: 600px;
      background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);
    }
    #container {
      margin: auto;
      padding: 10px;
      width: 550px;
      height: 500px;
      background: #C6FFDD;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to bottom, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to bottom, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  </style>
  <div id="container">
    <grid-menu></grid-menu>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('my-memory-game',
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
      this.container = this.shadowRoot.querySelector('#container')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['message']
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.addEventListener('grid', (event) => {
        this.gridSelector(event)
      })
      // Game completed
      this.addEventListener('gameCompleted', (event) => {
        // Create high score component
        const highScore = document.createElement('high-score')
        this.container.replaceChild(highScore, this.shadowRoot.querySelector('memory-game-board'))
        highScore.setAttribute('tries', event.detail.message.tries)
        highScore.setAttribute('completedtime', event.detail.message.totalTime)
      })
      // Reset game
      this.addEventListener('resetgame', (event) => {
        const gridMenu = document.createElement('grid-menu')
        this.container.replaceChild(gridMenu, this.shadowRoot.querySelector('high-score'))
      })
    }

    /**
     * Run the specified instance property
     * through the class setter.
     *
     * @param {*} event - The event.
     */
    gridSelector (event) {
      const gameBoard = document.createElement('memory-game-board')
      this.container.replaceChild(gameBoard, this.shadowRoot.querySelector('grid-menu'))
      this.shadowRoot.querySelector('memory-game-board').setAttribute('grid', event.detail.grid)
    }
  }
)
