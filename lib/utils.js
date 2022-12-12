const turf = require("@turf/turf");

function coordinatesToGeoJsonPolygon (coordinates) {
  return {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates,
      }
    }
  };
}

function calculateBounds (geojson) {
  const bbox = turf.bbox(geojson);
  const bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
  return bounds
}

module.exports = {
  coordinatesToGeoJsonPolygon,
  calculateBounds,
};
