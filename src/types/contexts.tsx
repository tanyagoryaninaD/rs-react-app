import React from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});
