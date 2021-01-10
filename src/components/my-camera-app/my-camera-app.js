/**
 * The my-camera-app web component module.
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
      background-color: #000000;
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
  <div id="controls"></div>
`

/**
 * Define custom element.
 */
customElements.define('my-camera-app',
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

      // Path to module
      this.pathToModule = import.meta.url
      this.path = new URL('./', this.pathToModule)

      // Initialization.
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
      // Start video stream.
      this._camera()
      // Add camera shutter button
      this.shutter = document.createElement('img')
      this.shutter.setAttribute('src', `${this.path}images/shutter_button.svg`)
      this.shutter.setAttribute('title', 'Shutter button')
      this.shutter.setAttribute('id', 'shutter')
      this._constrols.appendChild(this.shutter)
      this.shutter.addEventListener('click', () => {
        try {
          this._takePhoto()
        } catch (error) {
          console.error(error)
        }
      })
    }

    /**
     * Starts the camera application, calls MediaDevices.getUserMedia() and requests a video stream.
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
     * Captures a frame from the video stream.
     */
    _takePhoto () {
      // Captures the frame.
      const context = this._canvas.getContext('2d')
      this._canvas.width = 640
      this._canvas.height = 480
      context.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height)
      const data = this._canvas.toDataURL('image/png')
      // Play shutter sound.
      this._shutterSound.play()
      // Dispatch a custom event with the frame taken.
      this.dispatchEvent(new CustomEvent('photo', {
        bubbles: true,
        composed: true,
        detail: { photo: data }
      }))
    }

    /**
     * Stops the video stream.
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
  }
)
