import type { ReactNode } from 'react';
import ErrorBoundary from './components/SearchPanel/Error/ErrorBoundary';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import './styles/App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { About } from './components/About/About';
import { NotFound } from './components/NotFound/NotFound';
import { Main } from './components/Main';
import { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './types/contexts';
import { useLocalStorage } from './utils/localStorage';

export function App(): ReactNode {
  const [stateStorageTheme, setStateStorageTheme] = useLocalStorage<Theme>(
    'tg-theme',
    'light'
  );
  const [theme, setTheme] = useState<Theme>(stateStorageTheme);

  useEffect(() => {
    setStateStorageTheme(theme);

    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
  }, [setStateStorageTheme, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <ErrorBoundary>
        <ThemeContext value={{ theme, toggleTheme }}>
          <Router>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route index element={<SearchPanel />} />
                <Route path="/about" element={<About />} />
              </Route>
              <Route path="*" element={<NotFound />} />\
            </Routes>
          </Router>
        </ThemeContext>
      </ErrorBoundary>
    </>
  );
}
