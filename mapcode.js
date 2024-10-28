const map = L.map('map').setView([33, -95], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) }
];

function addMarkerWithLocality(index, lat, lon) {

    const marker = L.marker([lat, lon]).addTo(map).bindPopup(`Marker ${index + 1}`);
    
    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en')
        .then(response => response.json())
        .then(data => {
            const locality = data.locality 
            document.getElementById(`marker${index + 1}`).innerHTML = `
              Marker ${index + 1}: Latitude: ${lat}, Longitude: ${lon}<br>
              <span class="locality">Locality: ${locality}</span>
            `;
        })
}

coordinates.forEach((coord, index) => addMarkerWithLocality(index, coord.lat, coord.lon));
