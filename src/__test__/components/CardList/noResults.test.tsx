import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NoResults from '../../../components/SearchPanel/CardList/NoResults';

describe('NoResults component', () => {
  it('renders with error message', () => {
    render(<NoResults error={'test error message'} />);

    const noResults = screen
      .getByText(/test error message/)
      .closest('.no-results');
    expect(noResults).toBeInTheDocument();
  });

  it('renders with error = "" ', () => {
    render(<NoResults error={''} />);

    const noResults = screen
      .getByText(/No results found/)
      .closest('.no-results');
    expect(noResults).toBeInTheDocument();
  });

  it('renders with error = null', () => {
    render(<NoResults error={null} />);

    const noResults = screen
      .getByText(/No results found/)
      .closest('.no-results');
    expect(noResults).toBeInTheDocument();
  });
});
