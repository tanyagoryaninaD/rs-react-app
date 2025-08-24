import { z } from 'zod';
import { countries } from './constants';

let password = '';
export const formScheme = z.object({
  name: z.string().regex(/^[A-ZА-Я]/, 'The first letter must be uppercase'),
  age: z
    .string()
    .min(1, 'This field is required')
    .refine((val) => parseInt(val) >= 0, {
      message: 'Age cannot be negative',
    }),

  email: z.email(),

  password: z
    .string()
    .min(1, 'This field is required')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(
      // eslint-disable-next-line no-useless-escape
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
      'Password must contain at least one special character'
    )
    .refine((value) => {
      password = value;
      return true;
    }),

  repeatPassword: z
    .string()
    .min(1, "Passwords don't equal")
    .refine((val) => password === val, {
      message: "Passwords don't equal",
      path: ['repeatPassword'],
    }),

  gender: z.string('This field is required').min(1, 'This field is required'),

  accept: z.boolean().refine((val) => val === true, 'This field is required'),

  country: z
    .string()
    .min(1, 'This field is required')
    .refine(
      (val) => countries.some((item) => val === item.name),
      'Select county from list'
    ),

  file: z
    .any()
    .transform((val) => (val instanceof FileList ? val[0] : val))
    .pipe(
      z
        .file('This field is required')
        .min(1, 'This field is required')
        .max(2_000_000, 'The size should not exceed 2Mb')
        .mime(['image/png', 'image/jpeg'], 'Should use png or jpeg format')
    ),
});
