const worker = JSON.parse(document.documentElement.getAttribute("data-worker"))
if (worker) {
    if ("serviceWorker" in window.navigator) {
        console.log("CLIENT: service worker registration in progress.")
        navigator.serviceWorker.register("/service-worker.js").then(
            () => console.log("CLIENT: service worker registration complete."),
            reason => console.error("CLIENT: service worker registration failure.", reason)
        )
    } else {
        console.warn("CLIENT: service worker is not supported.  This page may not behave as expected.")
    }
}