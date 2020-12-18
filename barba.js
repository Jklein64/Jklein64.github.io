import barba from "https://unpkg.com/@barba/core@2.9.7/dist/barba.mjs?module"
barba.init({
	views: [
		{
			namespace: "index",
			beforeEnter(data) {
				console.log(data)
				const fragment = document.createRange().createContextualFragment(data.next.html)
				const script = fragment.querySelector("script[data-dependencies]")
				const content = script.textContent.replace(/\n\t/g, "")
				import(`data:text/javascript, ${content}`).then(({ default: deps }) => {
					const promises = deps.map(dep => import(dep))
					Promise.all(promises).then(() => {
						console.log("loaded!")
					})
				})
			},
		},
	],
})
