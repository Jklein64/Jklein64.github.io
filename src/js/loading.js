const loader = document.querySelector(".mdc-linear-progress")
const linearProgress = new window.mdc.linearProgress.MDCLinearProgress(loader)


// const data = fetch("https://hacktj2020api.eastbanctech.com/transitiq/Stops?$format=Leg", {
//     method: "GET",
//     headers: {
//         "Ocp-Apim-Subscription-Key": '49310879d5e249dbab5c8db115a51305',
//     },
// }).then(raw => {
//     console.log({
//         raw
//     });
//     return raw.text()
// }).then(data => {
//     console.log({
//         data
//     })
// })