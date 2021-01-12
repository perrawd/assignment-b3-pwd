/**
 * The Service Worker of the application.
 *
 * @author Per Rawdin <per.rawdin@student.lnu.se>
 * @version 1.0.0
 */

const version = '1.0.0'

/**
 * Caches assets on fetch.
 *
 * @param {object} request The request object.
 * @returns {object} The response object.
 */
const cachedFetch = async request => {
  try {
    // Try to fetch asset from the server and if success, clone the result.
    const response = await fetch(request)

    // Save the result in the cache.
    const cache = await self.caches.open(version)
    cache.put(request, response.clone())

    return response
  } catch (error) {
    console.info('ServiceWorker: Serving cached result')
    return self.caches.match(request)
  }
}

self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)

  event.respondWith(cachedFetch(event.request))
})

self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated version ', version)
})

self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetching')

  event.respondWith(cachedFetch(event.request))
})
