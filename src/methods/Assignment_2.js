import Jimp from 'jimp';
import { imageArray } from '../constants/ImageList';
import { createColorCodeHistogram, createIntensityHistogram } from './Main';

function normalizeFeatureVector(featureVector, average, standardDeviation) {
  return featureVector.map((value, index) => {
    if (standardDeviation[index]) {
      return (value - average[index]) / standardDeviation[index];
    } else {
      return value;
    }
  });
}

// Feature Matrix = Intensity Matrix Joined with Color Matrix
export async function buildFeatureMatrix() {
  const featureMatrix = [];
  const average = [];
  const standardDeviation = [];

  for (let i = 0; i < 100; i++) {
    const imageFilePath = imageArray[i].image;
    const image = await Jimp.read(imageFilePath);
    const colorBins = createColorCodeHistogram(image);
    const intensityBins = createIntensityHistogram(image);
    const imageSize = image.bitmap.width * image.bitmap.height;

    const featureVector = [...intensityBins, ...colorBins].map((bin) => bin / imageSize);
    featureMatrix.push(featureVector);
  }

  // for each feature, calculate average across all images
  for (let featureIndex = 0; featureIndex < featureMatrix[0].length; featureIndex++) {
    let sum = 0;
    for (let imageIndex = 0; imageIndex < featureMatrix.length; imageIndex++) {
      sum += featureMatrix[imageIndex][featureIndex];
    }
    average.push(sum / featureMatrix.length);
  }

  // Calculate SD across all images
  for (let featureIndex = 0; featureIndex < featureMatrix[0].length; featureIndex++) {
    let sum = 0;
    for (let imageIndex = 0; imageIndex < featureMatrix.length; imageIndex++) {
      sum += Math.pow(featureMatrix[imageIndex][featureIndex] - average[featureIndex], 2);
    }
    standardDeviation.push(Math.sqrt(sum / (featureMatrix.length - 1)));
  }

  // Normalize feature matrix
  return featureMatrix.map((featureVector) =>
    normalizeFeatureVector(featureVector, average, standardDeviation)
  );
}

export function calculateDistanceWithQueryImage(dataMatrix, queryImageIndex) {
  const distances = Array.from({ length: dataMatrix.length }).fill(0);

  // queryImage, calculating distance to all other images by summing the difference of each feature and dividing by the number of features
  for (let i = 0; i < dataMatrix.length; i++) {
    let sum = 0;
    for (let k = 0; k < dataMatrix[i].length; k++) {
      sum += Math.abs(dataMatrix[queryImageIndex][k] - dataMatrix[i][k]);
    }
    distances[i] = sum / dataMatrix[i].length;
  }

  return distances;
}

export function iteration(normalizedMatrix, distances, selectedImages, queryImage) {
  let average = [];
  let standardDeviation = [];

  // for each feature, calculate average and standard deviation across all images
  for (let i = 0; i < normalizedMatrix[0].length; i++) {
    let sum = 0;
    selectedImages.forEach((imageIndex) => {
      sum += normalizedMatrix[imageIndex][i];
    });
    average.push(sum / selectedImages.length);
  }

  for (let i = 0; i < normalizedMatrix[0].length; i++) {
    let sum = 0;
    selectedImages.forEach((imageIndex) => {
      sum += Math.pow(normalizedMatrix[imageIndex][i] - average[i], 2);
    });
    standardDeviation.push(Math.sqrt(sum / (selectedImages.length - 1)));
  }

  console.log(average, standardDeviation);

  // Special Cases
  // If SD is zero, then weight is non zero we will take min non zero value & multiply it by 0.5
  let minNonZeroSD = Math.min(...standardDeviation.filter((value) => value != 0));
  let zeroValue = minNonZeroSD * 0.5;

  // Update weights based on cases
  let updatedSD = standardDeviation.map((value, index) => {
    if (value) {
      return value;
    } else {
      if (average[index]) {
        return zeroValue;
      } else {
        return 0;
      }
    }
  });

  let updatedWeight = updatedSD.map((value, index) => {
    if (value) {
      return 1 / value;
    } else {
      return 0;
    }
  });

  // Normalize weights
  let sum = updatedWeight.reduce((a, b) => a + b, 0);
  let normalizedWeights = updatedWeight.map((value) => value / sum);

  // Update distance of query image with new distances of selected images
  for (let imageIndex = 0; imageIndex < normalizedWeights.length; imageIndex++) {
    let sum = 0;
    for (let k = 0; k < normalizedMatrix[0].length; k++) {
      sum +=
        normalizedWeights[k] *
        Math.abs(normalizedMatrix[queryImage][k] - normalizedMatrix[imageIndex][k]);
    }
    distances[imageIndex] = sum;
  }

  return distances;
}

export function rfRetrieval(distances) {
  // Make a copy of distances array
  let updatedDistances = Array.from(distances);
  return updatedDistances;
}
