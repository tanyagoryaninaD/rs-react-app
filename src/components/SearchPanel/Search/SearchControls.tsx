import { useContext, type ReactNode } from 'react';
import { PokemonListContext } from '../../../types/contexts';

export function SearchControls(): ReactNode {
  const { query, loading, updateContext } = useContext(PokemonListContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    updateContext({
      loading: true,
      currentApiRequest: { apiRequest: query },
      results: [],
      page: null,
      pageNext: null,
      pagePrev: null,
      details: null,
      error: null,
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
        disabled={loading}
        data-testid="search-input"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
