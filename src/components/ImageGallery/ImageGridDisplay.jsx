import { Pagination } from './Pagination';
import { ImageSkeleton } from './ImageSkeleton';
import React from 'react';

export const ImageGridDisplay = ({
  currentImg,
  setCurrentImage,
  currentPage,
  setCurrentPage,
  imagesList,
  relevantImages,
  setRelevantImages,
  isRelevance,
}) => {
  const updateRelevantList = (event, imageId) => {
    if (event.target.checked) {
      setRelevantImages((current) => [...current, imageId]);
    } else {
      setRelevantImages((current) => current.filter((id) => id !== imageId));
    }
  };

  return (
    <div className="imageGallery__contentWraps imageGridDisplay">
      {currentImg !== -1 ? (
        <ul className="imageGalley__imageGridDisplay__imageGrid">
          {imagesList.slice((currentPage - 1) * 20, 20 * currentPage).map((item, idx) => {
            return (
              <li key={idx} className="imageGalley__imageGridDisplay__imageGrid__gridItems">
                <img
                  src={item.image}
                  alt={idx}
                  onClick={() => {
                    setCurrentImage(item.id);
                    setRelevantImages([]);
                  }}
                />
                <span className="image__number">{item.id}</span>
                {isRelevance ? (
                  <div className="imageGalley__imageGridDisplay__imageGrid__gridItems__checkbox">
                    <input
                      type="checkbox"
                      name="relevance"
                      id={item.id}
                      checked={relevantImages.includes(item.id - 1)}
                      onChange={(event) => updateRelevantList(event, item.id - 1)}
                    />
                    <label htmlFor={item.id}>Relevant</label>
                  </div>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ImageSkeleton totalImages={100} currentPage={currentPage} />
      )}

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};
