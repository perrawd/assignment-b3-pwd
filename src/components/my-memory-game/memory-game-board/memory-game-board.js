/**
 * The memory-game-board web component module.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */
import '../card-tile'
import '../card-side'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
      margin: auto;
    }
    #container {
      margin: auto; 
      max-width: 500px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      display: grid;
      justify-items: center;
      align-items: center;
      grid-template-columns: 120px 120px 120px 120px;
    }
  }
</style>
<div id="container">
</div>
`

/**
 * Define custom element.
 */
customElements.define('memory-game-board',
  /**
   * Define custom element.
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
      // Declarations.
      this.container = this.shadowRoot.querySelector('#container')
      this.pathToModule = import.meta.url
      this.path = new URL('./images/', this.pathToModule)
      this.imgs = []
      this.matchingTiles = []
      this.matched = { matched: 0, possibilities: 0, tries: 0, totalTime: 0 }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Elapsed (total) time recorder
      this.elapsedTime = setInterval(() => {
        this.matched.totalTime += 1
      }, 1000)
      // Event listener cardflip
      this.container.addEventListener('cardflip', (event) => {
        event.target.checkbox.disabled = true
        event.target.setAttribute('class', 'flipped')
        this.matchingTiles.push(event.detail.message)
        this.flippedTiles()
      })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['grid']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'grid' && newValue) {
        // Set total possible matches
        this.matched.possibilities = (Number(newValue[0]) * Number(newValue[2])) / 2
        // Set CSS grid
        this.container.style.gridTemplateColumns = `repeat(${newValue[0]}, 120px`
        // Shuffle
        this.shuffleImages(newValue)
        // Add tiles and images to them
        for (let i = 0; i < (Number(newValue[0]) * Number(newValue[2])); i++) {
          const tile = document.createElement('card-tile')
          const img = document.createElement('img')
          img.setAttribute('src', `${this.path}${this.imgs[i]}.png`)
          tile.appendChild(img)
          this.container.appendChild(tile)
        }
      }
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // Stops the total game time recorder
      clearInterval(this.elapsedTime)
    }

    /**
     * Shuffle the tiles.
     *
     * @param {*} newValue The tiles that needs to be shuffled.
     */
    shuffleImages (newValue) {
      for (let i = 0; i < 2; i++) {
        for (let i = 0; i < (Number(newValue[0]) * Number(newValue[2])) / 2; i++) {
          this.imgs.push(i + 1)
        }
      }
      // Shuffle fisher yates
      for (let i = this.imgs.length - 1; i >= 0; i--) {
        const n = Math.floor(Math.random() * i)
        const y = this.imgs[n]
        this.imgs.splice(n, 1, this.imgs[i])
        this.imgs.splice(i, 1, y)
      }
    }

    /**
     * Game logic.
     *
     */
    flippedTiles () {
      const flippedCards = this.shadowRoot.querySelectorAll('.flipped')
      if (flippedCards.length === 2) {
        this.matched.tries += 1
        this.shadowRoot.querySelectorAll('card-tile').forEach(card => {
          if (!card.getAttribute('class', 'flipped')) {
            card.setAttribute('active', 'false')
          }
        })
        setTimeout(() => {
          flippedCards.forEach(card => {
            card.checkbox.checked = false
            card.classList.remove('flipped')
            this.shadowRoot.querySelectorAll('card-tile').forEach(card => card.setAttribute('active', 'true'))
          })
        }, 1500)
        // If flipped tiles match, remove them from the board
        if (flippedCards[0].isEqualNode(flippedCards[1])) {
          setTimeout(() => {
            flippedCards.forEach(card => card.setAttribute('visibility', false))
          }, 1500)
          // Check if all possible matches has been done.
          this.matched.matched += 1
          if (this.matched.matched === this.matched.possibilities) {
            this.dispatchEvent(new CustomEvent('gameCompleted', {
              bubbles: true,
              composed: true,
              detail: { message: this.matched }
            }))
          }
        } else {
          // Dispatch event if not matched.
          this.dispatchEvent(new CustomEvent('notMatched', {
            bubbles: true,
            composed: true,
            detail: { grid: '2x2' }
          }))
        }
      }
    }
  }
)
