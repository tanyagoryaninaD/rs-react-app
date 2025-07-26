import { describe, it, expect } from 'vitest';
import { App } from '../App';
import { screen, render } from '@testing-library/react';

describe('App component', () => {
  it('should render without error', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Search Pokémon/ })
    ).toBeInTheDocument();
  });
});
