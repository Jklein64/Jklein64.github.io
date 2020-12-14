const el = document.querySelector(".mdc-top-app-bar")
const appbar = new window.mdc.topAppBar.MDCTopAppBar(el)

const fab = document.querySelector(".mdc-fab")
window.mdc.ripple.MDCRipple.attachTo(fab)
fab.addEventListener("click", () => {
    document.body.classList.toggle("destinations")
})

const listItem = document.getElementById("list-item").content
const stops = JSON.parse(window.sessionStorage.getItem("stops"))
document.querySelector(".mdc-list").append(...stops.map(stop => {
    const el = listItem.cloneNode(true)
    el.querySelector("[class*='primary']").textContent = stop.Name
    return el
}))

const list = new window.mdc.list.MDCList(document.querySelector(".mdc-list"))
list.listElements.map(el => new window.mdc.ripple.MDCRipple(el))

const mask = document.getElementById("mask")
mask.addEventListener("click", () => document.body.classList.toggle("destinations"))