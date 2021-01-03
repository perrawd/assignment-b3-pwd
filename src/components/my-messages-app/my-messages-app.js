/**
 * The bart-board web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 2.0.0
 */

// import { io } from 'socket.io-client'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
    width: 700px;
    height: 500px;
    display: grid;
    grid-template-columns: 150px auto auto auto;
    grid-template-rows: 40px 360px 100px;
    grid-template-areas:
        "info header header header"
        "nav  main   main  main"
        "nav  form form form";

    }
    #info {
      grid-area: info;
      background-color: #350d36;
      padding: 5px;
    }
    header {
      background-color: #350d36;
      grid-area: header;
    }
    nav {
      background-color: #3F0E40;
      grid-area: nav;
      color: #ffffff;
      padding: 5px;
    }
    main {
      background-color: #ffffff;
      grid-area: main;
      padding: 5px;
      overflow: auto;
    }
    #form {
      background-color: #ffffff;
      grid-area: form;
      padding: 5px;
    }
  </style>
  <div id="info">INFO</div>
  <header>HEADER</header>
  <nav>#wp20</nav>
  <main>MAIN</main>
  <div id="form">
  <form id="textform">
    <textarea id="textinput" name="textform" placeholder="Skriv ditt meddelande till oss här" rows="5" cols="50"></textarea>
    <button type="submit">SEND</button>
  </form>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('my-messages-app',
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

      // Socket.IO
      this.socket = new WebSocket('wss://cscloud6-127.lnu.se/socket/')

      // Get the p-element in which we add the text.
      this._main = this.shadowRoot.querySelector('main')
      this._textForm = this.shadowRoot.querySelector('#textform')
      this._textInput = this.shadowRoot.querySelector('#textinput')

      // TODO: Maybee you need to define some default values here
      // IndexedDB
      this.request = indexedDB.open('mydatabase', 1)
      this.request.onerror = function(event) {
        console.error(event)
      };
      this.request.onupgradeneeded = function(event) {
        const db = event.target.result
      
        // the ObjectStore
        const objectStore = db.createObjectStore('messages')
      }
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
      this._textForm.addEventListener('submit', (e) => {
        e.preventDefault()
        this.sendText()
        this._textInput.value = ''
      })

      /**
       * Called by the browser engine when an attribute changes.
       *
       * @param {any} e the new attribute value.
       */
      this.socket.onopen = (e) => {
        console.log(e)
      }

      /**
       * Called by the browser engine when an attribute changes.
       *
       * @param {any} event the new attribute value.
       */
      this.socket.onmessage = (event) => {
        console.log(event.data)
        const msg = JSON.parse(event.data)
        const senderText = document.createElement('p')
        let d = new Date()
        d = d.toLocaleString('sv-SE')
        senderText.textContent = `${msg.username}: ${msg.data} (${d})`
        this._main.appendChild(senderText)
        // Open IndexedDB transaction
        const db = this.request.result
        const transaction = db.transaction(['messages'], 'readwrite')
        const objectStore = transaction.objectStore('messages')
        // Add message to IndexedDB
        if (msg.username !== 'The Server') {
        objectStore.add({ name: msg.username, message: msg.data, date: d }, d)
        }
      }
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // TODO: Remove your eventlisterners here.
      this.socket.close()
    }

    /**
     * Stops the writing.
     *
     */
    sendText () {
      const msg = {
        type: 'message',
        data: this._textInput.value,
        username: 'MyFancyUsername',
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      // Send the message
      this.socket.send(JSON.stringify(msg))
    }

    /**
     * Wipes the board clean and resets the letter counter.
     */
    clear () {
      // TODO: Implement the method
    }
    // TODO: Add methods at will. The solution file will use the aditional: "_onWrite"
  }
)
