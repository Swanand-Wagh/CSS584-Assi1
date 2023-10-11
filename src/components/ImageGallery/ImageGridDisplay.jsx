import { Pagination } from './Pagination';
import { ImageSkeleton } from './ImageSkeleton';

export const ImageGridDisplay = ({ currentImg, setCurrentImage, currentPage, setCurrentPage, imagesList }) => {
  return (
    <div className="imageGallery__contentWraps imageGridDisplay">
      {currentImg !== -1 ? (
        <ul className="imageGalley__imageGridDisplay__imageGrid">
          {imagesList.slice((currentPage - 1) * 20, 20 * currentPage).map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={() => setCurrentImage(item.id)}
                className={`imageGalley__imageGridDisplay__imageGrid__gridItems${
                  currentImg === item.id ? ' active' : ''
                }`}
              >
                <img src={item.image} alt={idx} />
                <span className="image__number">{item.id}</span>
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
