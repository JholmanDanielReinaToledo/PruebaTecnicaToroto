const { coordinatesToGeoJsonPolygon } = require("../../src/utils");
const turf = require("@turf/turf");
const Farmer = require("../mongo/models/farmer");

function create(farmer) {
  return Farmer.create(farmer);
}
async function getAll() {
  const farmers = await Farmer.find();

  const farmersT = farmers.map((f) => {
    var polygon = turf.polygon(f?.coordinates);

    var centroid = turf.centroid(polygon);
    return {
      ...f?._doc,
      centroid,
    };
  });

  return farmersT;
}

async function getOne(identifier) {
  const farmer = await Farmer.findOne({ identifier });
  var polygon = turf.polygon(farmer.coordinates);
  var centroid = turf.centroid(polygon);
  return {
    ...farmer._doc,
    geoJson: coordinatesToGeoJsonPolygon(farmer?.coordinates),
    centroid: centroid,
  };
}

module.exports = {
  create,
  getAll,
  getOne,
};
