import type { UseFormRegister, FormState } from 'react-hook-form';
import type { FormStore } from './store';

export interface InputField {
  register?: UseFormRegister<FormStore>;
  formState?: FormState<FormStore>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
