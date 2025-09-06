import type z from 'zod';
import type { formScheme } from '../utils/zod';

export type Countries = {
  code: string;
  name: string;
};

export interface ConvertForm extends Omit<FormTypes, 'file'> {
  file: string;
}

export interface Store {
  forms: ConvertForm[];
  countries: Countries[];
  setSuccessData: (data: ConvertForm) => void;
}

export type FormKey = keyof z.infer<typeof formScheme>;
export type FormTypes = z.infer<typeof formScheme>;
