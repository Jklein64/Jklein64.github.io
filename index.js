const liveServer = require("live-server")
const fs = require("fs")

liveServer.start({
    root: "./src",
    ignore: "**/*.map",
    wait: 2000,
    https: {
        cert: fs.readFileSync("./server.crt"),
        key: fs.readFileSync("./server.key"),
        passphrase: "1234"
    }
})