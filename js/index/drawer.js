import state from "../common/state.js"

const drawer = document.getElementById("drawer")
drawer.addEventListener("MDCDrawer:closed", () => state.destinationsDrawerOpen = false)
state.subscribe("destinationsDrawerOpen", openState => drawer.open = openState)