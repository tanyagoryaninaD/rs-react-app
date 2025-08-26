import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { CardList } from '../../../components/SearchPanel/CardList/CardList';
import userEvent from '@testing-library/user-event';
import { mockResults, mockState } from '../../mocks/data';
import { mockOnSearch, mockOnUpdateState } from '../../mocks/mockFunctions';
import { MockProvider } from '../../mocks/MockProvider';

describe('CardList component', () => {
  beforeEach(() => {
    mockState.results = [];
    mockState.error = null;
    mockState.isLoading = false;
  });

  afterEach(() => {
    mockState.results = [];
    mockState.error = null;
    mockState.isLoading = false;
  });

  it('renders without results', async () => {
    mockState.error = 'No results found';

    render(
      MockProvider(
        <CardList
          data={mockState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      )
    );

    const result = screen.getByText(/No results found/i);
    expect(result).toBeInTheDocument();
  });

  it('renders with results', async () => {
    mockState.results = mockResults;

    render(
      MockProvider(
        <CardList
          data={mockState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      )
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('renders with loading state', async () => {
    mockState.isLoading = true;

    render(
      MockProvider(
        <CardList
          data={mockState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      )
    );

    expect(screen.getByText(/Loading data.../)).toBeInTheDocument();
    expect(screen.queryByText(/Bulbasaur/i)).toBeNull();
  });

  it('when click on the card, the details should be updated', async () => {
    mockState.results = mockResults;

    render(
      MockProvider(
        <CardList
          data={mockState}
          onSearch={mockOnSearch}
          onUpdateState={mockOnUpdateState}
        />
      )
    );

    await userEvent.click(screen.getAllByTestId('card')[0]);

    expect(mockOnUpdateState).toBeCalledWith({ details: 'bulbasaur' });
  });
});
