import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CardList } from '../../../components/SearchPanel/CardList/CardList';
import userEvent from '@testing-library/user-event';
import type { SearchPanelState } from '../../../types/interfaces';

const mockResults = [
  {
    name: 'pikachu',
    id: 1,
    abilities: [''],
    image: '',
    moves: [''],
  },
];
const mockOnUpdateState = vi.fn();
const mockOnSearch = vi.fn();

describe('CardList component', () => {
  let mockDataState: SearchPanelState;

  beforeEach(() => {
    mockDataState = {
      query: '',
      results: [],
      isLoading: false,
      error: null,
      page: 1,
      details: null,
    };
  });

  it('renders without results', async () => {
    mockDataState.error = 'No results found';

    render(
      <CardList
        data={mockDataState}
        onSearch={mockOnSearch}
        onUpdateState={mockOnUpdateState}
      />
    );

    const result = screen.getByText(/No results found/i);
    expect(result).toBeInTheDocument();
  });

  it('renders with results', async () => {
    mockDataState.results = mockResults;

    render(
      <CardList
        data={mockDataState}
        onSearch={mockOnSearch}
        onUpdateState={mockOnUpdateState}
      />
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('renders with loading state', async () => {
    mockDataState.isLoading = true;

    render(
      <CardList
        data={mockDataState}
        onSearch={mockOnSearch}
        onUpdateState={mockOnUpdateState}
      />
    );

    expect(screen.getByText(/Loading data.../)).toBeInTheDocument();
    expect(screen.queryByText(/Pokemon/)).toBeNull();
  });

  it('when click on the card, the details should be updated', async () => {
    mockDataState.results = mockResults;

    render(
      <CardList
        data={mockDataState}
        onSearch={mockOnSearch}
        onUpdateState={mockOnUpdateState}
      />
    );

    await userEvent.click(screen.getByTestId('card'));

    expect(mockOnUpdateState).toBeCalledWith({ details: 'pikachu' });
  });
});
