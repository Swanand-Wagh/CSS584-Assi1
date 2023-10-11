import Jimp from 'jimp';

// Method to calculate Intensity based on the formula I = 0.299R + 0.587G + 0.114B
function calculateIntensity(red, green, blue) {
  return Math.floor(0.299 * red + 0.587 * green + 0.114 * blue);
}

// Method to convert RGB to 6-bit color code
function convertTo6BitColorCode(r, g, b) {
  const r6Bit = (r >> 6) & 3;
  const g6Bit = (g >> 6) & 3;
  const b6Bit = (b >> 6) & 3;
  return (r6Bit << 4) | (g6Bit << 2) | b6Bit;
}

// Method to create a color code histogram. Take the image pixel values & places them into the array of 64bins for each image based on 6-bit code.
function createColorCodeHistogram(image) {
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

// Method to create an Intensity Histogram. Take the image pixel values & places them into the array of 25bins for each image based on the bin ranges (H1(0-10)...)
function createIntensityHistogram(image) {
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

// method to read the image & pass it for scanning to the createColorCodeHistogram() in-order to get pixel by pixel data & eventually generate the 64-bins histogram.
async function processImageUsingColorCode(imageFilePath) {
  try {
    const image = await Jimp.read(imageFilePath);
    const bins = createColorCodeHistogram(image);
    const imageSize = image.bitmap.width * image.bitmap.height;
    return { imageSize, bins };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// method to read the image & pass it for scanning to the createIntensityHistogram() in-order to get pixel by pixel data & eventually generate the 25-bins histogram.
async function processImageUsingIntensity(imageFilePath) {
  try {
    const image = await Jimp.read(imageFilePath);
    const bins = createIntensityHistogram(image);
    const imageSize = image.bitmap.width * image.bitmap.height;
    return { imageSize, bins };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// method to calculate the manhattan-distance between two images.
function calculateDistances(imagesData) {
  const distances = Array.from({ length: imagesData.length }, () => Array(imagesData.length).fill(0));

  for (let i = 0; i < imagesData.length; i++) {
    for (let j = i + 1; j < imagesData.length; j++) {
      const { imageSize: sizeI, bins: binsI } = imagesData[i];
      const { imageSize: sizeJ, bins: binsJ } = imagesData[j];

      let distance = 0;
      for (let k = 0; k < binsI.length; k++) {
        distance += Math.abs(binsI[k] / sizeI - binsJ[k] / sizeJ);
      }

      distances[i][j] = distance;
      distances[j][i] = distance;
    }
  }

  return distances;
}

// method to generate feature matrix for intensity
async function getColorCodeDistanceMatrix(currentImgList) {
  const imagesData = [];

  for (let i = 1; i <= 100; i++) {
    const imageFilePath = currentImgList[i - 1].image;
    const imageData = await processImageUsingColorCode(imageFilePath);
    if (imageData) {
      imagesData.push(imageData);
    }
  }
  return calculateDistances(imagesData);
}

// method to generate feature matrix for intensity
async function getIntensityDistanceMatrix(currentImgList) {
  const imagesData = [];

  for (let i = 1; i <= 100; i++) {
    const imageFilePath = currentImgList[i - 1].image;
    const imageData = await processImageUsingIntensity(imageFilePath);
    if (imageData) {
      imagesData.push(imageData);
    }
  }
  return calculateDistances(imagesData);
}

export const intensityDistances = async (currentImgList) => await getIntensityDistanceMatrix(currentImgList);
export const colorCodeDistances = async (currentImgList) => await getColorCodeDistanceMatrix(currentImgList);

// sort the distances based on the shortest distances
export function getShortestDistancesIndexes(distances, imageIndex) {
  const arrayObjects = distances[imageIndex].map((value, index) => ({
    value,
    index,
  }));
  arrayObjects.sort((a, b) => a.value - b.value);
  return arrayObjects.map((item) => item.index);
}
