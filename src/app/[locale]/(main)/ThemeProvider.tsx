'use client';

import { useLocalStorage } from '../../../utils/localStorage';
import { Theme } from '../../../types/types';
import { JSX, useEffect } from 'react';
import { ThemeContext } from '../../../utils/contexts';
import { THEMES } from '../../../utils/constants';

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useLocalStorage<Theme>('tg-theme', THEMES.LIGHT);

  useEffect(() => {
    setTheme(theme);

    document.body.classList.toggle(THEMES.DARK, theme === THEMES.DARK);
    document.body.classList.toggle(THEMES.LIGHT, theme === THEMES.LIGHT);
  }, [setTheme, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}
