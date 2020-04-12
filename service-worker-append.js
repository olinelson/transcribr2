
if (workbox) {
  console.log('Yay! Workbox is loaded 🎉')
} else {
  console.log('Boo! Workbox didn\'t load 😬')
}

workbox.routing.registerRoute(
  /^https:\/\/storage\.googleapis\.com/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin()
    ]
  }),
  'GET'
)

workbox.routing.registerRoute(
  /^https:\/\/transcribr2-api-staging\.herokuapp\.com\/clips/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin()
    ]
  }),
  'GET'
)

// probblems with safari not working when crossorigin on video is 'anonymous'

// or

// works on chromium when this is not set
