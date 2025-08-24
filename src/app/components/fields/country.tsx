import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';
import { getError } from '../../../utils/helpers';

export function CountryField(props: InputField): JSX.Element {
  const { countries } = useFormStore((state) => state);

  const errorMessage = getError({
    key: 'country',
    formState: props.formState,
    errors: props.errors,
  });

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
      <input
        type="text"
        list="countrydata"
        id="country"
        placeholder="Country"
        autoComplete="off"
        name="country"
        {...props.register?.('country', {})}
      />
      <Options />
      {!!errorMessage && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
