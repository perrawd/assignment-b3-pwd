/**
 * The desktop-bar web component module.
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
  </style>

  <div id="topbar"></div>
  
`

/**
 * Define custom element.
 */
customElements.define('my-desktop-bar',
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
      this._textElement = this.shadowRoot.querySelector('#topbar')

      // TODO: Maybee you need to define some default values here
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      setInterval(() => {
        this.clock()
      }, 1000)
    }

    /**
     *
     * The time.
     */
    clock () {
      let currentTime = new Date()
      let currentDate = currentTime.toLocaleString('sv-SE').slice(0, 10)
      console.log(currentDate)
      currentTime = currentTime.toLocaleString('sv-SE').slice(11, 16)
      this._textElement.textContent = currentTime
    }
  }
)
