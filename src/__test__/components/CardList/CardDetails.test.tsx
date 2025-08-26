import { render, screen } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  afterEach,
  vi,
  type Mock,
  beforeEach,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import { CardDetails } from '../../../components/SearchPanel/CardList/CardDetails';
import { useGetPokemonByNameQuery } from '../../../server/pokemonApi';
import { PokemonListContext } from '../../../types/contexts';
import {
  bulbasaurResponse,
  contextMock,
  type MockPokemon,
} from '../../mocks/data';
import { MockProvider } from '../../mocks/MockProvider';

vi.mock('../../../server/pokemonApi', async () => {
  const originalModule = await vi.importActual('../../../server/pokemonApi');
  return {
    ...originalModule,
    useGetPokemonByNameQuery: vi.fn(),
  };
});

describe('CardDetails component', () => {
  let mockResponse: MockPokemon;

  beforeEach(() => {
    mockResponse = structuredClone(bulbasaurResponse);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('clicking on the "close" button should close cardDetails', async () => {
    (useGetPokemonByNameQuery as Mock).mockReturnValue({
      data: mockResponse,
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
    mockResponse.abilities = [];
    mockResponse.moves = [];

    (useGetPokemonByNameQuery as Mock).mockReturnValue({
      data: mockResponse,
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
