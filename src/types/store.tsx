export type FormStore = {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  accept: boolean;
  country: string | null;
  file: File | null;
};

export type Countries = {
  code: string;
  name: string;
};

export interface Store {
  form: FormStore;
  countries: Countries[];
  setFormData: <Key extends FormKey>(key: Key, value: FormStore[Key]) => void;
  isValidName: () => boolean;
  isValidAge: () => boolean;
  isValidEmail: () => boolean;
  isValidPassword: () => boolean;
  isValidRepeatPassword: () => boolean;
}

export type FormKey = keyof FormStore;
