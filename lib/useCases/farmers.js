
const turf = require("@turf/turf");
const Farmer = require("../mongo/models/farmer");
const { calculateBounds } = require("../utils");

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
  const polygon = turf.polygon(farmer.coordinates);
  const centroid = turf.centroid(polygon);
  const bounds = calculateBounds(polygon);

  return {
    ...farmer._doc,
    geoJson: polygon,
    centroid,
    bounds,
  };
}

module.exports = {
  create,
  getAll,
  getOne,
};
