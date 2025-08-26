import { useContext, type ReactNode } from 'react';
import { PokemonListContext } from '../../../types/contexts';

export function SearchControls(): ReactNode {
  const { query, loadingButtonSearch, updateContext } =
    useContext(PokemonListContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    updateContext({
      currentApiRequest: { apiRequest: query },
      results: [],
      page: null,
      pageNext: null,
      pagePrev: null,
      error: null,
      loadingButtonSearch: true,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateContext({ query: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        name="search"
        value={query}
        onChange={handleChange}
        placeholder="Enter your search term"
        disabled={loadingButtonSearch}
        data-testid="search-input"
      />
      <button type="submit" disabled={loadingButtonSearch}>
        {loadingButtonSearch ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
