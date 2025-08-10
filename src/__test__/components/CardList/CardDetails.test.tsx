import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CardDetails } from '../../../components/SearchPanel/CardList/CardDetails';
import { bulbasaurFetch, contextMock } from '../../moks/data';
import { Provider } from 'react-redux';
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

describe('CardDetails component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('clicking on the "close" button should close cardDetails', async () => {
    (useGetPokemonByNameQuery as Mock).mockReturnValue({
      data: bulbasaurFetch,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonListContext value={contextMock}>
          <CardDetails />
        </PokemonListContext>
      </Provider>
    );

    const button = await screen.findByRole('button', { name: /Close/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(contextMock.updateContext).toHaveBeenCalledWith({ details: null });
  });
});
