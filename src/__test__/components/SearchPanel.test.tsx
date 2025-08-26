import { screen, render } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  afterEach,
  type Mock,
  beforeEach,
} from 'vitest';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { useLocalStorage } from '../../utils/localStorage';
import {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
} from '../../server/pokemonApi';
import {
  bulbasaurResponse,
  contextStateMock,
  selectedItems,
} from '../mocks/data';
import { mockStore } from '../mocks/store';
import { MockProvider } from '../mocks/MockProvider';
import { setSelectedItems, updateContext } from '../mocks/mockFunctions';
import userEvent from '@testing-library/user-event';

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
  const setContext = vi.fn().mockImplementation(() => updateContext);

  beforeEach(() => {
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
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders with the request parameters should set them to the context', async () => {
    const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
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
    contextStateMock.details = null;
    contextStateMock.page = null;
    contextStateMock.currentApiRequest = null;
  });

  it('clicks for submit should update context', async () => {
    const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
    render(MockProvider(<SearchPanel />));

    const button = screen.getByRole('button', {
      name: /search/i,
    }) as HTMLButtonElement;

    await userEvent.click(button);

    expect(setContext).toHaveBeenCalled();

    dispatchSpy.mockRestore();
  });
});
