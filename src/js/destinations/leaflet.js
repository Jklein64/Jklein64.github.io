import location from "./location.js"
import { register, setFilter } from "./stops.js"

location.then(coords => {
	const map = L.map("map-container").setView([coords.lat, coords.long], 16)

	L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 20,
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: "pk.eyJ1IjoidHJlZTY0IiwiYSI6ImNraW8xejV5bjE4dTAycnA3aDU1ZjIwc3cifQ.bu1aynLIxGn4qOmLHtST3Q",
	}).addTo(map)

	register(stops =>
		stops.map(stop => ({
			id: stop.Id,
			shape: L.marker([stop.Lat, stop.Lon], {}).addTo(map),
		}))
	)
	// L.circle([coords.lat, coords.long], {
	//     color: 'red',
	//     fillColor: '#f03',
	//     fillOpacity: 0.5,
	//     radius: 15
	// }).addTo(map);
})
