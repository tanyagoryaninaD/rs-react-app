import { useContext, type ReactNode } from 'react';
import pokeLogo from '../assets/pokeapi.png';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../types/contexts';
import {
  useResetAllPokemonMutation,
  useResetPokemonPageMutation,
} from '../server/pokemonApi';

export function Header(): ReactNode {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [resetPokemonPage] = useResetPokemonPageMutation();
  const [resetAllPokemon] = useResetAllPokemonMutation();

  const handleResetCashPokemonPage = () => {
    resetPokemonPage('');
  };

  const handleResetCashAllPokemon = () => {
    resetAllPokemon('');
  };

  return (
    <>
      <header>
        <div className="header-top">
          <div>
            <a
              href="https://pokeapi.co/about"
              data-testid="header-logo"
              target="_blank"
              rel="noreferrer"
            >
              <img src={pokeLogo} className="logo" alt="Poke logo" />
            </a>
          </div>
          <nav>
            <NavLink to="/" className="header-link">
              Home
            </NavLink>{' '}
            |{' '}
            <NavLink to="/about" className="header-link">
              About us
            </NavLink>
          </nav>
          <button className={`theme ${theme}`} onClick={toggleTheme}></button>
          <button
            data-testid="reset-cache-page"
            onClick={handleResetCashPokemonPage}
          >
            Reset Cache Page
          </button>
          <button
            data-testid="reset-cache-all-pokemon"
            onClick={handleResetCashAllPokemon}
          >
            Reset Cache All Pokemons
          </button>
        </div>
        <h1 className="header-title">Search Pokémon</h1>
      </header>
    </>
  );
}
