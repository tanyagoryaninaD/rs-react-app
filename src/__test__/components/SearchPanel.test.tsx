import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import userEvent from '@testing-library/user-event';

const mockPokemon = {
  name: 'pokemon',
  id: 2,
  sprites: {
    front_default: 'https://example.com/front_default.png',
    other: {
      dream_world: {
        front_default: 'https://example.com/dream_world.png',
      },
    },
  },
  abilities: [{ ability: { name: 'ability-1' } }],
  moves: [{ move: { name: 'move-1' } }],
};

describe('SearchPanel component', () => {
  it('componentDidMount: loads data from localStorage', () => {
    const mockState = {
      query: 'test',
      results: [],
      error: null,
      isLoading: false,
    };

    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(mockState));

    render(<SearchPanel />);

    expect(getItemSpy).toHaveBeenCalledWith('tg-last-search');
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();

    getItemSpy.mockRestore();
  });

  it('loadPokemon: loads data with query', async () => {
    render(<SearchPanel />);

    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockPokemon,
    } as Response);

    await userEvent.type(screen.getByRole('textbox'), 'pokemon');
    await userEvent.click(screen.getByRole('button', { name: /Search/ }));

    await waitFor(() => {
      const cells = screen.getAllByRole('cell', { name: /pokemon/i });
      expect(cells.length).toBeGreaterThan(0);
      expect(mockFetch).toBeCalled();
    });

    mockFetch.mockRestore();
  });

  it('loadPokemon: loads data with error', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => {
        throw new Error('fetch error');
      },
    } as unknown as Response);

    render(<SearchPanel />);

    await userEvent.type(screen.getByRole('textbox'), 'pokemon');
    await userEvent.click(screen.getByRole('button', { name: /Search/ }));

    await waitFor(() => {
      expect(screen.getByText('fetch error')).toBeInTheDocument();
      expect(mockFetch).toBeCalled();
    });

    mockFetch.mockRestore();
    consoleError.mockRestore();
  });
});
