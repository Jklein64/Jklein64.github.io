async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

const location = getLocation().then(data => ({
    lat: data.coords.latitude,
    long: data.coords.longitude
}))

export default location