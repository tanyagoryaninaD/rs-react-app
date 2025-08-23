import { create } from 'zustand';
import type { FormKey, FormTypes, Store } from '../../types/store';
import { countries } from '../../utils/constants';

export const useFormStore = create<Store>((set) => ({
  countries,
  form: {
    name: '',
    age: '',
    email: '',
    password: '',
    repeatPassword: '',
    isCorrectRepeatPassword: false,
    gender: '',
    accept: false,
    country: '',
  },

  setFormData: <Key extends FormKey>(key: Key, value: FormTypes[Key]) =>
    set((state) => {
      return {
        form: {
          ...state.form,
          [key]: typeof value === 'string' ? value.trim() : value,
        },
      };
    }),
}));
