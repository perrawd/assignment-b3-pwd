/**
 * The my-camera-app web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
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
      width: 640px;
      height: auto;
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 20px 480px 80px;
      grid-template-areas:
        "header"
        "video"
        "control";
      margin: 0;
      padding: 0;
    }
    header {
      grid-area: header;
      background-color: #000000;
      color: #ffd500;
      text-align: center;
      font-size: small;
    }
    #video {
      grid-area: video;
      background-color: #ffffff;
    }
    #controls {
      grid-area: control;
      background-color: #000000;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #shutter {
      border: 2px solid #ffffff;
      color: white;
      padding: 7px;
      text-align: center;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      border-radius: 50%;
    }
    #canvas {
      display: none;
    }
  </style>

  <header>You're on camera, Smile :)</header>
  <video id="video">Video stream not available.</video>
  <canvas id="canvas"></canvas>
  <div id="controls">
  </div>
`

/**
 * Define custom element.
 */
customElements.define('my-camera-app',
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

      // TODO: Maybee you need to define some default values here
      this.pathToModule = import.meta.url
      this.path = new URL('./', this.pathToModule)

      // Get the p-element in which we add the text.
      this._textElement = this.shadowRoot.querySelector('p')
      this._constrols = this.shadowRoot.querySelector('#controls')
      this._video = this.shadowRoot.querySelector('#video')
      this._canvas = this.shadowRoot.querySelector('#canvas')
      this._constrols = this.shadowRoot.querySelector('#controls')
      this._shutterSound = new Audio(`${this.path}audio/camera-shutter.mp3`)
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.shutter = document.createElement('img')
      this.shutter.setAttribute('src', `${this.path}images/shutter_button.svg`)
      this.shutter.setAttribute('title', 'Shutter button')
      this.shutter.setAttribute('id', 'shutter')
      this._constrols.appendChild(this.shutter)
      // TODO: Add your eventlisteners for mousedown, mouseup here. You also need to add mouseleave to stop writing
      //       when the mouse pointer leavs the bart board. This should stop the printing.
      // Start video
      console.log(this._video.width)
      this._camera()
      // Camera shutter
      this.shutter.addEventListener('click', () => {
        try {
          this._takePhoto()
          console.log('photo taken!')
        } catch (error) {
          console.error(error)
        }
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    _camera () {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this._video.srcObject = stream
          this._video.play()
        })
        .catch((err) => {
          console.log('An error occurred: ' + err)
        })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    _takePhoto () {
      const context = this._canvas.getContext('2d')
      this._canvas.width = 640
      this._canvas.height = 480
      context.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height)
      const data = this._canvas.toDataURL('image/png')
      // play shutter sound
      this._shutterSound.play()
      // custom event
      this.dispatchEvent(new CustomEvent('photo', {
        bubbles: true,
        composed: true,
        detail: { photo: data }
      }))
    }

    /**
     * Called after the element has been removed from the DOM.
     *
     * @param {object} videoElement the video element.
     */
    _stopCamera (videoElement) {
      const stream = videoElement.srcObject
      const tracks = stream.getTracks()

      tracks.forEach((track) => {
        track.stop()
      })

      videoElement.srcObject = null
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // Stop the video stream.
      this._stopCamera(this._video)
    }

    /**
     * Stops the writing.
     *
     */
    stopWriting () {
      // TODO: Implement the method
    }

    /**
     * Wipes the board clean and resets the letter counter.
     */
    clear () {
      // TODO: Implement the method
    }
    // TODO: Add methods at will. The solution file will use the aditional: "_onWrite"

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
  }
)
