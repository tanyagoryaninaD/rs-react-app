import type { ReactNode } from 'react';
import type { SearchControlsProps } from '../../../types/interfaces';

export function SearchControls(props: SearchControlsProps): ReactNode {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.onSearch();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        name="search"
        value={props.query}
        onChange={handleChange}
        placeholder="Enter your search term"
        disabled={props.isLoading}
      />
      <button type="submit" disabled={props.isLoading}>
        {props.isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
