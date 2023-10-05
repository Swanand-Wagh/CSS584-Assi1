import { useState } from 'react';
import '../../styles/imageGallery.css';
import { ImageFilters } from './ImageFilters';
import { ImageGridDisplay } from './ImageGridDisplay';
import { imageArray } from '../../constants/ImageList';

export const ImageGallery = () => {
  const [currentImg, setCurrentImage] = useState(imageArray[0]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <section className="imageGallery">
        <ImageGridDisplay
          currentImg={currentImg}
          setCurrentImage={setCurrentImage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ImageFilters currentImg={currentImg} setCurrentImage={setCurrentImage} />
      </section>
    </>
  );
};
