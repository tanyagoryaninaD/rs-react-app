import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Pagination } from '../../../components/SearchPanel/CardList/Pagination';
import userEvent from '@testing-library/user-event';

const mockOnUpdateState = vi.fn();
const mockOnSearch = vi.fn();

describe('Pagination component', () => {
  it('renders with button and page', async () => {
    render(
      <MemoryRouter initialEntries={[`/pokemon/page/1`]}>
        <Pagination onUpdateState={mockOnUpdateState} onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Prev/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
      expect(screen.getByText(/1/i)).toBeInTheDocument();
    });
  });

  it('disables Prev button on the first page', async () => {
    render(
      <MemoryRouter initialEntries={[`/pokemon/page/1`]}>
        <Routes>
          <Route
            path="/pokemon/page/:page"
            element={
              <Pagination
                onUpdateState={mockOnUpdateState}
                onSearch={mockOnSearch}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const prevButton = screen.getByRole('button', { name: /Prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('change page when clicked on Next', async () => {
    render(
      <MemoryRouter initialEntries={[`/pokemon/page/2`]}>
        <Routes>
          <Route
            path="/pokemon/page/:page"
            element={
              <Pagination
                onUpdateState={mockOnUpdateState}
                onSearch={mockOnSearch}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Next/i });

    await userEvent.click(button);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith({
        page: 3,
      });
    });
  });

  it('change page when clicked on Prev', async () => {
    render(
      <MemoryRouter initialEntries={[`/pokemon/page/2`]}>
        <Routes>
          <Route
            path="/pokemon/page/:page"
            element={
              <Pagination
                onUpdateState={mockOnUpdateState}
                onSearch={mockOnSearch}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', {
      name: /Prev/i,
    }) as HTMLButtonElement;
    button.disabled = false;

    await userEvent.click(button);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith({
        page: 1,
      });
    });
  });
});
