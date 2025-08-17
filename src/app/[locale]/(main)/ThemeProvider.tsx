'use client';

import { useLocalStorage } from '../../../utils/localStorage';
import { Theme } from '../../../types/types';
import { JSX, useEffect } from 'react';
import { ThemeContext } from '../../../utils/contexts';

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useLocalStorage<Theme>('tg-theme', 'light');

  useEffect(() => {
    setTheme(theme);

    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
  }, [setTheme, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}
