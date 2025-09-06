import type { FormState, UseFormRegister } from 'react-hook-form';
import type z from 'zod';
import type { FormKey, FormTypes } from './store';

export interface Error {
  key: FormKey;
  errors?: z.ZodFormattedError<FormTypes, string>;
  formState?: FormState<FormTypes>;
}

export interface FormProps {
  onClose: () => void;
}

export interface InputField extends Omit<Error, 'key'> {
  register?: UseFormRegister<FormTypes>;
}
