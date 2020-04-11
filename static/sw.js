var CACHE_VERSION = 12

// Shorthand identifier mapped to specific versioned cache.
var CURRENT_CACHES = {
  transcribr: 'transcribr-cache-v' + CACHE_VERSION
}

// self.addEventListener('install', function (event) {
//   var urlsToPrefetch = [
//     '/',
//     '/404',
//     '/about',
//     '/app',
//     '/forgot',
//     '/index',
//     '/login',
//     '/resetPassword',
//     '/signup'
//     // The videos are stored remotely with CORS enabled.
//     // 'https://prefetch-video-sample.storage.googleapis.com/gbike.webm',
//     // 'https://prefetch-video-sample.storage.googleapis.com/gbike.mp4'
//   ]

//   // All of these logging statements should be visible via the "Inspect" interface
//   // for the relevant SW accessed via chrome://serviceworker-internals
//   console.log('Handling install event. Resources to prefetch:', urlsToPrefetch)

//   self.skipWaiting()

//   event.waitUntil(
//     caches.open(CURRENT_CACHES.prefetch).then(function (cache) {
//       return cache.addAll(urlsToPrefetch)
//     })
//   )
// })

self.addEventListener('activate', function (event) {
  var expectedCacheNames = Object.values(CURRENT_CACHES)

  // Active worker won't be treated as activated until promise
  // resolves successfully.
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (!expectedCacheNames.includes(cacheName)) {
            console.log('Deleting out of date cache:', cacheName)

            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  console.log('Handling fetch event for', event.request.url)

  event.respondWith(

    // Opens Cache objects that start with 'font'.
    caches.open(CURRENT_CACHES.transcribr).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        if (response) {
          console.log('Found response in cache:', response)

          return response
        }

        console.log('Fetching request from the network')

        return fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone())

          return networkResponse
        })
      }).catch(function (error) {
        // Handles exceptions that arise from match() or fetch().
        console.error('Error in fetch handler:', error)

        throw error
      })
    })
  )
})
