import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Header } from '../../components/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it('renders without errors', () => {
    const anchorByRole = screen.getByTestId('header-logo');
    const imgByRole = screen.getByRole('img');
    const titleByRole = screen.getByRole('heading', {
      name: /Search Pokémon/i,
    });

    expect(anchorByRole).toBeInTheDocument();
    expect(imgByRole).toBeInTheDocument();
    expect(titleByRole).toBeInTheDocument();
    expect(titleByRole).toHaveTextContent('Search Pokémon');
  });

  it('click on anchor should transfer to website', () => {
    const anchorByRole = screen.getByTestId('header-logo');
    expect(anchorByRole).toHaveAttribute('href', 'https://pokeapi.co/about');
    expect(anchorByRole).toHaveAttribute('target', '_blank');
    expect(anchorByRole).toHaveAttribute('rel', 'noreferrer');
  });
});
