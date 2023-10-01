/* eslint-disable react/prop-types */
import { GrPowerReset } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";

export const ImageFilters = ({ currentImg, setCurrentImage }) => {
  const intensityMethodFilterAlgo = () => {
    return;
  };

  const colorCodeMethodFilterAlgo = () => {
    return;
  };

  return (
    <>
      <div className="imageGallery__contentWraps imageSelectDisplay">
        <div className="imageGallery__imageSelectDisplay__selectedImage">
          {currentImg && (
            <div className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns">
              <button className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns__resetBtn">
                <GrPowerReset />
              </button>
              <button
                onClick={() => setCurrentImage("")}
                className="imageGallery__imageSelectDisplay__selectedImage__imageActionBtns__closeBtn"
              >
                <IoClose />
              </button>
            </div>
          )}
          <div
            style={{ background: currentImg ? "transparent" : "#efedfc" }}
            className="imageGallery__imageSelectDisplay__selectedImage__imageWrap"
          >
            {currentImg ? (
              <img src={currentImg} alt="" />
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
            disabled={!currentImg}
            onClick={intensityMethodFilterAlgo}
            className="imageGallery__imageSelectDisplay__imageActionBtns__intensityBtn"
          >
            Retrieve by Intensity Method
          </button>
          <button
            disabled={!currentImg}
            onClick={colorCodeMethodFilterAlgo}
            className="imageGallery__imageSelectDisplay__imageActionBtns__colorMethodBtn"
          >
            Retrieve by Color Code Method
          </button>
        </div>
      </div>
    </>
  );
};
