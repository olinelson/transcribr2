const getBrowserName = () => {
  let name = 'Unknown'
  if (navigator.userAgent.indexOf('MSIE') != -1) {
    name = 'MSIE'
  } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    name = 'Firefox'
  } else if (navigator.userAgent.indexOf('Opera') != -1) {
    name = 'Opera'
  } else if (navigator.userAgent.indexOf('Chrome') != -1) {
    name = 'Chrome'
  } else if (navigator.userAgent.indexOf('Safari') != -1) {
    name = 'Safari'
  } else if (navigator.userAgent.indexOf('Edge') != -1) {
    name = 'Edge'
  }
  return name
}

const clearCache = () => {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName)
    })
  })
}

const currentBrowser = getBrowserName()

if (workbox) {
  console.log(`Yay! Workbox is loaded  on ${currentBrowser} 🎉`)
} else {
  console.log(`Boo! Workbox didn\'t load on ${currentBrowser}😬`)
}

self.addEventListener('message', async (event) => {
  if (event.data === 'clearCache') {
    clearCache()
  }
})

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
// disabled for now due to performace while seeking...
// if (['Chrome', 'Firefox', 'Opera'].indexOf(currentBrowser) != -1) {
// staging routes

//   workbox.routing.registerRoute(
//     /^https:\/\/transcribr2-api-staging\.herokuapp\.com\/clips/,
//     new workbox.strategies.StaleWhileRevalidate({
//       cacheName: 'clip-cache',
//       plugins: [
//         new workbox.cacheableResponse.Plugin({ statuses: [200] }),
//         new workbox.rangeRequests.Plugin(),
//         new workbox.expiration.Plugin({
//           maxEntries: 20,
//           maxAgeSeconds: 1209600
//         }),
//         new workbox.broadcastUpdate.Plugin({
//           channelName: 'clip-cache-update'
//         })
//       ]
//     }),
//     'GET'
//   )

//   workbox.routing.registerRoute(
//     /^https:\/\/transcribr2-api-staging\.herokuapp\.com\/users\/me/,
//     new workbox.strategies.StaleWhileRevalidate({
//       cacheName: 'user-details-cache',
//       plugins: [
//         new workbox.cacheableResponse.Plugin({ statuses: [200] }),
//         new workbox.rangeRequests.Plugin(),
//         new workbox.expiration.Plugin({
//           maxEntries: 20,
//           maxAgeSeconds: 1209600
//         }),
//         new workbox.broadcastUpdate.Plugin({
//           channelName: 'user-details-cache-update'
//         })
//       ]
//     }),
//     'GET'
//   )

//   // production routes

//   workbox.routing.registerRoute(
//     /^https:\/\/transcribr2-api\.herokuapp\.com\/clips/,
//     new workbox.strategies.StaleWhileRevalidate({
//       cacheName: 'clip-cache',
//       plugins: [
//         new workbox.cacheableResponse.Plugin({ statuses: [200] }),
//         new workbox.rangeRequests.Plugin(),
//         new workbox.expiration.Plugin({
//           maxEntries: 20,
//           maxAgeSeconds: 1209600
//         }),
//         new workbox.broadcastUpdate.Plugin({
//           channelName: 'clip-cache-update'
//         })
//       ]
//     }),
//     'GET'
//   )

//   workbox.routing.registerRoute(
//     /^https:\/\/transcribr2-api\.herokuapp\.com\/users\/me/,
//     new workbox.strategies.StaleWhileRevalidate({
//       cacheName: 'user-details-cache',
//       plugins: [
//         new workbox.cacheableResponse.Plugin({ statuses: [200] }),
//         new workbox.rangeRequests.Plugin(),
//         new workbox.expiration.Plugin({
//           maxEntries: 20,
//           maxAgeSeconds: 1209600
//         }),
//         new workbox.broadcastUpdate.Plugin({
//           channelName: 'user-details-cache-update'
//         })
//       ]
//     }),
//     'GET'
//   )
// } else {
// SAFARI IMPLEMENTATION

// staging routes

workbox.routing.registerRoute(
  /^https:\/\/transcribr2-api-staging\.herokuapp\.com\/clips/,
  new workbox.strategies.NetworkFirst({
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
  /^https:\/\/transcribr2-api-staging\.herokuapp\.com\/users\/me/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'user-details-cache',
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

// production routes

workbox.routing.registerRoute(
  /^https:\/\/transcribr2-api\.herokuapp\.com\/clips/,
  new workbox.strategies.NetworkFirst({
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
  /^https:\/\/transcribr2-api\.herokuapp\.com\/users\/me/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'user-details-cache',
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
// }
