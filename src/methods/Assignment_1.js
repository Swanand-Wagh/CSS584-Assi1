import Jimp from 'jimp';
import { createColorCodeHistogram, createIntensityHistogram } from './Main';
import { imageArray } from '../constants/ImageList';

// get image data for color code histogram
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

// get image data for intensity histogram
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

// get manhattan distances
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

// get color code matrix
async function getColorCodeDistanceMatrix() {
  const imagesData = [];
  // Load image data
  for (let i = 0; i < 100; i++) {
    const imageFilePath = imageArray[i].image;
    const imageData = await processImageUsingColorCode(imageFilePath);
    if (imageData) {
      imagesData.push(imageData);
    }
  }
  return calculateDistances(imagesData);
}

// get intensity value matrix
async function getIntensityDistanceMatrix() {
  const imagesData = [];
  // Load image data
  for (let i = 0; i < 100; i++) {
    const imageFilePath = imageArray[i].image;
    const imageData = await processImageUsingIntensity(imageFilePath);
    if (imageData) {
      imagesData.push(imageData);
    }
  }
  return calculateDistances(imagesData);
}

export const intensityDistances = async () => await getIntensityDistanceMatrix();
export const colorCodeDistances = async () => await getColorCodeDistanceMatrix();
