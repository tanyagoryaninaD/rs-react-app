import type { ReactNode } from 'react';
import pokeLogo from '../../public/pokeapi.png';
import { NavLink } from 'react-router-dom';

export function Header(): ReactNode {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/" className="header-link">
            Home
          </NavLink>{' '}
          |{' '}
          <NavLink to="/about" className="header-link">
            About us
          </NavLink>
        </nav>
        <div>
          <a href="https://pokeapi.co/about" target="_blank" rel="noreferrer">
            <img src={pokeLogo} className="logo" alt="Poke logo" />
          </a>
        </div>
        <h1 className="header-title">Search Pokémon</h1>
      </header>
    </>
  );
}
