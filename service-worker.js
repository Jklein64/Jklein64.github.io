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
        const bad = res => Promise.reject(
            TypeError(`Response is not ok.  Recieved status ${res.status}`))
        // console.log("request", request)
        const modified = new Request(request.url
            .replace("https://unpkg.com/lib/updating-element.js?module", "https://unpkg.com/lit-element@2.4.0/lib/updating-element.js?module")
            .replace("https://unpkg.com/lib/css-tag.js?module", "https://unpkg.com/lit-element@2.4.0/lib/css-tag.js?module")
            .replace("https://unpkg.com/lib/decorators.js?module", "https://unpkg.com/lit-element@2.4.0/lib/decorators.js?module")
            .replace("https://unpkg.com/blocking-elements@%5E0.1.0?module", "https://unpkg.com/blocking-elements@0.1.1/dist/blocking-elements.js?module")
            /* .replace(/%5E/g, "") */
            , {
                referrer: request.referrer,
                referrerPolicy: request.referrerPolicy,
                destination: request.destination,
                ...request
            }
        )
        console.log(request)
        // e.respondWith(
        fetch(request).then(
            res => res.status === 0 || res.ok ? (() => {
                console.log(res.status, request, res)
                return Promise.resolve(res)
            })() : bad(res),
            console.error
        ).catch(reason => {
            console.error(reason)
        })
        // )
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