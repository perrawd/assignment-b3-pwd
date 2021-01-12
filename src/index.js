/**
 * The main script file of the application.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @version 1.0.0
 */

// Service Worker registration.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js')
      console.log('ServiceWorker: Registration sucessful with score: ', registration.scope)
    } catch (error) {
      console.error('ServiceWorker: Registration failed: ', error)
    }
  })
}

// Restart Desktop application.
window.addEventListener('restart', () => {
  const newApp = document.createElement('my-desktop')
  document.body.replaceChild(newApp, document.querySelector('my-desktop'))
})
