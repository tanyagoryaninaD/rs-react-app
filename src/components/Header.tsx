'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ThemeButton } from './components/ThemeButton';
import { ResetCache } from './components/ResetCache';
import { useLocalStorage } from '../utils/localStorage';
import { useEffect } from 'react';
import { ThemeContext } from '../utils/contexts';
import { Theme } from '../types/types';

export function Header(): React.ReactNode {
  const [theme, setTheme] = useLocalStorage<Theme>('tg-theme', 'light');

  useEffect(() => {
    setTheme(theme);

    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
  }, [setTheme, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
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
              <Image
                src="/pokeapi.png"
                className="logo"
                alt="Poke logo"
                width={100}
                height={100}
                priority
              />
            </a>
          </div>
          <nav className="nav">
            <Link href="/" className="header-link">
              Home
            </Link>
            <Link href="/about" className="header-link">
              About us
            </Link>
          </nav>
          <ThemeContext value={{ theme, toggleTheme }}>
            <ThemeButton />
          </ThemeContext>
          <ResetCache />
        </div>
        <h1 className="header-title">Search Pokémon</h1>
      </header>
    </>
  );
}
