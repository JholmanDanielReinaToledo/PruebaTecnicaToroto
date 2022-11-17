const Works = require('../mongo/models/works')

function create (works) {
  return Works.create(works)
}
function getAll () {
  return Works.find()
}
module.exports = {
  create,
  getAll
}