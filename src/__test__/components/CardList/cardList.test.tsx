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
import { setContext, setSelectedItems } from '../../mocks/mockFunctions';
import * as helpers from '../../../utils/helpers';
import { MockProvider } from '../../mocks/MockProvider';

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
  const context = { ...contextMock };

  beforeEach(() => {
    context.results = [];
    context.error = null;
  });

  afterEach(() => {
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

    context.currentApiRequest = { apiRequest: 'bulbasaur' };

    render(
      MockProvider(
        <PokemonListContext value={context}>
          <CardList />
        </PokemonListContext>
      )
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
      }
      if (key === 'tg-selected-items') {
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

    context.currentApiRequest = { apiRequest: 'bulbasaur' };

    render(
      MockProvider(
        <PokemonListContext value={context}>
          <CardList />
        </PokemonListContext>
      )
    );

    expect(useLocalStorage).toHaveBeenCalledWith('tg-selected-items', []);
    expect(mockStore.getState().selectedItems).toEqual([ivysaur]);

    parseToСsvUrlSpy.mockRestore();
    selectedItems.length = 0;
  });
});
