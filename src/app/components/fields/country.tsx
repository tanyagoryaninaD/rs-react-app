import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function CountryField(props: InputField): JSX.Element {
  const { form, countries, setFormData } = useFormStore((state) => state);
  const error = props.formState?.errors.country;

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData('country', value);
  };

  const createSelectDefault = () => {
    return (
      <select
        id="country"
        name="country"
        onChange={onChange}
        required={true}
        autoComplete="country"
        value={form.country || ''}
      >
        <Options />
      </select>
    );
  };

  const createSelectReactHook = () => {
    return (
      <select
        id="country"
        autoComplete="country"
        {...props.register?.('country', {
          required: 'Select a country',
          onChange: props.onChange,
          value: form.country || '',
          validate: () => (form.country === '' ? 'Select a country' : true),
        })}
      >
        <Options />
      </select>
    );
  };

  const Options = () => {
    return (
      <>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </>
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="country">
        Country<span className="required">*</span>
      </label>
      {props.formState ? (
        <>
          {createSelectReactHook()}
          {error && <p className="validation">{error.message}</p>}
        </>
      ) : (
        <>
          {createSelectDefault()}
          {form.country === '' && (
            <p className="validation">Select a country</p>
          )}
        </>
      )}
    </div>
  );
}
