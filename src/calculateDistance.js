const fs = require('fs');

function getDistanceFromLatLonInKm(position1, position2) {
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const R = 6371;

  const dLat = deg2rad(position2.lat - position1.lat);
  const dLng = deg2rad(position2.lng - position1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(position1.lat)) *
    Math.cos(deg2rad(position2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c * 1000).toFixed();
}

const newLines = [];

fs.readFile('./data/clientes.csv', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  data.split('\n').forEach((line, index) => {
    if (!line.trim()) return;

    const lineArray = line.split(';');

    if (index === 0) {
      newLines.push(`${lineArray.slice(0, 11).join(';')};Distancia;`);
      return;
    }

    if (!lineArray[8]) return;

    const distancia = getDistanceFromLatLonInKm(
      {
        lat: parseFloat(lineArray[8].replace(',', '.')),
        lng: parseFloat(lineArray[9].replace(',', '.')),
      },
      {
        lat: parseFloat(lineArray[10].replace(',', '.')),
        lng: parseFloat(lineArray[11].replace(',', '.')),
      }
    );

    newLines.push(`${lineArray.slice(0, 11).join(';')};${distancia};`);
  });

  try {
    fs.writeFileSync('./output/clientes_with_distance.csv', newLines.join('\n'));
  } catch (err) {
    console.error(err);
  }
});
