const version = "v1"
self.addEventListener("install", e => {
    console.log("WORKER: install event in progress.")
    e.waitUntil(
        caches
        .open(`${version}::internal`)
        .then(cache => cache.addAll([
            "",
            "/",
            "index.html",
            "js/common/deps.js",
            "js/common/barba.js",
            "js/common/state.js",
            "js/index/destinations.js",
            "js/index/drawer.js",
            "js/index/fab.js",
            "js/index/range.js",
        ]))
        .then(() => console.log("WORKER: install completed"))
    )
})

self.addEventListener("fetch", /** @type {(e: FetchEvent) => void} */ async e => {
    const { request } = e

    e.respondWith(async function() {
        const cache = await caches.open(`${version}::external`)
        const cached = await cache.match(request)

        if (cached) {
            return cached
        } else {
            const response = await fetch(request)
            cache.put(request, response.clone())
            console.log(response)
            return response
        }
    }())
})

self.addEventListener("activate", e => {
    console.log("WORKER: activate event in progress.")
    e.waitUntil(
        caches
        .keys()
        .then(keys => Promise.all(
            keys
            .filter(key => !key.startsWith(version))
            .map(key => caches.delete(key))
        ))
    )
})