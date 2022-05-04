
mapboxgl.accessToken = 'pk.eyJ1IjoicmlnYnlzbmVha3lzbmVrZSIsImEiOiJjbDJxY202cHEwZXVpM2NtdGJudHNmdDZsIn0._9IfC9kO9JKYzz1bZPl3aw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${campground.title}</h4>`
            )
    )
    .addTo(map)
