import '../../../style/form.scss';
import { useFormStore } from '../../store/useFormStore';
import { NameField } from '../fields/name';
import type { FormTypes } from '../../../types/store';
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
import type { FormProps } from '../../../types/common';
import { convertToBase64 } from '../../../utils/helpers';

export default function Form(props: FormProps) {
  const { setSuccessData } = useFormStore((state) => state);
  const [errors, setError] = useState<z.ZodFormattedError<FormTypes, string>>();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const fullFormData = {
      ...formData,
      accept: !formData.accept ? false : formData.accept === 'on',
    };

    const result = formScheme.safeParse(fullFormData);

    if (!result.success) {
      const errors = z.formatError(result.error);
      setError(errors);

      return;
    }

    const convertFile = await convertToBase64(result.data.file);
    const newData = { ...result.data, file: convertFile };
    setSuccessData(newData);

    props.onClose();
  };

  return (
    <>
      <h2>Form</h2>

      <form onSubmit={onSubmit} data-testid="form">
        <div className="wrapper-form">
          <div className="wrapper-subform">
            <NameField errors={errors} />
            <AgeField errors={errors} />
            <CountryField errors={errors} />
          </div>
          <div className="wrapper-subform">
            <EmailField errors={errors} />
            <PasswordField errors={errors} />
            <RepeatPasswordField errors={errors} />
          </div>
          <GenderField errors={errors} />
          <FileField errors={errors} />
          <AcceptField errors={errors} />
        </div>
        <button type="submit" data-testid="form-submit">
          Submit
        </button>
      </form>
    </>
  );
}
