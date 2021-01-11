/**
 * The main script file of the application.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

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
