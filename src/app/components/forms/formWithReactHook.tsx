import '../../../style/form.scss';
import { type JSX } from 'react';
import type { FormTypes } from '../../../types/store';
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
import type { FormProps } from '../../../types/form';
import { convertToBase64 } from '../../../utils/helpers';

export default function FormWithReactHook(props: FormProps): JSX.Element {
  const { setSuccessData } = useFormStore((state) => state);
  const { register, handleSubmit, formState } = useForm<FormTypes>({
    mode: 'onChange',
    resolver: zodResolver(formScheme),
  });

  const onSubmit: SubmitHandler<FormTypes> = async (data) => {
    const result = formScheme.safeParse(data);

    if (result.success) {
      props.onClose();

      const convertFile = await convertToBase64(result.data.file);
      const newData = { ...result.data, file: convertFile };
      setSuccessData(newData);
    }
  };

  return (
    <>
      <h2>Form with React Hook</h2>

      <form onSubmit={handleSubmit(onSubmit)} data-testid="form-react">
        <div className="wrapper-form">
          <div className="wrapper-subform">
            <NameField register={register} formState={formState} />
            <AgeField register={register} formState={formState} />
            <CountryField register={register} formState={formState} />
          </div>
          <div className="wrapper-subform">
            <EmailField register={register} formState={formState} />
            <PasswordField register={register} formState={formState} />
            <RepeatPasswordField register={register} formState={formState} />
          </div>
          <GenderField register={register} formState={formState} />
          <FileField register={register} formState={formState} />
          <AcceptField register={register} formState={formState} />
        </div>
        <button
          type="submit"
          disabled={!formState.isValid}
          data-testid="form-react-submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
