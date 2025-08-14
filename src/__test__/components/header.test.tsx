import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from '../../components/Header';
import { ThemeContext } from '../../types/contexts';
import userEvent from '@testing-library/user-event';
import { MockProvider } from '../mocks/MockProvider';
import { dispatchSpy } from '../mocks/mocks';

describe('Header component', () => {
  beforeEach(() => {
    render(
      MockProvider(
        <ThemeContext value={{ theme: 'light', toggleTheme: vi.fn() }}>
          <Header />
        </ThemeContext>
      )
    );
  });

  it('renders without errors', () => {
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

  it('clicks on anchor should transfer to website', () => {
    const anchorByRole = screen.getByTestId('header-logo');
    expect(anchorByRole).toHaveAttribute('href', 'https://pokeapi.co/about');
    expect(anchorByRole).toHaveAttribute('target', '_blank');
    expect(anchorByRole).toHaveAttribute('rel', 'noreferrer');
  });

  it('clicks on "Reset Cache Page" should refresh query for page', async () => {
    const button = screen.getByTestId('reset-cache-page');

    await userEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'pokemonApi/invalidateTags',
      payload: ['PokemonList'],
    });
  });

  it('clicks on "Reset Cache All Pokemons" should refresh query for all pokemon', async () => {
    const button = screen.getByTestId('reset-cache-all-pokemon');

    await userEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'pokemonApi/invalidateTags',
      payload: ['Pokemon'],
    });
  });
});
