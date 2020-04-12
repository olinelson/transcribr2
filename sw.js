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
    "url": "webpack-runtime-17382ea988ba438d2d31.js"
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
    "url": "app-0274878c86fa5c913e0e.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "767fb5a5192f9a01e184c6e52650b6cf"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-53510201dcf61d0f1308.js"
  },
  {
    "url": "95cb632c25a65ea663d3791c042a721a3193f9cd-96ce6531bc649682296f.js"
  },
  {
    "url": "component---src-pages-404-js-89b6b2ee0e9e48e8a1f9.js"
  },
  {
    "url": "page-data/404/page-data.json",
    "revision": "885296f794bc4c06d05f9cb1f0a23695"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "fb3ded7ae17dbec09822e28ad3558b3d"
  },
  {
    "url": "d4ad233efeb1d959420253442063e6db7488fdeb-be428484e5bd284a9dc2.js"
  },
  {
    "url": "component---src-pages-index-js-c3990ad0d4cf698f13c7.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "16e6d67d0f38a6c526c4d983c7128c58"
  },
  {
    "url": "bb0e2423-1900570e2e5d327feda0.js"
  },
  {
    "url": "ad895f8b1e5b0a5c811318d367d3d00489b852d5-7567b6380ad3d66f5f60.js"
  },
  {
    "url": "component---src-pages-app-js-51c297afc1b982c38885.js"
  },
  {
    "url": "page-data/app/page-data.json",
    "revision": "9179f5604b75572075377b39cb75255f"
  },
  {
    "url": "component---src-pages-about-js-af9f669da02740c4590c.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "7b8bb68be84d2c186896cab5851dc279"
  },
  {
    "url": "fc064ac90949da06f863575e936272b4fffde84f-3ef226b3b9f8801d0fd2.js"
  },
  {
    "url": "component---src-pages-forgot-js-e68ccefaf9e69509232c.js"
  },
  {
    "url": "page-data/forgot/page-data.json",
    "revision": "4c4fbc86dd6f5e4b01d799a682ac785d"
  },
  {
    "url": "component---src-pages-login-js-141f1a88065914f6b24f.js"
  },
  {
    "url": "page-data/login/page-data.json",
    "revision": "3e439cbbe8d42b5b848333c3e62a8b06"
  },
  {
    "url": "component---src-pages-reset-password-js-86f43b16b21ffda597a9.js"
  },
  {
    "url": "page-data/resetPassword/page-data.json",
    "revision": "8601ccb49532b8b89b23e1c5abba0209"
  },
  {
    "url": "component---src-pages-signup-js-9195e3657b9c6a241e73.js"
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
  if (!resources || !(await caches.match(`/app-0274878c86fa5c913e0e.js`))) {
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


if (workbox) {
  console.log(workbox)
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
