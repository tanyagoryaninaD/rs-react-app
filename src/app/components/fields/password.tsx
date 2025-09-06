import type { JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function PasswordField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: FORM_KEYS.PASSWORD,
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor={FORM_KEYS.PASSWORD}>
        Password<span className="required">*</span>
      </label>
      <input
        id={FORM_KEYS.PASSWORD}
        type="password"
        name={FORM_KEYS.PASSWORD}
        placeholder="Password"
        autoComplete="new-password"
        data-testid={FORM_KEYS.PASSWORD}
        {...props.register?.(FORM_KEYS.PASSWORD, {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid={`${FORM_KEYS.PASSWORD}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
