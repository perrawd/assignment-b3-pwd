/**
 * The desktop-bar web component module.
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
    }
    #topbar {
      width: auto;
      height: 25px;
      background-color: #000000;
      opacity: 80%;
      margin: 0;
      padding: 0;
      border: none;
      color: #ffffff;
      box-sizing:border-box;
      text-align:center;
      padding: 5px;
      z-index: 1000;
    }
    p {
      margin: 0;
      padding: 0;
    }
    #about{
      position: absolute;
      left: 5px;
      top: 3px;
      filter: invert(1);
      height: 17px;
    }
    img:focus {
    outline: 2px solid blue;
    }
  </style>

  <div id="topbar"></div>
  <input type="image" src="./images/lnu-symbol.png" id="about" alt="about" title="About"/>
`

/**
 * Define custom element.
 */
customElements.define('my-desktop-bar',
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

      // Get the p-element in which we add the text.
      this._clock = this.shadowRoot.querySelector('#topbar')
      this._about = this.shadowRoot.querySelector('#about')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      setInterval(() => {
        this._clock.textContent = this.currentTime()
      }, 1000)
      // Open my-about-app
      this._about.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('openApp', {
          bubbles: true,
          composed: true,
          detail: { name: 'my-about-app' }
        }))
      })
    }

    /**
     *
     * The current time.
     *
     * @returns {string} The current time in HH:MM format.
     */
    currentTime () {
      const currentTime = new Date()
      // const currentDate = currentTime.toLocaleString('sv-SE').slice(0, 10)
      return currentTime.toLocaleString('sv-SE').slice(11, 16)
    }
  }
)
