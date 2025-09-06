import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../../app/App';

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('clicks on Close button should closed modal', async () => {
    const button = screen.getByRole('button', { name: 'Form' });
    await userEvent.click(button);
    const modal = screen.queryByTestId('modal');

    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-modal');
    await userEvent.click(closeButton);

    expect(modal).not.toBeInTheDocument();
  });

  it('clicks on overlay should closed  modal', async () => {
    const button = screen.getByRole('button', { name: 'Form' });
    await userEvent.click(button);
    const modal = screen.queryByTestId('modal');

    expect(modal).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('overlay'));

    expect(modal).not.toBeInTheDocument();
  });

  it('clicks on Escape should closed  modal', async () => {
    const button = screen.getByRole('button', { name: 'Form' });
    await userEvent.click(button);
    const modal = screen.getByTestId('modal');

    expect(modal).toBeInTheDocument();

    modal.focus();

    await userEvent.keyboard('{Escape}');

    expect(modal).not.toBeInTheDocument();
  });
});
