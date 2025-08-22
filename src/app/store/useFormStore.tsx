import { create } from 'zustand';
import type { FormKey, FormStore, Store } from '../../types/store';

export const useFormStore = create<Store>((set, get) => ({
  form: {
    name: '',
    age: 0,
    email: '',
    password: '',
    repeatPassword: '',
    gender: '',
    accept: false,
    country: null,
    file: null,
  },

  countries: [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'RU', name: 'Russia' },
    { code: 'BY', name: 'Belarus' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'KZ', name: 'Kazakhstan' },
  ],

  setFormData: <Key extends FormKey>(key: Key, value: FormStore[Key]) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: typeof value === 'string' ? value.trim() : value,
      },
    })),

  isValidName: (): boolean => {
    const name = get().form.name;
    return name.length > 0 && /^[A-Z].*$/.test(name);
  },

  isValidAge: (): boolean => {
    const age = get().form.age;
    return age >= 0;
  },

  isValidEmail: (): boolean => {
    const email = get().form.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  },

  isValidPassword: (): boolean => {
    const password = get().form.password;
    const passwordRegex =
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

    return passwordRegex.test(password);
  },

  isValidRepeatPassword: (): boolean => {
    const password = get().form.password;
    const repeatPassword = get().form.repeatPassword;

    return password === repeatPassword;
  },
}));
