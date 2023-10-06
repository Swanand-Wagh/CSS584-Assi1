import { GrPowerReset } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { intensityDistances, colorCodeDistances, getShortestDistancesIndexes } from '../../methods/Main';
import { imageArray } from '../../constants/ImageList';

export const ImageFilters = ({ currentImg, setCurrentImage, imagesList, setImagesList }) => {
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

    setImagesList(null);
    setCurrentImage(-1);

    const distances =
      methodBy === 'intensity'
        ? await intensityDistances()
        : methodBy === 'colorCode'
        ? await colorCodeDistances()
        : null;

    const modifiedList = distances === null ? imageArray : getShortestDistancesIndexes(distances, _currentImg);

    setNewList(setImagesList, modifiedList);
    setCurrentImage(_currentImg);
  };

  return (
    <div className="imageGallery__contentWraps imageSelectDisplay">
      <div className="imageGallery__imageSelectDisplay__selectedImage">
        {currentImg !== -1 && (
          <div className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns">
            <button
              onClick={() => setImagesList(imageArray)}
              className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns__resetBtn"
            >
              <GrPowerReset />
            </button>
            <button
              onClick={() => setCurrentImage(-1)}
              className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns__closeBtn"
            >
              <IoClose />
            </button>
          </div>
        )}

        <div
          style={{ background: currentImg !== -1 ? 'transparent' : '#efedfc' }}
          className="imageGallery__imageSelectDisplay__selectedImage__imageWrap"
        >
          {currentImg !== -1 ? (
            <img src={imagesList[currentImg]} alt="" />
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
