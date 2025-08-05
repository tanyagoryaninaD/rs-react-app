import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { About } from '../components/About/About';
import { NotFound } from '../components/NotFound/NotFound';
import { SearchPanel } from '../components/SearchPanel/SearchPanel';
import userEvent from '@testing-library/user-event';
import { Main } from '../components/Main';

describe('App component', () => {
  it('should render Main', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Search Pokémon/i })
    ).toBeInTheDocument();
  });

  it('should render SearchPanel', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route index element={<SearchPanel />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Generate an error/i })
    ).toBeInTheDocument();
  });

  it('should render About', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /About us/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Developer/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /School/i })
    ).toBeInTheDocument();
  });

  it('should render Not found', () => {
    render(
      <MemoryRouter initialEntries={['/qwerty']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/oops/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Back to Home/i })
    ).toBeInTheDocument();
  });

  it('button in NotFound should navigate to Home', async () => {
    render(
      <MemoryRouter initialEntries={['/qwerty']}>
        <Routes>
          <Route path="/" element={<h1>TEST</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Back to Home/i });
    await userEvent.click(button);

    expect(window.location.pathname).toBe('/');
    expect(screen.queryByText(/oops/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /Back to Home/i })).toBeNull();
    expect(screen.getByRole('heading', { name: /TEST/i })).toBeInTheDocument();
  });
});
