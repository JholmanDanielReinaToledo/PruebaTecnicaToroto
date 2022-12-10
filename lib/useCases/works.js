const { map, orderBy, groupBy, sumBy, remove } = require("lodash");
const Works = require("../mongo/models/works");

function create(works) {
  return Works.create(works);
}

async function getAll() {
  const works = await Works.find();

  const works2 = groupBy(works, (w) => w.type);

  const works3 = map(works2, (w) => {
    const quantity = sumBy(w, (x) => x.quantity);
    const longitude = sumBy(w, (x) => x.longitude);
    const area = sumBy(w, (x) => x.area);
    const volume = sumBy(w, (x) => x.volume);

    return {
      quantity,
      longitude,
      area,
      volume,
      type: w[0].type,
    };
  });

  remove(works3, (w) => w.type == "");
  return works3;
}

module.exports = {
  create,
  getAll,
};
