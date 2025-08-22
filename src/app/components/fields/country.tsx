import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function CountryField(props: InputField): JSX.Element {
  const { form, countries, isValidCountry } = useFormStore((state) => state);
  const error = props.formState?.errors.country;

  const createInputDefault = () => {
    return (
      <>
        <input
          type="text"
          list="countrydata"
          id="country"
          name="country"
          autoComplete="off"
          required={true}
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
            validate: () =>
              !isValidCountry() ? 'Select a country with list' : true,
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
      {props.formState ? (
        <>
          {createInputReactHook()}
          {error && <p className="validation">{error.message}</p>}
        </>
      ) : (
        <>
          {createInputDefault()}
          {!!form.country?.length && !isValidCountry() && (
            <p className="validation">Select a country with list</p>
          )}
        </>
      )}
    </div>
  );
}
