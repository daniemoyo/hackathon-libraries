const $city = $("#cityId"); // The value of the selected City
const $country = $("#countryId"); // The value of the selected Country

const $button = $("#submit");// Button Search


$button.click( (event) => {
    var container = L.DomUtil.get('map');
            if(container != null){
            container._leaflet_id = null;
            }
    let input = $city.find(":selected").text();
    let country = $country.find(":selected").text();
    
    $.get(`https://nominatim.openstreetmap.org/search?city=${input}&format=geojson`, (data) => {
        
        let long = data.features[0].geometry.coordinates[0];
        let lat = data.features[0].geometry.coordinates[1];
        var map = L.map('map').setView([lat, long], 11);

        var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/light-v10',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);
        L.marker([lat, long]).addTo(map)
        .bindPopup(`You are seeing ${input}`)
        .openPopup();

     });

    $("#chosen").text($country.find(":selected").text());
    $("#flag").attr("src", `https://countryflagsapi.com/png/${country}`);
    $button.attr("class", "btn btn-success");
    event.preventDefault();
 });



