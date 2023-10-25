function calculateIntensity(red, green, blue) {
  return Math.floor(0.299 * red + 0.587 * green + 0.114 * blue);
}

function convertTo6BitColorCode(r, g, b) {
  const r6Bit = (r >> 6) & 3;
  const g6Bit = (g >> 6) & 3;
  const b6Bit = (b >> 6) & 3;
  return (r6Bit << 4) | (g6Bit << 2) | b6Bit;
}

export function createColorCodeHistogram(image) {
  const colorBins = new Array(64).fill(0);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const r = image.bitmap.data[idx + 0];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];

    const colorCode = convertTo6BitColorCode(r, g, b);
    colorBins[colorCode]++;
  });

  return colorBins;
}

export function createIntensityHistogram(image) {
  const intensityBins = new Array(25).fill(0);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const intensity = calculateIntensity(
      image.bitmap.data[idx + 0],
      image.bitmap.data[idx + 1],
      image.bitmap.data[idx + 2]
    );
    const binIndex = Math.min(24, Math.floor(intensity / 10));
    intensityBins[binIndex]++;
  });

  return intensityBins;
}

export function getShortestDistancesIndexes(distances, imageIndex) {
  const arrayObjects = distances[imageIndex].map((value, index) => ({ value, index }));
  arrayObjects.sort((a, b) => a.value - b.value);
  return arrayObjects.map((item) => item.index);
}

export function getShortestDistancesIndexesFromArray(distances) {
  const arrayObjects = distances.map((value, index) => ({ value, index }));
  arrayObjects.sort((a, b) => a.value - b.value);
  return arrayObjects.map((item) => item.index);
}
