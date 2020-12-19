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
    // e.waitUntil(async () => {
    console.log("WORKER: fetch event in progress.")
    const { request } = e, { method, url } = request
    const localOrigin = globalThis.location.origin

    if (method === "GET" && !url.includes(localOrigin)) {
        e.respondWith(async function() {
            // const cache = await caches.open(version)
            // const cached = await cache.match(request)
            // console.log({ cached })

            // if (cached) {
            //     console.log(`WORKER: using cached value for ${url}`)
            //     return cached
            // }

            try {
                console.log(request)
                const modified = new Request(request.url
                    .replace("https://unpkg.com/lib/",
                        "https://unpkg.com/lit-element@2.4.0/lib/"), {
                        keepalive: true,
                        referrer: request.referrer,
                        referrerPolicy: request.referrerPolicy
                    }
                )
                console.log("modified", modified)
                // const response = await fetch(request)
                // console.log({ response: response.clone() })
                // if (!response.ok) throw new TypeError(`bad response status: ${response.status}`)

                // cache.put(request, response.clone())
                return fetch(modified)
            } catch (error) {
                if (error instanceof TypeError) {
                    // likely unable to resolve
                    console.error("WORKER: ", error)
                    throw error
                } else {
                    throw error
                }
            }
        }())
    }
    // })
    // if (e.request.method === "GET") {
    //     e.respondWith(caches.match(e.request).then(cached => {
    //         const fetched = fetch(e.request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve)

    //         return cached || fetched

    //         function fetchedFromNetwork(response) {
    //             const copy = response.clone()
    //             caches
    //                 .open(`${version}::pages`)
    //                 .then(cache => cache.put(e.request, copy))
    //             return response
    //         }

    //         function unableToResolve() {
    //             return new Response("", {
    //                 status: 503,
    //             })
    //         }
    //     }))
    // }
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