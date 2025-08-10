import { describe, it, afterEach, vi, type Mock, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
} from '../../../server/pokemonApi';
import { bulbasaurFetch, contextMock } from '../../moks/data';
import { CardList } from '../../../components/SearchPanel/CardList/CardList';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import { PokemonListContext } from '../../../types/contexts';

vi.mock('../../../server/pokemonApi', async () => {
  const originalModule = await vi.importActual('../../../server/pokemonApi');
  return {
    ...originalModule,
    useGetPokemonByPageQuery: vi.fn(),
    useGetPokemonByNameQuery: vi.fn(),
  };
});

describe('CardList component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('useGetPokemonByPageQuery and useGetPokemonByNameQuery should been called with apiRequest', () => {
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

    contextMock.currentApiRequest = { apiRequest: 'bulbasaur' };
    render(
      <Provider store={store}>
        <PokemonListContext value={contextMock}>
          <CardList />
        </PokemonListContext>
      </Provider>
    );

    expect(useGetPokemonByPageQuery).toBeCalledWith({
      apiRequest: 'bulbasaur',
    });
    expect(useGetPokemonByNameQuery).toBeCalledWith('bulbasaur');
  });

  it('useGetPokemonByPageQuery and useGetPokemonByNameQuery should been called with offset', () => {
    (useGetPokemonByPageQuery as Mock).mockReturnValue(() => ({
      data: { results: [{ name: 'bulbasaur' }] },
      isLoading: false,
      isFetching: false,
    }));
    (useGetPokemonByNameQuery as Mock).mockReturnValue(() => ({
      data: bulbasaurFetch,
      isLoading: false,
      isFetching: false,
    }));

    contextMock.currentApiRequest = { offset: 10 };
    render(
      <Provider store={store}>
        <PokemonListContext value={contextMock}>
          <CardList />
        </PokemonListContext>
      </Provider>
    );

    expect(useGetPokemonByPageQuery).toBeCalledWith({
      offset: 10,
    });
    expect(useGetPokemonByNameQuery).toBeCalledWith('bulbasaur');
  });
});
