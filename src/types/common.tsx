import type { UseFormRegister, FormState } from 'react-hook-form';
import type { FormStore } from './store';
import type { JSX } from 'react';

export interface InputField {
  register?: UseFormRegister<FormStore>;
  formState?: FormState<FormStore>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
  children: JSX.Element | null;
  isOpen: boolean;
  onClose: () => void;
}
