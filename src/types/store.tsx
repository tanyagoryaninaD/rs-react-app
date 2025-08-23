import type z from 'zod';
import type { formScheme } from '../utils/zod';

export type Countries = {
  code: string;
  name: string;
};

export interface ConvertForm extends Omit<FormTypes, 'file'> {
  file?: string;
}

export interface Store {
  form: FormTypes;
  forms: ConvertForm[];
  countries: Countries[];
  setFormData: <Key extends FormKey>(key: Key, value: FormTypes[Key]) => void;
  setSuccessData: (data: ConvertForm) => void;
  resetForm: () => void;
}

export type FormKey = keyof z.infer<typeof formScheme>;
export type FormTypes = z.infer<typeof formScheme>;
