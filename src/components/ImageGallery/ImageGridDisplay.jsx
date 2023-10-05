import React from 'react';
import { imageArray } from '../../constants/ImageList';
import { Pagination } from './Pagination';

export const ImageGridDisplay = ({ currentImg, setCurrentImage, currentPage, setCurrentPage }) => {
  return (
    <>
      <div className="imageGallery__contentWraps imageGridDisplay">
        <ul className="imageGalley__imageGridDisplay__imageGrid">
          {imageArray.slice((currentPage - 1) * 20, 20 * currentPage).map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={() => setCurrentImage(item)}
                className={`imageGalley__imageGridDisplay__imageGrid__gridItems${currentImg === item ? ' active' : ''}`}
              >
                <img src={item} alt={idx} />
              </li>
            );
          })}
        </ul>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
};
