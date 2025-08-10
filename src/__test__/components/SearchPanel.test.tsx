import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { useLocalStorage } from '../../utils/localStorage';
import { bulbasaurFetch, contextMock } from '../moks/data';
import { MemoryRouter } from 'react-router-dom';
import {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
} from '../../server/pokemonApi';

vi.mock('../../server/pokemonApi', async () => {
  const originalModule = await vi.importActual('../../server/pokemonApi');
  return {
    ...originalModule,
    useGetPokemonByPageQuery: vi.fn(),
    useGetPokemonByNameQuery: vi.fn(),
  };
});

vi.mock('../../utils/localStorage', () => ({
  useLocalStorage: vi.fn(),
}));

describe('SearchPanel component', () => {
  const setContext = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should call setContext', async () => {
    (useLocalStorage as Mock).mockReturnValue([contextMock, setContext]);
    (useGetPokemonByPageQuery as Mock).mockReturnValue(() => ({
      data: bulbasaurFetch,
      isLoading: false,
      isFetching: false,
    }));
    (useGetPokemonByNameQuery as Mock).mockReturnValue(() => ({
      data: bulbasaurFetch,
      isLoading: false,
      isFetching: false,
    }));

    render(
      <MemoryRouter initialEntries={['/?details=bulbasaur&page=2']}>
        <SearchPanel />
      </MemoryRouter>
    );

    expect(setContext).toHaveBeenCalled();
  });
});
