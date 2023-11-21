import React, { useCallback, useEffect, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { colorCodeDistances, intensityDistances } from '../../methods/Assignment_1';
import {
  getShortestDistancesIndexes,
  getShortestDistancesIndexesFromArray,
} from '../../methods/Main';
import { imageArray } from '../../constants/ImageList';
import {
  buildFeatureMatrix,
  calculateDistanceWithQueryImage,
  iteration,
  rfRetrieval,
} from '../../methods/Assignment_2';

export const ImageFilters = ({
  currentImg,
  setCurrentImage,
  imagesList,
  setImagesList,
  setCurrentPage,
  relevantImages,
  setRelevantImages,
  isRelevance,
  setIsRelevance,
}) => {
  const [currentImgURL, setCurrentImageURL] = useState('');
  const [normalizedMatrix, setNormalizedMatrix] = useState();
  const [updatedDistances, setUpdatedDistances] = useState();
  const [firstCall, setFirstCall] = useState(true);

  const setNewList = (setState, _modifiedList) => {
    const newList = [];
    for (let i = 0; i < _modifiedList.length; ++i) {
      newList.push(imageArray[_modifiedList[i]]);
    }

    setState(newList);
  };

  const filterMethod = async (_currentImg, methodBy) => {
    if (_currentImg === -1) {
      return;
    }

    setCurrentImage(-1);

    const distances =
      methodBy === 'intensity'
        ? await intensityDistances()
        : methodBy === 'colorCode'
        ? await colorCodeDistances()
        : null;

    const modifiedList =
      distances === null ? imageArray : getShortestDistancesIndexes(distances, _currentImg - 1);

    setNewList(setImagesList, modifiedList);
    setCurrentImage(_currentImg);
    setCurrentPage(1);
  };

  const enableRelevanceFeedback = (event) => {
    setIsRelevance(event.target.checked);
  };

  const executeAssignment2 = (_currentImg) => {
    if (_currentImg === -1) {
      return;
    }

    setCurrentImage(-1);
    let array;

    if (firstCall || relevantImages.length === 0) {
      let distances = calculateDistanceWithQueryImage(normalizedMatrix, _currentImg - 1);

      // Select query image and other rf images, query image is at first index
      array = rfRetrieval(distances);
      setFirstCall(false);
    } else {
      array = iteration(normalizedMatrix, updatedDistances, relevantImages, _currentImg - 1);
    }

    setUpdatedDistances(array);
    const modifiedList = getShortestDistancesIndexesFromArray(array, _currentImg - 1);

    setNewList(setImagesList, modifiedList);
    setCurrentImage(_currentImg);
    setCurrentPage(1);
  };

  useEffect(() => {
    const getNormalizedMatrix = async () => {
      let matrix = await buildFeatureMatrix();
      setNormalizedMatrix(matrix);
    };

    getNormalizedMatrix();

    if (!imagesList) {
      setCurrentImageURL('');
      return;
    }

    const selectedImg = imagesList.find((img) => img.id === currentImg);
    setCurrentImageURL(!selectedImg ? '' : selectedImg.image);
  }, [currentImg, normalizedMatrix]);

  return (
    <div className="imageGallery__contentWraps imageSelectDisplay">
      <div className="imageGallery__imageSelectDisplay__selectedImage">
        {currentImg !== -1 && (
          <div className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns">
            <button
              onClick={() => {
                setImagesList(imageArray);
                setCurrentPage(1);
                setCurrentImage(imageArray[0].id);
                setIsRelevance(false);
                setRelevantImages([]);
              }}
              className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns__resetBtn"
            >
              <GrPowerReset />
            </button>
            <button
              onClick={() => setCurrentImageURL('')}
              className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns__closeBtn"
            >
              <IoClose />
            </button>
          </div>
        )}

        <div
          style={{ background: currentImg !== -1 && currentImgURL ? 'transparent' : '#efedfc' }}
          className="imageGallery__imageSelectDisplay__selectedImage__imageWrap"
        >
          {currentImg !== -1 && currentImgURL ? (
            <React.Fragment>
              <img src={currentImgURL} alt="" />
              <span className="imageGallery__imageSelectDisplay__selectedImage__imageWrap__number">
                {currentImg}
              </span>
            </React.Fragment>
          ) : (
            <div className="imageGallery__imageSelectDisplay__selectedImage__noImage">
              <span className="imageGallery__imageSelectDisplay__selectedImage__noImage__noImgIcon">
                <RiImageAddFill />
              </span>
              <p className="imageGallery__imageSelectDisplay__selectedImage__noImage__noImageMsg">
                Select an Image to Apply Filters
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="imageGallery__imageSelectDisplay__filterActionText">Retrieve By</div>
      <div className="imageGallery__imageSelectDisplay__filterActionRelevance">
        <input
          type="checkbox"
          name="relevance"
          id="relevance"
          checked={isRelevance}
          onChange={(event) => enableRelevanceFeedback(event)}
        />
        <label htmlFor="relevance">Relevance</label>
      </div>
      <div className="imageGallery__imageSelectDisplay__filterActionBtns">
        <button
          disabled={currentImg === -1 || imagesList === null || isRelevance}
          onClick={() => filterMethod(currentImg, 'intensity')}
        >
          Intensity Method
        </button>
        <button
          disabled={currentImg === -1 || imagesList === null || isRelevance}
          onClick={() => filterMethod(currentImg, 'colorCode')}
        >
          Color Code Method
        </button>

        <button
          disabled={currentImg === -1 || imagesList === null || !normalizedMatrix}
          onClick={() => executeAssignment2(currentImg)}
          className="fullRow"
        >
          Color Code & Intensity
        </button>
      </div>
    </div>
  );
};
