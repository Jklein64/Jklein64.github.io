const template = document.getElementById("destination-template")
const destinations = document.getElementById("destinations-list")
destinations.append(...new Array(15).fill().map(() => template.content.cloneNode(true)))