import type { UseFormRegister, FormState } from 'react-hook-form';
import type { JSX } from 'react';
import type { ConvertForm, FormKey, FormTypes } from './store';
import type z from 'zod';

export interface InputField extends Omit<Error, 'key'> {
  register?: UseFormRegister<FormTypes>;
}

export interface ModalState {
  formComponent: ((props: FormProps) => JSX.Element) | null;
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

export interface Error {
  key: FormKey;
  errors?: z.ZodFormattedError<FormTypes, string>;
  formState?: FormState<FormTypes>;
}
