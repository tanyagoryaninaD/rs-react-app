import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NoResults } from '../../../components/SearchPanel/CardList/NoResults';

describe('NoResults component', () => {
  it('renders with error = "" ', () => {
    render(<NoResults />);

    const noResults = screen
      .getByText(/No results found/)
      .closest('.no-results');

    expect(noResults).toBeInTheDocument();
  });
});
