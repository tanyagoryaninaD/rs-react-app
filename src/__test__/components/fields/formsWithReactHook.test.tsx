import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { onClose } from '../../mocks';
import userEvent from '@testing-library/user-event';
import FormWithReactHook from '../../../app/components/forms/formWithReactHook';

describe('FormWithReactHook components', () => {
  beforeEach(() => {
    render(<FormWithReactHook onClose={onClose} />);
  });

  it('inputs invalid values show errors', async () => {
    await userEvent.type(screen.getByTestId('name'), 'test');
    await userEvent.type(screen.getByTestId('age'), '-1');
    await userEvent.type(screen.getByTestId('email'), 'test@gmail');
    await userEvent.type(screen.getByTestId('password'), '!Qw');

    await userEvent.type(screen.getByTestId('country'), 'China');
    await userEvent.click(screen.getByTestId('accept'));
    await userEvent.click(screen.getByTestId('accept'));

    expect(screen.getByTestId('name-error')).toBeInTheDocument();
    expect(screen.getByTestId('age-error')).toBeInTheDocument();
    expect(screen.getByTestId('accept-error')).toBeInTheDocument();
    expect(screen.getByTestId('country-error')).toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.getByTestId('password-error')).toBeInTheDocument();
  });
});
