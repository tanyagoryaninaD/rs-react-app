import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardList } from '../../../components/SearchPanel/CardList/CardList';
import { MemoryRouter } from 'react-router-dom';

describe('CardList component', () => {
  it('renders without results', async () => {
    render(
      <MemoryRouter>
        <CardList
          data={{
            query: '',
            results: [],
            isLoading: false,
            error: null,
            page: 1,
          }}
        />
      </MemoryRouter>
    );

    const result = screen.getByText(/No results found/);
    expect(result).toBeInTheDocument();
  });

  it('renders with results', async () => {
    const mockResults = [
      {
        name: 'Pokemon',
        id: 1,
      },
    ];
    render(
      <MemoryRouter>
        <CardList
          data={{
            query: '',
            results: mockResults,
            isLoading: false,
            error: null,
            page: 1,
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Pokemon/)).toBeInTheDocument();
  });

  it('renders with loading state', async () => {
    render(
      <MemoryRouter>
        <CardList
          data={{
            query: '',
            results: [],
            isLoading: true,
            error: null,
            page: 1,
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading data.../)).toBeInTheDocument();
    expect(screen.queryByText(/Pokemon/)).toBeNull();
  });
});
