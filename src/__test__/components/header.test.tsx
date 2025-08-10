import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock, afterEach } from 'vitest';
import { Header } from '../../components/Header';
import { MemoryRouter } from 'react-router-dom';
import { ThemeContext } from '../../types/contexts';
import {
  useResetAllPokemonMutation,
  useResetPokemonPageMutation,
} from '../../server/pokemonApi';
import userEvent from '@testing-library/user-event';

const resetPokemonPage = vi.fn();
const resetAllPokemon = vi.fn();

vi.mock('../../server/pokemonApi', async () => {
  const originalModule = await vi.importActual('../../server/pokemonApi');

  return {
    ...originalModule,
    useResetPokemonPageMutation: vi.fn(),
    useResetAllPokemonMutation: vi.fn(),
  };
});

describe('Header component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders without errors', () => {
    (useResetPokemonPageMutation as Mock).mockReturnValue([resetPokemonPage]);
    (useResetAllPokemonMutation as Mock).mockReturnValue([resetAllPokemon]);

    render(
      <MemoryRouter>
        <ThemeContext value={{ theme: 'light', toggleTheme: vi.fn() }}>
          <Header />
        </ThemeContext>
      </MemoryRouter>
    );

    const anchorByRole = screen.getByTestId('header-logo');
    const imgByRole = screen.getByRole('img');
    const titleByRole = screen.getByRole('heading', {
      name: /Search Pokémon/i,
    });

    expect(anchorByRole).toBeInTheDocument();
    expect(imgByRole).toBeInTheDocument();
    expect(titleByRole).toBeInTheDocument();
    expect(titleByRole).toHaveTextContent('Search Pokémon');
  });

  it('click on anchor should transfer to website', () => {
    (useResetPokemonPageMutation as Mock).mockReturnValue([resetPokemonPage]);
    (useResetAllPokemonMutation as Mock).mockReturnValue([resetAllPokemon]);

    render(
      <MemoryRouter>
        <ThemeContext value={{ theme: 'light', toggleTheme: vi.fn() }}>
          <Header />
        </ThemeContext>
      </MemoryRouter>
    );

    const anchorByRole = screen.getByTestId('header-logo');
    expect(anchorByRole).toHaveAttribute('href', 'https://pokeapi.co/about');
    expect(anchorByRole).toHaveAttribute('target', '_blank');
    expect(anchorByRole).toHaveAttribute('rel', 'noreferrer');
  });

  it('click on "Reset Cache Pager" should call resetPokemonPage', async () => {
    (useResetPokemonPageMutation as Mock).mockReturnValue([resetPokemonPage]);
    (useResetAllPokemonMutation as Mock).mockReturnValue([resetAllPokemon]);

    render(
      <MemoryRouter>
        <ThemeContext value={{ theme: 'light', toggleTheme: vi.fn() }}>
          <Header />
        </ThemeContext>
      </MemoryRouter>
    );

    const button = screen.getByTestId('reset-cache-page');

    await userEvent.click(button);
    expect(resetPokemonPage).toHaveBeenCalled();
  });

  it('click on "Reset Cache All Pokemons" should call resetAllPokemon', async () => {
    (useResetPokemonPageMutation as Mock).mockReturnValue([resetPokemonPage]);
    (useResetAllPokemonMutation as Mock).mockReturnValue([resetAllPokemon]);

    render(
      <MemoryRouter>
        <ThemeContext value={{ theme: 'light', toggleTheme: vi.fn() }}>
          <Header />
        </ThemeContext>
      </MemoryRouter>
    );

    const button = screen.getByTestId('reset-cache-all-pokemon');

    await userEvent.click(button);
    expect(resetAllPokemon).toHaveBeenCalled();
  });
});
