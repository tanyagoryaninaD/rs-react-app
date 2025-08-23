import '../../../style/form.scss';
import { type JSX } from 'react';
import type { FormKey, FormTypes } from '../../../types/store';
import { AgeField } from '../fields/age';
import { NameField } from '../fields/name';
import { useFormStore } from '../../store/useFormStore';
import { EmailField } from '../fields/email';
import { PasswordField } from '../fields/password';
import { RepeatPasswordField } from '../fields/repeatPassword';
import { CountryField } from '../fields/country';
import { AcceptField } from '../fields/accept';
import { FileField } from '../fields/file';
import { GenderField } from '../fields/gender';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formScheme } from '../../../utils/zod';
import z from 'zod';
import type { FormProps } from '../../../types/common';
import { convertToBase64 } from '../../../utils/helpers';

export default function FormWithReactHook(props: FormProps): JSX.Element {
  const { form, setFormData, setSuccessData, resetForm } = useFormStore(
    (state) => state
  );
  const { register, handleSubmit, formState, setError } = useForm<FormTypes>({
    mode: 'onChange',
    resolver: zodResolver(formScheme),
  });

  const onSubmit: SubmitHandler<FormTypes> = async (data) => {
    const result = formScheme.safeParse(data);

    if (result.success) {
      console.log('🚀 ~ onSubmit ~ result success:', result);
      props.onClose();

      if (result.data.file) {
        const convertFile = await convertToBase64(result.data.file);
        const newData = { ...result.data, file: convertFile };
        setSuccessData(newData);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { file, ...newData } = result.data;
        setSuccessData(newData);
      }
      resetForm();
    } else {
      console.log('🚀 ~ onSubmit ~ result fail:', result);
    }
  };

  const onChange =
    (key: FormKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value;

      if (event.target.type === 'checkbox') {
        value = event.target.checked;
      } else if (event.target.type === 'radio') {
        value = event.target.id;
      }

      value = event.target.value;
      setFormData(key, value);
      checkError(key, value);
      checkCorrectRepeatPassword(event.target);
    };

  const checkError = (key: FormKey, value: unknown) => {
    const validation = formScheme.shape[key].safeParse(value);

    if (!validation.success) {
      const errorMessage = z.formatError(validation.error as never)._errors[0];
      setError(key, { message: errorMessage });
    }
  };

  const checkCorrectRepeatPassword = (
    target: EventTarget & HTMLInputElement
  ) => {
    if (target.name === 'repeatPassword') {
      const value = target.value;
      const isCorrectRepeat = form.password === value;

      setFormData('isCorrectRepeatPassword', isCorrectRepeat);
      checkError('isCorrectRepeatPassword', isCorrectRepeat);
    }

    if (target.name === 'password') {
      const value = target.value;
      const isCorrectRepeat = value === form.repeatPassword;

      setFormData('isCorrectRepeatPassword', isCorrectRepeat);
      checkError('isCorrectRepeatPassword', isCorrectRepeat);
    }
  };

  return (
    <>
      <h2>Form with React Hook</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapper-form">
          <div className="wrapper-subform">
            <NameField
              onChange={onChange('name')}
              register={register}
              formState={formState}
            />
            <AgeField
              onChange={onChange('age')}
              register={register}
              formState={formState}
            />
            <CountryField
              onChange={onChange('country')}
              register={register}
              formState={formState}
            />
          </div>
          <div className="wrapper-subform">
            <EmailField
              onChange={onChange('email')}
              register={register}
              formState={formState}
            />
            <PasswordField
              onChange={onChange('password')}
              register={register}
              formState={formState}
            />
            <RepeatPasswordField
              onChange={onChange('repeatPassword')}
              register={register}
              formState={formState}
            />
          </div>
          <GenderField
            onChange={onChange('gender')}
            register={register}
            formState={formState}
          />
          <FileField register={register} formState={formState} />
          <AcceptField
            onChange={onChange('accept')}
            register={register}
            formState={formState}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
