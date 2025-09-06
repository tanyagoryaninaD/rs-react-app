import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CardDetails } from '../../../components/SearchPanel/CardList/CardDetails';
import { useGetPokemonByNameQuery } from '../../../server/pokemonApi';
import { PokemonListContext } from '../../../utils/contexts';
import { bulbasaurResponse, contextMock } from '../../mocks/data';
import { MockProvider } from '../../mocks/MockProvider';

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
      data: bulbasaurResponse,
      isLoading: false,
      error: null,
    });

    render(
      MockProvider(
        <PokemonListContext value={contextMock}>
          <CardDetails />
        </PokemonListContext>
      )
    );

    const button = screen.getByRole('button', { name: /Close/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(contextMock.updateContext).toHaveBeenCalledWith({ details: null });
  });

  it('renders without abilities and moves', async () => {
    const response = { ...bulbasaurResponse };
    response.abilities = [];
    response.moves = [];

    (useGetPokemonByNameQuery as Mock).mockReturnValue({
      data: response,
      isLoading: false,
      error: null,
    });

    render(
      MockProvider(
        <PokemonListContext value={contextMock}>
          <CardDetails />
        </PokemonListContext>
      )
    );

    expect(screen.queryByTestId('abilities')).not.toBeInTheDocument();
    expect(screen.queryByTestId('moves')).not.toBeInTheDocument();
  });
});
