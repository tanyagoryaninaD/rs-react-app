import {
  describe,
  it,
  afterEach,
  vi,
  type Mock,
  expect,
  beforeEach,
} from 'vitest';
import { render } from '@testing-library/react';
import {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
} from '../../../server/pokemonApi';
import { CardList } from '../../../components/SearchPanel/CardList/CardList';
import { Provider } from 'react-redux';
import { PokemonListContext } from '../../../types/contexts';
import {
  bulbasaurResponse,
  contextMock,
  contextStateMock,
  ivysaur,
  selectedItems,
} from '../../mocks/data';
import { mockStore } from '../../mocks/store';
import { useLocalStorage } from '../../../utils/localStorage';
import { setContext, setSelectedItems } from '../../mocks/mocks';
import * as helpers from '../../../utils/helpers';

vi.mock('../../../server/pokemonApi', async () => {
  const originalModule = await vi.importActual('../../../server/pokemonApi');
  return {
    ...originalModule,
    useGetPokemonByPageQuery: vi.fn(),
    useGetPokemonByNameQuery: vi.fn(),
  };
});

vi.mock('../../../utils/localStorage', () => ({
  useLocalStorage: vi.fn(),
}));

describe('CardList component', () => {
  beforeEach(() => {
    contextMock.results = [];
    contextMock.error = null;
    contextMock.loading = false;
  });

  afterEach(() => {
    contextMock.results = [];
    contextMock.error = null;
    contextMock.loading = false;
    vi.resetAllMocks();
  });

  it('useGetPokemonByPageQuery should been called with currentApiRequest and query should have called one', () => {
    (useLocalStorage as Mock).mockReturnValue([[], setSelectedItems]);
    (useGetPokemonByPageQuery as Mock).mockReturnValue(() => ({
      data: bulbasaurResponse,
      isLoading: false,
      isFetching: false,
      error: undefined,
    }));
    (useGetPokemonByNameQuery as Mock).mockReturnValue(() => ({
      data: bulbasaurResponse,
      isLoading: false,
      isFetching: false,
      error: undefined,
    }));

    contextMock.currentApiRequest = { apiRequest: 'bulbasaur' };
    render(
      <Provider store={mockStore}>
        <PokemonListContext value={contextMock}>
          <CardList />
        </PokemonListContext>
      </Provider>
    );

    expect(useGetPokemonByPageQuery).toBeCalledWith({
      apiRequest: 'bulbasaur',
    });
    expect(useGetPokemonByNameQuery).not.toBeCalled();
  });

  it('first render should get selectedItems from local storage', () => {
    selectedItems.push(ivysaur);

    (useLocalStorage as Mock).mockImplementation((key, initialValue) => {
      if (key === 'tg-last-search') {
        return [contextStateMock, setContext];
      } else if (key === 'tg-selected-items') {
        return [selectedItems, setSelectedItems];
      }
      return [initialValue, vi.fn()];
    });
    (useGetPokemonByPageQuery as Mock).mockReturnValue(() => ({
      data: bulbasaurResponse,
      isLoading: false,
      isFetching: false,
    }));
    (useGetPokemonByNameQuery as Mock).mockReturnValue(() => ({
      data: bulbasaurResponse,
      isLoading: false,
      isFetching: false,
    }));
    const parseToСsvUrlSpy = vi
      .spyOn(helpers, 'parseToСsvUrl')
      .mockImplementation(() => 'url');

    contextMock.currentApiRequest = { apiRequest: 'bulbasaur' };
    render(
      <Provider store={mockStore}>
        <PokemonListContext value={contextMock}>
          <CardList />
        </PokemonListContext>
      </Provider>
    );

    expect(useLocalStorage).toHaveBeenCalledWith('tg-selected-items', []);
    expect(mockStore.getState().selectedItems).toEqual([ivysaur]);

    parseToСsvUrlSpy.mockRestore();
    selectedItems.length = 0;
  });
});
