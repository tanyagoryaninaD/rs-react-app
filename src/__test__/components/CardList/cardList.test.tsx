import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardList } from '../../../components/SearchPanel/CardList/CardList';

describe('CardList component', () => {
  it('renders without results', () => {
    render(<CardList results={[]} isLoading={false} error={null} />);

    const result = screen.getByText(/No results found/);
    expect(result).toBeInTheDocument();
  });

  it('renders with results', () => {
    const mockResults = [
      {
        name: 'Pokemon',
        id: 1,
      },
    ];
    render(<CardList results={mockResults} isLoading={false} error={null} />);

    expect(screen.getByText(/Pokemon/)).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    render(<CardList results={[]} isLoading={true} error={null} />);

    expect(screen.getByText(/Loading data.../)).toBeInTheDocument();
    expect(
      screen.getByText(/Loading data.../).querySelector('.loader-spinner')
    ).toBeInTheDocument();
    expect(screen.queryByText(/Pokemon/)).toBeNull();
  });
});
