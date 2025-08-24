import { vi } from 'vitest';

export const onClose = vi.fn();

export const mockForms = [
  {
    name: 'Alex',
    age: '22',
    country: 'Belarus',
    email: 'test@gmail.com',
    password: '!Qw2',
    repeatPassword: '!Qw2',
    file: 'image',
    gender: 'man',
    accept: true,
  },
];
