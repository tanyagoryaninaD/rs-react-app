import type { UseFormRegister, FormState } from 'react-hook-form';
import type { JSX } from 'react';
import type { ConvertForm, FormTypes } from './store';

export interface InputField {
  register?: UseFormRegister<FormTypes>;
  formState?: FormState<FormTypes>;
  error?: boolean;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
  children: JSX.Element | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface FormProps {
  onClose: () => void;
}

export interface ProfileProps {
  data: ConvertForm;
  last?: boolean;
}
