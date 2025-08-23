import { create } from 'zustand';
import type { FormKey, ConvertForm, FormTypes, Store } from '../../types/store';
import { countries, defaultForm } from '../../utils/constants';

export const useFormStore = create<Store>((set) => ({
  countries,
  forms: [],
  form: { ...defaultForm },

  setFormData: <Key extends FormKey>(key: Key, value: FormTypes[Key]) =>
    set((state) => {
      return {
        form: {
          ...state.form,
          [key]: typeof value === 'string' ? value.trim() : value,
        },
      };
    }),

  setSuccessData: (data: ConvertForm) =>
    set((state) => {
      const updatedForms = [...state.forms, data];
      return {
        forms: updatedForms,
      };
    }),

  resetForm: () =>
    set(() => {
      return {
        form: { ...defaultForm },
      };
    }),
}));
