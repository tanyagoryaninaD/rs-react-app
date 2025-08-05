import type { ReactNode } from 'react';
import pokeLogo from '../assets/pokeapi.png';
import { NavLink } from 'react-router-dom';

export function Header(): ReactNode {
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
        </div>
        <h1 className="header-title">Search Pokémon</h1>
      </header>
    </>
  );
}
