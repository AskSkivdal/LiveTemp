

function getLocation(callback) {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(callback)
    } else {
        throw "Gelocation error"
    }
}

function getTempAt(lat, lon) {
    const Http = new XMLHttpRequest();
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        resp = JSON.parse(Http.responseText)
        document.querySelector("#temp").innerText = resp.current_weather.temperature
    }
}


function update() {
    getLocation((resp) => {
        console.log(resp)
        getTempAt(resp.coords.latitude, resp.coords.longitude)
    }) 
}

update()

setInterval(()=> {
    update()      
}, 1000*60*5)
