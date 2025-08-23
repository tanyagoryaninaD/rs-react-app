import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function CountryField(props: InputField): JSX.Element {
  const { form, countries } = useFormStore((state) => state);

  const error = props.formState?.errors.country || props.error;
  const errorMessage =
    typeof error === 'boolean' ? props.errorMessage : error?.message;

  const createInputDefault = () => {
    return (
      <>
        <input
          type="text"
          list="countrydata"
          id="country"
          name="country"
          autoComplete="off"
          placeholder="Country"
          onChange={props.onChange}
        />
        <Options />
      </>
    );
  };

  const createInputReactHook = () => {
    return (
      <>
        <input
          type="text"
          list="countrydata"
          id="country"
          placeholder="Country"
          autoComplete="off"
          {...props.register?.('country', {
            required: 'Select a country',
            value: form.country || '',
            onChange: props.onChange,
            validate: () => !!error,
          })}
        />
        <Options />
      </>
    );
  };

  const Options = () => {
    return (
      <datalist id="countrydata">
        {countries.map((country) => (
          <option
            key={country.code}
            label={country.code}
            value={country.name}
          />
        ))}
      </datalist>
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="country">
        Country<span className="required">*</span>
      </label>
      {props.formState ? createInputReactHook() : createInputDefault()}
      {error && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
