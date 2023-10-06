import Jimp from "jimp";
import { imageArray } from "../constants/ImageList";

function calculateIntensity(red, green, blue) {
  return Math.floor(0.299 * red + 0.587 * green + 0.114 * blue);
}

function convertTo6BitColorCode(r, g, b) {
  const r6Bit = (r >> 6) & 3;
  const g6Bit = (g >> 6) & 3;
  const b6Bit = (b >> 6) & 3;
  return (r6Bit << 4) | (g6Bit << 2) | b6Bit;
}

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

function calculateDistances(imagesData) {
  const distances = Array.from({ length: imagesData.length }, () =>
    Array(imagesData.length).fill(0)
  );

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

async function getColorCodeDistanceMatix() {
  const imagesData = [];
  // Load image data
  for (let i = 1; i <= 100; i++) {
    const imageFilePath = imageArray[i - 1];
    // const imageFilePath = `https://raw.githubusercontent.com/Swanand-Wagh/CSS584-Assi1/main/src/constants/images/${i}.jpg`;
    const imageData = await processImageUsingColorCode(imageFilePath);
    if (imageData) {
      imagesData.push(imageData);
    }
  }
  return calculateDistances(imagesData);
}

async function getIntensityDistanceMatix() {
  const imagesData = [];
  // Load image data
  for (let i = 1; i <= 100; i++) {
    const imageFilePath = imageArray[i - 1];
    // const imageFilePath = `https://raw.githubusercontent.com/Swanand-Wagh/CSS584-Assi1/main/src/constants/images/${i}.jpg`;
    const imageData = await processImageUsingIntensity(imageFilePath);
    if (imageData) {
      imagesData.push(imageData);
    }
  }
  return calculateDistances(imagesData);
}

export const intensityDistances = await getIntensityDistanceMatix();
export const colorCodeDistances = await getColorCodeDistanceMatix();

export function getShortestDistancesIndexes(distances, imageIndex) {
  const arrayObjects = distances[imageIndex].map((value, index) => ({
    value,
    index,
  }));
  arrayObjects.sort((a, b) => a.value - b.value);
  return arrayObjects.map((item) => item.index);
}
