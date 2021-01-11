const version = '1.0.0'

/**
 * Caches assets on fetch.
 *
 * @param {*} request The request.
 * @returns {*} The cached assets.
 */
const cachedFetch = async request => {
  try {
    // Try to fetch asset from the server and if success, clone the result.
    const response = await fetch(request)

    // Save the result in the cache.
    const cache = await caches.open(version)
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

self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetching')

  event.respondWith(cachedFetch(event.request))
})

self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated version ', version)
})
