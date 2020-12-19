import state from "../state.js"

const undefinedElements = document.querySelectorAll(":not(:defined)")
const promises = Array.prototype.map.call(undefinedElements, el => customElements.whenDefined(el.localName))

Promise.all(promises).then(() => {
    const dialog = document.getElementById("range-dialog").firstElementChild
    const distance = dialog.querySelector(".distance")
    const slider = document.getElementById("range-slider")
    const confirm = dialog.querySelector("mwc-button[slot*='primary']")
    const cancel = dialog.querySelector("mwc-button[slot*='secondary']")

    let oldRange = state.range
    slider.addEventListener("input", e => state.range = e.target.value)
    confirm.addEventListener("click", () => oldRange = state.range)
    cancel.addEventListener("click", () => state.range = oldRange)

    state.subscribe("range", range => {
        distance.textContent = range
        if (slider.value !== range)
            slider.value = range
        console.dir(slider.mdcFoundation)
        console.dir(slider)
    })


    dialog.addEventListener("opened", function oneShot() {
        dialog.removeEventListener("opened", oneShot)
        slider.layout()
    })

    state.subscribe("rangeDialogOpen", openState => dialog.open = openState)
    dialog.addEventListener("closed", () => state.rangeDialogOpen = false)
})