import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Form from '../../../app/components/forms/form';
import { onClose } from '../../mocks';
import userEvent from '@testing-library/user-event';

describe('Forms components', () => {
  beforeEach(() => {
    render(<Form onClose={onClose} />);
  });

  it('click on submit check validation', async () => {
    const button = screen.getByRole('button', { name: 'Submit' });

    await userEvent.click(button);

    expect(screen.getByTestId('name-error')).toBeInTheDocument();
    expect(screen.getByTestId('age-error')).toBeInTheDocument();
    expect(screen.getByTestId('accept-error')).toBeInTheDocument();
    expect(screen.getByTestId('country-error')).toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.getByTestId('file-error')).toBeInTheDocument();
    expect(screen.getByTestId('gender-error')).toBeInTheDocument();
    expect(screen.getByTestId('password-error')).toBeInTheDocument();
    expect(screen.getByTestId('repeatPassword-error')).toBeInTheDocument();
  });

  it('inputs invalid values show errors', async () => {
    const button = screen.getByRole('button', { name: 'Submit' });

    await userEvent.type(screen.getByTestId('name'), 'test');
    await userEvent.type(screen.getByTestId('age'), '-1');
    await userEvent.type(screen.getByTestId('email'), 'test@gmail');
    await userEvent.type(screen.getByTestId('password'), '!Qw');

    await userEvent.type(screen.getByTestId('country'), 'China');

    await userEvent.click(button);

    expect(screen.getByTestId('name-error')).toBeInTheDocument();
    expect(screen.getByTestId('age-error')).toBeInTheDocument();
    expect(screen.getByTestId('country-error')).toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.getByTestId('password-error')).toBeInTheDocument();
  });
});
