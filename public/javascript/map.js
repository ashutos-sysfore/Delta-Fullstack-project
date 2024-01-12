	mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
center: coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

const marker1 = new mapboxgl.Marker()
.setLngLat(coordinates)
.addTo(map)
.setPopup(new mapboxgl.Popup().setHTML("<p>Exact location provided after booking!</p>")) // add popup
.addTo(map);