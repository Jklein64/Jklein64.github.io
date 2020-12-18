const parser = new DOMParser()

/**
 * Given a url of a local page, return a Promise of it and its dependencies.
 * @param {string} localURL
 */
export default async function (localURL) {
	const text = await fetch(localURL).then(raw => raw.text())
	const html = parser.parseFromString(text, "text/html")
	const dependencies = await getDependencies(html)
	console.log("done loading deps!")
	return dependencies
}

/**
 * Get the dependencies, if any, from a document
 * @param {Document} document
 */
async function getDependencies(document) {
	const dependencies = document.querySelector("script[data-dependencies]")
	if (dependencies) {
		const script = dependencies.textContent.replace(/\n\t/g, "")
		const depsList = await import(`data:text/javascript, ${script}`)
		return Promise.all(depsList.default.map(dep => import(dep)))
	} else {
		return []
	}
}
