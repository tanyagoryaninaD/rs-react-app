import { useEffect, type JSX } from 'react';
import '../../../style/modal.scss';
import { createPortal } from 'react-dom';
import type { ModalProps } from '../../../types/common';

export default function Modal(props: ModalProps): JSX.Element {
  const { isOpen, onClose, children } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return <></>;
  }

  return createPortal(
    <div className="modal">
      <div className="modal-content">
        <div className="wrapper-close">
          <button className="close" onClick={onClose}>
            x
          </button>
        </div>
        {children}
      </div>
      <div className="modal-overlay" onClick={onClose}></div>
    </div>,
    document.body
  );
}
