const LiveTemp = "livetemp-v1"
const assets = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/index.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(LiveTemp).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })