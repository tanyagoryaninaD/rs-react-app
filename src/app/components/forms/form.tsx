import '../../../style/form.scss';
import { useFormStore } from '../../store/useFormStore';
import { NameField } from '../fields/name';
import type { FormKey } from '../../../types/store';
import { AgeField } from '../fields/age';
import { PasswordField } from '../fields/password';
import { RepeatPasswordField } from '../fields/passwordEmail';
import { EmailField } from '../fields/email';
import { GenderField } from '../fields/gender';
import { AcceptField } from '../fields/accept';
import { FileField } from '../fields/file';
import { CountryField } from '../fields/country';

export default function Form() {
  const { form, setFormData } = useFormStore((state) => state);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 ~ onSubmit ~ form:', form);
  };

  const onChange =
    (key: FormKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData(key, value);
    };

  return (
    <>
      <h2>Form</h2>

      <form onSubmit={onSubmit}>
        <div className="wrapper-form">
          <div className="wrapper-subform">
            <NameField onChange={onChange('name')} />
            <AgeField onChange={onChange('age')} />
            <CountryField onChange={onChange('country')} />
          </div>
          <div className="wrapper-subform">
            <EmailField onChange={onChange('email')} />
            <PasswordField onChange={onChange('password')} />
            <RepeatPasswordField onChange={onChange('repeatPassword')} />
          </div>
          <GenderField />
          <FileField />
          <AcceptField />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
