importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.routing.registerRoute(
    /\.(?:html|js|css|png|jpg|jpeg|ico|json)$/,
    new workbox.strategies.StaleWhileRevalidate()
  );
} else {console.log(`Boo! Workbox didn't load 😬`);}