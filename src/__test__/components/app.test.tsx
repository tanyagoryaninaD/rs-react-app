import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi, type Mock } from 'vitest';
import App from '../../app/App';
import userEvent from '@testing-library/user-event';
import { useFormStore } from '../../app/store/useFormStore';
import { mockForms } from '../mocks';

vi.mock('../../app/store/useFormStore', () => ({
  useFormStore: vi.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    (useFormStore as unknown as Mock).mockImplementation((state) => {
      return state({
        forms: mockForms,
        countries: [],
        setSuccessData: vi.fn(),
      });
    });

    render(<App />);
  });

  it('clicks on button Form open modal', async () => {
    const button = screen.getByRole('button', { name: 'Form' });

    await userEvent.click(button);

    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
  });

  it('clicks on button Form with React Hook open modal', async () => {
    const button = screen.getByRole('button', { name: 'Form with React Hook' });

    await userEvent.click(button);

    const form = screen.getByTestId('form-react');
    expect(form).toBeInTheDocument();
  });

  it('renders Profile', async () => {
    expect(screen.getByText(mockForms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockForms[0].age)).toBeInTheDocument();
    expect(screen.getByText(mockForms[0].email)).toBeInTheDocument();
    expect(screen.getByText(mockForms[0].country)).toBeInTheDocument();
    expect(screen.getByText(mockForms[0].gender)).toBeInTheDocument();
  });
});
