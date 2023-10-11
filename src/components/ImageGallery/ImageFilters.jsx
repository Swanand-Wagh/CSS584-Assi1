import { useEffect, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { intensityDistances, colorCodeDistances, getShortestDistancesIndexes } from '../../methods/Main';
import { imageArray } from '../../constants/ImageList';

export const ImageFilters = ({ currentImg, setCurrentImage, imagesList, setImagesList, setCurrentPage }) => {
  const [currentImgURL, setCurrentImageURL] = useState('');

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
        ? await intensityDistances(imagesList)
        : methodBy === 'colorCode'
        ? await colorCodeDistances(imagesList)
        : null;

    const modifiedList = distances === null ? imageArray : getShortestDistancesIndexes(distances, _currentImg - 1);

    setNewList(setImagesList, modifiedList);
    setCurrentImage(_currentImg);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!imagesList) {
      setCurrentImageURL('');
      return;
    }

    const selectedImg = imagesList.find((img) => img.id === currentImg);
    setCurrentImageURL(!selectedImg ? '' : selectedImg.image);
  }, [currentImg]);

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
            <img src={currentImgURL} alt="" />
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

      <div className="imageGallery__imageSelectDisplay__filterActionBtns">
        <button
          disabled={currentImg === -1 || imagesList === null}
          onClick={() => filterMethod(currentImg, 'intensity')}
          className="imageGallery__imageSelectDisplay__imageActionBtns__intensityBtn"
        >
          Retrieve by Intensity Method
        </button>
        <button
          disabled={currentImg === -1 || imagesList === null}
          onClick={() => filterMethod(currentImg, 'colorCode')}
          className="imageGallery__imageSelectDisplay__imageActionBtns__colorMethodBtn"
        >
          Retrieve by Color Code Method
        </button>
      </div>
    </div>
  );
};
