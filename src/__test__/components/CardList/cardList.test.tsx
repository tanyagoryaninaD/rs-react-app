import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CardList } from '../../../components/SearchPanel/CardList/CardList';
import userEvent from '@testing-library/user-event';
import type { SearchPanelState } from '../../../types/interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { selectedItemsSlice } from '../../../utils/store';

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

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

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
      <Provider store={mockStore}>
        <CardList
          data={mockDataState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      </Provider>
    );

    const result = screen.getByText(/No results found/i);
    expect(result).toBeInTheDocument();
  });

  it('renders with results', async () => {
    mockDataState.results = mockResults;

    render(
      <Provider store={mockStore}>
        <CardList
          data={mockDataState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      </Provider>
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('renders with loading state', async () => {
    mockDataState.isLoading = true;

    render(
      <Provider store={mockStore}>
        <CardList
          data={mockDataState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      </Provider>
    );

    expect(screen.getByText(/Loading data.../)).toBeInTheDocument();
    expect(screen.queryByText(/Pokemon/)).toBeNull();
  });

  it('when click on the card, the details should be updated', async () => {
    mockDataState.results = mockResults;

    render(
      <Provider store={mockStore}>
        <CardList
          data={mockDataState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      </Provider>
    );

    await userEvent.click(screen.getByTestId('card'));

    expect(mockOnUpdateState).toBeCalledWith({ details: 'pikachu' });
  });

  it('', async () => {
    mockDataState.results = mockResults;

    render(
      <Provider store={mockStore}>
        <CardList
          data={mockDataState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      </Provider>
    );

    await userEvent.click(screen.getByTestId('card'));

    expect(mockOnUpdateState).toBeCalledWith({ details: 'pikachu' });
  });
});
