import { useState } from "react";
import { imageUrls } from "./ImageList";
import "../assets/styles/imageGallery.css";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import { IoClose } from "react-icons/io5";

export const ImageGallery = () => {
  const [currentImg, setCurrentImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const intensityMethodFilterAlgo = () => {
    return;
  };

  const colorCodeMethodFilterAlgo = () => {
    return;
  };

  return (
    <>
      <section className="imageGallery">
        <div className="imageGallery__contentWraps imageGridDisplay">
          <ul className="imageGalley__imageGridDisplay__imageGrid">
            {imageUrls.map((imageUrl, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => setCurrentImage(imageUrl)}
                  className={`imageGalley__imageGridDisplay__imageGrid__gridItems${
                    currentImg === idx + 1 ? " active" : ""
                  }`}
                >
                  <img src={imageUrl} alt={`Image ${idx + 1}`} />
                </li>
              );
            })}
          </ul>

          <div className="imageGalley__imageGridDisplay__paginationWrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((current) => current - 1)}
              className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns previousBtn"
            >
              <MdNavigateBefore />
            </button>
            <button className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns currentPageBtn active">
              1
            </button>
            <button className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns currentPageBtn">
              2
            </button>
            <button className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns currentPageBtn">
              3
            </button>
            <button className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns currentPageBtn">
              4
            </button>
            <button className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns currentPageBtn">
              5
            </button>
            <button
              disabled={currentPage === 100}
              onClick={() => setCurrentPage((current) => current + 1)}
              className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns nextBtn"
            >
              <MdNavigateNext />
            </button>
          </div>
        </div>
        <div className="imageGallery__contentWraps imageSelectDisplay">
          <div className="imageGallery__imageSelectDisplay__selectedImage">
            {currentImg  && (
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
            <div className="imageGallery__imageSelectDisplay__selectedImage__imageWrap">
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
              disabled={currentImg <= 0}
              onClick={intensityMethodFilterAlgo}
              className="imageGallery__imageSelectDisplay__imageActionBtns__intensityBtn"
            >
              Retrieve by Intensity Method
            </button>
            <button
              disabled={currentImg <= 0}
              onClick={colorCodeMethodFilterAlgo}
              className="imageGallery__imageSelectDisplay__imageActionBtns__colorMethodBtn"
            >
              Retrieve by Color Code Method
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
