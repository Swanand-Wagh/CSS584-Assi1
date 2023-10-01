import React from "react";
import "../../styles/imageGallery.css";
import { ImageFilters } from "./ImageFilters";
import { ImageGridDisplay } from "./ImageGridDisplay";
import { imageArray } from "../../constants/ImageList";

export const ImageGallery = () => {
  const [currentImg, setCurrentImage] = React.useState(imageArray[0]);
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <React.Fragment>
      <section className="imageGallery">
        <ImageGridDisplay
          currentImg={currentImg}
          setCurrentImage={setCurrentImage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ImageFilters currentImg={currentImg} setCurrentImage={setCurrentImage} />
      </section>
    </React.Fragment>
  );
};
