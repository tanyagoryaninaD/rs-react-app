import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Pagination } from '../../../components/SearchPanel/CardList/Pagination';
import userEvent from '@testing-library/user-event';
import { mockOnSearch, mockOnUpdateState } from '../../mocks/mocks';

describe('Pagination component', () => {
  it('renders with button and page', async () => {
    render(
      <Pagination
        page={1}
        onUpdateState={mockOnUpdateState}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByRole('button', { name: /Prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /Prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('change page when clicked on Next', async () => {
    render(
      <Pagination
        page={1}
        onUpdateState={mockOnUpdateState}
        onSearch={mockOnSearch}
      />
    );

    const button = screen.getByRole('button', { name: /Next/i });

    await userEvent.click(button);

    expect(mockOnUpdateState).toHaveBeenNthCalledWith(1, {
      isLoading: true,
      page: 2,
    });
    expect(mockOnUpdateState).toHaveBeenNthCalledWith(2, {
      isLoading: false,
    });
    expect(mockOnSearch).toHaveBeenCalledWith({
      page: 2,
    });
  });

  it('change page when clicked on Prev', async () => {
    render(
      <Pagination
        page={2}
        onUpdateState={mockOnUpdateState}
        onSearch={mockOnSearch}
      />
    );

    const button = screen.getByRole('button', {
      name: /Prev/i,
    });

    await userEvent.click(button);

    expect(mockOnUpdateState).toHaveBeenNthCalledWith(1, {
      isLoading: true,
      page: 1,
    });
    expect(mockOnUpdateState).toHaveBeenNthCalledWith(2, {
      isLoading: false,
    });
    expect(mockOnSearch).toHaveBeenCalledWith({
      page: 1,
    });
  });
});
