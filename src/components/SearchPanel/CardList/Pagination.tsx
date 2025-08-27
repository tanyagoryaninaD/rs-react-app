import { useContext, type ReactNode } from 'react';
import { PokemonListContext } from '../../../types/contexts';

export function Pagination(): ReactNode {
  const { page, pagePrev, pageNext, updateContext } =
    useContext(PokemonListContext);

  const handlePaginationClickPrev = (): void => {
    updateContext({
      page: page && page - 1,
      currentApiRequest: { apiRequest: pagePrev },
    });
  };

  const handlePaginationClickNext = (): void => {
    updateContext({
      page: page && page + 1,
      currentApiRequest: { apiRequest: pageNext },
    });
  };

  return (
    <div className="pagination">
      <button
        className="prev"
        onClick={handlePaginationClickPrev}
        disabled={!pagePrev}
      >
        Prev
      </button>
      <p data-testid="page">{page}</p>
      <button
        className="next"
        onClick={handlePaginationClickNext}
        disabled={!pageNext}
      >
        Next
      </button>
    </div>
  );
}
