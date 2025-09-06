import type { JSX } from 'react';
import type { FormProps } from './form';

export interface ModalState {
  formComponent: ((props: FormProps) => JSX.Element) | null;
}

export interface ModalProps {
  children: JSX.Element | null;
  isOpen: boolean;
  onClose: () => void;
}
