const loader = document.querySelector(".mdc-linear-progress")

const linearProgress = new window.mdc.linearProgress.MDCLinearProgress(loader)

const quantity = {
    stops: undefined,
    routes: undefined
}

const stops = fetch(`https://find-a-bus-server.sites.tjhsst.edu/transitiq/Stops?${top(quantity.stops)}`)
    .then(raw => raw.json())
    .then(json => json.value)
    .catch(console.error)
    .then(v => {
        incrementValue(0.5);
        return v
    }, console.error)

const routes = fetch(`https://find-a-bus-server.sites.tjhsst.edu/transitiq/Routes?${top(quantity.routes)}`)
    .then(raw => raw.json())
    .then(json => json.value)
    .catch(console.error)
    .then(v => {
        incrementValue(0.5);
        return v
    }, console.error)

Promise.all([stops, routes]).then(([stops, routes]) => {
    window.sessionStorage.setItem("stops", JSON.stringify(stops))
    window.sessionStorage.setItem("routes", JSON.stringify(routes))
    next()
})


function incrementValue(increment) {
    const value = (() => {
        const valuenow = linearProgress.root.getAttribute("aria-valuenow")
        if (valuenow === null) return 0 + increment
        else return parseFloat(valuenow) + increment
    })()

    linearProgress.root.querySelector(".mdc-linear-progress__primary-bar").style.transform = `scaleX(${value})`
    linearProgress.root.setAttribute("aria-valuenow", `${value}`)
    linearProgress.root.classList.remove("mdc-linear-progress--indeterminate")
}

function top(value) {
    if (value) {
        return `$top${value}`
    } else {
        return ""
    }
}

function next() {
    setTimeout(() => {
        console.log("go to the next page!")
        const a = document.createElement("a")
        a.href = "destinations.html"
        a.click()
    }, 800)
}