import { useState, type ReactNode } from 'react';
import type { PaginationProps } from '../../../types/interfaces';
import { useParams } from 'react-router-dom';

export function Pagination(props: PaginationProps): ReactNode {
  const { page } = useParams();
  const currentPage = Number(page) || 1;

  const [pagination, setPageCount] = useState({
    isLoading: true,
    prevDisabled: currentPage === 1 ? true : false,
    nextDisabled: false,
  });

  const updateStates = async (newPage: number): Promise<void> => {
    props.onUpdateState({ page: newPage, isLoading: true });

    setPageCount((prevState) => ({
      ...prevState,
      isLoading: true,
      prevDisabled: true,
      nextDisabled: true,
    }));

    await props.onSearch({ page: newPage });

    if (newPage === 1) {
      setPageCount((prevState) => ({
        ...prevState,
        isLoading: false,
        prevDisabled: true,
        nextDisabled: false,
      }));
    } else {
      setPageCount((prevState) => ({
        ...prevState,
        isLoading: false,
        prevDisabled: false,
        nextDisabled: false,
      }));
    }
  };

  const handlePaginationClickPrev = (): void => {
    const newPage = currentPage - 1;
    updateStates(newPage);
  };

  const handlePaginationClickNext = (): void => {
    const newPage = currentPage + 1;
    updateStates(newPage);
  };

  return (
    <div className="pagination">
      <button
        className="prev"
        onClick={handlePaginationClickPrev}
        disabled={pagination.prevDisabled}
      >
        Prev
      </button>
      <p>{currentPage}</p>
      <button
        className="next"
        onClick={handlePaginationClickNext}
        disabled={pagination.nextDisabled}
      >
        Next
      </button>
    </div>
  );
}
