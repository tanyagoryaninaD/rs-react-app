import { describe, it, expect } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { About } from '../components/About/About';
import { NotFound } from '../components/NotFound/NotFound';
import { SearchPanel } from '../components/SearchPanel/SearchPanel';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
  it('should render SearchPanel', () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/page/1']}>
        <Routes>
          <Route path="/pokemon/page/:page" element={<SearchPanel />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent(/Search/i);
      expect(screen.getByRole('button')).toHaveTextContent(
        /Generate an error/i
      );
    });
  });

  it('should render About', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByAltText(/about/i)).toBeInTheDocument();
      expect(screen.getByAltText(/develop/i)).toBeInTheDocument();
      expect(screen.getByAltText(/school/i)).toBeInTheDocument();
    });
  });

  it('should render Not found', () => {
    render(
      <MemoryRouter initialEntries={['*']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByAltText(/oops/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Back to Home/i })
      ).toBeInTheDocument();
    });
  });

  it('should navigate to Home', async () => {
    render(
      <MemoryRouter initialEntries={['/qwerty']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Back to Home/i });
    await userEvent.click(button);

    waitFor(() => {
      expect(screen.getByAltText(/oops/i)).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();
    });
  });
});
