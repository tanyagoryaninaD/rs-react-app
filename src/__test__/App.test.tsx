import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { About } from '../components/About/About';
import { NotFound } from '../components/NotFound/NotFound';
import { SearchPanel } from '../components/SearchPanel/SearchPanel';
import userEvent from '@testing-library/user-event';
import { Main } from '../components/Main';
import { MockProvider } from './mocks/MockProvider';

describe('App component', () => {
  it('should render Main', () => {
    render(
      MockProvider(
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      )
    );

    expect(
      screen.getByRole('heading', { name: /Search Pokémon/i })
    ).toBeInTheDocument();
  });

  it('should render SearchPanel', () => {
    render(
      MockProvider(
        <Routes>
          <Route index element={<SearchPanel />} />
        </Routes>
      )
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Generate an error/i })
    ).toBeInTheDocument();
  });

  it('should render About', () => {
    render(
      MockProvider(
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>,
        { initialEntries: '/about' }
      )
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
      MockProvider(
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>,
        { initialEntries: '/qwerty' }
      )
    );

    expect(screen.getByText(/oops/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Back to Home/i })
    ).toBeInTheDocument();
  });

  it('button in NotFound should navigate to Home', async () => {
    render(
      MockProvider(
        <Routes>
          <Route path="/" element={<h1>TEST</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>,
        { initialEntries: '/qwerty' }
      )
    );

    const button = screen.getByRole('button', { name: /Back to Home/i });
    await userEvent.click(button);

    expect(window.location.pathname).toBe('/');
    expect(screen.queryByText(/oops/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /Back to Home/i })).toBeNull();
    expect(screen.getByRole('heading', { name: /TEST/i })).toBeInTheDocument();
  });
});
