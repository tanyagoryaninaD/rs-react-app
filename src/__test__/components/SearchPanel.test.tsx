import { render, screen, waitFor } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  type MockInstance,
  beforeEach,
  afterEach,
} from 'vitest';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import * as pokemonApi from '../../server/Loader';
import { Route, Routes } from 'react-router-dom';
import type { GetPokemon, MyPokemon } from '../../types/interfaces';
import { bulbasaur, mockState } from '../mocks/data';
import { MockProvider } from '../mocks/MockProvider';

describe('SearchPanel component', () => {
  let getItemSpy: MockInstance<(key: string) => string | null>;
  let mockGetPokemon: MockInstance<(data: GetPokemon) => Promise<MyPokemon[]>>;

  beforeEach(() => {
    getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(mockState));
  });

  afterEach(() => {
    getItemSpy.mockRestore();
    mockGetPokemon.mockRestore();
  });

  it('should upload data to the SearchPanel for search queries from the url and get an error for the rejected request', async () => {
    getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockRejectedValue('');
    mockGetPokemon = vi.spyOn(pokemonApi, 'getPokemon').mockResolvedValue([]);
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      MockProvider(
        <Routes>
          <Route index element={<SearchPanel />} />
        </Routes>,
        { initialEntries: '/?details=pikachu&page=2' }
      )
    );

    await waitFor(() => {
      expect(mockGetPokemon).toBeCalledTimes(3);
      expect(mockGetPokemon).toHaveBeenNthCalledWith(1, {
        query: 'pikachu',
        page: undefined,
      });
      expect(mockGetPokemon).toHaveBeenNthCalledWith(2, {
        page: 2,
        query: '',
      });
      expect(mockGetPokemon).toHaveBeenNthCalledWith(3, { query: 'pikachu' });

      expect(consoleError).toBeCalled();
    });

    consoleError.mockRestore();
  });

  it('if there is an error in loading СardDetails, an error should be displayed in the console', async () => {
    getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockRejectedValue('');
    mockGetPokemon = vi
      .spyOn(pokemonApi, 'getPokemon')
      .mockRejectedValue(new Error('test error'));
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      MockProvider(
        <Routes>
          <Route index element={<SearchPanel />} />
        </Routes>,
        { initialEntries: '/?details=pikachu&page=2' }
      )
    );

    await waitFor(() => {
      expect(mockGetPokemon).toHaveBeenNthCalledWith(1, {
        query: 'pikachu',
        page: undefined,
      });
      expect(consoleError).toBeCalled();
    });

    consoleError.mockRestore();
  });

  it('during rendering data should be loaded from localStorage', async () => {
    mockGetPokemon = vi
      .spyOn(pokemonApi, 'getPokemon')
      .mockResolvedValueOnce([bulbasaur]);

    mockState.query = 'bulbasaur';
    getItemSpy.mockReturnValueOnce(JSON.stringify(mockState));

    render(MockProvider(<SearchPanel />));

    await waitFor(() => {
      expect(getItemSpy).toHaveBeenCalledWith('tg-last-search');

      expect(mockGetPokemon).toHaveBeenCalledTimes(1);
      expect(mockGetPokemon).toHaveBeenNthCalledWith(1, {
        page: undefined,
        query: 'bulbasaur',
      });

      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });
  });

  it('loads data with error', async () => {
    mockGetPokemon = vi
      .spyOn(pokemonApi, 'getPokemon')
      .mockRejectedValue(new Error('test error'));

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(MockProvider(<SearchPanel />));

    await waitFor(() => {
      expect(screen.getByText('test error')).toBeInTheDocument();
      expect(mockGetPokemon).toBeCalled();
    });

    consoleError.mockRestore();
  });
});
