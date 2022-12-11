export const coordinatesToGeoJsonPolygon = (coordinates) => {
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

export const farmerToModal = (farmer) => {
  return `
  <div class="mainDivModal">
    <div class="horizontalDiv">
      <div>
        <img class="imgModalMini" src="${farmer?.image}"/>
      </div>
      <div class="namesModalMini">
        <div class="horizontalDiv">
          <img src="images/name_icon.svg" />
          <div>Name: ${farmer?.name}</div>
        </div>
        <div class="horizontalDiv">
          <img src="images/descripcion_icon.svg" />
          <div>ID: #${farmer?.identifier}</div>
        </div>
      </div>
    </div>
    <div align="center">
      <button onclick="location.href='http://localhost:3000/farmer/${farmer.identifier}'" class="buttonModal">Go to dashboard</button>
    </div>
  </div>
  `;
}

export const calculateBounds = (coordinates) => {
  return [
    [
      coordinates[0] - 0.04,
      coordinates[1] - 0.04,
    ], // Southwest coordinates
    [
      coordinates[0] + 0.04,
      coordinates[1] + 0.04,
    ], // Northeast coordinates
  ]
}