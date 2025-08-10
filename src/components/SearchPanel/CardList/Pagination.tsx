import { useContext, type ReactNode } from 'react';
import { PokemonListContext } from '../../../types/contexts';

export function Pagination(): ReactNode {
  const { page, pagePrev, pageNext, updateContext } =
    useContext(PokemonListContext);

  const handlePaginationClickPrev = (): void => {
    updateContext({
      page: page ? page - 1 : 1,
      loading: true,
      currentApiRequest: { apiRequest: pagePrev },
    });
  };

  const handlePaginationClickNext = (): void => {
    updateContext({
      page: page ? page + 1 : 1,
      loading: true,
      currentApiRequest: { apiRequest: pageNext },
    });
  };

  return (
    <div className="pagination">
      <button
        className="prev"
        onClick={handlePaginationClickPrev}
        disabled={pagePrev ? false : true}
      >
        Prev
      </button>
      <p data-testid="page">{page}</p>
      <button
        className="next"
        onClick={handlePaginationClickNext}
        disabled={pageNext ? false : true}
      >
        Next
      </button>
    </div>
  );
}
