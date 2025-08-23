import '../../../style/form.scss';
import { useFormStore } from '../../store/useFormStore';
import { NameField } from '../fields/name';
import type { FormKey, FormTypes } from '../../../types/store';
import { AgeField } from '../fields/age';
import { PasswordField } from '../fields/password';
import { RepeatPasswordField } from '../fields/repeatPassword';
import { EmailField } from '../fields/email';
import { GenderField } from '../fields/gender';
import { AcceptField } from '../fields/accept';
import { FileField } from '../fields/file';
import { CountryField } from '../fields/country';
import { formScheme } from '../../../utils/zod';
import { useState } from 'react';
import z from 'zod';

export default function Form() {
  const { form, setFormData } = useFormStore((state) => state);
  const [errors, setError] = useState<z.ZodFormattedError<FormTypes, string>>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formScheme.safeParse(form);

    if (result.success) {
      console.log('🚀 ~ onSubmit ~ result success:', result);
    } else {
      console.log('🚀 ~ onSubmit ~ result fail:', result);
    }

    const validation = formScheme.safeParse(form);

    if (!validation.success) {
      const errors = z.formatError(validation.error);
      setError(errors);
    }
  };

  const onChange =
    (key: FormKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value;

      if (event.target.type === 'checkbox') {
        value = event.target.checked;
      } else if (event.target.type === 'radio') {
        value = event.target.name;
      } else if (
        event.target.name === 'repeatPassword' ||
        event.target.name === 'password'
      ) {
        value = event.target.value;
        const isCorrect = event.target.value === form.password;

        setFormData('isCorrectRepeatPassword', isCorrect);
      } else {
        value = event.target.value;
      }

      setFormData(key, value);
    };

  return (
    <>
      <h2>Form</h2>

      <form onSubmit={onSubmit}>
        <div className="wrapper-form">
          <div className="wrapper-subform">
            <NameField
              onChange={onChange('name')}
              error={!!errors?.name}
              errorMessage={errors?.name?._errors[0]}
            />
            <AgeField
              onChange={onChange('age')}
              error={!!errors?.age}
              errorMessage={errors?.age?._errors[0]}
            />
            <CountryField
              onChange={onChange('country')}
              error={!!errors?.country}
              errorMessage={errors?.country?._errors[0]}
            />
          </div>
          <div className="wrapper-subform">
            <EmailField
              onChange={onChange('email')}
              error={!!errors?.email}
              errorMessage={errors?.email?._errors[0]}
            />
            <PasswordField
              onChange={onChange('password')}
              error={!!errors?.password}
              errorMessage={errors?.password?._errors[0]}
            />
            <RepeatPasswordField
              onChange={onChange('repeatPassword')}
              error={!!errors?.isCorrectRepeatPassword}
              errorMessage={errors?.isCorrectRepeatPassword?._errors[0]}
            />
          </div>
          <GenderField
            onChange={onChange('gender')}
            error={!!errors?.gender}
            errorMessage={errors?.gender?._errors[0]}
          />
          <FileField />
          <AcceptField
            onChange={onChange('accept')}
            error={!!errors?.accept}
            errorMessage={errors?.accept?._errors[0]}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
