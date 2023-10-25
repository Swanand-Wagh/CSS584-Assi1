import { useState } from 'react';
import '../../styles/imageGallery.css';
import { ImageFilters } from './ImageFilters';
import { ImageGridDisplay } from './ImageGridDisplay';
import { imageArray } from '../../constants/ImageList';

export const ImageGallery = () => {
  const [currentImg, setCurrentImage] = useState(imageArray[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesList, setImagesList] = useState(imageArray);
  const [isRelevance, setIsRelevance] = useState(false);
  const [relevantImages, setRelevantImages] = useState([]);

  return (
    <>
      <section className="imageGallery">
        <ImageGridDisplay
          currentImg={currentImg}
          setCurrentImage={setCurrentImage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          imagesList={imagesList}
          setRelevantImages={setRelevantImages}
          relevantImages={relevantImages}
          isRelevance={isRelevance}
        />
        <ImageFilters
          currentImg={currentImg}
          setCurrentImage={setCurrentImage}
          imagesList={imagesList}
          setImagesList={setImagesList}
          setCurrentPage={setCurrentPage}
          setRelevantImages={setRelevantImages}
          relevantImages={relevantImages}
          setIsRelevance={setIsRelevance}
          isRelevance={isRelevance}
        />
      </section>
    </>
  );
};
