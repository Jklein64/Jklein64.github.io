const version = "v1"
self.addEventListener("install", e => {
    console.log("WORKER: install event in progress.")
    e.waitUntil(
        caches
        .open(`${version}::fundamentals`)
        .then(cache => cache.addAll([
            "/",
            "/js/common/deps.js"
        ]))
        .then(() => console.log("WORKER: install completed"))
    )
})

self.addEventListener("fetch", /** @type {(e: FetchEvent) => void} */ e => {
    // console.log("WORKER: fetch event in progress.")
    const { request } = e, { method, url } = request
    const localOrigin = globalThis.location.origin

    if (method === "GET" && !url.includes(localOrigin)) {
        // console.log(request.url)
        // const bad = res => Promise.reject(
        //     TypeError(`Response is not ok.  Recieved status ${res.status}`))

        // unpkg.com with `?module` can't handle relative `export * from`, and thinks it's absolute.
        const modified = new Request(request.url.replace("https://unpkg.com/lib", "https://unpkg.com/lit-html@1.3.0/lib"))

        e.respondWith(
            fetch(modified).then(response => {
                console.log(response.status, modified, response)
                return response
            }))
    }
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