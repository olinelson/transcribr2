
if (workbox) {
  console.log(workbox)
  console.log('Yay! Workbox is loaded 🎉')
} else {
  console.log('Boo! Workbox didn\'t load 😬')
}

workbox.routing.registerRoute(
  /^https:\/\/storage\.googleapis\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'media-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200, 206] }),
      new workbox.rangeRequests.Plugin(),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 1209600
      })
    ]
  }),
  'GET'
)

workbox.routing.registerRoute(
  /^https:\/\/transcribr2-api-staging\.herokuapp\.com\/clips/,
  new workbox.strategies.CacheFirst({
    cacheName: 'clip-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin(),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 1209600
      })
    ]
  }),
  'GET'
)
workbox.routing.registerRoute(
  /^https:\/\/transcribr2-api\.herokuapp\.com\/clips/,
  new workbox.strategies.CacheFirst({
    cacheName: 'clip-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin(),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 1209600
      })
    ]
  }),
  'GET'
)

// minor change

// probblems with safari not working when crossorigin on video is 'anonymous'

// or

// works on chromium when this is not set
