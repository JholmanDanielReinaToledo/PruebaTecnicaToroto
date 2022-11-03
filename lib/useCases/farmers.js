const Farmer = require('../mongo/models/farmer')

function create (farmer) {
  return Farmer.create(farmer)
}
function getAll () {
  return Farmer.find()
}

module.exports = {
  create,
  getAll
}