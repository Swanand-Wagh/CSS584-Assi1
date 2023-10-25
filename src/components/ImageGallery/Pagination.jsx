import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const totalItems = 100;
const itemsPerPage = 20;

const totalPages = Math.ceil(totalItems / itemsPerPage);

export const Pagination = ({ currentPage, setCurrentPage }) => {
  const pageArray = Array.from({ length: totalPages }, (_, index) => index + 1);

  const [paginationSlice, setPaginationSlice] = React.useState({
    startIndex: 0,
    sliceItemIndex: 5,
  });

  const handlePaginationSlice = React.useCallback(() => {
    if (currentPage >= 4 && currentPage <= totalPages - 3) {
      setPaginationSlice({
        startIndex: currentPage - 3,
        sliceItemIndex: currentPage + 2,
      });
      return;
    }

    if (currentPage < 4) {
      setPaginationSlice({
        startIndex: 0,
        sliceItemIndex: 5,
      });
      return;
    }

    if (currentPage > totalPages - 3) {
      setPaginationSlice({
        startIndex: totalPages - 5,
        sliceItemIndex: totalPages,
      });
    }
  }, [currentPage]);

  React.useEffect(() => {
    handlePaginationSlice();
  }, [currentPage, handlePaginationSlice]);

  return (
    <div className="imageGalley__imageGridDisplay__paginationWrap">
      <button
        onClick={() => setCurrentPage(1)}
        className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns startBtn"
      >
        Start
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((current) => current - 1)}
        className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns previousBtn"
      >
        <MdNavigateBefore />
      </button>

      {pageArray
        .slice(paginationSlice.startIndex, paginationSlice.sliceItemIndex)
        .map((page, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setCurrentPage(page)}
              className={`imageGalley__imageGridDisplay__paginationWrap__paginationBtns currentPageBtn${
                currentPage === page ? ' active' : ''
              }`}
            >
              {page}
            </button>
          );
        })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((current) => current + 1)}
        className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns nextBtn"
      >
        <MdNavigateNext />
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        className="imageGalley__imageGridDisplay__paginationWrap__paginationBtns lastBtn"
      >
        Last
      </button>
    </div>
  );
};
