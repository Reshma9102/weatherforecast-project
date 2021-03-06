// prakash
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')

const getLocation = document.getElementById('getlocation');

message1.textContent = ''

var mapid;

 weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address=' + location ).then((response) => {
        // console.log(response.json)
     response.json().then((data) => {
         if(data.error){
             message1.textContent = data.error
         }
         else {
            document.querySelector('#mapid').remove();
            document.querySelector('.map-container').innerHTML="<div id='mapid'></div>";
            message1.textContent = data.location
            var summry = document.querySelectorAll('.sumtd');
            var mintemp = document.querySelectorAll('.mintemp');
            var maxtemp = document.querySelectorAll('.maxtemp');
            var prob = document.querySelectorAll('.probval');
            for(var j=0; j<7; j++){
                var day = data.forecast[j]
                // for(var i=0; i<4; i++){
                    summry[j].innerHTML = day[0];
                    mintemp[j].innerHTML = day[1];
                    maxtemp[j].innerHTML = day[2];
                    prob[j].innerHTML = day[3];
                // }
            }
            var lat = data.lat;
            var lon = data.lon;
            console.log(lat, lon)
            mapid = L.map('mapid').setView([lat, lon], 15);
            const marker = L.marker([lat,lon]).addTo(mapid);
            const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(mapid);
            marker.setLatLng([lat,lon])
            // marker.clearLayers();
         }
         search.value = ''
     })
    })
 })

getLocation.addEventListener('click', (evt) => {
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            fetch('/currentlocation?latitude=' +latitude + '&longitude=' + longitude ).then((response) => {
                response.json().then((data) => {
                    if(data.error){
                        message1.textContent = data.error
                    }
                    else {
                        document.querySelector('#mapid').remove();
                        document.querySelector('.map-container').innerHTML="<div id='mapid'></div>";
                        message1.textContent = data.location
                        // console.log(data);
                        var summry = document.querySelectorAll('.sumtd');
                        var mintemp = document.querySelectorAll('.mintemp');
                        var maxtemp = document.querySelectorAll('.maxtemp');
                        var prob = document.querySelectorAll('.probval');
                        for(var j=0; j<7; j++){
                            var day = data.forecast[j]
                            summry[j].innerHTML = day[0];
                            mintemp[j].innerHTML = day[1];
                            maxtemp[j].innerHTML = day[2];
                            prob[j].innerHTML = day[3];
                        }

                        var lat = data.lat;
                        var lon = data.lon;
                        
                        mapid = L.map('mapid').setView([lat, lon], 15);
                        const marker = L.marker([lat,lon]).addTo(mapid);
                        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
                        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                        const tiles = L.tileLayer(tileUrl, { attribution });
                        tiles.addTo(mapid);
                        marker = L.setLatLng([lat, lon]);
                        //marker.clearLayers();
                    }
                })
            }).catch((error) => {
                console.log(error)
            })
        },(error) => {
            console.log(error.code);
        });
    }
    else {
        console.log("Not Supported");
    }
})

getLocation.click();