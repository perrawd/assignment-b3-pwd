/**
 * The my-desktop web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 2.0.0
 */
import '../my-dock/'
import '../my-about-app/'
import '../my-window/'
/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      width: 100%;
      height: 100%;
      min-height: 100%;
      background: url(images/bg.jpg) no-repeat center center fixed; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }
    p {
      margin: 0;
      padding: 0;
    }
    #item {
      position: absolute;
      width: 500px;
      height: 500px;
      background-color: #ffffff;
      contain: content;
      left: 0;
    }
  </style>
<my-dock></my-dock>
  <p part="text">hello</p>
  <div id="item"></div>
  <my-window></my-window>
`

/**
 * Define custom element.
 */
customElements.define('my-desktop',
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
      this._textElement = this.shadowRoot.querySelector('p')

      // TODO: Maybee you need to define some default values here
      this.item = this.shadowRoot.querySelector('#item')
      this.about = this.shadowRoot.querySelector('my-about-app')
      this.window = this.shadowRoot.querySelector('my-window')
      this.z = 0
    }

    /**
     * Watches the attributes "text" and "speed" for changes on the element.
     *
     * @returns {Array} The observed attributes.
     *
     */
    static get observedAttributes () {
      // TODO: Add observer for text and speed.
      return ['text', 'speed']
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
      if (name === 'text') { this.text = newValue + ' ' }
      if (name === 'speed') { this.speed = newValue }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // TODO: Add your eventlisteners for mousedown, mouseup here. You also need to add mouseleave to stop writing
      //       when the mouse pointer leavs the bart board. This should stop the printing.
      this.item.addEventListener('mousedown', this.moveWindow)
      // this.about.addEventListener('mousedown', this.moveWindow)
      this.window.addEventListener('mousedown', this.moveWindow)
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // TODO: Remove your eventlisterners here.
    }

    /**
     * Stops the writing.
     *
     * @param {*} event The event.
     */
    moveWindow (event) {
      // TODO: Implement the method
      this.addEventListener('mousemove', mousemove)
      this.addEventListener('mouseup', mouseup)
      this.addEventListener('ondragover', restore)

      let prevX = event.clientX
      let prevY = event.clientY

      /**
       * Stops the writing.
       *
       * @param {*} event The event.
       */
      function mousemove (event) {
        this.focus()
        console.log(this.parentNode)
        this.style.zIndex = '99'
        this.style.position = 'absolute'
        const newX = prevX - event.clientX
        const newY = prevY - event.clientY
        const rect = this.getBoundingClientRect()
        console.log(rect)
        // Desktop offsetheight
        console.log(this.parentNode.host.offsetHeight)
        if (rect.y <= 0) { dispatchEvent(new Event('ondragover')) }
        this.style.left = rect.left - newX + 'px'
        this.style.top = rect.top - newY + 'px'

        prevX = event.clientX
        prevY = event.clientY
      }

      /**
       * Stops the writing.
       *
       * @param {*} event The event.
       */
      function mouseup (event) {
        this.style.zIndex = 'auto'
        this.removeEventListener('mousemove', mousemove)
        this.removeEventListener('mouseup', mouseup)
      }

      /**
       * Stops the writing.
       *
       */
      function restore () {
        this.style.left = '0'
      }
    }

    /**
     * Wipes the board clean and resets the letter counter.
     */
    clear () {
      // TODO: Implement the method
      this._textElement.textContent = ''
      this.i = 0
    }
    // TODO: Add methods at will. The solution file will use the aditional: "_onWrite"
  }
)
