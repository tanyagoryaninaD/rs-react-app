import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function CountryField(props: InputField): JSX.Element {
  const { countries } = useFormStore((state) => state);

  const errorMessage = getError({
    key: FORM_KEYS.COUNTRY,
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
      <label htmlFor={FORM_KEYS.COUNTRY}>
        Country<span className="required">*</span>
      </label>
      <input
        type="text"
        list="countrydata"
        id={FORM_KEYS.COUNTRY}
        placeholder="Country"
        autoComplete="off"
        name={FORM_KEYS.COUNTRY}
        data-testid={FORM_KEYS.COUNTRY}
        {...props.register?.(FORM_KEYS.COUNTRY, {})}
      />
      <Options />
      {!!errorMessage && (
        <p className="validation" data-testid={`${FORM_KEYS.COUNTRY}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
