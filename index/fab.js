import state from "../state.js"

const rangeFAB = document.getElementById("range-fab")
const destinationsFAB = document.getElementById("destinations-fab")

rangeFAB.addEventListener("click", () => state.rangeDialogOpen = true)
destinationsFAB.addEventListener("click", () => state.destinationsDrawerOpen = true)