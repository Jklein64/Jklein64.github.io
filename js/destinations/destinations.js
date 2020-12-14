// #region Material-ui setup
import location from "./location.js"
import { register } from "./stops.js"

const el = document.querySelector(".mdc-top-app-bar")
const appbar = new window.mdc.topAppBar.MDCTopAppBar(el)

const fab = document.querySelector(".mdc-fab")
window.mdc.ripple.MDCRipple.attachTo(fab)
fab.addEventListener("click", () => {
	document.body.classList.toggle("destinations")
})

const listItem = document.getElementById("list-item").content

const mask = document.getElementById("mask")
mask.addEventListener("click", () => document.body.classList.toggle("destinations"))
// #endregion

// #region Destinations list
location.then(coords => {
	register(stops => {
		document.querySelector(".mdc-list").append(
			...stops.map(stop => {
				const el = listItem.cloneNode(true)
				el.querySelector("[class*='primary']").textContent = stop.Name
				el.querySelector("[class*='secondary']").textContent = `${
					Math.round(getDistance(coords.lat, coords.long, stop.Lat, stop.Lon) * 100) / 100
				} miles away`
				return el
			})
		)
	})
})

const list = new window.mdc.list.MDCList(document.querySelector(".mdc-list"))
list.listElements.map(el => new window.mdc.ripple.MDCRipple(el))
// #endregion

function getDistance(lat1, lon1, lat2, lon2) {
	const deg2rad = deg => deg * (Math.PI / 180)
	let R = 6371 // Radius of the earth in km
	let dLat = deg2rad(lat2 - lat1) // deg2rad below
	let dLon = deg2rad(lon2 - lon1)
	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	let d = R * c // Distance in km
	return d * 0.621371 // distance in mi
}
