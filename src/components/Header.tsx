import type { ReactNode } from 'react';
import pokeLogo from '../../public/pokeapi.png';

export function Header(): ReactNode {
  return (
    <>
      <header>
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
