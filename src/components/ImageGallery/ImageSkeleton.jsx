export const ImageSkeleton = ({ totalImages = 100, currentPage }) => {
  const imageArray = Array.from({ length: totalImages }, (_, index) => index + 1);
  return (
    <ul className="imageGalley__imageGridDisplay__imageGrid">
      {imageArray.slice((currentPage - 1) * 20, 20 * currentPage).map((item, idx) => {
        return (
          <li
            key={idx}
            className="imageGalley__imageGridDisplay__imageGrid__gridItems imgSkeleton"
          ></li>
        );
      })}
    </ul>
  );
};
