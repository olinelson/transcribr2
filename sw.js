/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-008d5b202b0f8cda1af5.js"
  },
  {
    "url": "styles.610a6b9e99c506ffbbf5.css"
  },
  {
    "url": "styles-0dd9b16d06f2e4f550cc.js"
  },
  {
    "url": "framework-d58e6aa01b2ba4423f5b.js"
  },
  {
    "url": "app-4e8e90e29cecb7cdc51a.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "f5a4b32f5ccafbc1e1ece2105a24f1ca"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-53510201dcf61d0f1308.js"
  },
  {
    "url": "manifest.json",
    "revision": "d0a7aac8362d69d25caa1962fcd7e3af"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "7bd7efb26d96d6c4553df30a886fa7aa"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */

importScripts(`idb-keyval-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-4e8e90e29cecb7cdc51a.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)

// var CACHE_VERSION = 12

// // Shorthand identifier mapped to specific versioned cache.
// var CURRENT_CACHES = {
//   transcribr: 'transcribr-cache-v' + CACHE_VERSION
// }

// // self.addEventListener('install', function (event) {
// //   var urlsToPrefetch = [
// //     '/',
// //     '/404',
// //     '/about',
// //     '/app',
// //     '/forgot',
// //     '/index',
// //     '/login',
// //     '/resetPassword',
// //     '/signup'
// //     // The videos are stored remotely with CORS enabled.
// //     // 'https://prefetch-video-sample.storage.googleapis.com/gbike.webm',
// //     // 'https://prefetch-video-sample.storage.googleapis.com/gbike.mp4'
// //   ]

// //   // All of these logging statements should be visible via the "Inspect" interface
// //   // for the relevant SW accessed via chrome://serviceworker-internals
// //   console.log('Handling install event. Resources to prefetch:', urlsToPrefetch)

// //   self.skipWaiting()

// //   event.waitUntil(
// //     caches.open(CURRENT_CACHES.prefetch).then(function (cache) {
// //       return cache.addAll(urlsToPrefetch)
// //     })
// //   )
// // })

// self.addEventListener('activate', function (event) {
//   var expectedCacheNames = Object.values(CURRENT_CACHES)

//   // Active worker won't be treated as activated until promise
//   // resolves successfully.
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (!expectedCacheNames.includes(cacheName)) {
//             console.log('Deleting out of date cache:', cacheName)

//             return caches.delete(cacheName)
//           }
//         })
//       )
//     })
//   )
// })

// self.addEventListener('fetch', function (event) {
//   console.log('Handling fetch event for', event.request.url)

//   event.respondWith(

//     // Opens Cache objects that start with 'font'.
//     caches.open(CURRENT_CACHES.transcribr).then(function (cache) {
//       return cache.match(event.request).then(function (response) {
//         if (response) {
//           console.log('Found response in cache:', response)

//           return response
//         }

//         console.log('Fetching request from the network')

//         return fetch(event.request).then(function (networkResponse) {
//           cache.put(event.request, networkResponse.clone())

//           return networkResponse
//         })
//       }).catch(function (error) {
//         // Handles exceptions that arise from match() or fetch().
//         console.error('Error in fetch handler:', error)

//         throw error
//       })
//     })
//   )
// })

workbox.routing.registerRoute(
  /.*\.mp4/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200]
      }),
      new workbox.rangeRequests.RangeRequestsPlugin()
    ]
  }),
  'GET'
)
