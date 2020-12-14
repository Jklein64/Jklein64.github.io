const stops = Array.from(JSON.parse(window.sessionStorage.getItem("stops")))

const callbacks = []

let filter = () => true
export const setFilter = newFilter => {
	filter = newFilter
	callbacks.forEach(callback => callback(stops.filter(filter)))
}

export const register = callback => {
	callbacks.push(callback)
	setFilter(filter)
}

setFilter(filter)
