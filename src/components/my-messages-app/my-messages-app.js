/**
 * The bart-board web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

// import { io } from 'socket.io-client'
// import { openDB, deleteDB, wrap, unwrap } from 'idb'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
    width: auto;
    height: auto;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: 25px 360px 100px;
    grid-template-areas:
        "header header header"
        "main   main   main"
        "form   form   form";
    }
    #info {
      grid-area: info;
      background-color: #350d36;
      padding: 5px;
    }
    header {
      grid-area: header;
      background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      border-bottom: 1px solid #7e7e7e;
      text-align: center;
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
      max-width: 500px;
    }
    #form {
      grid-area: form;
      display: grid;
      background-color: #EEEEEE;
      padding: 5px;
      border-top: 1px solid #7e7e7e;
      grid-template-columns: auto auto auto;
      grid-template-areas:
        "textform textform buttons"
    }
    #textarea {
      grid-area: textform;
    }
    #textinput {
      outline: none;
      resize: none;
      white-space: nowrap;
      border-radius: 5px;
    }
    #buttons {
      grid-area: buttons;
    }
    #btn {
      box-sizing: border-box;
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 7px 16px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 10px;
      margin: 0;
      border-radius: 5px;
    }
  </style>
  <header>#wp20</header>
  <main>MAIN</main>
  <div id="form">
    <div id="textarea">
      <form id="textform">
        <textarea id="textinput" name="textform" placeholder="Skriv ditt meddelande till oss här" rows="5" cols="50" required></textarea>
      </form>
    </div>
    <div id="buttons">
      <button type="submit" id="btn" form="textform">SEND</button>
    </div>
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
      this.arr = []

      // TODO: Maybee you need to define some default values here
      // IndexedDB
      this.request = indexedDB.open('mydatabase', 1)
      /**
       * Called if there was an error opening the database.
       *
       * @param {object} event the event.
       */
      this.request.onerror = function (event) {
        console.error(event)
      }
      /**
       * Called if database upgrade is needed.
       *
       * @param {object} event the event.
       */
      this.request.onupgradeneeded = function (event) {
        const db = event.target.result
        // the ObjectStore
        db.createObjectStore('messages')
        db.createObjectStore('username')
      }
      /**
       * Called when database onsucess. Get messages.
       *
       * @param {object} event the event.
       */
      this.request.onsuccess = function (event) {
        this.getMessages(event)
        this.getUsername(event)
      }.bind(this)
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
      console.log(this.arr)
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
       * On message received from websocket.
       *
       * @param {any} event the event.
       */
      this.socket.onmessage = (event) => {
        console.log(event.data)
        const msg = JSON.parse(event.data)
        const senderText = document.createElement('p')
        let d = new Date()
        d = d.toLocaleString('sv-SE')
        senderText.textContent = `${msg.username}: ${msg.data} (${d})`
        this._main.appendChild(senderText)
        // Scroll bottom
        this._main.scrollTop = this._main.scrollHeight
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
        username: this._userName,
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      // Send the message
      this.socket.send(JSON.stringify(msg))
    }

    /**
     * Get previous messages from IndexedDB.
     *
     * @param {object} event the event.
     */
    getMessages (event) {
      const db = event.target.result
      const transaction = db.transaction(['messages'])
      const objectStore = transaction.objectStore('messages')
      const result = objectStore.getAll()
      /**
       * Get messages from database.
       *
       * @param {object} event the event.
       */
      result.onsuccess = function (event) {
        console.log(this)
        const result = event.target.result
        result.forEach((message) => {
          this.addMessage(message)
        })
      }.bind(this)
    }

    /**
     * Get username from IndexedDB.
     *
     * @param {object} event the event.
     */
    getUsername (event) {
      const db = event.target.result
      const transaction = db.transaction(['username'])
      const objectStore = transaction.objectStore('username')
      const result = objectStore.getAll()
      /**
       * Get username from database.
       *
       * @param {object} event the event.
       */
      result.onsuccess = function (event) {
        if (!event.target.result.length) {
          this.addUsername()
        } else {
          this._userName = event.target.result[0].name
        }
      }.bind(this)
    }

    /**
     * Wipes the board clean and resets the letter counter.
     *
     * @param {object} msg of the attribute.
     */
    addMessage (msg) {
      const senderText = document.createElement('p')
      senderText.textContent = `${msg.name}: ${msg.message} (${msg.date})`
      this._main.appendChild(senderText)
    }

    /**
     * Add username if there is none in IndexedDB.
     *
     */
    addUsername () {
      const db = this.request.result
      const transaction = db.transaction(['username'], 'readwrite')
      const objectStore = transaction.objectStore('username')
      const username = prompt('Please input your username')
      objectStore.add({ name: username }, 'username1')
      this._userName = objectStore.get(0).name
    }
  }
)
