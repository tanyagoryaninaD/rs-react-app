import pokeLogo from '../../public/pokeapi.png';
import React from 'react';

class Header extends React.Component {
  public render() {
    return (
      <>
        <header>
          <div>
            <a href="https://pokeapi.co/about" target="_blank" rel="noreferrer">
              <img src={pokeLogo} className="logo" alt="Poke logo" />
            </a>
          </div>
          <h1 className="header__title">Search Pokémon</h1>
        </header>
      </>
    );
  }
}

export default Header;
