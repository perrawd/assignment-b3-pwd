/**
 * The my-about-app web component module.
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
      display: block;
      background: #ffe259;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to top, #ffa751, #ffe259);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to top, #ffa751, #ffe259); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      width:400px;
      height:400px;
      padding: 10px;
      text-align: center;
    }
    p {
      font-size: small;
    }
    .credits {
      font-size: x-small;
    }
  </style>
  <img src="./images/lnu-symbol.png" id="logo">
  <h1>Personal Web Desktop</h1>
  <p>1DV025 Assignment B3</p>
  <p>Per Rawdin</p>
  <p class="credits">2020-2021</p>
  <p class="credits">Credits</p>
  <p class="credits">PWD: https://www.w3schools.com/howto/howto_js_draggable.asp & sweetalert2</p>
  <p class="credits">Chat app: emoji-picker-element & popperjs</p>
`

/**
 * Define custom element.
 */
customElements.define('my-about-app',
/**
 * HTMLElement class.
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
    }
  }
)
