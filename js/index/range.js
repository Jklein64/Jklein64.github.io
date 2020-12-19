import state from "../common/state.js"

const dialog = document.getElementById("range-dialog").firstElementChild
const confirm = dialog.querySelector("mwc-button[slot*='primary']")
const cancel = dialog.querySelector("mwc-button[slot*='secondary']")
const slider = document.getElementById("range-slider")
const distance = dialog.querySelector(".distance")


// Range dialog
confirm.addEventListener("click", () => state.range = parseInt(distance.textContent))
cancel.addEventListener("click", () => (distance.textContent = state.range, slider.value = state.range))

dialog.addEventListener("closed", () => state.rangeDialogOpen = false)
dialog.addEventListener("opened", function oneShot() {
    dialog.removeEventListener("opened", oneShot)
    state.range = slider.getAttribute("value")
    slider.layout()
})

state.subscribe("rangeDialogOpen", openState => dialog.open = openState)


// Range slider
slider.addEventListener("input", e => setRangeContent(e.target.value))
state.subscribe("range", setRangeContent)

function setRangeContent(range) {
    distance.textContent = range
    const miles = distance.nextElementSibling
    miles.textContent = range > 1 ? "miles" : "mile"
}