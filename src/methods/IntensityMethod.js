const Jimp = require('jimp');

function calculateIntensity(red, green, blue) {
  return Math.floor(0.299 * red + 0.587 * green + 0.114 * blue);
}

function createHistogram(image) {
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

async function intensityMethodFilterAlgo() {
  let imageSizes = [];
  let histograms = [];

  let minDistances = [];
  for (let i = 0; i < 100; i++) {
    minDistances[i] = { distanceFrom: i, distnaceWith: -1, distance: 9999 };
  }

  // Loop through all images
  for (let i = 1; i <= 100; i++) {
    const imageFilePath = `./images/${i}.jpg`;
    await Jimp.read(imageFilePath)
      .then((image) => {
        const intensityBins = createHistogram(image);
        imageSizes.push(image.bitmap.width * image.bitmap.height);
        histograms.push(intensityBins);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Manhattan Disatnce
  for (let i = 0; i < histograms.length; i++) {
    for (let j = i + 1; j < histograms.length; j++) {
      let distance = 0;
      for (let k = 0; k < histograms[i].length; k++) {
        distance += Math.abs(histograms[i][k] / imageSizes[i] - histograms[j][k] / imageSizes[j]);
      }

      if (distance < minDistances[i].distance) {
        minDistances[i].distnaceWith = j;
        minDistances[i].distance = distance;
      }
      if (distance < minDistances[j].distance) {
        minDistances[j].distnaceWith = i;
        minDistances[j].distance = distance;
      }
    }
  }

  // Sort distances
  console.log(minDistances);
}

intensityMethodFilterAlgo();
