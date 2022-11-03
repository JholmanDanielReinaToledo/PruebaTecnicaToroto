const Works = require('../mongo/models/works')

function create (works) {
  return Works.create(works)
}

module.exports = {
  create
}