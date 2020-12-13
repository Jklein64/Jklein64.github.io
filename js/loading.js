const loader = document.querySelector(".mdc-linear-progress")
const linearProgress = new window.mdc.linearProgress.MDCLinearProgress(loader)

window.$(function () {
    var params = {
        // Request parameters
        // "$filter": "{String}",
        // "$top": "{string}",
        // "$skip": "{string}",
        "$format": "json",
        // "$orderby": "{String}",
    };

    $.ajax({
            url: "https://hacktj2020api.eastbanctech.com/transitiq/Stops?" + $.param(params),
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "49310879d5e249dbab5c8db115a51305");
            },
            type: "GET",
        })
        .done(function (data) {
            console.log(data)
            console.log("success");
        })
        .fail(function () {
            console.log("error");
        });
});

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