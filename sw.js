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
    "url": "webpack-runtime-24b37fce993f0ad68447.js"
  },
  {
    "url": "styles.fe3c30b34f8e927524f3.css"
  },
  {
    "url": "styles-0dd9b16d06f2e4f550cc.js"
  },
  {
    "url": "framework-7656862d80676d58607a.js"
  },
  {
    "url": "app-9471fee1406f9a8d03b3.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "e9b1c72b812d89593c67f58b96663867"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-b3d32bc20641419cfed7.js"
  },
  {
    "url": "95cb632c25a65ea663d3791c042a721a3193f9cd-95dfb5f0f1bdfa30e561.js"
  },
  {
    "url": "component---src-pages-404-js-92a2f9b6ef055e542855.js"
  },
  {
    "url": "page-data/404/page-data.json",
    "revision": "885296f794bc4c06d05f9cb1f0a23695"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "09af950273887f80aba4e42759c91a63"
  },
  {
    "url": "d4ad233efeb1d959420253442063e6db7488fdeb-be428484e5bd284a9dc2.js"
  },
  {
    "url": "component---src-pages-index-js-40fc9a2629b7c52936da.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "16e6d67d0f38a6c526c4d983c7128c58"
  },
  {
    "url": "bb0e2423-ec29ba3e10a9290410a5.js"
  },
  {
    "url": "93e0200a61c4a4f2210dade405ec28ee7779575b-7567b6380ad3d66f5f60.js"
  },
  {
    "url": "component---src-pages-app-js-4aac25fe8fd8d05d7eef.js"
  },
  {
    "url": "page-data/app/page-data.json",
    "revision": "9179f5604b75572075377b39cb75255f"
  },
  {
    "url": "component---src-pages-about-js-2548540c11cb628f1eea.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "7b8bb68be84d2c186896cab5851dc279"
  },
  {
    "url": "component---src-pages-forgot-js-514118b7e7ef36f5fbf8.js"
  },
  {
    "url": "page-data/forgot/page-data.json",
    "revision": "4c4fbc86dd6f5e4b01d799a682ac785d"
  },
  {
    "url": "component---src-pages-login-js-991a2e96871374f9e88f.js"
  },
  {
    "url": "page-data/login/page-data.json",
    "revision": "3e439cbbe8d42b5b848333c3e62a8b06"
  },
  {
    "url": "component---src-pages-reset-password-js-cf2fa9c7997bfbf6ae89.js"
  },
  {
    "url": "page-data/resetPassword/page-data.json",
    "revision": "8601ccb49532b8b89b23e1c5abba0209"
  },
  {
    "url": "component---src-pages-signup-js-be8aed89c745c607bbbd.js"
  },
  {
    "url": "page-data/signup/page-data.json",
    "revision": "9e0600913974e57e35187ef479804995"
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
  if (!resources || !(await caches.match(`/app-9471fee1406f9a8d03b3.js`))) {
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

if (['Chrome', 'Firefox', 'Opera'].indexOf(currentBrowser) != -1) {
  // staging routes

  workbox.routing.registerRoute(
    /^https:\/\/transcribr2-api-staging\.herokuapp\.com\/clips/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'clip-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] }),
        new workbox.rangeRequests.Plugin(),
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 1209600
        }),
        new workbox.broadcastUpdate.Plugin({
          channelName: 'clip-cache-update'
        })
      ]
    }),
    'GET'
  )

  workbox.routing.registerRoute(
    /^https:\/\/transcribr2-api-staging\.herokuapp\.com\/users\/me/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'user-details-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] }),
        new workbox.rangeRequests.Plugin(),
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 1209600
        }),
        new workbox.broadcastUpdate.Plugin({
          channelName: 'user-details-cache-update'
        })
      ]
    }),
    'GET'
  )

  // production routes

  workbox.routing.registerRoute(
    /^https:\/\/transcribr2-api\.herokuapp\.com\/clips/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'clip-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] }),
        new workbox.rangeRequests.Plugin(),
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 1209600
        }),
        new workbox.broadcastUpdate.Plugin({
          channelName: 'clip-cache-update'
        })
      ]
    }),
    'GET'
  )

  workbox.routing.registerRoute(
    /^https:\/\/transcribr2-api\.herokuapp\.com\/users\/me/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'user-details-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] }),
        new workbox.rangeRequests.Plugin(),
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 1209600
        }),
        new workbox.broadcastUpdate.Plugin({
          channelName: 'user-details-cache-update'
        })
      ]
    }),
    'GET'
  )
} else {
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
}
