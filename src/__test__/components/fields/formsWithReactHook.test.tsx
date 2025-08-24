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

    screen.debug();
    expect(screen.getByTestId('name-error')).toBeInTheDocument();
    expect(screen.getByTestId('age-error')).toBeInTheDocument();
    expect(screen.getByTestId('accept-error')).toBeInTheDocument();
    expect(screen.getByTestId('country-error')).toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.getByTestId('password-error')).toBeInTheDocument();
  });

  // it('submit', async () => {
  //   const button = screen.getByRole('button', { name: 'Submit' });

  //   await userEvent.type(screen.getByTestId('name'), 'Test');
  //   await userEvent.type(screen.getByTestId('age'), '20');
  //   await userEvent.type(screen.getByTestId('email'), 'test@gmail.com');
  //   await userEvent.type(screen.getByTestId('password'), '!Qw2');

  //   await userEvent.type(screen.getByTestId('repeatPassword'), '!Qw2');
  //   await userEvent.type(screen.getByTestId('country'), 'Belarus');
  //   await userEvent.click(screen.getByTestId('accept'));
  //   await userEvent.click(screen.getByTestId('gender-man'));

  //   const fileInput = screen.getByTestId('file') as HTMLInputElement;
  //   const file = new File(['content'], 'test.png', {
  //     type: 'image/png',
  //     lastModified: 1,
  //   }) as unknown as File;
  //   await userEvent.upload(fileInput, file);

  //   console.log('After change:', fileInput.files?.[0]);

  //   await userEvent.click(button);
  //   screen.debug();
  // });
});
