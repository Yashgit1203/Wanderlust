// console.log(listings.geometry.coordinates);
mapboxgl.accessToken = mapToken;
// console.log(mapToken);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listings.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(listings.geometry.coordinates) //coordinates
        .setPopup(new mapboxgl.Popup().setHTML(`<h4>${listings.title}</h4><p>Exact Location will be provided after booking</p>`))
        .addTo(map);