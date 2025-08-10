import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { add, remove } from '../../../store/reducers/selectedItems';
import { Card } from '../../../components/SearchPanel/CardList/Card';
import { bulbasaur, bulbasaurFetch, contextMock } from '../../moks/data';
import { useGetPokemonByNameQuery } from '../../../server/pokemonApi';
import { PokemonListContext } from '../../../types/contexts';
import store from '../../../store/store';

vi.mock('../../../server/pokemonApi', async () => {
  const originalModule = await vi.importActual('../../../server/pokemonApi');
  return {
    ...originalModule,
    useGetPokemonByNameQuery: vi.fn(),
  };
});

const dispatchSpy = vi.spyOn(store, 'dispatch');

describe('Card component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('clicks on the checkbox should update stateSelectedItems', async () => {
    (useGetPokemonByNameQuery as Mock).mockReturnValue({
      data: bulbasaurFetch,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonListContext value={contextMock}>
          <Card name={bulbasaur.name} />
        </PokemonListContext>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('card-checkbox'));

    expect(contextMock.updateContext).not.toHaveBeenCalled();
    expect(dispatchSpy).toBeCalledWith(add(bulbasaur));

    await userEvent.click(screen.getByTestId('card-checkbox'));
    expect(dispatchSpy).toBeCalledWith(remove({ key: bulbasaur.name }));

    dispatchSpy.mockRestore();
  });
});
