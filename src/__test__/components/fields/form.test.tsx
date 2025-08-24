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

  // it('click on submit check validation', async () => {
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
