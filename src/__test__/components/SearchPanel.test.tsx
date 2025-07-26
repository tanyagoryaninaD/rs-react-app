import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import userEvent from '@testing-library/user-event';
import * as pokemonApi from '../../server/Loader';

const mockResults = [
  {
    name: 'ivysaur',
    id: 1,
    abilities: [''],
    image: '',
    moves: [''],
  },
];

describe('SearchPanel component', () => {
  it('componentDidMount: loads data from localStorage', () => {
    const mockState = {
      query: 'ivysaur',
      results: mockResults,
      error: null,
      isLoading: false,
    };

    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(mockState));

    render(<SearchPanel />);

    expect(getItemSpy).toHaveBeenCalledWith('tg-last-search');
    expect(screen.getByDisplayValue('ivysaur')).toBeInTheDocument();

    getItemSpy.mockRestore();
  });

  it('loadPokemon: loads data with query', async () => {
    const mockGetPokemon = vi
      .spyOn(pokemonApi, 'getPokemon')
      .mockImplementation(async () => mockResults);

    render(<SearchPanel />);

    await userEvent.type(screen.getByRole('textbox'), 'ivysaur');
    await userEvent.click(screen.getByRole('button', { name: /Search/ }));

    await waitFor(() => {
      const pokemon = screen.getByText(/ivysaur/i);
      expect(pokemon).toBeInTheDocument();
      expect(mockGetPokemon).toBeCalledWith(
        expect.objectContaining({ query: 'ivysaur' })
      );
    });

    mockGetPokemon.mockRestore();
  });

  it('loadPokemon: loads data with error', async () => {
    const mockGetPokemon = vi
      .spyOn(pokemonApi, 'getPokemon')
      .mockRejectedValue(new Error('test error'));

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<SearchPanel />);

    await userEvent.type(screen.getByRole('textbox'), 'ivysaur');
    await userEvent.click(screen.getByRole('button', { name: /Search/ }));

    await waitFor(() => {
      expect(screen.getByText('test error')).toBeInTheDocument();
      expect(mockGetPokemon).toBeCalled();
    });

    mockGetPokemon.mockRestore();
    consoleError.mockRestore();
  });
});
