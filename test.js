import loadDeps from "./dependencies.js"

document.querySelectorAll("a[href^='/']").forEach(el => {
	el.addEventListener("click", async e => {
		e.preventDefault()
		e.stopPropagation()
		const url = e.path.find(node => node instanceof HTMLAnchorElement).href
		loadDeps(url).then(() => {
			console.log("loaded callback!")
		})
	})
})
