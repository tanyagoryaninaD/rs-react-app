import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import Modal from '../../app/components/modal/modal';
import { onClose } from '../mocks';
import Form from '../../app/components/forms/form';

describe('App component', () => {
  beforeEach(() => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <Form onClose={onClose} />
      </Modal>
    );
  });

  it('clicks on Close button should closed modal', async () => {
    const closeButton = screen.getByTestId('close-modal');

    await userEvent.click(closeButton);

    expect(onClose).toBeCalled();
  });

  it('clicks on overlay should closed  modal', async () => {
    await userEvent.click(screen.getByTestId('overlay'));

    expect(onClose).toBeCalled();
  });

  it('clicks on Escape should closed  modal', async () => {
    const modal = screen.getByTestId('modal');
    modal.focus();

    await userEvent.keyboard('{Escape}');

    expect(onClose).toBeCalled();
  });
});
