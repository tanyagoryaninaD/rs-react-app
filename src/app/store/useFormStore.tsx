import { create } from 'zustand';
import type { ConvertForm, Store } from '../../types/store';
import { countries } from '../../utils/constants';

export const useFormStore = create<Store>((set) => ({
  countries,
  forms: [],

  setSuccessData: (data: ConvertForm) =>
    set((state) => {
      const updatedForms = [...state.forms, data];
      return {
        forms: updatedForms,
      };
    }),
}));
