import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { GenerateError } from '../../../components/SearchPanel/Error/GenerateError';
import ErrorBoundary from '../../../components/SearchPanel/Error/ErrorBoundary';

describe('GenerateError component', () => {
  it('renders should be correct', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <GenerateError />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('button', { name: /Generate an error/ })
    ).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('clicks on the button should handler error ', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <GenerateError />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /Generate an error/ });

    await userEvent.click(button);

    expect(consoleError).toBeCalled();
    expect(
      screen.getByText(/You have successfully generated an error./)
    ).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('clicks on the button should remove component', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <GenerateError />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /Generate an error/ });

    await userEvent.click(button);

    expect(
      screen.queryByRole('button', { name: /Generate an error/ })
    ).toBeNull();

    consoleError.mockRestore();
  });
});
