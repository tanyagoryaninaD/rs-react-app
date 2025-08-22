import type { JSX } from 'react';
import '../../../style/modal.scss';

export default function Modal({
  children,
  onClose,
}: {
  children: JSX.Element;
  onClose: () => void;
}) {
  return (
    <div className="modal">
      <div className="wrapper-close">
        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
      {children}
    </div>
  );
}
