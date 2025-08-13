import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { useLocalStorage } from '../../utils/localStorage';
import {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
} from '../../server/pokemonApi';
import {
  bulbasaurResponse,
  contextMock,
  contextStateMock,
  selectedItems,
} from '../mocks/data';
import { mockStore } from '../mocks/store';
import { MockProvider } from '../mocks/MockProvider';
import { setSelectedItems } from '../mocks/mocks';

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

  it('should get context from local storage', async () => {
    const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
    (useLocalStorage as Mock).mockReturnValueOnce([contextMock, setContext]);
    (useLocalStorage as Mock).mockReturnValueOnce([
      selectedItems,
      setSelectedItems,
    ]);
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

    render(
      MockProvider(<SearchPanel />, {
        initialEntries: '/?details=bulbasaur&page=2',
      })
    );

    contextStateMock.details = 'bulbasaur';
    contextStateMock.page = 2;
    contextStateMock.currentApiRequest = {};

    expect(useLocalStorage).toHaveBeenCalledTimes(2);
    expect(useLocalStorage).toHaveBeenNthCalledWith(
      1,
      'tg-last-search',
      contextStateMock
    );
    expect(useLocalStorage).toHaveBeenNthCalledWith(2, 'tg-selected-items', []);
    expect(setContext).toHaveBeenCalled();

    dispatchSpy.mockRestore();
  });
});
