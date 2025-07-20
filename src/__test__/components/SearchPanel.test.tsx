import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import userEvent from '@testing-library/user-event';
import Loader from '../../server/Loader';

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
  beforeEach(() => {
    Loader.getInstance();
    window.localStorage.clear();
  });

  it('componentDidMount: loads data from localStorage', () => {
    const mockState = {
      query: 'test',
      results: [],
      error: null,
      isLoading: false,
    };

    window.localStorage.setItem('tg-last-search', JSON.stringify(mockState));

    render(<SearchPanel />);

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('loadPokemon: loads data with query', async () => {
    render(<SearchPanel />);

    const mockFetch = () => {
      return vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockPokemon,
      });
    };

    globalThis.fetch = mockFetch();

    await userEvent.type(screen.getByRole('textbox'), 'pokemon');
    await userEvent.click(screen.getByRole('button', { name: /Search/ }));

    await waitFor(() => {
      const cells = screen.getAllByRole('cell', { name: /pokemon/i });
      expect(cells.length).toBeGreaterThan(0);
    });
  });

  it('loadPokemon: loads data with error', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<SearchPanel />);

    const mockFetch = () => {
      return vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
          throw new Error('fetch error');
        },
      });
    };

    globalThis.fetch = mockFetch();

    await userEvent.type(screen.getByRole('textbox'), 'pokemon');
    await userEvent.click(screen.getByRole('button', { name: /Search/ }));

    await waitFor(() => {
      expect(screen.getByText('fetch error')).toBeInTheDocument();

      consoleError.mockRestore();
    });
  });
});
