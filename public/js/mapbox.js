export const displayMap = function (locations) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWFyY29zZGFuaWVsMjAwMiIsImEiOiJjbHN3MjJucHMybmp1Mmtvdzl5eDV3bnFsIn0.D3p_Bs5yuqzYhM0uTiq1bA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/marcosdaniel2002/clswfqhfu00nb01p43p4he5m8',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
