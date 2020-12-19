import state from "../common/state.js"

const dialog = document.getElementById("range-dialog").firstElementChild
const distance = dialog.querySelector(".distance")
const slider = document.getElementById("range-slider")
const confirm = dialog.querySelector("mwc-button[slot*='primary']")
const cancel = dialog.querySelector("mwc-button[slot*='secondary']")

slider.addEventListener("input", e => {
    distance.textContent = e.target.value
})

confirm.addEventListener("click", () => state.range = parseInt(distance.textContent))
cancel.addEventListener("click", () => {
    distance.textContent = state.range
    slider.value = state.range
})

dialog.addEventListener("opened", function oneShot() {
    dialog.removeEventListener("opened", oneShot)
    slider.layout()
})

state.subscribe("rangeDialogOpen", openState => dialog.open = openState)
dialog.addEventListener("closed", () => state.rangeDialogOpen = false)