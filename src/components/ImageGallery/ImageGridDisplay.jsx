import { Pagination } from './Pagination';
import { ImageSkeleton } from './ImageSkeleton';

export const ImageGridDisplay = ({ currentImg, setCurrentImage, currentPage, setCurrentPage, imagesList }) => {
  return (
    <div className="imageGallery__contentWraps imageGridDisplay">
      {imagesList !== null ? (
        <ul className="imageGalley__imageGridDisplay__imageGrid">
          {imagesList.slice((currentPage - 1) * 20, 20 * currentPage).map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={() => setCurrentImage((currentPage - 1) * 20 + idx)}
                className={`imageGalley__imageGridDisplay__imageGrid__gridItems${
                  currentImg === (currentPage - 1) * 20 + idx ? ' active' : ''
                }`}
              >
                <img src={item} alt={idx} />
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
