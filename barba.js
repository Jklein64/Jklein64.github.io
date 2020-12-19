import { barba, barbaCSS } from "./deps.js"

barba.use(barbaCSS)

barba.init({
    transitions: [{
        name: "slide",
        sync: true,
        from: {
            namespace: "thing",
        },
        to: {
            namespace: "index",
        },
        before(data) {
            data.next.container.classList.add("slide-before")
        },
        beforeLeave(data) {
            data.next.container.classList.remove("slide-before")
            console.log("leaving", data)
        },
        enter: () => {},
        leave: () => {},
    }, ],
})