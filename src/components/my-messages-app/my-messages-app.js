/**
 * The my-messages-app web component module.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */
import 'emoji-picker-element'
import { createPopper } from '@popperjs/core'
import Swal from 'sweetalert2'

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
      background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
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
      border-radius: 5px;
      margin: 5px;
    }
    #emojibtn {
      box-sizing: border-box;
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 7px 16px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 10px;
      border-radius: 5px;
      margin: 5px;
    }
    .tooltip:not(.shown) {
      display: none;
    }
    .bubble {
      display: block;
      padding: 5px;
      max-width: 250px;
      margin: 10px;
      overflow-wrap: break-word;
    }
    .sender {
      color: #000000;
      font-weight: bold;
      font-size: small;
    }
    .message {
      color: #ffffff;
    }
    .date {
      font-size: xx-small;
    }
    .me {
      justify-content: start;
      justify-items: start;
      background: #43CC47; 
      border-radius: 10px 10px 10px 0;
    }
    .row {
      display: flex;
      width: 100%;
    }
    .row .you {
      margin-left: auto;
      justify-content: end;
      justify-items: end;
      background: #1982FC; 
      border-radius: 10px 10px 0 10px;
    }
  </style>
  <header></header>
  <main></main>
  <div id="form">
    <div id="textarea">
      <form id="textform">
        <textarea id="textinput" name="textform" placeholder="Message #wp20" rows="5" cols="40" wrap="hard" required></textarea>
      </form>
    </div>
    <div id="buttons">
      <button type="submit" id="btn" form="textform">SEND</button>
      <br>
      <button id="emojibtn">😀</button>
      <div class="tooltip" role="tooltip">
        <emoji-picker></emoji-picker>
      </div>
    </div>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('my-messages-app',
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

      // Web Socket init.
      this.socket = new WebSocket('wss://cscloud6-127.lnu.se/socket/')

      // Get the p-element in which we add the text.
      this._main = this.shadowRoot.querySelector('main')
      this._textForm = this.shadowRoot.querySelector('#textform')
      this._textInput = this.shadowRoot.querySelector('#textinput')
      this._emojiButton = this.shadowRoot.querySelector('#emojibtn')
      this._emojiPicker = this.shadowRoot.querySelector('.tooltip')

      // IndexedDB
      this.request = indexedDB.open('mydatabase', 1)
      /**
       * Called if there was an error opening the database.
       *
       * @param {object} event The event object.
       */
      this.request.onerror = (event) => {
        console.error(event)
      }
      /**
       * Called if database upgrade is needed.
       *
       * @param {object} event The event object.
       */
      this.request.onupgradeneeded = (event) => {
        const db = event.target.result
        // the ObjectStore
        db.createObjectStore('messages')
        db.createObjectStore('username')
      }
      /**
       * Called when database onsucess. Get messages and username.
       *
       * @param {object} event The event object.
       */
      this.request.onsuccess = (event) => {
        this._getUsername(event)
        this._getMessages(event)
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Emoji picker
      createPopper(this._emojiButton, this._emojiPicker, {
        placement: 'right-start'
      })
      this._emojiButton.addEventListener('click', () => {
        this._emojiPicker.classList.toggle('shown')
      })
      this.shadowRoot.querySelector('emoji-picker').addEventListener('emoji-click', (event) => {
        this._textInput.value += event.detail.unicode
      })

      // Send message on submit.
      this._textForm.addEventListener('submit', (event) => {
        event.preventDefault()
        this._sendText()
      })
      // Submit on Enter key.
      this._textInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          this._sendText()
        }
      })

      /**
       * Called by the browser engine when an attribute changes.
       *
       * @param {any} event the new attribute value.
       */
      this.socket.onopen = (event) => {
        console.log(event)
      }

      /**
       * On message received from Web Socket.
       *
       * @param {any} event The event object.
       */
      this.socket.onmessage = (event) => {
        // Add message to conversation element.
        const message = JSON.parse(event.data)
        let date = new Date()
        date = date.toLocaleString('sv-SE')
        message.date = date
        this._addMessage(message)
        // Scroll to focus on bottom conversation element.
        this._main.scrollTop = this._main.scrollHeight
        // Open IndexedDB transaction.
        const db = this.request.result
        const transaction = db.transaction(['messages'], 'readwrite')
        const objectStore = transaction.objectStore('messages')
        // Add message to IndexedDB.
        if (message.username !== 'The Server') {
          objectStore.add({ username: message.username, data: message.data, date: message.date }, date)
        }
      }
    }

    /**
     * Send message to Web Socket.
     *
     */
    _sendText () {
      const message = {
        type: 'message',
        data: this._textInput.value,
        username: this._userName,
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      // Send the message
      this.socket.send(JSON.stringify(message))
      this._textInput.value = ''
    }

    /**
     * Get previous messages from IndexedDB.
     *
     * @param {object} event The event object.
     */
    _getMessages (event) {
      // Open IndexedDB transaction.
      const db = event.target.result
      const transaction = db.transaction(['messages'])
      const objectStore = transaction.objectStore('messages')
      const result = objectStore.getAll()
      /**
       * Get messages from database.
       *
       * @param {object} event the event.
       */
      result.onsuccess = (event) => {
        const result = event.target.result
        result.forEach((message) => {
          this._addMessage(message)
        })
      }
    }

    /**
     * Add message to conversations element from indexedDB.
     *
     * @param {object} message The message object.
     */
    _addMessage (message) {
      // Create bubble.
      const messagerow = document.createElement('div')
      messagerow.classList.add('row')
      const bubble = document.createElement('div')
      bubble.classList.add('bubble')
      if (message.username === this._userName) {
        bubble.classList.add('me')
      } else {
        bubble.classList.add('you')
      }
      // Add name of sender.
      const sender = document.createElement('div')
      sender.classList.add('sender')
      sender.textContent = `${message.username}`
      bubble.appendChild(sender)
      // Add message.
      const msg = document.createElement('div')
      msg.classList.add('message')
      msg.textContent = `${message.data}`
      bubble.appendChild(msg)
      // Add date.
      const date = document.createElement('div')
      date.classList.add('date')
      date.textContent = `${message.date}`
      // Add message to conversations.
      bubble.appendChild(date)
      messagerow.appendChild(bubble)
      this._main.appendChild(messagerow)
    }

    /**
     * Get username from IndexedDB.
     *
     * @param {object} event The IndexedDB event object.
     */
    _getUsername (event) {
      // Open IndexedDB transaction.
      const db = event.target.result
      const transaction = db.transaction(['username'])
      const objectStore = transaction.objectStore('username')
      const result = objectStore.getAll()
      /**
       * Get username from database.
       *
       * @param {object} event The event object.
       */
      result.onsuccess = (event) => {
        if (!event.target.result.length) {
          this._addUsername()
        } else {
          this._userName = event.target.result[0].name
        }
      }
    }

    /**
     * Add username if there is none in IndexedDB.
     *
     */
    async _addUsername () {
      const { value: username } = await Swal.fire({
        title: 'Please input your username',
        input: 'text',
        inputPlaceholder: 'Enter your username',
        backdrop: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        inputAttributes: {
          required: true
        }
      })
      // Open IndexedDB transaction.
      const db = this.request.result
      const transaction = db.transaction(['username'], 'readwrite')
      const objectStore = transaction.objectStore('username')
      objectStore.add({ name: username }, 'user0')
      const result = objectStore.get('user0')
      /**
       * Set username from database.
       *
       * @param {object} event The event object.
       */
      result.onsuccess = (event) => {
        this._userName = event.target.result.name
      }
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // Close web-socket.
      this.socket.close()
    }
  }
)
