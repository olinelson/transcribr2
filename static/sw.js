
// import { registerRoute } from 'workbox-routing'
// import { NetworkFirst } from 'workbox-strategies'
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉')
} else {
  console.log('Boo! Workbox didn\'t load 😬')
}

// registerRoute(
//   /\.js$/,
//   new NetworkFirst()
// )
