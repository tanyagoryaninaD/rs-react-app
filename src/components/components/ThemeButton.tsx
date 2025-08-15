import { useContext, type ReactNode } from 'react';
import { ThemeContext } from '../../utils/contexts';

export function ThemeButton(): ReactNode {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return <button className={`theme ${theme}`} onClick={toggleTheme}></button>;
}
