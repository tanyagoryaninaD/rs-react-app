import type { JSX } from 'react';
import type { FormKey, FormStore } from '../../../types/store';
import { AgeField } from '../fields/age';
import { NameField } from '../fields/name';
import { useFormStore } from '../../store/useFormStore';
import { EmailField } from '../fields/email';
import { PasswordField } from '../fields/password';
import { RepeatPasswordField } from '../fields/passwordEmail';
import { CountryField } from '../fields/country';
import { AcceptField } from '../fields/accept';
import { FileField } from '../fields/file';
import { GenderField } from '../fields/gender';
import { useForm, type SubmitHandler } from 'react-hook-form';

export default function FormWithReactHook(): JSX.Element {
  const { setFormData } = useFormStore((state) => state);
  const { register, handleSubmit, formState } = useForm<FormStore>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormStore> = (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  const onChange =
    (key: FormKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData(key, value);
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
          <GenderField register={register} formState={formState} />
          <FileField register={register} formState={formState} />
          <AcceptField register={register} formState={formState} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
