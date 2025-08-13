import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Card } from '../../../components/SearchPanel/CardList/Card';
import { useGetPokemonByNameQuery } from '../../../server/pokemonApi';
import { PokemonListContext } from '../../../types/contexts';
import { bulbasaur, bulbasaurResponse, contextMock } from '../../mocks/data';
import { Flyout } from '../../../components/components/Flyout';
import * as helpers from '../../../utils/helpers';
import { mockStore } from '../../mocks/store';

vi.mock('../../../server/pokemonApi', async () => {
  const originalModule = await vi.importActual('../../../server/pokemonApi');
  return {
    ...originalModule,
    useGetPokemonByNameQuery: vi.fn(),
  };
});

describe('Card component', () => {
  it('clicks on the checkbox should update Flyout and disable checkbox', async () => {
    (useGetPokemonByNameQuery as Mock).mockReturnValue({
      data: bulbasaurResponse,
      isLoading: false,
      error: null,
    });
    const parseToСsvUrlSpy = vi
      .spyOn(helpers, 'parseToСsvUrl')
      .mockImplementation(() => 'url');

    render(
      <Provider store={mockStore}>
        <PokemonListContext value={contextMock}>
          <Card name={bulbasaur.name} />
          <Flyout />
        </PokemonListContext>
      </Provider>
    );

    const checkbox = screen.getByTestId('card-checkbox') as HTMLInputElement;
    await userEvent.click(checkbox);

    expect(checkbox.checked).toBeTruthy();
    expect(mockStore.getState().selectedItems).toEqual([bulbasaur]);
    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();

    await userEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
    expect(mockStore.getState().selectedItems).toEqual([]);
    expect(screen.getByText(/0 items are selected/i)).toBeInTheDocument();

    expect(contextMock.updateContext).not.toHaveBeenCalled();

    parseToСsvUrlSpy.mockRestore();
    vi.resetAllMocks();
  });
});
